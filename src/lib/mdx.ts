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
  draft?: boolean
}

export interface WritingFrontmatter {
  title: string
  date: string
  tags: string[]
  slug: string
  summary: string
  category: string
  draft?: boolean
}

// `draft: true` in frontmatter keeps a file out of the build entirely:
// no list entry, no route, no page in /out. Note that a committed draft is
// still readable in the public repo — keep genuinely private work in /private/.
function isPublished(data: Record<string, unknown>): boolean {
  return data.draft !== true
}

function readFrontmatter(directory: string, file: string) {
  const fileContent = fs.readFileSync(path.join(directory, file), 'utf8')
  return matter(fileContent).data
}

function publishedFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return []
  return fs
    .readdirSync(directory)
    .filter((f) => f.endsWith('.mdx'))
    .filter((f) => isPublished(readFrontmatter(directory, f)))
}

export function getAllProjects(): ProjectFrontmatter[] {
  const files = publishedFiles(projectsDirectory)

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
  const files = publishedFiles(writingDirectory)

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
  return publishedFiles(projectsDirectory).map((f) => f.replace('.mdx', ''))
}

export function getWritingSlugs(): string[] {
  return publishedFiles(writingDirectory).map((f) => f.replace('.mdx', ''))
}
