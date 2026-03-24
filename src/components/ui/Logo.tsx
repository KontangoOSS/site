import { CSSProperties } from 'react'
import { theme } from '../../styles/theme'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { box: 28, font: 14, text: 16 },
    md: { box: 36, font: 18, text: 20 },
    lg: { box: 48, font: 24, text: 28 },
  }

  const s = sizes[size]

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: size === 'sm' ? '8px' : '12px',
    textDecoration: 'none',
  }

  const logoBoxStyle: CSSProperties = {
    width: s.box,
    height: s.box,
    background: theme.colors.surface,
    border: `2px solid ${theme.colors.border}`,
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
    fontSize: s.font,
    fontWeight: 900,
    position: 'relative',
    overflow: 'hidden',
  }

  const asciiStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${theme.colors.basic} 0%, ${theme.colors.primary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.05em',
  }

  const textStyle: CSSProperties = {
    fontSize: s.text,
    fontWeight: 700,
    color: theme.colors.textPrimary,
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
    letterSpacing: '-0.02em',
  }

  // Scanline effect
  const scanlineStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.1) 2px,
      rgba(0, 0, 0, 0.1) 4px
    )`,
    pointerEvents: 'none',
  }

  // Corner accents
  const cornerStyle = (position: 'tl' | 'tr' | 'bl' | 'br'): CSSProperties => ({
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: position === 'tl' || position === 'br' ? theme.colors.basic : theme.colors.primary,
    ...(position === 'tl' && { top: 2, left: 2 }),
    ...(position === 'tr' && { top: 2, right: 2 }),
    ...(position === 'bl' && { bottom: 2, left: 2 }),
    ...(position === 'br' && { bottom: 2, right: 2 }),
  })

  return (
    <div style={containerStyle}>
      <div style={logoBoxStyle}>
        <span style={asciiStyle}>K</span>
        <div style={scanlineStyle} />
        <div style={cornerStyle('tl')} />
        <div style={cornerStyle('tr')} />
        <div style={cornerStyle('bl')} />
        <div style={cornerStyle('br')} />
      </div>
      {showText && (
        <span style={textStyle}>Kontango</span>
      )}
    </div>
  )
}
