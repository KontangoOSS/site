import { CSSProperties, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { MarkdownContent } from '../components/ui/MarkdownContent'

const offerings = {
  homelab: {
    title: 'Homelab',
    path: 'basic',
    icon: '🏠',
    color: theme.colors.basic,
    files: ['README', '01-hardware', '02-planning', '03-installation', '04-services'],
  },
  'small-business': {
    title: 'Small Business',
    path: 'intermediate',
    icon: '🏢',
    color: theme.colors.intermediate,
    files: ['README', '01-requirements', '02-architecture', '03-installation', '04-authentication', '05-monitoring'],
  },
  organization: {
    title: 'Organization',
    path: 'enterprise',
    icon: '🏛️',
    color: theme.colors.enterprise,
    files: ['README', '01-requirements', '02-architecture', '03-high-availability', '04-security', '05-identity', '06-orchestration', '07-monitoring', '08-compliance'],
  },
}

export function Offering() {
  const { offering, page } = useParams<{ offering: string; page?: string }>()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const offeringConfig = offering ? offerings[offering as keyof typeof offerings] : undefined

  useEffect(() => {
    async function loadContent() {
      if (!offeringConfig) return

      // If specific page requested, load just that file
      if (page) {
        const url = `https://raw.githubusercontent.com/KontangoOSS/docs/main/offerings/${offeringConfig.path}/${page}.md`
        try {
          const res = await fetch(url)
          if (res.ok) {
            setContent(await res.text())
          } else {
            setContent(`# ${offeringConfig.title}\n\nContent coming soon.\n\nView the full content on [GitHub](https://github.com/KontangoOSS/docs).`)
          }
        } catch {
          setContent(`# ${offeringConfig.title}\n\nContent coming soon.\n\nView the full content on [GitHub](https://github.com/KontangoOSS/docs).`)
        }
      } else {
        // Load all files and concatenate them
        try {
          const allContent: string[] = []
          for (const file of offeringConfig.files) {
            const url = `https://raw.githubusercontent.com/KontangoOSS/docs/main/offerings/${offeringConfig.path}/${file}.md`
            try {
              const res = await fetch(url)
              if (res.ok) {
                const text = await res.text()
                allContent.push(text)
                allContent.push('\n\n---\n\n') // Add separator between sections
              }
            } catch {
              // Skip files that fail to load
            }
          }

          if (allContent.length > 0) {
            setContent(allContent.join(''))
          } else {
            setContent(`# ${offeringConfig.title}\n\nContent coming soon.\n\nView the full content on [GitHub](https://github.com/KontangoOSS/docs).`)
          }
        } catch {
          setContent(`# ${offeringConfig.title}\n\nContent coming soon.\n\nView the full content on [GitHub](https://github.com/KontangoOSS/docs).`)
        }
      }
      setLoading(false)
    }
    loadContent()
  }, [offering, page, offeringConfig])

  const headerStyle: CSSProperties = {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xl,
    borderBottom: `1px solid ${theme.colors.border}`,
    marginBottom: theme.spacing.xl,
  }

  if (!offeringConfig) {
    return (
      <Container>
        <div style={{ textAlign: 'center', paddingTop: theme.spacing.xxxl }}>
          <h1>Page Not Found</h1>
          <Button variant="primary" href="/">Back to Home</Button>
        </div>
      </Container>
    )
  }

  return (
    <Container size="lg">
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.lg, fontSize: theme.fontSize.sm, color: theme.colors.textMuted }}>
          <Link to="/" style={{ color: theme.colors.textMuted, textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to={`/${offering}`} style={{ color: theme.colors.textMuted, textDecoration: 'none' }}>{offeringConfig.title}</Link>
          {page && (
            <>
              <span>/</span>
              <span style={{ color: theme.colors.textSecondary }}>{page}</span>
            </>
          )}
        </div>

        <div style={{
          display: 'inline-block',
          fontSize: '48px',
          marginBottom: theme.spacing.md,
        }}>
          {offeringConfig.icon}
        </div>

        <h1 style={{ fontSize: theme.fontSize['4xl'], fontWeight: theme.fontWeight.bold, color: offeringConfig.color, marginBottom: theme.spacing.sm }}>
          {offeringConfig.title}
        </h1>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: theme.spacing.xxl, color: theme.colors.textSecondary }}>Loading...</div>
      ) : (
        <MarkdownContent content={content} />
      )}

      <div style={{ marginTop: theme.spacing.xxl, marginBottom: theme.spacing.xxxl, textAlign: 'center' }}>
        <Button variant="outline" href="/">← Back to Home</Button>
      </div>
    </Container>
  )
}
