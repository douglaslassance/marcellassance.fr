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
      // Only needed at build time, to upload source maps. Absent locally, which
      // makes the plugin skip the upload and carry on.
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // This is a static build on Pages, so there is no server runtime to
      // instrument and no server SDK to ship.
      enabled: { client: true, server: false },
      sourcemaps: {
        // Send the maps to Sentry, then drop every one of them from the build so
        // the unminified source is not downloadable from the live site. Matching
        // all of *.map rather than *.js.map matters: Astro removes its server
        // intermediates but leaves their .mjs.map files sitting in dist.
        filesToDeleteAfterUpload: ['./dist/**/*.map'],
      },
      // Strip the parts of the SDK this site does not use.
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
