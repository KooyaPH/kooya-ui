import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
const item = "kooya-blocks-data-workbench-standard";
const base = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:5301";
const url = (mode = "light", density = "comfortable", fixture = "catalog") =>
  `${base}/audit.html?item=${item}&mode=${mode}&density=${density}&fixture=${fixture}&profile=${fixture === "catalog" ? "default" : "embedded"}`;
async function ready(
  page: Page,
  mode = "light",
  density = "comfortable",
  fixture = "catalog",
) {
  await page.goto(url(mode, density, fixture));
  await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
}
async function settleOverlayMotion(page: Page) {
  // Let native motion mount, then wait for finite entrance/exit effects to finish.
  await page.waitForTimeout(50);
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          [
            ...document.querySelectorAll(
              ".ant-modal,.ant-drawer-content-wrapper,.ant-select-dropdown,.ant-table-filter-dropdown",
            ),
          ]
            .filter((el) => el.getBoundingClientRect().width > 0)
            .every((el) =>
              el
                .getAnimations()
                .every((animation) => animation.playState !== "running"),
            ),
        ),
      { message: "Native overlay motion finishes before stable-state capture" },
    )
    .toBe(true);
}
const tableRows = (page: Page) =>
  page.locator(".ant-table-tbody tr.ant-table-row");
const nameField = (page: Page) =>
  page.getByRole("textbox", { name: /Project$/ });
async function downloadedCSV(page: Page) {
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export CSV", exact: true }).click();
  const download = await pending;
  return fs.readFile((await download.path())!, "utf8");
}

