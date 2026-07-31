import Link from 'next/link'

interface ProjectCardProps {
  title: string
  slug: string
  tags: string[]
  summary: string
  /** ISO date of the work itself; only the year is shown. */
  date?: string
}

export default function ProjectCard({ title, slug, tags, summary, date }: ProjectCardProps) {
  const year = date?.slice(0, 4)

  return (
    <Link
      href={`/projects/${slug}`}
      className="block border border-brand-border p-6 hover:border-brand-accent focus-visible:outline-none focus-visible:border-brand-accent active:border-brand-accent transition-colors group"
    >
      {year && (
        <p className="font-mono text-xs text-brand-muted mb-2">{year}</p>
      )}

      <h3 className="font-display text-brand-text text-lg leading-snug mb-3 group-hover:text-brand-accent transition-colors">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-brand-muted border border-brand-border px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-brand-muted leading-relaxed">{summary}</p>
    </Link>
  )
}
