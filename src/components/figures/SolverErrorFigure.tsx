import Figure from './Figure'

/**
 * Solver validation results for the AFM project.
 *
 * One series — peak error against the closed-form solution — across six
 * MATLAB solvers, so there is no legend: the eyebrow names what is
 * plotted. The selected solver is emphasized by color *and* by a larger
 * dot, because color alone is not an identity channel.
 *
 * A dot plot rather than bars: the errors span three decades, so the axis
 * has to be logarithmic, and a bar on a log axis misencodes magnitude —
 * its length depends on where the axis was truncated, since log has no
 * zero to grow from. A dot only claims a position, which is what a log
 * axis can honestly support.
 *
 * Values are the largest position or velocity error tabulated in the
 * steady-state window of the report (t > 3000), against the `dsolve`
 * solution of the same system with Fts = 0.
 */

interface SolverResult {
  name: string
  /** Peak |error| vs the analytical solution, non-dimensional units. */
  error: number
  selected?: boolean
}

// Ascending by error — the ranking is the point, so the winner leads.
// Phase offsets ran 1–2 steps for every solver and did not separate them,
// so magnitude is plotted and the phase result stays in the prose.
const results: SolverResult[] = [
  { name: 'ode78', error: 0.000883, selected: true },
  { name: 'ode113', error: 0.043035 },
  { name: 'ode45', error: 0.058861 },
  { name: 'ode15s', error: 0.190586 },
  { name: 'ode23', error: 0.238691 },
  { name: 'ode23s', error: 0.623497 },
]

// Log axis, one decade per gridline. The data spans 8.8e-4 to 6.2e-1, so
// nothing sits on an edge and no mark gets clipped by the track.
const DECADES = [-4, -3, -2, -1, 0]
const MIN_EXP = DECADES[0]
const MAX_EXP = DECADES[DECADES.length - 1]

function positionOf(value: number) {
  const exponent = Math.log10(value)
  return ((exponent - MIN_EXP) / (MAX_EXP - MIN_EXP)) * 100
}

function Decade({ exponent }: { exponent: number }) {
  return (
    <>
      10<sup className="text-[0.7em]">−{Math.abs(exponent)}</sup>
    </>
  )
}

export default function SolverErrorFigure() {
  return (
    <Figure
      eyebrow="Peak error against the analytical solution · steady state, log scale"
      caption={
        <>
          Every solver run on the same linear problem (F<sub>ts</sub> = 0), where a
          closed-form solution exists. ode78 (highlighted, larger dot) is roughly
          fifty times more accurate than the next non-stiff solver and was carried into
          the nonlinear runs. The two stiff solvers place mid-pack, which is what a
          non-stiff problem should do to them.
        </>
      }
    >
      <div className="space-y-4">
        {results.map((solver) => (
          <div
            key={solver.name}
            className="grid grid-cols-[3.25rem_1fr_3.5rem] sm:grid-cols-[4.5rem_1fr_4.5rem] gap-x-2 sm:gap-x-4 items-center"
          >
            <span className="font-mono text-[0.6875rem] sm:text-xs text-brand-text">
              {solver.name}
            </span>

            <div className="relative h-4">
              {DECADES.map((exponent) => (
                <span
                  key={exponent}
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 w-px bg-brand-border"
                  style={{ left: `${positionOf(10 ** exponent)}%` }}
                />
              ))}

              <span
                aria-hidden="true"
                className={[
                  'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full',
                  solver.selected
                    ? 'h-[11px] w-[11px] bg-brand-accent'
                    : 'h-[9px] w-[9px] bg-brand-muted',
                ].join(' ')}
                style={{ left: `${positionOf(solver.error)}%` }}
              />
            </div>

            <span className="font-mono text-[0.6875rem] sm:text-xs text-brand-muted tabular-nums text-right">
              {solver.error.toPrecision(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Axis. Three labels, not five — at 375px the full set collides. */}
      <div className="grid grid-cols-[3.25rem_1fr_3.5rem] sm:grid-cols-[4.5rem_1fr_4.5rem] gap-x-2 sm:gap-x-4 mt-2">
        <span />
        <div className="relative h-4 font-mono text-[0.625rem] text-brand-muted">
          <span className="absolute left-0 top-0">
            <Decade exponent={-4} />
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 top-0">
            <Decade exponent={-2} />
          </span>
          <span className="absolute right-0 top-0">
            10<sup className="text-[0.7em]">0</sup>
          </span>
        </div>
        <span />
      </div>
    </Figure>
  )
}
