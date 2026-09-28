import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// BASE_PATH wird nur für Vorschau-Deploys unter einem Unterpfad gesetzt
// (z. B. GitHub Pages: /WimmerRST). Für die Produktion auf der eigenen
// Domain bleibt es leer -> base "/".
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  site: 'https://www.wimmer-rst.de',
  base: basePath,
  // "hybrid": alle Seiten bleiben statisch vorgerendert (schnell, kein
  // Node-Prozess nötig für die Marketing-Seiten), nur die Fahrzeugsuche
  // (API-Endpunkte + Fahrzeug-Detailseiten, siehe deren `prerender = false`)
  // läuft serverseitig gegen die MariaDB-Datenbank auf dem NetCap-Server.
  output: 'hybrid',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
  },
});
