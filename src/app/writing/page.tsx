import { getAllWriting } from '@/lib/mdx'
import WritingList from '@/components/WritingList'

export const metadata = {
  title: 'Writing',
  description: 'Technical thinking on simulation, systems, and engineering.',
}

export default function WritingPage() {
  const posts = getAllWriting()

  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      <h1 className="font-display text-4xl text-[#111111] tracking-display mb-3">Writing</h1>
      <p className="text-[#6B7280] mb-12">
        Technical thinking on simulation, systems, and engineering.
      </p>

      <WritingList posts={posts} />
    </div>
  )
}
