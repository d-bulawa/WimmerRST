---
title: "Agenda und Fragen für das Erstgespräch"
subtitle: "Wimmer Rennsporttechnik Solingen GmbH – Website-Relaunch: Launch, Hosting, Datenbank, Medien"
lang: de-DE
---

# Zur Einordnung

Dieses Papier ist die Kurzfassung für das Erstgespräch. Es nimmt die Punkte aus dem Telefonat vom 17.09.2026 auf (Teil A) und fragt nur das ab, was wir für den Start zwingend brauchen (Teil B). Die ausführliche Fassung mit allen Detailfragen (Fragenkatalog-Kunde) folgt nach dem Gespräch, soweit dann noch nötig.

**(!)** = blockiert den Go-Live. Notizen und Entscheidungen tragen wir im Gespräch in die rechte Spalte ein.

**Technisch vorab:** Die neue Seite besteht aus fertig erzeugten, statischen Dateien. Sie braucht auf dem Server **keine Datenbank und keine Programmiersprache**, ein normaler Webserver genügt. Ein Backend wird nur für Fahrzeugsuche, Preislogik und ein Kontaktformular benötigt.

# Teil A: Punkte aus dem Telefonat vom 17.09.2026

| Nr. | Thema und Stand laut Telefonat | Frage für das Gespräch | Notizen / Entscheidung |
|-----|-------------------------------|------------------------------------------|---------------------|
| A1 (!) | **Server:** Die Seite soll auf dem eigenen Server von Wimmer liegen (im Protokoll „NetCap“). Fallback durch Umleitung auf einen anderen Server lt. Datenbank. | Welcher Anbieter/Server ist gemeint (bitte Schreibweise bestätigen)? Wer administriert ihn? Was genau ist mit dem Fallback gemeint (Ausfallsicherheit bei Server-Ausfall, oder Weiterleitung der Fahrzeugsuche auf das Altsystem)? | |
| A2 (!) | **Datenbanken:** Müssen funktionieren und richtig eingebunden sein. Fahrzeugauswahl für Leistungssteigerung/Chiptuning bleibt erhalten, nur optisch aufgefrischt. | Läuft das bisherige System (Plone) nach dem Umzug weiter? Bekommen wir Zugriff/Export der Fahrzeugdaten? Wer pflegt diese Daten künftig, in welchem Format? Was zeigt die Fahrzeug-Detailseite heute (Beispiel-Links)? | |
| A3 | **Selfservice und Service:** Wimmer hat umfassenden Service, der auf der Website sichtbar werden soll. | Was ist mit „Selfservice“ konkret gemeint (z. B. Online-Anfrage/Angebot, Terminbuchung, Downloads, Statusabfrage)? Welche drei Services sollen als Erstes sichtbar sein? | |
| A4 | **Google-Auffindbarkeit:** Zum Start soll die Seite weit vorne bei Google erscheinen (Ranking hängt vom Traffic ab). | Für welche Suchbegriffe soll die Seite gefunden werden (z. B. „Chiptuning Solingen“, KW-Fahrwerk, Auspuff)? Gibt es Zugang zur Search Console und ein Google-Unternehmensprofil? Welche bestehenden Seiten und Backlinks sind besonders wertvoll? *Hinweis: Eine Platzierung lässt sich nicht garantieren. Wir sichern die Grundlagen ab (Weiterleitungen, Sitemap, Ladezeit, lokale Daten).* | |
| A5 | **Texte:** Inhalte bleiben allgemein gehalten, aber: erster Eindruck kurz und knapp (Stichpunkte), eine Ebene tiefer (z. B. Pop-up) mehr Details (Vorbild: ABT Sportsline). Insgesamt mehr Bullet Points. | Wer liefert/prüft die Stichpunkte je Leistung? Für welche Leistungen soll das zuerst umgesetzt werden? Gibt es weitere gute Beispiele außer ABT? | |
| A6 | **Diagramme zur Leistungssteigerung:** Sollen mit Hilfe von KI erstellt werden. | Aus welchen Daten (Prüfstandsmessungen, Herstellerangaben)? Sollen es echte Messkurven oder illustrative Diagramme sein? Wer prüft die Werte vor Veröffentlichung? *Hinweis: Leistungsangaben müssen belegbar sein (Wettbewerbs- und Haftungsrecht), daher keine frei erfundenen Kurven.* | |
| A7 | **Preislogik:** Automatismus für Preiserhöhungen mit 1:N-Beziehung (Beispiel Abgasanlagen: eine Änderung wirkt auf mehrere Produkte). | Sollen Preise öffentlich auf der Seite stehen oder nur intern (Angebote)? Wo liegen die Preise heute (Excel, Warenwirtschaft)? Welche Regeln gelten (Prozentaufschlag, Rundung, MwSt, Gültigkeit)? Wer löst die Preisänderung aus? | |
| A8 | **Partnerseiten und Bestellung:** Bei Verlinkung zu KW, H&R u. a. soll sichergestellt sein, dass die Bestellung bei Wimmer landet. Herstellerpreislisten können hinterlegt werden (Beispiel: Aulitzky). | Statt externer Links: Soll es eine Anfrage-/Bestellfunktion bei Wimmer geben? Dürfen die Herstellerpreislisten laut Händlervertrag veröffentlicht oder verarbeitet werden? In welchem Format liegen sie vor? | |
| A9 (!) | **Spam:** Kritischer Punkt. Aktuell viel Spam über die Website. Klärung mit E-Mail-Provider und Webcrawlern nötig. | Wohin kommt der Spam (Postfach `info@`, Formular, Fax)? Welcher E-Mail-Provider? *Hinweis: Auf der neuen Seite steht die Adresse im Klartext (Crawler lesen sie aus). Wir empfehlen ein Kontaktformular mit Spam-Schutz statt öffentlicher Adresse.* Soll das Formular kommen? | |
| A10 | **Offline-Nutzung:** Die Seite soll auch ohne Netz voll nutzbar sein, um z. B. auf Messen Angebote schreiben zu können. Optionen: App (kostet extra), Starlink als „Endlösung“. | Was genau muss offline gehen (Fahrzeugsuche, Preise, Angebot erstellen, Angebot als PDF)? Mit welchen Geräten (Tablet, Laptop)? Wie oft kommt das vor? *Wir prüfen eine installierbare Web-App mit lokaler Datenkopie als günstigere Mittellösung.* | |
| A11 | **PDF-Angebote:** Review nötig, Zeilenumbrüche und Layout sind fehlerhaft. | Wie entstehen die PDFs heute (Warenwirtschaft, Word-Vorlage, Webseite)? Können Sie 2–3 Beispiel-PDFs liefern? Gehören die PDFs zum Projektumfang? | |
| A12 | **Instagram:** Account soll verknüpft werden. Auf Bildern sollen Nummernschilder anonymisiert werden (durch Wimmer). *Falls Instagram-Inhalte auch gehostet werden sollen, muss neu verhandelt werden (Mehraufwand).* | Reicht ein Link/Verweis auf den Account oder soll der Feed eingebettet bzw. gespiegelt werden? Wer anonymisiert und in welchem Umfang (nur die neuen Bilder oder auch bestehende Referenzfotos)? | |

