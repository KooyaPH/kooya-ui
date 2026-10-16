import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
const base = process.env.V1_BASE_URL ?? "http://127.0.0.1:5831/";
const phase = process.env.V1_PHASE ?? "workspace";
const output = "output/playwright/v1";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [],
  failures = [],
  passed = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push({ url: page.url(), error: e.message }));
const palettes = [
  "olive",
  "slate",
  "navy",
  "graphite",
  "stone",
  "teal",
  "indigo",
  "steel",
  "sage",
  "plum",
  "cocoa",
  "forest",
];
async function check(name, fn) {
  try {
    await fn();
    passed.push(name);
  } catch (e) {
    failures.push({ name, error: e.message });
    await page
      .screenshot({
        path: `${output}/${phase}-failure-${failures.length}.png`,
        fullPage: true,
      })
      .catch(() => {});
  }
}
async function fit() {
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
}
if (phase === "workspace") {
  await page.goto(base + "#/overview");
  for (const palette of palettes)
    for (const mode of ["light", "dark"])
      for (const density of ["compact", "comfortable"]) {
        await page.evaluate(
          (value) =>
            localStorage.setItem(
              "kooya.ui.v1.appearance",
              JSON.stringify(value),
            ),
          { palette, customAccent: null, mode, density },
        );
        await page.reload();
        await page.locator(".poc-workspace").waitFor();
        for (const scene of [
          "dashboard",
          "cms",
          "work",
          "people",
          "settings",
          "components",
        ])
          await check(`${palette}/${mode}/${density}/${scene}`, async () => {
            await page.evaluate(
              (scene) => (location.hash = `#/workspace/${scene}`),
              scene,
            );
            await expect(page.locator(".poc-work-area")).toHaveAttribute(
              "data-scene",
              scene,
            );
            await expect(page.locator(".ku-v1-review")).toHaveAttribute(
              "data-mode",
              mode,
            );
            await fit();
          });
      }
  for (const width of [320, 390, 768, 1024, 1440])
    for (const mode of ["light", "dark"]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(
        (mode) =>
          localStorage.setItem(
            "kooya.ui.v1.appearance",
            JSON.stringify({
              palette: "olive",
              customAccent: null,
              mode,
              density: "compact",
            }),
          ),
        mode,
      );
      await page.reload();
      for (const scene of [
        "dashboard",
        "cms",
        "work",
        "people",
        "settings",
        "components",
      ])
        await check(`responsive/${width}/${mode}/${scene}`, async () => {
          await page.evaluate(
            (scene) => (location.hash = `#/workspace/${scene}`),
            scene,
          );
          await expect(page.locator(".poc-work-area")).toHaveAttribute(
            "data-scene",
            scene,
          );
          await fit();
          if (scene === "cms" || scene === "settings")
            await page.screenshot({
              path: `${output}/${scene}-${width}-${mode}.png`,
              fullPage: true,
            });
        });
    }
}
if (phase === "overlays") {
  for (const width of [320, 390, 768, 1440])
    await check(`nested overlays/${width}`, async () => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + "#/stress");
      await page
        .getByRole("heading", { name: "Content and interaction checks" })
        .waitFor();
      await fit();
      await page.getByRole("combobox", { name: "Clipped selector" }).click();
      const dropdown = page.locator(".ant-select-dropdown:visible");
      await expect(dropdown).toBeInViewport();
      await expect
        .poll(async () => {
          const box = await dropdown.boundingBox();
          return !!box && box.x >= -1 && box.x + box.width <= width + 1;
        })
        .toBe(true);
      await page.keyboard.press("Escape");
      await expect(dropdown).not.toBeVisible();
      await page
        .getByRole("button", { name: "Open nested editor", exact: true })
        .click();
      const dialog = page.getByRole("dialog", { name: "Nested editor" });
      await expect(dialog).toBeVisible();
      await dialog.getByRole("combobox", { name: "Editor selector" }).click();
      await expect(page.locator(".ant-select-dropdown:visible")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator(".ant-select-dropdown:visible")).toHaveCount(0);
      await expect(dialog).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await page
        .getByRole("button", { name: "Open detail drawer", exact: true })
        .click();
      const drawer = page.getByRole("dialog", { name: "Detail drawer" });
      await expect(drawer).toBeVisible();
      await drawer.getByRole("combobox", { name: "Drawer selector" }).click();
      await expect(page.locator(".ant-select-dropdown:visible")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator(".ant-select-dropdown:visible")).toHaveCount(0);
      await expect(drawer).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(drawer).not.toBeVisible();
      await fit();
    });
}
if (phase === "families") {
  const inventory = JSON.parse(
    await fs.readFile("docs/v1/component-inventory.json", "utf8"),
  );
  const names = [
    "kooya-olive",
    "slate",
    "navy",
    "graphite",
    "warm-stone",
    "deep-teal",
    "indigo",
    "steel-blue",
    "sage",
    "plum",
    "cocoa",
    "forest",
  ];
  for (const [index, entry] of inventory.entries.entries()) {
    const variant = entry.variants[0];
    if (!variant) {
      failures.push({
        name: entry.id,
        error: "Component entry has no example",
      });
      continue;
    }
    await page.goto(
      base +
        `?mode=light&density=compact&palette=olive#/preview/${encodeURIComponent(variant.id)}`,
    );
    await page.locator("[data-preview-id]").waitFor({ timeout: 15000 });
    await page
      .locator('.preview-loading:not([role="status"])')
      .waitFor({ state: "hidden", timeout: 15000 });
    for (const [paletteIndex, palette] of palettes.entries())
      for (const mode of ["light", "dark"])
        for (const density of ["compact", "comfortable"])
          await check(
            `${entry.kind}/${entry.id}/${palette}/${mode}/${density}`,
            async () => {
              await page.evaluate(
                (appearance) =>
                  window.postMessage(
                    { type: "kooya-preview-settings", ...appearance },
                    location.origin,
                  ),
                { palette, mode, density },
              );
              const root = page.locator(".preview-root");
              await expect(root).toHaveAttribute("data-mode", mode);
              await expect(root).toHaveAttribute("data-density", density);
              await expect(root).toHaveAttribute(
                "data-theme",
                names[paletteIndex],
              );
              await expect(
                page.getByText("This example could not be loaded", {
                  exact: true,
                }),
              ).toHaveCount(0);
              await fit();
            },
          );
    if ((index + 1) % 10 === 0)
      console.log(
        JSON.stringify({
          entries: index + 1,
          passed: passed.length,
          failed: failures.length,
        }),
      );
  }
}
if (phase === "catalogue") {
  const inventory = JSON.parse(
    await fs.readFile("docs/v1/component-inventory.json", "utf8"),
  );
  const start = Number(process.env.V1_START ?? 0),
    limit = Number(process.env.V1_LIMIT ?? inventory.variants);
  const variants = inventory.entries.flatMap((e) =>
    e.variants.map((v) => ({ ...v, entry: e.id, kind: e.kind })),
  );
  const modes = (process.env.V1_MODES ?? "light,dark").split(",");
  for (const [index, variant] of variants.entries())
    if (index >= start && index < start + limit)
      for (const mode of modes) {
        await check(`${index}/${variant.id}/${mode}`, async () => {
          const before = errors.length;
          await page.goto(
            base +
              `?mode=${mode}&density=compact&palette=olive#/preview/${encodeURIComponent(variant.id)}`,
          );
          await page.locator("[data-preview-id]").waitFor({ timeout: 15000 });
          await expect(
            page.getByText("This example could not be loaded", { exact: true }),
          ).toHaveCount(0);
          await page
            .locator('.preview-loading:not([role="status"])')
            .waitFor({ state: "hidden", timeout: 15000 });
          await fit();
          expect(errors.length).toBe(before);
        });
        if ((index + 1) % 50 === 0)
          console.log(
            JSON.stringify({
              index: index + 1,
              passed: passed.length,
              failed: failures.length,
            }),
          );
      }
}
await fs.writeFile(
  `${output}/${phase}-report-${process.env.V1_START ?? 0}.json`,
  JSON.stringify({ base, phase, passed, failures, errors }, null, 2),
);
console.log(
  JSON.stringify({
    phase,
    passed: passed.length,
    failed: failures.length,
    errors: errors.length,
  }),
);
await browser.close();
if (failures.length || errors.length) process.exitCode = 1;
