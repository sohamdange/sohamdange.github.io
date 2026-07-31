import type { ReactNode } from 'react'

/**
 * Serpentine timeline for /about.
 *
 * Ported from References/timeline-horizontal.html. The thread is a single SVG
 * path rather than a run of CSS borders — one path cannot develop seams where
 * segments meet, and the U-turns are real curves instead of border-radius
 * approximations. Nodes are absolutely positioned onto that fixed coordinate
 * system, so the geometry is exact by construction.
 *
 * The coordinate system is 720×470, laid out 4 wide and 3 deep:
 *
 *   column centres  x = 56, 258, 460, 662   (202 apart)
 *   row centres     y = 80, 250, 420
 *
 * The path runs those three rows left→right, right→left, left→right, joined by
 * cubic U-turns that bulge 40px past the outer columns.
 *
 * That box is *fluid*, not fixed at 720px. The wrapper carries the 720/470
 * aspect ratio, the spine fills it via viewBox, and node positions are the
 * percentages those coordinates work out to — so the whole thing scales with
 * the column instead of needing a viewport wide enough to hold 720 real
 * pixels. An earlier fixed-width version gated on `lg` drew no thread at all
 * below a 1024px viewport, which is easy to hit on a scaled Windows display.
 *
 * Node boxes are 140px wide and centred on their column, and the 46px node
 * band is pulled up by half its height so it straddles the thread rather than
 * hanging beneath it. Labels sit below and are allowed to overflow the aspect
 * box, which is what the wrapper's bottom margin reserves room for.
 *
 * From `md` up that is the layout. Below `md` the thread is dropped and the
 * entries become a single-column ledger — icon, mono year, label. Nothing
 * scrolls horizontally at any width.
 */

const ROW_LENGTH = 4

const SPINE_PATH =
  'M56 80 H662 C702 80 702 250 662 250 H56 C16 250 16 420 56 420 H662'

type IconName =
  | 'pin'
  | 'knight'
  | 'medal'
  | 'cap'
  | 'cog'
  | 'battery'
  | 'send'
  | 'briefcase'
  | 'chart'
  | 'code'

interface TimelineEntry {
  year: string
  label: string
  /** Full sentence for assistive tech; the visible label is abbreviated. */
  full: string
  icon: IconName
  /** Renders the icon muted — used for stepping away from chess. */
  muted?: boolean
  /** The end of the thread: filled accent, slightly larger. */
  final?: boolean
}

const entries: TimelineEntry[] = [
  { year: '1996', label: 'Born in India', full: 'Born in India', icon: 'pin' },
  {
    year: '2008',
    label: 'Started chess professionally',
    full: 'Started playing chess professionally',
    icon: 'knight',
  },
  {
    year: '2009',
    label: 'Gained a FIDE rating',
    full: 'Gained a FIDE rating in chess',
    icon: 'medal',
  },
  {
    year: '2013',
    label: 'Stepped away from chess',
    full: 'Stopped playing chess professionally',
    icon: 'knight',
    muted: true,
  },
  { year: '2014–18', label: 'BE Mechanical', full: 'BE Mechanical', icon: 'cap' },
  {
    year: '2018',
    label: 'FEV India — IC engine design',
    full: 'First job at FEV India, designing IC engines',
    icon: 'cog',
  },
  {
    year: '2020',
    label: 'Batteries, EV startup',
    full: 'First worked on batteries, at an EV startup',
    icon: 'battery',
  },
  { year: '2022', label: 'Moved to the US', full: 'Moved to the US', icon: 'send' },
  { year: '2024', label: 'MS Mechanical', full: 'MS Mechanical', icon: 'cap' },
  { year: '2024', label: 'Joined Generac', full: 'Joined Generac', icon: 'briefcase' },
  {
    year: '2025',
    label: 'Battery simulation tool',
    full: 'Started building a battery simulation tool from my thesis',
    icon: 'chart',
  },
  {
    year: '2026',
    label: 'Building tools with vibe coding',
    full: 'Building my own tools with vibe coding',
    icon: 'code',
    final: true,
  },
]

// Line icons on an 18×18 grid, matching the reference. Drawn inline rather
// than pulling in an icon package. FEV (cog) and Generac (briefcase) are
// neutral placeholders until the real logos land.
const ICONS: Record<IconName, ReactNode> = {
  pin: (
    <>
      <path d="M9 16s5-4.5 5-8.5A5 5 0 0 0 4 7.5C4 11.5 9 16 9 16Z" />
      <circle cx="9" cy="7.5" r="1.7" />
    </>
  ),
  knight: (
    <>
      <path d="M5.2 15.6h8" />
      <path d="M6.4 13.4c0-2.3 1-3.5 2.7-4.4l-2.3.6-1.5-1.7L7.7 5.2V3.6l1.8-1.5 2.4 1.7c1.6 1 2.1 2.6 2.1 4.4v5.2" />
    </>
  ),
  medal: (
    <>
      <circle cx="9" cy="11" r="4" />
      <path d="M6.5 7.6 5 2.2h3L9 5l1-2.8h3L11.5 7.6" />
    </>
  ),
  cap: (
    <>
      <path d="M2 7 9 4l7 3-7 3-7-3Z" />
      <path d="M5 8.6V12c0 1 2 1.7 4 1.7s4-.7 4-1.7V8.6" />
      <path d="M16 7.2v3.4" />
    </>
  ),
  cog: (
    <>
      <circle cx="9" cy="9" r="2.4" />
      <path d="M9 2.2v2M9 13.8v2M2.2 9h2M13.8 9h2M4.2 4.2 5.6 5.6M12.4 12.4l1.4 1.4M13.8 4.2 12.4 5.6M5.6 12.4 4.2 13.8" />
    </>
  ),
  battery: (
    <>
      <rect x="2.5" y="6.3" width="11" height="5.6" rx="1.2" />
      <path d="M14 8.2v2M5.3 8.2v1.8M8 8.2v1.8" />
    </>
  ),
  send: (
    <>
      <path d="M2 9.4 16 3l-4.4 13-2.6-5.4L2 9.4Z" />
      <path d="M9 10.6 16 3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2.5" y="6" width="13" height="8" rx="1.3" />
      <path d="M6.4 6V4.6A1.2 1.2 0 0 1 7.6 3.4h2.8A1.2 1.2 0 0 1 11.6 4.6V6" />
      <path d="M2.5 9.4h13" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v12h12" />
      <path d="m5 12 3-3 2.4 2.4L15.5 6" />
    </>
  ),
  code: (
    <>
      <path d="M6.4 5.8 3.4 9l3 3.2" />
      <path d="M11.6 5.8 14.6 9l-3 3.2" />
    </>
  ),
}

