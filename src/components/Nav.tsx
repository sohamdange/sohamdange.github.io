import Link from 'next/link'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className="border-b border-[#E5E7EB]">
      <div className="max-w-wide mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-[#111111] font-semibold hover:text-[#2563EB] focus-visible:outline-none focus-visible:text-[#2563EB] transition-colors"
        >
          Home
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#6B7280] hover:text-[#111111] focus-visible:outline-none focus-visible:text-[#111111] active:text-[#111111] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
