// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sentry({
      org: 'douglaslassance',
      project: 'marcellassance-fr',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      enabled: { client: true, server: false },
      sourcemaps: {
        filesToDeleteAfterUpload: ['./dist/**/*.map'],
      },
      bundleSizeOptimizations: {
        excludeTracing: true,
        excludeReplayIframe: true,
        excludeReplayShadowDom: true,
        excludeReplayWorker: true,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
