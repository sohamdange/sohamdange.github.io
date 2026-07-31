/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      // Every brand color resolves through a CSS variable defined in
      // globals.css, so `data-theme` on <html> reskins the whole site.
      // Do not put hex values here — they would not follow the theme.
      colors: {
        brand: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          border: 'var(--color-border)',
        },
      },
      // Tailwind's preflight hardcodes #e5e7eb for a bare `border`.
      borderColor: {
        DEFAULT: 'var(--color-border)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Consolas', 'monospace'],
      },
      maxWidth: {
        content: '720px',
        wide: '960px',
      },
      letterSpacing: {
        display: '-0.03em',
      },
      lineHeight: {
        reading: '1.7',
      },
    },
  },
  plugins: [],
}
