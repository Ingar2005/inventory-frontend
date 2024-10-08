/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'steel-blue': {
        '50': '#f3f7fb',
        '100': '#e3ecf6',
        '200': '#cde0f0',
        '300': '#abcae5',
        '400': '#83afd7',
        '500': '#6694cb',
        '600': '#517bbd',
        '700': '#486aad',
        '800': '#3f588e',
        '900': '#374a71',
        '950': '#253046',
    },
    
      }
    },
  },
  plugins: [],
}