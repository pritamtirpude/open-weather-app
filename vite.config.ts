import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';
import { defineConfig } from 'vite';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: [
    '/assets/images/*.png',
    '/assets/images/*.svg',
    '/assets/images/*.webp',
    '/fonts/DM_Sans/*.ttf',
    '/fonts/Bricolage_Grotesque/*.ttf',
  ],
  manifest: {
    name: 'SkyWatch - Real-Time Weather Updates',
    short_name: 'SkyWatch',
    start_url: '/',
    description:
      'Get the latest weather updates in real-time with hourly forecasts and location-based filtering',
    theme_color: '#4455da',
    scope: '/',
    background_color: '#03012d',
    display: 'standalone',
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
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/maskable_icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshot_desktop_one.png',
        sizes: '1280x768',
        type: 'image/png',
        form_factor: 'wide',
        label:
          'Current day weather with hourly forecasts showing temperature, weather condition and location',
      },
      {
        src: '/screenshot_desktop_two.png',
        sizes: '1280x768',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Weather dashboard with location search and hourly filtering options',
      },
      {
        src: '/screenshot_narrow_one.png',
        sizes: '540x361',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Mobile weather view with hourly temperature and condition updates',
      },
      {
        src: '/screenshot_narrow_two.png',
        sizes: '540x361',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Location-based weather search with hourly forecast filtering',
      },
    ],
  },
  devOptions: {
    enabled: process.env.VITE_MODE === 'development',
    type: process.env.VITE_MODE === 'development' ? 'module' : 'classic',
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(pwaOptions)],
  server: {
    host: true,
  },
});
