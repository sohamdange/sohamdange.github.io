import { GITHUB_URL, LINKEDIN_URL, displayUrl } from '@/lib/constants'

export const metadata = {
  title: 'Contact',
}

const links = [
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'GitHub', href: GITHUB_URL },
]

export default function ContactPage() {
  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      <h1 className="font-display text-4xl text-brand-text tracking-display mb-6">Contact</h1>
      <p className="text-brand-muted mb-12">Best reached via LinkedIn.</p>

      <div className="flex flex-col gap-5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline gap-6 group focus-visible:outline-none"
          >
            <span className="text-sm text-brand-muted w-16 shrink-0">{link.label}</span>
            <span className="text-brand-text group-hover:text-brand-accent group-focus-visible:text-brand-accent group-active:text-brand-accent transition-colors underline underline-offset-2">
              {displayUrl(link.href)}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
