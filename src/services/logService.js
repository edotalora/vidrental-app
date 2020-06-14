import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://74d861d8af804270a07b1bb22d26e37a@o405897.ingest.sentry.io/5272319",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
