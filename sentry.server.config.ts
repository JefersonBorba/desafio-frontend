import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://811466c19bb8caa8e1fdfc4e18001ae3@o4510260972879872.ingest.us.sentry.io/4510260979761152",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});
