import { getAllProjects } from '@/lib/mdx'
import ProjectCard from '@/components/ProjectCard'

export const metadata = {
  title: 'Projects',
  description: 'Engineering work at the intersection of simulation, systems design, and hardware.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      <h1 className="font-display text-4xl text-brand-text tracking-display mb-3">Projects</h1>
      <p className="text-brand-muted mb-12">
        Engineering work at the intersection of simulation, systems design, and hardware.
      </p>

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
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
    </div>
  )
}
