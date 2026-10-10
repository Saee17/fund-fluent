import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: { input: { main: resolve(import.meta.dirname, 'index.html'), privacy: resolve(import.meta.dirname, 'privacy.html') } }
  }
});
