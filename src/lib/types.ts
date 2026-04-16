export interface Album {
  title: string
  year: number
  label: string
  era: string
  cover?: string
  summary?: string
  personnel: Array<{ musician: string; instrument: string }>
  tracks: Array<{ title: string; duration?: string }>
  liner_notes?: string
  tags?: string[]
}

export interface Era {
  title: string
  tagline?: string
  years?: string
  order?: number
  article?: string
  color_accent?: string
}

export interface Quote {
  quote: string
  source?: string
  year?: number | null
}

export interface NavLink {
  label: string
  href: string
}

export interface GlobalSettings {
  site_title: string
  site_subtitle?: string
  nav?: NavLink[]
  footer_text?: string
}
