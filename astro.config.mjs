import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// BASE_PATH wird nur für Vorschau-Deploys unter einem Unterpfad gesetzt
// (z. B. GitHub Pages: /WimmerRST). Für die Produktion auf der eigenen
// Domain bleibt es leer -> base "/".
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  site: 'https://www.wimmer-rst.de',
  base: basePath,
  vite: {
    plugins: [tailwindcss()],
  },
});
