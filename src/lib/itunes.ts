// iTunes Search API — public, no auth required, CORS-enabled
// Fetches all Miles Davis albums in 2 calls, matches by title, returns exact Apple Music URLs

interface iTunesArtist {
  wrapperType: 'artist'
  artistId: number
  artistName: string
  primaryGenreName: string
}

interface iTunesCollection {
  wrapperType: 'collection'
  collectionType: string
  artistId: number
  collectionId: number
  artistName: string
  collectionName: string
  collectionViewUrl: string
}

type iTunesResult = iTunesArtist | iTunesCollection | Record<string, unknown>

function norm(t: string): string {
  return t
    .toLowerCase()
    .replace(/[''ʼ`]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function matchScore(discTitle: string, itunesTitle: string): number {
  const a = norm(discTitle)
  const b = norm(itunesTitle)
  if (a === b) return 1
  if (a.startsWith(b) || b.startsWith(a)) return 0.9
  if (a.includes(b) || b.includes(a)) return 0.8
  const wa = new Set(a.split(' ').filter(w => w.length > 2))
  const wb = new Set(b.split(' ').filter(w => w.length > 2))
  const shared = [...wa].filter(w => wb.has(w)).length
  return shared / Math.max(wa.size, wb.size, 1)
}

export async function buildAppleLinks(titles: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>()

  const artistRes = await fetch(
    'https://itunes.apple.com/search?term=Miles+Davis&media=music&entity=musicArtist&limit=5'
  )
  const artistData = (await artistRes.json()) as { results: iTunesResult[] }
  const artist = artistData.results.find(
    (r): r is iTunesArtist =>
      (r as iTunesArtist).wrapperType === 'artist' &&
      (r as iTunesArtist).artistName === 'Miles Davis'
  )
  if (!artist) return map

  const lookupRes = await fetch(
    `https://itunes.apple.com/lookup?id=${artist.artistId}&entity=album&limit=500&country=us`
  )
  const lookupData = (await lookupRes.json()) as { results: iTunesResult[] }
  const albums = lookupData.results.filter(
    (r): r is iTunesCollection =>
      (r as iTunesCollection).wrapperType === 'collection' &&
      (r as iTunesCollection).collectionType === 'Album' &&
      (r as iTunesCollection).artistName === 'Miles Davis'
  )

  for (const title of titles) {
    let best = 0
    let bestUrl = ''
    for (const album of albums) {
      const score = matchScore(title, album.collectionName)
      if (score > best) {
        best = score
        bestUrl = album.collectionViewUrl.split('?')[0]
      }
    }
    if (best >= 0.65 && bestUrl) {
      map.set(title, bestUrl)
    }
  }

  return map
}

export function appleSearchUrl(title: string): string {
  return `https://music.apple.com/us/search?term=${encodeURIComponent(`Miles Davis ${title}`)}`
}
