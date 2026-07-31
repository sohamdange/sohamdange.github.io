import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/resume', label: 'Resume' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className="border-b border-brand-border">
      <div className="max-w-wide mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-brand-text font-semibold hover:text-brand-accent focus-visible:outline-none focus-visible:text-brand-accent transition-colors"
        >
          Home
        </Link>

        <div className="flex items-center gap-4">
          {/* Five links plus the toggle overflow a 375px viewport at gap-6,
              so the gap tightens on mobile and the group wraps as a last resort. */}
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 sm:gap-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-brand-muted hover:text-brand-text focus-visible:outline-none focus-visible:text-brand-text active:text-brand-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
