// MusicKit.js v3 — catalog search (no user auth required, only developer token)
// Load VITE_APPLE_MUSIC_DEV_TOKEN in .env.local to enable catalog lookups.
// Without the token, appleSearchUrl() is used as fallback.

interface MusicKitAlbum {
  id: string
  attributes: {
    name: string
    artistName: string
    url: string
  }
}

interface MusicKitSearchResponse {
  data: {
    results: {
      albums?: { data: MusicKitAlbum[] }
    }
  }
}

interface MusicKitInstance {
  api: {
    music: (path: string, params: Record<string, string | number>) => Promise<MusicKitSearchResponse>
  }
}

declare global {
  interface Window {
    MusicKit: {
      configure: (config: {
        developerToken: string
        app: { name: string; build: string }
      }) => Promise<void>
      getInstance: () => MusicKitInstance
    }
  }
}

let scriptLoaded = false
let musicKitReady = false

async function loadScript(): Promise<void> {
  if (scriptLoaded) return
  return new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = 'https://js-cdn.music.apple.com/musickit/v3/musickit.js'
    el.crossOrigin = 'anonymous'
    el.onload = () => { scriptLoaded = true; resolve() }
    el.onerror = () => reject(new Error('Failed to load MusicKit.js'))
    document.head.appendChild(el)
  })
}

export async function initMusicKit(developerToken: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  if (musicKitReady) return true
  try {
    await loadScript()
    await window.MusicKit.configure({
      developerToken,
      app: { name: 'Miles Davis Tribute', build: '1.0' },
    })
    musicKitReady = true
    return true
  } catch {
    return false
  }
}

export async function searchAlbumUrl(title: string): Promise<string | null> {
  if (!musicKitReady || typeof window === 'undefined') return null
  try {
    const response = await window.MusicKit.getInstance().api.music(
      '/v1/catalog/us/search',
      { term: `Miles Davis ${title}`, types: 'albums', limit: 1 },
    )
    return response.data.results.albums?.data?.[0]?.attributes?.url ?? null
  } catch {
    return null
  }
}

export function appleSearchUrl(title: string): string {
  return `https://music.apple.com/search?term=${encodeURIComponent(`Miles Davis ${title}`)}`
}
