import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://blog.rosnertech.com.br',
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      // tema escuro que combina com #111510
      theme: 'github-dark',
      wrap: false,
    },
  },
});
