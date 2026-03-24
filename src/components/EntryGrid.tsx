import { useState } from 'react'
import { Entry, CategoriesResponse } from '../types'
import { EntryCard } from './EntryCard'

interface EntryGridProps {
  entries: Entry[]
  categories: CategoriesResponse | null
}

export function EntryGrid({ entries, categories }: EntryGridProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'containers'>('all')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredEntries = entries.filter((entry) => {
    if (activeTab === 'images' && entry.type !== 'image') return false
    if (activeTab === 'containers' && entry.type !== 'container') return false
    if (selectedCategory && entry.category !== selectedCategory) return false
    return true
  })

  const allCategories = categories
    ? [...categories.images, ...categories.containers]
    : []

  const uniqueCategories = allCategories.filter(
    (cat, index, self) => index === self.findIndex((c) => c.id === cat.id)
  )

  return (
    <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['all', 'images', 'containers'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === tab ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === tab ? '#818cf8' : '#a1a1aa',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            background: !selectedCategory ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: !selectedCategory ? '#818cf8' : '#71717a',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.2s'
          }}
        >
          All Categories
        </button>
        {uniqueCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: selectedCategory === cat.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              color: selectedCategory === cat.id ? '#818cf8' : '#71717a',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ color: '#71717a', fontSize: '14px', marginBottom: '16px' }}>
        {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
      </p>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}
      >
        {filteredEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#71717a' }}>
          No entries found
        </div>
      )}
    </main>
  )
}
