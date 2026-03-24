import { CSSProperties } from 'react'
import { theme } from '../../styles/theme'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

interface PricingTier {
  name: string
  icon: string
  audience: string
  monthlyRange: string
  features: string[]
  color: string
  popular?: boolean
}

const tiers: PricingTier[] = [
  {
    name: 'Basic',
    icon: '🏠',
    audience: 'Home users, hobbyists, home labs',
    monthlyRange: '$10-50/mo',
    features: [
      'Enterprise-grade firewall',
      'VPN access from anywhere',
      'Personal website hosting',
      'Your own cloud storage',
      'Media server streaming',
      'Network-wide ad blocking',
    ],
    color: theme.colors.basic,
  },
  {
    name: 'Intermediate',
    icon: '🏢',
    audience: 'Small businesses, startups, freelancers',
    monthlyRange: '$50-200/mo',
    features: [
      'Everything in Basic, plus:',
      'Public website hosting',
      'Hidden origin IP (edge proxy)',
      'Zero-trust VPN (NetBird)',
      'User authentication',
      'IDS/IPS protection',
      'Prometheus monitoring',
    ],
    color: theme.colors.intermediate,
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: '🏛️',
    audience: 'Mid-size to large organizations',
    monthlyRange: '$200-2K/mo',
    features: [
      'Everything in Intermediate, plus:',
      'Multi-site HA architecture',
      'Keycloak SSO (SAML/OIDC)',
      'Kubernetes orchestration',
      'Compliance ready (SOC2/HIPAA)',
      'GitOps workflows',
      'Dedicated support',
    ],
    color: theme.colors.enterprise,
  },
]

export interface PricingCardsProps {
  showTitle?: boolean
}

export function PricingCards({ showTitle = true }: PricingCardsProps) {
  const sectionStyle: CSSProperties = {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
  }

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  }

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
  }

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
    alignItems: 'stretch',
  }

  const tierCardStyle = (tier: PricingTier): CSSProperties => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    background: tier.popular ? 'rgba(74, 158, 255, 0.05)' : theme.colors.surface,
    border: tier.popular ? `2px solid ${theme.colors.primary}` : `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  })

  const popularBadgeStyle: CSSProperties = {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.colors.primary,
    color: theme.colors.textPrimary,
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }

  const iconStyle: CSSProperties = {
    fontSize: '48px',
    marginBottom: theme.spacing.md,
  }

  const tierNameStyle = (color: string): CSSProperties => ({
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: color,
    marginBottom: theme.spacing.xs,
  })

  const audienceStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  }

  const priceStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.lg,
  }

  const featuresStyle: CSSProperties = {
    flex: 1,
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing.lg,
  }

  const featureItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  }

  const checkStyle: CSSProperties = {
    color: theme.colors.success,
    flexShrink: 0,
  }

  return (
    <section style={sectionStyle}>
      <Container size="xl">
        {showTitle && (
          <div style={headerStyle}>
            <h2 style={titleStyle}>Choose Your Path</h2>
            <p style={subtitleStyle}>
              Start where you are. Grow when you're ready. Your automation investments compound.
            </p>
          </div>
        )}
        <div style={gridStyle}>
          {tiers.map((tier) => (
            <div key={tier.name} style={tierCardStyle(tier)}>
              {tier.popular && <span style={popularBadgeStyle}>Most Popular</span>}
              <div style={iconStyle}>{tier.icon}</div>
              <h3 style={tierNameStyle(tier.color)}>{tier.name}</h3>
              <p style={audienceStyle}>{tier.audience}</p>
              <div style={priceStyle}>{tier.monthlyRange}</div>
              <ul style={featuresStyle}>
                {tier.features.map((feature, index) => (
                  <li key={index} style={featureItemStyle}>
                    <span style={checkStyle}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.popular ? 'primary' : 'secondary'}
                fullWidth
                href={`/pricing#${tier.name.toLowerCase()}`}
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
