/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f2f2',
          100: '#eae8e8',
          200: '#d9d9d9',
          300: '#cdcdcd',
          400: '#9a9a9a',
          500: '#5f5f5f',
          600: '#494949',
        },
      },
    },
  },
  plugins: [],
};
