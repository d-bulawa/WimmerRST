#!/usr/bin/env node
// Baut aus dem rohen mysqldump-Export (6 flache Plone-Tabellen) die
// INSERT-Anweisungen für das neue, normalisierte Schema (siehe db/schema.sql).
//
// Nutzung:
//   node db/migrate/build-seed.mjs <pfad-zum-dump.sql> [ausgabe.sql]
//
// Die Ausgabedatei wird NICHT ins Repo eingecheckt (siehe .gitignore) – sie
// enthält die vollständigen Preis-/Fahrzeugdaten des Kunden und wird direkt
// auf dem Zielserver importiert (mysql < seed.generated.sql).

import { readFileSync, writeFileSync } from 'node:fs';
import { extractInserts } from './parse-dump.mjs';

const [, , inputPath, outputPathArg] = process.argv;
if (!inputPath) {
  console.error('Nutzung: node db/migrate/build-seed.mjs <dump.sql> [ausgabe.sql]');
  process.exit(1);
}
const outputPath = outputPathArg || new URL('../seed.generated.sql', import.meta.url).pathname;

const raw = readFileSync(inputPath, 'utf8');

// --- Hilfsfunktionen ------------------------------------------------------

// Der Dump enthält vereinzelt den literalen String 'NULL' (in Anführungs-
// zeichen) statt eines echten SQL-NULL sowie leere Strings ''. Beides
// bedeutet fachlich "kein Wert".
function emptyToNull(v) {
  if (v === null) return null;
  if (typeof v === 'string' && (v.trim() === '' || v.trim() === 'NULL')) return null;
  return v;
}

function toIntOrNull(v) {
  const c = emptyToNull(v);
  if (c === null) return null;
  const n = Number(String(c).trim());
  return Number.isFinite(n) ? Math.round(n) : null;
}

// Für Monatsfelder (1-12): der Kundenexport enthält bei ein paar neueren
// Fahrzeugen (>= 900000er fahrzeug_id) Ausreißer wie "2017" oder "10/2008"
// statt einer reinen Monatszahl – dort auf NULL setzen statt die Spalte
// (TINYINT) zum Überlaufen zu bringen.
function toMonthOrNull(v) {
  const n = toIntOrNull(v);
  return n !== null && n >= 1 && n <= 12 ? n : null;
}

function trimOrNull(v) {
  const c = emptyToNull(v);
  return c === null ? null : String(c).trim();
}

const UMLAUTE = { ä: 'ae', ö: 'oe', ü: 'ue', Ä: 'Ae', Ö: 'Oe', Ü: 'Ue', ß: 'ss' };
function slugify(...parts) {
  const text = parts.filter(Boolean).join(' ');
  const transliterated = text.replace(/[äöüÄÖÜß]/g, (c) => UMLAUTE[c] ?? c);
  return transliterated
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // übrige Akzente
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160);
}

