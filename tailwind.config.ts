import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: '#F3F4F6',
        dark: '#2C4B5C',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          900: '#1F327E',
          800: '#2F4CBC',
          700: '#3F66FB',
          600: '#9FB2FD',
          500: '#FF5D00',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          sec: '#0067CC',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

// navy: "#001D3D",
//         orange: "#FF5D00",
