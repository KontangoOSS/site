import { CSSProperties, ReactNode } from 'react'
import { theme } from '../../styles/theme'

export interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  onClick?: () => void
  href?: string
  style?: CSSProperties
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  href,
  style,
}: ButtonProps) {
  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    fontWeight: theme.fontWeight.semibold,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    border: 'none',
    width: fullWidth ? '100%' : 'auto',
  }

  const sizeStyles: Record<string, CSSProperties> = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.fontSize.sm,
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.fontSize.base,
    },
    lg: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
      fontSize: theme.fontSize.lg,
    },
  }

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`,
      color: theme.colors.textPrimary,
    },
    secondary: {
      background: theme.colors.surface,
      color: theme.colors.textPrimary,
      border: `1px solid ${theme.colors.border}`,
    },
    outline: {
      background: 'transparent',
      color: theme.colors.primary,
      border: `2px solid ${theme.colors.primary}`,
    },
    ghost: {
      background: 'transparent',
      color: theme.colors.textSecondary,
    },
  }

  const combinedStyle = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  }

  if (href) {
    return (
      <a href={href} style={combinedStyle}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} style={combinedStyle}>
      {children}
    </button>
  )
}
