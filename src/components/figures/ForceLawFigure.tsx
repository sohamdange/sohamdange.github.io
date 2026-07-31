import Figure from './Figure'

/**
 * The tip–surface force law, exactly as implemented in the project's MATLAB.
 *
 * Both branches and every constant come from the simulation source, so this
 * is the model's own force rather than a textbook sketch of one:
 *
 *   d > a0:   F = -H·R / (6 d²)                    (van der Waals)
 *   d ≤ a0:   F = K (a0 - d)^{3/2} - H·R / (6 a0²) (contact, DMT form)
 *
 * The two branches meet at d = a0, so the curve is continuous there.
 *
 * A path, not dots: this is a continuous function rather than a set of
 * measurements, and reading the shape is the whole point. The SVG stretches
 * to the column with preserveAspectRatio="none" (percentage geometry, same
 * as the other figures) and the stroke is pinned to 2px through
 * vector-effect so the aspect distortion never thickens the line. Text
 * stays in HTML on top of it, where it can scale and wrap normally.
 */

// Every constant below is read straight from the MATLAB parameter block.
const HAMAKER = 6e-20 // J
const TIP_RADIUS = 20e-9 // m
const INTERMOLECULAR = 1.62868e-10 // a0, m
const E_TIP = 130e9 // Pa
const E_SURFACE = 70e9 // Pa
const POISSON = 0.3
const SURFACE_ENERGY = 0.03 // J/m²

const E_EFFECTIVE =
  1 / ((1 - POISSON ** 2) / E_TIP + (1 - POISSON ** 2) / E_SURFACE)

const CONTACT_STIFFNESS =
  ((4 / 3) * (E_EFFECTIVE * Math.sqrt(TIP_RADIUS))) / (1 - SURFACE_ENERGY ** 2)

/** Adhesion at the moment of contact, the minimum of the curve. */
const ADHESION = (-HAMAKER * TIP_RADIUS) / (6 * INTERMOLECULAR ** 2)

/** Tip–surface force in newtons for a gap of d metres. */
function force(gap: number) {
  if (gap > INTERMOLECULAR) {
    return (-HAMAKER * TIP_RADIUS) / (6 * gap * gap)
  }
  return CONTACT_STIFFNESS * Math.pow(INTERMOLECULAR - gap, 1.5) + ADHESION
}

// Plot window, chosen so the curve just fills the frame: the repulsive wall
// reaches the top edge at the left, the attraction has flattened by the right.
const GAP_MIN = -0.15e-9
const GAP_MAX = 1.0e-9
const FORCE_MIN = -15e-9
const FORCE_MAX = 45e-9

const SAMPLES = 200

const xPercent = (gap: number) => ((gap - GAP_MIN) / (GAP_MAX - GAP_MIN)) * 100
const yPercent = (f: number) => ((FORCE_MAX - f) / (FORCE_MAX - FORCE_MIN)) * 100

const curve = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const gap = GAP_MIN + ((GAP_MAX - GAP_MIN) * i) / SAMPLES
  return `${xPercent(gap).toFixed(3)},${yPercent(force(gap)).toFixed(3)}`
}).join(' ')

const contactEdge = xPercent(INTERMOLECULAR)
const zeroLine = yPercent(0)

export default function ForceLawFigure() {
  return (
    <Figure
      eyebrow="Tip–surface force against gap · both branches as implemented"
      caption={
        <>
          Attraction goes as the inverse square of the gap until the tip reaches
          a<sub>0</sub> = 0.16&nbsp;nm, where contact takes over and the force turns
          repulsive as the three-halves power of the indentation. The well bottoms out at
          −7.5&nbsp;nN, and half a nanometre further in the force is +98&nbsp;nN: a
          105&nbsp;nN swing across 5&nbsp;Å, which is what makes the system stiff. At a
          20&nbsp;nm gap, the rest position for z<sub>c</sub>* = 1, the attraction is
          0.5&nbsp;pN — four decades below this window and 0.02% of the drive amplitude,
          which is why the van der Waals sweep moves no amplitude at all.
        </>
      }
    >
      <div className="grid grid-cols-[2.5rem_1fr] gap-x-2">
        {/* y-axis labels, positioned against the same scale as the plot */}
        <div className="relative h-56 font-mono text-[0.625rem] text-brand-muted">
          <span
            className="absolute right-0 -translate-y-1/2 tabular-nums"
            style={{ top: `${yPercent(40e-9)}%` }}
          >
            +40
          </span>
          <span
            className="absolute right-0 -translate-y-1/2 tabular-nums"
            style={{ top: `${zeroLine}%` }}
          >
            0
          </span>
          <span
            className="absolute right-0 -translate-y-1/2 tabular-nums"
            style={{ top: `${yPercent(ADHESION)}%` }}
          >
            −7.5
          </span>
        </div>

        <div className="relative h-56">
          {/* Contact region, washed to match the separation figure. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 bg-brand-surface"
            style={{ width: `${contactEdge}%` }}
          />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Zero force, and the gap at which contact begins. */}
            <line
              x1="0"
              y1={zeroLine}
              x2="100"
              y2={zeroLine}
              className="stroke-brand-border"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={contactEdge}
              y1="0"
              x2={contactEdge}
              y2="100"
              className="stroke-brand-border"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={curve}
              fill="none"
              className="stroke-brand-accent"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Bottom of the wash, not the top: the repulsive wall occupies the
              top-left corner and would run straight through the label. */}
          <span className="absolute left-2 bottom-1 font-mono text-[0.625rem] text-brand-muted">
            contact
          </span>
          <span
            className="absolute font-mono text-[0.625rem] text-brand-muted"
            style={{ left: `${contactEdge + 3}%`, top: '6%' }}
          >
            a<sub>0</sub>
          </span>
          <span
            className="absolute right-1 font-mono text-[0.625rem] text-brand-muted"
            style={{ top: `${zeroLine - 14}%` }}
          >
            van der Waals
          </span>
        </div>

        <span />
        <div className="relative h-4 mt-1 font-mono text-[0.625rem] text-brand-muted">
          {[0, 0.5, 1.0].map((nm) => (
            <span
              key={nm}
              className="absolute top-0 -translate-x-1/2 tabular-nums"
              style={{ left: `${xPercent(nm * 1e-9)}%` }}
            >
              {nm.toFixed(1)}
            </span>
          ))}
          <span className="absolute top-0 right-0 translate-y-[1.1rem]">
            gap (nm) · force (nN)
          </span>
        </div>
      </div>
    </Figure>
  )
}
