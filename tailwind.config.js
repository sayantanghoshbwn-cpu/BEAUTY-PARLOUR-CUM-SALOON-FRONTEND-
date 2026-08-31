/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f5d68a',
          DEFAULT: '#d4af37',
          dark: '#9e7e1e',
          champagne: '#e6c887',
        },
        'rose-gold': {
          light: '#f7d6ce',
          DEFAULT: '#c98978',
          dark: '#9a5e50',
        },
        obsidian: {
          950: '#07080b',
          900: '#0c0e14',
          800: '#141620',
          700: '#1c1f2d',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        accent: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'liquid-glow': '0 0 50px -10px rgba(212, 175, 55, 0.15)',
        'liquid-pill': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'whatsapp-glow': '0 0 35px rgba(37, 211, 102, 0.35)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite alternate',
        'float-gentle': 'floatGentle 6s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%': { opacity: '0.4', transform: 'scale(0.98)' },
          '100%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        floatGentle: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-8px)' },
        },
      }
    },
  },
  plugins: [],
}
