/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff385c',         // Airbnb pink
        'primary-dark': '#e11d48',  // darker for hover
      },
    },
  },  
  plugins: [],
}
