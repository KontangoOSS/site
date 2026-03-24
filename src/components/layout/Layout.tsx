import { CSSProperties, ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { theme } from '../../styles/theme'

export interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const mainStyle: CSSProperties = {
    minHeight: '100vh',
    background: theme.colors.background,
    color: theme.colors.textPrimary,
    paddingTop: '64px', // Navbar height
    display: 'flex',
    flexDirection: 'column',
  }

  const contentStyle: CSSProperties = {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  }

  return (
    <div style={mainStyle}>
      <Navbar />
      <main style={contentStyle}>{children}</main>
      <Footer />
    </div>
  )
}
