/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#F2F0EB',         // 'Surface' from image (Main Body Background - Cream)
          primary: '#D8C3B8',    // 'BG' from image (Dusty Rose - for Sections/Cards)
          text: '#363636',       // 'Text' (Dark Charcoal)
          muted: '#6B5B52',      // 'Muted' (Brownish Gray)
          accent: '#3E2723',     // 'Accent' (Deep Coffee Brown - Buttons)
          border: '#D7D3CE',     // Subtle border color
        }
      },
      boxShadow: {
        'warm': '0 10px 40px -10px rgba(62, 39, 35, 0.1)', // Warm brown shadow
        'glow': '0 0 40px rgba(216, 195, 184, 0.3)',      // Dusty Rose glow
      }
    },
  },
  plugins: [],
}