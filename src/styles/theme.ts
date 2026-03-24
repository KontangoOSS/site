// Design tokens for Kontango brand
export const theme = {
  colors: {
    // Primary brand colors
    primary: '#4a9eff',
    primaryDark: '#2563eb',
    primaryLight: '#93c5fd',

    // Tier colors
    basic: '#51cf66',
    intermediate: '#ffd43b',
    enterprise: '#4a9eff',

    // Neutrals
    background: '#0a0a0f',
    surface: '#141419',
    surfaceHover: '#1a1a22',
    border: '#27272a',

    // Text
    textPrimary: '#fafafa',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',

    // Semantic
    success: '#51cf66',
    warning: '#ffd43b',
    error: '#ef4444',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const

export type Theme = typeof theme
