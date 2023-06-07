/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#FFF8F0',
          100: '#FFF0DF',
          200: '#FF8A00',
          300: '#FF6700',
          400: '#FF5500',
        },
        secondary: {
          50: '#E0F5E6',
          100: '#B6ECC4',
          200: '#0BA332',
          300: '#179638',
        },
      },
    },
  },
  plugins: [],
};
