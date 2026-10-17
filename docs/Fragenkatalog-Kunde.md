---
title: "Fragenkatalog zum Go-Live der neuen Website"
subtitle: "Wimmer Rennsporttechnik Solingen GmbH – Bearbeitung, Hosting, Wartung, Datenbank & Medien"
lang: de-DE
---

# Zu diesem Dokument

Die neue Website ist inhaltlich und gestalterisch weitgehend fertig. Damit wir sie sauber auf Ihrem Server veröffentlichen, dauerhaft betreuen und die letzten Einstellungen vornehmen können, brauchen wir von Ihnen Informationen und Entscheidungen. Dieser Katalog bündelt alle offenen Punkte an einer Stelle.

**So füllen Sie ihn aus**

- Tragen Sie Ihre Antwort in die rechte Spalte ein oder antworten Sie formlos per E-Mail mit der jeweiligen Nummer (z. B. „3.2: …“).
- Fragen mit **(!)** blockieren den Go-Live – ohne diese Antworten können wir nicht veröffentlichen. Alle anderen Fragen sind wichtig, aber nicht blockierend.
- Wenn Sie etwas nicht wissen: „weiß ich nicht“ ist eine gültige Antwort. Wir klären es dann gemeinsam. Technische Abschnitte (insbesondere 4, 5 und 6) können Sie direkt an Ihren IT-Dienstleister oder Server-Administrator weitergeben.
- **Bitte senden Sie keine Passwörter oder Zugangsdaten per E-Mail oder Messenger.** Wie wir diese sicher austauschen, klären wir in Abschnitt 6.

**Kurz zum Verständnis der Technik:** Die neue Seite besteht aus fertig erzeugten, statischen Dateien (HTML, CSS, Bilder). Sie braucht **keine eigene Datenbank und keine Programmiersprache auf dem Server** – ein normaler Webserver (Apache oder Nginx) genügt. Eine Datenbank bzw. ein Backend wird nur für die **Fahrzeugsuche** (Abschnitt 3) benötigt. Das macht Betrieb, Sicherheit und Wartung deutlich einfacher als beim bisherigen System.

## Die wichtigsten Fragen auf einen Blick

| Nr. | Thema |
|----|------------------------------------------------------------------|
| 3.1 | Läuft das bisherige System (Plone) nach dem Umzug weiter – oder wird es abgeschaltet? |
| 3.2 | Zugriff auf das bisherige System (Admin-Login/Export) für die Fahrzeugdaten |
| 3.3 | Woher kommen die Fahrzeugdaten künftig und wer pflegt sie? |
| 4.1 | Welche Art von Server steht zur Verfügung, und wer verwaltet ihn? |
| 4.3 | Wie spielen wir die Website auf den Server (Zugangsart)? |
| 4.6 | Wer verwaltet die Domain/DNS und kann Änderungen umsetzen? |
| 5.1 | Gewünschter Go-Live-Termin und Freigabe-Person |
| 7.1 | Originalbilder, -videos und Logos in voller Auflösung |
| 8.1 | Hosting-Anbieter für die Datenschutzerklärung |
| 8.3 | Einwilligungslösung für Google Maps/YouTube |
| 8.4 | Handelsregisternummer (HRB) fürs Impressum |

# 1. Ansprechpartner und Ablauf

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 1.1 (!) | Wer ist unser Hauptansprechpartner auf Ihrer Seite (Name, Telefon, E-Mail)? Wer vertritt diese Person bei Abwesenheit? | Eine Person, die Entscheidungen treffen und freigeben darf, verhindert Rückfragen-Schleifen. | |
| 1.2 (!) | Wer ist technischer Ansprechpartner (eigene IT oder externer Dienstleister – Firma, Name, Telefon, E-Mail)? | Für Server, DNS und E-Mail brauchen wir jemanden, der Änderungen tatsächlich umsetzen kann. | |
| 1.3 | Wer gibt die finale Freigabe vor Go-Live (Inhalte, Rechtstexte, Design)? Genügt eine E-Mail-Bestätigung? | Dokumentierte Freigabe schützt beide Seiten. | |
| 1.4 | Über welchen Kanal und in welchem Rhythmus möchten Sie Rückmeldungen geben (z. B. gesammelte Liste pro Woche)? | Gebündeltes Feedback ist schneller umgesetzt als Einzelwünsche. | |
| 1.5 | Gibt es noch ausstehende inhaltliche oder gestalterische Änderungswünsche an der Vorschau-Version? Bitte als Liste mit Seite und Wunsch. | Wir frieren den Stand vor dem Go-Live ein; spätere Änderungen sind danach ebenfalls möglich, aber als Wartungsaufgabe. | |

