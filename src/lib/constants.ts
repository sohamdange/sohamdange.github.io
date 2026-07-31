// Canonical site URL — used for metadata, sitemap, and robots.
export const SITE_URL = 'https://sohamdange.github.io'

// Shown wherever writing exists as a section but has no posts yet.
// Defined once so the home page and /writing cannot drift apart.
export const WRITING_EMPTY_STATE = 'Writing in progress. First post coming soon.'

// How many entries each home page section shows.
export const FEATURED_PROJECT_LIMIT = 2
export const RECENT_WRITING_LIMIT = 3

// Social links. Defined once because both the footer and /contact use them
// and must not drift apart.
export const GITHUB_URL = 'https://github.com/sohamdange'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/sohamdange/'

/**
 * Renders a URL as its own label — `github.com/sohamdange`. Derived rather
 * than written out a second time so the visible text cannot disagree with
 * where the link actually goes.
 */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '')
}
