import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-index-to-404',
      writeBundle() {
        const indexHtmlPath = path.resolve(__dirname, 'dist/index.html');
        const fallbackHtmlPath = path.resolve(__dirname, 'dist/404.html');
        if (fs.existsSync(indexHtmlPath)) {
          fs.copyFileSync(indexHtmlPath, fallbackHtmlPath);
        }
      }
    }
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    historyApiFallback: true
  }
})
