import { Stats } from '../types'

interface HeaderProps {
  stats: Stats | null
}

export function Header({ stats }: HeaderProps) {
  return (
    <header
      style={{
        padding: '24px 24px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}
        >
          ISO Library
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: '14px', marginBottom: '16px' }}>
          Container and image catalog for Kustodian deployments
        </p>

        {stats && (
          <div style={{ display: 'flex', gap: '24px' }}>
            <StatItem label="Total" value={stats.total_entries} />
            <StatItem label="Images" value={stats.total_images} color="#f97316" />
            <StatItem label="Containers" value={stats.total_containers} color="#a855f7" />
          </div>
        )}
      </div>
    </header>
  )
}

function StatItem({ label, value, color = '#818cf8' }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <span style={{ fontSize: '24px', fontWeight: 700, color }}>{value}</span>
      <span style={{ fontSize: '12px', color: '#71717a', marginLeft: '6px' }}>{label}</span>
    </div>
  )
}
