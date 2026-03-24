import { CSSProperties, useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Hero } from '../components/sections/Hero'
import { TransformCycle } from '../components/sections/TransformCycle'
import { WhyUs } from '../components/sections/WhyUs'
import { CTA } from '../components/sections/CTA'
import { CircuitBackground } from '../components/ui/CircuitBackground'

interface PathInfo {
  id: string
  icon: string
  name: string
  audience: string
  description: string
  color: string
}

const paths: PathInfo[] = [
  {
    id: 'basic',
    icon: '🏠',
    name: 'Home Lab',
    audience: 'Hobbyists & Learners',
    description: 'Start with repurposed laptops and thrift store PCs. Perfect for learning and personal use.',
    color: theme.colors.basic,
  },
  {
    id: 'intermediate',
    icon: '🏢',
    name: 'Small Business',
    audience: 'Startups & Teams',
    description: 'Recycled enterprise workstations and managed switches. Production-ready for small teams.',
    color: theme.colors.intermediate,
  },
  {
    id: 'enterprise',
    icon: '🏛️',
    name: 'Organization',
    audience: 'Companies & Institutions',
    description: 'Decommissioned datacenter gear at 90% off. Full HA, Kubernetes, and compliance-ready.',
    color: theme.colors.enterprise,
  },
]

export function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sectionStyle: CSSProperties = {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
  }

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  }

  const subtitleStyle: CSSProperties = {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  }

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
  }

  const pathCardStyle = (color: string): CSSProperties => ({
    borderTop: `3px solid ${color}`,
  })

  const iconStyle: CSSProperties = {
    fontSize: '48px',
    marginBottom: theme.spacing.md,
  }

  const pathNameStyle = (color: string): CSSProperties => ({
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: color,
    marginBottom: theme.spacing.xs,
  })

  const audienceStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  }

  const descStyle: CSSProperties = {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
    marginBottom: theme.spacing.lg,
  }

  return (
    <>
      <CircuitBackground />
      <Hero />
      <TransformCycle />
      <WhyUs />
      <section style={sectionStyle}>
        <Container size="xl">
          <h2 style={titleStyle}>Choose Your Path</h2>
          <p style={subtitleStyle}>
            Start where you are. Scale when you're ready. Your skills and automation compound.
          </p>
          <div style={gridStyle}>
            {paths.map((path) => (
              <Card key={path.id} variant="bordered" padding="lg" style={pathCardStyle(path.color)}>
                <div style={iconStyle}>{path.icon}</div>
                <h3 style={pathNameStyle(path.color)}>{path.name}</h3>
                <div style={audienceStyle}>{path.audience}</div>
                <p style={descStyle}>{path.description}</p>
                <Button variant="secondary" fullWidth href="/guide">
                  View Guide
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  )
}
