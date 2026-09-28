-- Wimmer RST – Fahrzeug-/Tuning-Datenbank, optimiertes Schema
-- Ersetzt die 6 flachen Plone-Exporttabellen (hersteller, modelle, fahrzeuge,
-- chiptuning, auspuff, kat) durch ein normalisiertes Schema:
--   - hersteller_name/modell_name werden nicht mehr in jeder fahrzeuge-Zeile
--     wiederholt, sondern per Fremdschlüssel referenziert.
--   - chiptuning: die 6 Spaltenblöcke (stufe_1_… bis stufe_6_…) werden zu
--     einer Zeile pro tatsächlich vorhandener Stufe (chiptuning_stufen).
--   - Alle IDs sind die ursprünglichen Plone-Objekt-IDs (hersteller_id,
--     modell_id, fahrzeug_id aus dem alten Export), damit alte Verweise und
--     die neuen kebab-case-Slugs stabil bleiben.
--
-- Import-Reihenfolge:
--   mysql -u <user> -p <db> < db/schema.sql
--   node db/migrate/build-seed.mjs <kunden-dump>.sql db/seed.generated.sql
--   mysql -u <user> -p <db> < db/seed.generated.sql

SET NAMES utf8mb4;

-- Hinweis Datenqualität: im Kundenexport kommen einzelne Herstellernamen
-- doppelt vor, mit unterschiedlicher business id (z. B. "Smart" als 22931
-- UND 90008, "KTM" als 90009 UND 90011, "Morgan"/"Cadillac" je zweimal mit
-- und ohne Leerzeichen im Namen). Die IDs bleiben bewusst getrennt (ein
-- automatisches Zusammenführen könnte Fahrzeuge der falschen Dublette
-- zuordnen) – daher hier KEIN UNIQUE auf slug/name. Vor Go-Live mit dem
-- Kunden klären, ob diese Dubletten bereinigt werden sollen.
CREATE TABLE IF NOT EXISTS hersteller (
  id    INT UNSIGNED NOT NULL,
  name  VARCHAR(128) NOT NULL,
  slug  VARCHAR(160) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_hersteller_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS modelle (
  id             INT UNSIGNED NOT NULL,
  hersteller_id  INT UNSIGNED NOT NULL,
  name           VARCHAR(128) NOT NULL,
  slug           VARCHAR(160) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_modelle_hersteller (hersteller_id),
  CONSTRAINT fk_modelle_hersteller FOREIGN KEY (hersteller_id) REFERENCES hersteller (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS fahrzeuge (
  id                          INT UNSIGNED NOT NULL,
  modell_id                   INT UNSIGNED NOT NULL,
  name                        VARCHAR(128) NOT NULL,
  slug                        VARCHAR(191) NOT NULL,
  typ                         VARCHAR(128) DEFAULT NULL,
  form                        VARCHAR(64)  DEFAULT NULL,
  eg_nummer                   VARCHAR(64)  DEFAULT NULL,
  antriebsachse               VARCHAR(64)  DEFAULT NULL,
  achslast_va                 SMALLINT UNSIGNED DEFAULT NULL,
  achslast_ha                 SMALLINT UNSIGNED DEFAULT NULL,
  zul_gesamtgewicht           SMALLINT UNSIGNED DEFAULT NULL,
  laenge                      SMALLINT UNSIGNED DEFAULT NULL,
  breite                      SMALLINT UNSIGNED DEFAULT NULL,
  hoehe                       SMALLINT UNSIGNED DEFAULT NULL,
  stuetzlast                  SMALLINT UNSIGNED DEFAULT NULL,
  anhaengelast_gebremst       SMALLINT UNSIGNED DEFAULT NULL,
  anhaengelast_ungebremst     SMALLINT UNSIGNED DEFAULT NULL,
  treibstoff                  VARCHAR(32)  DEFAULT NULL,
  motor                       VARCHAR(64)  DEFAULT NULL,
  motorcode                   VARCHAR(64)  DEFAULT NULL,
  motor_oelmenge              VARCHAR(16)  DEFAULT NULL,
  -- ps/kw/hubraum bleiben Text: vereinzelt (< 0.2 % der Datensätze) stehen im
  -- Kundenexport Freitexte statt reiner Zahlen (z. B. "460 PS / 338 KW"),
  -- eine erzwungene INT-Spalte würde diese Datensätze beim Import verlieren.
  ps                          VARCHAR(32)  DEFAULT NULL,
  kw                          VARCHAR(32)  DEFAULT NULL,
  leistung_bei_umdrehungen    SMALLINT UNSIGNED DEFAULT NULL,
  hubraum                     VARCHAR(16)  DEFAULT NULL,
  co2_emissions_wert          SMALLINT UNSIGNED DEFAULT NULL,
  leergewicht                 SMALLINT UNSIGNED DEFAULT NULL,
  max_kmh                     SMALLINT UNSIGNED DEFAULT NULL,
  sitzanzahl                  TINYINT UNSIGNED DEFAULT NULL,
  tueranzahl                  TINYINT UNSIGNED DEFAULT NULL,
  prod_monat_von              TINYINT UNSIGNED DEFAULT NULL,
  prod_monat_bis              TINYINT UNSIGNED DEFAULT NULL,
  prod_jahr_von               SMALLINT UNSIGNED DEFAULT NULL,
  prod_jahr_bis               SMALLINT UNSIGNED DEFAULT NULL,
  -- HSN/TSN/VSN sind Kfz-Schlüsselnummern und können führende Nullen haben
  -- (z. B. TSN '065') -> immer als Text speichern, nie als Zahl.
  hsn                         VARCHAR(16)  DEFAULT NULL,
  tsn                         VARCHAR(16)  DEFAULT NULL,
  vsn                         VARCHAR(16)  DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_fahrzeuge_slug (slug),
  KEY idx_fahrzeuge_modell (modell_id),
  CONSTRAINT fk_fahrzeuge_modell FOREIGN KEY (modell_id) REFERENCES modelle (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chiptuning: statt 6× (leistung, drehmoment, preis, text) als Spaltenblock
-- eine Zeile je tatsächlich angebotener Stufe.
CREATE TABLE IF NOT EXISTS chiptuning_stufen (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  fahrzeug_id   INT UNSIGNED NOT NULL,
  stufe         TINYINT UNSIGNED NOT NULL,
  leistung      VARCHAR(32) DEFAULT NULL,
  drehmoment    VARCHAR(32) DEFAULT NULL,
  preis         VARCHAR(16) DEFAULT NULL,
  beschreibung  TEXT DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_chiptuning_fahrzeug_stufe (fahrzeug_id, stufe),
  CONSTRAINT fk_chiptuning_fahrzeug FOREIGN KEY (fahrzeug_id) REFERENCES fahrzeuge (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS auspuffanlagen (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  fahrzeug_id   INT UNSIGNED NOT NULL,
  leistung      VARCHAR(32) DEFAULT NULL,
  preis         VARCHAR(16) DEFAULT NULL,
  beschreibung  TEXT DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_auspuff_fahrzeug (fahrzeug_id),
  CONSTRAINT fk_auspuff_fahrzeug FOREIGN KEY (fahrzeug_id) REFERENCES fahrzeuge (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sportkatalysatoren (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  fahrzeug_id   INT UNSIGNED NOT NULL,
  leistung      VARCHAR(32) DEFAULT NULL,
  preis         VARCHAR(16) DEFAULT NULL,
  beschreibung  TEXT DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_kat_fahrzeug (fahrzeug_id),
  CONSTRAINT fk_kat_fahrzeug FOREIGN KEY (fahrzeug_id) REFERENCES fahrzeuge (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
