import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#1F327E',
          800: '#2F4CBC',
          700: '#3F66FB',
          600: '#9FB2FD',
          500: '#CFD8FE',
        },
        secondary: '#0067CC',
        light: '#F3F4F6',
        dark: '#2C4B5C',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'paragraph-xl': ['48px', { lineHeight: '32px' }],
        'paragraph-lg': ['36px', { lineHeight: '24px' }],
        'paragraph-md': ['32px', { lineHeight: '20px' }],
        'paragraph-sm': ['28px', { lineHeight: '18px', letterSpacing: '2%' }],
        'paragraph-xs': ['24px', { lineHeight: '16px', letterSpacing: '2%' }],
        'paragraph-xxs': ['24px', { lineHeight: '14px', letterSpacing: '2%' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
