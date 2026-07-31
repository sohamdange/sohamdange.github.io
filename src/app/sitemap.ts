import type { MetadataRoute } from 'next'
import { getAllProjects, getAllWriting } from '@/lib/mdx'
import { SITE_URL } from '@/lib/constants'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/writing', '/resume', '/about', '/contact'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }))

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.date),
  }))

  const writingRoutes = getAllWriting().map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [...staticRoutes, ...projectRoutes, ...writingRoutes]
}
