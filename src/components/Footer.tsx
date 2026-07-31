export default function Footer() {
  return (
    <footer className="border-t border-brand-border mt-24">
      <div className="max-w-wide mx-auto px-6 md:px-8 py-6 text-sm text-brand-muted">
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-text focus-visible:outline-none focus-visible:text-brand-text active:text-brand-text transition-colors"
          >
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-text focus-visible:outline-none focus-visible:text-brand-text active:text-brand-text transition-colors"
          >
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <span>© Soham Dange 2025</span>
        </div>
      </div>
    </footer>
  )
}
