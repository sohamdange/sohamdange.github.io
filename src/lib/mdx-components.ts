import CycleDynamicsFigure from '@/components/figures/CycleDynamicsFigure'
import ForceLawFigure from '@/components/figures/ForceLawFigure'
import MechanismMountFigure from '@/components/figures/MechanismMountFigure'
import PumpMechanismFigure from '@/components/figures/PumpMechanismFigure'
import RigLayoutFigure from '@/components/figures/RigLayoutFigure'
import SolverErrorFigure from '@/components/figures/SolverErrorFigure'
import SweepRangeFigure from '@/components/figures/SweepRangeFigure'
import TransientDecayFigure from '@/components/figures/TransientDecayFigure'

/**
 * Components an .mdx file may use by name.
 *
 * Keep this map small and additive: a figure belongs here only when it is
 * built from data the write-up actually reports. Anything one-off stays
 * prose — the point of the map is that content authors never import.
 */
export const mdxComponents = {
  CycleDynamicsFigure,
  ForceLawFigure,
  MechanismMountFigure,
  PumpMechanismFigure,
  RigLayoutFigure,
  SolverErrorFigure,
  SweepRangeFigure,
  TransientDecayFigure,
}
