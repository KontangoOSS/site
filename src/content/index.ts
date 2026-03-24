// Content index - maps article slugs to metadata
// Content is loaded from the KontangoOSS/docs repo

export interface Article {
  slug: string
  number: string
  title: string
  description: string
  category: 'guide' | 'basic' | 'intermediate' | 'enterprise'
  timeEstimate?: string
}

export const guideArticles: Article[] = [
  {
    slug: '01-introduction',
    number: '01',
    title: 'Introduction & Cost Analysis',
    description: 'Understand the cloud cost problem and see real-world success stories from 37signals, Dropbox, and GitLab.',
    category: 'guide',
    timeEstimate: '30 min',
  },
  {
    slug: '02-prerequisites',
    number: '02',
    title: 'Prerequisites & Planning',
    description: 'Assess your needs, plan your infrastructure, and understand the requirements.',
    category: 'guide',
    timeEstimate: '1-2 hours',
  },
  {
    slug: '03-network-foundation',
    number: '03',
    title: 'Network Foundation',
    description: 'Build the network layer with VLANs, segmentation, and proper architecture.',
    category: 'guide',
    timeEstimate: '2-4 hours',
  },
  {
    slug: '04-security-hardening',
    number: '04',
    title: 'Security Hardening',
    description: 'Harden your systems with enterprise security practices and defense-in-depth.',
    category: 'guide',
    timeEstimate: '2-3 hours',
  },
  {
    slug: '05-reverse-proxy',
    number: '05',
    title: 'Reverse Proxy & Tunnels',
    description: 'Set up secure public access with Caddy without exposing your IP.',
    category: 'guide',
    timeEstimate: '2-3 hours',
  },
  {
    slug: '06-ssl-certificates',
    number: '06',
    title: 'SSL Certificates',
    description: 'Automated HTTPS with Let\'s Encrypt and Caddy configuration.',
    category: 'guide',
    timeEstimate: '1-2 hours',
  },
  {
    slug: '07-tier-architecture',
    number: '07',
    title: 'Three-Tier Architecture',
    description: 'Organize services into public, protected, and internal tiers.',
    category: 'guide',
    timeEstimate: '1 hour',
  },
  {
    slug: '08-zero-trust-access',
    number: '08',
    title: 'Zero-Trust Network Access',
    description: 'Implement zero-trust with NetBird mesh VPN for secure access.',
    category: 'guide',
    timeEstimate: '2-3 hours',
  },
  {
    slug: '09-identity-management',
    number: '09',
    title: 'Identity & Access Management',
    description: 'Single sign-on and centralized authentication with Keycloak.',
    category: 'guide',
    timeEstimate: '3-4 hours',
  },
  {
    slug: '10-monitoring',
    number: '10',
    title: 'Monitoring & Observability',
    description: 'Prometheus, Grafana, and alerting for full visibility.',
    category: 'guide',
    timeEstimate: '2-3 hours',
  },
  {
    slug: '11-maintenance',
    number: '11',
    title: 'Maintenance & Operations',
    description: 'Backups, updates, and day-2 operations best practices.',
    category: 'guide',
    timeEstimate: '1 hour',
  },
]

export const basicArticles: Article[] = [
  {
    slug: 'basic-01-hardware',
    number: '01',
    title: 'Hardware Guide',
    description: 'Choosing and setting up hardware for your home lab.',
    category: 'basic',
  },
  {
    slug: 'basic-02-planning',
    number: '02',
    title: 'Planning Checklist',
    description: 'What you need to consider before starting.',
    category: 'basic',
  },
  {
    slug: 'basic-03-installation',
    number: '03',
    title: 'Installation Guide',
    description: 'Step-by-step installation instructions.',
    category: 'basic',
  },
  {
    slug: 'basic-04-services',
    number: '04',
    title: 'Services Setup',
    description: 'Setting up essential services for your home lab.',
    category: 'basic',
  },
]

export const intermediateArticles: Article[] = [
  {
    slug: 'intermediate-01-requirements',
    number: '01',
    title: 'Requirements',
    description: 'What you need for a small business setup.',
    category: 'intermediate',
  },
  {
    slug: 'intermediate-02-architecture',
    number: '02',
    title: 'Architecture',
    description: 'Designing your intermediate infrastructure.',
    category: 'intermediate',
  },
  {
    slug: 'intermediate-03-installation',
    number: '03',
    title: 'Installation',
    description: 'Setting up your business infrastructure.',
    category: 'intermediate',
  },
  {
    slug: 'intermediate-04-authentication',
    number: '04',
    title: 'Authentication',
    description: 'User authentication and access control.',
    category: 'intermediate',
  },
  {
    slug: 'intermediate-05-monitoring',
    number: '05',
    title: 'Monitoring',
    description: 'Monitoring and alerting for your infrastructure.',
    category: 'intermediate',
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return [...guideArticles, ...basicArticles, ...intermediateArticles].find(
    (article) => article.slug === slug
  )
}

export function getArticlesByCategory(category: Article['category']): Article[] {
  switch (category) {
    case 'guide':
      return guideArticles
    case 'basic':
      return basicArticles
    case 'intermediate':
      return intermediateArticles
    default:
      return []
  }
}
