/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#c93b2b',
          crimson: '#9b1b1b',
          gold: '#e69500',
          yellow: '#f7b928',
          cream: '#fcf7ee',
          card: '#ffffff',
          charcoal: '#2d2522',
          muted: '#7a6f68',
          border: '#e8ded4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        kannada: ['Noto Sans Kannada', 'sans-serif']
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'card-lg': '0 14px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
        'inner-photo': 'inset 0 2px 8px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}
