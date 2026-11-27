/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          black: '#111111',
          graphite: '#1B1B1B',
          paper: '#E8E0D0',
          beige: '#B9AD99',
          red: '#8F2929',
          grey: '#777777',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Special Elite"', '"Courier Prime"', 'monospace'],
      },
    },
  },
  plugins: [],
};
