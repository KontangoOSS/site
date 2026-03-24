import { useState, useEffect } from 'react'
import { Entry, CategoriesResponse, Stats } from '../types'
import { getEntries, getCategories, getStats } from '../api'

interface UseIsoLibraryResult {
  entries: Entry[]
  categories: CategoriesResponse | null
  stats: Stats | null
  loading: boolean
  error: string | null
}

export function useIsoLibrary(): UseIsoLibraryResult {
  const [entries, setEntries] = useState<Entry[]>([])
  const [categories, setCategories] = useState<CategoriesResponse | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [entriesData, categoriesData, statsData] = await Promise.all([
          getEntries(),
          getCategories(),
          getStats()
        ])
        setEntries(entriesData)
        setCategories(categoriesData)
        setStats(statsData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { entries, categories, stats, loading, error }
}
