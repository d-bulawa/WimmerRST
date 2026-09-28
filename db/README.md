# Fahrzeug-/Tuning-Datenbank

Ersetzt das alte Plone-Backend als Datenquelle für `/fahrzeugsuche` und die
Fahrzeug-Detailseiten (`/fahrzeug/<slug>`). Läuft als eigene MariaDB-Datenbank
auf dem NetCap-Server; die Astro-Seite fragt sie zur Laufzeit über
`src/lib/db.ts` ab (siehe `../DEPLOYMENT.md` für den Server-seitigen Aufbau).

## Warum ein neues Schema statt 1:1-Import

Der Kunden-Export (`hersteller`, `modelle`, `fahrzeuge`, `chiptuning`,
`auspuff`, `kat`) ist ein flacher Abzug aus dem alten Plone-System:

- `hersteller_name`/`modell_name` werden in **jeder** `fahrzeuge`-Zeile
  wiederholt statt per Fremdschlüssel referenziert (34.618 Zeilen mit
  redundantem Text).
- `chiptuning` hat 6 identische Spaltenblöcke (`stufe_1_…` bis `stufe_6_…`)
  statt einer Zeile pro tatsächlich angebotener Stufe – die meisten
  Fahrzeuge nutzen nur 1–2 Stufen, der Rest der Zeile ist leer.

`schema.sql` normalisiert das auf `hersteller` → `modelle` → `fahrzeuge` →
(`chiptuning_stufen` / `auspuffanlagen` / `sportkatalysatoren`), behält aber
**alle ursprünglichen Plone-Objekt-IDs** als Primärschlüssel bei (die
`hersteller_id`/`modell_id`/`fahrzeug_id` aus dem Export). Das ist wichtig,
weil diese IDs schon in Verlinkungen/Anfragen des Kunden vorkommen können.

## Import (Erstinstallation)

```bash
# 1. Schema anlegen (idempotent, CREATE TABLE IF NOT EXISTS)
mysql --default-character-set=utf8mb4 -u <user> -p <db> < db/schema.sql

# 2. Aus dem Kunden-Dump die INSERT-Anweisungen generieren
node db/migrate/build-seed.mjs /pfad/zum/kunden-dump.sql db/seed.generated.sql

# 3. Generierte Datei importieren
mysql --default-character-set=utf8mb4 -u <user> -p <db> < db/seed.generated.sql
```

**Wichtig:** immer `--default-character-set=utf8mb4` angeben (oder
`SET NAMES utf8mb4;`, steht auch am Anfang von `seed.generated.sql`).
Ohne das interpretiert der mysql-Client die UTF-8-Bytes je nach
System-Locale als latin1 und Umlaute/€ werden beim Import unlesbar
("doppelt kodiert").

`db/seed.generated.sql` wird **nicht** ins Repo eingecheckt (siehe
`.gitignore`) – sie enthält die vollständigen Preis-/Fahrzeugdaten des
Kunden und wird direkt auf dem Zielserver aus dessen eigenem Dump erzeugt.

## Neue Kundendaten einspielen (Update)

Bekommt ihr einen neuen Datenbank-Export vom Kunden: Schritt 2+3 oben erneut
ausführen. `build-seed.mjs` überschreibt beim erneuten Import bestehende
Zeilen nicht automatisch (reines `INSERT`) – für ein sauberes Update vorher
die Tabellen leeren:

```sql
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE chiptuning_stufen; TRUNCATE auspuffanlagen; TRUNCATE sportkatalysatoren;
TRUNCATE fahrzeuge; TRUNCATE modelle; TRUNCATE hersteller;
SET FOREIGN_KEY_CHECKS = 1;
```

und dann Schritt 2+3 erneut laufen lassen. (Ein `--replace`/Upsert-Modus
wäre möglich, war für die einmalige Migration aber nicht nötig.)

## Bekannte Datenqualitäts-Eigenheiten des Kundenexports

`build-seed.mjs` prüft und protokolliert diese beim Lauf (Zeilen werden
übersprungen statt den Import mit einem Fehler abzubrechen):

- **Doppelte Herstellernamen mit unterschiedlicher ID**: "Smart" (22931 +
  90008), "KTM" (90009 + 90011), "Morgan"/"Morgan " (90007 + 90012),
  "Cadillac"/"Cadillac " (22898 + 90014). Bewusst **nicht** automatisch
  zusammengeführt (könnte Fahrzeuge der falschen Dublette zuordnen) – taucht
  aktuell doppelt im Hersteller-Dropdown auf. Vor Go-Live mit dem Kunden
  klären, ob bereinigt werden soll (dann per `UPDATE fahrzeuge/modelle …`
  auf eine der beiden IDs umhängen und die andere hersteller-Zeile löschen).
- **8 Modelle und 17 Fahrzeuge ohne Namen** (leerer String im Export) –
  werden übersprungen, da weder anzeigbar noch sinnvoll auswählbar.
- **7 Fahrzeuge mit zwei chiptuning-Datensätzen** im Export (vermutlich ein
  nachträglich ergänzter Preis ohne Löschen des alten Datensatzes) – der
  jeweils zuletzt im Dump stehende gewinnt.
- **Vereinzelt Freitext statt Zahl** in `ps`/`kw`/`hubraum` (z. B.
  "460 PS / 338 KW", "3.8L") bei < 0.2 % der Fahrzeuge – deshalb bleiben
  diese drei Spalten `VARCHAR` statt `INT`, um keine Datensätze zu
  verlieren.
- **Ungültige Monatswerte** (`prod_monat_von`/`_bis`, sollten 1–12 sein) bei
  ~10 neueren Fahrzeugen, die stattdessen ein Jahr oder "MM/JJJJ" enthalten
  – werden auf `NULL` gesetzt statt die Spalte zum Überlaufen zu bringen.

Nach jedem Lauf gibt das Skript eine Zusammenfassung aus – bei neuen
Kundendaten die Zahlen prüfen, bevor importiert wird.

## Schema-Überblick

| Tabelle | Zweck |
|---|---|
| `hersteller` | Fahrzeughersteller (Dropdown 1) |
| `modelle` | Modellreihen je Hersteller (Dropdown 2) |
| `fahrzeuge` | Einzelne Fahrzeugvarianten inkl. technischer Daten, referenziert von der Detailseite über `slug` |
| `chiptuning_stufen` | 1 Zeile je angebotener Chiptuning-Stufe (1–6) und Fahrzeug |
| `auspuffanlagen` | Sportauspuff-Angebot je Fahrzeug |
| `sportkatalysatoren` | Sportkatalysator-Angebot je Fahrzeug |

Details/Spalten siehe `schema.sql` (kommentiert).
