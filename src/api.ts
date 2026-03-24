import { Entry, CategoriesResponse, Stats, Tag } from './types'

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1'

async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}

export async function getEntries(): Promise<Entry[]> {
  return fetchJson<Entry[]>('/entries')
}

export async function getImages(): Promise<Entry[]> {
  return fetchJson<Entry[]>('/images')
}

export async function getContainers(): Promise<Entry[]> {
  return fetchJson<Entry[]>('/containers')
}

export async function getCategories(): Promise<CategoriesResponse> {
  return fetchJson<CategoriesResponse>('/categories')
}

export async function getTags(): Promise<Tag[]> {
  return fetchJson<Tag[]>('/tags')
}

export async function getStats(): Promise<Stats> {
  return fetchJson<Stats>('/stats')
}

export async function searchEntries(query: string): Promise<Entry[]> {
  return fetchJson<Entry[]>(`/search?q=${encodeURIComponent(query)}`)
}

export function getLogoUrl(entryId: string): string {
  return `${API_BASE}/logo/${entryId}`
}
