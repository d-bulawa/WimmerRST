# Deployment auf dem NetCap-Server

Dieses Dokument beschreibt, wie die Website **inklusive** der neuen
Fahrzeug-/Tuning-Datenbank (siehe `db/README.md`) auf dem eigenen
NetCap-Server des Kunden produktiv läuft.

## Architektur

Die Seite ist **hybrid** (Astro `output: "hybrid"`, siehe
`astro.config.mjs`):

- Die eigentliche Marketing-Website (Startseite, Leistungen, Marken, …)
  bleibt **statisches HTML** – kein Datenbankzugriff, sehr schnell.
- Nur die Fahrzeugsuche (`/api/modelle.json`, `/api/fahrzeuge.json`) und
  die Fahrzeug-Detailseiten (`/fahrzeug/<slug>`) laufen **serverseitig**
  gegen die MariaDB-Datenbank, weil der Katalog >34.000 Fahrzeuge umfasst
  (zu groß, um beim Build als Einzeldateien zu erzeugen) und sich Preise
  ändern können.

Das bedeutet: auf dem Server läuft dauerhaft ein kleiner Node-Prozess
(`@astrojs/node`, `mode: "standalone"`) plus eine MariaDB-Instanz. Ein
Nginx davor übernimmt TLS und reicht Anfragen an den Node-Prozess durch.

```
Browser ──▶ Nginx (Port 443, TLS) ──▶ Node-Prozess (127.0.0.1:4321) ──▶ MariaDB (127.0.0.1:3306)
```

**Voraussetzung:** ein Root-/vServer mit SSH-Zugriff (Debian/Ubuntu), auf
dem eigene Systemd-Dienste installiert werden können. Bei einem
klassischen Webhosting-Paket (Plesk/cPanel ohne SSH/Node.js) funktioniert
dieser Weg nicht – siehe Abschnitt "Falls kein SSH-Zugriff" unten.

## 1. MariaDB installieren und Datenbank anlegen

```bash
sudo apt update
sudo apt install -y mariadb-server
sudo mysql_secure_installation   # Root-Passwort setzen, Test-DB entfernen etc.

sudo mysql -u root -p <<'SQL'
CREATE DATABASE wimmer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wimmer_app'@'localhost' IDENTIFIED BY '<STARKES-PASSWORT>';
GRANT SELECT, INSERT, UPDATE, DELETE ON wimmer.* TO 'wimmer_app'@'localhost';
FLUSH PRIVILEGES;
SQL
```

MariaDB bleibt an `127.0.0.1`/`localhost` gebunden (Standard) – von außen
nicht erreichbar, nur der lokale Node-Prozess spricht mit ihr.

Schema + Kundendaten importieren wie in `db/README.md` beschrieben:

```bash
mysql --default-character-set=utf8mb4 -u wimmer_app -p wimmer < db/schema.sql
node db/migrate/build-seed.mjs /pfad/zum/kunden-dump.sql db/seed.generated.sql
mysql --default-character-set=utf8mb4 -u wimmer_app -p wimmer < db/seed.generated.sql
```

## 2. Node.js installieren

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
node --version   # sollte >= 18 sein (in Entwicklung getestet mit Node 22)
```

## 3. Code deployen und bauen

```bash
sudo mkdir -p /opt/wimmer-rst
sudo chown $USER:$USER /opt/wimmer-rst
git clone <repo-url> /opt/wimmer-rst
cd /opt/wimmer-rst

cp .env.example .env
# .env bearbeiten: DB_PASSWORD (s. o.), ggf. PORT/HOST anpassen

npm ci
npm run build     # erzeugt dist/client (statisch) + dist/server (Node-App)
```

## 4. Als systemd-Dienst laufen lassen

`/etc/systemd/system/wimmer-rst.service`:

```ini
[Unit]
Description=Wimmer Rennsporttechnik – Astro SSR
After=network.target mariadb.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/wimmer-rst
EnvironmentFile=/opt/wimmer-rst/.env
ExecStart=/usr/bin/node /opt/wimmer-rst/dist/server/entry.mjs
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo chown -R www-data:www-data /opt/wimmer-rst
sudo systemctl daemon-reload
sudo systemctl enable --now wimmer-rst
sudo systemctl status wimmer-rst      # sollte "Server listening on ..." zeigen
journalctl -u wimmer-rst -f           # Live-Logs
```

## 5. Nginx als Reverse Proxy + TLS

```nginx
server {
    listen 80;
    server_name www.wimmer-rst.de wimmer-rst.de;
    location / {
        proxy_pass http://127.0.0.1:4321;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

TLS per certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d wimmer-rst.de -d www.wimmer-rst.de
```

certbot passt die Nginx-Config automatisch für HTTPS + Redirect an und
richtet die automatische Zertifikatserneuerung ein.

## 6. Updates ausrollen

```bash
cd /opt/wimmer-rst
git pull
npm ci
npm run build
sudo systemctl restart wimmer-rst
```

Neue Kundendaten (aktualisierter DB-Export) einspielen: siehe
"Neue Kundendaten einspielen" in `db/README.md`, danach reicht ein
`systemctl restart` nicht zwingend nötig (die App liest bei jeder Anfrage
live aus der DB), schadet aber nicht.

## 7. Backups

```bash
# Täglicher Cronjob, z. B. /etc/cron.daily/wimmer-db-backup
mysqldump --default-character-set=utf8mb4 -u wimmer_app -p'<PASSWORT>' wimmer \
  | gzip > /var/backups/wimmer-$(date +%F).sql.gz
find /var/backups -name 'wimmer-*.sql.gz' -mtime +30 -delete
```

## Falls kein SSH-Zugriff (klassisches Webhosting statt Root-/vServer)

Dieser Aufbau (dauerhafter Node-Prozess + eigene MariaDB) braucht
SSH-Zugriff und die Möglichkeit, Systemd-Dienste anzulegen. Bei einem
reinen Plesk/cPanel-Webhosting-Paket ohne SSH ist das nicht möglich – dann
vorher klären, ob NetCap für diese Domain ein root-/vServer-Produkt
anbietet (meist ihr Standardprodukt), oder alternativ die Datenbank nur
als Datenquelle für einen Build-Schritt nutzen und weiterhin eine rein
statische Seite ausliefern (dann keine Live-Preisänderungen ohne
Neu-Build). Bei Bedarf dazu gerne gesondert einen Migrationsweg ausarbeiten.
