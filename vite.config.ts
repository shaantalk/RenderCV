import { sentryVitePlugin } from '@sentry/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { htmlPlugin } from './plugins/html-plugin.ts'

const env = loadEnv(process.env.NODE_ENV!, process.cwd(), '')

// https://vite.dev/config/
export default defineConfig({
  base: '/RenderCV/',
  define: {
    __DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  server: {
    open: true,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#tiptap': path.resolve(__dirname, './src/components/tiptap'),
      '#ui': path.resolve(__dirname, './src/components/ui'),
      '#widgets': path.resolve(__dirname, './src/components/widgets'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    htmlPlugin(),
    env.SENTRY_AUTH_TOKEN &&
    sentryVitePlugin({
      org: env.SENTRY_ORG,
      project: env.SENTRY_PROJECT,
      applicationKey: env.SENTRY_PROJECT,
      sourcemaps: {
        disable: env.SENTRY_AUTH_TOKEN ? false : true,
        filesToDeleteAfterUpload: ['**/*.map'],
      },
    }),
    VitePWA({
      manifest: false,
      injectRegister: 'script-defer',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,jpg,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // advancedChunks removed for standard Vite compatibility
      },
    },
    sourcemap: env.SENTRY_AUTH_TOKEN ? 'hidden' : false,
  },
})
