// ISO Library API Types

export interface Entry {
  id: string
  name: string
  version: string
  codename: string
  arch: string
  chipset: string
  category: string
  maintainer: string
  live: boolean
  lts: boolean
  release_date: string
  support_end: string
  homepage: string
  tags: string[]
  type: 'image' | 'container'
  sizing?: Sizing
  sources?: Source[]
}

export interface Sizing {
  minimum: ResourceSpec
  recommended: ResourceSpec
  optimal: ResourceSpec
}

export interface ResourceSpec {
  disk: string
  ram: string
  cpu: number
}

export interface Source {
  name: string
  type: string
  target: string
  url: string
  last_verified: string
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface CategoriesResponse {
  images: Category[]
  containers: Category[]
}

export interface Tag {
  id: string
  name: string
  description: string
  color: string
  count: number
}

export interface Stats {
  total_entries: number
  total_images: number
  total_containers: number
  categories: Record<string, number>
  tags: Record<string, number>
}
