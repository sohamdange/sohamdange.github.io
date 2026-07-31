# CLAUDE.md — Soham Dange Personal Website

## Always Do First
* Read this entire CLAUDE.md before writing any code, every session, no exceptions.
* Read `TASKS.md` at the start of each session — it is the shared backlog.
* Invoke the `frontend-design` skill before writing any frontend code, every session, no exceptions.
* Ask clarifying questions before starting if anything is ambiguous.

## Task list (TASKS.md)
* `TASKS.md` at the project root is our shared backlog. Read it at the start of each session.
* It is gitignored and local to Soham's machine — deliberately not in the public repo.
  If it is missing (fresh clone), the workflow was not abandoned; recreate it and ask him
  what is on the list. Never commit it.
* When Soham describes an idea or problem, treat it as **discussion only**. Do NOT add anything to `TASKS.md` until he explicitly says "add it" (or "add to the list").
* When he says to add a task, first ask for confirmation that it should go on the list. Once confirmed, append exactly ONE concrete, outcome-focused line as a checkbox item — then show him the exact line that was added.
* When a task is finished, ask him to confirm it is actually complete, then REMOVE that line from `TASKS.md` entirely and tell him what was removed. Do not mark it `[x]` and leave it in the file.
* If work is completed that was not on the list, mention it — but do not add it to `TASKS.md` retroactively.

## Publishing Gates (this repo is PUBLIC)
The repo `sohamdange/sohamdange.github.io` is public. Every committed file is world-readable
on github.com permanently — deleting it later does not remove it from history. Everything under
`public/` and `content/` is also served as a live URL, and an unlinked file is still fetchable
at a guessable path. There is no auth on GitHub Pages.

**Claude must ask Soham before doing any of these — no exceptions:**
* Staging or committing any file that is not source code, config, or `.mdx` content
* Adding anything to `public/` — especially PDFs, images, or documents
* Using `git add -f` (force-add) for any reason
* Committing with `--no-verify` (this bypasses the publishing gate)
* Merging or pushing to `main` — that push deploys to the live site within ~2 minutes

**Automated gate:** `.githooks/pre-commit` runs on every commit.
* This hook is deliberately NOT in the repo — `.githooks/` is gitignored, so it exists only
  on Soham's machine. A fresh clone has no gate until the file is copied over and
  `git config core.hooksPath .githooks` is run again. Warn him if he ever clones elsewhere.
* BLOCKS: documents/archives/CAD/credential file types, credential-shaped strings
  (private keys, `ghp_*`, `AKIA*`, `sk-*`), images with GPS coordinates in EXIF
* WARNS: draft content, images when `exiftool` is unavailable, files over 2 MB

**`/private/` is the staging area** for anything not meant to be published — drafts, resumes,
scans, client or employer material, reference files. It is gitignored, so it cannot be committed
or deployed by accident. Recommend it whenever Soham has a file he is unsure about.

**Photo metadata:** phone photos embed GPS coordinates. Strip before committing:
`exiftool -all= <file>`.

**Commit identity:** `user.email` is set to `sohamdange31@users.noreply.github.com` so his real
address does not appear in public commit history. Do not change it.

## Draft Content
Add `draft: true` to the frontmatter of any `.mdx` file in `content/` to keep it out of the build
entirely — no list entry, no route, nothing in `/out`. Implemented in `src/lib/mdx.ts` via
`publishedFiles()`, which filters both the list functions and `generateStaticParams`.

Important distinction: `draft: true` hides a file from the **site**, not from the **repo**.
A committed draft is still readable by anyone on GitHub. For work that must stay private,
use `/private/` instead.

Both `[slug]` routes fall back to a `_placeholder` slug that 404s when every file is a draft —
`output: 'export'` requires `generateStaticParams` to return at least one entry.

## Project Identity
* Name: Soham Dange
* Title: Mechanical Engineer
* One-liner: "Systems thinker. Tool builder. I work at the intersection of simulation and engineering architecture."
* Stack: Next.js (App Router, static export) → GitHub Pages
* Content: MDX files in `/content/writing/` and `/content/projects/`

## Design Spec (Non-Negotiable)
* Style: Minimal, editorial, refined — engineering notebook, not a startup landing page
* Body font: A refined serif or geometric sans — NOT Inter, NOT Roboto
* Code font: JetBrains Mono
* Max content width: 720px, centered
* Navigation: Top bar — name on left, links on right (Projects · Writing · Resume · About · Contact), theme toggle rightmost.
  Ordered work artifacts → credentials → contact. Five links plus the toggle overflow a 375px
  viewport at `gap-6`, so the link group tightens to `gap-x-4` on mobile and is allowed to wrap.
