// Concepts metadata — maps slugs to titles, descriptions, and profile fit.
// Markdown content is fetched from KontangoOSS/docs/concepts/<slug><variant-suffix>.md
//
// Three tiers per concept:
//   short  → <slug>-short.md  — ~150 words, plain language
//   medium → <slug>.md         — the standard read
//   long   → <slug>-long.md    — operator/architecture detail

export type ConceptVariant = 'short' | 'medium' | 'long'
export type ConceptProfile = 'newcomer' | 'business' | 'operator'

export interface Concept {
  slug: string
  number: string
  title: string
  description: string
  /** Audiences this concept is most useful for. */
  profiles: ConceptProfile[]
  /** Reading time for the medium version. */
  timeEstimate: string
}

export const concepts: Concept[] = [
  {
    slug: 'what-is-kontango',
    number: '01',
    title: 'What is Kontango?',
    description: 'One paragraph, two paragraphs, and three real things you can do with it.',
    profiles: ['newcomer', 'business', 'operator'],
    timeEstimate: '4 min',
  },
  {
    slug: 'the-network',
    number: '02',
    title: 'The Network',
    description: 'What "the Kontango network" means — and what it isn\'t. Hardware freedom is the point.',
    profiles: ['newcomer', 'operator'],
    timeEstimate: '5 min',
  },
  {
    slug: 'enrollment',
    number: '03',
    title: 'Enrolling a Device',
    description: 'What happens when you add a laptop. What gets sent, what stays put, and why the wait.',
    profiles: ['newcomer', 'operator'],
    timeEstimate: '5 min',
  },
  {
    slug: 'identities',
    number: '04',
    title: 'Identities',
    description: 'What "identity" means for a device, a server, or a service that talks to other services.',
    profiles: ['operator'],
    timeEstimate: '4 min',
  },
  {
    slug: 'services',
    number: '05',
    title: 'Services',
    description: 'What you actually connect to on the network — git, secrets, dashboards, all on your hardware.',
    profiles: ['newcomer', 'business', 'operator'],
    timeEstimate: '4 min',
  },
  {
    slug: 'policy',
    number: '06',
    title: 'Policy',
    description: 'Who is allowed to talk to what. The rules that gate every connection on the network.',
    profiles: ['operator'],
    timeEstimate: '5 min',
  },
  {
    slug: 'when-things-break',
    number: '07',
    title: 'When Things Break',
    description: 'Symptoms you might see, what each one means, and what to try before asking for help.',
    profiles: ['newcomer', 'operator'],
    timeEstimate: '5 min',
  },
  {
    slug: 'getting-help',
    number: '08',
    title: 'Getting Help',
    description: 'Email, Discord, paid support. Open source with help available.',
    profiles: ['newcomer', 'business', 'operator'],
    timeEstimate: '3 min',
  },
]

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find(c => c.slug === slug)
}

export const profileLabels: Record<ConceptProfile, { name: string; tagline: string; defaultVariant: ConceptVariant; tierColor: string }> = {
  newcomer: {
    name: 'New here',
    tagline: "Plain language. Show me the short version.",
    defaultVariant: 'short',
    tierColor: '#51cf66', // theme.colors.basic
  },
  business: {
    name: 'Decision maker',
    tagline: 'I want to understand what this is and what it costs.',
    defaultVariant: 'medium',
    tierColor: '#ffd43b', // theme.colors.intermediate
  },
  operator: {
    name: 'Running it',
    tagline: 'I operate the platform. Give me the full text.',
    defaultVariant: 'long',
    tierColor: '#4a9eff', // theme.colors.enterprise
  },
}

export const variantLabels: Record<ConceptVariant, { label: string; estimate: (base: string) => string }> = {
  short:  { label: 'Quick',   estimate: () => '~1 min' },
  medium: { label: 'Standard', estimate: base => base },
  long:   { label: 'Deep',    estimate: base => `~${parseInt(base) * 2} min` },
}

/** Returns the markdown URL path suffix for a given variant. */
export function fileSuffix(variant: ConceptVariant): string {
  if (variant === 'short') return '-short'
  if (variant === 'long') return '-long'
  return ''
}
