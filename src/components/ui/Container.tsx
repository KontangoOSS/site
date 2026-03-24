import { CSSProperties, ReactNode } from 'react'

export interface ContainerProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  style?: CSSProperties
}

export function Container({ children, size = 'lg', style }: ContainerProps) {
  const maxWidthMap = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
  }

  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth: maxWidthMap[size],
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 'min(24px, 5vw)',
    paddingRight: 'min(24px, 5vw)',
    boxSizing: 'border-box',
    ...style,
  }

  return <div style={containerStyle}>{children}</div>
}
