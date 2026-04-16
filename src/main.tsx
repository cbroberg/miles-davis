import { render, hydrate } from 'preact'
import { renderToString } from 'preact-render-to-string'
import { App } from './App'
import './index.css'

if (typeof window !== 'undefined') {
  // Patch location.pathname and history.push/replaceState so preact-iso's router
  // sees paths without the Vite base prefix (e.g. '/albums' not '/miles-davis/albums')
  const base = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '' // '/miles-davis' in prod
  if (base) {
    const locDesc = Object.getOwnPropertyDescriptor(Location.prototype, 'pathname')!
    Object.defineProperty(Location.prototype, 'pathname', {
      ...locDesc,
      get() {
        const raw: string = locDesc.get!.call(this)
        return raw.startsWith(base) ? raw.slice(base.length) || '/' : raw
      },
    })

    const origPush = history.pushState.bind(history)
    history.pushState = (state, title, url) => {
      const u = typeof url === 'string' && url.startsWith('/') && !url.startsWith(base)
        ? base + url
        : url
      origPush(state, title, u)
    }

    const origReplace = history.replaceState.bind(history)
    history.replaceState = (state, title, url) => {
      const u = typeof url === 'string' && url.startsWith('/') && !url.startsWith(base)
        ? base + url
        : url
      origReplace(state, title, u)
    }
  }

  const root = document.getElementById('app')!
  if (root.hasChildNodes()) {
    hydrate(<App />, root)
  } else {
    render(<App />, root)
  }
}

// Export prerender function for @preact/preset-vite static prerendering
// url is already without base (e.g. '/albums') since the plugin passes clean paths
export async function prerender(data: { url: string }) {
  const html = renderToString(<App url={data.url} />)
  return { html, links: new Set<string>() }
}
