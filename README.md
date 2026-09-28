# Wimmer Rennsporttechnik – Website-Relaunch

Modernisierter Web-Auftritt für Wimmer Rennsporttechnik Solingen GmbH, gebaut mit
[Astro](https://astro.build) (statischer Output, gute Performance/SEO) und Tailwind CSS v4.

## Warum ein Relaunch, nicht nur ein Redesign

Die bisherige Seite hatte keine konsistente Informationsarchitektur: URLs mischten
`kebab-case`, `snake_case`, `CamelCase` und rohe Datensatz-IDs
(`/list_hersteller`, `/mkAngebot/79196`, `/fahrzeug/Mercedes_Marco_Polo_2.0_D_4MATIC/66398`),
dieselben Inhalte lagen an mehreren Stellen (`/zubehoer/Bilder/...` **und** `/galerie/...`
für Fotos), Marken hatten je eine eigene Dünn-Seite (`/produkte/fahrwerkstechnik/gewindefahrwerk/h-r`,
`/…/kw-automitve` [Tippfehler in der alten URL], `/…/st`, …), und eine alte Subdomain
(`wwwalt.wimmer-rst.de`) war offenbar weiter live/indexiert. Entsprechend wurde der Page Tree
komplett neu gedacht statt nur eingedampft.

## Neue Seitenstruktur (max. 3 Ebenen, konsistent kebab-case)

```
/                           Start
/leistungen                 Leistungen – Übersicht
  /leistungen/chiptuning
  /leistungen/auspuffanlagen
  /leistungen/fahrwerkstechnik
  /leistungen/bremsanlagen
  /leistungen/sportkupplungen
  /leistungen/zubehoer
/marken                     Marken & Partner, 17 Einzelmarken mit echten offiziellen Links
                             (H&R, KW, ST, Brembo, Capristo, ZF Sachs, LUK, KTM X-Bow, …)
                             statt ~15 verstreuter Einzelseiten
/#unternehmen               Über uns, Prüfstand, TÜV-Zertifizierung, Garantie – jetzt Teil
                             der Startseite statt eigener Unterseite (Nutzerwunsch)
/referenzen                 Projektgalerie mit echten Fotos (ersetzt /zubehoer/Bilder/* und /galerie/*)
/fahrzeugsuche              Hersteller → Modell → Fahrzeug (ersetzt /list_hersteller)
/wohnmobil                  Wohnmobilvermietung Niesmann+Bischoff Flair 920
/kontakt                    Adresse, Telefon, Öffnungszeiten, Anfahrt (ehem. 2 Einzelseiten)
/impressum
/datenschutz
```

Alle Routen sind in `src/data/site.ts` als einzige Quelle für Navigation, Marken und
Firmendaten definiert – neue Unterseiten werden dort ergänzt, nicht in mehreren Dateien
parallel gepflegt.

`public/_redirects` enthält 301-Weiterleitungen von den bekannten alten Pfaden auf die
neuen Seiten (Netlify-Format; bei Apache/Nginx-Hosting als Vorlage für `RewriteRule`
bzw. `rewrite`-Direktiven verwenden). Das ist wichtig, damit bestehende Backlinks und
Google-Rankings beim Umzug nicht verloren gehen.

## Wichtiger Hinweis zu Inhalten & Bildern

Die Live-Seite `wimmer-rst.de` war aus dieser Arbeitsumgebung heraus **nicht per
HTTP erreichbar** (Netzwerk-Policy blockiert Zugriffe auf die Domain, auch auf das
Web-Archiv). Bilder konnten deshalb nicht automatisch übernommen werden. Für Texte
und Struktur wurden zusätzlich zur Websuche vom Kunden bereitgestellte Exports der
Live-Seite ausgewertet (u. a. ein vollständiger "Seite speichern unter"-Export der
Startseite sowie der komplette alte Page Tree) – die dort enthaltenen Fakten
(Firmenhistorie, Partnerschaften, Marken, Garantiebedingungen) sind entsprechend real
und wurden für diesen Relaunch neu, prägnanter und ohne die alten Redundanzen
formuliert. Bilder sind bewusst als klar erkennbare Platzhalter umgesetzt
(`/referenzen`) und müssen vor Go-Live durch echtes Foto-/Videomaterial ersetzt werden.

**Vor Veröffentlichung noch offen:**

- Impressum/Datenschutz enthalten inzwischen den vom Kunden gelieferten Originaltext
  (Registergericht Solingen, USt-ID DE 812660097). Eine Handelsregister**nummer** (HRB)
  wurde nicht mitgeliefert, nur das Registergericht – vor Go-Live prüfen, ob die
  Nummer ergänzt werden muss.
- `src/pages/datenschutz.astro` – der Originaltext nennt keinen Hosting-Anbieter und
  keine Cookies/Tracking-Tools; falls solche eingesetzt werden (z. B. Statistik-Tools,
  eingebettete Karte auf `/kontakt`), müssen sie hier ergänzt werden.
- Alle Werte in `src/data/site.ts` gegen die aktuellen Firmendaten gegenprüfen
- `/wohnmobil` enthält jetzt den vom Kunden gelieferten Originaltext und zwei
  Fotos. Die Fotos (`public/images/wohnmobil/`) kamen als Chat-Upload nur in
  Anzeigegröße (400×253 bzw. 400×300 px) an – für den Druck/große Darstellung
  vor Go-Live durch die hochauflösenden Originaldateien ersetzen.
- **Marken-Logos**: `/marken` und der Marken-Teaser auf der Startseite zeigen
  bewusst Monogramm-Platzhalter (`src/components/BrandLogo.astro`) statt
  echter Marken-SVGs. Trademarked Logos von Drittfirmen (Brembo, KW, H&R, …)
  können aus dieser Umgebung heraus nicht beschafft und sollten nicht aus dem
  Gedächtnis nachgebaut werden (Risiko: ungenau/falsch). Echte SVGs liefern
  und in `brands[].logo` in `src/data/site.ts` eintragen, dann rendert
  `BrandLogo` automatisch das echte Logo statt des Platzhalters. Die
  verlinkten offiziellen Websites in `brands[].url` sind bereits recherchiert
  und echt.

### Fahrzeugsuche – jetzt mit eigener Datenbank statt altem Plone-Backend

`/fahrzeugsuche` (und das kompakte Widget auf der Startseite,
`src/components/VehicleFinder.astro`) bildet die Hersteller → Modell →
Fahrzeug-Auswahl weiterhin nach, holt die Daten aber nicht mehr vom alten
Plone-Backend, sondern aus einer eigenen, normalisierten MariaDB-Datenbank
(siehe `db/README.md`), gebaut aus dem vom Kunden gelieferten
Komplett-Export. Die Seite läuft dafür **hybrid**: die Marketing-Seiten
bleiben statisch, nur die Fahrzeugsuche (`src/pages/api/*.json.ts`) und die
Fahrzeug-Detailseiten (`src/pages/fahrzeug/[slug].astro`) rendern
serverseitig live gegen die Datenbank (Astro-Adapter `@astrojs/node`).

- **Datenbank aufsetzen/aktualisieren:** `db/README.md`
- **Server aufsetzen (MariaDB, Node-Prozess, Nginx, TLS):** `DEPLOYMENT.md`

Die finale Fahrzeugauswahl navigiert zu `/fahrzeug/<slug>` (neue,
kebab-case-Route mit führender ID im Slug für Stabilität, ersetzt die alte
Route `/fahrzeug/<Name>/<ID>`).

## Entwicklung

```bash
npm install
npm run dev       # lokaler Dev-Server
npm run build     # Build nach dist/ (dist/client statisch, dist/server = Node-SSR-App)
npm run preview   # Build lokal ansehen
npm start         # Build produktiv starten (node dist/server/entry.mjs)
```

Für die Fahrzeugsuche/-Detailseiten lokal eine MariaDB bereitstellen und
`.env` aus `.env.example` befüllen (siehe `db/README.md` für Schema/Import).
Ohne erreichbare Datenbank liefern `/api/modelle.json`, `/api/fahrzeuge.json`
und `/fahrzeug/<slug>` einen Serverfehler – der Rest der Seite (alle
statischen Marketing-Seiten) funktioniert unabhängig davon.

## Stack

- **Astro** (`output: "hybrid"`) – Marketing-Seiten bleiben statisch (sehr
  gute Ladezeiten/SEO-Basis), nur Fahrzeugsuche/-Detailseiten rendern
  serverseitig (Adapter `@astrojs/node`)
- **Tailwind CSS v4** – Utility-first Styling, Design-Tokens (Farben) zentral in
  `src/styles/global.css`
- **MariaDB** – normalisierte Fahrzeug-/Tuning-Datenbank, siehe `db/README.md`
- Zentrale Inhalte/Struktur in `src/data/site.ts`
