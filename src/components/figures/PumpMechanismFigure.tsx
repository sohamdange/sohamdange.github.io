import Figure from './Figure'

/**
 * The pump in service — a redraw of the layout figure from the project
 * report, with the pivot pin called out.
 *
 * The original is a vendor-style clip-art section with the valves, float,
 * and ports labelled. Three changes make it earn its place here:
 *
 *   1. The pivot pin is marked. It is the subject of the entire project and
 *      the source figure does not indicate it at all.
 *   2. The two flow paths are distinguished by weight — motive steam is the
 *      accent stroke, condensate the muted one — so the reader can see that
 *      one fluid drives and the other is driven.
 *   3. Labels are real text rather than baked into a raster, so they scale,
 *      wrap, and follow the theme.
 *
 * Geometry is schematic. This is an arrangement diagram, not a scale
 * drawing, and no dimension here is taken from the product.
 *
 * SVG for the linework with percentage geometry and non-scaling strokes,
 * matching the other figures; text stays in HTML on top.
 */

// Shell, in viewBox units. Everything else is positioned off these.
const SHELL = { x: 18, y: 22, w: 64, h: 56 }

const FLOAT = { cx: 36, cy: 58, r: 8 }
/** Where the linkage turns — the part the project exists to characterise. */
const PIVOT = { x: 55, y: 50 }

export default function PumpMechanismFigure() {
  return (
    <Figure
      eyebrow="Pressure-powered pump · arrangement, with the wear site marked"
      caption={
        <>
          The float rises with the condensate level and loads the springs until the linkage
          goes over centre, at which point it snaps: motive steam inlet open, exhaust shut,
          in a single motion. Everything the mechanism does passes through the pivot pin, and
          it arrives there as an impact rather than a rotation. Schematic — no dimension shown
          is taken from the product.
        </>
      }
    >
      <div className="relative w-full" style={{ aspectRatio: '100 / 92' }}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 92"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* ---- Pump shell ---- */}
          <rect
            x={SHELL.x}
            y={SHELL.y}
            width={SHELL.w}
            height={SHELL.h}
            rx="1"
            fill="none"
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Condensate level inside the shell */}
          <line
            x1={SHELL.x}
            y1={66}
            x2={SHELL.x + SHELL.w}
            y2={66}
            className="stroke-brand-border"
            strokeWidth="1"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />

          {/* Feet */}
          <line
            x1={34}
            y1={SHELL.y + SHELL.h}
            x2={34}
            y2={SHELL.y + SHELL.h + 5}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={66}
            y1={SHELL.y + SHELL.h}
            x2={66}
            y2={SHELL.y + SHELL.h + 5}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* ---- Motive steam: inlet and exhaust, accent ---- */}
          {/* Inlet, down into the shell */}
          <path
            d="M 52 4 L 52 14 L 52 22"
            fill="none"
            className="stroke-brand-accent"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 49.5 11 L 52 15 L 54.5 11 Z"
            className="fill-brand-accent"
          />
          {/* Exhaust, up out of the shell */}
          <path
            d="M 64 22 L 64 14 L 64 4"
            fill="none"
            className="stroke-brand-accent"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M 61.5 11 L 64 7 L 66.5 11 Z" className="fill-brand-accent" />

          {/* Valve seats on the shell roof */}
          <line
            x1={48}
            y1={22}
            x2={56}
            y2={22}
            className="stroke-brand-accent"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={60}
            y1={22}
            x2={68}
            y2={22}
            className="stroke-brand-accent"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />

          {/* ---- Condensate: in on the left, out on the right, muted ---- */}
          <path
            d="M 2 70 L 18 70"
            fill="none"
            className="stroke-brand-muted"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M 11 67.5 L 15 70 L 11 72.5 Z" className="fill-brand-muted" />
          <path
            d="M 82 70 L 98 70"
            fill="none"
            className="stroke-brand-muted"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M 90 67.5 L 94 70 L 90 72.5 Z" className="fill-brand-muted" />

          {/* Check valves on each port */}
          <path
            d="M 12 66.5 L 12 73.5 M 86 66.5 L 86 73.5"
            className="stroke-brand-muted"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* ---- Float and linkage ---- */}
          <circle
            cx={FLOAT.cx}
            cy={FLOAT.cy}
            r={FLOAT.r}
            fill="none"
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Float arm to the pivot */}
          <line
            x1={FLOAT.cx + FLOAT.r}
            y1={FLOAT.cy - 2}
            x2={PIVOT.x}
            y2={PIVOT.y}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Toggle link and push rod up to the valve gear */}
          <line
            x1={PIVOT.x}
            y1={PIVOT.y}
            x2={60}
            y2={38}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={60}
            y1={38}
            x2={60}
            y2={26}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Valve actuating beam */}
          <line
            x1={50}
            y1={26}
            x2={66}
            y2={26}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Spring, as a short zigzag between the arm and the shell wall */}
          <polyline
            points="47,47 49,44 51,48 53,44 55,48 57,45"
            fill="none"
            className="stroke-brand-muted"
            strokeWidth="1.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* ---- The pivot pin ---- */}
          <circle
            cx={PIVOT.x}
            cy={PIVOT.y}
            r="4.5"
            fill="none"
            className="stroke-brand-accent"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={PIVOT.x} cy={PIVOT.y} r="2" className="fill-brand-accent" />
          {/* Leader out to the label */}
          <line
            x1={PIVOT.x + 4.5}
            y1={PIVOT.y}
            x2={78}
            y2={44}
            className="stroke-brand-accent"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Labels. HTML rather than <text> so they scale and follow the theme. */}
        <div className="absolute inset-0 font-mono text-[0.625rem] text-brand-muted">
          <span className="absolute" style={{ left: '44%', top: '0%' }}>
            steam in
          </span>
          <span className="absolute" style={{ left: '68%', top: '0%' }}>
            exhaust
          </span>
          <span className="absolute" style={{ left: '0%', top: '82%' }}>
            condensate in
          </span>
          <span className="absolute text-right" style={{ right: '0%', top: '82%' }}>
            out to receiver
          </span>
          <span className="absolute" style={{ left: '20%', top: '69%' }}>
            float
          </span>
          <span
            className="absolute font-medium text-brand-accent"
            style={{ left: '79%', top: '42%' }}
          >
            pivot pin
          </span>
        </div>
      </div>
    </Figure>
  )
}
