import { CSSProperties, useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { CTA } from '../components/sections/CTA'

export function About() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxl,
  }

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize['5xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: theme.fontSize.xl,
    color: theme.colors.textSecondary,
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
  }

  const sectionStyle: CSSProperties = {
    paddingBottom: theme.spacing.xxxl,
  }

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: theme.spacing.xxl,
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  }

  const contentStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    lineHeight: 1.8,
  }

  const headingStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.textPrimary,
  }

  const valuesGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xxl,
  }

  const valueIconStyle: CSSProperties = {
    fontSize: '48px',
    marginBottom: theme.spacing.md,
  }

  const valueTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
  }

  const valueDescStyle: CSSProperties = {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 1.6,
  }

  return (
    <>
      <Container size="xl">
        <div style={headerStyle}>
          <h1 style={titleStyle}>Open Source Infrastructure</h1>
          <p style={subtitleStyle}>
            Kontango is a community-driven project helping people transform
            old hardware into enterprise-grade infrastructure using 100% open source tools.
          </p>
        </div>

        <div style={sectionStyle}>
          <div style={gridStyle}>
            <div>
              <h2 style={headingStyle}>The Project</h2>
              <p style={contentStyle}>
                Kontango started as a personal documentation project for building
                self-hosted infrastructure. It grew into a comprehensive guide for
                transforming old or surplus hardware into production-ready systems.
              </p>
              <p style={{ ...contentStyle, marginTop: theme.spacing.md }}>
                Everything is open source. Clone it, fork it, contribute to it.
                The documentation, configurations, and automation scripts are all
                available on our self-hosted Git and GitHub.
              </p>
              <div style={{ display: 'flex', gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
                <Button variant="primary" href="https://github.com/KontangoOSS">
                  github.com/KontangoOSS
                </Button>
                <Button variant="outline" href="https://github.com/KontangoOSS">
                  GitHub
                </Button>
              </div>
            </div>
            <Card variant="elevated" padding="lg">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: theme.spacing.md }}>♻️</div>
                <div style={{ fontSize: theme.fontSize['3xl'], fontWeight: theme.fontWeight.bold, marginBottom: theme.spacing.sm }}>
                  Repurpose
                </div>
                <div style={{ color: theme.colors.textSecondary }}>
                  Old hardware becomes enterprise infrastructure
                </div>
              </div>
            </Card>
          </div>

          <div style={gridStyle}>
            <Card variant="elevated" padding="lg">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: theme.spacing.md }}>🔓</div>
                <div style={{ fontSize: theme.fontSize['3xl'], fontWeight: theme.fontWeight.bold, marginBottom: theme.spacing.sm }}>
                  100%
                </div>
                <div style={{ color: theme.colors.textSecondary }}>
                  Open source software stack
                </div>
              </div>
            </Card>
            <div>
              <h2 style={headingStyle}>Why Self-Hosting?</h2>
              <p style={contentStyle}>
                Companies like 37signals (Basecamp/HEY) saved $7M+ over 5 years by
                leaving the cloud. But you don't need to be a big company to benefit.
                Home labbers and small teams save thousands annually.
              </p>
              <p style={{ ...contentStyle, marginTop: theme.spacing.md }}>
                With modern open source tools like OPNsense, Docker, Kubernetes, and
                NetBird, self-hosting is more accessible than ever. The skills you
                build transfer directly to industry careers.
              </p>
            </div>
          </div>

          <h2 style={{ ...headingStyle, textAlign: 'center', marginTop: theme.spacing.xxxl }}>
            Our Values
          </h2>
          <div style={valuesGridStyle}>
            <Card variant="bordered" padding="lg">
              <div style={valueIconStyle}>🔓</div>
              <h3 style={valueTitleStyle}>Open Source First</h3>
              <p style={valueDescStyle}>
                We build on and contribute to open source projects.
                No proprietary lock-in. Your skills transfer everywhere.
              </p>
            </Card>
            <Card variant="bordered" padding="lg">
              <div style={valueIconStyle}>📈</div>
              <h3 style={valueTitleStyle}>Growth Without Limits</h3>
              <p style={valueDescStyle}>
                Start where you are. Scale when ready. Your automation
                investments compound as you grow.
              </p>
            </Card>
            <Card variant="bordered" padding="lg">
              <div style={valueIconStyle}>🎓</div>
              <h3 style={valueTitleStyle}>Learn While You Build</h3>
              <p style={valueDescStyle}>
                Every service you deploy is a skill on your resume.
                Industry-standard tools that translate to career value.
              </p>
            </Card>
          </div>
        </div>
      </Container>
      <CTA />
    </>
  )
}
