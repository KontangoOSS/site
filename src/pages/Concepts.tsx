import { CSSProperties, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { concepts, ConceptProfile, profileLabels } from '../content/concepts'

export function Concepts() {
  const [profile, setProfile] = useState<ConceptProfile | 'all'>('all')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const visible = profile === 'all'
    ? concepts
    : concepts.filter(c => c.profiles.includes(profile))

  // Newcomers default to short. Operators default to full.
  const linkFor = (slug: string) => {
    if (profile === 'newcomer') return `/concepts/${slug}?v=short`
    return `/concepts/${slug}`
  }

  const heroStyle: CSSProperties = {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxl,
    textAlign: 'center',
  }

  const profileGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.md,
    maxWidth: '880px',
    margin: '0 auto',
    marginBottom: theme.spacing.xxl,
  }

  const profileCard = (active: boolean): CSSProperties => ({
    padding: theme.spacing.lg,
    background: active ? 'rgba(74, 158, 255, 0.08)' : theme.colors.surface,
    border: `1px solid ${active ? theme.colors.primary : theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
    color: theme.colors.textPrimary,
    fontFamily: 'inherit',
    width: '100%',
  })

  const conceptGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xxxl,
  }

  const conceptCardStyle: CSSProperties = {
    display: 'block',
    padding: theme.spacing.xl,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    textDecoration: 'none',
    transition: 'all 0.15s ease',
  }

  return (
    <Container size="lg">
      <section style={heroStyle}>
        <h1 style={{
          fontSize: isMobile ? theme.fontSize['3xl'] : theme.fontSize['5xl'],
          fontWeight: theme.fontWeight.bold,
          color: theme.colors.textPrimary,
          marginBottom: theme.spacing.md,
          lineHeight: 1.1,
        }}>
          Core Concepts
        </h1>
        <p style={{
          fontSize: isMobile ? theme.fontSize.base : theme.fontSize.xl,
          color: theme.colors.textSecondary,
          maxWidth: '720px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Eight short pages that explain Kontango in plain language. Pick the angle that fits — we'll show you the version that makes sense for you.
        </p>
      </section>

      <section style={{ marginBottom: theme.spacing.xl }}>
        <div style={{
          fontSize: theme.fontSize.sm,
          color: theme.colors.textMuted,
          textAlign: 'center',
          marginBottom: theme.spacing.md,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Choose your view
        </div>
        <div style={profileGrid}>
          {(['newcomer', 'business', 'operator'] as ConceptProfile[]).map(p => (
            <button
              key={p}
              style={profileCard(profile === p)}
              onClick={() => setProfile(profile === p ? 'all' : p)}
            >
              <div style={{
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.bold,
                color: profile === p ? theme.colors.primary : theme.colors.textPrimary,
                marginBottom: theme.spacing.xs,
              }}>
                {profileLabels[p].name}
              </div>
              <div style={{
                fontSize: theme.fontSize.sm,
                color: theme.colors.textSecondary,
                lineHeight: 1.5,
              }}>
                {profileLabels[p].tagline}
              </div>
            </button>
          ))}
        </div>
        {profile !== 'all' && (
          <div style={{ textAlign: 'center', fontSize: theme.fontSize.sm, color: theme.colors.textMuted }}>
            Showing concepts most useful for: <strong style={{ color: theme.colors.textSecondary }}>{profileLabels[profile].name}</strong>
            {' · '}
            <button
              style={{
                background: 'none',
                border: 'none',
                color: theme.colors.primary,
                cursor: 'pointer',
                fontSize: 'inherit',
                padding: 0,
                fontFamily: 'inherit',
              }}
              onClick={() => setProfile('all')}
            >
              Show all
            </button>
          </div>
        )}
      </section>

      <section style={conceptGrid}>
        {visible.map(c => (
          <Link key={c.slug} to={linkFor(c.slug)} style={conceptCardStyle}>
            <div style={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.primary,
              fontWeight: theme.fontWeight.bold,
              marginBottom: theme.spacing.xs,
              letterSpacing: '0.05em',
            }}>
              {c.number}
            </div>
            <h3 style={{
              fontSize: theme.fontSize.xl,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.sm,
            }}>
              {c.title}
            </h3>
            <p style={{
              fontSize: theme.fontSize.base,
              color: theme.colors.textSecondary,
              lineHeight: 1.6,
              marginBottom: theme.spacing.md,
            }}>
              {c.description}
            </p>
            <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted }}>
              {profile === 'newcomer' ? 'Quick version · ~1 min' : `⏱️ ${c.timeEstimate}`}
            </div>
          </Link>
        ))}
      </section>

      <section style={{ textAlign: 'center', marginBottom: theme.spacing.xxxl }}>
        <p style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.md }}>
          Ready to go deeper?
        </p>
        <Link to="/guide" style={{
          color: theme.colors.primary,
          textDecoration: 'none',
          fontSize: theme.fontSize.base,
          fontWeight: theme.fontWeight.medium,
        }}>
          Read the Self-Hosting Guide →
        </Link>
      </section>
    </Container>
  )
}
