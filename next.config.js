// const { i18n } = require("./next-i18next.config");

module.exports = {
  // i18n,
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
    currency: "USD",
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({
//   i18n,
//   devIndicators: {},
//   publicRuntimeConfig: {
//     // Available on both server and client
//     theme: "DEFAULT",
//     currency: "USD",
//   },
// });
