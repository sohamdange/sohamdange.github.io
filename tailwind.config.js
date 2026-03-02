/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          text: '#111111',
          muted: '#6B7280',
          accent: '#2563EB',
          border: '#E5E7EB',
        },
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
