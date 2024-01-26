// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,  // Ejemplo: Elige el puerto para el servidor de desarrollo
    open: true,  // Abre el navegador automáticamente al iniciar el servidor
    watch: {
      // Configura el hot reloading
      usePolling: true
    }
  },
  // Configuración para la resolución de rutas
  resolve: {
    // Configura alias para rutas. Util útil si tienes rutas de importación complejas
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // Configura el directorio raíz del proyecto
  root: path.join(__dirname, 'src'),
  // Configura el proceso de construcción
  build: {
    outDir: '../dist',  // Coloca la carpeta de salida (dist) en la raíz del proyecto
    emptyOutDir: true,  // Limpia el directorio de salida al construir
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src', 'index.html')
      }
    }
  },
  plugins: [
    // ... tus plugins aquí ...
  ]
})
