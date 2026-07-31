import Figure from './Figure'

/**
 * The two MATLAB results from the project report, paired.
 *
 * Left  — piston displacement against time (report fig. 5.5.1)
 * Right — the actuation-force integral against mechanism angle (fig. 5.5.2)
 *
 * They are shown together because neither is the argument on its own. The
 * left panel says the cycle is asymmetric and ends in two near-vertical
 * events; the right says the force needed to drive the mechanism collapses
 * as it approaches centre. The second explains the first, and the pairing
 * is what makes a bounded-force actuator obviously the right choice.
 *
 * PROVENANCE — read before editing. These traces are digitised from the
 * plots in the report, not recomputed from the ODE. The MATLAB in the
 * report's annexure carries a unit inconsistency in the pressure-force
 * term (cylinder pressure in bar multiplied directly by an area in mm²),
 * so re-running it here would reproduce an error rather than a result.
 * Digitising the published output is the honest option: it reports what
 * the project reported. Shape and the labelled values are faithful;
 * individual sample points are not measurements.
 */

// ---------------------------------------------------------------- panel A

/** Total cycle time reported from the Runge–Kutta solution, seconds. */
const CYCLE_TIME = 0.914
/** Where the filling stroke ends and the pumping stroke begins. */
const SNAP_T = 0.667

const T_MAX = 1.0
const X_MIN = -50
const X_MAX = 50

// (time s, displacement mm). The extension stroke runs on the rod-side
// annulus and the retraction stroke on the full piston face, so the second
// half of the cycle covers the same travel in roughly a third of the time.
const displacement: [number, number][] = [
  [0, -40], [0.1, -39], [0.2, -36.5], [0.3, -32.5], [0.4, -26.5],
  [0.5, -18.5], [0.55, -13.5], [0.6, -7], [0.63, -2], [0.65, 12],
  [0.66, 25], [0.665, 42],
  [0.67, 41], [0.7, 37], [0.75, 28], [0.8, 17], [0.85, 3],
  [0.88, -12], [0.9, -25], [0.905, -35], [0.914, -43],
]

const tPct = (t: number) => (t / T_MAX) * 100
const xPct = (x: number) => ((X_MAX - x) / (X_MAX - X_MIN)) * 100

const displacementCurve = displacement
  .map(([t, x]) => `${tPct(t).toFixed(2)},${xPct(x).toFixed(2)}`)
  .join(' ')

// ---------------------------------------------------------------- panel B

const PHI_MIN = -50
const PHI_MAX = 50
const F_MAX = 7000

// (mechanism angle deg, force integral). Flat while the linkage is still
// loading the springs, then falling away as it approaches centre.
const forceIntegral: [number, number][] = [
  [-45, 6050], [-40, 6050], [-35, 6040], [-32, 6000], [-28, 5850],
  [-24, 5650], [-20, 5400], [-15, 5050], [-10, 4650], [-5, 4200],
  [0, 3750], [5, 3250], [10, 2750], [15, 2250], [20, 1780],
  [25, 1330], [30, 900], [35, 520], [38, 300], [40, 150], [42, 20],
]

const phiPct = (phi: number) => ((phi - PHI_MIN) / (PHI_MAX - PHI_MIN)) * 100
const fPct = (f: number) => ((F_MAX - f) / F_MAX) * 100

const forceCurve = forceIntegral
  .map(([phi, f]) => `${phiPct(phi).toFixed(2)},${fPct(f).toFixed(2)}`)
  .join(' ')

const PLOT = 'relative h-44'
const AXIS = 'relative h-4 mt-1 font-mono text-[0.625rem] text-brand-muted'
const TICKS = 'relative font-mono text-[0.625rem] text-brand-muted'

