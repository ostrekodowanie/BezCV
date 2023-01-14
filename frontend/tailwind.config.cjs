/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'linear-gradient(90.04deg, #2F66F4 24.53%, #0D9AE9 82.58%)',
        secondary: '#F98D3D',
        darkPrimary: '#234CB8',
        darkSecondary: '#cf7432',
        lightPrimary: '#E5ECFD',
        font: '#141B3F'
      },
      backgroundImage: {
        primary: 'linear-gradient(90.04deg, #2F66F4 24.53%, #0D9AE9 82.58%)',
        background: 'linear-gradient(89.7deg, rgba(0, 40, 250, 0.018) -12.57%, rgba(0, 40, 250, 0) 94.56%)',
        footer: 'linear-gradient(180deg, rgba(15, 50, 235, 0) 0%, rgba(15, 50, 235, 0.105) 100%)',
        search: "url('./assets/search.svg')"
      },
      gridTemplateColumns: {
        skp: 'repeat(auto-fit, minmax(300px, 1fr))'
      },
      boxShadow: {
        primarySmall: '0px 4px 14px rgba(12, 50, 250, 0.1)',
        boxPrimary: '6px -6px 65px rgba(47, 102, 244, 0.06), -6px 6px 65px rgba(47, 102, 244, 0.06)',
        primaryBig: '0px 14px 69px rgba(47, 102, 244, 0.09)'
      }
    },
  },
  plugins: [],
}
