export type AlbumType = 'studio' | 'live' | 'compilation'
export type EraSlug = 'bebop' | 'birth-of-the-cool' | 'hard-bop' | 'modal' | 'electric'

export interface DiscographyEntry {
  title: string
  year: number
  label: string
  type: AlbumType
  era: EraSlug
  notable?: boolean
  appleMusic: string
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
// Apple Music URLs resolved via iTunes API 2026-05-09.
export const DISCOGRAPHY: DiscographyEntry[] = [
  // Bebop era
  { title: "Miles Davis, Vol. 1",                          year: 1956, label: "Blue Note",    type: "studio",      era: "bebop",             appleMusic: "https://music.apple.com/us/album/miles-davis-vol-1/1443224843" },
  { title: "Miles Davis, Vol. 2",                          year: 1956, label: "Blue Note",    type: "studio",      era: "bebop",             appleMusic: "https://music.apple.com/us/album/miles-davis-vol-2/1443091489" },
  { title: "Bags' Groove",                                 year: 1957, label: "Prestige",     type: "studio",      era: "bebop",             appleMusic: "https://music.apple.com/us/album/bags-groove-rudy-van-gelder-remaster-rvg-remastered/1440943873", notable: true },

  // Birth of the Cool era (recorded 1949–50, released 1957)
  { title: "Birth of the Cool",                            year: 1957, label: "Capitol",      type: "compilation", era: "birth-of-the-cool", appleMusic: "https://music.apple.com/us/album/birth-of-the-cool/1440951879", notable: true },

  // Hard Bop era
  { title: "Cookin' with the Miles Davis Quintet",         year: 1957, label: "Prestige",     type: "studio",      era: "hard-bop",          appleMusic: "https://music.apple.com/us/album/cookin-with-the-miles-davis-quintet-remastered/1440948857" },
  { title: "'Round About Midnight",                        year: 1957, label: "Columbia",     type: "studio",      era: "hard-bop",          appleMusic: "https://music.apple.com/us/album/round-about-midnight-mono-version/832081417", notable: true },
  { title: "Miles Ahead",                                  year: 1957, label: "Columbia",     type: "studio",      era: "hard-bop",          appleMusic: "https://music.apple.com/us/album/miles-ahead/200300007", notable: true },
  { title: "Relaxin' with the Miles Davis Quintet",        year: 1958, label: "Prestige",     type: "studio",      era: "hard-bop",          appleMusic: "https://music.apple.com/us/album/relaxin-with-the-miles-davis-quintet-remastered/1440950650" },
  { title: "Milestones",                                   year: 1958, label: "Columbia",     type: "studio",      era: "hard-bop",          appleMusic: "https://music.apple.com/us/album/milestones/250998382", notable: true },
  { title: "Workin' with the Miles Davis Quintet",         year: 1959, label: "Prestige",     type: "studio",      era: "hard-bop",          appleMusic: "https://music.apple.com/us/album/workin-with-the-miles-davis-quintet/1685100450" },

  // Modal era
  { title: "Porgy and Bess",                               year: 1959, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/porgy-and-bess/282213298", notable: true },
  { title: "Kind of Blue",                                 year: 1959, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/kind-of-blue/268443092", notable: true },
  { title: "Sketches of Spain",                            year: 1960, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/sketches-of-spain/832060615", notable: true },
  { title: "Steamin' with the Miles Davis Quintet",        year: 1961, label: "Prestige",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/steamin-with-the-miles-davis-quintet-rudy-van/1440951870" },
  { title: "Someday My Prince Will Come",                  year: 1961, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/someday-my-prince-will-come/170422357" },
  { title: "Miles Davis at Carnegie Hall",                 year: 1962, label: "Columbia",     type: "live",        era: "modal",             appleMusic: "https://music.apple.com/us/album/miles-davis-at-carnegie-hall-live/205999347" },
  { title: "Seven Steps to Heaven",                        year: 1963, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/seven-steps-to-heaven/193614955", notable: true },
  { title: "Miles Davis in Europe",                        year: 1964, label: "Columbia",     type: "live",        era: "modal",             appleMusic: "https://music.apple.com/us/album/in-europe-live/171441904" },
  { title: "My Funny Valentine",                           year: 1965, label: "Columbia",     type: "live",        era: "modal",             appleMusic: "https://music.apple.com/us/album/my-funny-valentine-in-concert-live/159070784" },
  { title: "E.S.P.",                                       year: 1965, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/e-s-p-2022-remaster/203773370", notable: true },
  { title: "Four & More",                                  year: 1966, label: "Columbia",     type: "live",        era: "modal",             appleMusic: "https://music.apple.com/us/album/four-more-2022-remaster/159071729" },
  { title: "Miles Smiles",                                 year: 1967, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/miles-smiles/209407331", notable: true },
  { title: "Sorcerer",                                     year: 1967, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/sorcerer/1392269555" },
  { title: "Nefertiti",                                    year: 1968, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/nefertiti-bonus-track-version/169899671", notable: true },
  { title: "Miles in the Sky",                             year: 1968, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/miles-in-the-sky/158514326" },
  { title: "Filles de Kilimanjaro",                        year: 1969, label: "Columbia",     type: "studio",      era: "modal",             appleMusic: "https://music.apple.com/us/album/filles-de-kilimanjaro/193522489" },

  // Electric era
  { title: "In a Silent Way",                              year: 1969, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/in-a-silent-way/193603857", notable: true },
  { title: "Bitches Brew",                                 year: 1970, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/bitches-brew/168376392", notable: true },
  { title: "A Tribute to Jack Johnson",                    year: 1971, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/a-tribute-to-jack-johnson/394930066", notable: true },
  { title: "On the Corner",                                year: 1972, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/on-the-corner/202539950", notable: true },
  { title: "Big Fun",                                      year: 1974, label: "Columbia",     type: "compilation", era: "electric",          appleMusic: "https://music.apple.com/us/album/big-fun-2022-remaster/205881623" },
  { title: "Get Up with It",                               year: 1974, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/get-up-with-it/157447301" },
  { title: "Agharta",                                      year: 1975, label: "Columbia",     type: "live",        era: "electric",          appleMusic: "https://music.apple.com/us/album/agharta/207340921" },
  { title: "Pangaea",                                      year: 1976, label: "Columbia",     type: "live",        era: "electric",          appleMusic: "https://music.apple.com/us/album/pangaea/158506488" },
  { title: "The Man with the Horn",                        year: 1981, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/the-man-with-the-horn-2022-remaster/215597651" },
  { title: "We Want Miles",                                year: 1982, label: "Columbia",     type: "live",        era: "electric",          appleMusic: "https://music.apple.com/us/album/we-want-miles-live-2022-remaster/1641923660" },
  { title: "Star People",                                  year: 1983, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/star-people-2022-remaster/277123890" },
  { title: "Decoy",                                        year: 1984, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/decoy-2022-remaster/186257176" },
  { title: "You're Under Arrest",                          year: 1985, label: "Columbia",     type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/youre-under-arrest-2022-remaster/190071333" },
  { title: "Tutu",                                         year: 1986, label: "Warner Bros.", type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/tutu/828544687", notable: true },
  { title: "Music from Siesta",                            year: 1988, label: "Warner Bros.", type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/music-from-siesta/390309096" },
  { title: "Amandla",                                      year: 1989, label: "Warner Bros.", type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/amandla/828551730" },
  { title: "Doo-Bop",                                      year: 1992, label: "Warner Bros.", type: "studio",      era: "electric",          appleMusic: "https://music.apple.com/us/album/doo-bop/828607032" },
]
