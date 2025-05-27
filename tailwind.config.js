/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8F8F8',  // Light Gray
          100: '#F0F0F0', // Neutral Base
          200: '#E6E6FA', // Lavender
          300: '#ADD8E6', // Sky Blue
          400: '#FFE5B4', // Soft Peach
          500: '#FFFACD', // Pale Gold
          600: '#50C878', // Emerald Green
          700: '#4A5568', // Muted Text
          800: '#2D3748', // Dark Text
          900: '#1A202C'  // Deepest Shade
        },
        accent: {
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#171923'
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Lato', 'system-ui', 'sans-serif'],
        rounded: ['var(--font-rounded)', 'system-ui', 'sans-serif'] // For softer text variants
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FFFACD, 0 0 10px #FFFACD, 0 0 15px #FFFACD' },
          '100%': { boxShadow: '0 0 10px #FFFACD, 0 0 20px #FFFACD, 0 0 30px #FFFACD' }
        },
        shimmer: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-soft': 'linear-gradient(to right, #ADD8E6, #E6E6FA)'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};