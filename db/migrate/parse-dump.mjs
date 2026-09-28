// Parst einen mysqldump-Export (INSERT INTO `tabelle` VALUES (...),(...);)
// ohne externe Abhängigkeiten. Erwartet Standard-mysqldump-Escaping
// (Backslash vor Sonderzeichen, NO_BACKSLASH_ESCAPES ist nicht gesetzt).

/**
 * Liest alle Werte-Tupel aus den `INSERT INTO \`table\` VALUES ...;`
 * Anweisungen einer Tabelle aus dem kompletten Dump-Text.
 * @param {string} sql Gesamter Dump-Inhalt
 * @param {string} table Tabellenname ohne Backticks
 * @returns {Array<Array<string|number|null>>}
 */
export function extractInserts(sql, table) {
  const rows = [];
  const needle = `INSERT INTO \`${table}\` VALUES`;
  let searchFrom = 0;

  while (true) {
    const start = sql.indexOf(needle, searchFrom);
    if (start === -1) break;
    let i = start + needle.length;
    // Ende der Anweisung ist ein ';' außerhalb von Strings/Klammern.
    const stmtEnd = findStatementEnd(sql, i);
    parseTuples(sql, i, stmtEnd, rows);
    searchFrom = stmtEnd + 1;
  }

  return rows;
}

function findStatementEnd(sql, from) {
  let depth = 0;
  let inString = false;
  for (let i = from; i < sql.length; i++) {
    const c = sql[i];
    if (inString) {
      if (c === '\\') {
        i++; // nächstes Zeichen ist escaped, überspringen
      } else if (c === "'") {
        inString = false;
      }
      continue;
    }
    if (c === "'") {
      inString = true;
    } else if (c === '(') {
      depth++;
    } else if (c === ')') {
      depth--;
    } else if (c === ';' && depth === 0) {
      return i;
    }
  }
  throw new Error(`Kein Statement-Ende für Tabelle ab Position ${from} gefunden`);
}

function parseTuples(sql, from, to, out) {
  let i = from;
  while (i < to) {
    if (sql[i] === '(') {
      const [row, next] = parseTuple(sql, i + 1);
      out.push(row);
      i = next;
    } else {
      i++;
    }
  }
}

function parseTuple(sql, from) {
  const values = [];
  let i = from;
  let buf = '';
  let inString = false;
  // War der gerade aufgebaute Wert (mind. einmal) in Anführungszeichen?
  // Entscheidend, damit z. B. HSN/TSN-Codes wie '065' als String mit
  // führender Null erhalten bleiben statt zu einer Zahl 65 zu werden.
  let wasQuoted = false;

  const pushBuf = () => {
    const trimmed = wasQuoted ? buf : buf.trim();
    if (!wasQuoted && trimmed === 'NULL') {
      values.push(null);
    } else if (!wasQuoted && /^-?\d+(\.\d+)?$/.test(trimmed)) {
      values.push(trimmed.includes('.') ? parseFloat(trimmed) : parseInt(trimmed, 10));
    } else {
      values.push(trimmed);
    }
    buf = '';
    wasQuoted = false;
  };

  while (i < sql.length) {
    const c = sql[i];
    if (inString) {
      if (c === '\\') {
        const next = sql[i + 1];
        const map = { n: '\n', r: '\r', t: '\t', '0': '\0', Z: '\x1a' };
        buf += next in map ? map[next] : next;
        i += 2;
        continue;
      }
      if (c === "'") {
        // mysqldump verdoppelt Quotes gelegentlich nicht (Backslash-Escaping
        // ist Standard), aber '' als Escape wird zur Sicherheit mitbehandelt.
        if (sql[i + 1] === "'") {
          buf += "'";
          i += 2;
          continue;
        }
        inString = false;
        i++;
        continue;
      }
      buf += c;
      i++;
      continue;
    }

    if (c === "'") {
      inString = true;
      wasQuoted = true;
      i++;
    } else if (c === ',') {
      pushBuf();
      i++;
    } else if (c === ')') {
      pushBuf();
      return [values, i + 1];
    } else {
      buf += c;
      i++;
    }
  }
  throw new Error('Unerwartetes Ende eines Tupels');
}
