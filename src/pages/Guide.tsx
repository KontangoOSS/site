import { CSSProperties, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { guideArticles } from '../content'

interface PathInfo {
  id: string
  icon: string
  name: string
  audience: string
  description: string
  hardware: string[]
  color: string
}

const paths: PathInfo[] = [
  {
    id: 'basic',
    icon: '🏠',
    name: 'Home Lab',
    audience: 'Hobbyists & Learners',
    description: 'Start with repurposed laptops and thrift store PCs. Perfect for learning and personal use.',
    hardware: ['Old laptop as server ($30-75)', 'SFF PC as firewall ($40-100)', 'USB drives for storage'],
    color: theme.colors.basic,
  },
  {
    id: 'intermediate',
    icon: '🏢',
    name: 'Small Business',
    audience: 'Startups & Teams',
    description: 'Recycled enterprise workstations and managed switches. Production-ready for small teams.',
    hardware: ['Refurb workstation ($150-300)', 'Managed switch ($50-100)', 'NAS or DIY storage'],
    color: theme.colors.intermediate,
  },
  {
    id: 'enterprise',
    icon: '🏛️',
    name: 'Organization',
    audience: 'Companies & Institutions',
    description: 'Decommissioned datacenter gear at 90% off. Full HA, Kubernetes, and compliance-ready.',
    hardware: ['Surplus servers ($500-1500 ea)', 'Enterprise switching', '10GbE networking'],
    color: theme.colors.enterprise,
  },
]

export function Guide() {
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

  const sectionTitleStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  }

  const pathsGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xxxl,
  }

  const pathCardStyle = (color: string): CSSProperties => ({
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderTop: `3px solid ${color}`,
  })

  const pathIconStyle: CSSProperties = {
    fontSize: '48px',
    marginBottom: theme.spacing.md,
  }

  const pathNameStyle = (color: string): CSSProperties => ({
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: color,
    marginBottom: theme.spacing.xs,
  })

  const pathAudienceStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  }

  const pathDescStyle: CSSProperties = {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 1.6,
  }

  const hardwareListStyle: CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }

  const hardwareItemStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  }

  const chaptersGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxxl,
  }

  const chapterCardStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    transition: 'border-color 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',
  }

  const chapterNumberStyle: CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: theme.borderRadius.md,
    background: `linear-gradient(135deg, ${theme.colors.basic} 0%, ${theme.colors.primary} 100%)`,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.sm,
    flexShrink: 0,
  }

  const chapterTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  }

  const chapterDescStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  }

  const chapterTimeStyle: CSSProperties = {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  }

  const ctaStyle: CSSProperties = {
    textAlign: 'center',
    padding: theme.spacing.xxl,
    background: `linear-gradient(135deg, rgba(81, 207, 102, 0.1) 0%, rgba(74, 158, 255, 0.1) 100%)`,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xxxl,
  }

  return (
    <Container size="xl">
      <div style={headerStyle}>
        <h1 style={titleStyle}>Self-Hosting Guide</h1>
        <p style={subtitleStyle}>
          A complete framework for building enterprise-grade infrastructure from
          repurposed hardware. Free, open source, and battle-tested.
        </p>
      </div>

      <h2 style={sectionTitleStyle}>Choose Your Path</h2>
      <div style={pathsGridStyle}>
        {paths.map((path) => (
          <div key={path.id} style={pathCardStyle(path.color)}>
            <div style={pathIconStyle}>{path.icon}</div>
            <h3 style={pathNameStyle(path.color)}>{path.name}</h3>
            <div style={pathAudienceStyle}>{path.audience}</div>
            <p style={pathDescStyle}>{path.description}</p>
            <ul style={hardwareListStyle}>
              {path.hardware.map((item, index) => (
                <li key={index} style={hardwareItemStyle}>
                  <span style={{ color: path.color }}>→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 style={sectionTitleStyle}>The Complete Guide</h2>
      <p style={{ textAlign: 'center', color: theme.colors.textSecondary, marginBottom: theme.spacing.xl }}>
        11 chapters covering everything from cost analysis to day-2 operations
      </p>
      <div style={chaptersGridStyle}>
        {guideArticles.map((article) => (
          <Link key={article.slug} to={`/guide/${article.slug}`} style={chapterCardStyle}>
            <div style={chapterNumberStyle}>{article.number}</div>
            <div>
              <div style={chapterTitleStyle}>{article.title}</div>
              <div style={chapterDescStyle}>{article.description}</div>
              <div style={chapterTimeStyle}>{article.timeEstimate}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={ctaStyle}>
        <h2 style={{ ...sectionTitleStyle, marginBottom: theme.spacing.md }}>
          Ready to Get Started?
        </h2>
        <p style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.lg, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Clone the repo, follow the guide, and join the community.
          All documentation is open source and community-maintained.
        </p>
        <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center' }}>
          <Button variant="primary" size="lg" href="https://github.com/KontangoOSS/KontangoOSS/docs">
            Clone from github.com/KontangoOSS
          </Button>
          <Button variant="outline" size="lg" href="https://github.com/KontangoOSS">
            View on GitHub
          </Button>
        </div>
      </div>
    </Container>
  )
}
