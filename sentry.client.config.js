import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: 'https://924203e266ad2cffcf24dd3180287e9f@o4511673842794496.ingest.us.sentry.io/4512085057077248',

  // Errors only. No performance tracing and no session replay.
  tracesSampleRate: 0,

  // Everything here is a deliberate departure from the defaults, which collect a
  // good deal more than an error report needs.
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: { request: false, response: false },
    httpBodies: [],
    urlQueryParams: false,
    // Locals in scope at the point of an error can hold whatever a visitor typed,
    // so reports keep to frames and line numbers.
    stackFrameVariables: false,
  },
});
