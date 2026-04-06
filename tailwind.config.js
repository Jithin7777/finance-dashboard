// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enables dark mode via "dark" class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
theme: {
  extend: {
    fontFamily: {
      sans: ["Manrope", "sans-serif"],
    },
  },
},  plugins: [],
};