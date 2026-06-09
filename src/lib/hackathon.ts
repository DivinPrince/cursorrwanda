export type SponsorshipTier = 'platinum' | 'gold' | 'silver' | 'custom'

export type EventHighlight = {
  tag: string
  title: string
  description: string
}

export type SponsorshipPackage = {
  id: SponsorshipTier
  name: string
  subtitle: string
  summary: string
  contributions: string[]
  benefits: string[]
}

export const eventHighlights: EventHighlight[] = [
  {
    tag: 'Build',
    title: 'Ship with Cursor',
    description:
      'A full day of building with AI-assisted workflows — from idea to working prototype.',
  },
  {
    tag: 'Learn',
    title: 'Workshops & mentorship',
    description:
      'Hands-on sessions, technical support, and guidance from experienced builders.',
  },
  {
    tag: 'Connect',
    title: 'Community & talent',
    description:
      'Developers, founders, and students from across Rwanda’s tech ecosystem.',
  },
  {
    tag: 'Compete',
    title: 'Challenges & prizes',
    description:
      'Sponsor-led challenges, judging, and recognition for standout projects.',
  },
]

export const supportAreas = [
  'Financial sponsorship',
  'Venue & logistics',
  'Connectivity',
  'Prizes & swag',
  'Cloud & AI credits',
  'Catering',
  'Media & promotion',
  'Mentorship & judging',
]

export const partnerBenefits = [
  'Reach emerging talent',
  'Support Rwanda’s tech workforce',
  'Strengthen your brand',
  'Drive innovation locally',
  'Connect with founders & students',
  'Show commitment to digital transformation',
]

export const sponsorshipPackages: SponsorshipPackage[] = [
  {
    id: 'platinum',
    name: 'Platinum',
    subtitle: 'Strategic Partner',
    summary: 'Highest visibility, engagement, and recognition across the event.',
    contributions: [
      'Major financial sponsorship',
      'Venue or connectivity sponsorship',
      'Prize pool or cloud & AI credits',
      'Catering, equipment, or combined packages',
    ],
    benefits: [
      'Premier logo placement on all materials',
      'Opening keynote & speaking slot',
      'Exhibition and recruitment booth',
      'Judging participation & talent access',
      'Featured media and priority social campaigns',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    subtitle: 'Innovation Partner',
    summary: 'Enable innovation, learning, and community engagement.',
    contributions: [
      'Financial or workshop sponsorship',
      'Meals, merchandise, or technical resources',
      'Mentorship or partial prize sponsorship',
    ],
    benefits: [
      'Logo placement across event materials',
      'Exhibition booth & workshop session',
      'Sponsor challenge participation',
      'Recognition in ceremonies and communications',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    subtitle: 'Community Partner',
    summary: 'Support the event and Rwanda’s innovation ecosystem.',
    contributions: [
      'Financial sponsorship or swag',
      'Transportation, media, or volunteer support',
      'Judges, mentors, or technical reviewers',
    ],
    benefits: [
      'Logo on event materials',
      'Community channel recognition',
      'Social media acknowledgement',
      'Networking with participants and partners',
    ],
  },
]

export const contributionTypes = [
  'Financial sponsorship',
  'In-kind support',
  'Technical resources',
  'Logistics and venue',
  'Prizes and swag',
  'Media and promotion',
  'Mentorship or judging',
  'Combined package',
] as const

export type ContributionType = (typeof contributionTypes)[number]
