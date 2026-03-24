import { CSSProperties } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { theme } from '../../styles/theme'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const containerStyle: CSSProperties = {
    lineHeight: 1.8,
    color: theme.colors.textSecondary,
  }

  return (
    <div style={containerStyle} className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 style={{
              fontSize: theme.fontSize['4xl'],
              fontWeight: theme.fontWeight.bold,
              color: theme.colors.textPrimary,
              marginTop: theme.spacing.xxl,
              marginBottom: theme.spacing.lg,
              lineHeight: 1.2,
            }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{
              fontSize: theme.fontSize['2xl'],
              fontWeight: theme.fontWeight.bold,
              color: theme.colors.textPrimary,
              marginTop: theme.spacing.xxl,
              marginBottom: theme.spacing.md,
              paddingBottom: theme.spacing.sm,
              borderBottom: `1px solid ${theme.colors.border}`,
            }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{
              fontSize: theme.fontSize.xl,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.textPrimary,
              marginTop: theme.spacing.xl,
              marginBottom: theme.spacing.md,
            }}>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 style={{
              fontSize: theme.fontSize.lg,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.textPrimary,
              marginTop: theme.spacing.lg,
              marginBottom: theme.spacing.sm,
            }}>
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p style={{
              marginBottom: theme.spacing.md,
              lineHeight: 1.8,
            }}>
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul style={{
              marginBottom: theme.spacing.md,
              paddingLeft: theme.spacing.xl,
              listStyleType: 'disc',
            }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{
              marginBottom: theme.spacing.md,
              paddingLeft: theme.spacing.xl,
              listStyleType: 'decimal',
            }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{
              marginBottom: theme.spacing.xs,
              lineHeight: 1.7,
            }}>
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              style={{
                color: theme.colors.primary,
                textDecoration: 'none',
                borderBottom: `1px solid transparent`,
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = theme.colors.primary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code style={{
                  background: 'rgba(74, 158, 255, 0.1)',
                  padding: '2px 6px',
                  borderRadius: theme.borderRadius.sm,
                  fontSize: '0.9em',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  color: theme.colors.primary,
                }}>
                  {children}
                </code>
              )
            }
            return (
              <code style={{
                display: 'block',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: theme.fontSize.sm,
                lineHeight: 1.6,
              }}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre style={{
              background: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.lg,
              overflow: 'auto',
              marginBottom: theme.spacing.lg,
              fontSize: theme.fontSize.sm,
            }}>
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{
              borderLeft: `4px solid ${theme.colors.primary}`,
              paddingLeft: theme.spacing.lg,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: theme.spacing.md,
              fontStyle: 'italic',
              color: theme.colors.textSecondary,
            }}>
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div style={{ overflowX: 'auto', marginBottom: theme.spacing.lg }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: theme.fontSize.sm,
              }}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{
              background: theme.colors.surface,
            }}>
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th style={{
              padding: theme.spacing.md,
              textAlign: 'left',
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.textPrimary,
              borderBottom: `2px solid ${theme.colors.border}`,
            }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{
              padding: theme.spacing.md,
              borderBottom: `1px solid ${theme.colors.border}`,
            }}>
              {children}
            </td>
          ),
          hr: () => (
            <hr style={{
              border: 'none',
              borderTop: `1px solid ${theme.colors.border}`,
              marginTop: theme.spacing.xxl,
              marginBottom: theme.spacing.xxl,
            }} />
          ),
          strong: ({ children }) => (
            <strong style={{
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.textPrimary,
            }}>
              {children}
            </strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
