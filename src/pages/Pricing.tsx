import { CSSProperties, useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { CTA } from '../components/sections/CTA'

interface DetailedTier {
  id: string
  name: string
  icon: string
  tagline: string
  audience: string[]
  monthlyRange: string
  setupTime: string
  initialCost: string
  features: { category: string; items: string[] }[]
  color: string
  popular?: boolean
}

const tiers: DetailedTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    icon: '🏠',
    tagline: 'Perfect for home users and hobbyists taking control of their digital life.',
    audience: [
      'Home users tired of cloud subscriptions',
      'Privacy-conscious individuals',
      'Hobbyists learning networking',
      'Remote workers needing secure home access',
    ],
    monthlyRange: '$10-50/mo',
    setupTime: '1-2 days',
    initialCost: '$225-1,250',
    features: [
      {
        category: 'Security',
        items: ['OPNsense firewall', 'WireGuard VPN', 'Encrypted DNS', 'Network-wide ad blocking'],
      },
      {
        category: 'Services',
        items: ['Nextcloud file storage', 'Jellyfin media server', 'Vaultwarden passwords', 'Personal websites'],
      },
      {
        category: 'Support',
        items: ['Community guides', 'Video tutorials', 'DIY documentation'],
      },
    ],
    color: theme.colors.basic,
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    icon: '🏢',
    tagline: 'Professional infrastructure for small businesses without enterprise complexity.',
    audience: [
      'Small businesses (5-50 employees)',
      'Startups reducing cloud costs',
      'Freelancers hosting client projects',
      'Professional services firms',
    ],
    monthlyRange: '$50-200/mo',
    setupTime: '3-5 days',
    initialCost: '$1,450-3,700',
    features: [
      {
        category: 'Security',
        items: ['IDS/IPS (Suricata)', 'CrowdSec threat intel', 'Zero-trust VPN (NetBird)', 'Edge proxy (Pangolin)'],
      },
      {
        category: 'Authentication',
        items: ['Authentik/Authelia SSO', 'Multi-factor auth', 'User management', 'RBAC permissions'],
      },
      {
        category: 'Monitoring',
        items: ['Prometheus metrics', 'Grafana dashboards', 'Alerting', 'Log aggregation'],
      },
    ],
    color: theme.colors.intermediate,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: '🏛️',
    tagline: 'Complete infrastructure sovereignty for organizations demanding control and compliance.',
    audience: [
      'Mid-size companies (50-500 employees)',
      'Regulated industries (healthcare, finance)',
      'Organizations requiring data sovereignty',
      'Companies with dedicated IT/DevOps teams',
    ],
    monthlyRange: '$200-2K/mo',
    setupTime: '1-2 weeks',
    initialCost: '$28,000-112,000',
    features: [
      {
        category: 'High Availability',
        items: ['Multi-site HA architecture', 'OPNsense HA cluster', 'Kubernetes orchestration', 'Database replication'],
      },
      {
        category: 'Enterprise Identity',
        items: ['Keycloak SSO', 'SAML/OIDC federation', 'SCIM provisioning', 'Hardware MFA'],
      },
      {
        category: 'Compliance',
        items: ['SOC 2 Type II ready', 'HIPAA configuration', 'GDPR compliance', 'ISO 27001 controls'],
      },
    ],
    color: theme.colors.enterprise,
  },
]

export function Pricing() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxl,
  }

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize['5xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: theme.fontSize.xl,
    color: theme.colors.textSecondary,
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const tierSectionStyle: CSSProperties = {
    paddingBottom: theme.spacing.xxxl,
  }

  const tierContainerStyle = (_tier: DetailedTier): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    borderBottom: `1px solid ${theme.colors.border}`,
  })

  const tierHeaderStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  const tierIconStyle: CSSProperties = {
    fontSize: '64px',
    marginBottom: theme.spacing.md,
  }

  const tierNameStyle = (color: string): CSSProperties => ({
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: color,
    marginBottom: theme.spacing.sm,
  })

  const taglineStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 1.6,
  }

  const priceBlockStyle: CSSProperties = {
    background: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border}`,
    marginBottom: theme.spacing.lg,
  }

  const priceStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  }

  const priceDetailStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  }

  const audienceListStyle: CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }

  const audienceItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  }

  const featuresGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
  }

  const featureCategoryStyle: CSSProperties = {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  }

  const featureListStyle: CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }

  const featureItemStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  }

  return (
    <>
      <Container size="xl">
        <div style={headerStyle}>
          <h1 style={titleStyle}>Simple, Scalable Pricing</h1>
          <p style={subtitleStyle}>
            Choose the tier that fits your needs today. Grow when you're ready.
            All tiers use 100% open source software - zero license fees.
          </p>
        </div>

        <div style={tierSectionStyle}>
          {tiers.map((tier) => (
            <div key={tier.id} id={tier.id} style={tierContainerStyle(tier)}>
              <div style={tierHeaderStyle}>
                <div style={tierIconStyle}>{tier.icon}</div>
                <h2 style={tierNameStyle(tier.color)}>{tier.name}</h2>
                <p style={taglineStyle}>{tier.tagline}</p>

                <div style={priceBlockStyle}>
                  <div style={priceStyle}>{tier.monthlyRange}</div>
                  <div style={priceDetailStyle}>
                    Initial: {tier.initialCost} | Setup: {tier.setupTime}
                  </div>
                </div>

                <h4 style={{ ...featureCategoryStyle, marginBottom: theme.spacing.md }}>
                  Best For:
                </h4>
                <ul style={audienceListStyle}>
                  {tier.audience.map((item, index) => (
                    <li key={index} style={audienceItemStyle}>
                      <span style={{ color: tier.color }}>→</span> {item}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? 'primary' : 'secondary'}
                  style={{ marginTop: theme.spacing.lg }}
                  href="/contact"
                >
                  Get Started with {tier.name}
                </Button>
              </div>

              <div style={featuresGridStyle}>
                {tier.features.map((category, catIndex) => (
                  <Card key={catIndex} variant="bordered" padding="md">
                    <h4 style={featureCategoryStyle}>{category.category}</h4>
                    <ul style={featureListStyle}>
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={featureItemStyle}>
                          <span style={{ color: theme.colors.success }}>✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
      <CTA />
    </>
  )
}
