const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // extend: {},
    colors: {
      'blue-dianne': '#264653',
      'jungle-green': '#2a9d8f',
      'rob-roy': '#e9c46a',
      'sandy-brown': '#f4a261',
      'burnt-sienna': '#e76f51',
      gray: colors.coolGray,
      blue: colors.blue,
      white: colors.white,
      black: colors.black,
      transparent: 'transparent'
    },
    fontFamily: {
      'sans': ['Inter'],
      'serif': ['Playfair'],
      'mono': ['FiraCode']
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
