import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  achievements,
  education,
  experience,
  formatPeriod,
  skills,
} from '@/lib/resume'

export const metadata = {
  title: 'Resume',
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-16 last:mb-0">
      <h2 className="font-display text-xl text-brand-text tracking-display border-b border-brand-border pb-2 mb-8">
        {title}
      </h2>
      {children}
    </section>
  )
}

/**
 * Two stacked rows — name/location, then role/period. Metadata is right
 * aligned from `sm` up and stacks underneath on narrow screens.
 */
function EntryHeading({
  name,
  role,
  location,
  period,
}: {
  name: string
  role: string
  location: string
  period: string
}) {
  return (
    <header className="mb-3">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-display text-base text-brand-text">{name}</h3>
        <span className="font-mono text-xs text-brand-muted sm:shrink-0">{location}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p className="text-sm text-brand-text">{role}</p>
        <span className="font-mono text-xs text-brand-muted sm:shrink-0">{period}</span>
      </div>
    </header>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-sm text-brand-muted leading-reading">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/** Points at the project page that covers a role or capstone in depth. */
function ProjectLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="inline-block mt-3 text-sm text-brand-accent hover:text-brand-accent-hover focus-visible:outline-none focus-visible:text-brand-accent-hover active:text-brand-accent-hover transition-colors underline underline-offset-2"
    >
      Project write-up →
    </Link>
  )
}

export default function ResumePage() {
  return (
    <div className="max-w-wide mx-auto px-6 md:px-8 py-16">
      <h1 className="font-display text-4xl text-brand-text tracking-display mb-12">Resume</h1>

      <Section title="Work Experience">
        <div className="space-y-10">
          {experience.map((entry) => (
            <article key={`${entry.company}-${entry.start}`}>
              <EntryHeading
                name={entry.company}
                role={entry.role}
                location={entry.location}
                period={formatPeriod(entry.start, entry.end)}
              />
              <Bullets items={entry.bullets} />
              {entry.projectSlug && <ProjectLink slug={entry.projectSlug} />}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="space-y-10">
          {education.map((entry) => (
            <article key={entry.institution}>
              <EntryHeading
                name={entry.institution}
                role={entry.degree}
                location={entry.location}
                period={formatPeriod(entry.start, entry.end)}
              />

              {entry.highlight && (
                <p className="text-sm text-brand-text leading-reading mb-3">
                  <span className="text-brand-muted">{entry.highlight.label}: </span>
                  <em>{entry.highlight.title}</em>
                  {entry.highlight.links?.map((link) => (
                    <span key={link.href}>
                      {' · '}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-accent hover:text-brand-accent-hover focus-visible:outline-none focus-visible:text-brand-accent-hover active:text-brand-accent-hover transition-colors underline underline-offset-2"
                      >
                        {link.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}

              <Bullets items={entry.bullets} />
              {entry.projectSlug && <ProjectLink slug={entry.projectSlug} />}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="space-y-6">
          {skills.map((group) => (
            <div key={group.label} className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="font-mono text-xs text-brand-muted mb-1 sm:mb-0 sm:w-52 sm:shrink-0 sm:pt-1">
                {group.label}
              </dt>
              <dd className="text-sm text-brand-text leading-reading">
                {group.items.join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Leadership & Achievements">
        <div className="space-y-8">
          {achievements.map((entry) => (
            <article key={entry.title}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-display text-base text-brand-text">
                  {entry.title}
                  {entry.organization && (
                    <span className="text-brand-muted"> — {entry.organization}</span>
                  )}
                </h3>
                <span className="font-mono text-xs text-brand-muted sm:shrink-0">
                  {entry.period}
                </span>
              </div>
              <p className="text-sm text-brand-muted leading-reading mt-1">{entry.description}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  )
}
