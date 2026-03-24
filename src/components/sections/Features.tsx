import { CSSProperties } from 'react'
import { theme } from '../../styles/theme'
import { Container } from '../ui/Container'
import { Card } from '../ui/Card'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '♻️',
    title: 'Sustainable Computing',
    description: 'Give hardware a second life. Repurposed equipment reduces e-waste and often outperforms budget new hardware.',
  },
  {
    icon: '💰',
    title: 'Massive Cost Savings',
    description: '80-90% savings vs cloud. A $50 thrift store PC becomes a firewall that rivals $5,000 enterprise appliances.',
  },
  {
    icon: '🌱',
    title: 'Environmental Impact',
    description: 'One server reuse saves ~500kg CO2. Keep lead, mercury, and other toxins out of landfills.',
  },
  {
    icon: '🔓',
    title: '100% Open Source',
    description: 'No vendor lock-in, no license fees. OPNsense, Docker, Kubernetes - enterprise tools at zero cost.',
  },
  {
    icon: '📈',
    title: 'Skills That Transfer',
    description: 'Learn industry-standard tools. Your home lab becomes your resume. Real experience beats certifications.',
  },
  {
    icon: '🛡️',
    title: 'Enterprise Security',
    description: 'IDS/IPS, zero-trust VPN, encrypted DNS - the same security stack used by Fortune 500 companies.',
  },
]

export function Features() {
  const sectionStyle: CSSProperties = {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    background: theme.colors.surface,
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
  }

  const iconStyle: CSSProperties = {
    fontSize: '32px',
    marginBottom: theme.spacing.md,
  }

  const featureTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
  }

  const featureDescStyle: CSSProperties = {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
  }

  return (
    <section style={sectionStyle}>
      <Container size="xl">
        <div style={headerStyle}>
          <h2 style={titleStyle}>Why Transform Old Hardware?</h2>
          <p style={subtitleStyle}>
            Build enterprise infrastructure while reducing e-waste and saving thousands
          </p>
        </div>
        <div style={gridStyle}>
          {features.map((feature, index) => (
            <Card key={index} variant="bordered" padding="lg">
              <div style={iconStyle}>{feature.icon}</div>
              <h3 style={featureTitleStyle}>{feature.title}</h3>
              <p style={featureDescStyle}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
