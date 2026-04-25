import { CSSProperties, useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { MarkdownContent } from '../components/ui/MarkdownContent'
import { concepts, getConceptBySlug } from '../content/concepts'

const DOCS_BASE = 'https://raw.githubusercontent.com/KontangoOSS/docs/main/concepts'

type Variant = 'short' | 'full'

export function ConceptArticle() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [shortAvailable, setShortAvailable] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const concept = slug ? getConceptBySlug(slug) : undefined

  // Variant comes from ?v=short — defaults to full.
  const variant: Variant = searchParams.get('v') === 'short' ? 'short' : 'full'

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!slug) return
    setLoading(true)

    async function loadContent() {
      const fileName = variant === 'short' ? `${slug}-short` : slug
      const fallback = `${slug}` // if -short doesn't exist, fall through to long

      try {
        const res = await fetch(`${DOCS_BASE}/${fileName}.md`)
        if (res.ok) {
          setContent(await res.text())
          if (variant === 'full') {
            // Also probe whether a -short.md exists, so we can show the toggle
            const probe = await fetch(`${DOCS_BASE}/${slug}-short.md`, { method: 'HEAD' })
            setShortAvailable(probe.ok)
          } else {
            setShortAvailable(true)
          }
        } else if (variant === 'short') {
          // No short version yet — fall back to full and tell the toggle
          const fullRes = await fetch(`${DOCS_BASE}/${fallback}.md`)
          if (fullRes.ok) {
            setContent(await fullRes.text())
          } else {
            setContent(`# ${concept?.title ?? 'Concept'}\n\nContent coming soon. View on [GitHub](https://github.com/KontangoOSS/docs/tree/main/concepts).`)
          }
          setShortAvailable(false)
        } else {
          setContent(`# ${concept?.title ?? 'Concept'}\n\nContent coming soon. View on [GitHub](https://github.com/KontangoOSS/docs/tree/main/concepts).`)
        }
      } catch {
        setContent(`# ${concept?.title ?? 'Concept'}\n\nCouldn't load this page. Try refreshing or view it on [GitHub](https://github.com/KontangoOSS/docs/tree/main/concepts).`)
      }

      setLoading(false)
    }

    loadContent()
  }, [slug, variant, concept?.title])

  const currentIndex = concepts.findIndex(c => c.slug === slug)
  const prev = currentIndex > 0 ? concepts[currentIndex - 1] : undefined
  const next = currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : undefined

  const headerStyle: CSSProperties = {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xl,
    borderBottom: `1px solid ${theme.colors.border}`,
    marginBottom: theme.spacing.xl,
  }

  const navStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xxxl,
    paddingTop: theme.spacing.xl,
    borderTop: `1px solid ${theme.colors.border}`,
  }

  const navCardStyle: CSSProperties = {
    padding: theme.spacing.lg,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    textDecoration: 'none',
  }

  const toggleStyle = (active: boolean): CSSProperties => ({
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    background: active ? theme.colors.primary : 'transparent',
    color: active ? '#0a0a0f' : theme.colors.textSecondary,
    border: `1px solid ${active ? theme.colors.primary : theme.colors.border}`,
    borderRadius: theme.borderRadius.full,
    cursor: 'pointer',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    transition: 'all 0.15s ease',
  })

  if (!concept) {
    return (
      <Container>
        <div style={{ textAlign: 'center', paddingTop: theme.spacing.xxxl }}>
          <h1>Concept Not Found</h1>
          <Button variant="primary" href="/concepts">Back to Concepts</Button>
        </div>
      </Container>
    )
  }

  return (
    <Container size="md">
      <header style={headerStyle}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.lg,
          fontSize: theme.fontSize.sm,
          color: theme.colors.textMuted,
        }}>
          <Link to="/" style={{ color: theme.colors.textMuted, textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/concepts" style={{ color: theme.colors.textMuted, textDecoration: 'none' }}>Concepts</Link>
          <span>/</span>
          <span style={{ color: theme.colors.textSecondary }}>{concept.number}</span>
        </div>

        <h1 style={{
          fontSize: theme.fontSize['4xl'],
          fontWeight: theme.fontWeight.bold,
          color: theme.colors.textPrimary,
          marginBottom: theme.spacing.sm,
        }}>
          {concept.title}
        </h1>
        <p style={{ fontSize: theme.fontSize.lg, color: theme.colors.textSecondary, lineHeight: 1.6 }}>
          {concept.description}
        </p>

        <div style={{
          marginTop: theme.spacing.lg,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
          flexWrap: 'wrap',
        }}>
          {shortAvailable && (
            <div style={{ display: 'flex', gap: theme.spacing.xs }}>
              <button
                style={toggleStyle(variant === 'short')}
                onClick={() => setSearchParams({ v: 'short' })}
              >
                Quick version
              </button>
              <button
                style={toggleStyle(variant === 'full')}
                onClick={() => setSearchParams({})}
              >
                Full version
              </button>
            </div>
          )}
          <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.textMuted }}>
            ⏱️ {variant === 'short' ? '~1 min' : concept.timeEstimate}
          </div>
        </div>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: theme.spacing.xxl, color: theme.colors.textSecondary }}>
          Loading…
        </div>
      ) : (
        <MarkdownContent content={content} />
      )}

      <nav style={navStyle}>
        {prev ? (
          <Link to={`/concepts/${prev.slug}`} style={navCardStyle}>
            <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted, marginBottom: theme.spacing.xs }}>← Previous</div>
            <div style={{ fontSize: theme.fontSize.base, color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium }}>
              {prev.number}. {prev.title}
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/concepts/${next.slug}`} style={{ ...navCardStyle, textAlign: 'right' }}>
            <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted, marginBottom: theme.spacing.xs }}>Next →</div>
            <div style={{ fontSize: theme.fontSize.base, color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium }}>
              {next.number}. {next.title}
            </div>
          </Link>
        ) : <div />}
      </nav>

      <div style={{ marginTop: theme.spacing.xxl, marginBottom: theme.spacing.xxxl, textAlign: 'center' }}>
        <Button variant="outline" href="/concepts">← Back to all concepts</Button>
      </div>
    </Container>
  )
}
