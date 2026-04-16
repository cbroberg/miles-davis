import { type ComponentChildren } from 'preact'
import { getGlobal } from '../lib/content'

interface Props {
  children: ComponentChildren
}

export function Layout({ children }: Props) {
  const global = getGlobal()

  return (
    <div style="min-height:100vh;display:flex;flex-direction:column;background:#0a0a0a">
      <header style="position:sticky;top:0;z-index:50;border-bottom:1px solid #2a2820;background:rgba(10,10,10,0.95);backdrop-filter:blur(8px)">
        <nav style="max-width:1200px;margin:0 auto;padding:0 1.5rem;height:56px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" style="font-family:var(--font-serif);font-size:1.125rem;font-weight:700;color:#b8962e;letter-spacing:0.02em">
            {global?.site_title ?? 'Kind of Blue'}
          </a>
          <div style="display:flex;gap:2rem;align-items:center">
            {(global?.nav ?? [
              { label: 'Albums', href: '/albums' },
              { label: 'Eras', href: '/#eras' },
              { label: 'About', href: '/about' },
            ]).map(link => (
              <a
                key={link.href}
                href={link.href}
                style="font-size:0.8125rem;letter-spacing:0.08em;text-transform:uppercase;color:#8a8478;transition:color 0.2s"
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#e8e4d9')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#8a8478')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main style="flex:1">
        {children}
      </main>

      <footer style="border-top:1px solid #2a2820;padding:2.5rem 1.5rem;text-align:center">
        <p style="font-size:0.8125rem;color:#8a8478;max-width:600px;margin:0 auto">
          {global?.footer_text ?? 'Miles Dewey Davis III (May 26, 1926 – September 28, 1991)'}
        </p>
        <p style="margin-top:0.75rem;font-size:0.75rem;color:#3a3830">
          Built with{' '}
          <span style="color:#7a6020">@webhouse/cms</span>
          {' · '}
          <span style="color:#7a6020">Preact</span>
          {' · '}
          <span style="color:#7a6020">Tailwind v4</span>
        </p>
      </footer>
    </div>
  )
}
