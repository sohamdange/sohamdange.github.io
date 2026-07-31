# CLAUDE.md — Soham Dange Personal Website

## Always Do First
* Read this entire CLAUDE.md before writing any code, every session, no exceptions.
* Read `TASKS.md` at the start of each session — it is the shared backlog.
* Invoke the `frontend-design` skill before writing any frontend code, every session, no exceptions.
* Ask clarifying questions before starting if anything is ambiguous.

## Task list (TASKS.md)
* `TASKS.md` at the project root is our shared backlog. Read it at the start of each session.
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
* Background: `#FFFFFF`
* Primary text: `#111111`
* Secondary text: `#6B7280`
* Accent: `#2563EB`
* Borders: `#E5E7EB`
* Body font: A refined serif or geometric sans — NOT Inter, NOT Roboto
* Code font: JetBrains Mono
* Max content width: 720px, centered
* Navigation: Top bar — name on left, links on right (Projects · Writing · About · Contact)
* Footer: GitHub · LinkedIn · © Soham Dange 2025 — one line, minimal

## Design Hard Rules
* No heavy shadows, gradients, or animations — flat, precise, intentional
* No default Tailwind blue/indigo as primary (use exact `#2563EB` via config)
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
  /app          — Next.js App Router pages
  /components   — reusable UI components
  /lib          — MDX parsing, utilities
/public         — static assets
```

## Routes & Pages
| Route | Description |
|---|---|
| `/` | Home — intro + 2 featured projects (AFM + Oxygen Concentrator) |
| `/projects` | Project list |
| `/projects/[slug]` | Individual project (MDX) |
| `/writing` | Writing list with category filter tabs (empty state at launch) |
| `/writing/[slug]` | Individual post (MDX) |
| `/about` | About page |
| `/contact` | Contact — no form, just links |

## Content Architecture
* Projects: `/content/projects/[slug].mdx` — frontmatter: `title`, `date`, `tags`, `slug`, `summary`
* Writing: `/content/writing/[slug].mdx` — frontmatter: `title`, `date`, `tags`, `slug`, `summary`, `category`
* Writing categories: Modeling & Simulation · Systems Thinking · Energy Technology · Engineering Architecture · Engineering Growth
* Writing at launch: Empty state — "Writing in progress. First post coming soon."
* Adding content workflow: Create an MDX file in the correct folder → done. No other steps.
* Unfinished content: add `draft: true` to the frontmatter — see "Draft Content" above.

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
* Colors: Use the exact brand palette above. Derive tints/shades from `#2563EB` — never default Tailwind palette
* Typography: Pair a display/serif with a clean sans. JetBrains Mono for all code
* Spacing: Intentional, consistent spacing tokens — not random Tailwind steps
* Surfaces: No decorative layering — this design is flat and intentional by spec
* Interactive states: Hover, focus-visible, and active on every clickable element

## Hard Rules
* Do not add sections, features, or content not specified in the master prompt
* Do not "improve" the design spec — implement it exactly
* Do not use `transition-all`
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
| `/projects` | Built — lists all 3 projects |
| `/projects/afm-simulation` | Built — placeholder content |
| `/projects/oxygen-concentrator` | Built — placeholder content |
| `/projects/condensate-pump-test-rig` | Built — placeholder content |
| `/writing` | Built — category filter tabs, empty state message |
| `/writing/[slug]` | Built — route ready, no posts yet |
| `/about` | Built — real content |
| `/contact` | Built — placeholder links |

**Actual layout decisions made during build (overrides original spec):**
* List/index pages (`/`, `/projects`, `/writing`, `/about`, `/contact`) — `max-w-wide` (960px)
* Reading pages (`/projects/[slug]`, `/writing/[slug]`) — `max-w-content` (720px)
* Nav and Footer follow the 960px wide layout
* Padding: `px-6` mobile, `px-8` desktop on all containers
* Fonts: Fraunces (display/headings) + Plus Jakarta Sans (body) + JetBrains Mono (code)
* Nav left link reads "Home" (not "Soham Dange")

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
