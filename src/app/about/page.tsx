import Timeline from '@/components/Timeline'

export const metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      <h1 className="font-display text-4xl text-brand-text tracking-display mb-12">About</h1>

      <div className="space-y-5 text-brand-text leading-reading text-base">
        <p>
          I&apos;m a mechanical engineer who builds tools. Not because it&apos;s the harder path,
          but because tools scale. A well-designed tool solves a problem once and keeps solving it.
        </p>
        <p>
          My work sits at the intersection of simulation, systems thinking, and engineering
          architecture. I&apos;m drawn to problems that are genuinely hard and have real impact,
          the kind where understanding the system deeply is the only way through.
        </p>
        <p>
          I&apos;m currently working toward a focus in energy technology. The field is technically
          rich, the problems are real, and the stakes are high. I&apos;m building in that direction
          through simulation tools, writing, and public thinking.
        </p>
        <p>
          This is my public notebook. I write about what I build, how I think, and what I&apos;m
          figuring out. No polish for the sake of polish, just honest technical thinking, made
          visible over time.
        </p>
      </div>

      <div className="mt-20">
        <Timeline />
      </div>
    </div>
  )
}
