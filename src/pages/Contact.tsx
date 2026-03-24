import { CSSProperties, useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function Contact() {
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
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xxxl,
  }

  const contactCardStyle: CSSProperties = {
    textAlign: 'center',
  }

  const iconStyle: CSSProperties = {
    fontSize: '48px',
    marginBottom: theme.spacing.md,
  }

  const tierNameStyle: CSSProperties = {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  }

  const emailStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    color: theme.colors.primary,
    textDecoration: 'none',
    marginBottom: theme.spacing.sm,
    display: 'block',
  }

  const responseTimeStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  }

  const formSectionStyle: CSSProperties = {
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: theme.spacing.xxxl,
  }

  const formTitleStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  }

  const inputGroupStyle: CSSProperties = {
    marginBottom: theme.spacing.lg,
  }

  const labelStyle: CSSProperties = {
    display: 'block',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  }

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: theme.spacing.md,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.base,
    outline: 'none',
    boxSizing: 'border-box',
  }

  const textareaStyle: CSSProperties = {
    ...inputStyle,
    minHeight: '150px',
    resize: 'vertical',
  }

  const tierOptions = [
    { icon: '🏠', name: 'Basic', email: 'support@kontango.io', response: 'Community support' },
    { icon: '🏢', name: 'Intermediate', email: 'sales@kontango.io', response: '1 business day' },
    { icon: '🏛️', name: 'Enterprise', email: 'enterprise@kontango.io', response: 'Same day' },
  ]

  return (
    <Container size="xl">
      <div style={headerStyle}>
        <h1 style={titleStyle}>Get in Touch</h1>
        <p style={subtitleStyle}>
          Questions about self-hosting? Ready to get started?
          We're here to help you on your infrastructure journey.
        </p>
      </div>

      <div style={gridStyle}>
        {tierOptions.map((tier) => (
          <Card key={tier.name} variant="bordered" padding="lg">
            <div style={contactCardStyle}>
              <div style={iconStyle}>{tier.icon}</div>
              <div style={tierNameStyle}>{tier.name}</div>
              <a href={`mailto:${tier.email}`} style={emailStyle}>
                {tier.email}
              </a>
              <div style={responseTimeStyle}>{tier.response}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card variant="elevated" padding="lg" style={formSectionStyle}>
        <h2 style={formTitleStyle}>Send Us a Message</h2>
        <form
          action="#"
          method="POST"
        >
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: theme.spacing.lg }}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Name</label>
              <input type="text" name="name" required style={inputStyle} placeholder="Your name" />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input type="email" name="email" required style={inputStyle} placeholder="your@email.com" />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Organization (Optional)</label>
            <input type="text" name="organization" style={inputStyle} placeholder="Company name" />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Interested In</label>
            <select name="tier" style={inputStyle}>
              <option value="">Select a tier...</option>
              <option value="basic">Basic (Home/Hobbyist)</option>
              <option value="intermediate">Intermediate (Small Business)</option>
              <option value="enterprise">Enterprise (Organization)</option>
              <option value="other">Not sure / Other</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Message</label>
            <textarea
              name="message"
              required
              style={textareaStyle}
              placeholder="Tell us about your infrastructure needs..."
            />
          </div>

          <Button variant="primary" size="lg" fullWidth>
            Send Message
          </Button>
        </form>
      </Card>
    </Container>
  )
}
