import { createContext, cloneElement, toChildArray } from 'preact'
import { useContext, useState, useEffect, useMemo } from 'preact/hooks'
import type { ComponentChildren, ComponentType, VNode } from 'preact'

const BASE = (import.meta.env.BASE_URL as string).replace(/\/$/, '') // '/miles-davis' or ''

function stripBase(path: string): string {
  return BASE && path.startsWith(BASE) ? path.slice(BASE.length) || '/' : path
}

function addBase(path: string): string {
  if (!BASE || path.startsWith(BASE)) return path
  return BASE + path
}

function matchRoute(pattern: string, path: string): Record<string, string> | null {
  const pp = pattern.replace(/\/$/, '') || '/'
  const cp = path.replace(/\/$/, '') || '/'
  const patParts = pp.split('/').filter(Boolean)
  const curParts = cp.split('/').filter(Boolean)
  if (patParts.length !== curParts.length) return null
  const params: Record<string, string> = {}
  for (let i = 0; i < patParts.length; i++) {
    if (patParts[i].startsWith(':')) {
      params[patParts[i].slice(1)] = decodeURIComponent(curParts[i])
    } else if (patParts[i] !== curParts[i]) {
      return null
    }
  }
  return params
}

interface RouterCtxValue {
  path: string
  navigate(to: string): void
}

const RouterCtx = createContext<RouterCtxValue>({ path: '/', navigate: () => {} })

export function useRouter() {
  return useContext(RouterCtx)
}

interface RouterProps {
  url?: string
  children: ComponentChildren
}

export function Router({ url, children }: RouterProps) {
  const [path, setPath] = useState<string>(() => {
    if (url) return url
    if (typeof window === 'undefined') return '/'
    return stripBase(window.location.pathname)
  })

  function navigate(to: string) {
    const stripped = stripBase(to)
    window.history.pushState(null, '', addBase(stripped))
    setPath(stripped)
  }

  useEffect(() => {
    const onPop = () => setPath(stripBase(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return
      const a = (e.composedPath() as Element[]).find(el => el.nodeName === 'A') as HTMLAnchorElement | undefined
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || a.target || !href.startsWith('/')) return
      e.preventDefault()
      navigate(href)
    }
    window.addEventListener('click', onClick, true)
    return () => window.removeEventListener('click', onClick, true)
  }, [])

  // Match children (Route vnodes) against current path
  const childArr = toChildArray(children) as VNode<any>[]
  let matched: VNode<any> | null = null
  let defaultRoute: VNode<any> | null = null

  for (const child of childArr) {
    if (!child || typeof child !== 'object') continue
    const p = child.props as { path?: string; default?: boolean }
    if (p.default) { defaultRoute = child; continue }
    if (p.path) {
      const params = matchRoute(p.path, path)
      if (params !== null) { matched = cloneElement(child, { params }); break }
    }
  }

  const ctx = useMemo(() => ({ path, navigate }), [path])
  return <RouterCtx.Provider value={ctx}>{matched ?? defaultRoute}</RouterCtx.Provider>
}

interface RouteProps {
  path?: string
  default?: boolean
  component: ComponentType<{ params?: Record<string, string> }>
  params?: Record<string, string>
}

export function Route({ component: Component, params }: RouteProps) {
  return <Component params={params} />
}
