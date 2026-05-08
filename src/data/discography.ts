export type AlbumType = 'studio' | 'live' | 'compilation'
export type EraSlug = 'bebop' | 'birth-of-the-cool' | 'hard-bop' | 'modal' | 'electric'

export interface DiscographyEntry {
  title: string
  year: number
  label: string
  type: AlbumType
  era: EraSlug
  notable?: boolean
}

export const ERA_LABELS: Record<EraSlug, string> = {
  'bebop': 'Bebop',
  'birth-of-the-cool': 'Birth of the Cool',
  'hard-bop': 'Hard Bop',
  'modal': 'Modal Jazz',
  'electric': 'Electric & Beyond',
}

export const ERA_YEARS: Record<EraSlug, string> = {
  'bebop': '1945–1954',
  'birth-of-the-cool': '1949–1950',
  'hard-bop': '1955–1959',
  'modal': '1959–1969',
  'electric': '1969–1991',
}

// Sorted by release year. Recording dates may differ.
export const DISCOGRAPHY: DiscographyEntry[] = [
  // Bebop era
  { title: "Miles Davis, Vol. 1",                          year: 1956, label: "Blue Note",    type: "studio",      era: "bebop" },
  { title: "Miles Davis, Vol. 2",                          year: 1956, label: "Blue Note",    type: "studio",      era: "bebop" },
  { title: "Bags' Groove",                                 year: 1957, label: "Prestige",     type: "studio",      era: "bebop",             notable: true },

  // Birth of the Cool era (recorded 1949–50, released 1957)
  { title: "Birth of the Cool",                            year: 1957, label: "Capitol",      type: "compilation", era: "birth-of-the-cool", notable: true },

  // Hard Bop era
  { title: "Cookin' with the Miles Davis Quintet",         year: 1957, label: "Prestige",     type: "studio",      era: "hard-bop" },
  { title: "'Round About Midnight",                        year: 1957, label: "Columbia",     type: "studio",      era: "hard-bop",          notable: true },
  { title: "Miles Ahead",                                  year: 1957, label: "Columbia",     type: "studio",      era: "hard-bop",          notable: true },
  { title: "Relaxin' with the Miles Davis Quintet",        year: 1958, label: "Prestige",     type: "studio",      era: "hard-bop" },
  { title: "Milestones",                                   year: 1958, label: "Columbia",     type: "studio",      era: "hard-bop",          notable: true },
  { title: "Workin' with the Miles Davis Quintet",         year: 1959, label: "Prestige",     type: "studio",      era: "hard-bop" },

  // Modal era
  { title: "Porgy and Bess",                               year: 1959, label: "Columbia",     type: "studio",      era: "modal",             notable: true },
  { title: "Kind of Blue",                                 year: 1959, label: "Columbia",     type: "studio",      era: "modal",             notable: true },
  { title: "Sketches of Spain",                            year: 1960, label: "Columbia",     type: "studio",      era: "modal",             notable: true },
  { title: "Steamin' with the Miles Davis Quintet",        year: 1961, label: "Prestige",     type: "studio",      era: "modal" },
  { title: "Someday My Prince Will Come",                  year: 1961, label: "Columbia",     type: "studio",      era: "modal" },
  { title: "Miles Davis at Carnegie Hall",                 year: 1962, label: "Columbia",     type: "live",        era: "modal" },
  { title: "Seven Steps to Heaven",                        year: 1963, label: "Columbia",     type: "studio",      era: "modal",             notable: true },
  { title: "Miles Davis in Europe",                        year: 1964, label: "Columbia",     type: "live",        era: "modal" },
  { title: "My Funny Valentine",                           year: 1965, label: "Columbia",     type: "live",        era: "modal" },
  { title: "E.S.P.",                                       year: 1965, label: "Columbia",     type: "studio",      era: "modal",             notable: true },
  { title: "Four & More",                                  year: 1966, label: "Columbia",     type: "live",        era: "modal" },
  { title: "Miles Smiles",                                 year: 1967, label: "Columbia",     type: "studio",      era: "modal",             notable: true },
  { title: "Sorcerer",                                     year: 1967, label: "Columbia",     type: "studio",      era: "modal" },
  { title: "Nefertiti",                                    year: 1968, label: "Columbia",     type: "studio",      era: "modal",             notable: true },
  { title: "Miles in the Sky",                             year: 1968, label: "Columbia",     type: "studio",      era: "modal" },
  { title: "Filles de Kilimanjaro",                        year: 1969, label: "Columbia",     type: "studio",      era: "modal" },

  // Electric era
  { title: "In a Silent Way",                              year: 1969, label: "Columbia",     type: "studio",      era: "electric",          notable: true },
  { title: "Bitches Brew",                                 year: 1970, label: "Columbia",     type: "studio",      era: "electric",          notable: true },
  { title: "A Tribute to Jack Johnson",                    year: 1971, label: "Columbia",     type: "studio",      era: "electric",          notable: true },
  { title: "On the Corner",                                year: 1972, label: "Columbia",     type: "studio",      era: "electric",          notable: true },
  { title: "Big Fun",                                      year: 1974, label: "Columbia",     type: "compilation", era: "electric" },
  { title: "Get Up with It",                               year: 1974, label: "Columbia",     type: "studio",      era: "electric" },
  { title: "Agharta",                                      year: 1975, label: "Columbia",     type: "live",        era: "electric" },
  { title: "Pangaea",                                      year: 1976, label: "Columbia",     type: "live",        era: "electric" },
  { title: "The Man with the Horn",                        year: 1981, label: "Columbia",     type: "studio",      era: "electric" },
  { title: "We Want Miles",                                year: 1982, label: "Columbia",     type: "live",        era: "electric" },
  { title: "Star People",                                  year: 1983, label: "Columbia",     type: "studio",      era: "electric" },
  { title: "Decoy",                                        year: 1984, label: "Columbia",     type: "studio",      era: "electric" },
  { title: "You're Under Arrest",                          year: 1985, label: "Columbia",     type: "studio",      era: "electric" },
  { title: "Tutu",                                         year: 1986, label: "Warner Bros.", type: "studio",      era: "electric",          notable: true },
  { title: "Music from Siesta",                            year: 1988, label: "Warner Bros.", type: "studio",      era: "electric" },
  { title: "Amandla",                                      year: 1989, label: "Warner Bros.", type: "studio",      era: "electric" },
  { title: "Doo-Bop",                                      year: 1992, label: "Warner Bros.", type: "studio",      era: "electric" },
]
