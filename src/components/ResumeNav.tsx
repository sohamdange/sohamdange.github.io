'use client'

import { useEffect, useState } from 'react'
import { resumeSections } from '@/lib/resume'

/** Distance below the viewport top at which a section counts as "current". */
const ACTIVE_OFFSET = 120

/**
 * Section rail for /resume — a sticky column from `lg` up, a wrapping row
 * above the content below that.
 *
 * The only client component on the page. It exists for the active-section
 * highlight; without that a sticky rail reads as dead chrome. Links are plain
 * anchors, so the rail still works with JavaScript off — only the highlight
 * is lost. Jumps are native and instant: the site does no smooth scrolling.
 */
export default function ResumeNav() {
  // Server and first client render agree on the first section, so there is
  // no hydration mismatch and no placeholder frame.
  const [activeId, setActiveId] = useState(resumeSections[0].id)

  useEffect(() => {
    const elements = resumeSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    // Recomputed from live layout on every crossing rather than tracked
    // incrementally — IntersectionObserver reports entries out of document
    // order, and reconciling that is more code than just re-reading.
    const syncActive = () => {
      const passed = elements.filter(
        (element) => element.getBoundingClientRect().top <= ACTIVE_OFFSET
      )
      setActiveId((passed[passed.length - 1] ?? elements[0]).id)
    }

    const observer = new IntersectionObserver(syncActive, {
      rootMargin: `-${ACTIVE_OFFSET}px 0px -55% 0px`,
      threshold: 0,
    })

    elements.forEach((element) => observer.observe(element))
    syncActive()

    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Resume sections"
      className="mb-10 lg:mb-0 lg:w-48 lg:shrink-0 lg:sticky lg:top-10"
    >
      <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-x-0 lg:gap-y-3">
        {resumeSections.map((section) => {
          const isActive = section.id === activeId

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`block text-sm transition-colors focus-visible:outline-none lg:border-l lg:pl-3 ${
                  isActive
                    ? 'text-brand-text lg:border-brand-accent hover:text-brand-accent focus-visible:text-brand-accent active:text-brand-accent'
                    : 'text-brand-muted lg:border-brand-border hover:text-brand-text focus-visible:text-brand-text active:text-brand-text'
                }`}
              >
                {section.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