# Teil B: Grundlagen für den Go-Live

| Nr. | Frage | Notizen / Entscheidung |
|-----|---------------------------------------------------------------|---------------------|
| B1 (!) | **Ansprechpartner:** Wer entscheidet fachlich, wer ist technischer Ansprechpartner (eigene IT oder Dienstleister)? Vertretung bei Abwesenheit? | |
| B2 (!) | **Hosting:** Betriebssystem und Webserver (Apache/Nginx/IIS)? Standort des Servers? Gibt es eine Test-/Staging-Adresse? Einschränkungen (Firewall, VPN, IP-Freigabe)? | |
| B3 (!) | **Zugang für uns:** SFTP/SSH mit eigenem Benutzer? Sicherer Austausch der Zugangsdaten (Passwort-Manager, keine E-Mail)? Automatisches Deployment gewünscht? | |
| B4 (!) | **Domain und DNS:** Wer verwaltet `wimmer-rst.de` und kann DNS ändern? Hängen E-Mail-Postfächer daran (MX-Einträge)? Hauptadresse mit oder ohne „www“? Was passiert mit der alten Subdomain `wwwalt`? | |
| B5 | **Zertifikat (HTTPS):** Vorhanden oder kostenlos über Let’s Encrypt? Wer verlängert? | |
| B6 (!) | **Go-Live:** Wunschtermin und Zeiträume, die zu meiden sind (Messen, Betriebsferien)? Kurze Unterbrechung abends/am Wochenende akzeptabel? Altsystem für eine Übergangszeit parallel erhalten? | |
| B7 | **Backups und Wartung:** Wer sichert Seite und Datenbank (Rhythmus, Aufbewahrung)? Wartungsvertrag gewünscht (Updates, Monitoring, Inhaltsänderungen)? Gewünschte Reaktionszeit bei Störung? | |
| B8 | **Eigentum am Code:** Soll das Repository nach Abschluss auf ein Konto von Wimmer übertragen werden? | |
| B9 | **Pflege der Inhalte:** Will Wimmer Inhalte künftig selbst ändern (CMS) oder beauftragt es Änderungen? Wie oft ändern sich Inhalte? Wer wäre Redakteur? | |
| B10 (!) | **Bilder und Logos:** Wo liegen die Originale (hohe Auflösung, auch Wohnmobil-Fotos)? Sind die Referenzfotos final und die Bildrechte geklärt? Liegen Markenlogos (KW, H&R, Brembo, …) als SVG vor, inkl. Erlaubnis zur Nutzung? | |
| B11 | **Speicher für Medien:** Wie viele neue Bilder/Videos pro Jahr? Videos selbst hosten oder weiter YouTube? Gibt es Downloads (Datenblätter, Gutachten)? Genug Speicherplatz auf dem Server? | |
| B12 (!) | **Rechtliches:** Handelsregisternummer (HRB) und ggf. weitere Pflichtangaben fürs Impressum? Hosting-Anbieter für die Datenschutzerklärung? Sollen Google Maps und YouTube erst nach Klick laden (Einwilligung)? Wird Tracking/Statistik eingesetzt (siehe unten)? | |
| B13 | **Erfolgsmessung:** Wie viele Anfragen (Anrufe/Mails) kommen heute pro Woche? Statistikzahlen der alten Seite vorhanden? Soll ein datenschutzfreundliches Tracking (ohne Cookie-Banner) eingerichtet werden? | |
| B14 | **Firmendaten:** Anschrift, Telefon, Fax (noch relevant?), E-Mail, Öffnungszeiten, Kennzahlen („35+ Jahre“, „bis 2.000 PS“), KW-Partnerschaft: stimmen die Angaben auf der Vorschau-Seite? | |

# Nächste Schritte und Mitzubringendes

☐ Zugang/Export des Altsystems (Fahrzeugdaten) oder Termin mit dem bisherigen Betreuer

☐ Serverangaben, Zugang und Ansprechpartner IT/Domain

☐ Beispiel-PDFs der Angebote, Preislisten (Format), Beispiel für Preislogik

☐ Originalbilder, Logos (SVG), Bildrechte, Instagram-Zugang bzw. -Entscheidung

☐ HRB und weitere Impressumsangaben

☐ Entscheidungen zu Offline-Nutzung, Kontaktformular und Tracking

☐ Termin für den Go-Live und für die Folgebesprechung (Angebot für Zusatzleistungen: Offline-Lösung, Preislogik, Diagramme, Instagram-Hosting)
