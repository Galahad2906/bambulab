// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // ⬅️ Opcional: puerto local personalizado
    open: true  // ⬅️ Opcional: abre el navegador al iniciar
  },
  preview: {
    port: 4173 // ⬅️ Opcional: puerto para vista previa de build
  }
})
