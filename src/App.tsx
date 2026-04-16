import { Router, Route } from './lib/router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Albums } from './pages/Albums'
import { AlbumDetail } from './pages/AlbumDetail'
import { EraDetail } from './pages/EraDetail'
import { Eras } from './pages/Eras'
import { About } from './pages/About'

interface AppProps {
  url?: string
}

export function App({ url }: AppProps) {
  return (
    <Layout>
      <Router url={url}>
        <Route path="/" component={Home} />
        <Route path="/albums" component={Albums} />
        <Route path="/eras" component={Eras} />
        <Route
          path="/albums/:slug"
          component={({ params }: { params?: { slug?: string } }) => (
            <AlbumDetail slug={params?.slug ?? ''} />
          )}
        />
        <Route
          path="/eras/:slug"
          component={({ params }: { params?: { slug?: string } }) => (
            <EraDetail slug={params?.slug ?? ''} />
          )}
        />
        <Route path="/about" component={About} />
        <Route
          default
          component={() => (
            <div style="max-width:700px;margin:10rem auto;padding:0 1.5rem;text-align:center">
              <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#b8962e;margin-bottom:1rem">404</p>
              <h1 style="font-family:var(--font-serif);font-size:2.5rem;color:#e8e4d9;margin-bottom:1rem">Page not found</h1>
              <p style="color:#8a8478;margin-bottom:2rem">This note doesn't exist in the score.</p>
              <a href="/" style="color:#b8962e;border-bottom:1px solid #7a6020;padding-bottom:2px">Return home →</a>
            </div>
          )}
        />
      </Router>
    </Layout>
  )
}
