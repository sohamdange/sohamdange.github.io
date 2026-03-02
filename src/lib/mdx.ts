import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')
const writingDirectory = path.join(process.cwd(), 'content/writing')

export interface ProjectFrontmatter {
  title: string
  date: string
  tags: string[]
  slug: string
  summary: string
}

export interface WritingFrontmatter {
  title: string
  date: string
  tags: string[]
  slug: string
  summary: string
  category: string
}

export function getAllProjects(): ProjectFrontmatter[] {
  if (!fs.existsSync(projectsDirectory)) return []

  const files = fs.readdirSync(projectsDirectory).filter((f) => f.endsWith('.mdx'))

  return files.map((file) => {
    const filePath = path.join(projectsDirectory, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    return {
      ...data,
      slug: (data.slug as string) || file.replace('.mdx', ''),
    } as ProjectFrontmatter
  })
}

export function getProject(slug: string): {
  frontmatter: ProjectFrontmatter
  content: string
} {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    frontmatter: {
      ...data,
      slug: (data.slug as string) || slug,
    } as ProjectFrontmatter,
    content,
  }
}

export function getAllWriting(): WritingFrontmatter[] {
  if (!fs.existsSync(writingDirectory)) return []

  const files = fs.readdirSync(writingDirectory).filter((f) => f.endsWith('.mdx'))

  return files.map((file) => {
    const filePath = path.join(writingDirectory, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    return {
      ...data,
      slug: (data.slug as string) || file.replace('.mdx', ''),
    } as WritingFrontmatter
  })
}

export function getWriting(slug: string): {
  frontmatter: WritingFrontmatter
  content: string
} {
  const filePath = path.join(writingDirectory, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    frontmatter: {
      ...data,
      slug: (data.slug as string) || slug,
    } as WritingFrontmatter,
    content,
  }
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return []
  return fs
    .readdirSync(projectsDirectory)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export function getWritingSlugs(): string[] {
  if (!fs.existsSync(writingDirectory)) return []
  return fs
    .readdirSync(writingDirectory)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}
