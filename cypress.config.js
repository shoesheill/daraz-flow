const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.daraz.com.np',
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 15000,
    // retries: { runMode: 1, openMode: 0 },
    viewportWidth: 1366,
    viewportHeight: 768,
    // pageLoadTimeout: 120000,
    // setupNodeEvents(on, config) {
    //   on('before:browser:launch', (browser, launchOptions) => {
    //     if (browser.family === 'chromium' && browser.name !== 'electron') {
    //       launchOptions.args = launchOptions.args || []
    //       launchOptions.args.push(
    //         '--disable-gpu',
    //         '--disable-dev-shm-usage',
    //         '--no-sandbox',
    //         '--disable-setuid-sandbox',
    //         '--disable-software-rasterizer',
    //         '--disable-extensions',
    //         '--disable-background-networking'
    //       )
    //     }
    //     return launchOptions
    //   })
    // }
  }
})
