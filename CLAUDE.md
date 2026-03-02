# CLAUDE.md — Soham Dange Personal Website

## Always Do First
* Read this entire CLAUDE.md before writing any code, every session, no exceptions.
* Invoke the `frontend-design` skill before writing any frontend code, every session, no exceptions.
* Ask clarifying questions before starting if anything is ambiguous.

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
