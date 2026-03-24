import { CSSProperties, useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

interface SourceInfo {
  name: string
  bestFor: string
  savings: string
  tip: string
}

const sources: SourceInfo[] = [
  { name: 'Goodwill / Arc Thrift', bestFor: 'Laptops, desktops, monitors', savings: '70-90%', tip: 'Check daily, inventory varies' },
  { name: 'Facebook Marketplace', bestFor: 'Complete systems, networking', savings: '50-80%', tip: 'Search "server", "network switch"' },
  { name: 'eBay', bestFor: 'Specific parts, enterprise gear', savings: '60-85%', tip: 'Filter by "seller refurbished"' },
  { name: 'r/homelabsales', bestFor: 'Homelab-ready equipment', savings: '50-70%', tip: 'Great community, fair prices' },
  { name: 'University Surplus', bestFor: 'Enterprise servers, workstations', savings: '80-95%', tip: 'End of semester = best deals' },
  { name: 'GovPlanet / Public Surplus', bestFor: 'Bulk enterprise equipment', savings: '90%+', tip: 'Auctions, requires patience' },
]

interface HardwareType {
  icon: string
  title: string
  description: string
  examples: string[]
  priceRange: string
  bestFor: string
}

const hardwareTypes: HardwareType[] = [
  {
    icon: '💻',
    title: 'Old Laptops',
    description: 'Business-class laptops make excellent low-power servers with built-in UPS (battery).',
    examples: ['ThinkPad T/X/P Series', 'Dell Latitude/Precision', 'HP EliteBook/ZBook'],
    priceRange: '$30-150',
    bestFor: 'Docker host, Pi-hole, K3s nodes',
  },
  {
    icon: '🖥️',
    title: 'Office Desktops',
    description: 'Small form factor PCs are perfect firewalls. Add a dual NIC card for $20-40.',
    examples: ['Dell Optiplex 3050/5050/7050', 'HP ProDesk 400/600', 'Lenovo ThinkCentre'],
    priceRange: '$40-150',
    bestFor: 'OPNsense firewall, DNS, light apps',
  },
  {
    icon: '🖧',
    title: 'Workstations',
    description: 'Enterprise workstations with ECC RAM handle heavy workloads reliably.',
    examples: ['Dell Precision T-series', 'HP Z2/Z4/Z6', 'Lenovo ThinkStation'],
    priceRange: '$100-300',
    bestFor: 'Databases, production workloads',
  },
  {
    icon: '🏢',
    title: 'Enterprise Servers',
    description: 'Decommissioned datacenter gear at 80-90% off. High performance, built for 24/7.',
    examples: ['Dell PowerEdge R630/R640', 'HP ProLiant DL360/380', 'Supermicro'],
    priceRange: '$300-1500',
    bestFor: 'HA clusters, Kubernetes, storage',
  },
]

interface BuildInfo {
  tier: string
  icon: string
  color: string
  components: { name: string; source: string; price: string }[]
  total: string
  vsNew?: string
}

const builds: BuildInfo[] = [
  {
    tier: 'Basic',
    icon: '🏠',
    color: theme.colors.basic,
    components: [
      { name: 'Firewall: Dell Optiplex SFF + NIC', source: 'Goodwill/eBay', price: '$50-80' },
      { name: 'Server: Old ThinkPad or Mini PC', source: 'Facebook/eBay', price: '$75-150' },
      { name: 'Storage: External USB drives', source: 'Any', price: '$50-100' },
      { name: 'Network: Gigabit switch', source: 'Thrift store', price: '$10-20' },
    ],
    total: '$185-350',
  },
  {
    tier: 'Intermediate',
    icon: '🏢',
    color: theme.colors.intermediate,
    components: [
      { name: 'Firewall: Protectli or SFF + quad NIC', source: 'eBay', price: '$150-250' },
      { name: 'Server: Dell Precision/HP Z workstation', source: 'Surplus', price: '$150-300' },
      { name: 'Storage: Used Synology or DIY NAS', source: 'eBay/build', price: '$200-400' },
      { name: 'Network: Managed switch + AP', source: 'eBay', price: '$50-100' },
    ],
    total: '$550-1,050',
  },
  {
    tier: 'Enterprise',
    icon: '🏛️',
    color: theme.colors.enterprise,
    components: [
      { name: 'Firewall: Enterprise appliance or HA pair', source: 'ITAD', price: '$500-1,500' },
      { name: 'Compute: 3x Dell R640/HP DL380', source: 'Surplus auction', price: '$1,500-4,000' },
      { name: 'Storage: Enterprise NAS or SAN', source: 'ITAD/surplus', price: '$1,000-3,000' },
      { name: 'Network: 10GbE + managed switches', source: 'eBay/surplus', price: '$300-800' },
    ],
    total: '$3,300-9,300',
    vsNew: 'vs. $28,000-50,000 new',
  },
]

export function Hardware() {
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

  const sectionTitleStyle: CSSProperties = {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  }

  const sectionSubtitleStyle: CSSProperties = {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  const impactBoxStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
    background: `linear-gradient(135deg, rgba(81, 207, 102, 0.1) 0%, rgba(74, 158, 255, 0.1) 100%)`,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xxxl,
    textAlign: 'center',
  }

  const impactStatStyle: CSSProperties = {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.success,
    marginBottom: theme.spacing.xs,
  }

  const impactLabelStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  }

  const sourcesGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxxl,
  }

  const sourceCardStyle: CSSProperties = {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  }

  const hardwareGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xxxl,
  }

  const hardwareCardStyle: CSSProperties = {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
  }

  const buildsGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xxxl,
  }

  const checklistStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.xxxl,
  }

  return (
    <Container size="xl">
      <div style={headerStyle}>
        <h1 style={titleStyle}>Sustainable Hardware Sourcing</h1>
        <p style={subtitleStyle}>
          Give hardware a second life. Repurposed equipment reduces e-waste,
          cuts costs by 70-90%, and often outperforms budget new hardware.
        </p>
      </div>

      <div style={impactBoxStyle}>
        <div>
          <div style={impactStatStyle}>~500kg</div>
          <div style={impactLabelStyle}>CO2 saved per server reused</div>
        </div>
        <div>
          <div style={impactStatStyle}>70-90%</div>
          <div style={impactLabelStyle}>Cost savings vs new</div>
        </div>
        <div>
          <div style={impactStatStyle}>3-5 yrs</div>
          <div style={impactLabelStyle}>Extended hardware life</div>
        </div>
      </div>

      <h2 style={sectionTitleStyle}>Where to Find Hardware</h2>
      <p style={sectionSubtitleStyle}>
        From thrift stores to government surplus auctions, quality hardware is everywhere.
      </p>
      <div style={sourcesGridStyle}>
        {sources.map((source) => (
          <div key={source.name} style={sourceCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm }}>
              <div style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.semibold, color: theme.colors.textPrimary }}>
                {source.name}
              </div>
              <div style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.success }}>
                {source.savings}
              </div>
            </div>
            <div style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, marginBottom: theme.spacing.xs }}>
              Best for: {source.bestFor}
            </div>
            <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted }}>
              Tip: {source.tip}
            </div>
          </div>
        ))}
      </div>

      <h2 style={sectionTitleStyle}>Hardware Transformation Guide</h2>
      <p style={sectionSubtitleStyle}>
        Turn yesterday's office equipment into tomorrow's infrastructure.
      </p>
      <div style={hardwareGridStyle}>
        {hardwareTypes.map((hw) => (
          <div key={hw.title} style={hardwareCardStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: theme.spacing.md }}>
              <div style={{ fontSize: '40px' }}>{hw.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.xs }}>
                  <div style={{ fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold, color: theme.colors.textPrimary }}>
                    {hw.title}
                  </div>
                  <div style={{ fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.colors.primary }}>
                    {hw.priceRange}
                  </div>
                </div>
                <p style={{ fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, marginBottom: theme.spacing.md, lineHeight: 1.5 }}>
                  {hw.description}
                </p>
                <div style={{ marginBottom: theme.spacing.sm }}>
                  <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted, marginBottom: theme.spacing.xs }}>
                    Recommended models:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.xs }}>
                    {hw.examples.map((ex) => (
                      <span key={ex} style={{
                        fontSize: theme.fontSize.xs,
                        background: 'rgba(74, 158, 255, 0.1)',
                        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                        borderRadius: theme.borderRadius.sm,
                        color: theme.colors.textSecondary,
                      }}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.success }}>
                  Best for: {hw.bestFor}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={sectionTitleStyle}>Recommended Builds by Tier</h2>
      <p style={sectionSubtitleStyle}>
        Complete shopping lists for each infrastructure level.
      </p>
      <div style={buildsGridStyle}>
        {builds.map((build) => (
          <Card key={build.tier} variant="bordered" padding="lg" style={{ borderTop: `3px solid ${build.color}` }}>
            <div style={{ fontSize: '40px', marginBottom: theme.spacing.md }}>{build.icon}</div>
            <div style={{ fontSize: theme.fontSize['2xl'], fontWeight: theme.fontWeight.bold, color: build.color, marginBottom: theme.spacing.lg }}>
              {build.tier}
            </div>
            <div style={{ marginBottom: theme.spacing.lg }}>
              {build.components.map((comp, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: theme.fontSize.sm,
                  marginBottom: theme.spacing.sm,
                  paddingBottom: theme.spacing.sm,
                  borderBottom: i < build.components.length - 1 ? `1px solid ${theme.colors.border}` : 'none',
                }}>
                  <div style={{ color: theme.colors.textSecondary }}>{comp.name}</div>
                  <div style={{ color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium }}>{comp.price}</div>
                </div>
              ))}
            </div>
            <div style={{
              background: 'rgba(81, 207, 102, 0.1)',
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold, color: theme.colors.success }}>
                {build.total}
              </div>
              {build.vsNew && (
                <div style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted, marginTop: theme.spacing.xs }}>
                  {build.vsNew}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <h2 style={sectionTitleStyle}>Sourcing Checklist</h2>
      <div style={checklistStyle}>
        <Card variant="bordered" padding="lg">
          <div style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.success, marginBottom: theme.spacing.lg }}>
            ✓ Green Flags
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              '"Pulled from working environment"',
              'Corporate lease returns',
              'University/government surplus',
              'Seller has multiple units (bulk decommission)',
              'Original box/documentation',
            ].map((item) => (
              <li key={item} style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                marginBottom: theme.spacing.sm,
                fontSize: theme.fontSize.sm,
                color: theme.colors.textSecondary,
              }}>
                <span style={{ color: theme.colors.success }}>✓</span> {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card variant="bordered" padding="lg">
          <div style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.error, marginBottom: theme.spacing.lg }}>
            ✗ Red Flags
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Swollen batteries in laptops',
              'Loud fans (bearings wearing out)',
              'Physical damage to ports',
              '"For parts" listings',
              'No return policy on expensive items',
            ].map((item) => (
              <li key={item} style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                marginBottom: theme.spacing.sm,
                fontSize: theme.fontSize.sm,
                color: theme.colors.textSecondary,
              }}>
                <span style={{ color: theme.colors.error }}>✗</span> {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div style={{
        textAlign: 'center',
        padding: theme.spacing.xxl,
        background: `linear-gradient(135deg, rgba(81, 207, 102, 0.1) 0%, rgba(74, 158, 255, 0.1) 100%)`,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.xxxl,
      }}>
        <div style={{ fontSize: theme.fontSize.xl, fontStyle: 'italic', color: theme.colors.textSecondary, marginBottom: theme.spacing.lg }}>
          "The greenest hardware is the hardware that already exists."
        </div>
        <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center' }}>
          <Button variant="primary" size="lg" href="/guide">
            Start Building
          </Button>
          <Button variant="outline" size="lg" href="https://github.com/KontangoOSS">
            View Source
          </Button>
        </div>
      </div>
    </Container>
  )
}
