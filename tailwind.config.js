const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'navy': '#273043',
      'honey': '#f39237',
      'magenta': '#bf1363',
      'azure': '#0e79b2',
      'parchment': '#fbfff1',
    },
    extend: {
      fontFamily: {
        sans: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
