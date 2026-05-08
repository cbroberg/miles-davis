import { useState } from 'preact/hooks'
import { DISCOGRAPHY, ERA_LABELS, ERA_YEARS, type DiscographyEntry, type EraSlug } from '../data/discography'

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

function GridView({ albums }: { albums: DiscographyEntry[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '1.5rem',
    }}>
      {albums.map(album => (
        <div key={album.title} style={{ position: 'relative' }}>
          <a
            href={album.appleMusic}
            target="_blank"
            rel="noopener noreferrer"
            title={`Lyt til "${album.title}" på Apple Music`}
            style={{ display: 'block' }}
          >
            <div style={{
              aspectRatio: '1',
              background: '#1a1a1a',
              border: '1px solid #2a2820',
              marginBottom: '0.75rem',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <img
                src={album.artwork}
                alt={album.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
              />
              {album.notable && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem',
                  background: 'rgba(10,10,10,0.8)',
                  color: '#b8962e',
                  fontSize: '0.625rem',
                  padding: '0.125rem 0.375rem',
                  letterSpacing: '0.05em',
                }}>
                  ★
                </div>
              )}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'rgba(10,10,10,0.75)',
                color: '#8a8478',
                fontSize: '0.5625rem',
                padding: '0.125rem 0.375rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {TYPE_LABEL[album.type]}
              </div>
            </div>
            <p style={{
              fontFamily: album.notable ? 'var(--font-serif)' : 'inherit',
              fontSize: '0.875rem',
              color: album.notable ? '#e8e4d9' : '#a09890',
              margin: '0 0 0.2rem',
              lineHeight: '1.3',
            }}>
              {album.title}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#5a5448', margin: 0 }}>
              {album.year} · {album.label}
            </p>
          </a>
        </div>
      ))}
    </div>
  )
}

