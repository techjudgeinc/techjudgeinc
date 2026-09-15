import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://www.techjudge.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: { server: { strictPort: true } }
});
