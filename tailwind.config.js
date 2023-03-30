/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        percentage: 'percentage 1s ease-in-out forwards',
      },
      keyframes: {
        percentage: {
          '0%': { '--percent': 0 },
          '100%': { '--percent': 'var(--curr-percent)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-primary)'],
        'sans-secondary': ['var(--font-secondary)'],
      },
      colors: require('./colors.json'),
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
