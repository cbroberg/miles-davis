import { useState, useEffect } from 'preact/hooks'
import { DISCOGRAPHY, ERA_LABELS, ERA_YEARS, type DiscographyEntry, type EraSlug } from '../data/discography'
import { buildAppleLinks, appleSearchUrl } from '../lib/itunes'

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

function AppleMusicBtn({
  title,
  url,
  loading,
}: {
  title: string
  url: string | undefined
  loading: boolean
}) {
  const href = url ?? appleSearchUrl(title)
  const resolved = !!url

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={resolved ? `Åbn "${title}" på Apple Music` : `Søg efter "${title}" på Apple Music`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontSize: '0.6875rem',
        letterSpacing: '0.04em',
        color: resolved ? '#c8a84e' : '#5a5448',
        border: `1px solid ${resolved ? '#4a3e18' : '#2a2820'}`,
        padding: '0.25rem 0.625rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'color 0.15s, border-color 0.15s, background 0.15s',
        opacity: loading ? 0.4 : 1,
        background: 'transparent',
        cursor: loading ? 'default' : 'pointer',
      }}
      onMouseEnter={(e) => {
        if (loading) return
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = '#e8c870'
        el.style.borderColor = '#7a6020'
        el.style.background = '#1a1710'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = resolved ? '#c8a84e' : '#5a5448'
        el.style.borderColor = resolved ? '#4a3e18' : '#2a2820'
        el.style.background = 'transparent'
      }}
      onClick={(e) => { if (loading) e.preventDefault() }}
    >
      {/* Apple Music logo mark */}
      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.726-.69c-.49-.09-.987-.128-1.48-.144-.35-.01-.7-.01-1.05-.01H6.668c-.35 0-.7 0-1.05.01-.49.016-.99.055-1.48.144a5.023 5.023 0 00-1.726.69C1.296 1.624.55 2.624.234 3.934a9.23 9.23 0 00-.24 2.19C-.006 6.474 0 6.824 0 7.174v9.66c0 .35.006.7.016 1.05.017.49.055.99.144 1.48.317 1.31 1.062 2.31 2.18 3.043a5.023 5.023 0 001.726.69c.49.09.99.128 1.48.144.35.01.7.01 1.05.01h10.662c.35 0 .7 0 1.05-.01.49-.016.99-.055 1.48-.144a5.022 5.022 0 001.726-.69c1.118-.733 1.863-1.733 2.18-3.043.09-.49.128-.99.144-1.48.01-.35.016-.7.016-1.05V7.174c0-.35-.006-.7-.022-1.05zM11.977 17.75l-4.978-2.9v-5.8l4.978-2.9 4.978 2.9v5.8l-4.978 2.9z" />
      </svg>
      {loading ? 'Henter…' : resolved ? 'Apple Music ↗' : 'Søg ↗'}
    </a>
  )
}

export function Discography() {
  const [amLinks, setAmLinks] = useState<Map<string, string>>(new Map())
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  useEffect(() => {
    if (typeof window === 'undefined') return
    setStatus('loading')
    const titles = DISCOGRAPHY.map(a => a.title)
    buildAppleLinks(titles)
      .then(map => {
        setAmLinks(map)
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [])

  const groups = groupByEra(DISCOGRAPHY)
  const found = amLinks.size
  const loading = status === 'loading'

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8962e', marginBottom: '0.75rem' }}>
        Listen chronologically
      </p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#e8e4d9', margin: '0 0 0.75rem' }}>
        Discography
      </h1>
      <p style={{ color: '#8a8478', fontSize: '0.9375rem', margin: '0 0 3.5rem', maxWidth: '560px', lineHeight: '1.6' }}>
        {DISCOGRAPHY.length} udgivelser 1956–1992, kronologisk.{' '}
        {status === 'idle' && ''}
        {status === 'loading' && <span style={{ color: '#5a5448' }}>Henter Apple Music-links…</span>}
        {status === 'done' && (
          <span style={{ color: '#5a5448' }}>
            {found} af {DISCOGRAPHY.length} album fundet på Apple Music.
          </span>
        )}
        {status === 'error' && <span style={{ color: '#7a3030' }}>Apple Music-lookup fejlede.</span>}
      </p>

      {groups.map(({ era, albums }) => (
        <section key={era} style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            borderBottom: '1px solid #2a2820',
            paddingBottom: '0.75rem',
            marginBottom: '0',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#e8e4d9', margin: 0 }}>
              {ERA_LABELS[era]}
            </h2>
            <span style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', color: '#3a3830', textTransform: 'uppercase' }}>
              {ERA_YEARS[era]}
            </span>
          </div>

          {albums.map((album) => (
            <div
              key={album.title}
              style={{
                display: 'grid',
                gridTemplateColumns: '3.5rem 1fr auto',
                gap: '1.25rem',
                alignItems: 'center',
                padding: '0.8rem 0',
                borderBottom: '1px solid #191714',
              }}
            >
              <span style={{
                fontSize: '0.8125rem',
                color: '#4a4840',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.02em',
              }}>
                {album.year}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.9375rem',
                  color: album.notable ? '#e8e4d9' : '#7a7060',
                  fontFamily: album.notable ? 'var(--font-serif)' : 'inherit',
                }}>
                  {album.notable && (
                    <span style={{ color: '#b8962e', marginRight: '0.35rem', fontSize: '0.625rem' }}>★</span>
                  )}
                  {album.title}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#3a3830' }}>{album.label}</span>
                <span style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#3a3830',
                  border: '1px solid #2a2820',
                  padding: '0.0625rem 0.375rem',
                  flexShrink: 0,
                }}>
                  {TYPE_LABEL[album.type]}
                </span>
              </div>

              <AppleMusicBtn
                title={album.title}
                url={amLinks.get(album.title)}
                loading={loading}
              />
            </div>
          ))}
        </section>
      ))}

      <p style={{ fontSize: '0.6875rem', color: '#2a2820', marginTop: '2.5rem', lineHeight: '1.8' }}>
        ★ Fremhævede udgivelser er særligt anbefalet som startpunkt.
        Live- og kompilationsalbum er medtaget og markeret separat.
      </p>

      <style>{`
        @media (max-width: 580px) {
          .disc-row { grid-template-columns: 3rem 1fr !important; }
        }
      `}</style>
    </div>
  )
}
