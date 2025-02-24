import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Compass',
    short_name: 'Compass',
    start_url: '/',
    display: 'standalone',
    description: 'Navigate your world of data with ease',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['notes', 'productivity', 'utilities'],
    screenshots: [
      {
        src: '/screenshots/1.jpg',
        type: 'image/png',
        sizes: '540x720',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/2.jpg',
        type: 'image/jpeg',
        sizes: '540x720',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/3.jpg',
        type: 'image/jpeg',
        sizes: '540x720',
        form_factor: 'narrow',
      },
      {
        src: '/screenshots/4.jpg',
        type: 'image/png',
        sizes: '1024x593',
        form_factor: 'wide',
      },
      {
        src: '/screenshots/5.jpg',
        type: 'image/jpeg',
        sizes: '1024x593',
        form_factor: 'wide',
      },
      {
        src: '/screenshots/6.jpg',
        type: 'image/jpeg',
        sizes: '1024x593',
        form_factor: 'wide',
      },
    ],
    theme_color: '#21222d',
    background_color: '#21222d',
  };
}
