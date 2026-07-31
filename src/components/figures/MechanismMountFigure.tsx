import Figure from './Figure'

/**
 * One compartment, zoomed in — a redraw of the mechanism assembly figure
 * from the report.
 *
 * The source is a CAD render of the assembly on its cover plate. What a
 * render cannot show, and what this project turns on, is the coupling: the
 * slider is captured in a slot rather than pinned to the lever, so the
 * cylinder sets a force and a direction but never a position. That is the
 * decision the whole actuation strategy rests on, so it gets the accent and
 * a callout, and everything else is drawn thin.
 *
 * Reads as a zoom on RigLayoutFigure: same cover plate, same cylinder, one
 * compartment instead of the tank.
 *
 * Schematic. No dimension here is taken from the rig.
 */

const PLATE_Y = 30
const ROD_X = 50

/** Slider block, running in the slot on the lever nose. */
const SLIDER = { cx: ROD_X, cy: 55 }
/** Where the lever turns — the specimen. */
const PIVOT = { x: 30, y: 78 }

export default function MechanismMountFigure() {
  return (
    <Figure
      eyebrow="Actuator to mechanism · the slider-in-slot coupling"
      caption={
        <>
          The cylinder travels in a straight line and the float lever swings on an arc, so the
          rod ends in a slider captured between two guide pins, running in a slot bolted to the
          lever nose. It transmits force along the slot and nothing across it, which means the
          actuator never holds the linkage at a fixed position. The mechanism is free to
          complete its own snap on stored spring energy, and the specimen pin sees the same
          impact it would in service. Schematic, not to scale.
        </>
      }
    >
      <div className="relative w-full" style={{ aspectRatio: '100 / 96' }}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 96"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* ---- Pneumatic cylinder ---- */}
          <rect
            x={ROD_X - 7}
            y={4}
            width={14}
            height={20}
            rx="0.5"
            fill="none"
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Piston inside it */}
          <line
            x1={ROD_X - 7}
            y1={11}
            x2={ROD_X + 7}
            y2={11}
            className="stroke-brand-text"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Rod, down through the plate to the slider */}
          <line
            x1={ROD_X}
            y1={11}
            x2={ROD_X}
            y2={SLIDER.cy - 4}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* ---- Cover plate ---- */}
          <line
            x1={12}
            y1={PLATE_Y}
            x2={88}
            y2={PLATE_Y}
            className="stroke-brand-text"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bolts */}
          {[18, 30, 70, 82].map((x) => (
            <line
              key={x}
              x1={x}
              y1={PLATE_Y - 3}
              x2={x}
              y2={PLATE_Y + 3}
              className="stroke-brand-muted"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* ---- Float lever, pivoting at the specimen pin ---- */}
          {/* Lever nose carrying the slot */}
          <line
            x1={PIVOT.x}
            y1={PIVOT.y}
            x2={68}
            y2={50}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Float arm, the other side of the pivot */}
          <line
            x1={PIVOT.x}
            y1={PIVOT.y}
            x2={16}
            y2={66}
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={13}
            cy={64}
            r="5"
            fill="none"
            className="stroke-brand-text"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* ---- The slot: two hexagonal rods bolted to the lever nose ---- */}
          <g className="stroke-brand-accent" strokeWidth="2" vectorEffect="non-scaling-stroke">
            <line x1={38} y1={62} x2={72} y2={44} fill="none" />
            <line x1={34} y1={54} x2={68} y2={36} fill="none" />
          </g>

          {/* Slider block between the guide pins */}
          <rect
            x={SLIDER.cx - 4.5}
            y={SLIDER.cy - 4.5}
            width={9}
            height={9}
            rx="0.5"
            className="fill-brand-accent"
          />

          {/* ---- Specimen pin ---- */}
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
          <line
            x1={PIVOT.x - 4.5}
            y1={PIVOT.y}
            x2={12}
            y2={86}
            className="stroke-brand-accent"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* Leader from the slider out to its label */}
          <line
            x1={SLIDER.cx + 4.5}
            y1={SLIDER.cy}
            x2={80}
            y2={62}
            className="stroke-brand-accent"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute inset-0 font-mono text-[0.625rem] text-brand-muted">
          <span
            className="absolute -translate-x-1/2"
            style={{ left: '50%', top: '0%' }}
          >
            cylinder
          </span>
          <span className="absolute" style={{ left: '0%', top: '27%' }}>
            cover plate
          </span>
          <span
            className="absolute font-medium text-brand-accent"
            style={{ left: '81%', top: '61%' }}
          >
            slider in slot
          </span>
          <span className="absolute" style={{ left: '0%', top: '73%' }}>
            float
          </span>
          <span
            className="absolute font-medium text-brand-accent"
            style={{ left: '0%', top: '90%' }}
          >
            specimen pin
          </span>
        </div>
      </div>
    </Figure>
  )
}
