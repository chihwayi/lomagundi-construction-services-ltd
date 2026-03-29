import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#DC143C',
          light: '#FF1A4F',
          dark: '#A50E2D',
        },
        royal: {
          DEFAULT: '#4169E1',
          light: '#6B8BF5',
          dark: '#2850CB',
        },
        accent: {
          DEFAULT: '#7C3AED',
          light: '#9B59F7',
          dark: '#5B21B6',
        },
        dark: {
          DEFAULT: '#0A0A0F',
          100: '#12121A',
          200: '#1A1A26',
          300: '#252535',
          400: '#32324A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'sans-serif'],
        cursive: ['var(--font-dancing)', 'cursive'],
      },
      backgroundImage: {
        'grid-dark': "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '64px 64px',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}

export default config
