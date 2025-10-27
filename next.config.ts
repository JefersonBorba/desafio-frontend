import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      "picsum.photos",
      "i.ytimg.com",
      "yt3.ggpht.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: "cabinsoftware",

  project: "javascript-nextjs",

  silent: !process.env.CI,

  widenClientFileUpload: true,

  disableLogger: true,

  automaticVercelMonitors: true,
});
