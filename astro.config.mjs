import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.wimmer-rst.de',
  vite: {
    plugins: [tailwindcss()],
  },
});
