/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bytes-black': '#0F0F0F',
        'bytes-lime': '#C8F000',
        'bytes-dark': '#1A1A1A',
      },
    },
  },
  plugins: [],
}