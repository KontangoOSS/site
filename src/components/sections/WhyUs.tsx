import { CSSProperties, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'
import { Container } from '../ui/Container'

interface Benefit {
  icon: string
  title: string
  stat: string
  description: string
  color: string
}

const benefits: Benefit[] = [
  {
    icon: '💰',
    title: 'Massive Savings',
    stat: '80-90%',
    description: 'A $50 thrift store PC becomes a firewall rivaling $5,000 enterprise appliances.',
    color: theme.colors.basic,
  },
  {
    icon: '♻️',
    title: 'Zero E-Waste',
    stat: '500kg',
    description: 'CO2 saved per server reused. Keep toxins out of landfills while building infrastructure.',
    color: theme.colors.intermediate,
  },
  {
    icon: '🔓',
    title: 'True Freedom',
    stat: '0',
    description: 'License fees. No vendor lock-in. OPNsense, Docker, Kubernetes - enterprise tools at zero cost.',
    color: theme.colors.primary,
  },
  {
    icon: '📈',
    title: 'Real Skills',
    stat: '100%',
    description: 'Transferable. Your home lab becomes your resume. Experience beats certifications.',
    color: theme.colors.basic,
  },
]

export function WhyUs() {
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
    background: theme.colors.surface,
    position: 'relative',
  }

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  }

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    maxWidth: '600px',
    margin: '0 auto',
  }

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
    gap: theme.spacing.lg,
  }

  const cardStyle: CSSProperties = {
    padding: theme.spacing.xl,
    background: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.xl,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  }

  const iconContainerStyle: CSSProperties = {
    width: '60px',
    height: '60px',
    margin: '0 auto',
    marginBottom: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    background: 'rgba(81, 207, 102, 0.1)',
    borderRadius: '50%',
  }

  const statStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  }

  const cardTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  }

  const cardDescStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
  }

  return (
    <section style={sectionStyle}>
      <Container size="xl">
        <div style={headerStyle}>
          <h2 style={titleStyle}>Why Transform Old Hardware?</h2>
          <p style={subtitleStyle}>
            Build enterprise-grade infrastructure while saving money, reducing waste, and gaining real skills
          </p>
        </div>

        <div style={gridStyle}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              style={cardStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                transform: 'translateY(-8px)',
                boxShadow: `0 20px 40px ${benefit.color}20`,
                borderColor: benefit.color,
              }}
            >
              {/* Accent gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${benefit.color} 0%, transparent 100%)`,
              }} />

              <div style={iconContainerStyle}>{benefit.icon}</div>
              <div style={{ ...statStyle, color: benefit.color }}>{benefit.stat}</div>
              <h3 style={cardTitleStyle}>{benefit.title}</h3>
              <p style={cardDescStyle}>{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional comparison row */}
        <div style={{
          marginTop: theme.spacing.xxl,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: theme.spacing.lg,
        }}>
          {/* Cloud costs */}
          <motion.div
            style={{
              padding: theme.spacing.xl,
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: theme.borderRadius.xl,
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
              <span style={{ fontSize: '32px' }}>☁️</span>
              <div>
                <div style={{ fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold, color: '#ef4444' }}>
                  Cloud Subscription
                </div>
                <div style={{ color: theme.colors.textMuted }}>The old way</div>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                '$50-500/month for basic infrastructure',
                'Vendor lock-in and data portability issues',
                'Prices increase annually',
                'You never own anything',
              ].map((item, i) => (
                <li key={i} style={{
                  padding: `${theme.spacing.sm} 0`,
                  color: theme.colors.textSecondary,
                  borderBottom: i < 3 ? `1px solid ${theme.colors.border}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                }}>
                  <span style={{ color: '#ef4444' }}>✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our way */}
          <motion.div
            style={{
              padding: theme.spacing.xl,
              background: 'rgba(81, 207, 102, 0.05)',
              border: '1px solid rgba(81, 207, 102, 0.2)',
              borderRadius: theme.borderRadius.xl,
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
              <span style={{ fontSize: '32px' }}>🏠</span>
              <div>
                <div style={{ fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold, color: theme.colors.basic }}>
                  Self-Hosted Forever
                </div>
                <div style={{ color: theme.colors.textMuted }}>The Kontango way</div>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                '$50-500 one-time for enterprise-grade hardware',
                'Complete ownership and data sovereignty',
                'Zero ongoing costs (just electricity)',
                'Yours forever. Upgradeable. Expandable.',
              ].map((item, i) => (
                <li key={i} style={{
                  padding: `${theme.spacing.sm} 0`,
                  color: theme.colors.textSecondary,
                  borderBottom: i < 3 ? `1px solid ${theme.colors.border}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                }}>
                  <span style={{ color: theme.colors.basic }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
