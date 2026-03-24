import { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../../styles/theme'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { SocialIcons } from '../ui/SocialIcons'

export function Footer() {
  const footerStyle: CSSProperties = {
    background: theme.colors.surface,
    borderTop: `1px solid ${theme.colors.border}`,
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xl,
    position: 'relative',
    zIndex: 1,
  }

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing.xxl,
  }

  const columnStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  }

  const headingStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: theme.spacing.sm,
  }

  const linkStyle: CSSProperties = {
    color: theme.colors.textSecondary,
    textDecoration: 'none',
    fontSize: theme.fontSize.sm,
    transition: 'color 0.2s ease',
  }

  const bottomStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
    paddingTop: theme.spacing.lg,
    borderTop: `1px solid ${theme.colors.border}`,
  }

  const leftSectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  }

  const copyrightStyle: CSSProperties = {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
  }

  return (
    <footer style={footerStyle}>
      <Container size="xl">
        <div style={gridStyle}>
          <div style={columnStyle}>
            <h4 style={headingStyle}>Guides</h4>
            <Link to="/guide" style={linkStyle}>Self-Hosting Guide</Link>
            <Link to="/hardware" style={linkStyle}>Hardware Sourcing</Link>
            <Link to="/docs" style={linkStyle}>Documentation</Link>
          </div>

          <div style={columnStyle}>
            <h4 style={headingStyle}>Source Code</h4>
            <a href="https://github.com/KontangoOSS" style={linkStyle} target="_blank" rel="noopener noreferrer">github.com/KontangoOSS</a>
            <a href="https://github.com/KontangoOSS" style={linkStyle} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://github.com/KontangoOSS/docs" style={linkStyle} target="_blank" rel="noopener noreferrer">Documentation Repo</a>
          </div>

          <div style={columnStyle}>
            <h4 style={headingStyle}>Community</h4>
            <Link to="/about" style={linkStyle}>About</Link>
            <a href="https://github.com/KontangoOSS/docs/issues" style={linkStyle} target="_blank" rel="noopener noreferrer">Report Issues</a>
            <a href="https://github.com/KontangoOSS/docs/pulls" style={linkStyle} target="_blank" rel="noopener noreferrer">Contribute</a>
          </div>

          <div style={columnStyle}>
            <h4 style={headingStyle}>Contact</h4>
            <a href="mailto:hello@kontango.io" style={linkStyle}>hello@kontango.io</a>
            <Link to="/contact" style={linkStyle}>Get in Touch</Link>
          </div>
        </div>

        <div style={bottomStyle}>
          <div style={leftSectionStyle}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo size="sm" />
            </Link>
            <SocialIcons />
          </div>
          <div style={copyrightStyle}>
            &copy; {new Date().getFullYear()} Kontango. Open Source. Own Your Infrastructure.
          </div>
        </div>
      </Container>
    </footer>
  )
}