# 2. Bearbeitung und Pflege der Inhalte

Aktuell liegen alle Texte, Marken, Öffnungszeiten usw. im Quelltext der Website. Änderungen erledigen wir bzw. ein Entwickler. Wenn Sie künftig selbst Inhalte ändern möchten, ist ein Redaktionssystem (CMS) sinnvoll – das ist aber eine bewusste Entscheidung mit Mehraufwand.

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 2.1 (!) | Möchten Sie Inhalte künftig **selbst** ändern können (Texte, Bilder, Referenzen, Öffnungszeiten)? ☐ Ja, selbst ☐ Nein, ich beauftrage Änderungen ☐ Gemischt (kleine Dinge selbst, Größeres über Sie) | Entscheidet, ob wir ein CMS einrichten oder die Seite wie bisher von uns pflegen lassen. | |
| 2.2 | Falls selbst pflegen: **Wer** soll Zugriff bekommen (Anzahl Personen, Namen) und wie technisch versiert sind diese Personen? | Bestimmt Bedienkonzept (z. B. einfache Oberfläche statt Code) und Rollen/Rechte. | |
| 2.3 | **Was** soll änderbar sein? ☐ Öffnungszeiten & Kontaktdaten ☐ Texte der Leistungsseiten ☐ Referenzen/Galerie ☐ Marken & Partner ☐ Wohnmobil (Preise, Verfügbarkeit) ☐ Aktuelles/News ☐ Fahrzeugdaten | Der Umfang bestimmt die Komplexität des Redaktionssystems. | |
| 2.4 | Wie oft ändern sich Inhalte erfahrungsgemäß (täglich / wöchentlich / monatlich / selten)? | Selten → Pflege durch uns ist wirtschaftlich; häufig → CMS lohnt sich. | |
| 2.5 | Wer pflegt aktuell das bisherige System (Plone) – intern oder extern? Wissen diese Personen vom Relaunch? | Wir brauchen deren Wissen für Datenübernahme und Abschaltung. | |
| 2.6 | Soll es einen Bereich für **Aktuelles/News** geben (z. B. Messe-Teilnahmen, neue Projekte)? | Wäre eine neue Funktion, die wir einplanen müssten. | |
| 2.7 | Wie sollen Änderungen freigegeben werden (sofort live oder erst Vorschau + Freigabe)? | Wichtig für die Einrichtung des Redaktionsprozesses. | |
| 2.8 | Wünschen Sie eine kurze Einweisung/Schulung bzw. eine Bedienungsanleitung? | Planung von Zeit und Format. | |

# 3. Fahrzeugsuche und Datenbank

