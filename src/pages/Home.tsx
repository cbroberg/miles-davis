import { useState, useEffect } from 'preact/hooks'
import { getEras, getQuotes } from '../lib/content'

export function Home() {
  const eras = getEras()
  const quotes = getQuotes()
  const [quoteIndex, setQuoteIndex] = useState(0)

  // Rotate quotes every 8 seconds
  useEffect(() => {
    if (quotes.length === 0) return
    setQuoteIndex(Math.floor(Math.random() * quotes.length))
    const interval = setInterval(() => {
      setQuoteIndex(i => (i + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [quotes.length])

  const activeQuote = quotes[quoteIndex]

  return (
    <div>
      {/* Hero */}
      <section style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6rem 1.5rem;text-align:center;position:relative;overflow:hidden">
        {/* Background texture */}
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(184,150,46,0.08) 0%,transparent 60%);pointer-events:none" />

        <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#b8962e;margin-bottom:1.5rem">
          1926 — 1991
        </p>

        <h1 style="font-family:var(--font-serif);font-size:clamp(2.5rem,7vw,5rem);font-weight:700;color:#e8e4d9;max-width:800px;margin:0 0 1rem">
          Miles Dewey Davis III
        </h1>

        <p style="font-size:clamp(1rem,2vw,1.25rem);color:#8a8478;max-width:560px;margin:0 0 4rem;font-weight:300">
          Trumpet. Innovation. Revolution.
          <br />
          The most influential musician of the twentieth century.
        </p>

        {/* Quote rotator */}
        {activeQuote && (
          <div style="max-width:600px;position:relative">
            <div style="position:absolute;top:-1rem;left:0;font-family:var(--font-serif);font-size:4rem;color:#b8962e;opacity:0.3;line-height:1">"</div>
            <blockquote style="font-family:var(--font-serif);font-size:1.25rem;font-style:italic;color:#d4c89a;line-height:1.6;padding:0 1.5rem">
              {activeQuote.data.quote}
            </blockquote>
            <div style="display:flex;justify-content:center;gap:6px;margin-top:2rem">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  style={`width:6px;height:6px;border-radius:50%;border:none;cursor:pointer;transition:background 0.3s;background:${i === quoteIndex ? '#b8962e' : '#2a2820'}`}
                  aria-label={`Quote ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <div style="margin-top:4rem;display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
          <a
            href="/albums"
            style="padding:0.75rem 2rem;background:#b8962e;color:#0a0a0a;font-size:0.8125rem;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;transition:background 0.2s"
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = '#d4a843')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = '#b8962e')}
          >
            Discography
          </a>
          <a
            href="#eras"
            style="padding:0.75rem 2rem;border:1px solid #2a2820;color:#8a8478;font-size:0.8125rem;letter-spacing:0.08em;text-transform:uppercase;transition:all 0.2s"
            onMouseEnter={(e) => { const el = e.target as HTMLElement; el.style.borderColor = '#b8962e'; el.style.color = '#b8962e' }}
            onMouseLeave={(e) => { const el = e.target as HTMLElement; el.style.borderColor = '#2a2820'; el.style.color = '#8a8478' }}
          >
            His Eras
          </a>
        </div>
      </section>

      {/* Era timeline */}
      <section id="eras" style="padding:6rem 1.5rem;border-top:1px solid #2a2820">
        <div style="max-width:1200px;margin:0 auto">
          <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#b8962e;margin-bottom:0.75rem">
            Five Chapters
          </p>
          <h2 style="font-family:var(--font-serif);font-size:clamp(1.75rem,4vw,2.5rem);color:#e8e4d9;margin:0 0 3rem">
            The Creative Eras
          </h2>

          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1px;background:#2a2820">
            {eras.map((era, index) => (
              <a
                key={era.slug}
                href={`/eras/${era.slug}`}
                style="background:#111111;padding:2rem 1.5rem;display:block;position:relative;overflow:hidden;transition:background 0.2s"
                onMouseEnter={(e) => ((e.target as HTMLElement).closest('a')!.style.background = '#161616')}
                onMouseLeave={(e) => ((e.target as HTMLElement).closest('a')!.style.background = '#111111')}
              >
                <div style={`position:absolute;top:0;left:0;width:3px;height:100%;background:${era.data.color_accent ?? '#b8962e'}`} />
                <p style="font-size:0.6875rem;letter-spacing:0.15em;text-transform:uppercase;color:#3a3830;margin-bottom:0.5rem">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p style="font-size:0.75rem;color:#b8962e;margin-bottom:0.5rem;font-weight:400">
                  {era.data.years}
                </p>
                <h3 style="font-family:var(--font-serif);font-size:1rem;color:#e8e4d9;margin:0 0 0.5rem;line-height:1.3">
                  {era.data.title}
                </h3>
                <p style="font-size:0.8125rem;color:#8a8478;margin:0;line-height:1.5">
                  {era.data.tagline}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest albums teaser */}
      <section style="padding:6rem 1.5rem;border-top:1px solid #2a2820">
        <div style="max-width:1200px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1rem">
          <div>
            <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#b8962e;margin-bottom:0.75rem">
              Discography
            </p>
            <h2 style="font-family:var(--font-serif);font-size:clamp(1.75rem,4vw,2.5rem);color:#e8e4d9;margin:0">
              Essential Albums
            </h2>
          </div>
          <a
            href="/albums"
            style="font-size:0.8125rem;letter-spacing:0.08em;text-transform:uppercase;color:#b8962e;border-bottom:1px solid #7a6020;padding-bottom:2px"
          >
            View all →
          </a>
        </div>

        <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1.5rem">
          {/* Static teaser — links to albums page */}
          {[
            { title: 'Kind of Blue', year: 1959, slug: 'kind-of-blue' },
            { title: 'Bitches Brew', year: 1970, slug: 'bitches-brew' },
            { title: 'Birth of the Cool', year: 1957, slug: 'birth-of-the-cool' },
            { title: 'Sketches of Spain', year: 1960, slug: 'sketches-of-spain' },
            { title: 'In a Silent Way', year: 1969, slug: 'in-a-silent-way' },
            { title: 'On the Corner', year: 1972, slug: 'on-the-corner' },
          ].map(album => (
            <a key={album.slug} href={`/albums/${album.slug}`} style="display:block;group">
              <div style="aspect-ratio:1;background:#1a1a1a;border:1px solid #2a2820;margin-bottom:0.75rem;overflow:hidden;position:relative">
                <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="16" stroke="#2a2820" stroke-width="1"/>
                    <circle cx="20" cy="20" r="5" fill="#2a2820"/>
                  </svg>
                </div>
              </div>
              <p style="font-family:var(--font-serif);font-size:0.9375rem;color:#e8e4d9;margin:0 0 0.25rem;line-height:1.3">
                {album.title}
              </p>
              <p style="font-size:0.75rem;color:#8a8478;margin:0">
                {album.year}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