* Footer: GitHub · LinkedIn · © Soham Dange 2025 — one line, minimal

## Theming (Light + Dark)

**The hard rule: never write a raw hex value in a component.** Every color goes through a
token, or it will not follow the theme. If a component needs a color that no token covers,
add a token — do not reach for a hex or a default Tailwind color.

Tokens are defined once in `src/app/globals.css` and exposed to Tailwind in
`tailwind.config.js` as `brand.*`, each mapped to `var(--color-*)`. Use `text-brand-muted`,
`border-brand-border`, `bg-brand-surface` — never `text-[#6B7280]`.

| Token | Tailwind class | Light | Dark ("Ink") |
|---|---|---|---|
| `--color-bg` | `brand-bg` | `#FFFFFF` | `#0F1115` |
| `--color-surface` | `brand-surface` | `#F9FAFB` | `#16181D` |
| `--color-text` | `brand-text` | `#111111` | `#E8EAED` |
| `--color-muted` | `brand-muted` | `#6B7280` | `#9AA1AC` |
| `--color-accent` | `brand-accent` | `#2563EB` | `#60A5FA` |
| `--color-accent-hover` | `brand-accent-hover` | `#1D4ED8` | `#93C5FD` |
| `--color-border` | `brand-border` | `#E5E7EB` | `#24272E` |

The accent is lighter in dark mode on purpose: `#2563EB` only reaches 1.6:1 against `#0F1115`
and fails WCAG AA. `#60A5FA` clears AAA at 8.0:1. Any new dark value must hit 4.5:1 minimum
against `--color-bg`.

**How it works**
* `<html data-theme="light|dark">` selects the token set. Nothing else switches themes.
* `themeInitScript` (`src/lib/theme.ts`) is injected blocking into `<head>` by `layout.tsx`.
  It resolves the theme from `localStorage` then `prefers-color-scheme` and sets the
  attribute **before first paint**. A static export has no server, so without this every
  dark-mode visitor gets a flash of white on every page load. Do not move it, defer it,
  or make it `async`.
* `<html>` carries `suppressHydrationWarning` because that script mutates the attribute
  before React hydrates. Removing it produces a console error on every load.
* `ThemeToggle` (`src/components/ThemeToggle.tsx`) is the only client component in the nav.
  It renders **no theme-dependent markup** — which icon and which accessible label show is
  decided by CSS off `data-theme` (`.theme-icon-to-dark` / `.theme-icon-to-light`). That is
  what keeps the correct icon on the first frame with no hydration mismatch and no
  `mounted` placeholder. If you make the icon depend on React state, you reintroduce both.
* No stored preference means the OS is followed live — a `matchMedia` listener in the toggle
  updates an open tab when the system appearance changes. Clicking the toggle writes to
  `localStorage` and that stored choice wins from then on.
* Theme switching is instant by design. Do not add a global color transition — it would
  animate every hover on the site and violates the flat/no-animation rule below.

## Design Hard Rules
* No heavy shadows, gradients, or animations — flat, precise, intentional
* No raw hex values in components — use the `brand-*` tokens (see Theming)
* No default Tailwind blue/indigo as primary (the accent is `#2563EB`, via the `brand-accent` token)
* No `transition-all` — ever
* No same font for headings and body — pair display font with body font
* Generous whitespace. Typography does the heavy lifting.
* Every clickable element needs hover, focus-visible, and active states
* Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body

## Project Structure
```
/content
  /projects/[slug].mdx
  /writing/[slug].mdx
/src
  /app          — Next.js App Router pages (globals.css holds the theme tokens)
  /components   — reusable UI components (ThemeToggle is the only client component in the nav)
  /lib          — MDX parsing, utilities, shared constants, theme.ts
/public         — static assets (incl. og-image.png)
```

## Routes & Pages
| Route | Description |
|---|---|
| `/` | Home — hero, featured projects, recent writing |
| `/projects` | Featured Projects — a curated list, not everything Soham has worked on |
| `/projects/[slug]` | Individual project (MDX) |
| `/writing` | Writing list with category filter tabs (empty state at launch) |
| `/writing/[slug]` | Individual post (MDX) |
| `/resume` | Resume — rendered from `src/lib/resume.ts`, no PDF |
| `/about` | About page |
| `/contact` | Contact — no form, just links |
| `not-found.tsx` | Styled 404 with links to every route |
| `sitemap.ts` / `robots.ts` | Generated at build into `/out` as `sitemap.xml` and `robots.txt` |

## Home Page Structure
Three sections, all data-driven — no content hardcoded in the component:
1. **Hero** — name, role, positioning line
2. **Featured work** — projects with `featured: true`, date desc, limit `FEATURED_PROJECT_LIMIT`
3. **Recent writing** — newest posts, limit `RECENT_WRITING_LIMIT`, falls back to
   `WRITING_EMPTY_STATE` when there are none

