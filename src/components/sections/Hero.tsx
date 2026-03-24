import { CSSProperties, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { theme } from '../../styles/theme'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { ConveyorAnimation } from './ConveyorAnimation'
import { ConveyorAnimationMobile } from './ConveyorAnimationMobile'

const floatingQuotes = [
  { text: 'Dumpster Dive Your Way to Enterprise', x: '5%', y: '15%', rotate: -8 },
  { text: 'E-Waste to Enterprise', x: '75%', y: '8%', rotate: 5 },
  { text: 'Screw Monthly Bills', x: '85%', y: '35%', rotate: 12 },
  { text: 'From Landfill to Legendary', x: '2%', y: '45%', rotate: -5 },
  { text: 'Dead Tech Lives Here', x: '80%', y: '60%', rotate: -10 },
  { text: 'Garbage In. Infrastructure Out.', x: '8%', y: '70%', rotate: 6 },
]

export function Hero() {
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
    paddingBottom: theme.spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    minHeight: isMobile ? 'auto' : '90vh',
  }

  const gradientBgStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120%',
    height: '100%',
    background: `radial-gradient(ellipse at center top, rgba(81, 207, 102, 0.12) 0%, transparent 50%),
                 radial-gradient(ellipse at center bottom, rgba(74, 158, 255, 0.1) 0%, transparent 50%)`,
    pointerEvents: 'none',
  }

  const contentStyle: CSSProperties = {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '1000px',
    margin: '0 auto',
    zIndex: 10,
  }

  const taglineStyle: CSSProperties = {
    display: 'inline-block',
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    background: 'rgba(81, 207, 102, 0.1)',
    border: `1px solid rgba(81, 207, 102, 0.3)`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.fontSize.sm,
    color: theme.colors.basic,
    marginBottom: theme.spacing.xl,
  }

  const headingContainerStyle: CSSProperties = {
    marginBottom: theme.spacing.lg,
  }

  const headingLineStyle: CSSProperties = {
    fontSize: 'clamp(48px, 8vw, 80px)',
    fontWeight: theme.fontWeight.bold,
    lineHeight: 1.1,
    color: theme.colors.textPrimary,
    display: 'block',
  }

  const headingAccentStyle: CSSProperties = {
    ...headingLineStyle,
    background: `linear-gradient(135deg, ${theme.colors.basic} 0%, ${theme.colors.primary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  const headingHighlightStyle: CSSProperties = {
    ...headingLineStyle,
    color: theme.colors.primary,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: theme.fontSize.xl,
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.xl,
  }

  const ctaContainerStyle: CSSProperties = {
    display: 'flex',
    gap: theme.spacing.md,
    justifyContent: 'center',
    marginBottom: theme.spacing.xxl,
  }

  const animationContainerStyle: CSSProperties = {
    marginTop: theme.spacing.xl,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 10,
  }

  const valuePropsContainerStyle: CSSProperties = {
    marginTop: theme.spacing.xl,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: theme.spacing.lg,
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const valuePropCardStyle: CSSProperties = {
    padding: theme.spacing.lg,
    background: 'rgba(20, 20, 25, 0.6)',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'block',
    color: 'inherit',
  }


  const valuePropTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
    background: `linear-gradient(135deg, ${theme.colors.basic} 0%, ${theme.colors.primary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  const valuePropTextStyle: CSSProperties = {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 1.7,
  }

  const floatingQuoteStyle = (x: string, y: string, rotate: number): CSSProperties => ({
    position: 'absolute',
    left: x,
    top: y,
    transform: `rotate(${rotate}deg)`,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    background: 'rgba(20, 20, 25, 0.8)',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: 1,
  })

  return (
    <section style={sectionStyle}>
      <div style={gradientBgStyle} />

      {/* Floating quotes - hidden on mobile */}
      {!isMobile && floatingQuotes.map((quote, index) => (
        <motion.div
          key={index}
          style={floatingQuoteStyle(quote.x, quote.y, quote.rotate)}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        >
          "{quote.text}"
        </motion.div>
      ))}

      <Container size="xl">
        <div style={contentStyle}>
          <motion.span
            style={taglineStyle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            100% Open Source
          </motion.span>

          <div style={headingContainerStyle}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                style={headingLineStyle}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Your Junk.
              </motion.span>
              <motion.span
                style={headingAccentStyle}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Our Magic.
              </motion.span>
              <motion.span
                style={headingHighlightStyle}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Zero Bills.
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            style={subtitleStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Old hardware + open source = enterprise infrastructure forever.
            No subscriptions. No vendor lock-in. Just freedom.
          </motion.p>

          <motion.div
            style={ctaContainerStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button variant="primary" size="lg" href="/guide">
              Start Building
            </Button>
            <Button variant="outline" size="lg" href="https://github.com/KontangoOSS">
              View Source
            </Button>
          </motion.div>
        </div>

        <motion.div
          style={animationContainerStyle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {isMobile ? <ConveyorAnimationMobile /> : <ConveyorAnimation />}
        </motion.div>

        <motion.div
          style={valuePropsContainerStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Link to="/homelab" style={valuePropCardStyle}>
            <h3 style={valuePropTitleStyle}>Your Junk</h3>
            <p style={valuePropTextStyle}>
              That old Dell server collecting dust? Perfect. Retired laptops? Even better.
              We help you rescue hardware from the landfill and turn it into enterprise-grade
              infrastructure. No fancy equipment needed—just whatever you've got lying around.
            </p>
          </Link>

          <Link to="/small-business" style={valuePropCardStyle}>
            <h3 style={valuePropTitleStyle}>Our Magic</h3>
            <p style={valuePropTextStyle}>
              Open source software is the secret. We package battle-tested tools into simple,
              API-driven systems that just work. What costs companies $50K/month in AWS?
              You'll run on decade-old hardware for the price of electricity. No vendor lock-in.
              No surprises.
            </p>
          </Link>

          <Link to="/organization" style={valuePropCardStyle}>
            <h3 style={valuePropTitleStyle}>Zero Bills</h3>
            <p style={valuePropTextStyle}>
              Pay once for hardware (or don't—use what you have), then never again. No monthly
              subscriptions. No surprise charges. No "contact sales for pricing." Your infrastructure
              costs exactly what you want it to: electricity and an internet connection. That's it.
            </p>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