Die Fahrzeugsuche (Hersteller → Modell → Fahrzeug) lädt Modelle und Fahrzeuge zur Laufzeit vom **bisherigen System**. Fällt dieses nach dem Umzug weg, bleiben die beiden unteren Auswahlfelder leer. Das ist der größte offene Punkt vor dem Go-Live.

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 3.1 (!) | Soll das bisherige System (Plone, erkennbar an der alten Seite) nach dem Go-Live **parallel weiterlaufen**, oder wird es abgeschaltet? Falls es weiterlaufen soll: Wo ist es gehostet (Server/Anbieter)? Wer betreut es? | Entscheidet, ob wir die alten Abfragen per Weiterleitung („Reverse-Proxy“) durchreichen können oder eine neue Lösung bauen müssen. | |
| 3.2 (!) | Können wir Zugriff auf das bisherige System bekommen (Administrator-Login in Plone, ggf. Server-/Datenbank-Zugang), um die Fahrzeugdaten zu prüfen und zu exportieren? | Ohne Zugriff können wir weder die Funktion prüfen noch Daten übernehmen. | |
| 3.3 (!) | Wie umfangreich sind die Fahrzeugdaten (ungefähr: Anzahl Hersteller / Modelle / Fahrzeuge)? Aus welcher Quelle stammen sie (Eigenerfassung, Zulieferer, Schnittstelle)? | Bestimmt Datenbank-Größe, Importweg und Pflegekonzept. | |
| 3.4 | Was ist auf der **Fahrzeug-Detailseite** (`/fahrzeug/Name/ID`) aktuell zu sehen (Leistungsdaten vorher/nachher, Preise, Teilegutachten, Bilder, Anfrage-Button)? Bitte 2–3 Beispiel-Links nennen. | Die Detailseiten sind noch nicht in der neuen Seite abgebildet; wir müssen wissen, was erhalten bleiben soll. | |
| 3.5 | Wer pflegt die Fahrzeugdaten künftig, wie oft kommen neue Fahrzeuge hinzu und in welchem Format liegen die Daten vor (Excel, Export aus Warenwirtschaft, nur im System)? | Bestimmt, ob wir eine Excel-/CSV-Import-Lösung oder eine kleine Pflege-Oberfläche brauchen. | |
| 3.6 | Gibt es Bereiche der Fahrzeugdaten, die nicht öffentlich sein sollen (Einkaufspreise, interne Notizen)? | Datenschutz/Geschäftsgeheimnisse beim Export. | |
| 3.7 | Was sind die „mkAngebot“-Seiten (z. B. `/mkAngebot/79196`)? Handelt es sich um Angebote, Anfragen oder Produktseiten, und müssen sie weiter erreichbar bleiben? | Wir leiten sie derzeit pauschal auf die Kontaktseite um; das ist ggf. nicht korrekt. | |
| 3.8 | Dubletten bei Herstellern (z. B. „Smart“, „KTM“ je zweimal): Sollen diese zusammengeführt werden? | Im Altsystem sind sie getrennte Datensätze; wir fassen sie ohne Ihre Zustimmung nicht an. | |
| 3.9 | Wenn eine neue Lösung nötig ist, welche Variante bevorzugen Sie? ☐ Statische Fahrzeugdaten aus Excel/CSV (einfach, kein laufendes Backend) ☐ Kleine Datenbank + Pflege-Oberfläche auf Ihrem Server ☐ Fahrzeugsuche zunächst ausblenden und später nachliefern ☐ Empfehlung von Ihnen | Drei Wege mit sehr unterschiedlichem Aufwand und Betrieb. Wir erstellen gern vorab ein Angebot je Variante. | |
| 3.10 | Falls eine Datenbank auf Ihrem Server betrieben wird: Welche ist dort verfügbar oder erlaubt (MySQL/MariaDB, PostgreSQL, SQLite)? Wer richtet sie ein, wer sichert sie (Backups, Aufbewahrung)? | Ohne Vorgaben können wir nicht planen; Backups sind Pflicht. | |
| 3.11 | Soll aus der Fahrzeugsuche heraus direkt eine **Anfrage** möglich sein (Formular mit Fahrzeug-Vorauswahl)? Falls ja: an welche E-Mail-Adresse? | Neue Funktion; hat auch Datenschutz-Folgen (siehe 8). | |
| 3.12 | Wie viele Besucher nutzen die Fahrzeugsuche ungefähr (falls Statistiken vorhanden)? | Dimensionierung und Priorisierung. | |

