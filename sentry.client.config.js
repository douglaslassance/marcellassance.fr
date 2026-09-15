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
    // Nothing here runs GraphQL, AI, or database instrumentation, so these three
    // collect nothing today. They are pinned anyway: an unset field takes the
    // SDK's permissive default, which is what would make adding one of those
    // integrations later a silent change rather than a visible one.
    graphQL: { document: false, variables: false },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    // Source context lines around each frame. Left at the SDK default rather
    // than trimmed, because this is our own code and Sentry already has it from
    // the uploaded source maps.
    frameContextLines: 5,
  },

  // `urlQueryParams` above covers the copy the SDK extracts into
  // `request.query_string`, but not `request.url` itself, which the browser SDK
  // fills from `document.location.href` on every event. Both have to go, or the
  // query string ships anyway. Same hook the Workers carry, for the same reason.
  beforeSend(event) {
    if (event.request) {
      event.request.url = event.request.url?.split('?')[0];
      delete event.request.query_string;
    }
    return event;
  },

  // Navigation and fetch crumbs carry URLs of their own, and they ride along on
  // every later event in the same session, outliving the page that set them.
  beforeBreadcrumb(breadcrumb) {
    const data = breadcrumb.data;
    if (data) {
      for (const key of ['url', 'from', 'to']) {
        if (typeof data[key] === 'string') data[key] = data[key].split('?')[0];
      }
    }
    return breadcrumb;
  },
});
