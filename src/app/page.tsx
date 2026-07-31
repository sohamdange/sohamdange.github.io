import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { getFeaturedProjects, getAllWriting } from '@/lib/mdx'
import {
  FEATURED_PROJECT_LIMIT,
  RECENT_WRITING_LIMIT,
  WRITING_EMPTY_STATE,
} from '@/lib/constants'

export default function Home() {
  const featuredProjects = getFeaturedProjects(FEATURED_PROJECT_LIMIT)
  const recentWriting = getAllWriting().slice(0, RECENT_WRITING_LIMIT)

  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="font-display text-5xl text-brand-text tracking-display leading-tight mb-3">
          Soham Dange
        </h1>
        <p className="text-brand-muted text-base mb-6">Mechanical Engineer</p>
        <p className="text-brand-text text-lg leading-reading max-w-[540px]">
          Systems thinker. Tool builder. I work at the intersection of simulation and
          engineering architecture.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-brand-text tracking-display">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-brand-muted hover:text-brand-accent focus-visible:outline-none focus-visible:text-brand-accent active:text-brand-accent transition-colors"
          >
            All projects →
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              slug={project.slug}
              tags={project.tags}
              summary={project.summary}
              date={project.date}
            />
          ))}
        </div>
      </section>

      {/* Recent Writing */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-brand-text tracking-display">
            Recent Writing
          </h2>
          <Link
            href="/writing"
            className="text-sm text-brand-muted hover:text-brand-accent focus-visible:outline-none focus-visible:text-brand-accent active:text-brand-accent transition-colors"
          >
            All writing →
          </Link>
        </div>
        {recentWriting.length === 0 ? (
          <p className="text-brand-muted text-sm">{WRITING_EMPTY_STATE}</p>
        ) : (
          <div className="flex flex-col divide-y divide-brand-border">
            {recentWriting.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="py-5 group focus-visible:outline-none"
              >
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-display text-brand-text text-base leading-snug group-hover:text-brand-accent group-focus-visible:text-brand-accent transition-colors">
                    {post.title}
                  </h3>
                  <time className="font-mono text-xs text-brand-muted shrink-0 mt-1">
                    {post.date}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