test("regression: narrow document contains table overflow", async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await ready(page);
  await page.screenshot({
    path: info.outputPath("narrow.png"),
    fullPage: true,
    animations: "allow",
    caret: "initial",
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  const scroll = page.locator(".ant-table-content");
  expect(
    await scroll.evaluate((el) => el.scrollWidth > el.clientWidth),
  ).toBeTruthy();
});

test("regression: reset returns pagination to first page", async ({
  page,
}, info) => {
  await ready(page);
  await page.locator(".ant-pagination-item-3").click();
  await expect(tableRows(page)).toHaveCount(2);
  await page.getByRole("button", { name: "Reset view", exact: true }).click();
  await page.screenshot({
    path: info.outputPath("reset-page.png"),
    fullPage: true,
    animations: "allow",
    caret: "initial",
  });
  await expect(page.locator(".ant-pagination-item-active")).toHaveText("1");
  await expect(tableRows(page)).toHaveCount(5);
  await expect(tableRows(page).first()).toContainText("Brand refresh");
});

test("search, filter, sort, page and CSV use same record set", async ({
  page,
}) => {
  await ready(page);
  await expect(tableRows(page)).toHaveCount(5);
  await page
    .getByRole("searchbox", { name: "Search Project workspace", exact: true })
    .fill("Design");
  await expect(tableRows(page)).toHaveCount(2);
  await page.getByRole("columnheader", { name: /Hours/ }).click();
  let csv = await downloadedCSV(page);
  expect(csv).toBe(
    '"Name","Category","Status","Hours"\n"Design system","Product","Pending","120"\n"Design system 2","Product","Pending","264"',
  );
  await page.getByRole("columnheader", { name: /Hours/ }).click();
  csv = await downloadedCSV(page);
  expect(csv.split("\n")[1]).toContain("Design system 2");
  await page.getByRole("button", { name: "Reset view", exact: true }).click();
  await expect(tableRows(page)).toHaveCount(5);
  await page.locator(".ant-pagination-item-2").click();
  csv = await downloadedCSV(page);
  expect(csv.split("\n")).toHaveLength(13);
  await tableRows(page).first().getByRole("checkbox").check();
  csv = await downloadedCSV(page);
  expect(csv).toContain("Release review");
  expect(csv.split("\n")).toHaveLength(2);
  await page
    .getByRole("button", { name: "Archive selected", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText(
    "Selected records archived locally.",
  );
  await expect(tableRows(page).first()).toContainText("Archived");
});

test("actual add validation, edit save/cancel and dirty transitions", async ({
  page,
}) => {
  await ready(page);
  await page.getByRole("button", { name: "Add record", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Add record", exact: true });
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Save record", exact: true }).click();
  await expect(page.getByText("Enter a name.", { exact: true })).toBeVisible();
  await expect(nameField(page)).toHaveAttribute("aria-invalid", "true");
  await nameField(page).fill("Audit record Ω العربية 👩🏽‍💻 e\u0301");
  await page
    .getByRole("textbox", { name: "Notes", exact: true })
    .fill("Dirty notes");
  await page.evaluate(() =>
    window.postMessage(
      { type: "kooya-preview-settings", mode: "dark", density: "compact" },
      location.origin,
    ),
  );
  await expect(page.locator("html")).toHaveAttribute("data-mode", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-density", "compact");
  await expect(
    page.getByRole("textbox", { name: "Notes", exact: true }),
  ).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBeTruthy();
  await page.setViewportSize({ width: 320, height: 700 });
  await expect(nameField(page)).toHaveValue(
    "Audit record Ω العربية 👩🏽‍💻 e\u0301",
  );
  await expect(
    page.getByRole("textbox", { name: "Notes", exact: true }),
  ).toHaveValue("Dirty notes");
  await page.getByRole("button", { name: "Save record", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(tableRows(page).first()).toContainText("Audit record");
  await tableRows(page)
    .first()
    .getByRole("button", { name: "Edit", exact: true })
    .click();
  await nameField(page).fill("Unsaved edit");
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(tableRows(page).first()).toContainText("Audit record");
  await tableRows(page)
    .first()
    .getByRole("button", { name: "Edit", exact: true })
    .click();
  await nameField(page).fill("Saved edit");
  await page.getByRole("button", { name: "Save record", exact: true }).click();
  await expect(tableRows(page).first()).toContainText("Saved edit");
});

for (const mode of ["light", "dark"])
  test(`axe actual workbench ${mode}`, async ({ page }, info) => {
    await ready(page, mode);
    const result = await new AxeBuilder({ page })
      .include("[data-audit-item]")
      .analyze();
    await info.attach("axe", {
      body: JSON.stringify(result, null, 2),
      contentType: "application/json",
    });
    expect(result.violations).toEqual([]);
  });

test("regression: measurement clones cannot receive keyboard focus", async ({
  page,
}) => {
  await ready(page);
  const hiddenCheckbox = page.locator(
    ".ant-table-measure-row input[type=checkbox]",
  );
  await expect(hiddenCheckbox).toHaveCount(1);
  await hiddenCheckbox.focus();
  expect(
    await hiddenCheckbox.evaluate((el) => document.activeElement === el),
  ).toBeFalsy();
});

test("regression: expandable column header has accessible name", async ({
  page,
}) => {
  await ready(page);
  await expect(
    page.locator("thead .ant-table-row-expand-icon-cell"),
  ).toHaveAccessibleName(/Expand|Details/);
});

// Opt-in exhaustive capture. Images and assertions are evidence; every image still needs
// worker full-resolution inspection and an independent fresh reviewer capture.
if (process.env.AUDIT_WORKBENCH_MATRIX) {
  const contract = JSON.parse(
    readFileSync(
      path.resolve(
        __dirname,
        "../contracts/kooya-blocks-data-workbench-standard.json",
      ),
      "utf8",
    ),
  );
  const widths =
    process.env.AUDIT_WORKBENCH_MATRIX === "smoke" ? [1280] : contract.widths;
  const modes =
    process.env.AUDIT_WORKBENCH_MATRIX === "smoke" ? ["light"] : contract.modes;
  const densities =
    process.env.AUDIT_WORKBENCH_MATRIX === "smoke"
      ? ["comfortable"]
      : contract.densities;
  const motions =
    process.env.AUDIT_WORKBENCH_MATRIX === "smoke"
      ? ["no-preference"]
      : contract.motions;
  for (const width of widths)
    for (const mode of modes)
      for (const density of densities)
        for (const motion of motions)
          test(`matrix ${width} ${mode} ${density} ${motion}`, async ({
            page,
            browser,
          }, info) => {
            test.setTimeout(300_000);
            await page.setViewportSize({ width, height: 900 });
            await page.emulateMedia({ reducedMotion: motion });
            const crypto = await import("node:crypto");
            const path = await import("node:path");
            const root = path.resolve(__dirname, "../../..");
            const files = [
              "apps/playground/src/site/collections/data.tsx",
              "apps/playground/src/site/collections/state.ts",
              "apps/playground/src/site/collections/shared.tsx",
              "apps/playground/src/site/collections/collections.css",
              "apps/playground/src/site/site.css",
              "packages/ui/src/foundations/theme.tsx",
              "packages/ui/src/styles.css",
              "pnpm-lock.yaml",
              "apps/playground/src/qa/AuditHarness.tsx",
            ];
            const fingerprints = Object.fromEntries(
              await Promise.all(
                files.map(async (f) => [
                  f,
                  crypto
                    .createHash("sha256")
                    .update(await fs.readFile(path.join(root, f)))
                    .digest("hex"),
                ]),
              ),
            );
            const events: string[] = [];
            page.on("console", (m) => {
              if (["error", "warning"].includes(m.type()))
                events.push(`${m.type()}:${m.text()}`);
            });
            page.on("pageerror", (e) => events.push(`pageerror:${e.message}`));
            page.on("requestfailed", (r) =>
              events.push(`requestfailed:${r.url()}:${r.failure()?.errorText}`),
            );
            const artifactResponse = await page.request.get(
              `${base}/audit-provenance.json`,
            );
            const artifactProvenance = artifactResponse.ok()
              ? await artifactResponse.json()
              : null;
            const records = [];
            for (const state of contract.states.filter(
              (state: string) =>
                !process.env.AUDIT_WORKBENCH_STATES ||
                process.env.AUDIT_WORKBENCH_STATES.split(",").includes(state),
            )) {
              await test.step(state, async () => {
                await ready(page, mode, density);
                const actions: string[] = [];
                const button = async (name: string) => {
                  await page.getByRole("button", { name, exact: true }).click();
                  actions.push(`click:${name}`);
                };
                const control = async (name: string) => {
                  await page
                    .getByText("Table controls", { exact: true })
                    .click();
                  await page
                    .getByRole("checkbox", { name, exact: true })
                    .check();
                  actions.push(`check:${name}`);
                };
                const add = async (
                  name: string,
                  note = "Audit note",
                  value = "0",
                ) => {
                  await button("Add record");
                  await nameField(page).fill(name);
                  await page
                    .getByRole("textbox", { name: "Notes", exact: true })
                    .fill(note);
                  await page
                    .getByRole("spinbutton", { name: "Hours", exact: true })
                    .fill(value);
                  await button("Save record");
                  await expect(page.getByRole("dialog")).not.toBeVisible();
                  actions.push(
                    `saved:${name.length}chars,value${value},note${note.length}chars`,
                  );
                };
                if (state === "search-results" || state === "search-empty") {
                  await page
                    .getByRole("searchbox", {
                      name: "Search Project workspace",
                    })
                    .fill(
                      state === "search-results"
                        ? "Design"
                        : "no-matching-audit-record",
                    );
                  actions.push(`search:${state}`);
                }
                if (
                  state === "status-dropdown" ||
                  state === "status-filtered"
                ) {
                  await page
                    .getByRole("combobox", { name: "Filter status" })
                    .click();
                  if (state === "status-filtered")
                    await page
                      .locator(".ant-select-dropdown")
                      .filter({ visible: true })
                      .getByText("Pending", { exact: true })
                      .click();
                  actions.push(state);
                }
                if (
                  state === "category-popup" ||
                  state === "category-filtered"
                ) {
                  await page
                    .getByRole("columnheader", {
                      name: "Category filter",
                      exact: true,
                    })
                    .getByRole("button")
                    .click();
                  if (state === "category-filtered") {
                    await page
                      .locator(".ant-table-filter-dropdown")
                      .getByRole("menuitem", { name: "Design", exact: true })
                      .click();
                    await page
                      .locator(".ant-table-filter-dropdown")
                      .getByRole("button", { name: "OK", exact: true })
                      .click();
                  }
                  actions.push(state);
                }
                if (state.startsWith("sort-")) {
                  const field = state.includes("-name-") ? "Project" : "Hours";
                  const heading = page.getByRole("columnheader", {
                    name: field,
                    exact: true,
                  });
                  await heading.click();
                  if (state.endsWith("descending")) await heading.click();
                  actions.push(state);
                }
                if (state === "page-two" || state === "page-three") {
                  await page
                    .locator(
                      `.ant-pagination-item-${state === "page-two" ? 2 : 3}`,
                    )
                    .click();
                  actions.push(state);
                }
                if (
                  state === "page-size-dropdown" ||
                  state === "page-size-ten" ||
                  state === "page-size-twenty"
                ) {
                  await page
                    .getByRole("combobox", { name: "Page Size", exact: true })
                    .click();
                  if (state === "page-size-ten" || state === "page-size-twenty")
                    await page
                      .locator(".ant-select-dropdown")
                      .filter({ visible: true })
                      .getByText(
                        state === "page-size-ten" ? "10 / page" : "20 / page",
                        { exact: true },
                      )
                      .click();
                  actions.push(state);
                }
                if (state === "selected" || state === "archive-success") {
                  await tableRows(page).first().getByRole("checkbox").check();
                  actions.push("select:row-1");
                  if (state === "archive-success")
                    await button("Archive selected");
                }
                if (state === "controls-open") {
                  await page
                    .getByText("Table controls", { exact: true })
                    .click();
                  actions.push(state);
                }
                if (state === "hidden-columns") {
                  await control("Hide category");
                  await page
                    .getByRole("checkbox", { name: "Hide status", exact: true })
                    .check();
                  await page
                    .getByRole("checkbox", { name: "Hide value", exact: true })
                    .check();
                }
                if (state === "fixed-column") await control("Fix name column");
                if (state === "reverse-columns")
                  await control("Reverse column order");
                if (state === "grouped-selected") {
                  await control("Group by category");
                  for (const label of ["Design records", "Product records"])
                    await page
                      .locator(".ant-collapse-item")
                      .filter({ hasText: label })
                      .locator(".ant-table-tbody tr.ant-table-row")
                      .first()
                      .getByRole("checkbox")
                      .check();
                  actions.push("select:Design-row1,Product-row1");
                }
                if (state === "grouped" || state === "group-collapsed") {
                  await control("Group by category");
                  if (state === "group-collapsed")
                    await page
                      .getByRole("button", { name: /Design records/ })
                      .click();
                }
                if (state === "virtual") await control("Virtual scrolling");
                if (
                  state === "column-width-min" ||
                  state === "column-width-max"
                ) {
                  await page
                    .getByText("Table controls", { exact: true })
                    .click();
                  const slider = page.getByRole("slider");
                  await slider.focus();
                  await page.keyboard.press(
                    state === "column-width-min" ? "Home" : "End",
                  );
                  actions.push(state);
                }
                if (state === "expanded-row") {
                  await tableRows(page)
                    .first()
                    .getByRole("button", { name: "Expand row", exact: true })
                    .click();
                  actions.push(state);
                }
                if (state === "details-drawer") {
                  await button("Brand refresh");
                  await expect(page.getByRole("dialog")).toBeVisible();
                }
                if (
                  [
                    "add-modal",
                    "add-invalid",
                    "add-dirty",
                    "add-missing-value",
                  ].includes(state)
                ) {
                  await button("Add record");
                  if (state === "add-invalid") await button("Save record");
                  if (state === "add-missing-value") {
                    await nameField(page).fill("Missing hours draft");
                    await page
                      .getByRole("spinbutton", { name: "Hours", exact: true })
                      .fill("");
                    await button("Save record");
                    await expect(page.getByRole("dialog")).toBeVisible();
                    await expect(
                      page.getByRole("spinbutton", {
                        name: "Hours",
                        exact: true,
                      }),
                    ).toHaveAttribute("aria-invalid", "true");
                    actions.push("fill:missing-hours-invalid-draft");
                  }
                  if (state === "add-dirty") {
                    await nameField(page).fill("Unsaved audit draft");
                    await page
                      .getByRole("textbox", { name: "Notes" })
                      .fill("Draft notes");
                    actions.push("fill:dirty-draft");
                  }
                }
                if (
                  [
                    "add-category-popup",
                    "add-status-popup",
                    "edit-category-popup",
                    "edit-status-popup",
                  ].includes(state)
                ) {
                  if (state.startsWith("add-")) await button("Add record");
                  else
                    await tableRows(page)
                      .first()
                      .getByRole("button", { name: "Edit", exact: true })
                      .click();
                  await settleOverlayMotion(page);
                  await page
                    .getByRole("dialog")
                    .getByRole("combobox", {
                      name: state.includes("-category-")
                        ? "Category"
                        : "Status",
                      exact: true,
                    })
                    .click();
                  actions.push(state);
                }
                if (state === "add-success") await add("Added audit record");
                if (
                  ["edit-modal", "edit-dirty", "edit-success"].includes(state)
                ) {
                  await tableRows(page)
                    .first()
                    .getByRole("button", { name: "Edit", exact: true })
                    .click();
                  actions.push("edit:row-1");
                  if (state !== "edit-modal") {
                    await nameField(page).fill("Edited audit record");
                    actions.push("fill:edited-name");
                  }
                  if (state === "edit-success") await button("Save record");
                }
                if (state === "export-success") {
                  await downloadedCSV(page);
                  actions.push("download:CSV");
                }
                if (state === "reset-view") {
                  await page.locator(".ant-pagination-item-3").click();
                  await button("Reset view");
                }
                if (
                  [
                    "long-name-row",
                    "long-note-expanded",
                    "long-details",
                    "long-edit",
                  ].includes(state)
                ) {
                  await add("L".repeat(512), "N".repeat(8192));
                  if (state === "long-note-expanded")
                    await tableRows(page)
                      .first()
                      .getByRole("button", { name: "Expand row", exact: true })
                      .click();
                  if (state === "long-details") await button("L".repeat(512));
                  if (state === "long-edit")
                    await tableRows(page)
                      .first()
                      .getByRole("button", { name: "Edit", exact: true })
                      .click();
                }
                if (state === "zero-value") await add("Zero-value audit");
                if (state === "extreme-value")
                  await add(
                    "Extreme-value audit",
                    "Extreme numeric input",
                    "999999999999999",
                  );
                if (state === "unicode-row")
                  await add(
                    "العربية Ω 👩🏽‍💻 e\u0301 audit",
                    "עברית العربية 日本語 👩🏽‍💻 e\u0301",
                  );
                if (state.startsWith("shell-")) {
                  await page
                    .getByText(
                      state.slice(6)[0].toUpperCase() + state.slice(7),
                      { exact: true },
                    )
                    .click();
                  actions.push(`shell:${state}`);
                }
                await page.evaluate(() => document.fonts.ready);
                await page.waitForTimeout(motion === "reduce" ? 80 : 300);
                await settleOverlayMotion(page);
                actions.push("wait:finite-overlay-motion");
                const geometry = await page.evaluate(() => ({
                  viewport: { width: innerWidth, height: innerHeight },
                  document: {
                    width: document.documentElement.scrollWidth,
                    height: document.documentElement.scrollHeight,
                  },
                  tables: [
                    ...document.querySelectorAll(".ant-table-content"),
                  ].map((el) => ({
                    width: el.clientWidth,
                    scrollWidth: el.scrollWidth,
                    rect: el.getBoundingClientRect().toJSON(),
                  })),
                  overlays: [
                    ...document.querySelectorAll(
                      "[role=dialog],.ant-select-dropdown,.ant-table-filter-dropdown",
                    ),
                  ]
                    .filter((el) => el.getBoundingClientRect().width > 0)
                    .map((el) => ({
                      class: el.className,
                      rect: el.getBoundingClientRect().toJSON(),
                      width: el.clientWidth,
                      scrollWidth: el.scrollWidth,
                    })),
                  focused: document.activeElement?.outerHTML.slice(0, 700),
                  renderedRecords: [
                    ...document.querySelectorAll(".ant-table-row"),
                  ].map((el) => ({
                    id: el.getAttribute("data-row-key"),
                    cells: [...el.querySelectorAll("td,[role=cell]")].map(
                      (cell) => cell.textContent,
                    ),
                  })),
                  formValues: [...document.querySelectorAll("input,textarea")]
                    .filter(
                      (el) =>
                        !(el as HTMLInputElement).type ||
                        !["checkbox", "radio"].includes(
                          (el as HTMLInputElement).type,
                        ),
                    )
                    .map((el) => ({
                      id: el.id,
                      value: (el as HTMLInputElement).value,
                    })),
                }));
                for (const overlay of geometry.overlays) {
                  expect
                    .soft(overlay.rect.left, `${state}: overlay left bound`)
                    .toBeGreaterThanOrEqual(-1);
                  expect
                    .soft(overlay.rect.right, `${state}: overlay right bound`)
                    .toBeLessThanOrEqual(width + 1);
                  if (
                    overlay.class.includes("ant-select-dropdown") ||
                    overlay.class.includes("ant-table-filter-dropdown")
                  ) {
                    expect
                      .soft(overlay.rect.top, `${state}: popup top bound`)
                      .toBeGreaterThanOrEqual(-1);
                    expect
                      .soft(overlay.rect.bottom, `${state}: popup bottom bound`)
                      .toBeLessThanOrEqual(geometry.viewport.height + 1);
                  }
                }
                const screenshot = info.outputPath(`${state}.png`);
                await page.screenshot({
                  path: screenshot,
                  fullPage: true,
                  animations: "allow",
                  caret: "initial",
                });
                const sha = crypto
                  .createHash("sha256")
                  .update(await fs.readFile(screenshot))
                  .digest("hex");
                let accessibility: {
                  status: string;
                  violations: unknown[];
                  incomplete: unknown[];
                } = { status: "not-run", violations: [], incomplete: [] };
                if (process.env.AUDIT_WORKBENCH_AXE === "1") {
                  const builder = new AxeBuilder({ page });
                  const visibleDialog = page.getByRole("dialog");
                  if (await visibleDialog.count())
                    builder.include(
                      (await page
                        .locator(".ant-modal")
                        .filter({ visible: true })
                        .count())
                        ? ".ant-modal"
                        : ".ant-drawer",
                    );
                  else builder.include("[data-audit-item]");
                  for (const selector of [
                    ".ant-select-dropdown:not(.ant-select-dropdown-hidden)",
                    ".ant-table-filter-dropdown",
                  ])
                    if (
                      await page
                        .locator(selector)
                        .filter({ visible: true })
                        .count()
                    )
                      builder.include(selector);
                  const result = await builder.analyze();
                  accessibility = {
                    status: "ran",
                    violations: result.violations,
                    incomplete: result.incomplete,
                  };
                }
                records.push({
                  id: `${item}/${state}/${width}/${mode}/${density}/${motion}/${info.project.name}/${browser.version()}/${process.env.AUDIT_BROWSER_CHANNEL ?? "Playwright-engine-profile"}`,
                  item,
                  state,
                  width,
                  mode,
                  density,
                  motion,
                  browser: {
                    engine: info.project.name,
                    version: browser.version(),
                    channel:
                      process.env.AUDIT_BROWSER_CHANNEL ??
                      "Playwright-engine-profile",
                    platformQualification:
                      info.project.name === "webkit"
                        ? "Linux WebKit engine; not Safari/iOS"
                        : "Local Linux engine profile; separate supported-version qualification required",
                  },
                  props: {
                    domain: "projects",
                    alternate: false,
                    embedded: false,
                  },
                  fingerprints,
                  artifactProvenance,
                  executionSpecSHA256: crypto
                    .createHash("sha256")
                    .update(await fs.readFile(__filename))
                    .digest("hex"),
                  actions,
                  geometry,
                  screenshot,
                  screenshotSHA256: sha,
                  accessibility,
                  consoleAndResourceEvents: [...events],
                  workerVisualObservation: null,
                  independentReview: null,
                });
                await fs.writeFile(
                  info.outputPath("cases.json"),
                  JSON.stringify(records, null, 2),
                );
                if (accessibility.status === "ran")
                  expect
                    .soft(
                      accessibility.violations,
                      `${state}: actual-state axe`,
                    )
                    .toEqual([]);
                expect
                  .soft(geometry.document.width, `${state}: document overflow`)
                  .toBeLessThanOrEqual(width + 1);
              });
            }
            expect(events).toEqual([]);
          });
}

test("regression: real long records preserve contained table, notes and details", async ({
  page,
}, info) => {
  await ready(page);
  await page.getByRole("button", { name: "Add record", exact: true }).click();
  const name = "L".repeat(512),
    note = "N".repeat(8192);
  await nameField(page).fill(name);
  await page.getByRole("textbox", { name: "Notes", exact: true }).fill(note);
  await page.getByRole("button", { name: "Save record", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name, exact: true }),
  ).toHaveAccessibleName(name);
  await tableRows(page)
    .first()
    .getByRole("button", { name: "Expand row", exact: true })
    .click();
  const expandedGeometry = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
  }));
  await info.attach("expanded-document-geometry", {
    body: JSON.stringify(expandedGeometry),
    contentType: "application/json",
  });
  await page.screenshot({
    path: info.outputPath("long-expanded.png"),
    fullPage:
      Math.max(expandedGeometry.scrollWidth, expandedGeometry.scrollHeight) <
      32767,
    animations: "allow",
    caret: "initial",
  });
  expect
    .soft(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
  await page.getByRole("button", { name, exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".ant-drawer-content-wrapper")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .toBe("none");
  await expect(dialog).toBeInViewport({ ratio: 1 });
  const documentSize = await page.evaluate(() =>
    Math.max(
      document.documentElement.scrollWidth,
      document.documentElement.scrollHeight,
    ),
  );
  await page.screenshot({
    path: info.outputPath("long-details.png"),
    fullPage: documentSize < 32767,
    animations: "allow",
    caret: "initial",
  });
  const body = page.locator(".ant-drawer-body");
  expect(
    await body.evaluate((el) => el.scrollWidth - el.clientWidth),
  ).toBeLessThanOrEqual(1);
  await expect(dialog).toHaveAccessibleName(name);
});

test("keyboard modal and drawer focus trap, nested status popup and focus return", async ({
  page,
}) => {
  await ready(page);
  const add = page.getByRole("button", { name: "Add record", exact: true });
  await add.focus();
  await page.keyboard.press("Enter");
  const modal = page.getByRole("dialog", { name: "Add record", exact: true });
  await expect(modal).toBeVisible();
  for (let i = 0; i < 16; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(
        () => !!document.activeElement?.closest(".ant-modal"),
      ),
    ).toBeTruthy();
  }
  await modal.getByRole("combobox", { name: "Category", exact: true }).click();
  await expect(
    page.locator(".ant-select-dropdown").filter({ visible: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.locator(".ant-select-dropdown").filter({ visible: true }),
  ).toHaveCount(0);
  await expect(modal).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(add).toBeFocused();
  const trigger = page.getByRole("button", {
    name: "Brand refresh",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const drawer = page.getByRole("dialog", {
    name: "Brand refresh",
    exact: true,
  });
  await expect(drawer).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(
        () => !!document.activeElement?.closest(".ant-drawer"),
      ),
    ).toBeTruthy();
  }
  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

function renderedContrast(foreground: string, background: string) {
  const rgba = (value: string) => {
    const parts = value.match(/[\d.]+/g)!.map(Number);
    return [parts[0], parts[1], parts[2], parts[3] ?? 1];
  };
  const fg = rgba(foreground),
    bg = rgba(background);
  const composite = fg
    .slice(0, 3)
    .map((x, i) => x * fg[3] + bg[i] * (1 - fg[3]));
  const luminance = (rgb: number[]) =>
    rgb
      .map((v) => v / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const a = luminance(composite),
    b = luminance(bg.slice(0, 3));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
for (const mode of ["light", "dark"]) {
  test(`regression: active table sort and filter cues contrast ${mode}`, async ({
    page,
  }, info) => {
    await ready(page, mode);
    await page
      .getByRole("columnheader", { name: "Hours", exact: true })
      .click();
    await page.waitForTimeout(400);
    const sort = await page
      .locator("thead .ant-table-column-sorter-up.active")
      .evaluate((el) => ({
        foreground: getComputedStyle(el).color,
        background: getComputedStyle(el.closest("th")!).backgroundColor,
      }));
    await page.screenshot({
      path: info.outputPath("active-sort.png"),
      fullPage: true,
      animations: "allow",
      caret: "initial",
    });
    await info.attach("sort-colors", {
      body: JSON.stringify(sort),
      contentType: "application/json",
    });
    expect
      .soft(renderedContrast(sort.foreground, sort.background))
      .toBeGreaterThanOrEqual(3);
    await page
      .getByRole("columnheader", { name: "Category filter", exact: true })
      .getByRole("button")
      .click();
    await page
      .locator(".ant-table-filter-dropdown")
      .getByRole("menuitem", { name: "Design", exact: true })
      .click();
    await page
      .locator(".ant-table-filter-dropdown")
      .getByRole("button", { name: "OK", exact: true })
      .click();
    await page.waitForTimeout(400);
    const filter = await page
      .locator("thead .ant-table-filter-trigger.active")
      .evaluate((el) => ({
        foreground: getComputedStyle(el).color,
        background: getComputedStyle(el.closest("th")!).backgroundColor,
      }));
    await page.screenshot({
      path: info.outputPath("active-filter.png"),
      fullPage: true,
      animations: "allow",
      caret: "initial",
    });
    await info.attach("filter-colors", {
      body: JSON.stringify(filter),
      contentType: "application/json",
    });
    expect(
      renderedContrast(filter.foreground, filter.background),
    ).toBeGreaterThanOrEqual(3);
  });
  test(`regression: real empty search text contrast ${mode}`, async ({
    page,
  }, info) => {
    await ready(page, mode);
    await page
      .getByRole("searchbox", { name: "Search Project workspace" })
      .fill("no-matching-audit-record");
    await expect(page.locator(".ant-empty-description")).toBeVisible();
    const result = await new AxeBuilder({ page })
      .include("[data-audit-item]")
      .analyze();
    await info.attach("axe-real-empty", {
      body: JSON.stringify(result, null, 2),
      contentType: "application/json",
    });
    await page.screenshot({
      path: info.outputPath("real-empty.png"),
      fullPage: true,
      animations: "allow",
      caret: "initial",
    });
    expect(result.violations).toEqual([]);
  });
}

test("regression: grouping preserves selected record ownership across tables", async ({
  page,
}, info) => {
  await ready(page);
  await page.getByText("Table controls", { exact: true }).click();
  await page
    .getByRole("checkbox", { name: "Group by category", exact: true })
    .check();
  const design = page
      .locator(".ant-collapse-item")
      .filter({ hasText: "Design records" }),
    product = page
      .locator(".ant-collapse-item")
      .filter({ hasText: "Product records" });
  await design
    .locator(".ant-table-tbody tr.ant-table-row")
    .first()
    .getByRole("checkbox")
    .check();
  await expect(page.getByText("1 selected", { exact: true })).toBeVisible();
  await product
    .locator(".ant-table-tbody tr.ant-table-row")
    .first()
    .getByRole("checkbox")
    .check();
  await page.screenshot({
    path: info.outputPath("cross-group-selection.png"),
    fullPage: true,
    animations: "allow",
    caret: "initial",
  });
  await expect(page.getByText("2 selected", { exact: true })).toBeVisible();
  const csv = await downloadedCSV(page);
  expect(csv.split("\n")).toHaveLength(3);
  expect(csv).toContain("Brand refresh");
  expect(csv).toContain("Launch website");
});

test("regression: table column-width slider has real accessible name", async ({
  page,
}, info) => {
  await ready(page);
  await page.getByText("Table controls", { exact: true }).click();
  await page.screenshot({
    path: info.outputPath("controls-slider.png"),
    fullPage: true,
    animations: "allow",
    caret: "initial",
  });
  await expect(
    page.getByRole("slider", { name: "Name column width", exact: true }),
  ).toBeVisible();
  const result = await new AxeBuilder({ page })
    .include("[data-audit-item]")
    .analyze();
  await info.attach("axe-table-controls", {
    body: JSON.stringify(result, null, 2),
    contentType: "application/json",
  });
  expect(result.violations).toEqual([]);
});

test("regression: real drawer body supports Tab PageDown and End", async ({
  page,
}, info) => {
  await ready(page);
  await page.getByRole("button", { name: "Add record", exact: true }).click();
  await nameField(page).fill("Keyboard scrolling details");
  await page
    .getByRole("textbox", { name: "Notes", exact: true })
    .fill("N".repeat(8192));
  await page.getByRole("button", { name: "Save record", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page
    .getByRole("button", { name: "Keyboard scrolling details", exact: true })
    .click();
  const dialog = page.getByRole("dialog"),
    body = page.locator(".ant-drawer-body");
  await expect(dialog).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".ant-drawer-content-wrapper")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .toBe("none");
  await dialog.getByRole("button", { name: "Close", exact: true }).focus();
  await page.keyboard.press("Tab");
  const focusAfterTab = await page.evaluate(
    () => document.activeElement?.outerHTML,
  );
  const bodyFocused = await body.evaluate((el) =>
    el.contains(document.activeElement),
  );
  expect
    .soft(bodyFocused, "Tab from Close reaches the scrollable details content")
    .toBeTruthy();
  await page.keyboard.press("PageDown");
  await page.waitForTimeout(350);
  const afterPageDown = await body.evaluate((el) => el.scrollTop);
  expect
    .soft(afterPageDown, "PageDown scrolls actual details body")
    .toBeGreaterThan(0);
  await page.keyboard.press("End");
  await page.waitForTimeout(350);
  const afterEnd = await body.evaluate((el) => ({
    top: el.scrollTop,
    height: el.clientHeight,
    scroll: el.scrollHeight,
  }));
  await info.attach("keyboard-scroll", {
    body: JSON.stringify({
      focusAfterTab,
      bodyFocused,
      afterPageDown,
      afterEnd,
    }),
    contentType: "application/json",
  });
  await page.screenshot({
    path: info.outputPath("keyboard-details-end.png"),
    fullPage: true,
    animations: "allow",
    caret: "initial",
  });
  expect
    .soft(afterEnd.top + afterEnd.height, "End reaches final details")
    .toBeGreaterThanOrEqual(afterEnd.scroll - 1);
  await expect
    .soft(body.getByText("Hours: 0", { exact: true }))
    .toBeInViewport();
  await expect(
    page.getByRole("region", { name: "Record details", exact: true }),
  ).toBeVisible();
  expect(
    await body.evaluate((el) => el.contains(document.activeElement)),
    "Focus remains within scrollable details body",
  ).toBeTruthy();
});

test("regression: simulated loading shell exposes status and no empty headings", async ({
  page,
}, info) => {
  await ready(page);
  await page.getByText("Loading", { exact: true }).click();
  await page.screenshot({
    path: info.outputPath("loading-semantics.png"),
    fullPage: true,
    animations: "allow",
    caret: "initial",
  });
  await expect
    .soft(
      page.getByRole("heading", { level: 3 }),
      "Decorative skeleton is absent from accessible headings",
    )
    .toHaveCount(0);
  await expect
    .soft(page.getByRole("status"), "Simulated shell has a real loading status")
    .toHaveText("Loading Project workspace");
  const result = await new AxeBuilder({ page })
    .include("[data-audit-item]")
    .analyze();
  await info.attach("axe-loading-shell", {
    body: JSON.stringify(result, null, 2),
    contentType: "application/json",
  });
  expect(result.violations).toEqual([]);
});

test("regression: immediate Add Edit popup retains logical trigger width", async ({
  page,
}, info) => {
  await ready(page);
  for (const operation of ["Add", "Edit"]) {
    await page
      .getByRole("button", {
        name: operation === "Add" ? "Add record" : "Edit",
        exact: true,
      })
      .first()
      .click();
    // Intentionally open the real selector immediately while the Modal may animate.
    const combo = page.getByRole("combobox", { name: "Category", exact: true });
    await combo.click();
    const popup = page
      .locator(".ant-select-dropdown")
      .filter({ visible: true });
    await expect(popup).toBeVisible();
    await page.waitForTimeout(1200);
    const measured = await combo.evaluate((el) => {
      const trigger = el.closest(".ant-select") as HTMLElement;
      const popup = [...document.querySelectorAll(".ant-select-dropdown")].find(
        (el) => el.getBoundingClientRect().width > 0,
      ) as HTMLElement;
      const option = [
        ...popup.querySelectorAll(".ant-select-item-option-content"),
      ].find((el) => el.textContent === "Operations") as HTMLElement;
      return {
        trigger: trigger.getBoundingClientRect().toJSON(),
        logicalWidth: trigger.offsetWidth,
        popup: popup.getBoundingClientRect().toJSON(),
        option: { width: option.clientWidth, scrollWidth: option.scrollWidth },
        modalTransform: getComputedStyle(document.querySelector(".ant-modal")!)
          .transform,
        popupTransform: getComputedStyle(popup).transform,
        viewport: innerWidth,
      };
    });
    await info.attach(`${operation}-immediate-popup`, {
      body: JSON.stringify(measured),
      contentType: "application/json",
    });
    await page.screenshot({
      path: info.outputPath(`${operation}-immediate-popup.png`),
      fullPage: false,
      animations: "allow",
      caret: "initial",
    });
    expect
      .soft(measured.modalTransform, `${operation}: Modal settled`)
      .toBe("none");
    expect
      .soft(measured.popupTransform, `${operation}: popup settled`)
      .toBe("none");
    expect
      .soft(
        Math.abs(measured.popup.width - measured.logicalWidth),
        `${operation}: popup retains logical width`,
      )
      .toBeLessThanOrEqual(2);
    expect
      .soft(
        measured.option.scrollWidth,
        `${operation}: full Operations visible`,
      )
      .toBeLessThanOrEqual(measured.option.width + 1);
    expect
      .soft(
        Math.abs(measured.popup.left - measured.trigger.left),
        `${operation}: anchored horizontally`,
      )
      .toBeLessThanOrEqual(8);
    expect
      .soft(measured.popup.right, `${operation}: within viewport`)
      .toBeLessThanOrEqual(measured.viewport + 1);
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
});

for (const density of ["comfortable", "compact"]) {
  test(`regression: narrow viewport retains real page size change ${density}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await ready(page, "light", density);
    const beforeCSV = await downloadedCSV(page);
    await page.screenshot({
      path: info.outputPath("mobile-page-size-before.png"),
      fullPage: true,
      animations: "allow",
      caret: "initial",
    });
    const chooser = page.getByRole("combobox", {
      name: "Page Size",
      exact: true,
    });
    await expect(chooser).toBeVisible();
    const chooserBox = await page
      .locator(".ant-pagination-options-size-changer")
      .boundingBox();
    expect
      .soft(chooserBox!.height, "Page Size has44px target")
      .toBeGreaterThanOrEqual(44);
    const pageBox = await page
      .locator(".ant-pagination-item-active")
      .boundingBox();
    expect
      .soft(pageBox!.height, "Page number has44px target")
      .toBeGreaterThanOrEqual(44);
    await chooser.click();
    await page.waitForTimeout(500);
    const popupBox = await page
      .locator(".ant-select-dropdown")
      .filter({ visible: true })
      .boundingBox();
    expect.soft(popupBox!.x).toBeGreaterThanOrEqual(0);
    expect.soft(popupBox!.x + popupBox!.width).toBeLessThanOrEqual(321);
    const ten = page.getByRole("option", { name: "10 / page", exact: true });
    expect
      .soft(
        (await ten.boundingBox())!.height,
        "Page Size option has44px target",
      )
      .toBeGreaterThanOrEqual(44);
    await ten.click();
    await expect(tableRows(page)).toHaveCount(10);
    await expect(page.getByText("12 records", { exact: true })).toBeVisible();
    await expect(page.locator(".ant-pagination-item-active")).toHaveText("1");
    expect(await downloadedCSV(page)).toBe(beforeCSV);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await expect(
      page.locator(".ant-pagination-options-size-changer"),
    ).toContainText("10 / page");
  });
}

test("regression: cleared Hours cannot create inconsistent table and CSV data", async ({
  page,
}, info) => {
  await ready(page);
  await page.getByRole("button", { name: "Add record", exact: true }).click();
  await nameField(page).fill("Cleared hours audit");
  const hours = page.getByRole("spinbutton", { name: "Hours", exact: true });
  await hours.fill("");
  await page.getByRole("button", { name: "Save record", exact: true }).click();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: info.outputPath("cleared-hours.png"),
    fullPage: true,
    animations: "allow",
    caret: "initial",
  });
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(hours).toHaveAttribute("aria-invalid", "true");
  await expect(nameField(page)).toHaveValue("Cleared hours audit");
  await expect(page.getByText("12 records", { exact: true })).toBeVisible();
  await hours.fill("0");
  await page.getByRole("button", { name: "Save record", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  const row = tableRows(page).filter({ hasText: "Cleared hours audit" });
  await expect(row).toHaveCount(1);
  const displayed = (await row.locator("td").nth(5).textContent())!.trim();
  const csv = await downloadedCSV(page);
  const line = csv
    .split("\n")
    .find((line) => line.startsWith('"Cleared hours audit",'))!;
  const exported = line.match(/,"([^"]*)"$/)![1];
  await info.attach("cleared-hours-record", {
    body: JSON.stringify({ displayed, exported, csv }),
    contentType: "application/json",
  });
  expect(displayed).toBe("0");
  expect(exported).toBe(displayed);
});
