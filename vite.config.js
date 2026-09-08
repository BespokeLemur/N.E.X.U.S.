import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  // GitHub Pages: repo adı N.E.X.U.S. olduğu için base path gerekiyor
  base: command === 'build' ? '/N.E.X.U.S./' : '/',
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
