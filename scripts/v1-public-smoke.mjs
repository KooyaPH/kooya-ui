import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import crypto from "node:crypto";
const base = "https://ui.test.kooyaai.com/";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const assets = new Set(),
  errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.url().startsWith(base + "assets/")) assets.add(r.url());
});
await page.goto(base);
await page.getByRole("heading", { name: "Content, with purpose." }).waitFor();
await page.screenshot({
  path: "output/playwright/v1/public-editorial-desktop.png",
  fullPage: true,
});
await page.getByRole("button", { name: "Appearance", exact: true }).click();
const palette = page.getByRole("combobox").last();
await page.getByLabel("Dark", { exact: true }).check();
await expect(page.locator(".ku-v1-review")).toHaveAttribute(
  "data-mode",
  "dark",
);
await page.getByLabel("System", { exact: true }).check();
await page.getByRole("button", { name: "Close", exact: true }).click();
await page.getByRole("link", { name: "Components", exact: true }).click();
await page.locator(".catalog-site").waitFor();
expect(
  await page.evaluate(
    () => JSON.parse(localStorage.getItem("kooya.ui.v1.appearance")).mode,
  ),
).toBe("system");
await page.goto(base + "#/workspace/settings");
await page.locator('.poc-work-area[data-scene="settings"]').waitFor();
await page.screenshot({
  path: "output/playwright/v1/public-governance-dark.png",
  fullPage: true,
});
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base);
await page.locator(".poc-workspace").waitFor();
expect(
  await page.evaluate(
    () => document.documentElement.scrollWidth <= innerWidth + 1,
  ),
).toBe(true);
await page.screenshot({
  path: "output/playwright/v1/public-editorial-phone.png",
  fullPage: true,
});
const provenance = await (
  await context.request.get(base + "build-provenance.json")
).json();
let verified = 0;
for (const url of assets) {
  const response = await context.request.get(url);
  expect(response.ok()).toBe(true);
  const bytes = await response.body();
  expect(crypto.createHash("sha256").update(bytes).digest("hex")).toBe(
    provenance.assets[url.slice(base.length)],
  );
  verified++;
}
expect(errors).toEqual([]);
await fs.writeFile(
  "output/playwright/v1/public-smoke.json",
  JSON.stringify(
    {
      base,
      fingerprint: provenance.source_fingerprint,
      verifiedAssets: verified,
      runtimeErrors: errors,
      systemPreferenceRetained: true,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({ verifiedAssets: verified, errors: errors.length }),
);
await browser.close();
