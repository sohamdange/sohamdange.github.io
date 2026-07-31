'use client'

import { useEffect } from 'react'
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme'

/**
 * Two-state theme switch.
 *
 * Deliberately renders no theme-dependent markup: which icon and which
 * accessible label appear is decided by CSS off the `data-theme` attribute
 * on <html> (see globals.css). The inline script in layout.tsx sets that
 * attribute before first paint, so the correct icon is there on the very
 * first frame and the server HTML never disagrees with the client — no
 * hydration mismatch, no `mounted` flag, no placeholder.
 */
export default function ThemeToggle() {
  // Until the visitor picks a side, keep following the OS live — so flipping
  // the system appearance updates an open tab. Once they click, the stored
  // choice wins and this stops applying.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')

    const followSystem = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return
      document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'
    }

    query.addEventListener('change', followSystem)
    return () => query.removeEventListener('change', followSystem)
  }, [])

  const toggle = () => {
    const next: Theme =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'

    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Private browsing or blocked storage: the theme still applies for
      // this page view, it just will not be remembered.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle p-1 -m-1 text-brand-muted hover:text-brand-text focus-visible:outline-none focus-visible:text-brand-text active:text-brand-text transition-colors"
    >
      <span className="theme-icon-to-dark">
        <MoonIcon />
        <span className="sr-only">Switch to dark theme</span>
      </span>
      <span className="theme-icon-to-light">
        <SunIcon />
        <span className="sr-only">Switch to light theme</span>
      </span>
    </button>
  )
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

function MoonIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}
