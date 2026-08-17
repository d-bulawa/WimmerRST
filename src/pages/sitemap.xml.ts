import type { APIRoute } from 'astro';
import { leistungenChildren } from '../data/site';

const staticPaths = [
  '/',
  '/leistungen',
  '/fahrzeugsuche',
  '/marken',
  '/unternehmen',
  '/referenzen',
  '/wohnmobil',
  '/kontakt',
  '/impressum',
  '/datenschutz',
];

const paths = [...staticPaths, ...leistungenChildren.map((c) => c.href)];

export const GET: APIRoute = () => {
  const siteUrl = 'https://www.wimmer-rst.de';
  const urls = paths
    .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
