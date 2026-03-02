export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] mt-24">
      <div className="max-w-wide mx-auto px-6 md:px-8 py-6 text-sm text-[#6B7280]">
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] focus-visible:outline-none focus-visible:text-[#111111] active:text-[#111111] transition-colors"
          >
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://linkedin.com/in/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] focus-visible:outline-none focus-visible:text-[#111111] active:text-[#111111] transition-colors"
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
