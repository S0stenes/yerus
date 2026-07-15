import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://yerus.com.br',
  integrations: [react()],
  vite: {
    ssr: {
      // anime.js precisa ser transpilado corretamente pelo bundler
      noExternal: ['animejs'],
    },
  },
});
