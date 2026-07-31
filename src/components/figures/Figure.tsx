import type { ReactNode } from 'react'

/**
 * Wrapper for the in-article figures.
 *
 * Figures on this site are plain DOM — a labelled grid with absolutely
 * positioned marks — rather than SVG or a raster export. Two reasons:
 * text stays real text (so it scales, wraps, and is read by assistive
 * tech), and every color resolves through the brand tokens, so a figure
 * follows the theme instead of staying white in dark mode.
 *
 * The eyebrow states what is plotted; a single-series figure needs no
 * legend because of it. The caption carries the reading — what the
 * figure is evidence of — and the units.
 */
export default function Figure({
  eyebrow,
  caption,
  children,
}: {
  eyebrow: string
  caption: ReactNode
  children: ReactNode
}) {
  return (
    <figure className="my-12 border-t border-brand-border pt-6">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-brand-muted mb-7">
        {eyebrow}
      </p>

      {children}

      <figcaption className="mt-7 text-sm leading-reading text-brand-muted">
        {caption}
      </figcaption>
    </figure>
  )
}
