import { getAlbums } from '../lib/content'
import { AlbumCover } from '../components/AlbumCover'

export function Albums() {
  const albums = getAlbums()

  return (
    <div style="max-width:1200px;margin:0 auto;padding:4rem 1.5rem">
      <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#b8962e;margin-bottom:0.75rem">
        Discography
      </p>
      <h1 style="font-family:var(--font-serif);font-size:clamp(2rem,5vw,3.5rem);color:#e8e4d9;margin:0 0 3rem">
        Albums
      </h1>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:2rem">
        {albums.map(album => (
          <a
            key={album.slug}
            href={`/albums/${album.slug}`}
            style="display:block"
          >
            <div style="aspect-ratio:1;background:#1a1a1a;border:1px solid #2a2820;margin-bottom:1rem;overflow:hidden;position:relative">
              {album.data.cover ? (
                <img
                  src={album.data.cover}
                  alt={album.data.title}
                  loading="lazy"
                  style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s"
                  onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                />
              ) : (
                <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0.5rem">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" stroke="#2a2820" stroke-width="1.5"/>
                    <circle cx="24" cy="24" r="6" fill="#2a2820"/>
                    <circle cx="24" cy="24" r="2" fill="#3a3830"/>
                  </svg>
                  <p style="font-size:0.6875rem;color:#3a3830;letter-spacing:0.1em;text-transform:uppercase">
                    {album.data.label}
                  </p>
                </div>
              )}
            </div>
            <div>
              <h2 style="font-family:var(--font-serif);font-size:1rem;color:#e8e4d9;margin:0 0 0.25rem;line-height:1.3">
                {album.data.title}
              </h2>
              <p style="font-size:0.75rem;color:#8a8478;margin:0">
                {album.data.year} · {album.data.label}
              </p>
              {album.data.tags && album.data.tags.length > 0 && (
                <div style="display:flex;flex-wrap:wrap;gap:0.375rem;margin-top:0.5rem">
                  {album.data.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      style="font-size:0.6875rem;color:#7a6020;border:1px solid #3a2e10;padding:0.125rem 0.5rem;letter-spacing:0.05em"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .albums-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .albums-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
