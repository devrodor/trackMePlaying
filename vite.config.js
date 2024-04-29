// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 5973,   
    open: true,  
    watch: { 
      usePolling: true
    }
  }, 
  resolve: { 
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }, 
  build: {
    outDir: '../dist',   
    emptyOutDir: true,   
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src', 'index.html')
      }
    }
  },
  plugins: []
})
