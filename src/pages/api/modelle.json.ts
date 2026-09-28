import type { APIRoute } from 'astro';
import { query } from '../../lib/db';

// Ersetzt den alten Plone-Endpunkt `/list_modelle_auswahl?hersteller=…`.
// Läuft serverseitig (siehe astro.config.mjs: output "hybrid"), fragt bei
// jedem Aufruf live die MariaDB-Datenbank auf dem NetCap-Server ab.
export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const herstellerId = Number(url.searchParams.get('hersteller'));
  if (!Number.isInteger(herstellerId) || herstellerId <= 0) {
    return new Response('[]', { status: 400, headers: { 'content-type': 'application/json' } });
  }

  const rows = await query<{ id: number; name: string }>(
    'SELECT id, name FROM modelle WHERE hersteller_id = ? ORDER BY name',
    [herstellerId],
  );

  const items = rows.map((r) => ({ value: String(r.id), label: r.name }));
  return new Response(JSON.stringify(items), { headers: { 'content-type': 'application/json' } });
};
