import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getWriting, getWritingSlugs } from '@/lib/mdx'
import Link from 'next/link'

// Next.js with output:'export' requires at least one static param.
// When writing is empty, we supply a placeholder slug that immediately 404s.
const PLACEHOLDER_SLUG = '_placeholder'

export async function generateStaticParams() {
  const slugs = getWritingSlugs()
  if (slugs.length === 0) return [{ slug: PLACEHOLDER_SLUG }]
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (slug === PLACEHOLDER_SLUG) return { title: 'Post Not Found' }
  try {
    const { frontmatter } = getWriting(slug)
    return {
      title: frontmatter.title,
      description: frontmatter.summary,
    }
  } catch {
    return { title: 'Post Not Found' }
  }
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (slug === PLACEHOLDER_SLUG) notFound()

  const data = (() => {
    try {
      return getWriting(slug)
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
        href="/writing"
        className="text-sm text-brand-muted hover:text-brand-text focus-visible:outline-none focus-visible:text-brand-text transition-colors mb-10 inline-block"
      >
        ← Writing
      </Link>

      {/* Header */}
      <header className="mt-6 mb-12">
        <p className="text-sm text-brand-muted mb-2">{frontmatter.category}</p>

        <h1 className="font-display text-4xl text-brand-text tracking-display leading-tight mb-4">
          {frontmatter.title}
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          <time className="text-sm text-brand-muted">{frontmatter.date}</time>
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-brand-muted border border-brand-border px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <hr className="border-brand-border mb-12" />

      {/* MDX Content */}
      <article className="article-prose">
        <MDXRemote source={content} />
      </article>
    </div>
  )
}
