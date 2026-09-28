import mysql from 'mysql2/promise';

// Ein Pool pro Node-Prozess (Astro SSR läuft "standalone", also ein
// lang laufender Prozess statt einer Function-per-Request-Umgebung) –
// wiederverwendet Verbindungen statt für jede Anfrage neu zu verbinden.
let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (!pool) {
    // Bewusst process.env statt import.meta.env: das hier sind Server-
    // Secrets, die zur Laufzeit im Node-Prozess auf dem NetCap-Server aus
    // der .env kommen (siehe db/README.md) – nicht Build-Zeit-Variablen,
    // die Vite sonst in den Client-Bundle-Code einbacken würde.
    pool = mysql.createPool({
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ?? 'wimmer',
      waitForConnections: true,
      connectionLimit: 10,
      charset: 'utf8mb4_unicode_ci',
    });
  }
  return pool;
}

export async function query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await getPool().query(sql, params);
  return rows as T[];
}
