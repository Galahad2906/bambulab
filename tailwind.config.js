/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bambu: "#b3cd23",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        titulo: ["'Fun City Level 2 Stencil'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
