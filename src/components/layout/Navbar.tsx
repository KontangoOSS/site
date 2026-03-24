import { CSSProperties, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { theme } from '../../styles/theme'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(10, 10, 15, 0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${theme.colors.border}`,
  }

  const innerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  }

  const linksStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? theme.spacing.sm : theme.spacing.xl,
    flexWrap: isMobile ? 'nowrap' : 'wrap',
    overflow: isMobile ? 'hidden' : 'visible',
  }

  const linkStyle = (path: string): CSSProperties => ({
    color: location.pathname === path || (path === '/guide' && location.pathname.startsWith('/guide'))
      ? theme.colors.primary
      : theme.colors.textSecondary,
    textDecoration: 'none',
    fontSize: isMobile ? theme.fontSize.sm : theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    transition: 'color 0.2s ease',
    whiteSpace: 'nowrap',
  })

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/guide', label: 'Guide' },
    { path: '/hardware', label: 'Hardware' },
    { path: '/about', label: 'About' },
  ]

  const socialLinks = [
    { href: 'https://github.com/KontangoOSS', icon: '⚡', label: 'GitHub' },
    { href: 'https://github.com/KontangoOSS', icon: '🔧', label: 'Forgejo' },
  ]

  const socialIconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'rgba(74, 158, 255, 0.1)',
    color: theme.colors.textSecondary,
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'all 0.2s ease',
    border: `1px solid transparent`,
  }

  return (
    <nav style={navStyle}>
      <Container size="xl">
        <div style={innerStyle}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size="md" />
          </Link>

          <div style={linksStyle}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} style={linkStyle(link.path)}>
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={socialIconStyle}
                  title={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(74, 158, 255, 0.2)'
                    e.currentTarget.style.borderColor = theme.colors.primary
                    e.currentTarget.style.color = theme.colors.primary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(74, 158, 255, 0.1)'
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.color = theme.colors.textSecondary
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
}
