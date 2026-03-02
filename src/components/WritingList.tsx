'use client'

import { useState } from 'react'
import Link from 'next/link'

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
            className={`text-sm px-3 py-1.5 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] transition-colors ${
              activeCategory === cat
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#111111] hover:border-[#111111] active:text-[#111111]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts or empty state */}
      {filtered.length === 0 ? (
        <p className="text-[#6B7280]">Writing in progress. First post coming soon.</p>
      ) : (
        <div className="flex flex-col divide-y divide-[#E5E7EB]">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="py-6 group focus-visible:outline-none focus-visible:text-[#2563EB]"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-display text-[#111111] text-lg leading-snug group-hover:text-[#2563EB] transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-[#6B7280] ml-6 shrink-0">{post.date}</time>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">{post.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
