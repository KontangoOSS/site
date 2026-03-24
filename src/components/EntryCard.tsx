import { Entry } from '../types'
import { getLogoUrl } from '../api'

interface EntryCardProps {
  entry: Entry
}

const categoryColors: Record<string, string> = {
  linux: '#FCC624',
  bsd: '#AB2B28',
  windows: '#0078D4',
  macos: '#000000',
  unix: '#4B0082',
  utilities: '#6B7280',
  virtualization: '#00A4EF',
  databases: '#336791',
  web: '#47A248',
  messaging: '#FF6600',
  monitoring: '#E6522C',
  devops: '#2088FF',
  storage: '#FF9900',
  networking: '#00BCB4',
  security: '#D93F0B',
  media: '#E50914',
  development: '#3178C6'
}

export function EntryCard({ entry }: EntryCardProps) {
  const color = categoryColors[entry.category] || '#6366f1'

  return (
    <a
      href={entry.homepage}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
        e.currentTarget.style.borderColor = color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <img
          src={getLogoUrl(entry.id)}
          alt={entry.name}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            objectFit: 'contain',
            background: 'rgba(255,255,255,0.1)',
            padding: '4px'
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
            {entry.name}
          </h3>
          <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
            v{entry.version}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {entry.lts && (
          <span style={{
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            background: '#22c55e20',
            color: '#22c55e',
            fontWeight: 500
          }}>
            LTS
          </span>
        )}
        {entry.live && (
          <span style={{
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            background: '#3b82f620',
            color: '#3b82f6',
            fontWeight: 500
          }}>
            LIVE
          </span>
        )}
        <span style={{
          fontSize: '10px',
          padding: '2px 6px',
          borderRadius: '4px',
          background: entry.type === 'container' ? '#a855f720' : '#f9731620',
          color: entry.type === 'container' ? '#a855f7' : '#f97316',
          fontWeight: 500
        }}>
          {entry.type.toUpperCase()}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {entry.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#a1a1aa'
            }}
          >
            {tag}
          </span>
        ))}
        {entry.tags.length > 3 && (
          <span style={{ fontSize: '11px', color: '#71717a' }}>
            +{entry.tags.length - 3}
          </span>
        )}
      </div>
    </a>
  )
}
