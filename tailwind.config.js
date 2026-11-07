/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rec: {
          purple: {
            DEFAULT: '#6B21A8',
            dark: '#4C1D95',
            light: '#9333EA',
            subtle: '#FAF5FF',
            border: '#E9D5FF'
          },
          orange: {
            DEFAULT: '#F97316',
            dark: '#C2410C',
            light: '#FB923C',
            subtle: '#FFF7ED',
            border: '#FED7AA'
          },
          green: {
            DEFAULT: '#10B981',
            dark: '#047857',
            light: '#34D399',
            neon: '#22C55E',
            subtle: '#F0FDF4',
            border: '#BBF7D0'
          },
          cyan: {
            DEFAULT: '#06B6D4',
            dark: '#0E7490',
            subtle: '#ECFEFF'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'mobile-card': '0 2px 8px -1px rgba(0, 0, 0, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'nav-bar': '0 -4px 16px -1px rgba(0, 0, 0, 0.08)',
        'floating-pin': '0 4px 12px rgba(107, 33, 168, 0.35)',
      }
    },
  },
  plugins: [],
}