# 4. Hosting auf Ihrem Server

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 4.1 (!) | Auf welcher Art Server soll die Seite laufen? ☐ Eigener Server in Ihrem Haus ☐ Gemieteter Root-/vServer ☐ Managed Hosting/Webspace bei einem Anbieter (welcher?) ☐ Sonstiges. Wo steht der Server (Land/Rechenzentrum)? | Bestimmt Zugriffsweg und Möglichkeiten (z. B. Weiterleitungen, SSH). Der Standort ist für Datenschutz relevant. | |
| 4.2 | Welches Betriebssystem und welcher Webserver laufen dort? ☐ Linux (Debian/Ubuntu/…) ☐ Windows Server (IIS) ☐ Apache ☐ Nginx ☐ Weiß ich nicht | Die Weiterleitungs-Regeln der alten URLs müssen in das passende Format übersetzt werden. | |
| 4.3 (!) | Wie dürfen wir Dateien auf den Server übertragen? ☐ SFTP ☐ SSH ☐ FTP ☐ Webhosting-Oberfläche (Plesk, cPanel, …) ☐ Anbindung über Git/automatisches Deployment | Bestimmt, ob wir Updates per Knopfdruck/automatisiert einspielen können. SFTP/SSH mit Schlüssel ist zu bevorzugen, unverschlüsseltes FTP bitte nicht. | |
| 4.4 | Gibt es eine **Test-/Staging-Adresse** (z. B. `test.wimmer-rst.de`) zum Prüfen vor dem Go-Live? Falls nein: Dürfen wir eine einrichten lassen? | Wir prüfen alles vollständig, bevor es Besucher sehen. | |
| 4.5 | Gibt es auf dem Server Einschränkungen: Firewall, VPN-Pflicht, IP-Freigabe, Speicherplatz-/Traffic-Limits? Bitte nennen. | Sonst können wir uns gar nicht erst verbinden bzw. laufen später in Limits. | |
| 4.6 (!) | Wer verwaltet die Domain `wimmer-rst.de` (Registrar/Anbieter, Name der Person)? Wer kann DNS-Einträge ändern? Gibt es weitere Subdomains in Benutzung? | Beim Umschalten muss die Domain auf den neuen Server zeigen. | |
| 4.7 | Hängen an der Domain **E-Mail-Postfächer** (MX-Einträge, Mailserver, SPF/DKIM)? Bei welchem Anbieter? | Beim DNS-Umschalten darf der E-Mail-Betrieb nicht unterbrochen werden. | |
| 4.8 | Wie soll die Adresse künftig lauten? ☐ `www.wimmer-rst.de` als Haupt-URL (in der Seite bereits so hinterlegt) ☐ `wimmer-rst.de` ohne „www“. Die jeweils andere soll auf die Hauptadresse weiterleiten. | Wichtig für Google (keine doppelten Inhalte). | |
| 4.9 | Gibt es bereits ein SSL-/TLS-Zertifikat, oder sollen wir ein kostenloses (Let’s Encrypt) einrichten lassen? Wer verlängert Zertifikate? | HTTPS ist Pflicht; Zertifikatsablauf ist eine häufige Ausfallursache. | |
| 4.10 | Was passiert mit der alten Test-Subdomain `wwwalt.wimmer-rst.de`? Soll sie abgeschaltet oder auf die neue Seite umgeleitet werden? | Sie war offenbar weiter im Netz erreichbar und kann doppelte Inhalte bei Google erzeugen. | |
| 4.11 | Darf der Server automatische Sicherheitsupdates einspielen? Wer ist für Server-Updates und Sicherheit zuständig? | Klärt Verantwortung (Server-Betrieb vs. Website-Betrieb). | |
| 4.12 | Gibt es Vorgaben zu Sicherheits-Header, Kompression oder Caching, die der Server bereits setzt (z. B. durch Anbieter)? | Vermeidet widersprüchliche Einstellungen und verbessert Ladezeiten. | |
| 4.13 | Ist eine Weiterleitung („Reverse-Proxy“) auf ein anderes System auf dem Server erlaubt/möglich? (relevant für 3.1) | Nur so lassen sich alte Fahrzeug-Abfragen bei Weiterbetrieb des Altsystems durchreichen. | |
| 4.14 | Soll ein Monitoring (Erreichbarkeitsprüfung mit E-Mail-Alarm) eingerichtet werden? An wen soll gemeldet werden? | Ausfälle werden sofort statt von Kunden bemerkt. | |

