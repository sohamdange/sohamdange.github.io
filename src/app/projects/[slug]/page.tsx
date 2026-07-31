import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProject, getProjectSlugs } from '@/lib/mdx'
import Link from 'next/link'

// Next.js with output:'export' requires at least one static param.
// If every project is a draft, we supply a placeholder slug that immediately 404s.
const PLACEHOLDER_SLUG = '_placeholder'

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  if (slugs.length === 0) return [{ slug: PLACEHOLDER_SLUG }]
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (slug === PLACEHOLDER_SLUG) return { title: 'Project Not Found' }
  try {
    const { frontmatter } = getProject(slug)
    return {
      title: frontmatter.title,
      description: frontmatter.summary,
    }
  } catch {
    return { title: 'Project Not Found' }
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (slug === PLACEHOLDER_SLUG) notFound()

  const data = (() => {
    try {
      return getProject(slug)
    } catch {
      return null
    }
  })()

  if (!data) notFound()

  const { frontmatter, content } = data

  return (
    <div className="max-w-content mx-auto px-6 md:px-8 py-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="text-sm text-[#6B7280] hover:text-[#111111] focus-visible:outline-none focus-visible:text-[#111111] transition-colors mb-10 inline-block"
      >
        ← Projects
      </Link>

      {/* Header */}
      <header className="mt-6 mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#6B7280] border border-[#E5E7EB] px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-4xl text-[#111111] tracking-display leading-tight mb-4">
          {frontmatter.title}
        </h1>

        <p className="text-[#6B7280] text-lg leading-reading">{frontmatter.summary}</p>
      </header>

      <hr className="border-[#E5E7EB] mb-12" />

      {/* MDX Content */}
      <article className="article-prose">
        <MDXRemote source={content} />
      </article>
    </div>
  )
}
