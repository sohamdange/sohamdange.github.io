export const metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      <h1 className="font-display text-4xl text-[#111111] tracking-display mb-6">Contact</h1>
      <p className="text-[#6B7280] mb-12">Best reached via LinkedIn or email.</p>

      <div className="flex flex-col gap-5">
        <a
          href="https://linkedin.com/in/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-baseline gap-6 group focus-visible:outline-none"
        >
          <span className="text-sm text-[#6B7280] w-16 shrink-0">LinkedIn</span>
          <span className="text-[#111111] group-hover:text-[#2563EB] group-focus-visible:text-[#2563EB] group-active:text-[#2563EB] transition-colors underline underline-offset-2">
            linkedin.com/in/placeholder
          </span>
        </a>

        <a
          href="https://github.com/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-baseline gap-6 group focus-visible:outline-none"
        >
          <span className="text-sm text-[#6B7280] w-16 shrink-0">GitHub</span>
          <span className="text-[#111111] group-hover:text-[#2563EB] group-focus-visible:text-[#2563EB] group-active:text-[#2563EB] transition-colors underline underline-offset-2">
            github.com/placeholder
          </span>
        </a>

        <a
          href="mailto:placeholder@email.com"
          className="flex items-baseline gap-6 group focus-visible:outline-none"
        >
          <span className="text-sm text-[#6B7280] w-16 shrink-0">Email</span>
          <span className="text-[#111111] group-hover:text-[#2563EB] group-focus-visible:text-[#2563EB] group-active:text-[#2563EB] transition-colors underline underline-offset-2">
            placeholder@email.com
          </span>
        </a>
      </div>
    </div>
  )
}
