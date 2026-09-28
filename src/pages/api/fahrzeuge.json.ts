import type { APIRoute } from 'astro';
import { withBase } from '../../lib/url';
import { query } from '../../lib/db';

// Ersetzt den alten Plone-Endpunkt `/list_fahrzeuge_auswahl?modell=…`.
export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const modellId = Number(url.searchParams.get('modell'));
  if (!Number.isInteger(modellId) || modellId <= 0) {
    return new Response('[]', { status: 400, headers: { 'content-type': 'application/json' } });
  }

  const rows = await query<{ slug: string; name: string; typ: string | null }>(
    'SELECT slug, name, typ FROM fahrzeuge WHERE modell_id = ? ORDER BY name',
    [modellId],
  );

  const items = rows.map((r) => ({
    value: withBase(`/fahrzeug/${r.slug}`),
    label: r.typ ? `${r.name} (${r.typ})` : r.name,
  }));
  return new Response(JSON.stringify(items), { headers: { 'content-type': 'application/json' } });
};
