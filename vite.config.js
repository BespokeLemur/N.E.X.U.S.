import { defineConfig } from 'vite';

export default defineConfig(() => ({
  // Relative base path './' for universal USB, GitHub Pages, and local file:// compatibility
  base: './',
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
}));