# 5. Launch (Go-Live)

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 5.1 (!) | Gibt es einen Wunschtermin für den Go-Live? Gibt es Zeiträume, die Sie meiden möchten (Messen, Aktionen, Betriebsferien)? | Terminplanung und Abstimmung mit Ihrem IT-Dienstleister. | |
| 5.2 | In welchem Zeitfenster darf umgestellt werden? Ist eine kurze Unterbrechung (Minuten) akzeptabel, z. B. abends oder am Wochenende? | Wir empfehlen außerhalb der Öffnungszeiten (Mo–Fr 08:00–17:00 Uhr). | |
| 5.3 | Darf die **TTL** (Zwischenspeicherzeit) der DNS-Einträge einige Tage vorher verkürzt werden? | Macht die Umschaltung deutlich schneller und ermöglicht schnelles Zurückrollen. | |
| 5.4 | Soll das alte System bis zu einem bestimmten Datum parallel erreichbar bleiben (Rückfalloption)? Wie lange? | Sicherheitsnetz, falls nach dem Start etwas fehlt. | |
| 5.5 | Gibt es eine Google Search Console / Bing Webmaster Tools für die Domain? Dürfen wir Zugriff erhalten (Nutzer hinzufügen)? | Wir prüfen nach dem Start, ob alte Adressen korrekt weitergeleitet werden, und reichen die neue Sitemap ein. | |
| 5.6 | Gibt es ein Google-Unternehmensprofil (Maps/Suche)? Sind Adresse, Öffnungszeiten und Website-Link dort aktuell? | Lokale Auffindbarkeit; muss nach dem Relaunch zur neuen Seite passen. | |
| 5.7 | Verlinken externe Stellen auf bestimmte alte Adressen (Partner, KW/H&R-Händlerlisten, Presse, Verzeichnisse, Social Media)? Gibt es Ihnen bekannte wichtige Adressen? | Diese müssen bei den Weiterleitungen sicher abgedeckt sein. | |
| 5.8 | Wer soll nach dem Go-Live den Funktionstest mitmachen (Kontaktformular/Telefonlinks, Fahrzeugsuche, Handy, Browser)? | Abnahme gemeinsam mit Ihnen. | |
| 5.9 | Soll die Seite vor dem Start für Suchmaschinen gesperrt bleiben (Passwortschutz/`noindex`) und erst mit der Umschaltung freigegeben werden? | Verhindert, dass die Test-Version vorab in Google erscheint. | |

# 6. Wartung und Zugänge für uns

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 6.1 (!) | Welchen Zugang erhalten wir für Wartung und Deployment? Bitte die konkrete Art nennen: ☐ SFTP-/SSH-Benutzer mit Schlüssel ☐ Hosting-Oberfläche (Plesk/cPanel) ☐ VPN ☐ Weitere. Ein **eigener, benannter Zugang** (kein geteiltes Konto) mit nur den nötigen Rechten ist ideal. | Nachvollziehbarkeit und Sicherheit. | |
| 6.2 | Wie tauschen wir Zugangsdaten sicher aus (z. B. Passwort-Manager, persönliche Übergabe, Einmal-Link)? | Zugangsdaten gehören nicht in E-Mails oder Chats. | |
| 6.3 | Wer ist **Eigentümer** des Quellcodes und des Code-Repositorys? Soll es auf ein Konto Ihres Unternehmens übertragen werden (z. B. GitHub-Organisation der Firma)? | Aktuell liegt es auf unserer Seite; zur Übergabe brauchen wir eine klare Regelung. | |
| 6.4 | Soll nach Go-Live ein **Wartungsvertrag** bestehen? Gewünschter Umfang: ☐ Sicherheits-/Software-Updates ☐ Inhaltsänderungen nach Aufwand ☐ Monitoring ☐ Backup-Kontrolle ☐ Nur nach Bedarf | Legt Verantwortung, Reaktionszeiten und Kosten fest. | |
| 6.5 | Gewünschte Reaktionszeit bei Störungen (z. B. am gleichen Werktag) und Notfallkontakt außerhalb der Geschäftszeiten? | Planung von Bereitschaft. | |
| 6.6 | **Backups**: Wer sichert die Website-Dateien (und die Datenbank, falls vorhanden)? Wie oft, wie lange aufbewahrt, wo gelagert? Wurde eine Wiederherstellung schon einmal getestet? | Ohne geprüftes Backup ist ein Ausfall oder Angriff nicht sicher behebbar. | |
| 6.7 | Dürfen wir Software-Updates für die Website (z. B. Astro, Abhängigkeiten) selbständig einspielen, und in welchem Rhythmus (z. B. quartalsweise)? | Sicherheitslücken lassen sich nur durch regelmäßige Updates schließen. | |
| 6.8 | Wer muss vor einem Update informiert oder um Freigabe gebeten werden? | Klare Kommunikationswege. | |
| 6.9 | Soll es eine kurze Dokumentation für Ihren IT-Dienstleister geben (Aufbau, Deployment, Zugänge, Notfallplan)? | Wir empfehlen das, damit Sie nicht von einer Person abhängig sind. | |
| 6.10 | Gibt es interne Vorgaben (IT-Richtlinien, Zwei-Faktor-Pflicht, Datenschutz/AV-Vertrag mit Dienstleistern), die für unseren Zugang gelten? | Wir halten diese von Anfang an ein. | |

