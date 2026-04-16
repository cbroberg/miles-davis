import { getAlbum, getAlbums } from '../lib/content'
import { renderMarkdown } from '../lib/markdown'

interface Props {
  slug: string
}

export function AlbumDetail({ slug }: Props) {
  const album = getAlbum(slug)

  if (!album) {
    return (
      <div style="max-width:700px;margin:8rem auto;padding:0 1.5rem;text-align:center">
        <h1 style="font-family:var(--font-serif);font-size:2rem;color:#e8e4d9;margin-bottom:1rem">Album not found</h1>
        <a href="/albums" style="color:#b8962e">← Back to albums</a>
      </div>
    )
  }

  const { data } = album

  return (
    <div style="max-width:1100px;margin:0 auto;padding:4rem 1.5rem">
      {/* Back */}
      <a href="/albums" style="font-size:0.8125rem;color:#8a8478;letter-spacing:0.05em;display:inline-flex;align-items:center;gap:0.5rem;margin-bottom:3rem">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        All Albums
      </a>

      <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:4rem;align-items:start">
        {/* Cover */}
        <div>
          <div style="aspect-ratio:1;background:#1a1a1a;border:1px solid #2a2820;overflow:hidden">
            {data.cover ? (
              <img src={data.cover} alt={data.title} style="width:100%;height:100%;object-fit:cover;display:block" />
            ) : (
              <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="28" stroke="#2a2820" stroke-width="1.5"/>
                  <circle cx="32" cy="32" r="8" fill="#2a2820"/>
                  <circle cx="32" cy="32" r="3" fill="#3a3830"/>
                </svg>
                <p style="font-size:0.75rem;color:#3a3830;letter-spacing:0.15em;text-transform:uppercase">{data.label}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1.5rem">
              {data.tags.map(tag => (
                <span key={tag} style="font-size:0.6875rem;color:#7a6020;border:1px solid #3a2e10;padding:0.25rem 0.75rem;letter-spacing:0.05em">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#b8962e;margin-bottom:0.5rem">
            {data.year} · {data.label}
          </p>
          <h1 style="font-family:var(--font-serif);font-size:clamp(2rem,5vw,3rem);color:#e8e4d9;margin:0 0 1rem;line-height:1.15">
            {data.title}
          </h1>

          {data.summary && (
            <p style="font-size:1.0625rem;color:#a09a8c;line-height:1.7;margin:0 0 2.5rem">
              {data.summary}
            </p>
          )}

          {/* Track listing */}
          {data.tracks && data.tracks.length > 0 && (
            <div style="margin-bottom:2.5rem">
              <h2 style="font-family:var(--font-serif);font-size:1rem;color:#e8e4d9;letter-spacing:0.05em;margin:0 0 1rem;text-transform:uppercase;font-size:0.75rem;letter-spacing:0.15em">
                Track Listing
              </h2>
              <div style="border:1px solid #2a2820">
                {data.tracks.map((track, i) => (
                  <div
                    key={i}
                    style={`display:flex;justify-content:space-between;align-items:center;padding:0.625rem 1rem;${i > 0 ? 'border-top:1px solid #1e1e1a' : ''}`}
                  >
                    <div style="display:flex;align-items:center;gap:0.75rem">
                      <span style="font-size:0.6875rem;color:#3a3830;width:1.5rem;text-align:right;font-variant-numeric:tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style="font-size:0.9375rem;color:#c8c4b8">{track.title}</span>
                    </div>
                    {track.duration && (
                      <span style="font-size:0.8125rem;color:#8a8478;font-variant-numeric:tabular-nums">
                        {track.duration}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personnel */}
          {data.personnel && data.personnel.length > 0 && (
            <div>
              <h2 style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:#8a8478;margin:0 0 1rem">
                Personnel
              </h2>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.375rem 1.5rem">
                {data.personnel.map((p, i) => (
                  <div key={i} style="display:flex;flex-direction:column">
                    <span style="font-size:0.9375rem;color:#e8e4d9;font-weight:400">{p.musician}</span>
                    <span style="font-size:0.75rem;color:#8a8478">{p.instrument}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Liner notes */}
      {data.liner_notes && (
        <div style="margin-top:5rem;padding-top:4rem;border-top:1px solid #2a2820">
          <h2 style="font-family:var(--font-serif);font-size:1.5rem;color:#e8e4d9;margin:0 0 2rem">
            Liner Notes
          </h2>
          <div
            class="prose"
            style="max-width:680px;font-size:1rem"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(data.liner_notes) }}
          />
        </div>
      )}
    </div>
  )
}
