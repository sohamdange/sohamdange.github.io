import Figure from './Figure'

/**
 * The rig as built — a redraw of the test rig setup figure from the report.
 *
 * The source is a shaded CAD render with callout boxes. Two changes:
 *
 *   1. It reads as an arrangement rather than a rendering. What matters is
 *      the topology — two mechanism compartments sharing one heater, joined
 *      by circulation pipes — and a render buries that under surfaces.
 *   2. The symmetry is made explicit. Two compartments existed so two
 *      candidate materials could run side by side in the same water, and
 *      that intent is the single most important thing the figure carries.
 *      It is also what the project failed to use, which the write-up says.
 *
 * Schematic. No dimension here is taken from the rig.
 */

const TANK = { x: 6, y: 26, w: 88, h: 34 }
/** Central heater bay, flanked by a mechanism compartment on each side. */
const HEATER = { x: 42, w: 16 }

/** Cylinder centre-lines, one per mechanism compartment. */
const CYLINDERS = [24, 76]

export default function RigLayoutFigure() {
  return (
    <Figure
      eyebrow="Wear test rig · compartment layout"
      caption={
        <>
          One heater bay in the middle, a mechanism compartment on each side, and circulation
          pipes carrying heated salt water between them so neither specimen sits in a thermal
          gradient. The pair is the whole point: two candidate materials, the same water, the
          same temperature, the same cycle count, so a difference between them means something.
          In practice only one compartment was ever run. Schematic, not to scale.
        </>
      }
    >
      <div className="relative w-full" style={{ aspectRatio: '100 / 78' }}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 78"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* ---- Tank ---- */}
          <rect
            x={TANK.x}
            y={TANK.y}
            width={TANK.w}
            height={TANK.h}
            rx="1"
            fill="none"
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Heater bay, washed and bounded */}
          <rect
            x={HEATER.x}
            y={TANK.y}
            width={HEATER.w}
            height={TANK.h}
            className="fill-brand-surface"
          />
          <line
            x1={HEATER.x}
            y1={TANK.y}
            x2={HEATER.x}
            y2={TANK.y + TANK.h}
            className="stroke-brand-border"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={HEATER.x + HEATER.w}
            y1={TANK.y}
            x2={HEATER.x + HEATER.w}
            y2={TANK.y + TANK.h}
            className="stroke-brand-border"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Heater element */}
          <polyline
            points="46,36 46,50 50,50 50,36 54,36 54,50"
            fill="none"
            className="stroke-brand-accent"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Water level */}
          <line
            x1={TANK.x}
            y1={34}
            x2={TANK.x + TANK.w}
            y2={34}
            className="stroke-brand-border"
            strokeWidth="1"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />

          {/* Feet */}
          {[20, 50, 80].map((x) => (
            <line
              key={x}
              x1={x}
              y1={TANK.y + TANK.h}
              x2={x}
              y2={TANK.y + TANK.h + 4}
              className="stroke-brand-text"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* ---- Per-compartment hardware ---- */}
          {CYLINDERS.map((cx) => (
            <g key={cx}>
              {/* Pneumatic cylinder above the cover plate */}
              <rect
                x={cx - 3.5}
                y={6}
                width={7}
                height={13}
                rx="0.5"
                fill="none"
                className="stroke-brand-accent"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              {/* Rod down through the plate */}
              <line
                x1={cx}
                y1={19}
                x2={cx}
                y2={40}
                className="stroke-brand-accent"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              {/* Cover plate */}
              <line
                x1={cx - 11}
                y1={TANK.y}
                x2={cx + 11}
                y2={TANK.y}
                className="stroke-brand-text"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
              {/* Mechanism hanging below, with the specimen pin marked */}
              <line
                x1={cx}
                y1={40}
                x2={cx - 6}
                y2={49}
                className="stroke-brand-text"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={cx}
                cy={40}
                r="2.5"
                className="fill-brand-accent"
              />
              <circle
                cx={cx - 8.5}
                cy={51}
                r="4"
                fill="none"
                className="stroke-brand-text"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}

          {/* ---- Float valves at each end ---- */}
          {[
            [TANK.x, 1],
            [TANK.x + TANK.w, -1],
          ].map(([x, dir]) => (
            <g key={x}>
              <line
                x1={x}
                y1={31}
                x2={x + dir * 5}
                y2={31}
                className="stroke-brand-muted"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={x + dir * 6.5}
                cy={31}
                r="1.8"
                className="fill-brand-muted"
              />
            </g>
          ))}

          {/* ---- Circulation pipes, looping under the tank ---- */}
          <path
            d={`M ${TANK.x + 8} ${TANK.y + TANK.h} C ${TANK.x + 8} 72, 46 72, 46 ${TANK.y + TANK.h}`}
            fill="none"
            className="stroke-brand-muted"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M 54 ${TANK.y + TANK.h} C 54 72, ${TANK.x + TANK.w - 8} 72, ${TANK.x + TANK.w - 8} ${TANK.y + TANK.h}`}
            fill="none"
            className="stroke-brand-muted"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute inset-0 font-mono text-[0.625rem] text-brand-muted">
          <span className="absolute" style={{ left: '13%', top: '0%' }}>
            cylinder
          </span>
          <span className="absolute" style={{ left: '65%', top: '0%' }}>
            cylinder
          </span>
          <span
            className="absolute -translate-x-1/2 text-center text-brand-accent"
            style={{ left: '50%', top: '17%' }}
          >
            heater
          </span>
          <span className="absolute" style={{ left: '0%', top: '30%' }}>
            float
          </span>
          <span className="absolute text-right" style={{ right: '0%', top: '30%' }}>
            valve
          </span>
          <span className="absolute" style={{ left: '9%', top: '69%' }}>
            mechanism
          </span>
          <span className="absolute" style={{ left: '76%', top: '69%' }}>
            mechanism
          </span>
          <span
            className="absolute -translate-x-1/2"
            style={{ left: '50%', top: '93%' }}
          >
            circulation
          </span>
        </div>
      </div>
    </Figure>
  )
}
