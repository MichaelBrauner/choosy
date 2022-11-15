import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '@braunstetter/choosy',
  fixturesFolder: "tests/templates",
  downloadsFolder: "tests/downloads",
  supportFolder: "tests/support",
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/integration/**/*.cy.js',
    supportFile: false
  }
});
