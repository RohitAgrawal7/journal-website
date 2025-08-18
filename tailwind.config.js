/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        #1e40af: '#1E40AF',  // Professional blue
        #10b981: '#10B981', // Green for CTAs
        accent: '#F59E0B',    // Yellow for highlights
        neutral: '#F3F4F6',   // Light gray for backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};