export default function CycleDynamicsFigure() {
  return (
    <Figure
      eyebrow="Piston travel over one cycle · actuation force against mechanism angle"
      caption={
        <>
          Left: one complete cycle takes 0.914&nbsp;s, and it is lopsided. Extension runs on
          the rod-side annulus and retraction on the full piston face, so the return stroke
          covers the same travel in about a third of the time. Both strokes end in a
          near-vertical segment — that is the linkage going over centre and snapping, not the
          cylinder moving faster. Right: the force needed to drive the mechanism is flat while
          the springs are still loading, then collapses toward zero as the linkage approaches
          centre, which averages to 84&nbsp;N across the sweep. A cylinder sized on that
          average has surplus force everywhere except the first few degrees, and surplus force
          is what buys the accelerated cycle rate. Traces digitised from the project's MATLAB
          output.
        </>
      }
    >
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
        {/* ---------------------------------------------------- panel A */}
        <div>
          <p className="font-mono text-[0.625rem] text-brand-muted mb-3">
            piston displacement (mm) · time (s)
          </p>

          <div className="grid grid-cols-[1.75rem_1fr] gap-x-1.5">
            <div className={`${TICKS} h-44`}>
              {[40, 0, -40].map((mm) => (
                <span
                  key={mm}
                  className="absolute right-0 -translate-y-1/2 tabular-nums"
                  style={{ top: `${xPct(mm)}%` }}
                >
                  {mm > 0 ? `+${mm}` : mm}
                </span>
              ))}
            </div>

            <div className={PLOT}>
              {/* The pumping stroke, washed so the asymmetry is visible as area. */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 bg-brand-surface"
                style={{
                  left: `${tPct(SNAP_T)}%`,
                  width: `${tPct(CYCLE_TIME) - tPct(SNAP_T)}%`,
                }}
              />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {[40, 0, -40].map((mm) => (
                  <line
                    key={mm}
                    x1="0"
                    y1={xPct(mm)}
                    x2="100"
                    y2={xPct(mm)}
                    className="stroke-brand-border"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <polyline
                  points={displacementCurve}
                  fill="none"
                  className="stroke-brand-accent"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <span
                className="absolute font-mono text-[0.625rem] text-brand-muted whitespace-nowrap"
                style={{ left: `${tPct(SNAP_T) + 2}%`, top: '4%' }}
              >
                pumping
              </span>
              <span
                className="absolute font-mono text-[0.625rem] text-brand-muted"
                style={{ left: '4%', top: '4%' }}
              >
                filling
              </span>
            </div>

            <span />
            <div className={AXIS}>
              {[0, 0.5, 1.0].map((t) => (
                <span
                  key={t}
                  className="absolute top-0 -translate-x-1/2 tabular-nums"
                  style={{ left: `${tPct(t)}%` }}
                >
                  {t.toFixed(1)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- panel B */}
        <div>
          <p className="font-mono text-[0.625rem] text-brand-muted mb-3">
            ∫F<sub>p</sub> dφ · mechanism angle (deg)
          </p>

          <div className="grid grid-cols-[1.75rem_1fr] gap-x-1.5">
            <div className={`${TICKS} h-44`}>
              {[6000, 3000, 0].map((f) => (
                <span
                  key={f}
                  className="absolute right-0 -translate-y-1/2 tabular-nums"
                  style={{ top: `${fPct(f)}%` }}
                >
                  {f === 0 ? '0' : `${f / 1000}k`}
                </span>
              ))}
            </div>

            <div className={PLOT}>
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {[6000, 3000, 0].map((f) => (
                  <line
                    key={f}
                    x1="0"
                    y1={fPct(f)}
                    x2="100"
                    y2={fPct(f)}
                    className="stroke-brand-border"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {/* Centre of the toggle. */}
                <line
                  x1={phiPct(0)}
                  y1="0"
                  x2={phiPct(0)}
                  y2="100"
                  className="stroke-brand-border"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  vectorEffect="non-scaling-stroke"
                />
                <polyline
                  points={forceCurve}
                  fill="none"
                  className="stroke-brand-accent"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <span
                className="absolute font-mono text-[0.625rem] text-brand-muted"
                style={{ left: `${phiPct(0) + 2}%`, top: '4%' }}
              >
                centre
              </span>
            </div>

            <span />
            <div className={AXIS}>
              {[-40, 0, 40].map((phi) => (
                <span
                  key={phi}
                  className="absolute top-0 -translate-x-1/2 tabular-nums"
                  style={{ left: `${phiPct(phi)}%` }}
                >
                  {phi > 0 ? `+${phi}` : phi}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Figure>
  )
}
