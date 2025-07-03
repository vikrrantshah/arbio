/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '../../libs/shared/ui/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('../../tailwind.preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
