import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import {
  layouts,
  palettes,
  scenes,
  href,
  defaultSelection,
} from "../apps/playground/src/poc/model.ts";
const base = process.env.POC_BASE_URL ?? "http://127.0.0.1:5825/";
const phase = process.env.POC_PHASE ?? "all";
const output = "output/playwright/poc";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const errors = [],
  warnings = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (e) => {
  if (e.type() === "warning") warnings.push(e.text());
});
const report = {
  base,
  phase,
  started: new Date().toISOString(),
  combinations: [],
  responsive: [],
  interactions: [],
  errors,
  warnings,
};
async function go(s) {
  const url = base + href(s);
  if (page.url().split("#")[0] === base)
    await page.evaluate((hash) => (location.hash = hash), href(s));
  else await page.goto(url);
  await expect(page.locator(".poc-workspace")).toHaveAttribute(
    "data-layout",
    s.layout,
  );
  await expect(page.locator(".poc-root").first()).toHaveAttribute(
    "data-mode",
    s.mode,
  );
  await expect(page.locator(".poc-root").first()).toHaveAttribute(
    "data-density",
    s.density,
  );
  await expect(page.locator(".poc-work-area")).toHaveAttribute(
    "data-scene",
    s.scene,
  );
  await expect(page.locator(".poc-root").first()).toHaveAttribute(
    "data-theme",
    palettes
      .find((x) => x.id === s.palette)
      .name.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-"),
  );
  await expect(page.locator(".poc-work-area h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}
async function check(name, fn) {
  await fn();
  report.interactions.push(name);
  console.log("PASS", name);
}
try {
  if (["matrix", "all"].includes(phase)) {
    for (const layout of layouts)
      for (const palette of palettes)
        for (const mode of ["light", "dark"])
          for (const density of ["comfortable", "compact"]) {
            const s = {
              ...defaultSelection,
              layout: layout.id,
              palette: palette.id,
              mode,
              density,
            };
            await go(s);
            const width = await page.evaluate(() => ({
              width: innerWidth,
              scroll: document.documentElement.scrollWidth,
              accent: getComputedStyle(
                document.querySelector(".poc-root"),
              ).getPropertyValue("--ku-accent"),
            }));
            if (width.scroll > width.width + 1)
              throw new Error(
                `Overflow ${JSON.stringify(s)} ${JSON.stringify(width)}`,
              );
            report.combinations.push({ ...s, ...width });
            if (report.combinations.length % 48 === 0)
              console.log("MATRIX", report.combinations.length);
          }
  }
  if (["responsive", "matrix", "all"].includes(phase)) {
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const layout of layouts)
        for (const scene of scenes) {
          const s = {
            ...defaultSelection,
            layout: layout.id,
            scene: scene.id,
            palette: layout.palette,
          };
          await go(s);
          const bounds = await page.evaluate(() => ({
            width: innerWidth,
            scroll: document.documentElement.scrollWidth,
          }));
          if (bounds.scroll > width + 1)
            throw new Error(
              `Responsive overflow ${layout.id}/${scene.id}/${width}: ${bounds.scroll}`,
            );
          report.responsive.push({
            layout: layout.id,
            scene: scene.id,
            ...bounds,
          });
        }
      console.log("RESPONSIVE", width);
    }
  }
  if (["screenshots", "all"].includes(phase)) {
    for (const layout of layouts) {
      const s = {
        ...defaultSelection,
        layout: layout.id,
        palette: layout.palette,
        scene:
          layout.id === "delivery"
            ? "work"
            : layout.id === "observatory"
              ? "dashboard"
              : layout.id === "directory"
                ? "people"
                : layout.id === "governance"
                  ? "settings"
                  : "cms",
      };
      await page.setViewportSize({ width: 1440, height: 1000 });
      await go(s);
      await page.screenshot({
        path: `${output}/${layout.id}-desktop.png`,
        fullPage: true,
      });
      await page.locator(".poc-workspace").screenshot({
        path: `apps/playground/public/poc-thumbnails/${layout.id}.jpg`,
        type: "jpeg",
        quality: 82,
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await go(s);
      await page.screenshot({
        path: `${output}/${layout.id}-phone.png`,
        fullPage: true,
      });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + "#/overview");
    await expect(page.locator(".poc-direction-card")).toHaveCount(12);
    await page.screenshot({
      path: `${output}/gallery-desktop.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: `${output}/gallery-phone.png`,
      fullPage: true,
    });
  }
  if (["interactions", "all"].includes(phase)) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await go(defaultSelection);
    await check(
      "CMS validation, create, and theme change preserve records",
      async () => {
        await page
          .getByRole("button", { name: "Create page", exact: true })
          .click();
        await page
          .getByRole("button", { name: "Save page", exact: true })
          .click();
        await expect(page.getByText("Enter a page title")).toBeVisible();
        await page
          .getByRole("dialog")
          .getByRole("textbox", { name: /Page title/ })
          .fill("A carefully considered test page");
        await page
          .getByRole("dialog")
          .getByRole("textbox", { name: /Content/ })
          .fill("A fictional page for the POC browser check.");
        await page
          .getByRole("button", { name: "Save page", exact: true })
          .click();
        await expect(
          page.getByRole("button", {
            name: "A carefully considered test page",
            exact: true,
          }),
        ).toBeVisible();
        await page.getByText("Dark", { exact: true }).click();
        await expect(
          page.getByRole("button", {
            name: "A carefully considered test page",
            exact: true,
          }),
        ).toBeVisible();
      },
    );
    await check("Content search, empty result, and recovery", async () => {
      await page
        .getByRole("textbox", { name: "Search content" })
        .fill("no-such-content");
      await expect(page.getByText("No pages match your search")).toBeVisible();
      await page.getByRole("textbox", { name: "Search content" }).fill("");
      await expect(
        page.getByRole("button", {
          name: "A carefully considered test page",
          exact: true,
        }),
      ).toBeVisible();
    });
    await check("Content edit and publishing", async () => {
      await page
        .getByRole("button", {
          name: "A carefully considered test page",
          exact: true,
        })
        .click();
      await page
        .getByRole("dialog")
        .getByRole("textbox", { name: /Page title/ })
        .fill("A considered update");
      await page.getByLabel("Publishing status", { exact: true }).click();
      await page
        .getByRole("combobox", { name: "Publishing status" })
        .press("ArrowDown");
      await page
        .getByRole("combobox", { name: "Publishing status" })
        .press("ArrowDown");
      await page
        .getByRole("combobox", { name: "Publishing status" })
        .press("Enter");
      await page
        .getByRole("button", { name: "Save page", exact: true })
        .click();
      await expect(
        page.getByRole("row").filter({
          has: page.getByRole("button", {
            name: "A considered update",
            exact: true,
          }),
        }),
      ).toContainText("Published");
    });
    await check("Create task and change status", async () => {
      await page
        .getByRole("navigation", { name: "Workspace navigation" })
        .getByRole("button", { name: /Work queue/ })
        .click();
      await page
        .getByRole("button", { name: "Create task", exact: true })
        .click();
      await page.getByLabel("Task title").fill("Review the POC");
      await page.getByRole("button", { name: "OK", exact: true }).click();
      const select = page.getByRole("combobox", {
        name: "Status for Review the POC",
      });
      await select.click();
      await select.press("ArrowDown");
      await select.press("ArrowDown");
      await select.press("Enter");
      await expect(
        page.getByText("Review the POC", { exact: true }),
      ).toBeVisible();
      await page.getByText("Board view", { exact: true }).click();
      await expect(page.locator(".poc-board > section").nth(2)).toContainText(
        "Review the POC",
      );
    });
    await check("Invite validation and fictional member creation", async () => {
      await page
        .getByRole("navigation", { name: "Workspace navigation" })
        .getByRole("button", { name: "People", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Invite a person", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Add sample invitation", exact: true })
        .click();
      await expect(
        page.getByText("Enter a name", { exact: true }),
      ).toBeVisible();
      await page.getByLabel("Full name").fill("Robin Example");
      await page.getByLabel("Email address").fill("robin@example.com");
      await page
        .getByRole("button", { name: "Add sample invitation", exact: true })
        .click();
      await expect(
        page.getByRole("heading", { name: "Robin Example" }),
      ).toBeVisible();
    });
    await check("Settings save and workspace identity", async () => {
      await page
        .getByRole("navigation", { name: "Workspace navigation" })
        .getByRole("button", { name: "Settings", exact: true })
        .click();
      await page
        .getByLabel("Workspace name", { exact: true })
        .fill("Considered Studio");
      await page.getByRole("button", { name: "Save changes" }).click();
      await expect(page.locator(".poc-workspace-picker")).toContainText(
        "Considered Studio",
      );
    });
    await check("Component modal, drawer and Escape", async () => {
      await page
        .getByRole("navigation", { name: "Workspace navigation" })
        .getByRole("button", { name: "Components", exact: true })
        .click();
      const trigger = page.getByRole("button", {
        name: "Open dialog",
        exact: true,
      });
      await trigger.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).not.toBeVisible();
      await page
        .getByRole("button", { name: "Open drawer", exact: true })
        .click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).not.toBeVisible();
    });
    await check(
      "Appearance favorite persists and restores the exact combination",
      async () => {
        await page
          .getByRole("button", { name: "Save favorite", exact: true })
          .click();
        await page
          .getByRole("link", { name: "Directions", exact: true })
          .click();
        await page.getByRole("button", { name: /Favorites/ }).click();
        await expect(
          page.getByRole("region", { name: "Saved combinations" }),
        ).toBeVisible();
        await page.reload();
        await page.getByRole("button", { name: /Favorites/ }).click();
        await expect(
          page.getByRole("region", { name: "Saved combinations" }),
        ).toBeVisible();
        await page.locator(".poc-saved-combinations a").first().click();
        await expect(page.locator(".poc-root").first()).toHaveAttribute(
          "data-mode",
          "dark",
        );
      },
    );
    await check("Comparison isolates two working previews", async () => {
      await page.getByRole("button", { name: "Compare", exact: true }).click();
      await expect(page.locator("iframe")).toHaveCount(2);
      await expect(
        page.frameLocator("iframe").first().locator(".poc-workspace"),
      ).toBeVisible();
      await expect(
        page.frameLocator("iframe").nth(1).locator(".poc-workspace"),
      ).toBeVisible();
      await page
        .getByRole("button", { name: "Toggle comparison B mode" })
        .click();
      await expect(
        page.frameLocator("iframe").nth(1).locator(".poc-root"),
      ).toHaveAttribute("data-mode", "dark");
    });
    await check("Phone navigation and close on destination", async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await go({ ...defaultSelection, layout: "atlas" });
      await page
        .getByRole("button", { name: "Open workspace navigation" })
        .click();
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "People", exact: true })
        .click();
      await expect(
        page.getByRole("heading", { name: "Good people. Shared purpose." }),
      ).toBeVisible();
      await expect(page.getByRole("dialog")).not.toBeVisible();
    });
  }
  if (errors.length)
    throw new Error("Browser page errors: " + errors.join("\n"));
  report.finished = new Date().toISOString();
  console.log(
    JSON.stringify({
      combinations: report.combinations.length,
      responsive: report.responsive.length,
      interactions: report.interactions.length,
      errors,
      warnings: [...new Set(warnings)],
    }),
  );
} catch (error) {
  report.failure = String(error.stack ?? error);
  await page.screenshot({
    path: `${output}/failure-${phase}.png`,
    fullPage: true,
  });
  throw error;
} finally {
  await fs.writeFile(
    `${output}/results-${phase}.json`,
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
