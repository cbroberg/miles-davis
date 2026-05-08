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
  artwork: string
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

// Apple Music URLs + artwork resolved via iTunes API 2026-05-09.
export const DISCOGRAPHY: DiscographyEntry[] = [
  // Bebop era
  {
    title: "Miles Davis, Vol. 1", year: 1956, label: "Blue Note", type: "studio", era: "bebop",
    appleMusic: "https://music.apple.com/us/album/miles-davis-vol-1/1443224843",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/64/e3/6d/64e36d53-75f7-e8b2-2f57-228e60f4fa2d/00602537498277.rgb.jpg/500x500bb.jpg",
  },
  {
    title: "Miles Davis, Vol. 2", year: 1956, label: "Blue Note", type: "studio", era: "bebop",
    appleMusic: "https://music.apple.com/us/album/miles-davis-vol-2/1443091489",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/1c/96/c5/1c96c5f7-b0c8-b7d1-0260-f0e9539a5440/00602537498338.rgb.jpg/500x500bb.jpg",
  },
  {
    title: "Bags' Groove", year: 1957, label: "Prestige", type: "studio", era: "bebop", notable: true,
    appleMusic: "https://music.apple.com/us/album/bags-groove-rudy-van-gelder-remaster-rvg-remastered/1440943873",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fe/c3/ff/fec3ffc6-a2e1-f294-124e-eaa631554ad4/13CMGIM00503.rgb.jpg/500x500bb.jpg",
  },

  // Birth of the Cool era
  {
    title: "Birth of the Cool", year: 1957, label: "Capitol", type: "compilation", era: "birth-of-the-cool", notable: true,
    appleMusic: "https://music.apple.com/us/album/birth-of-the-cool/1440951879",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/c2/0b/d4/c20bd438-fc2b-f911-bcd7-793c50c2961f/05099963651850.rgb.jpg/500x500bb.jpg",
  },

  // Hard Bop era
  {
    title: "Cookin' with the Miles Davis Quintet", year: 1957, label: "Prestige", type: "studio", era: "hard-bop",
    appleMusic: "https://music.apple.com/us/album/cookin-with-the-miles-davis-quintet-remastered/1440948857",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/e4/d4/c5/e4d4c59d-a3ad-6d89-5cbb-ce5de32169d1/00888072351356.rgb.jpg/500x500bb.jpg",
  },
  {
    title: "'Round About Midnight", year: 1957, label: "Columbia", type: "studio", era: "hard-bop", notable: true,
    appleMusic: "https://music.apple.com/us/album/round-about-midnight-mono-version/832081417",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/74/8c/cd/748ccd42-5a61-2608-ec7b-718f607ef151/886444333917.jpg/500x500bb.jpg",
  },
  {
    title: "Miles Ahead", year: 1957, label: "Columbia", type: "studio", era: "hard-bop", notable: true,
    appleMusic: "https://music.apple.com/us/album/miles-ahead/200300007",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/63/8c/19/638c19cd-3ec2-fbe5-4378-0067fdd026b6/dj.crartotp.jpg/500x500bb.jpg",
  },
  {
    title: "Relaxin' with the Miles Davis Quintet", year: 1958, label: "Prestige", type: "studio", era: "hard-bop",
    appleMusic: "https://music.apple.com/us/album/relaxin-with-the-miles-davis-quintet-remastered/1440950650",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b4/ba/05/b4ba05f8-facd-1420-ce66-6756113370f5/13CMGIM00461.rgb.jpg/500x500bb.jpg",
  },
  {
    title: "Milestones", year: 1958, label: "Columbia", type: "studio", era: "hard-bop", notable: true,
    appleMusic: "https://music.apple.com/us/album/milestones/250998382",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/60/b1/a6/60b1a664-92ad-d0b1-bbe3-d3fb5356ead7/dj.uciwfhtq.jpg/500x500bb.jpg",
  },
  {
    title: "Workin' with the Miles Davis Quintet", year: 1959, label: "Prestige", type: "studio", era: "hard-bop",
    appleMusic: "https://music.apple.com/us/album/workin-with-the-miles-davis-quintet/1685100450",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ce/2b/2e/ce2b2e71-f5d7-0893-a882-06c062cc9932/22CRGIM33965.rgb.jpg/500x500bb.jpg",
  },

  // Modal era
  {
    title: "Porgy and Bess", year: 1959, label: "Columbia", type: "studio", era: "modal", notable: true,
    appleMusic: "https://music.apple.com/us/album/porgy-and-bess/282213298",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/81/a2/25/81a225b3-f40b-170f-5e26-230a1cf1f0ca/dj.ueirgdtz.jpg/500x500bb.jpg",
  },
  {
    title: "Kind of Blue", year: 1959, label: "Columbia", type: "studio", era: "modal", notable: true,
    appleMusic: "https://music.apple.com/us/album/kind-of-blue/268443092",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music/7f/9f/d6/mzi.vtnaewef.jpg/500x500bb.jpg",
  },
  {
    title: "Sketches of Spain", year: 1960, label: "Columbia", type: "studio", era: "modal", notable: true,
    appleMusic: "https://music.apple.com/us/album/sketches-of-spain/832060615",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/cd/86/0c/cd860cb5-675b-2466-158d-487ace32e717/886444505321.jpg/500x500bb.jpg",
  },
  {
    title: "Steamin' with the Miles Davis Quintet", year: 1961, label: "Prestige", type: "studio", era: "modal",
    appleMusic: "https://music.apple.com/us/album/steamin-with-the-miles-davis-quintet-rudy-van/1440951870",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/68/96/f5/6896f527-ed55-ebda-324c-4e0e8a7abb18/00888072351912.rgb.jpg/500x500bb.jpg",
  },
  {
    title: "Someday My Prince Will Come", year: 1961, label: "Columbia", type: "studio", era: "modal",
    appleMusic: "https://music.apple.com/us/album/someday-my-prince-will-come/170422357",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/06/d0/c7/06d0c741-0864-7a59-96ba-ce01310b469b/dj.mbfffqdj.jpg/500x500bb.jpg",
  },
  {
    title: "Miles Davis at Carnegie Hall", year: 1962, label: "Columbia", type: "live", era: "modal",
    appleMusic: "https://music.apple.com/us/album/miles-davis-at-carnegie-hall-live/205999347",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features4/v4/0c/cb/68/0ccb6853-e13f-a6af-d18b-42d9bb390dab/dj.dqchadjg.jpg/500x500bb.jpg",
  },
  {
    title: "Seven Steps to Heaven", year: 1963, label: "Columbia", type: "studio", era: "modal", notable: true,
    appleMusic: "https://music.apple.com/us/album/seven-steps-to-heaven/193614955",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features124/v4/1f/2b/1b/1f2b1bd6-a852-edf7-6bf4-d0da7eb0cdc8/dj.friyugtm.jpg/500x500bb.jpg",
  },
  {
    title: "Miles Davis in Europe", year: 1964, label: "Columbia", type: "live", era: "modal",
    appleMusic: "https://music.apple.com/us/album/in-europe-live/171441904",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/58/12/b6/5812b6ec-0888-b3ce-428a-aaf4996407d1/dj.dniivptw.jpg/500x500bb.jpg",
  },
  {
    title: "My Funny Valentine", year: 1965, label: "Columbia", type: "live", era: "modal",
    appleMusic: "https://music.apple.com/us/album/my-funny-valentine-in-concert-live/159070784",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features/v4/25/5d/b8/255db836-7305-3cf6-1d6f-06f8ac2d9af6/dj.vilpcmjm.jpg/500x500bb.jpg",
  },
  {
    title: "E.S.P.", year: 1965, label: "Columbia", type: "studio", era: "modal", notable: true,
    appleMusic: "https://music.apple.com/us/album/e-s-p-2022-remaster/203773370",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/29/a5/b9/29a5b96c-8d4c-74c5-a886-58623e33de4c/mzi.gemrcyis.jpg/500x500bb.jpg",
  },
  {
    title: "Four & More", year: 1966, label: "Columbia", type: "live", era: "modal",
    appleMusic: "https://music.apple.com/us/album/four-more-2022-remaster/159071729",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/68/e7/de/68e7de24-da78-5928-e27f-505d90d8014e/827969359525.jpg/500x500bb.jpg",
  },
  {
    title: "Miles Smiles", year: 1967, label: "Columbia", type: "studio", era: "modal", notable: true,
    appleMusic: "https://music.apple.com/us/album/miles-smiles/209407331",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/68/90/5d/68905d0b-0340-ee6b-1b9d-7ecee44b1bee/dj.mykvokts.jpg/500x500bb.jpg",
  },
  {
    title: "Sorcerer", year: 1967, label: "Columbia", type: "studio", era: "modal",
    appleMusic: "https://music.apple.com/us/album/sorcerer/1392269555",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f6/99/88/f6998826-e089-8831-9de6-74863d2c4bfd/886447097199.jpg/500x500bb.jpg",
  },
  {
    title: "Nefertiti", year: 1968, label: "Columbia", type: "studio", era: "modal", notable: true,
    appleMusic: "https://music.apple.com/us/album/nefertiti-bonus-track-version/169899671",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/d0/21/fe/d021fe7c-1d72-0205-5f8d-18d9a7e062cd/074646568125.jpg/500x500bb.jpg",
  },
  {
    title: "Miles in the Sky", year: 1968, label: "Columbia", type: "studio", era: "modal",
    appleMusic: "https://music.apple.com/us/album/miles-in-the-sky/158514326",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music/f4/f3/c1/mzi.ossdtqon.jpg/500x500bb.jpg",
  },
  {
    title: "Filles de Kilimanjaro", year: 1969, label: "Columbia", type: "studio", era: "modal",
    appleMusic: "https://music.apple.com/us/album/filles-de-kilimanjaro/193522489",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features/v4/a7/85/95/a78595af-5a08-30aa-cc1a-304a509b77ba/dj.dncroraz.jpg/500x500bb.jpg",
  },

  // Electric era
  {
    title: "In a Silent Way", year: 1969, label: "Columbia", type: "studio", era: "electric", notable: true,
    appleMusic: "https://music.apple.com/us/album/in-a-silent-way/193603857",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4a/6c/db/4a6cdbee-444e-9416-93da-c448f5ad5ea1/696998655621.jpg/500x500bb.jpg",
  },
  {
    title: "Bitches Brew", year: 1970, label: "Columbia", type: "studio", era: "electric", notable: true,
    appleMusic: "https://music.apple.com/us/album/bitches-brew/168376392",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9b/e1/63/9be1630c-486d-760c-76cf-04282174700a/074646577424.jpg/500x500bb.jpg",
  },
  {
    title: "A Tribute to Jack Johnson", year: 1971, label: "Columbia", type: "studio", era: "electric", notable: true,
    appleMusic: "https://music.apple.com/us/album/a-tribute-to-jack-johnson/394930066",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/77/4d/80/774d8081-4746-d370-ade9-98497a8ae734/884977751857.jpg/500x500bb.jpg",
  },
  {
    title: "On the Corner", year: 1972, label: "Columbia", type: "studio", era: "electric", notable: true,
    appleMusic: "https://music.apple.com/us/album/on-the-corner/202539950",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/a9/94/a1/a994a1ff-9425-1f31-134d-407297457e8e/dj.gzlmjpzj.jpg/500x500bb.jpg",
  },
  {
    title: "Big Fun", year: 1974, label: "Columbia", type: "compilation", era: "electric",
    appleMusic: "https://music.apple.com/us/album/big-fun-2022-remaster/205881623",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/55/af/e9/55afe94e-4176-c81a-8edc-daaa28c66246/074646397329.jpg/500x500bb.jpg",
  },
  {
    title: "Get Up with It", year: 1974, label: "Columbia", type: "studio", era: "electric",
    appleMusic: "https://music.apple.com/us/album/get-up-with-it/157447301",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music/87/60/cf/mzi.vfmzbzof.jpg/500x500bb.jpg",
  },
  {
    title: "Agharta", year: 1975, label: "Columbia", type: "live", era: "electric",
    appleMusic: "https://music.apple.com/us/album/agharta/207340921",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features/v4/7c/02/8a/7c028ae6-8e60-c13d-c5a9-7cd9c37a067d/dj.ckbmfcsh.jpg/500x500bb.jpg",
  },
  {
    title: "Pangaea", year: 1976, label: "Columbia", type: "live", era: "electric",
    appleMusic: "https://music.apple.com/us/album/pangaea/158506488",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Features/v4/3e/3f/e3/3e3fe30a-73b1-a5be-2c1f-646a1d62e25b/dj.priowlre.jpg/500x500bb.jpg",
  },
  {
    title: "The Man with the Horn", year: 1981, label: "Columbia", type: "studio", era: "electric",
    appleMusic: "https://music.apple.com/us/album/the-man-with-the-horn-2022-remaster/215597651",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/1e/f8/58/1ef858da-a346-f7ed-656a-738709bc12ad/074643679022.jpg/500x500bb.jpg",
  },
  {
    title: "We Want Miles", year: 1982, label: "Columbia", type: "live", era: "electric",
    appleMusic: "https://music.apple.com/us/album/we-want-miles-live-2022-remaster/1641923660",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b2/f3/ea/b2f3ea45-7808-c179-acee-b79e40ac92bd/196589320131.jpg/500x500bb.jpg",
  },
  {
    title: "Star People", year: 1983, label: "Columbia", type: "studio", era: "electric",
    appleMusic: "https://music.apple.com/us/album/star-people-2022-remaster/277123890",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/66/a0/8f/66a08f61-eb80-ba2f-d99e-32514aa09ef0/888880098863.jpg/500x500bb.jpg",
  },
  {
    title: "Decoy", year: 1984, label: "Columbia", type: "studio", era: "electric",
    appleMusic: "https://music.apple.com/us/album/decoy-2022-remaster/186257176",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/2a/3a/c1/2a3ac1ec-bd77-62bb-78d1-f750fe57ab12/074643899123.jpg/500x500bb.jpg",
  },
  {
    title: "You're Under Arrest", year: 1985, label: "Columbia", type: "studio", era: "electric",
    appleMusic: "https://music.apple.com/us/album/youre-under-arrest-2022-remaster/190071333",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/87/3b/3d/873b3d1a-7836-e8f8-9c7a-d67cdcf8c524/074644002324.jpg/500x500bb.jpg",
  },
  {
    title: "Tutu", year: 1986, label: "Warner Bros.", type: "studio", era: "electric", notable: true,
    appleMusic: "https://music.apple.com/us/album/tutu/828544687",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/40/de/69/40de6964-245d-f678-26e3-06248fed8976/075992549028.jpg/500x500bb.jpg",
  },
  {
    title: "Music from Siesta", year: 1988, label: "Warner Bros.", type: "studio", era: "electric",
    appleMusic: "https://music.apple.com/us/album/music-from-siesta/390309096",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music/c2/c5/86/mzi.yjahetzd.jpg/500x500bb.jpg",
  },
  {
    title: "Amandla", year: 1989, label: "Warner Bros.", type: "studio", era: "electric",
    appleMusic: "https://music.apple.com/us/album/amandla/828551730",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/65/9a/0c/659a0cdd-158b-670b-8794-e7375f65eab5/075992587327.jpg/500x500bb.jpg",
  },
  {
    title: "Doo-Bop", year: 1992, label: "Warner Bros.", type: "studio", era: "electric",
    appleMusic: "https://music.apple.com/us/album/doo-bop/828607032",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/56/a2/f4/56a2f46e-b3ab-6650-75ab-bb2ff5664a64/075992693899.jpg/500x500bb.jpg",
  },
]
