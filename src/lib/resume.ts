/**
 * Resume content, kept as data rather than markup so the page cannot drift
 * out of alignment as entries are added. Everything here is rendered by
 * `src/app/resume/page.tsx` — that component holds no content of its own.
 *
 * Deliberately contains no contact details. The site already has /contact,
 * and this page is public and permanent: no address, phone, or email here.
 */

export interface ResumeLink {
  label: string
  href: string
}

export interface ResumeSection {
  /** Doubles as the anchor target and the `id` on the rendered <section>. */
  id: string
  label: string
}

/**
 * The section rail and the section headings both read from this, so a
 * renamed section cannot leave a dead anchor behind. Module-level so its
 * identity is stable across renders — `ResumeNav` observes it in an effect.
 */
export const resumeSections: ResumeSection[] = [
  { id: 'work-experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership & Achievements' },
]

export interface ExperienceEntry {
  company: string
  role: string
  location: string
  /** `YYYY-MM`. Formatted for display by `formatPeriod` — never hand-written. */
  start: string
  /** `YYYY-MM`, or null for a role still held. */
  end: string | null
  bullets: string[]
  /** Slug of a project in /content/projects that covers this work in depth. */
  projectSlug?: string
}

export interface EducationEntry {
  institution: string
  degree: string
  location: string
  start: string
  end: string
  /** The thesis or capstone that defined the degree. */
  highlight?: {
    label: string
    title: string
    links?: ResumeLink[]
  }
  bullets: string[]
  projectSlug?: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface AchievementEntry {
  title: string
  organization?: string
  /** Free-form: these span single dates and multi-year ranges alike. */
  period: string
  description: string
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/**
 * `2024-07` → `Jul 2024`. Parsed by hand rather than through `new Date()`,
 * which reads `YYYY-MM` as UTC midnight and can roll back a month once the
 * local timezone is applied.
 */
function formatMonth(value: string): string {
  const [year, month] = value.split('-')
  const index = Number(month) - 1
  if (!year || Number.isNaN(index) || !MONTHS[index]) return value
  return `${MONTHS[index]} ${year}`
}

/** `Jul 2024 – Present`. A null end means the role is current. */
export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}

// Newest first. Ordering is fixed here so the page never has to sort.
export const experience: ExperienceEntry[] = [
  {
    company: 'Generac Clean Energy Solutions',
    role: 'Senior Mechanical Engineer',
    location: 'Reno, Nevada, USA',
    start: '2024-07',
    end: null,
    bullets: [
      'Designed and built a mass-manufacturing run-in test rack enabling automated simultaneous connection and testing of 50 microinverters, supporting production scale of 250K units and reducing daily testing time by up to 2 hours.',
      'Led mechanical design and DFT for manufacturing test setups (ICT, FCT, and EOL testers) for power electronics and BESS products, ensuring high reliability and repeatability in production environments.',
      'Simulated fault conditions in battery packs, including disconnected or degraded cells, and modeled imbalance behavior to evaluate system-level robustness.',
    ],
  },
  {
    company: 'Our Next Energy (ONE)',
    role: 'Research & Advanced Engineering Intern — Simulations Team',
    location: 'Novi, Michigan, USA',
    start: '2023-06',
    end: '2023-08',
    bullets: [
      'Conducted power and life performance simulations for customer RFPs, delivering detailed use-case reports that informed design decisions for EVs, electric marine vessels, heavy-duty trucks, and grid-scale storage systems.',
      'Automated RC model fitting and cell life testing data analysis using MATLAB, reducing manual effort by 60%.',
      'Evaluated and debugged an in-house battery simulation tool; authored tutorials and led training sessions across departments.',
    ],
  },
  {
    company: 'Hokie Electric Vehicle Team (EcoCAR EV Challenge)',
    role: 'Project Manager & Propulsion Modeling Team Member',
    location: 'Blacksburg, Virginia, USA',
    start: '2022-08',
    end: '2024-05',
    bullets: [
      "Oversaw project planning and execution for Cadillac Lyriq re-engineering under GM's vehicle development process; led a 65-member student team.",
      'Conducted powertrain architecture selection using risk-based trade-off analysis, performance modeling, and CAD packaging studies.',
      'Developed MATLAB/Simulink vehicle performance models for energy efficiency, acceleration, and range estimation.',
    ],
  },
  {
    company: 'Chemdist Membrane Systems Pvt. Ltd.',
    role: 'Senior Mechanical Engineer — R&D Department',
    location: 'Pune, Maharashtra, India',
    start: '2021-03',
    end: '2022-05',
    bullets: [
      'Led end-to-end development of Medical Oxygen Concentrators, from conceptual design to mass production and field deployment.',
      'Oversaw the production of 5000 units deployed across rural Indian hospitals, impacting over 50,000 patients.',
      'Designed test rigs to optimize PSA-based oxygen generation, achieving 20% energy savings and 40% cost reduction.',
    ],
    projectSlug: 'oxygen-concentrator',
  },
  {
    company: 'Exa Mobility India Pvt. Ltd.',
    role: 'Mechanical Design Engineer — EV R&D Department',
    location: 'Pune, Maharashtra, India',
    start: '2020-01',
    end: '2021-02',
    bullets: [
      'Built vehicle and battery system models in Simulink to support early-stage EV architecture and component selection, accelerating design cycles by 30%.',
      'Correlated prototype test data with simulation outputs to within 15% error, validating model accuracy and guiding iterative development.',
      'Engineered a battery pack enclosure with IP67-rated sealing and DFM/DFA-compliant design, achieving 15% weight reduction.',
    ],
  },
  {
    company: 'FEV India Pvt. Ltd.',
    role: 'Mechanical Design Engineer — Design and CAE Department',
    location: 'Pune, Maharashtra, India',
    start: '2018-12',
    end: '2019-12',
    bullets: [
      'Performed engine energy consumption analysis for a tractor application, calculating energy produced against energy consumed by auxiliary systems to estimate available power at the wheels under varying operating conditions.',
      'Developed design calculation tools for fuel injection mounts, timing drive, and engine bearing systems across diesel and gasoline platforms, reducing design time by 80%.',
      'Created 3D part models and manufacturing drawings using Creo; benchmarked three engine platforms and documented the full design process.',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    institution: 'Virginia Tech',
    degree: 'Master of Science in Mechanical Engineering',
    location: 'Blacksburg, Virginia, USA',
    start: '2022-08',
    end: '2024-05',
    highlight: {
      label: 'Thesis',
      title:
        'Development of a coupled electro-thermal model for lithium-ion batteries using MATLAB',
      links: [
        {
          label: 'Document',
          href: 'https://drive.google.com/file/d/1ymlijUH_i-jmLFYRVoW83A6hKZAWt2yO/view?usp=sharing',
        },
        {
          label: 'Presentation',
          href: 'https://drive.google.com/file/d/1fpS6gW_T4uAp7OfUDoIJMgbfvQDsElRe/view?usp=drive_link',
        },
      ],
    },
    bullets: [
      'Built a module-level simulation tool integrating a 2RC equivalent circuit model with a 3D transient thermal model in cylindrical coordinates.',
      'Modeled failure scenarios such as cell imbalance and electrical disconnects to evaluate fault propagation and robustness.',
    ],
  },
  {
    institution: 'Savitribai Phule Pune University',
    degree: 'Bachelor of Engineering in Mechanical Engineering',
    location: 'Pune, Maharashtra, India',
    start: '2014-08',
    end: '2018-05',
    highlight: {
      label: 'Capstone Project',
      title:
        'Development of a reliability test rig for condensate pump at Forbes Marshall Pvt. Ltd.',
    },
    bullets: [
      'Built a custom test rig to simulate three years of usage within a month, evaluating long-term durability for a mechanically operated condensate pump handling 110 kg of steam per cycle at 14 bar.',
      'Performed pre-homologation calculations and testing compliant with ASME BPVC Section VIII, Division 1, and ran finite element analysis of the actuator under high-temperature, high-pressure conditions.',
    ],
    projectSlug: 'condensate-pump-test-rig',
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'Software & Tools',
    items: ['MATLAB', 'Simulink', 'SolidWorks', 'Siemens NX', 'Creo', 'ANSYS CFD', 'PyBaMM'],
  },
  {
    label: 'Battery & Simulation',
    items: [
      'Equivalent Circuit Modeling',
      'Electro-Thermal Coupling',
      'Finite Difference Methods',
      'Battery Pack Fault Simulation',
      'Drive Cycle Implementation',
      'Model-in-the-Loop (MiL)',
    ],
  },
  {
    label: 'Design & Manufacturing',
    items: ['Product Development', 'DFM/DFA', 'GD&T', 'Design Validation', 'DFMEA'],
  },
  {
    label: 'Documentation',
    items: ['Technical Writing', 'Requirements Definition', 'Test Protocols', 'Project Planning'],
  },
]

export const achievements: AchievementEntry[] = [
  {
    title: 'EcoCAR EV Challenge',
    period: 'May 2023',
    description:
      '2nd place in Project Management Presentation and 3rd overall in the Year 1 competition among participating universities.',
  },
  {
    title: 'Employee of the Quarter',
    organization: 'Chemdist Membrane Systems',
    period: 'Aug 2021',
    description:
      'Recognized for rapid development and deployment of medical oxygen concentrators during the COVID-19 crisis.',
  },
  {
    title: 'Program Leader',
    organization: 'Jnana Prabodhini',
    period: '2014 – 2022',
    description:
      'Facilitated a STEM-focused collegiate student group for eight years, mentoring young learners through project-based learning and science outreach. Led over 10 science education workshops and coordinated 4 annual public exhibitions.',
  },
  {
    title: 'National Chess Player',
    period: '2008 – 2013',
    description:
      'Represented Maharashtra state at national-level tournaments; achieved a peak international ELO rating of 1634.',
  },
]
