import { expect, test } from "@playwright/test";

// test("Navigating sidebar", async ({ page }) => {
//   await page.goto("/");
//   await page.getByRole("link", { name: "Files" }).click();
//   await expect(page.getByRole("heading")).toContainText("Files");

//   await page.getByRole("link", { name: "Settings" }).click();
//   await expect(page.getByRole("heading")).toContainText("Settings");
// });

test("Navigating to a not-found route", async ({ page }) => {
  await page.goto("/not-found");
  await page.getByRole("link", { name: "Start Over" }).click();
});
