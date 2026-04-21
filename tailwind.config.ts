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
        cream: '#FAF7F2',
        warmDark: '#1A1208',
        accent: '#C8622A',
        accent2: '#4A7C6F',
        mid: '#E8DDD0',
        textMuted: '#7A6E63',
      },
      fontFamily: {
        playfair: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(26, 18, 8, 0.08), 0 2px 8px -2px rgba(26, 18, 8, 0.04)',
        'soft-lg': '0 8px 40px -8px rgba(26, 18, 8, 0.12), 0 4px 16px -4px rgba(26, 18, 8, 0.06)',
        'soft-xl': '0 16px 60px -12px rgba(26, 18, 8, 0.16), 0 8px 24px -8px rgba(26, 18, 8, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-warm': 'linear-gradient(135deg, #FAF7F2 0%, #F0E8DC 100%)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.97)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
