import { getEra, getEras } from '../lib/content'
import { renderMarkdown } from '../lib/markdown'

interface Props {
  slug: string
}

export function EraDetail({ slug }: Props) {
  const era = getEra(slug)
  const allEras = getEras()

  if (!era) {
    return (
      <div style="max-width:700px;margin:8rem auto;padding:0 1.5rem;text-align:center">
        <h1 style="font-family:var(--font-serif);font-size:2rem;color:#e8e4d9;margin-bottom:1rem">Era not found</h1>
        <a href="/#eras" style="color:#b8962e">← Back to eras</a>
      </div>
    )
  }

  const { data } = era
  const currentIndex = allEras.findIndex(e => e.slug === slug)
  const prev = currentIndex > 0 ? allEras[currentIndex - 1] : null
  const next = currentIndex < allEras.length - 1 ? allEras[currentIndex + 1] : null

  return (
    <div>
      {/* Header */}
      <div style={`border-bottom:1px solid #2a2820;padding:5rem 1.5rem 4rem;position:relative;overflow:hidden`}>
        <div style={`position:absolute;top:0;left:0;width:4px;height:100%;background:${data.color_accent ?? '#b8962e'}`} />
        <div style={`position:absolute;inset:0;background:linear-gradient(to right,${(data.color_accent ?? '#b8962e')}08,transparent 40%);pointer-events:none`} />
        <div style="max-width:800px;margin:0 auto;position:relative">
          <a href="/#eras" style="font-size:0.8125rem;color:#8a8478;display:inline-flex;align-items:center;gap:0.5rem;margin-bottom:2rem">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            All Eras
          </a>

          <p style={`font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:${data.color_accent ?? '#b8962e'};margin-bottom:0.5rem`}>
            {data.years}
          </p>
          <h1 style="font-family:var(--font-serif);font-size:clamp(2rem,6vw,3.5rem);color:#e8e4d9;margin:0 0 1rem;line-height:1.15">
            {data.title}
          </h1>
          {data.tagline && (
            <p style="font-size:1.125rem;color:#8a8478;margin:0;font-style:italic">
              {data.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Article */}
      {data.article && (
        <div style="max-width:700px;margin:0 auto;padding:4rem 1.5rem">
          <div
            class="prose"
            style="font-size:1.0625rem;line-height:1.85"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(data.article) }}
          />
        </div>
      )}

      {/* Era navigation */}
      <div style="max-width:1000px;margin:4rem auto;padding:0 1.5rem;border-top:1px solid #2a2820;padding-top:3rem;display:flex;justify-content:space-between;gap:1rem">
        {prev ? (
          <a href={`/eras/${prev.slug}`} style="display:flex;flex-direction:column;gap:0.25rem;max-width:280px">
            <span style="font-size:0.6875rem;letter-spacing:0.1em;text-transform:uppercase;color:#3a3830">← Previous</span>
            <span style="font-family:var(--font-serif);font-size:1rem;color:#b8962e">{prev.data.title}</span>
            <span style="font-size:0.75rem;color:#8a8478">{prev.data.years}</span>
          </a>
        ) : <div />}
        {next ? (
          <a href={`/eras/${next.slug}`} style="display:flex;flex-direction:column;align-items:flex-end;gap:0.25rem;max-width:280px;text-align:right">
            <span style="font-size:0.6875rem;letter-spacing:0.1em;text-transform:uppercase;color:#3a3830">Next →</span>
            <span style="font-family:var(--font-serif);font-size:1rem;color:#b8962e">{next.data.title}</span>
            <span style="font-size:0.75rem;color:#8a8478">{next.data.years}</span>
          </a>
        ) : <div />}
      </div>
    </div>
  )
}
