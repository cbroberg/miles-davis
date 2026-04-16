import { defineConfig, defineCollection, defineField } from '@webhouse/cms'

export default defineConfig({
  storage: { adapter: 'filesystem' },
  defaultLocale: 'en',
  locales: ['en', 'da'],
  build: {
    outDir: 'dist',
    baseUrl: '/',
    command: 'bun run build',
    workingDir: '.',
    timeout: 300,
  },
  collections: [
    defineCollection({
      name: 'albums',
      label: 'Albums',
      kind: 'page',
      urlPrefix: '/albums',
      description: 'Miles Davis studio and live albums with full personnel, track listings, and liner notes.',
      fields: [
        defineField({ name: 'title', type: 'text', label: 'Album Title', required: true }),
        defineField({ name: 'year', type: 'number', label: 'Release Year', required: true }),
        defineField({ name: 'label', type: 'text', label: 'Record Label', required: true }),
        defineField({ name: 'era', type: 'select', label: 'Era', options: [
          { value: 'bebop', label: 'Bebop' },
          { value: 'birth-of-the-cool', label: 'Birth of the Cool' },
          { value: 'hard-bop', label: 'Hard Bop & First Quintet' },
          { value: 'modal', label: 'Modal & Second Quintet' },
          { value: 'electric', label: 'Electric & Fusion' },
        ]}),
        defineField({ name: 'cover', type: 'image', label: 'Album Cover' }),
        defineField({
          name: 'personnel',
          type: 'array',
          label: 'Personnel',
          fields: [
            defineField({ name: 'musician', type: 'text', label: 'Musician', required: true }),
            defineField({ name: 'instrument', type: 'text', label: 'Instrument', required: true }),
          ],
        }),
        defineField({
          name: 'tracks',
          type: 'array',
          label: 'Track Listing',
          fields: [
            defineField({ name: 'title', type: 'text', label: 'Track Title', required: true }),
            defineField({ name: 'duration', type: 'text', label: 'Duration' }),
          ],
        }),
        defineField({ name: 'liner_notes', type: 'richtext', label: 'Liner Notes' }),
        defineField({ name: 'tags', type: 'tags', label: 'Tags (era/style)' }),
        defineField({ name: 'summary', type: 'textarea', label: 'Short Summary' }),
      ],
    }),

    defineCollection({
      name: 'eras',
      label: 'Eras',
      kind: 'page',
      urlPrefix: '/eras',
      description: 'The five major creative periods of Miles Davis, each with a tagline, years, and richtext article.',
      fields: [
        defineField({ name: 'title', type: 'text', label: 'Era Name', required: true }),
        defineField({ name: 'tagline', type: 'text', label: 'Tagline' }),
        defineField({ name: 'years', type: 'text', label: 'Years (e.g. 1944–1948)' }),
        defineField({ name: 'order', type: 'number', label: 'Sort Order' }),
        defineField({ name: 'article', type: 'richtext', label: 'Article' }),
        defineField({ name: 'color_accent', type: 'text', label: 'Accent colour (hex)' }),
      ],
    }),

    defineCollection({
      name: 'quotes',
      label: 'Quotes',
      kind: 'data',
      description: 'Authentic Miles Davis quotes rendered as a quote stream on the front page.',
      fields: [
        defineField({ name: 'quote', type: 'textarea', label: 'Quote', required: true }),
        defineField({ name: 'source', type: 'text', label: 'Source / Context' }),
        defineField({ name: 'year', type: 'number', label: 'Year' }),
      ],
    }),

    defineCollection({
      name: 'global',
      label: 'Site Settings',
      kind: 'global',
      description: 'Global site configuration: title, navigation links, and footer text.',
      fields: [
        defineField({ name: 'site_title', type: 'text', label: 'Site Title', required: true }),
        defineField({ name: 'site_subtitle', type: 'text', label: 'Site Subtitle' }),
        defineField({
          name: 'nav',
          type: 'array',
          label: 'Navigation Links',
          fields: [
            defineField({ name: 'label', type: 'text', label: 'Label', required: true }),
            defineField({ name: 'href', type: 'text', label: 'URL', required: true }),
          ],
        }),
        defineField({ name: 'footer_text', type: 'textarea', label: 'Footer Text' }),
      ],
    }),
  ],
})
