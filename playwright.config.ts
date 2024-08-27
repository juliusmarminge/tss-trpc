import { defineConfig, devices } from "@playwright/test";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const headless = !!process.env.CI || process.env.PLAYWRIGHT_HEADLESS === "true";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  reporter: [["line"]],

  webServer: [
    // {
    //   command:
    //     "NITRO_PRESET=node_server vinxi build && vinxi start --port 3030",
    //   port: 3030,
    //   reuseExistingServer: !process.env.CI,
    //   stdout: "pipe",
    // },
    {
      command: "vinxi dev --port 3031",
      port: 3031,
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
    },
  ],

  projects: [
    // {
    //   name: "prod",
    //   use: {
    //     headless,
    //     ...devices["Desktop Chrome"],
    //     baseURL: "http://localhost:3030/",
    //   },
    // },
    {
      name: "dev",
      use: {
        headless,
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3031/",
      },
    },
  ],
});
