// Builds a single self-contained HTML file of the app (JS, CSS and fonts inlined)
// for sharing as a clickable preview. Analytics are off and reviews aren't sent.
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [viteSingleFile({ removeViteModuleLoader: true })],
  define: { 'import.meta.env.VITE_PROTOTYPE': JSON.stringify('1'), 'import.meta.env.VITE_POSTHOG_KEY': JSON.stringify('') },
  build: { outDir: 'dist-prototype', target: 'es2020', assetsInlineLimit: 100000000, cssCodeSplit: false }
});
