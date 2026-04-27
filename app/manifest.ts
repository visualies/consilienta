import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Consilienta',
    short_name: 'Consilienta',
    description: 'Guiding your product from concept to approval. No matter how complex or innovative your development journey may be.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#4041D5',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
