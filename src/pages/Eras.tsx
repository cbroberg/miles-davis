import { getEras } from '../lib/content'

export function Eras() {
  const eras = getEras()

  return (
    <div style="max-width:1000px;margin:0 auto;padding:4rem 1.5rem">
      <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#b8962e;margin-bottom:0.75rem">
        Five Chapters
      </p>
      <h1 style="font-family:var(--font-serif);font-size:clamp(2rem,5vw,3.5rem);color:#e8e4d9;margin:0 0 3rem">
        The Creative Eras
      </h1>

      <div style="display:flex;flex-direction:column;gap:1px;background:#2a2820">
        {eras.map((era, index) => (
          <a
            key={era.slug}
            href={`/eras/${era.slug}`}
            style="background:#111111;padding:2.5rem 2rem;display:grid;grid-template-columns:80px 1fr auto;align-items:center;gap:2rem;transition:background 0.2s"
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#161616')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#111111')}
          >
            <div>
              <p style="font-family:var(--font-serif);font-size:3rem;font-weight:700;color:#1e1e1a;line-height:1;margin:0">
                {String(index + 1).padStart(2, '0')}
              </p>
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem">
                <div style={`width:3px;height:1rem;background:${era.data.color_accent ?? '#b8962e'}`} />
                <p style="font-size:0.75rem;color:#b8962e;letter-spacing:0.1em;text-transform:uppercase;margin:0">
                  {era.data.years}
                </p>
              </div>
              <h2 style="font-family:var(--font-serif);font-size:1.375rem;color:#e8e4d9;margin:0 0 0.375rem">
                {era.data.title}
              </h2>
              <p style="font-size:0.9375rem;color:#8a8478;margin:0;font-style:italic">
                {era.data.tagline}
              </p>
            </div>
            <div style="color:#3a3830">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