function ListView({ groups }: { groups: Array<{ era: EraSlug; albums: DiscographyEntry[] }> }) {
  return (
    <div>
      {groups.map(({ era, albums }) => (
        <section key={era} style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            borderBottom: '1px solid #2a2820',
            paddingBottom: '0.75rem',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#e8e4d9', margin: 0 }}>
              {ERA_LABELS[era]}
            </h2>
            <span style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', color: '#3a3830', textTransform: 'uppercase' as const }}>
              {ERA_YEARS[era]}
            </span>
          </div>

          {albums.map(album => (
            <div
              key={album.title}
              style={{
                display: 'grid',
                gridTemplateColumns: '2.75rem 2.75rem 1fr auto',
                gap: '1rem',
                alignItems: 'center',
                padding: '0.6rem 0',
                borderBottom: '1px solid #191714',
              }}
            >
              <span style={{ fontSize: '0.8125rem', color: '#4a4840', fontVariantNumeric: 'tabular-nums' as const }}>
                {album.year}
              </span>

              <div style={{
                width: '2.25rem',
                height: '2.25rem',
                overflow: 'hidden',
                border: '1px solid #2a2820',
                flexShrink: 0,
              }}>
                <img src={album.artwork} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0, flexWrap: 'wrap' as const }}>
                <span style={{
                  fontSize: '0.9375rem',
                  color: album.notable ? '#e8e4d9' : '#7a7060',
                  fontFamily: album.notable ? 'var(--font-serif)' : 'inherit',
                }}>
                  {album.notable && <span style={{ color: '#b8962e', marginRight: '0.3rem', fontSize: '0.625rem' }}>★</span>}
                  {album.title}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#3a3830' }}>{album.label}</span>
                <span style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: '#3a3830',
                  border: '1px solid #2a2820',
                  padding: '0.0625rem 0.375rem',
                  flexShrink: 0,
                }}>
                  {TYPE_LABEL[album.type]}
                </span>
              </div>

              <a
                href={album.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                title={`Lyt til "${album.title}" på Apple Music`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.04em',
                  color: '#c8a84e',
                  border: '1px solid #4a3e18',
                  padding: '0.25rem 0.625rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap' as const,
                  transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = '#e8c870'; el.style.borderColor = '#7a6020'; el.style.background = '#1a1710'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = '#c8a84e'; el.style.borderColor = '#4a3e18'; el.style.background = 'transparent'
                }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                  <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.726-.69c-.49-.09-.987-.128-1.48-.144-.35-.01-.7-.01-1.05-.01H6.668c-.35 0-.7 0-1.05.01-.49.016-.99.055-1.48.144a5.023 5.023 0 00-1.726.69C1.296 1.624.55 2.624.234 3.934a9.23 9.23 0 00-.24 2.19C-.006 6.474 0 6.824 0 7.174v9.66c0 .35.006.7.016 1.05.017.49.055.99.144 1.48.317 1.31 1.062 2.31 2.18 3.043a5.023 5.023 0 001.726.69c.49.09.99.128 1.48.144.35.01.7.01 1.05.01h10.662c.35 0 .7 0 1.05-.01.49-.016.99-.055 1.48-.144a5.022 5.022 0 001.726-.69c1.118-.733 1.863-1.733 2.18-3.043.09-.49.128-.99.144-1.48.01-.35.016-.7.016-1.05V7.174c0-.35-.006-.7-.022-1.05zM11.977 17.75l-4.978-2.9v-5.8l4.978-2.9 4.978 2.9v5.8l-4.978 2.9z" />
                </svg>
                Apple Music ↗
              </a>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export function Discography() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const groups = groupByEra(DISCOGRAPHY)

  const btnBase: Record<string, string | number> = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0.375rem 0.75rem',
    border: '1px solid #2a2820',
    cursor: 'pointer',
    background: 'transparent',
    transition: 'color 0.15s, border-color 0.15s, background 0.15s',
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
        <div>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8962e', marginBottom: '0.75rem' }}>
            Listen chronologically
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#e8e4d9', margin: '0 0 0.5rem' }}>
            Discography
          </h1>
          <p style={{ color: '#5a5448', fontSize: '0.875rem', margin: 0 }}>
            {DISCOGRAPHY.length} udgivelser · 1956–1992
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0', border: '1px solid #2a2820' }}>
          <button
            onClick={() => setView('grid')}
            style={{
              ...btnBase,
              color: view === 'grid' ? '#e8e4d9' : '#5a5448',
              background: view === 'grid' ? '#1a1a1a' : 'transparent',
              borderRight: '1px solid #2a2820',
              border: 'none',
              padding: '0.5rem 1rem',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="6.5" height="6.5"/><rect x="9.5" y="0" width="6.5" height="6.5"/>
              <rect x="0" y="9.5" width="6.5" height="6.5"/><rect x="9.5" y="9.5" width="6.5" height="6.5"/>
            </svg>
            Grid
          </button>
          <button
            onClick={() => setView('list')}
            style={{
              ...btnBase,
              color: view === 'list' ? '#e8e4d9' : '#5a5448',
              background: view === 'list' ? '#1a1a1a' : 'transparent',
              border: 'none',
              padding: '0.5rem 1rem',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="1" width="16" height="2"/><rect x="0" y="7" width="16" height="2"/><rect x="0" y="13" width="16" height="2"/>
            </svg>
            Liste
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div>
          {groups.map(({ era, albums }) => (
            <section key={era} style={{ marginBottom: '3.5rem' }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: '0.75rem',
                borderBottom: '1px solid #2a2820', paddingBottom: '0.625rem', marginBottom: '1.5rem',
              }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: '#e8e4d9', margin: 0 }}>
                  {ERA_LABELS[era]}
                </h2>
                <span style={{ fontSize: '0.625rem', letterSpacing: '0.15em', color: '#3a3830', textTransform: 'uppercase' }}>
                  {ERA_YEARS[era]}
                </span>
              </div>
              <GridView albums={albums} />
            </section>
          ))}
        </div>
      ) : (
        <ListView groups={groups} />
      )}

      <p style={{ fontSize: '0.6875rem', color: '#2a2820', marginTop: '2.5rem', lineHeight: '1.8' }}>
        ★ Fremhævede udgivelser er særligt anbefalet som startpunkt.
      </p>
    </div>
  )
}
