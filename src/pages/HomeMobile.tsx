import { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { ConveyorAnimationMobile } from '../components/sections/ConveyorAnimationMobile'

export function HomeMobile() {
  const heroStyle: CSSProperties = {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    textAlign: 'center',
  }

  const logoStyle: CSSProperties = {
    fontSize: '48px',
    marginBottom: theme.spacing.sm,
  }

  const h1Style: CSSProperties = {
    fontSize: '32px',
    fontWeight: theme.fontWeight.bold,
    lineHeight: 1.2,
    marginBottom: theme.spacing.md,
    background: `linear-gradient(135deg, ${theme.colors.basic} 0%, ${theme.colors.primary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  const taglineStyle: CSSProperties = {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 1.5,
    marginBottom: theme.spacing.lg,
    padding: `0 ${theme.spacing.md}`,
  }

  const animationWrapperStyle: CSSProperties = {
    marginBottom: theme.spacing.lg,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  }

  const pathsContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  }

  const pathCardStyle: CSSProperties = {
    padding: theme.spacing.lg,
    background: 'rgba(20, 20, 25, 0.6)',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    textDecoration: 'none',
    display: 'block',
    transition: 'all 0.3s ease',
  }

  const pathIconStyle: CSSProperties = {
    fontSize: '40px',
    marginBottom: theme.spacing.sm,
  }

  const pathTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.xs,
    background: `linear-gradient(135deg, ${theme.colors.basic} 0%, ${theme.colors.primary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  const pathDescStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
    marginBottom: theme.spacing.sm,
  }

  const pathMetaStyle: CSSProperties = {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  }

  const valuePropsSectionStyle: CSSProperties = {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    background: 'rgba(20, 20, 25, 0.4)',
  }

  const valuePropStyle: CSSProperties = {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
  }

  const valuePropTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
    color: theme.colors.basic,
  }

  const valuePropTextStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
  }

  const ctaSectionStyle: CSSProperties = {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
    textAlign: 'center',
  }

  const ctaTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  }

  const ctaTextStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 1.6,
  }

  const buttonGroupStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.md,
  }

  return (
    <div>
      {/* Hero Section */}
      <Container size="sm">
        <motion.div
          style={heroStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={logoStyle}>♻️</div>
          <h1 style={h1Style}>
            Turn Junk into
            <br />
            Infrastructure
          </h1>
          <p style={taglineStyle}>
            Old hardware + open source = enterprise infrastructure forever. Zero monthly bills.
          </p>
        </motion.div>

        {/* Animation */}
        <motion.div
          style={animationWrapperStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ConveyorAnimationMobile />
        </motion.div>

        {/* Value Props */}
        <div style={valuePropsSectionStyle}>
          <motion.div
            style={valuePropStyle}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 style={valuePropTitleStyle}>Your Junk</h3>
            <p style={valuePropTextStyle}>
              That dusty Dell server? Perfect. We help you rescue hardware from the landfill and
              turn it into enterprise infrastructure.
            </p>
          </motion.div>

          <motion.div
            style={valuePropStyle}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 style={valuePropTitleStyle}>Our Magic</h3>
            <p style={valuePropTextStyle}>
              Open source software is the secret. Battle-tested tools packaged into simple,
              API-driven systems that just work.
            </p>
          </motion.div>

          <motion.div
            style={valuePropStyle}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <h3 style={valuePropTitleStyle}>Zero Bills</h3>
            <p style={valuePropTextStyle}>
              Pay once for hardware, then never again. No monthly subscriptions. Your infrastructure
              costs electricity and internet. That's it.
            </p>
          </motion.div>
        </div>

        {/* Paths */}
        <div style={pathsContainerStyle}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Link to="/homelab" style={pathCardStyle}>
              <div style={pathIconStyle}>🏠</div>
              <h3 style={pathTitleStyle}>Homelab</h3>
              <p style={pathDescStyle}>
                Take control of your digital life. Replace cloud services with hardware you own.
              </p>
              <div style={pathMetaStyle}>For hobbyists & home users →</div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <Link to="/small-business" style={pathCardStyle}>
              <div style={pathIconStyle}>🏢</div>
              <h3 style={pathTitleStyle}>Small Business</h3>
              <p style={pathDescStyle}>
                Professional infrastructure without enterprise prices. $1,500 hardware replaces
                $30K cloud costs.
              </p>
              <div style={pathMetaStyle}>For startups & small teams →</div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Link to="/organization" style={pathCardStyle}>
              <div style={pathIconStyle}>🏛️</div>
              <h3 style={pathTitleStyle}>Organization</h3>
              <p style={pathDescStyle}>
                Complete infrastructure sovereignty. HIPAA, SOC 2, GDPR ready on your hardware.
              </p>
              <div style={pathMetaStyle}>For enterprises & institutions →</div>
            </Link>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          style={ctaSectionStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          <h2 style={ctaTitleStyle}>Ready to Get Started?</h2>
          <p style={ctaTextStyle}>
            Join thousands who've taken control of their infrastructure and said goodbye to cloud
            bills.
          </p>
          <div style={buttonGroupStyle}>
            <Button variant="primary" size="lg" fullWidth href="/guide">
              Start Building
            </Button>
            <Button variant="outline" size="lg" fullWidth href="https://github.com/KontangoOSS">
              View on GitHub
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
