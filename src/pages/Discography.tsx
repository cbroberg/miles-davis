import { useState, useEffect } from 'preact/hooks'
import { DISCOGRAPHY, ERA_LABELS, ERA_YEARS, type DiscographyEntry, type EraSlug } from '../data/discography'
import { initMusicKit, searchAlbumUrl, appleSearchUrl } from '../lib/musickit'

const ERA_ORDER: EraSlug[] = ['bebop', 'birth-of-the-cool', 'hard-bop', 'modal', 'electric']

const TYPE_LABEL: Record<string, string> = {
  studio: 'Studio',
  live: 'Live',
  compilation: 'Comp.',
}

function groupByEra(albums: DiscographyEntry[]): Array<{ era: EraSlug; albums: DiscographyEntry[] }> {
  return ERA_ORDER.map(era => ({
    era,
    albums: albums.filter(a => a.era === era),
  })).filter(g => g.albums.length > 0)
}

function AppleMusicLink({ title, url, searching }: { title: string; url: string | null; searching: boolean }) {
  const href = url ?? appleSearchUrl(title)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.6875rem',
        letterSpacing: '0.05em',
        color: url ? '#e8e4d9' : '#8a8478',
        border: `1px solid ${url ? '#4a3e18' : '#2a2820'}`,
        padding: '0.25rem 0.625rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'color 0.2s, border-color 0.2s',
        opacity: searching ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = '#b8962e'
        el.style.borderColor = '#7a6020'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = url ? '#e8e4d9' : '#8a8478'
        el.style.borderColor = url ? '#4a3e18' : '#2a2820'
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.726-.69c-.49-.09-.987-.128-1.48-.144-.35-.01-.7-.01-1.05-.01H6.668c-.35 0-.7 0-1.05.01-.49.016-.99.055-1.48.144a5.023 5.023 0 00-1.726.69C1.296 1.624.55 2.624.234 3.934a9.23 9.23 0 00-.24 2.19C-.006 6.474 0 6.824 0 7.174v9.66c0 .35.006.7.016 1.05.017.49.055.99.144 1.48.317 1.31 1.062 2.31 2.18 3.043a5.023 5.023 0 001.726.69c.49.09.99.128 1.48.144.35.01.7.01 1.05.01h10.662c.35 0 .7 0 1.05-.01.49-.016.99-.055 1.48-.144a5.022 5.022 0 001.726-.69c1.118-.733 1.863-1.733 2.18-3.043.09-.49.128-.99.144-1.48.01-.35.016-.7.016-1.05V7.174c0-.35-.006-.7-.022-1.05zM11.977 17.75l-4.978-2.9v-5.8l4.978-2.9 4.978 2.9v5.8l-4.978 2.9z"/>
      </svg>
      {searching ? 'Søger…' : url ? 'Apple Music ↗' : 'Søg på Apple Music ↗'}
    </a>
  )
}

export function Discography() {
  const devToken = typeof import.meta !== 'undefined'
    ? (import.meta.env as Record<string, string>).VITE_APPLE_MUSIC_DEV_TOKEN
    : undefined

  const [amLinks, setAmLinks] = useState<Record<string, string>>({})
  const [searching, setSearching] = useState(false)
  const [mkReady, setMkReady] = useState(false)

  useEffect(() => {
    if (!devToken) return

    let cancelled = false

    async function run() {
      setSearching(true)
      const ok = await initMusicKit(devToken as string)
      if (!ok || cancelled) { setSearching(false); return }
      setMkReady(true)

      const results: Record<string, string> = {}
      await Promise.allSettled(
        DISCOGRAPHY.map(async (album) => {
          const url = await searchAlbumUrl(album.title)
          if (url && !cancelled) results[album.title] = url
        })
      )

      if (!cancelled) {
        setAmLinks(results)
        setSearching(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [devToken])

  const groups = groupByEra(DISCOGRAPHY)

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8962e', marginBottom: '0.75rem' }}>
        Listen chronologically
      </p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#e8e4d9', margin: '0 0 0.75rem' }}>
        Discography
      </h1>
      <p style={{ color: '#8a8478', fontSize: '0.9375rem', margin: '0 0 3.5rem', maxWidth: '560px', lineHeight: '1.6' }}>
        {DISCOGRAPHY.length} udgivelser fra 1956 til 1992, sorteret kronologisk efter udgivelsesår.
        {devToken
          ? mkReady
            ? ' Apple Music-links hentet via MusicKit.js.'
            : searching
              ? ' Henter Apple Music-links…'
              : ' Klar til MusicKit.js.'
          : ' Sæt VITE_APPLE_MUSIC_DEV_TOKEN for direkte Apple Music-links via MusicKit.js.'}
      </p>

      {groups.map(({ era, albums }) => (
        <section key={era} style={{ marginBottom: '3.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            borderBottom: '1px solid #2a2820',
            paddingBottom: '0.75rem',
            marginBottom: '0',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: '#e8e4d9',
              margin: '0',
            }}>
              {ERA_LABELS[era]}
            </h2>
            <span style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', color: '#5a5448', textTransform: 'uppercase' }}>
              {ERA_YEARS[era]}
            </span>
          </div>

          {albums.map((album) => (
            <div
              key={album.title}
              style={{
                display: 'grid',
                gridTemplateColumns: '3.5rem 1fr auto',
                gap: '1rem',
                alignItems: 'center',
                padding: '0.875rem 0',
                borderBottom: '1px solid #1e1c18',
              }}
            >
              <span style={{
                fontSize: '0.8125rem',
                color: '#5a5448',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.03em',
              }}>
                {album.year}
              </span>

              <div>
                <span style={{
                  fontSize: '0.9375rem',
                  color: album.notable ? '#e8e4d9' : '#a09890',
                  fontFamily: album.notable ? 'var(--font-serif)' : 'inherit',
                  fontWeight: album.notable ? 'normal' : 'normal',
                  marginRight: '0.75rem',
                }}>
                  {album.notable && (
                    <span style={{ color: '#b8962e', marginRight: '0.4rem', fontSize: '0.6875rem' }}>★</span>
                  )}
                  {album.title}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#5a5448', marginRight: '0.5rem' }}>
                  {album.label}
                </span>
                <span style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#3a3830',
                  border: '1px solid #2a2820',
                  padding: '0.0625rem 0.375rem',
                }}>
                  {TYPE_LABEL[album.type]}
                </span>
              </div>

              <AppleMusicLink
                title={album.title}
                url={amLinks[album.title] ?? null}
                searching={searching}
              />
            </div>
          ))}
        </section>
      ))}

      <p style={{ fontSize: '0.75rem', color: '#3a3830', marginTop: '2rem', lineHeight: '1.8' }}>
        ★ Fremhævede udgivelser er særligt anbefalet som startpunkt.
        Live- og kompilationsalbum er medtaget men markeret separat.
      </p>

      <style>{`
        @media (max-width: 600px) {
          .discography-row {
            grid-template-columns: 3rem 1fr !important;
          }
          .discography-link {
            grid-column: 2;
            margin-top: -0.25rem;
          }
        }
      `}</style>
    </div>
  )
}
