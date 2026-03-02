import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { getAllProjects } from '@/lib/mdx'

export default function Home() {
  const allProjects = getAllProjects()
  const featuredSlugs = ['afm-simulation', 'oxygen-concentrator']
  const featuredProjects = featuredSlugs
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter(Boolean)

  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="font-display text-5xl text-[#111111] tracking-display leading-tight mb-3">
          Soham Dange
        </h1>
        <p className="text-[#6B7280] text-base mb-6">Mechanical Engineer</p>
        <p className="text-[#111111] text-lg leading-reading max-w-[540px]">
          Systems thinker. Tool builder. I work at the intersection of simulation and
          engineering architecture.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-[#111111] tracking-display">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-[#6B7280] hover:text-[#2563EB] focus-visible:outline-none focus-visible:text-[#2563EB] active:text-[#2563EB] transition-colors"
          >
            All projects →
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project!.slug}
              title={project!.title}
              slug={project!.slug}
              tags={project!.tags}
              summary={project!.summary}
            />
          ))}
        </div>
      </section>

      {/* Recent Writing */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-[#111111] tracking-display">
            Recent Writing
          </h2>
          <Link
            href="/writing"
            className="text-sm text-[#6B7280] hover:text-[#2563EB] focus-visible:outline-none focus-visible:text-[#2563EB] active:text-[#2563EB] transition-colors"
          >
            All writing →
          </Link>
        </div>
        <p className="text-[#6B7280] text-sm">
          Writing in progress. First post coming soon.
        </p>
      </section>
    </div>
  )
}