function sqlStr(v) {
  if (v === null || v === undefined) return 'NULL';
  return `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}
function sqlVal(v) {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return String(v);
  return sqlStr(v);
}

function insertStatements(table, columns, rows, batchSize = 500) {
  if (rows.length === 0) return '';
  const out = [];
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const tuples = batch.map((row) => `(${columns.map((c) => sqlVal(row[c])).join(',')})`);
    out.push(`INSERT INTO \`${table}\` (${columns.map((c) => `\`${c}\``).join(',')}) VALUES\n${tuples.join(',\n')};`);
  }
  return out.join('\n');
}

// --- 1. Rohdaten einlesen -------------------------------------------------

const rawHersteller = extractInserts(raw, 'hersteller');
const rawModelle = extractInserts(raw, 'modelle');
const rawFahrzeuge = extractInserts(raw, 'fahrzeuge');
const rawChiptuning = extractInserts(raw, 'chiptuning');
const rawAuspuff = extractInserts(raw, 'auspuff');
const rawKat = extractInserts(raw, 'kat');

console.log('Eingelesen: hersteller=%d modelle=%d fahrzeuge=%d chiptuning=%d auspuff=%d kat=%d',
  rawHersteller.length, rawModelle.length, rawFahrzeuge.length, rawChiptuning.length, rawAuspuff.length, rawKat.length);

// --- 2. hersteller ---------------------------------------------------------

const hersteller = rawHersteller.map((r) => ({
  id: r[1],
  name: trimOrNull(r[2]),
}));
const herstellerIds = new Set(hersteller.map((h) => h.id));
const herstellerSlugs = new Map(hersteller.map((h) => [h.id, slugify(h.name)]));

// --- 3. modelle -------------------------------------------------------------

const modelleRows = [];
const modellIds = new Set();
let orphanModelle = 0;
let namelessModelle = 0;
for (const r of rawModelle) {
  const herstellerId = r[1];
  const modellId = r[3];
  const name = trimOrNull(r[4]);
  if (!herstellerIds.has(herstellerId)) {
    orphanModelle++;
    continue;
  }
  // Vereinzelt hat der Kundenexport Modell-Datensätze ohne Namen (Altlast
  // aus dem alten Plone-Backend) – ohne Namen weder anzeigbar noch fachlich
  // sinnvoll auswählbar, daher überspringen (ihre Fahrzeuge fallen dann
  // konsequent unter "fahrzeuge ohne bekanntes Modell").
  if (!name) {
    namelessModelle++;
    continue;
  }
  modellIds.add(modellId);
  modelleRows.push({
    id: modellId,
    hersteller_id: herstellerId,
    name,
    slug: slugify(name),
  });
}

// --- 4. fahrzeuge -----------------------------------------------------------

const fahrzeugeRows = [];
const fahrzeugIds = new Set();
let orphanFahrzeuge = 0;
let namelessFahrzeuge = 0;
for (const r of rawFahrzeuge) {
  const modellId = r[3];
  const fahrzeugId = r[5];
  const fahrzeugName = trimOrNull(r[6]);
  if (!modellIds.has(modellId)) {
    orphanFahrzeuge++;
    continue;
  }
  // Wie bei modelle: ohne Namen weder anzeigbar noch sinnvoll auswählbar.
  if (!fahrzeugName) {
    namelessFahrzeuge++;
    continue;
  }
  fahrzeugIds.add(fahrzeugId);
  const herstellerName = trimOrNull(r[2]);
  const modellName = trimOrNull(r[4]);
  fahrzeugeRows.push({
    id: fahrzeugId,
    modell_id: modellId,
    name: fahrzeugName,
    slug: `${slugify(herstellerName, modellName, fahrzeugName)}-${fahrzeugId}`,
    typ: trimOrNull(r[7]),
    form: trimOrNull(r[8]),
    eg_nummer: trimOrNull(r[9]),
    antriebsachse: trimOrNull(r[10]),
    achslast_va: toIntOrNull(r[11]),
    achslast_ha: toIntOrNull(r[12]),
    zul_gesamtgewicht: toIntOrNull(r[13]),
    laenge: toIntOrNull(r[14]),
    breite: toIntOrNull(r[15]),
    hoehe: toIntOrNull(r[16]),
    stuetzlast: toIntOrNull(r[17]),
    anhaengelast_gebremst: toIntOrNull(r[18]),
    anhaengelast_ungebremst: toIntOrNull(r[19]),
    treibstoff: trimOrNull(r[20]),
    motor: trimOrNull(r[21]),
    motorcode: trimOrNull(r[22]),
    motor_oelmenge: trimOrNull(r[23]),
    ps: trimOrNull(r[24]),
    kw: trimOrNull(r[25]),
    leistung_bei_umdrehungen: toIntOrNull(r[26]),
    hubraum: trimOrNull(r[27]),
    co2_emissions_wert: toIntOrNull(r[28]),
    leergewicht: toIntOrNull(r[29]),
    max_kmh: toIntOrNull(r[30]),
    sitzanzahl: toIntOrNull(r[31]),
    tueranzahl: toIntOrNull(r[32]),
    prod_monat_von: toMonthOrNull(r[33]),
    prod_monat_bis: toMonthOrNull(r[34]),
    prod_jahr_von: toIntOrNull(r[35]),
    prod_jahr_bis: toIntOrNull(r[36]),
    hsn: trimOrNull(r[37]),
    tsn: trimOrNull(r[38]),
    vsn: trimOrNull(r[39]),
  });
}

// Slugs müssen als URL-Pfad eindeutig sein (die numerische fahrzeug_id ist es
// bereits, das Suffix reicht daher rechnerisch – wir prüfen es trotzdem).
const slugSeen = new Set();
let slugCollisions = 0;
for (const f of fahrzeugeRows) {
  if (slugSeen.has(f.slug)) slugCollisions++;
  slugSeen.add(f.slug);
}

// --- 5. chiptuning: 6 Spaltenblöcke -> eine Zeile je Stufe ------------------

// Einzelne Fahrzeuge haben im Kundenexport mehr als einen chiptuning-
// Datensatz (vermutlich ein nachträglich ergänzter Preis, ohne den alten
// Datensatz zu löschen). (fahrzeug_id, stufe) muss aber eindeutig sein –
// wir behalten daher je Stufe den zuletzt im Dump stehenden Datensatz
// (Map überschreibt bei Kollision) und protokollieren, wie oft das vorkam.
const chiptuningByKey = new Map();
let orphanChiptuning = 0;
let chiptuningOverwrites = 0;
for (const r of rawChiptuning) {
  const fahrzeugId = r[1];
  if (!fahrzeugIds.has(fahrzeugId)) {
    orphanChiptuning++;
    continue;
  }
  for (let stufe = 1; stufe <= 6; stufe++) {
    const base = 2 + (stufe - 1) * 4; // Index der stufe_N_leistung-Spalte
    const leistung = trimOrNull(r[base]);
    const drehmoment = trimOrNull(r[base + 1]);
    const preis = trimOrNull(r[base + 2]);
    const text = trimOrNull(r[base + 3]);
    if (!leistung && !drehmoment && !preis && !text) continue; // Stufe nicht vorhanden
    const key = `${fahrzeugId}-${stufe}`;
    if (chiptuningByKey.has(key)) chiptuningOverwrites++;
    chiptuningByKey.set(key, { fahrzeug_id: fahrzeugId, stufe, leistung, drehmoment, preis, beschreibung: text });
  }
}
const chiptuningRows = [...chiptuningByKey.values()];

// --- 6. auspuff & kat: 1:1 mit umbenannten Spalten --------------------------

function mapTuningTable(rawRows, label) {
  const out = [];
  let orphans = 0;
  for (const r of rawRows) {
    const fahrzeugId = r[1];
    if (!fahrzeugIds.has(fahrzeugId)) {
      orphans++;
      continue;
    }
    const leistung = trimOrNull(r[2]);
    const preis = trimOrNull(r[3]);
    const text = trimOrNull(r[4]);
    if (!leistung && !preis && !text) continue;
    out.push({ fahrzeug_id: fahrzeugId, leistung, preis, beschreibung: text });
  }
  if (orphans) console.warn(`${label}: ${orphans} Zeilen ohne bekanntes Fahrzeug übersprungen`);
  return out;
}

const auspuffRows = mapTuningTable(rawAuspuff, 'auspuff');
const katRows = mapTuningTable(rawKat, 'kat');

// --- Validierungsbericht -----------------------------------------------------

console.log('---');
console.log('hersteller:            %d', hersteller.length);
console.log('modelle:               %d (übersprungen: %d ohne bekannten Hersteller, %d ohne Namen)', modelleRows.length, orphanModelle, namelessModelle);
console.log('fahrzeuge:             %d (übersprungen: %d ohne bekanntes Modell, %d ohne Namen)', fahrzeugeRows.length, orphanFahrzeuge, namelessFahrzeuge);
console.log('  slug-Kollisionen:    %d', slugCollisions);
console.log('chiptuning_stufen:     %d (aus %d Fahrzeug-Datensätzen, %d ohne bekanntes Fahrzeug, %d durch neueren Datensatz ersetzt)', chiptuningRows.length, rawChiptuning.length, orphanChiptuning, chiptuningOverwrites);
console.log('auspuffanlagen:        %d', auspuffRows.length);
console.log('sportkatalysatoren:    %d', katRows.length);

if (orphanModelle || namelessModelle || orphanFahrzeuge || namelessFahrzeuge || orphanChiptuning || slugCollisions) {
  console.warn('\nAchtung: siehe Warnungen oben – Daten wurden übersprungen bzw. es gab Slug-Kollisionen.');
}

// --- SQL schreiben -----------------------------------------------------------

const sqlParts = [
  '-- Automatisch generiert aus dem Kunden-Dump mit db/migrate/build-seed.mjs',
  '-- Nicht von Hand bearbeiten – bei neuen Kundendaten Skript erneut laufen lassen.',
  '--',
  '-- WICHTIG: Diese Datei ist UTF-8-kodiert. Ohne "SET NAMES utf8mb4" (bzw.',
  '-- den CLI-Schalter --default-character-set=utf8mb4) interpretiert der',
  '-- mysql-Client die Bytes ggf. als latin1 -> Umlaute/€ werden dann beim',
  '-- Import doppelt UTF-8-kodiert und sind hinterher kaputt.',
  'SET NAMES utf8mb4;',
  'SET FOREIGN_KEY_CHECKS=0;',
  '',
  insertStatements('hersteller', ['id', 'name', 'slug'], hersteller.map((h) => ({ ...h, slug: herstellerSlugs.get(h.id) }))),
  '',
  insertStatements('modelle', ['id', 'hersteller_id', 'name', 'slug'], modelleRows),
  '',
  insertStatements('fahrzeuge', [
    'id', 'modell_id', 'name', 'slug', 'typ', 'form', 'eg_nummer', 'antriebsachse',
    'achslast_va', 'achslast_ha', 'zul_gesamtgewicht', 'laenge', 'breite', 'hoehe',
    'stuetzlast', 'anhaengelast_gebremst', 'anhaengelast_ungebremst', 'treibstoff',
    'motor', 'motorcode', 'motor_oelmenge', 'ps', 'kw', 'leistung_bei_umdrehungen',
    'hubraum', 'co2_emissions_wert', 'leergewicht', 'max_kmh', 'sitzanzahl', 'tueranzahl',
    'prod_monat_von', 'prod_monat_bis', 'prod_jahr_von', 'prod_jahr_bis', 'hsn', 'tsn', 'vsn',
  ], fahrzeugeRows),
  '',
  insertStatements('chiptuning_stufen', ['fahrzeug_id', 'stufe', 'leistung', 'drehmoment', 'preis', 'beschreibung'], chiptuningRows),
  '',
  insertStatements('auspuffanlagen', ['fahrzeug_id', 'leistung', 'preis', 'beschreibung'], auspuffRows),
  '',
  insertStatements('sportkatalysatoren', ['fahrzeug_id', 'leistung', 'preis', 'beschreibung'], katRows),
  '',
  'SET FOREIGN_KEY_CHECKS=1;',
  '',
];

writeFileSync(outputPath, sqlParts.join('\n'));
console.log(`\nSeed-Datei geschrieben: ${outputPath}`);
