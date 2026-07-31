import { GITHUB_URL, LINKEDIN_URL } from '@/lib/constants'

export default function Footer() {
  // Static export, so this resolves at build time — accurate as long as the
  // site is rebuilt at least once a year, which every push does.
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-border mt-24">
      <div className="max-w-wide mx-auto px-6 md:px-8 py-6 text-sm text-brand-muted">
        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-text focus-visible:outline-none focus-visible:text-brand-text active:text-brand-text transition-colors"
          >
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-text focus-visible:outline-none focus-visible:text-brand-text active:text-brand-text transition-colors"
          >
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <span>© Soham Dange {year}</span>
        </div>
      </div>
    </footer>
  )
}
