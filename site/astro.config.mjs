import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://deliberate.work',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