Limits and shared copy live in `src/lib/constants.ts`. Never inline the writing empty-state
string — both the home page and `WritingList` import the same constant so they cannot drift.

## Content Architecture
* Projects: `/content/projects/[slug].mdx` — frontmatter: `title`, `date`, `tags`, `slug`, `summary`, optional `featured`, optional `draft`
* Writing: `/content/writing/[slug].mdx` — frontmatter: `title`, `date`, `tags`, `slug`, `summary`, `category`, optional `draft`
* Writing categories: Modeling & Simulation · Systems Thinking · Energy Technology · Engineering Architecture · Engineering Growth
* Writing at launch: Empty state — "Writing in progress. First post coming soon."
* Adding content workflow: Create an MDX file in the correct folder → done. No other steps.
* Unfinished content: add `draft: true` to the frontmatter — see "Draft Content" above.
* Promote to the home page: add `featured: true`. Never hardcode slugs in a component.

### Resume
The resume is **data, not MDX** — `src/lib/resume.ts` exports `experience`, `education`,
`skills`, and `achievements`, and `src/app/resume/page.tsx` renders them. The page holds no
content of its own; add a job by adding an object, never by editing JSX.

* **No contact details on this page, ever** — no address, phone, email, or LinkedIn. The page
  is public and permanent, and `/contact` is already the single place those live.
* Dates are stored as `YYYY-MM` (`end: null` means current) and formatted by `formatPeriod()`.
  Do not hand-write display strings — that is how a resume drifts out of alignment.
  `formatMonth()` parses by hand rather than via `new Date()`, which reads `YYYY-MM` as UTC
  midnight and can roll back a month once the local timezone is applied.
* Entries are listed newest first in the file itself, so the page never sorts.
* `projectSlug` on an entry renders a link to `/projects/[slug]`. This is the whole reason the
  resume is a page and not a PDF — keep the slug valid or drop the field.
* Bullets are capped at **3 per role** by editorial decision, not by code. The PDF is the
  exhaustive artifact; this page is the scannable one that links out to depth.
* Section headings and the section rail both read from `resumeSections` in `resume.ts`, so a
  renamed section cannot leave a dead anchor. `sectionFor()` in the page throws at build time
  if an id goes missing — a broken rail link fails the build instead of shipping.
* `ResumeNav` (`src/components/ResumeNav.tsx`) is the page's only client component. It exists
  purely for the active-section highlight, via `IntersectionObserver`. Links are plain anchors,
  so the rail still works with JS off — only the highlight is lost. Initial state is the first
  section on both server and client, so there is no hydration mismatch. Jumps are native and
  instant; do not add `scroll-behavior: smooth` (see the no-animation rule).
* Layout is a sticky rail from `lg` up, a wrapping row above the content below that.

### About page timeline
`src/components/Timeline.tsx` renders the serpentine timeline below the intro prose.
The full geometry is documented in the file header — read it before touching the layout.

* The thread is a **single SVG path** over a 720×470 viewBox, not CSS borders. One path
  cannot develop seams where segments meet, and the U-turns are real curves.
* The box is **fluid**: the wrapper carries the aspect ratio and node positions are
  percentages, so it scales with the column. An earlier fixed-width version gated on `lg`
  drew nothing below a 1024px viewport — easy to hit on a scaled Windows display. Do not
  reintroduce a fixed pixel width.
* Labels on the node a U-turn descends from (last in the row, with a row still to come)
  render **above** the node, or the curve cuts through them. That is derived from the
  index, not hardcoded, so it survives adding or reordering entries.
* Icons are inline SVG on an 18×18 grid — no icon dependency. FEV (cog) and Generac
  (briefcase) are neutral placeholders awaiting real logos.
* Entries are data at the top of the file. Below `md` the thread is dropped entirely and
  the entries become a single-column ledger.

### Dates
* **Projects: `date` is when the work was done**, not when it was added to the site. The year
  carries meaning (the oxygen concentrator is 2021 because it was built during Covid).
* **Writing: `date` is the publication date.**
* Both lists sort newest first, in `mdx.ts`, so every consumer inherits the same order.
* YAML parses an unquoted `date: 2024-01-01` as a **Date object**, which crashes the build when
  rendered into JSX. `normalizeDate()` in `mdx.ts` converts every date to an ISO string at the
  boundary — do not remove it, and do not render `frontmatter.date` from raw `matter()` output.

