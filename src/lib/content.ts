import type { Album, Era, Quote, GlobalSettings } from './types'

// Framework-agnostic content loader for @webhouse/cms filesystem adapter
// Documents live in content/{collection}/{slug}.json

// Vite's import.meta.glob allows static analysis of content files
const albumFiles = import.meta.glob('/content/albums/*.json', { eager: true }) as Record<string, { default: { slug: string; status: string; data: Album } }>
const eraFiles = import.meta.glob('/content/eras/*.json', { eager: true }) as Record<string, { default: { slug: string; status: string; data: Era } }>
const quoteFiles = import.meta.glob('/content/quotes/*.json', { eager: true }) as Record<string, { default: { slug: string; status: string; data: Quote } }>
const globalFiles = import.meta.glob('/content/global/*.json', { eager: true }) as Record<string, { default: { slug: string; status: string; data: GlobalSettings } }>

function published<T>(files: Record<string, { default: { slug: string; status: string; data: T } }>) {
  return Object.values(files)
    .map(m => m.default)
    .filter(doc => doc.status === 'published')
}

export function getAlbums(): Array<{ slug: string; data: Album }> {
  return published<Album>(albumFiles).sort((a, b) => a.data.year - b.data.year)
}

export function getAlbum(slug: string): { slug: string; data: Album } | null {
  return published<Album>(albumFiles).find(d => d.slug === slug) ?? null
}

export function getEras(): Array<{ slug: string; data: Era }> {
  return published<Era>(eraFiles).sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0))
}

export function getEra(slug: string): { slug: string; data: Era } | null {
  return published<Era>(eraFiles).find(d => d.slug === slug) ?? null
}

export function getQuotes(): Array<{ slug: string; data: Quote }> {
  return published<Quote>(quoteFiles)
}

export function getGlobal(): GlobalSettings | null {
  const docs = published<GlobalSettings>(globalFiles)
  return docs[0]?.data ?? null
}
