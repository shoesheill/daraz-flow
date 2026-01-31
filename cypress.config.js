const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.daraz.com.np',
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 15000,
    viewportWidth: 1366,
    viewportHeight: 768,
    pageLoadTimeout: 120000, // 2 min — Daraz redirects after login and can be slow to fire load event
  },
})