## Metadata & SEO
* `metadataBase` and Open Graph / Twitter defaults are set in `src/app/layout.tsx`
* `public/og-image.png` (1200×630) is a **generated placeholder** using Georgia/Segoe UI, not
  Fraunces/Plus Jakarta Sans — replace it with a properly designed card when convenient
* Site URL lives in `SITE_URL` (`src/lib/constants.ts`) — used by metadata, sitemap, and robots

## Local Development
* Dev server: `npm run dev` → `http://localhost:3000`
* Static export: `npm run build` (outputs to `/out`)
* Never serve from `file:///` — always use localhost

## Output Defaults
* Next.js with `output: 'export'` in `next.config.js`
* App Router only — do not use the Pages Router
* Tailwind CSS via `tailwind.config.js` (not CDN — this is a Next.js project)
* All custom brand colors defined in Tailwind config, not inline
* Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
* Mobile-first responsive

## Anti-Generic Guardrails
* Colors: Use the `brand-*` tokens. Add a token rather than a one-off hex — never default Tailwind palette
* Typography: Pair a display/serif with a clean sans. JetBrains Mono for all code
* Spacing: Intentional, consistent spacing tokens — not random Tailwind steps
* Surfaces: No decorative layering — this design is flat and intentional by spec
* Interactive states: Hover, focus-visible, and active on every clickable element

## Hard Rules
* Do not add sections, features, or content not specified in the master prompt
* Do not "improve" the design spec — implement it exactly
* Do not use `transition-all`
* Do not write raw hex colors in components — use the `brand-*` tokens
* Do not use default Tailwind blue/indigo as primary color
* Do not use the Next.js Pages Router — use the App Router only
* Do not break the static export — no server-side features, no API routes that require a Node server
* Every page must build cleanly with `npm run build`

## Current State

### What Has Been Built
All pages are fully implemented and deployed to https://sohamdange.github.io

| Page | Status |
|---|---|
| `/` | Built — hero, 2 featured project cards, empty writing state |
| `/projects` | Built — titled "Featured Projects", lists all 3 |
| `/projects/afm-simulation` | Built — placeholder content |
| `/projects/oxygen-concentrator` | Built — placeholder content |
| `/projects/condensate-pump-test-rig` | Built — placeholder content |
| `/writing` | Built — category filter tabs, empty state message |
| `/writing/[slug]` | Built — route ready, no posts yet |
| `/resume` | Built — real content, from `src/lib/resume.ts` |
| `/about` | Built — real content |
| `/contact` | Built — placeholder links |

**Actual layout decisions made during build (overrides original spec):**
* List/index pages (`/`, `/projects`, `/writing`, `/about`, `/contact`) — `max-w-wide` (960px)
* Reading pages (`/projects/[slug]`, `/writing/[slug]`) — `max-w-content` (720px)
* Nav and Footer follow the 960px wide layout
* Padding: `px-6` mobile, `px-8` desktop on all containers
* Fonts: Fraunces (display/headings) + Plus Jakarta Sans (body) + JetBrains Mono (code)
* Nav left link reads "Home" (not "Soham Dange")
* Light and dark themes, OS-default with a persisted manual toggle — see "Theming" above.
  All colors run through `brand-*` tokens; there are no raw hex values left in `src/`.

### Files With Placeholder Content — Needs Real Content
* `content/projects/afm-simulation.mdx` — all 6 sections marked `[PLACEHOLDER]`
* `content/projects/oxygen-concentrator.mdx` — all 6 sections marked `[PLACEHOLDER]`
* `content/projects/condensate-pump-test-rig.mdx` — all 6 sections marked `[PLACEHOLDER]`
* `src/app/contact/page.tsx` — LinkedIn, GitHub, and email are placeholder links
* `src/components/Footer.tsx` — GitHub and LinkedIn links are placeholders
* `content/writing/` — empty, no posts yet

### Git & Deployment Workflow
Repository: https://github.com/sohamdange/sohamdange.github.io
Live site: https://sohamdange.github.io
Deployment: GitHub Actions (`.github/workflows/deploy.yml`) — triggers on every push to `main`

**Branches:** work on `dev`. Pushing `dev` does NOT deploy — the workflow only triggers on `main`.

**To deploy any change:**
```bash
# on dev — safe, no deploy
git add <specific files>          # not `git add .` — see Publishing Gates
git commit -m "describe what changed"
git push

# ship it — ask Soham first, this goes live
git checkout main && git merge dev && git push
```
GitHub Actions builds and deploys automatically within ~2 minutes. Monitor runs at:
https://github.com/sohamdange/sohamdange.github.io/actions

**To add a new project:** Create `content/projects/[slug].mdx` → commit → push → done.
**To add a writing post:** Create `content/writing/[slug].mdx` → commit → push → done.
