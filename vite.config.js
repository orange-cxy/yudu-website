import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/yudu-website/',
  server: { port: 3456 },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
