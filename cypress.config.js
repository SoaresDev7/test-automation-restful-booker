const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "duhehu",
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    baseUrl: 'https://restful-booker.herokuapp.com',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