# 7. Medien und Asset-Speicher (Bilder, Logos, Videos, Downloads)

Aktuell liegen die Bilder (ca. 12 MB, rund 45 Dateien) direkt bei den Website-Dateien. Das genügt für den Start, wird aber unübersichtlich, wenn viele neue Referenzen oder Videos dazukommen.

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 7.1 (!) | Wo liegen Ihre **Originalbilder und -videos** (Server, NAS, Cloud, Agentur)? Können wir sie in voller Auflösung erhalten? | Die bisherigen Bilder sind teils nur in Anzeigegröße vorhanden; für große Darstellungen brauchen wir Originale. | |
| 7.2 | Sind die aktuell auf `/referenzen` verwendeten Fotos **final und freigegeben**, oder sollen sie noch ausgetauscht werden? | In der Vorschau waren zunächst Platzhalter vorgesehen; wir möchten nichts Vorläufiges veröffentlichen. | |
| 7.3 | Wohnmobil: Können Sie hochauflösende Originalfotos (mind. 1920 px Breite) der Flair-920-Bilder liefern? | Die vorhandenen Bilder (400 px Breite) sind für große Bildschirme zu klein. | |
| 7.4 | **Markenlogos** (Brembo, KW, H&R, ST, Capristo, ZF Sachs, LUK, KTM X-Bow, …): Haben Sie die offiziellen Logos als **SVG oder hochaufgelöstes PNG** inkl. Erlaubnis zur Verwendung (Händler-/Partnerbereiche der Hersteller)? | Aktuell stehen Monogramm-Platzhalter. Wir bauen Logos nicht nach, um Fehler und Markenrechtsverstöße zu vermeiden. | |
| 7.5 | Eigene Firmenlogos: Liegen Wimmer-Logo, TÜV-Zeichen u. Ä. in Vektorform (SVG/AI/PDF) vor? Gibt es Corporate-Design-Vorgaben (Farben, Schriften)? | Scharfe Darstellung auf allen Geräten und Konsistenz mit Ihren Drucksachen. | |
| 7.6 | **Bildrechte**: Wer hat die Fotos gemacht, und dürfen sie online verwendet werden (Fotograf, Kunden, Hersteller)? Sind Kennzeichen oder erkennbare Personen auf den Bildern? | Urheber-, Persönlichkeits- und Markenrechte; Abmahnrisiko. | |
| 7.7 | Wie viele neue Bilder/Videos kommen pro Jahr ungefähr hinzu? Sollen **Videos** selbst gehostet werden oder weiter über YouTube laufen? | Selbst gehostete Videos brauchen deutlich mehr Speicher und Bandbreite; YouTube hat Datenschutzfolgen (siehe 8.3). | |
| 7.8 | Gibt es **Downloads** (PDF-Datenblätter, Teilegutachten/ABE, Preislisten), die auf der Seite angeboten werden sollen? Wo liegen sie? | Müssen übernommen und dauerhaft unter stabilen Adressen abgelegt werden. | |
| 7.9 | Wie viel Speicherplatz und Datenverkehr stehen auf Ihrem Server voraussichtlich zur Verfügung? Gibt es ein CDN oder Cloud-Speicher (z. B. Object Storage), das genutzt werden soll – oder soll alles auf demselben Server liegen? | Entscheidet, ob Bilder getrennt von der Seite abgelegt und ausgeliefert werden. | |
| 7.10 | Wer lädt neue Bilder künftig hoch und wie (selbst über Redaktionssystem, per E-Mail/Cloud-Ordner an uns)? Dürfen wir Bilder für das Web **verkleinern und optimieren** (Format WebP/AVIF)? | Große Bilder bremsen die Seite und verschlechtern das Google-Ranking. | |
| 7.11 | Sollen alte Bilder der bisherigen Seite (`/zubehoer/Bilder`, `/galerie`) übernommen werden? Können Sie diese als Ordner liefern (oder Zugriff auf das alte System geben)? | Die Bilder konnten wir aus unserer Umgebung nicht automatisch abrufen. | |
| 7.12 | Brauchen die Bilder Alternativtexte/Bildunterschriften (z. B. Fahrzeug, Leistungsdaten, Umbau)? Können Sie uns Texte pro Referenz liefern? | Barrierefreiheit und SEO; Referenzseiten gewinnen an Aussagekraft. | |

