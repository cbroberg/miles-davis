import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Set base to '/repo-name/' for GitHub Pages project sites, or '/' for custom domains
  base: '/',
  plugins: [
    tailwindcss(),
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#app',
        additionalPrerenderRoutes: [
          '/about',
          '/albums',
          '/eras',
          '/albums/kind-of-blue',
          '/albums/bitches-brew',
          '/albums/birth-of-the-cool',
          '/albums/sketches-of-spain',
          '/albums/in-a-silent-way',
          '/albums/on-the-corner',
          '/eras/bebop',
          '/eras/birth-of-the-cool',
          '/eras/hard-bop',
          '/eras/modal',
          '/eras/electric',
        ],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: '/404.html',
      },
    }),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
})
