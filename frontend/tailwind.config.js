/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vegas-purple': {
          900: '#4e0094',
          950: '#2d0056'
        },
        'vegas-gold': {
          400: '#ffd700',
          500: '#e6c300'
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-win': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 215, 0, 0.5)',
      },
    },
  },
  plugins: [],
};