function Icon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="h-[18px] w-[18px]"
    >
      {ICONS[name]}
    </svg>
  )
}

// Column centres and row centres as percentages of the 720×470 box, written
// out in full so Tailwind's scanner sees the literal class names.
const LEFT = [
  'md:left-[7.7778%]',
  'md:left-[35.8333%]',
  'md:left-[63.8889%]',
  'md:left-[91.9444%]',
]
const TOP = ['md:top-[17.0213%]', 'md:top-[53.1915%]', 'md:top-[89.3617%]']

const TOTAL_ROWS = Math.ceil(entries.length / ROW_LENGTH)

/** Odd rows run right→left, which is what makes the layout serpentine. */
function placement(index: number): string {
  const row = Math.floor(index / ROW_LENGTH)
  const position = index % ROW_LENGTH
  const column = row % 2 === 0 ? position : ROW_LENGTH - 1 - position
  return `${LEFT[column]} ${TOP[row]}`
}

/**
 * True for the node a U-turn descends from — last in its row, with a row still
 * to come. The curve leaves those nodes heading down and outward, straight
 * through where the label would otherwise sit: at the year line it is already
 * ~23px past the column centre and still inside the 140px label box. Shifting
 * the label sideways would only work for today's wording, so those two labels
 * go above their node instead, where the curve has not started yet.
 */
function labelSitsAbove(index: number): boolean {
  const row = Math.floor(index / ROW_LENGTH)
  const position = index % ROW_LENGTH
  return position === ROW_LENGTH - 1 && row < TOTAL_ROWS - 1
}

export default function Timeline() {
  return (
    <div className="relative md:mb-24 md:aspect-[720/470]">
      {/* The thread. Decorative, and only drawn where the serpentine applies. */}
      <svg
        viewBox="0 0 720 470"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 hidden h-full w-full text-brand-accent md:block"
      >
        <path d={SPINE_PATH} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      </svg>

      <ol aria-label="Timeline" className="md:block">
        {entries.map((entry, index) => {
          const above = labelSitsAbove(index)

          return (
          <li
            key={`${entry.year}-${entry.label}`}
            tabIndex={0}
            title={entry.full}
            className={`group flex items-center gap-4 py-3 focus-visible:outline-none md:absolute md:w-[140px] md:-translate-x-1/2 md:gap-1 md:py-0 md:text-center ${
              above
                ? // Band ends up last in the box, so pulling the whole entry up
                  // by its own height less half the band lands that band centre
                  // back on the thread — no matter how tall the label runs.
                  'md:flex-col-reverse md:translate-y-[calc(-100%_+_23px)]'
                : 'md:flex-col'
            } ${placement(index)}`}
          >
            <span className="sr-only">{entry.full}</span>

            {/* Node band — fixed height so the 38px and 46px circles share a
                centre, pulled up by half that height to straddle the thread. */}
            <div
              className={`flex shrink-0 items-center justify-center md:h-[46px] ${
                above ? '' : 'md:-mt-[23px]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex items-center justify-center rounded-full border-[1.5px] transition-colors motion-reduce:transition-none ${
                  entry.final
                    ? 'h-[46px] w-[46px] border-brand-accent bg-brand-accent text-brand-bg group-hover:border-brand-accent-hover group-hover:bg-brand-accent-hover group-focus-visible:border-brand-accent-hover group-focus-visible:bg-brand-accent-hover group-active:border-brand-accent-hover group-active:bg-brand-accent-hover'
                    : `h-[38px] w-[38px] border-brand-border bg-brand-bg group-hover:border-brand-accent group-focus-visible:border-brand-accent group-active:border-brand-accent ${
                        entry.muted ? 'text-brand-muted' : 'text-brand-text'
                      }`
                }`}
              >
                <Icon name={entry.icon} />
              </span>
            </div>

            <div
              aria-hidden="true"
              className="flex min-w-0 items-baseline gap-4 md:block"
            >
              <p
                className={`w-20 shrink-0 font-mono text-xs md:w-auto ${
                  entry.final ? 'font-medium text-brand-accent' : 'text-brand-muted'
                }`}
              >
                {entry.year}
              </p>
              <p className="font-display text-sm leading-snug text-brand-text transition-colors group-hover:text-brand-accent group-focus-visible:text-brand-accent group-active:text-brand-accent motion-reduce:transition-none md:mt-[3px]">
                {entry.label}
              </p>
            </div>
          </li>
          )
        })}
      </ol>
    </div>
  )
}
