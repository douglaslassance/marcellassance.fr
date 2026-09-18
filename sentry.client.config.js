import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: 'https://924203e266ad2cffcf24dd3180287e9f@o4511673842794496.ingest.us.sentry.io/4512085057077248',

  // Errors only. No performance tracing and no session replay.
  tracesSampleRate: 0,

  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: { request: false, response: false },
    httpBodies: [],
    urlQueryParams: false,
    stackFrameVariables: false,
    graphQL: { document: false, variables: false },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    frameContextLines: 5,
  },

  beforeSend(event) {
    if (event.request) {
      event.request.url = event.request.url?.split('?')[0];
      delete event.request.query_string;
    }
    return event;
  },

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
