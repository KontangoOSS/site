import { CSSProperties, ReactNode } from 'react'
import { theme } from '../../styles/theme'

export interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'bordered'
  padding?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  style,
}: CardProps) {
  const paddingMap = {
    sm: theme.spacing.md,
    md: theme.spacing.lg,
    lg: theme.spacing.xl,
  }

  const baseStyle: CSSProperties = {
    padding: paddingMap[padding],
    borderRadius: theme.borderRadius.lg,
    transition: 'all 0.2s ease',
  }

  const variantStyles: Record<string, CSSProperties> = {
    default: {
      background: theme.colors.surface,
    },
    elevated: {
      background: theme.colors.surface,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
    },
    bordered: {
      background: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
    },
  }

  return (
    <div style={{ ...baseStyle, ...variantStyles[variant], ...style }}>
      {children}
    </div>
  )
}
