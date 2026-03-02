import Link from 'next/link'

interface ProjectCardProps {
  title: string
  slug: string
  tags: string[]
  summary: string
}

export default function ProjectCard({ title, slug, tags, summary }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block border border-[#E5E7EB] p-6 hover:border-[#2563EB] focus-visible:outline-none focus-visible:border-[#2563EB] active:border-[#2563EB] transition-colors group"
    >
      <h3 className="font-display text-[#111111] text-lg leading-snug mb-3 group-hover:text-[#2563EB] transition-colors">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-[#6B7280] border border-[#E5E7EB] px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-[#6B7280] leading-relaxed">{summary}</p>
    </Link>
  )
}
