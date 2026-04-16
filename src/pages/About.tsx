export function About() {
  return (
    <div style="max-width:720px;margin:0 auto;padding:5rem 1.5rem">
      <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#b8962e;margin-bottom:0.75rem">
        About this site
      </p>
      <h1 style="font-family:var(--font-serif);font-size:clamp(2rem,5vw,3rem);color:#e8e4d9;margin:0 0 2.5rem;line-height:1.2">
        Kind of Blue
      </h1>

      <div class="prose" style="font-size:1.0625rem">
        <p>
          This is a tribute to <strong>Miles Dewey Davis III</strong> (May 26, 1926 – September 28, 1991),
          widely considered the most influential musician in jazz history. Over five decades he reinvented
          himself — and the music — more times than any other artist of the twentieth century.
        </p>

        <p>
          The site covers his six most iconic albums from 1957–1972, the five creative eras that defined
          his career, and a rotating selection of his most memorable words.
        </p>

        <h2>The Stack</h2>

        <p>
          Built as an experiment in AI-assisted site construction using:
        </p>

        <ul style="list-style:none;padding:0;margin:0 0 1.25em;display:flex;flex-direction:column;gap:0.5rem">
          {[
            ['@webhouse/cms', 'filesystem-based, AI-native CMS'],
            ['Preact 10.23', 'lightweight React-compatible UI library'],
            ['preact-iso', 'client + server routing'],
            ['Vite 5.4', 'dev server & production bundler'],
            ['Tailwind v4', 'CSS-first utility styling'],
            ['Bun', 'fast JS runtime & package manager'],
          ].map(([name, desc]) => (
            <li key={name} style="display:flex;gap:1rem;align-items:baseline">
              <span style="font-family:var(--font-sans);font-size:0.875rem;color:#b8962e;min-width:180px;font-weight:400">{name}</span>
              <span style="font-size:0.875rem;color:#8a8478">{desc}</span>
            </li>
          ))}
        </ul>

        <p>
          Content is stored as flat JSON files in <code>content/</code> — no database required.
          The build prerenders every route to static HTML for deployment on GitHub Pages.
        </p>

        <h2>Sources</h2>

        <p>
          Album information sourced from liner notes, the Miles Davis autobiography (with Quincy Troupe,
          1989), and Ian Carr's biography <em>Miles Davis: The Definitive Biography</em> (1998).
          Quotes are drawn from interviews, the autobiography, and documented public statements.
        </p>
      </div>
    </div>
  )
}
