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
/marken                     Marken & Partner (H&R, KW, ST, Brembo, Capristo, ZF Sachs,
                             LUK, KTM X-Bow, Yamaha/Mercury – an einem Ort statt ~15 Einzelseiten)
/unternehmen                Über uns, Prüfstand, TÜV-Zertifizierung (ehem. 3 Einzelseiten)
/referenzen                 Projektgalerie (ersetzt /zubehoer/Bilder/* und /galerie/*)
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
Web-Archiv). Es konnten deshalb weder Original-Texte 1:1 noch Bilder automatisch
übernommen werden. Stattdessen wurden die Firmenfakten (Adresse, Kontakt, Leistungen,
Marken, Firmengeschichte, TÜV-Zertifizierung, Prüfstand-Daten) über Websuche aus
öffentlich indexierten Auszügen der Seite verifiziert und für diesen Relaunch neu und
prägnanter formuliert. Bilder sind bewusst als klar erkennbare Platzhalter umgesetzt
(`/referenzen`) und müssen vor Go-Live durch echtes Foto-/Videomaterial ersetzt werden.

**Vor Veröffentlichung unbedingt ergänzen/prüfen:**

- `src/pages/impressum.astro` – Handelsregisternummer, Registergericht, USt-IdNr.
- `src/pages/datenschutz.astro` – tatsächlich eingesetzter Hosting-Anbieter,
  Cookies/Tracking-/Analyse-Tools; juristische Prüfung des gesamten Textes
- `/referenzen` – echte Projektfotos statt Platzhalter-Kacheln
- Alle Werte in `src/data/site.ts` gegen die aktuellen Firmendaten gegenprüfen

## Entwicklung

```bash
npm install
npm run dev       # lokaler Dev-Server
npm run build     # statischer Build nach dist/
npm run preview   # Build lokal ansehen
```

## Stack

- **Astro** – statischer Seitenaufbau, sehr gute Ladezeiten/SEO-Basis, kein
  Client-JS-Overhead für eine primär inhaltliche Firmenseite
- **Tailwind CSS v4** – Utility-first Styling, Design-Tokens (Farben) zentral in
  `src/styles/global.css`
- Zentrale Inhalte/Struktur in `src/data/site.ts`
