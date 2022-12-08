/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0028FA',
        darkPrimary: '#091E8C',
        font: '#141B3F'
      },
      backgroundImage: {
        background: 'linear-gradient(89.7deg, rgba(0, 40, 250, 0.018) -12.57%, rgba(0, 40, 250, 0) 94.56%)',
        footer: 'linear-gradient(180deg, rgba(15, 50, 235, 0) 0%, rgba(15, 50, 235, 0.105) 100%)',
        search: "url('./assets/search.svg')"
      },
      gridTemplateColumns: {
        skp: 'repeat(auto-fit, minmax(300px, 1fr))'
      },
      boxShadow: {
        primarySmall: '0px 4px 14px rgba(12, 50, 250, 0.1)'
      }
    },
  },
  plugins: [],
}
