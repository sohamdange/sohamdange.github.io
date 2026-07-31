import Figure from './Figure'

/**
 * Where each tier of the AFM model was exercised, on the normalized
 * separation axis.
 *
 * Two rows, but not two color-coded series: each row is named directly
 * above its own track, so identity comes from position and label rather
 * than from hue. Row labels sit above the tracks instead of in a left
 * column so the plot keeps its full width at 375px.
 *
 * The wash and the vertical rule at z_c* = 1 span both rows, which is why
 * the rows live inside one positioned container rather than carrying
 * their own copies of the rule (a rule drawn per row reads as broken).
 */

const DOMAIN_MIN = 0.3
const DOMAIN_MAX = 1.7

/** Separation at which a freely swinging tip just reaches the surface. */
const CONTACT_THRESHOLD = 1.0

const AXIS_TICKS = [0.4, 0.8, 1.0, 1.2, 1.6]

interface Sweep {
  label: string
  detail: string
  separations: number[]
}

const sweeps: Sweep[] = [
  {
    label: 'Full model',
    detail: 'van der Waals + contact',
    separations: [0.4, 0.6, 0.8, 1.0, 1.2],
  },
  {
    label: 'van der Waals only',
    detail: 'no contact term',
    separations: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6],
  },
]

function positionOf(separation: number) {
  return ((separation - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN)) * 100
}

export default function SweepRangeFigure() {
  const thresholdPosition = positionOf(CONTACT_THRESHOLD)

  return (
    <Figure
      eyebrow="Separations simulated, by model tier · normalized by free amplitude"
      caption={
        <>
          The full model was swept from 0.4 to 1.2 in steps of 0.2, the van der Waals
          model from 1.0 to 1.6 in steps of 0.1, every separation normalized by the
          20&nbsp;nm free amplitude. Left of
          z<sub>c</sub>* = 1 the tip reaches the surface on every swing and the contact
          term is live; right of it the tip never arrives and only van der Waals
          attraction remains. The linear tier used for solver validation has no surface
          at all, so it has no place on this axis.
        </>
      }
    >
      <div className="relative">
        {/* Region where the tip reaches the surface. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 bg-brand-surface"
          style={{ width: `${thresholdPosition}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-brand-border"
          style={{ left: `${thresholdPosition}%` }}
        />

        <div className="relative py-4 space-y-7">
          <p
            className="font-mono text-[0.625rem] text-brand-muted text-right pr-2"
            style={{ width: `${thresholdPosition}%` }}
          >
            tip strikes the surface
          </p>

          {sweeps.map((sweep) => (
            <div key={sweep.label}>
              <p className="font-mono text-[0.6875rem] sm:text-xs text-brand-text mb-3">
                {sweep.label}{' '}
                <span className="text-brand-muted">· {sweep.detail}</span>
              </p>

              <div className="relative h-3">
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 h-px bg-brand-border"
                  style={{
                    left: `${positionOf(sweep.separations[0])}%`,
                    width: `${
                      positionOf(sweep.separations[sweep.separations.length - 1]) -
                      positionOf(sweep.separations[0])
                    }%`,
                  }}
                />

                {sweep.separations.map((separation) => (
                  <span
                    key={separation}
                    aria-hidden="true"
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-[9px] w-[9px] rounded-full bg-brand-accent"
                    style={{ left: `${positionOf(separation)}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-4 mt-1 font-mono text-[0.625rem] text-brand-muted">
        {AXIS_TICKS.map((tick) => (
          <span
            key={tick}
            className={`absolute top-0 -translate-x-1/2 tabular-nums ${
              tick === CONTACT_THRESHOLD ? 'text-brand-text' : ''
            }`}
            style={{ left: `${positionOf(tick)}%` }}
          >
            {tick.toFixed(1)}
          </span>
        ))}
      </div>
    </Figure>
  )
}
