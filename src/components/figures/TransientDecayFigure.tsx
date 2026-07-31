import Figure from './Figure'

/**
 * Why the run is 4000 time units long and the amplitude is read after 3000.
 *
 * What decays is the homogeneous solution, whose envelope is exp(-τ/2Q)
 * with Q = 300. That is exact regardless of the initial conditions, which
 * is why this plots the *residual transient* rather than the amplitude
 * itself: the trajectory starts at z(0) = 1 with the steady state also
 * near 1, so the amplitude does not simply rise from zero and drawing it
 * that way would claim a shape the model does not have.
 *
 * The y-axis is logarithmic because that is the whole argument — on a
 * linear axis every point past τ ≈ 1500 is flat against zero and the
 * choice of 3000 looks arbitrary.
 */

/** Quality factor: transient envelope decays as exp(-τ / 2Q). */
const Q = 300
const DECAY_CONSTANT = 2 * Q

const TAU_MAX = 4000
/** Start of the window the steady-state amplitude is measured over. */
const STEADY_STATE_START = 3000

// Four decades: 100% down to 0.1%, which contains the whole run.
const DECADES = [0, -1, -2, -3]
const MIN_EXP = DECADES[DECADES.length - 1]

const residual = (tau: number) => Math.exp(-tau / DECAY_CONSTANT)

const xPercent = (tau: number) => (tau / TAU_MAX) * 100
const yPercent = (value: number) =>
  ((0 - Math.log10(value)) / (0 - MIN_EXP)) * 100

const SAMPLES = 120

const curve = Array.from({ length: SAMPLES + 1 }, (_, i) => {
  const tau = (TAU_MAX * i) / SAMPLES
  return `${xPercent(tau).toFixed(3)},${yPercent(residual(tau)).toFixed(3)}`
}).join(' ')

const steadyStateResidual = residual(STEADY_STATE_START)

export default function TransientDecayFigure() {
  return (
    <Figure
      eyebrow="Residual transient against time · log scale, run length 4000"
      caption={
        <>
          The homogeneous solution decays with a time constant of 2Q = 600, so τ = 3000 is
          five time constants and leaves {(steadyStateResidual * 100).toFixed(1)}% of the
          starting transient. That is the whole reason the run is longer than the physics
          needs: the last quarter of it is the only part the amplitude is read from.
        </>
      }
    >
      <div className="grid grid-cols-[2.5rem_1fr] gap-x-2">
        <div className="relative h-48 font-mono text-[0.625rem] text-brand-muted">
          {DECADES.map((exponent) => (
            <span
              key={exponent}
              className="absolute right-0 -translate-y-1/2 tabular-nums"
              style={{ top: `${yPercent(10 ** exponent)}%` }}
            >
              {exponent === 0 ? '100%' : `${(10 ** exponent * 100).toFixed(exponent === -3 ? 1 : 0)}%`}
            </span>
          ))}
        </div>

        <div className="relative h-48">
          {/* The window the steady-state amplitude is measured over. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 bg-brand-surface"
            style={{
              left: `${xPercent(STEADY_STATE_START)}%`,
              right: 0,
            }}
          />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {DECADES.map((exponent) => (
              <line
                key={exponent}
                x1="0"
                y1={yPercent(10 ** exponent)}
                x2="100"
                y2={yPercent(10 ** exponent)}
                className="stroke-brand-border"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <polyline
              points={curve}
              fill="none"
              className="stroke-brand-accent"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* The point the design decision rests on. */}
          <span
            aria-hidden="true"
            className="absolute h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent"
            style={{
              left: `${xPercent(STEADY_STATE_START)}%`,
              top: `${yPercent(steadyStateResidual)}%`,
            }}
          />
          {/* Below and left of the dot: the only quadrant the decay line does
              not cross. Above it, the label sits on the line at 375px. The
              axis tick and the dot already say "τ = 3000", so the label is
              just the value. */}
          <span
            className="absolute -translate-x-full whitespace-nowrap font-mono text-[0.625rem] text-brand-text"
            style={{
              left: `${xPercent(STEADY_STATE_START) - 2}%`,
              top: `${yPercent(steadyStateResidual) + 8}%`,
            }}
          >
            {(steadyStateResidual * 100).toFixed(1)}%
          </span>
          {/* Top of the window, not the bottom: the decay line exits through
              the bottom-right corner and would cross the label. */}
          <span className="absolute right-2 top-1 font-mono text-[0.625rem] text-brand-muted">
            measured here
          </span>
        </div>

        <span />
        <div className="relative h-4 mt-1 font-mono text-[0.625rem] text-brand-muted">
          {[0, 1000, 2000, 3000, 4000].map((tau) => (
            <span
              key={tau}
              className="absolute top-0 -translate-x-1/2 tabular-nums"
              style={{ left: `${xPercent(tau)}%` }}
            >
              {tau}
            </span>
          ))}
        </div>
      </div>
    </Figure>
  )
}
