import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')
const writingDirectory = path.join(process.cwd(), 'content/writing')

export interface ProjectFrontmatter {
  title: string
  /** ISO `YYYY-MM-DD`. For projects this is when the work was done, not when it was published here. */
  date: string
  tags: string[]
  slug: string
  summary: string
  featured?: boolean
  draft?: boolean
}

export interface WritingFrontmatter {
  title: string
  /** ISO `YYYY-MM-DD`. For writing this is the publication date. */
  date: string
  tags: string[]
  slug: string
  summary: string
  category: string
  draft?: boolean
}

// YAML parses an unquoted `date: 2024-01-01` into a Date object, not a string.
// Rendering that straight into JSX crashes the build ("Objects are not valid as
// a React child"), so every date is normalized to an ISO string here — once, at
// the boundary — and frontmatter can be written quoted or unquoted.
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)

  const raw = String(value ?? '').trim()
  if (!raw) return ''

  const alreadyISO = raw.match(/^\d{4}-\d{2}-\d{2}/)
  if (alreadyISO) return alreadyISO[0]

  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return raw // unparseable: surface it rather than hide it

  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${parsed.getFullYear()}-${month}-${day}`
}

// Newest first. ISO strings sort correctly as plain strings; title breaks ties
// so ordering stays stable when two entries share a date.
function byDateDesc(
  a: { date: string; title: string },
  b: { date: string; title: string }
): number {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1
  return a.title.localeCompare(b.title)
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
  return publishedFiles(projectsDirectory)
    .map((file) => {
      const data = readFrontmatter(projectsDirectory, file)
      return {
        ...data,
        slug: (data.slug as string) || file.replace('.mdx', ''),
        date: normalizeDate(data.date),
      } as ProjectFrontmatter
    })
    .sort(byDateDesc)
}

export function getFeaturedProjects(limit: number): ProjectFrontmatter[] {
  return getAllProjects()
    .filter((project) => project.featured === true)
    .slice(0, limit)
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
      date: normalizeDate(data.date),
    } as ProjectFrontmatter,
    content,
  }
}

export function getAllWriting(): WritingFrontmatter[] {
  return publishedFiles(writingDirectory)
    .map((file) => {
      const data = readFrontmatter(writingDirectory, file)
      return {
        ...data,
        slug: (data.slug as string) || file.replace('.mdx', ''),
        date: normalizeDate(data.date),
      } as WritingFrontmatter
    })
    .sort(byDateDesc)
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
      date: normalizeDate(data.date),
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
