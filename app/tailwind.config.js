/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Nebula brand colors
        'nebula-navy': '#0A192F',
        'nebula-gold': '#D4AF37',
        'nebula-gold-hover': '#E5C354',
        'obsidian-base': '#010409',

        // Material Design 3 dark theme tokens
        'surface': '#0b141c',
        'on-surface': '#dae3ee',
        'on-surface-variant': '#c6c6cb',
        'surface-container': '#182028',
        'surface-container-high': '#222b33',
        'surface-container-highest': '#2d363e',
        'surface-container-low': '#141c24',
        'surface-container-lowest': '#060f16',
        'surface-dim': '#0b141c',
        'surface-bright': '#313a43',
        'surface-variant': '#2d363e',
        'background': '#0b141c',

        'primary': '#c3c6cf',
        'on-primary': '#2d3137',
        'primary-container': '#0d1117',
        'on-primary-container': '#797d85',
        'primary-fixed': '#dfe2eb',
        'on-primary-fixed': '#181c22',
        'on-primary-fixed-variant': '#43474e',
        'primary-fixed-dim': '#c3c6cf',

        'secondary': '#e9c176',
        'on-secondary': '#412d00',
        'secondary-container': '#604403',
        'on-secondary-container': '#dab36a',
        'secondary-fixed': '#ffdea5',
        'secondary-fixed-dim': '#e9c176',
        'on-secondary-fixed': '#261900',
        'on-secondary-fixed-variant': '#5d4201',

        'tertiary': '#bec7db',
        'on-tertiary': '#283140',
        'tertiary-container': '#08111f',
        'on-tertiary-container': '#747d8f',
        'tertiary-fixed': '#dae3f7',
        'tertiary-fixed-dim': '#bec7db',
        'on-tertiary-fixed': '#131c2a',
        'on-tertiary-fixed-variant': '#3e4757',

        'error': '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',

        'outline': '#8f9095',
        'outline-variant': '#45474b',

        'inverse-surface': '#dae3ee',
        'inverse-on-surface': '#29313a',
        'inverse-primary': '#5b5e66',

        // Syntax highlighting colors
        'syntax-green': '#7EE787',
        'syntax-blue': '#58A6FF',

        // Legacy shadcn tokens (mapped to dark theme)
        border: '#45474b',
        input: '#45474b',
        ring: '#D4AF37',
        foreground: '#dae3ee',
      },
      fontFamily: {
        'display': ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        'headline': ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        'body': ['"Inter"', 'system-ui', 'sans-serif'],
        'tech': ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'tech-label': ['14px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'tech-data': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'DEFAULT': '0.125rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        'full': '0.75rem',
      },
      spacing: {
        'gutter': '24px',
        'margin-mobile': '20px',
        'margin-desktop': '64px',
        'max-width': '1280px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(10, 25, 47, 0.06)',
        'card-hover': '0 8px 32px rgba(10, 25, 47, 0.12)',
        'nav': '0 2px 16px rgba(10, 25, 47, 0.08)',
        'button': '0 4px 16px rgba(255, 184, 0, 0.3)',
        'button-hover': '0 6px 20px rgba(255, 184, 0, 0.35)',
        'gold': '0 0 30px -5px rgba(212, 175, 55, 0.15)',
        'gold-hover': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-strong': '0 0 15px rgba(212, 175, 55, 0.4)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "drift": {
          "0%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(15px, -15px)" },
          "66%": { transform: "translate(-10px, 10px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "drift": "drift 20s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
