'use client'

import { useState } from 'react'
import Link from 'next/link'
import { WRITING_EMPTY_STATE } from '@/lib/constants'

const CATEGORIES = [
  'All',
  'Modeling & Simulation',
  'Systems Thinking',
  'Energy Technology',
  'Engineering Architecture',
  'Engineering Growth',
]

export interface WritingPost {
  title: string
  date: string
  tags: string[]
  slug: string
  summary: string
  category: string
}

interface WritingListProps {
  posts: WritingPost[]
}

export default function WritingList({ posts }: WritingListProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm px-3 py-1.5 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors ${
              activeCategory === cat
                ? 'border-brand-accent text-brand-accent'
                : 'border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-text active:text-brand-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts or empty state */}
      {filtered.length === 0 ? (
        <p className="text-brand-muted">{WRITING_EMPTY_STATE}</p>
      ) : (
        <div className="flex flex-col divide-y divide-brand-border">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="py-6 group focus-visible:outline-none focus-visible:text-brand-accent"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-display text-brand-text text-lg leading-snug group-hover:text-brand-accent transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-brand-muted ml-6 shrink-0">{post.date}</time>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">{post.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