# 8. Rechtliches, Datenschutz und Tracking

*Wir geben hier keine Rechtsberatung. Wir empfehlen, Impressum und Datenschutzerklärung vor Go-Live durch Ihren Datenschutzbeauftragten oder Rechtsanwalt prüfen zu lassen.*

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 8.1 (!) | Welcher **Hosting-Anbieter / Rechenzentrumsbetreiber** hostet die Seite? Besteht ein Auftragsverarbeitungsvertrag (AVV)? Wo werden die Server-Logfiles gespeichert und wie lange? | Die Datenschutzerklärung nennt bisher keinen Hosting-Anbieter; das müssen wir ergänzen. | |
| 8.2 | Verwenden Sie Statistik-/Tracking-Tools (Google Analytics, Matomo, Meta-Pixel o. Ä.) oder soll eines eingesetzt werden? Wenn ja: welches, mit welchem Konto? | Aktuell ist keines eingebunden. Tools erfordern i. d. R. Einwilligung (Cookie-Banner) und Datenschutztext. | |
| 8.3 (!) | **Google Maps** (Kontaktseite) und **YouTube** (Wohnmobil) werden direkt eingebunden und übertragen Daten an Google. Möchten Sie eine **Zwei-Klick-/Einwilligungslösung** (Karte/Video erst nach Klick laden) oder eine datensparsame Alternative (z. B. Karte als Bild mit Link, OpenStreetMap)? | Rechtlich sicherste Lösung; ändert Darstellung und muss in der Datenschutzerklärung stehen. | |
| 8.4 (!) | Bitte nennen Sie **Handelsregisternummer (HRB)**, vertretungsberechtigte Geschäftsführer/-in laut Handelsregister und ggf. Aufsichtsbehörde/Kammer-Zugehörigkeit. | In Ihren gelieferten Texten fehlen diese Angaben (nur Registergericht und USt-ID sind vorhanden). | |
| 8.5 | Gibt es einen **Datenschutzbeauftragten** (intern/extern)? Soll er im Impressum/Datenschutz genannt werden? | Gesetzliche Pflicht ab bestimmter Mitarbeiteranzahl. | |
| 8.6 | Wollen Sie ein **Kontaktformular** (statt nur Telefon/E-Mail-Link)? Wenn ja: Zielpostfach, Spam-Schutz, Pflichtfelder, Aufbewahrung der Anfragen? | Neue Funktion, benötigt Mailversand (SMTP) und Datenschutztext. | |
| 8.7 | Gibt es einen **Instagram-Account** (`@wimmer_rst`) und weitere Social-Media-Kanäle (Facebook, YouTube)? Sollen Beiträge eingebettet oder nur verlinkt werden? | Einbettungen übertragen Daten; Links nicht. | |
| 8.8 | Sind **Cookies, Newsletter, Bewerbungen oder ähnliche** Funktionen geplant? | Müssen in Datenschutz/Banner berücksichtigt werden. | |
| 8.9 | Sind die Rechtstexte (Impressum, Datenschutz, Garantiebedingungen) aktuell und freigegeben? Wer prüft sie? | Fehler hier haben rechtliche Folgen, daher vor Go-Live Freigabe. | |
| 8.10 | Ist die Barrierefreiheit relevant (z. B. Kunden aus dem öffentlichen Sektor/Behörden)? | Das beeinflusst Prüfumfang und Dokumentation. | |

