import { render, hydrate } from 'preact'
import { renderToString } from 'preact-render-to-string'
import { App } from './App'
import './index.css'

if (typeof window !== 'undefined') {
  const root = document.getElementById('app')!
  if (root.hasChildNodes()) {
    hydrate(<App />, root)
  } else {
    render(<App />, root)
  }
}

export async function prerender(data: { url: string }) {
  const html = renderToString(<App url={data.url} />)
  return { html, links: new Set<string>() }
}
