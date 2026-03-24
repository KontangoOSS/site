import { CSSProperties, useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

interface DocSection {
  icon: string
  title: string
  description: string
  links: { label: string; href: string }[]
  color: string
}

const docSections: DocSection[] = [
  {
    icon: '🏠',
    title: 'Basic Self-Hosting',
    description: 'Perfect for home users and hobbyists starting their self-hosting journey.',
    links: [
      { label: 'Hardware Guide', href: '#' },
      { label: 'Planning Checklist', href: '#' },
      { label: 'Installation Guide', href: '#' },
      { label: 'Services Setup', href: '#' },
    ],
    color: theme.colors.basic,
  },
  {
    icon: '🏢',
    title: 'Intermediate Guide',
    description: 'Professional infrastructure for small businesses and startups.',
    links: [
      { label: 'Requirements', href: '#' },
      { label: 'Architecture', href: '#' },
      { label: 'Authentication', href: '#' },
      { label: 'Monitoring', href: '#' },
    ],
    color: theme.colors.intermediate,
  },
  {
    icon: '🏛️',
    title: 'Enterprise Deployment',
    description: 'Complete infrastructure sovereignty for organizations.',
    links: [
      { label: 'HA Architecture', href: '#' },
      { label: 'Kubernetes Setup', href: '#' },
      { label: 'Identity Management', href: '#' },
      { label: 'Compliance', href: '#' },
    ],
    color: theme.colors.enterprise,
  },
]

const guides = [
  {
    icon: '📖',
    title: 'Self-Hosting Guide',
    description: 'A complete framework for migrating from cloud to self-hosted infrastructure.',
    chapters: [
      'Introduction & Cost Analysis',
      'Prerequisites & Planning',
      'Network Foundation',
      'Security Hardening',
      'Reverse Proxy & Tunnels',
      'SSL Certificates',
      'Three-Tier Architecture',
      'Zero-Trust Access',
      'Identity Management',
      'Monitoring & Observability',
    ],
  },
]

export function Docs() {
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

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xxxl,
  }

  const iconStyle: CSSProperties = {
    fontSize: '48px',
    marginBottom: theme.spacing.md,
  }

  const sectionTitleStyle = (color: string): CSSProperties => ({
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: color,
    marginBottom: theme.spacing.sm,
  })

  const descriptionStyle: CSSProperties = {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 1.6,
  }

  const linkListStyle: CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }

  const linkItemStyle: CSSProperties = {
    marginBottom: theme.spacing.sm,
  }

  const linkStyle: CSSProperties = {
    color: theme.colors.primary,
    textDecoration: 'none',
    fontSize: theme.fontSize.base,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  }

  const guidesSectionStyle: CSSProperties = {
    paddingBottom: theme.spacing.xxxl,
  }

  const guideTitleStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  }

  const guideCardStyle: CSSProperties = {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const chaptersGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  }

  const chapterItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    background: 'rgba(74, 158, 255, 0.05)',
  }

  const chapterNumberStyle: CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: theme.colors.primary,
    color: theme.colors.textPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    flexShrink: 0,
  }

  return (
    <Container size="xl">
      <div style={headerStyle}>
        <h1 style={titleStyle}>Documentation</h1>
        <p style={subtitleStyle}>
          Everything you need to build enterprise-grade self-hosted infrastructure.
          From home labs to multi-site deployments.
        </p>
      </div>

      <div style={gridStyle}>
        {docSections.map((section) => (
          <Card key={section.title} variant="bordered" padding="lg">
            <div style={iconStyle}>{section.icon}</div>
            <h2 style={sectionTitleStyle(section.color)}>{section.title}</h2>
            <p style={descriptionStyle}>{section.description}</p>
            <ul style={linkListStyle}>
              {section.links.map((link) => (
                <li key={link.label} style={linkItemStyle}>
                  <a href={link.href} style={linkStyle}>
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div style={guidesSectionStyle}>
        <h2 style={guideTitleStyle}>Complete Self-Hosting Guide</h2>
        {guides.map((guide) => (
          <Card key={guide.title} variant="elevated" padding="lg" style={guideCardStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: theme.spacing.lg }}>
              <div style={{ fontSize: '64px' }}>{guide.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: theme.fontSize['2xl'], fontWeight: theme.fontWeight.bold, marginBottom: theme.spacing.sm }}>
                  {guide.title}
                </h3>
                <p style={descriptionStyle}>{guide.description}</p>
                <div style={chaptersGridStyle}>
                  {guide.chapters.map((chapter, index) => (
                    <div key={chapter} style={chapterItemStyle}>
                      <span style={chapterNumberStyle}>{String(index + 1).padStart(2, '0')}</span>
                      {chapter}
                    </div>
                  ))}
                </div>
                <Button variant="primary" style={{ marginTop: theme.spacing.lg }}>
                  Start Reading
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  )
}
