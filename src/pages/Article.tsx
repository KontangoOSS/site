import { CSSProperties, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { MarkdownContent } from '../components/ui/MarkdownContent'
import { getArticleBySlug, guideArticles } from '../content'

export function Article() {
  const { slug } = useParams<{ slug: string }>()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const article = slug ? getArticleBySlug(slug) : undefined

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    async function loadContent() {
      if (!slug) return

      // Fetch markdown from docs repo
      try {
        const res = await fetch(`https://raw.githubusercontent.com/KontangoOSS/docs/main/self-hosting-guide/${slug}.md`)
        if (res.ok) {
          setContent(await res.text())
        } else {
          setContent(`# ${article?.title || 'Article'}\n\n${article?.description || 'Content coming soon.'}\n\nView the full content on [GitHub](https://github.com/KontangoOSS/docs).`)
        }
      } catch {
        setContent(`# ${article?.title || 'Article'}\n\n${article?.description || 'Content coming soon.'}\n\nView the full content on [GitHub](https://github.com/KontangoOSS/docs).`)
      }
      setLoading(false)
    }
    loadContent()
  }, [slug, article?.title, article?.description])

  const currentIndex = guideArticles.findIndex(a => a.slug === slug)
  const prevArticle = currentIndex > 0 ? guideArticles[currentIndex - 1] : undefined
  const nextArticle = currentIndex < guideArticles.length - 1 ? guideArticles[currentIndex + 1] : undefined

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

  if (!article) {
    return (
      <Container>
        <div style={{ textAlign: 'center', paddingTop: theme.spacing.xxxl }}>
          <h1>Article Not Found</h1>
          <Button variant="primary" href="/guide">Back to Guide</Button>
        </div>
      </Container>
    )
  }

  return (
    <Container size="md">
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.lg, fontSize: theme.fontSize.sm, color: theme.colors.textMuted }}>
          <Link to="/" style={{ color: theme.colors.textMuted, textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/guide" style={{ color: theme.colors.textMuted, textDecoration: 'none' }}>Guide</Link>
          <span>/</span>
          <span style={{ color: theme.colors.textSecondary }}>Step {article.number}</span>
        </div>

        <div style={{
          display: 'inline-block',
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          background: `linear-gradient(135deg, ${theme.colors.basic} 0%, ${theme.colors.primary} 100%)`,
          borderRadius: theme.borderRadius.full,
          fontSize: theme.fontSize.xs,
          fontWeight: theme.fontWeight.bold,
          color: 'white',
          marginBottom: theme.spacing.md,
        }}>
          STEP {article.number}
        </div>

        <h1 style={{ fontSize: theme.fontSize['4xl'], fontWeight: theme.fontWeight.bold, color: theme.colors.textPrimary, marginBottom: theme.spacing.sm }}>
          {article.title}
        </h1>
        <p style={{ fontSize: theme.fontSize.lg, color: theme.colors.textSecondary, lineHeight: 1.6 }}>
          {article.description}
        </p>
        {article.timeEstimate && (
          <div style={{ marginTop: theme.spacing.md, fontSize: theme.fontSize.sm, color: theme.colors.textMuted }}>
            ⏱️ {article.timeEstimate}
          </div>
        )}
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: theme.spacing.xxl, color: theme.colors.textSecondary }}>Loading...</div>
      ) : (
        <MarkdownContent content={content} />
      )}

      <nav style={navStyle}>
        {prevArticle ? (
          <Link to={`/guide/${prevArticle.slug}`} style={navCardStyle}>
            <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted, marginBottom: theme.spacing.xs }}>← Previous</div>
            <div style={{ fontSize: theme.fontSize.base, color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium }}>
              Step {prevArticle.number}: {prevArticle.title}
            </div>
          </Link>
        ) : <div />}
        {nextArticle ? (
          <Link to={`/guide/${nextArticle.slug}`} style={{ ...navCardStyle, textAlign: 'right' }}>
            <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted, marginBottom: theme.spacing.xs }}>Next →</div>
            <div style={{ fontSize: theme.fontSize.base, color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium }}>
              Step {nextArticle.number}: {nextArticle.title}
            </div>
          </Link>
        ) : <div />}
      </nav>

      <div style={{ marginTop: theme.spacing.xxl, marginBottom: theme.spacing.xxxl, textAlign: 'center' }}>
        <Button variant="outline" href="/guide">← Back to Guide Overview</Button>
      </div>
    </Container>
  )
}
