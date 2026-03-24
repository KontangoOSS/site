import { CSSProperties } from 'react'
import { theme } from '../../styles/theme'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export function CTA() {
  const sectionStyle: CSSProperties = {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    background: `linear-gradient(135deg, rgba(74, 158, 255, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)`,
    position: 'relative',
    overflow: 'hidden',
  }

  const contentStyle: CSSProperties = {
    textAlign: 'center',
    position: 'relative',
  }

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const ctaContainerStyle: CSSProperties = {
    display: 'flex',
    gap: theme.spacing.md,
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  }

  const noteStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  }

  return (
    <section style={sectionStyle}>
      <Container>
        <div style={contentStyle}>
          <h2 style={titleStyle}>Ready to Transform Your Hardware?</h2>
          <p style={subtitleStyle}>
            Join the open source movement. Clone the repo, follow the guides,
            and turn old equipment into enterprise-grade infrastructure.
          </p>
          <div style={ctaContainerStyle}>
            <Button variant="primary" size="lg" href="https://github.com/KontangoOSS">
              View on GitHub
            </Button>
            <Button variant="outline" size="lg" href="/guide">
              Read the Guide
            </Button>
          </div>
          <p style={noteStyle}>
            100% open source. No vendor lock-in. Community-driven.
          </p>
        </div>
      </Container>
    </section>
  )
}
