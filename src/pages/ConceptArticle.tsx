import { CSSProperties, useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { MarkdownContent } from '../components/ui/MarkdownContent'
import {
  concepts,
  getConceptBySlug,
  ConceptVariant,
  variantLabels,
  fileSuffix,
} from '../content/concepts'

const DOCS_BASE = 'https://raw.githubusercontent.com/KontangoOSS/docs/main/concepts'

const variantOrder: ConceptVariant[] = ['short', 'medium', 'long']

function parseVariant(v: string | null): ConceptVariant {
  if (v === 'short' || v === 'long') return v
  return 'medium'
}

const tierColor: Record<ConceptVariant, string> = {
  short: theme.colors.basic,
  medium: theme.colors.intermediate,
  long: theme.colors.enterprise,
}

export function ConceptArticle() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const concept = slug ? getConceptBySlug(slug) : undefined
  const variant = parseVariant(searchParams.get('v'))

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
      const path = `${slug}${fileSuffix(variant)}.md`
      try {
        const res = await fetch(`${DOCS_BASE}/${path}`)
        if (res.ok) {
          setContent(await res.text())
        } else if (variant !== 'medium') {
          // Fall back to medium if a tier doesn't exist yet
          const fallback = await fetch(`${DOCS_BASE}/${slug}.md`)
          if (fallback.ok) {
            setContent(await fallback.text())
          } else {
            setContent(`# ${concept?.title ?? 'Concept'}\n\nContent coming soon.`)
          }
        } else {
          setContent(`# ${concept?.title ?? 'Concept'}\n\nContent coming soon.`)
        }
      } catch {
        setContent(`# ${concept?.title ?? 'Concept'}\n\nCouldn't load this page. Try refreshing.`)
      }
      setLoading(false)
    }

    loadContent()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug, variant, concept?.title])

  const setVariant = (v: ConceptVariant) => {
    if (v === 'medium') setSearchParams({})
    else setSearchParams({ v })
  }

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

  // Tier toggle — three pill buttons with the tier color when active
  const pillStyle = (v: ConceptVariant, active: boolean): CSSProperties => ({
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    background: active ? tierColor[v] : 'transparent',
    color: active ? '#0a0a0f' : theme.colors.textSecondary,
    border: `1px solid ${active ? tierColor[v] : theme.colors.border}`,
    borderRadius: theme.borderRadius.full,
    cursor: 'pointer',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    transition: 'all 0.15s ease',
    fontFamily: 'inherit',
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
          <div style={{
            display: 'flex',
            gap: theme.spacing.xs,
            padding: theme.spacing.xs,
            background: theme.colors.surface,
            borderRadius: theme.borderRadius.full,
            border: `1px solid ${theme.colors.border}`,
          }}>
            {variantOrder.map(v => (
              <button
                key={v}
                style={pillStyle(v, variant === v)}
                onClick={() => setVariant(v)}
                aria-pressed={variant === v}
                aria-label={`Switch to ${variantLabels[v].label} version`}
              >
                {variantLabels[v].label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.textMuted }}>
            ⏱️ {variantLabels[variant].estimate(concept.timeEstimate)}
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
          <Link
            to={`/concepts/${prev.slug}${variant !== 'medium' ? `?v=${variant}` : ''}`}
            style={navCardStyle}
          >
            <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted, marginBottom: theme.spacing.xs }}>← Previous</div>
            <div style={{ fontSize: theme.fontSize.base, color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium }}>
              {prev.number}. {prev.title}
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link
            to={`/concepts/${next.slug}${variant !== 'medium' ? `?v=${variant}` : ''}`}
            style={{ ...navCardStyle, textAlign: 'right' }}
          >
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
