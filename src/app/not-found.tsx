import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      <p className="font-mono text-xs text-brand-muted mb-4">404</p>

      <h1 className="font-display text-4xl text-brand-text tracking-display mb-4">
        Page not found
      </h1>

      <p className="text-brand-muted leading-reading mb-10 max-w-[540px]">
        That page does not exist, or it moved. The links below cover everything on the site.
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Projects' },
          { href: '/writing', label: 'Writing' },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-brand-text hover:text-brand-accent focus-visible:outline-none focus-visible:text-brand-accent active:text-brand-accent transition-colors underline underline-offset-2"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
