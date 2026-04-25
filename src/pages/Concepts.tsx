import { CSSProperties, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { concepts, ConceptProfile, profileLabels } from '../content/concepts'

const STORAGE_KEY = 'kontango.profile'

function loadInitialProfile(): ConceptProfile | 'all' {
  if (typeof window === 'undefined') return 'all'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'newcomer' || stored === 'business' || stored === 'operator') return stored
  return 'all'
}

export function Concepts() {
  const [profile, setProfile] = useState<ConceptProfile | 'all'>(loadInitialProfile)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (profile === 'all') window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, profile)
  }, [profile])

  const visible = profile === 'all'
    ? concepts
    : concepts.filter(c => c.profiles.includes(profile))

  // Profile choice determines default variant.
  const linkFor = (slug: string) => {
    if (profile === 'all') return `/concepts/${slug}`
    const variant = profileLabels[profile].defaultVariant
    if (variant === 'medium') return `/concepts/${slug}`
    return `/concepts/${slug}?v=${variant}`
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
    marginBottom: theme.spacing.xl,
  }

  const profileCard = (active: boolean, color: string): CSSProperties => ({
    padding: theme.spacing.lg,
    background: active ? `${color}14` : theme.colors.surface, // 14 = ~8% alpha hex
    border: `2px solid ${active ? color : theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
    color: theme.colors.textPrimary,
    fontFamily: 'inherit',
    width: '100%',
    position: 'relative',
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

  const activeProfileMeta = profile !== 'all' ? profileLabels[profile] : undefined

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
          Eight short pages that explain Kontango in plain language. Pick the version that fits — quick, standard, or deep.
        </p>
      </section>

      <section>
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
          {(['newcomer', 'business', 'operator'] as ConceptProfile[]).map(p => {
            const meta = profileLabels[p]
            const active = profile === p
            return (
              <button
                key={p}
                style={profileCard(active, meta.tierColor)}
                onClick={() => setProfile(active ? 'all' : p)}
                aria-pressed={active}
              >
                <div style={{
                  display: 'inline-block',
                  padding: `2px ${theme.spacing.sm}`,
                  background: meta.tierColor,
                  color: '#0a0a0f',
                  fontSize: theme.fontSize.xs,
                  fontWeight: theme.fontWeight.bold,
                  borderRadius: theme.borderRadius.full,
                  marginBottom: theme.spacing.sm,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {meta.defaultVariant === 'short' ? 'Quick' : meta.defaultVariant === 'medium' ? 'Standard' : 'Deep'}
                </div>
                <div style={{
                  fontSize: theme.fontSize.lg,
                  fontWeight: theme.fontWeight.bold,
                  color: active ? meta.tierColor : theme.colors.textPrimary,
                  marginBottom: theme.spacing.xs,
                }}>
                  {meta.name}
                </div>
                <div style={{
                  fontSize: theme.fontSize.sm,
                  color: theme.colors.textSecondary,
                  lineHeight: 1.5,
                }}>
                  {meta.tagline}
                </div>
              </button>
            )
          })}
        </div>
        <div style={{
          textAlign: 'center',
          fontSize: theme.fontSize.sm,
          color: theme.colors.textMuted,
          marginBottom: theme.spacing.xl,
        }}>
          {activeProfileMeta ? (
            <>
              Cards link to the <strong style={{ color: activeProfileMeta.tierColor }}>{activeProfileMeta.defaultVariant === 'short' ? 'Quick' : activeProfileMeta.defaultVariant === 'medium' ? 'Standard' : 'Deep'}</strong> version.
              {' '}
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
                Show all concepts
              </button>
            </>
          ) : (
            <>You can change versions on any page.</>
          )}
        </div>
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
              {profile === 'newcomer' ? 'Quick · ~1 min' :
               profile === 'operator' ? `Deep · ~${parseInt(c.timeEstimate) * 2} min` :
               `⏱️ ${c.timeEstimate}`}
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
