/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Detecta clases en todos los archivos fuente
  ],
  theme: {
    extend: {
      colors: {
        bambu: '#b3cd23', // Verde personalizado de la marca
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Fuente base para todo el sitio
        titulo: ['"Fun City Level 2 Stencil"', 'sans-serif'], // Fuente decorativa opcional
      },
    },
  },
  plugins: [],
}