# 9. Inhalte und Firmendaten – bitte gegenprüfen

Alle Angaben stammen aus den von Ihnen bereitgestellten Texten. Bitte bestätigen oder korrigieren Sie sie.

| Nr. | Angabe | Aktueller Stand in der Website | Korrekt? |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 9.1 | Anschrift | Löhdorferstr. 231, 42699 Solingen | |
| 9.2 | Telefon / Fax / E-Mail | +49 212 264 3000 / +49 212 264 3488 / info@wimmer-rst.de – wird das Fax noch benötigt? | |
| 9.3 | Öffnungszeiten | Mo–Fr 08:00–17:00 Uhr, Mittagspause 12:15–13:15 Uhr – Gibt es Sonderzeiten (Samstag, nach Vereinbarung)? | |
| 9.4 | Geschäftsführung | Dipl.-Ing. Thorsten Wimmer | |
| 9.5 | Kennzahlen | gegründet 1990, „35+ Jahre Erfahrung“, 2.400 m² Fläche, Leistungsmessung „bis 2.000 PS“, „TÜV-zertifizierter Fachbetrieb“ | |
| 9.6 | Partnerschaften & Garantie | „Seit über 20 Jahren KW Performance Partner Pro, 5 Jahre Garantie auf verbaute KW-Fahrwerke“ | |
| 9.7 | Marken & Partner | 17 Marken inkl. Links zu den Herstellerseiten: Fehlen Marken, sind welche zu entfernen? | |
| 9.8 | Wohnmobilvermietung | Niesmann+Bischoff Flair 920 – Sollen Preise, Mietbedingungen, Verfügbarkeitskalender, Buchungsanfrage ergänzt werden? | |
| 9.9 | Leistungsseiten | Fehlen Leistungen oder Fahrzeugkategorien (z. B. Bootsmotoren, KTM X-Bow, Oldtimer)? Die alte Seite hatte dazu eigene Bereiche, die wir derzeit auf „Marken“ bzw. „Leistungen“ weiterleiten. | |
| 9.10 | Bereich „Unternehmen“ | Ist die Zusammenlegung (Über uns, Prüfstand, TÜV, Garantie) als Abschnitt der Startseite weiterhin gewünscht? | |

# 10. Zeit, Aufwand und Verantwortung

| Nr. | Frage | Warum wir das fragen | Ihre Antwort |
|-----|--------------------------------------------|-------------------------------|----------------------|
| 10.1 | Bis wann können Sie die Antworten auf die kritischen Fragen **(!)** liefern? | Der Go-Live-Termin hängt direkt davon ab. | |
| 10.2 | Gibt es ein Budgetlimit oder eine Reihenfolge (z. B. erst Go-Live ohne Fahrzeugsuche-Backend, danach nachliefern)? | Ein gestufter Start ist möglich und oft sinnvoll. | |
| 10.3 | Sonstige Anforderungen, die wir noch nicht kennen (Mehrsprachigkeit, Online-Terminbuchung, Shop, Stellenanzeigen, interne Tools)? | Damit wir in einer späteren Phase nichts umbauen müssen. | |

# Checkliste: Was wir von Ihnen brauchen

☐ Ansprechpartner (fachlich und technisch) – Abschnitt 1

☐ Entscheidung zur Selbstpflege/Redaktionssystem – Abschnitt 2

☐ Zugang/Export des bisherigen Systems und Entscheidung zur Fahrzeugsuche – Abschnitt 3

☐ Serverangaben, Zugang (SFTP/SSH), Domain-/DNS-Verwaltung, E-Mail-Betreiber – Abschnitt 4 und 6

☐ Wunschtermin und Freigabe-Person – Abschnitt 5

☐ Originalbilder, Videos, Logos (SVG), Bildrechte, Downloads – Abschnitt 7

☐ HRB, Datenschutzbeauftragter, Hosting-Anbieter, Entscheidung zu Maps/YouTube/Tracking – Abschnitt 8

☐ Bestätigte Firmendaten – Abschnitt 9
