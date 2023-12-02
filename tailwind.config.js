/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#0E7EA3',
        'hover-primary': '#09537A',
        'secondary': '#45A5BF',
        'info': '#A9D6E5',
        'success': '#06D6A0',
        'danger': '#Ef476F',
        'neutral': '#C0C0C0',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}