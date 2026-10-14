import { expect, test, type Page } from "@playwright/test";

const route = "/?mode=dark#/preview/c-textarea-6";
const bio = (page: Page) =>
  page.getByRole("textbox", { name: "Bio", exact: true });
const fits = async (page: Page) =>
  expect
    .poll(() => bio(page).evaluate((e) => e.scrollHeight - e.clientHeight))
    .toBeLessThanOrEqual(1);
const settings = async (page: Page, mode: string, density: string) => {
  await page.evaluate(
    ({ mode, density }) =>
      window.postMessage(
        { type: "kooya-preview-settings", mode, density },
        location.origin,
      ),
    { mode, density },
  );
  await expect(page.locator("html")).toHaveAttribute("data-density", density);
};

test.beforeEach(async ({ page }) => {
  await page.goto(route);
  await expect(bio(page)).toBeVisible();
});

test("rejects over-limit replacement without growing the empty field", async ({
  page,
}) => {
  const height = await bio(page).evaluate((e) => e.clientHeight);
  await bio(page).fill("a".repeat(1000));
  await expect(bio(page)).toHaveValue("");
  await expect
    .poll(() => bio(page).evaluate((e) => e.clientHeight))
    .toBe(height);
});

test("remeasures accepted text after viewport and density changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await bio(page).fill("a".repeat(280));
  await page.setViewportSize({ width: 320, height: 900 });
  await fits(page);
  await settings(page, "dark", "compact");
  await fits(page);
  await expect(bio(page)).toHaveValue("a".repeat(280));
  await bio(page).fill("Short bio");
  await fits(page);
  expect(await bio(page).evaluate((e) => e.clientHeight)).toBeLessThan(150);
});

test("disables manual resize for the auto-growing field", async ({ page }) => {
  await expect(bio(page)).toHaveCSS("resize", "none");
});

test("preserves dirty text through theme density and reduced-motion transitions", async ({
  page,
}) => {
  await bio(page).fill("Unsubmitted bio 😀");
  await settings(page, "light", "compact");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(bio(page)).toHaveValue("Unsubmitted bio 😀");
  await settings(page, "dark", "comfortable");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(bio(page)).toHaveValue("Unsubmitted bio 😀");
});

test("retains UTF-16 accounting and rejects the whole over-limit edit", async ({
  page,
}) => {
  await bio(page).fill("😀".repeat(140));
  await expect(page.getByText("280/280", { exact: true })).toBeVisible();
  await bio(page).press("End");
  await bio(page).press("x");
  await expect(bio(page)).toHaveValue("😀".repeat(140));
  await bio(page).fill("e\u0301".repeat(130));
  await expect(page.getByText("260/280", { exact: true })).toBeVisible();
  await bio(page).fill("中".repeat(280));
  await expect(page.getByText("280/280", { exact: true })).toBeVisible();
  await bio(page).fill("z".repeat(281));
  await expect(bio(page)).toHaveValue("中".repeat(280));
});

test("real clipboard paste rejects excessive content and preserves accepted content", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Clipboard permissions are browser-specific",
  );
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await bio(page).fill("Existing");
  const height = await bio(page).evaluate((e) => e.clientHeight);
  await page.evaluate(() => navigator.clipboard.writeText("a".repeat(1000)));
  await bio(page).press("ControlOrMeta+End");
  await bio(page).press("ControlOrMeta+V");
  await expect(bio(page)).toHaveValue("Existing");
  await expect
    .poll(() => bio(page).evaluate((e) => e.clientHeight))
    .toBe(height);
  await page.evaluate(() => navigator.clipboard.writeText(" plus 😀"));
  await bio(page).press("ControlOrMeta+V");
  await expect(bio(page)).toHaveValue("Existing plus 😀");
});

test("keyboard focus editing selection deletion and multiline growth work", async ({
  page,
}) => {
  await page.keyboard.press("Tab");
  await expect(bio(page)).toBeFocused();
  await page.keyboard.type("First line");
  await page.keyboard.press("Enter");
  await page.keyboard.type("Second line");
  await expect(bio(page)).toHaveValue("First line\nSecond line");
  await fits(page);
  await bio(page).press("ControlOrMeta+A");
  await bio(page).press("Backspace");
  await expect(bio(page)).toHaveValue("");
  await expect(page.getByText("0/280", { exact: true })).toBeVisible();
});

for (const mode of ["light", "dark"])
  for (const density of ["comfortable", "compact"]) {
    test(`${mode} ${density} counter is readable in normal warning and limit states`, async ({
      page,
    }) => {
      await settings(page, mode, density);
      for (const length of [0, 260, 280]) {
        await bio(page).fill("a".repeat(length));
        const ratio = await page
          .getByText(`${length}/280`, { exact: true })
          .evaluate((e) => {
            const rgb = (s: string) =>
              (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
            const luminance = (channels: number[]) =>
              channels
                .map((x) => {
                  const n = x / 255;
                  return n <= 0.04045
                    ? n / 12.92
                    : ((n + 0.055) / 1.055) ** 2.4;
                })
                .reduce((n, x, i) => n + x * [0.2126, 0.7152, 0.0722][i], 0);
            let parent: Element | null = e;
            let background = "rgba(0, 0, 0, 0)";
            while (parent && background === "rgba(0, 0, 0, 0)") {
              background = getComputedStyle(parent).backgroundColor;
              parent = parent.parentElement;
            }
            const a = luminance(rgb(getComputedStyle(e).color)),
              b = luminance(rgb(background));
            return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
          });
        expect(
          ratio,
          `${mode} ${density} ${length}/280`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

for (const mode of ["light", "dark"])
  for (const density of ["comfortable", "compact"]) {
    test(`${mode} ${density} responsive content and real states fit across widths`, async ({
      page,
    }, testInfo) => {
      await settings(page, mode, density);
      for (const motion of ["no-preference", "reduce"] as const) {
        await page.emulateMedia({ reducedMotion: motion });
        for (const width of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
          await page.setViewportSize({ width, height: 900 });
          for (const [state, content] of [
            ["empty", ""],
            ["dirty", "Unsubmitted biography 😀"],
            ["multiline", "First line\nSecond line\nThird line"],
            ["warning", "a".repeat(260)],
            ["limit", "a".repeat(280)],
          ] as const) {
            await bio(page).fill(content);
            await bio(page).blur();
            await page.mouse.move(0, 0);
            expect(
              await bio(page).evaluate((e) => ({
                focus: e.matches(":focus"),
                hover: e.matches(":hover"),
              })),
            ).toEqual({ focus: false, hover: false });
            await bio(page).evaluate(async (e) => {
              await Promise.all(
                e.getAnimations().map((a) => a.finished.catch(() => undefined)),
              );
            });
            await fits(page);
            expect(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
              ),
            ).toBe(true);
            await page.screenshot({
              path: testInfo.outputPath(
                `${mode}-${density}-${motion}-${width}-${state}.png`,
              ),
              fullPage: true,
            });
          }
          await bio(page).hover();
          expect(
            await bio(page).evaluate((e) => ({
              focus: e.matches(":focus"),
              hover: e.matches(":hover"),
            })),
          ).toEqual({ focus: false, hover: true });
          await page.screenshot({
            path: testInfo.outputPath(
              `${mode}-${density}-${motion}-${width}-hover-start.png`,
            ),
          });
          await bio(page).evaluate(async (e) => {
            await Promise.all(
              e.getAnimations().map((a) => a.finished.catch(() => undefined)),
            );
          });
          await page.screenshot({
            path: testInfo.outputPath(
              `${mode}-${density}-${motion}-${width}-hover.png`,
            ),
          });
          // Start keyboard traversal before the control; blur retains different
          // sequential focus positions in Chromium and Firefox.
          await page.locator("main").evaluate((e) => {
            (e as HTMLElement).tabIndex = -1;
            (e as HTMLElement).focus();
          });
          await page.keyboard.press("Tab");
          await expect(bio(page)).toBeFocused();
          await page.screenshot({
            path: testInfo.outputPath(
              `${mode}-${density}-${motion}-${width}-keyboard-focus.png`,
            ),
          });
          await bio(page).press("ControlOrMeta+A");
          await page.screenshot({
            path: testInfo.outputPath(
              `${mode}-${density}-${motion}-${width}-selected.png`,
            ),
          });
          const acceptedHeight = await bio(page).evaluate(
            (e) => e.clientHeight,
          );
          await bio(page).fill("x".repeat(1000));
          await expect(bio(page)).toHaveValue("a".repeat(280));
          expect(await bio(page).evaluate((e) => e.clientHeight)).toBe(
            acceptedHeight,
          );
          await page.screenshot({
            path: testInfo.outputPath(
              `${mode}-${density}-${motion}-${width}-rejected.png`,
            ),
          });
          await bio(page).fill("");
          await bio(page).blur();
          await fits(page);
          await page.screenshot({
            path: testInfo.outputPath(
              `${mode}-${density}-${motion}-${width}-cleared.png`,
            ),
          });
          await bio(page).fill("a".repeat(280));
        }
      }
      // A containing region can change independently of viewport size.
      for (const width of [180, 240, 320]) {
        await page
          .locator('[data-preview-id="c-textarea-6"]')
          .evaluate((e, width) => {
            (e as HTMLElement).style.width = `${width}px`;
          }, width);
        await fits(page);
        await expect(bio(page)).toHaveValue("a".repeat(280));
      }
      // CSS scaling and a reduced CSS viewport simulate 200% and 400% layout.
      // Native browser zoom is verified separately by the audit harness.
      for (const scale of [2, 4]) {
        // Browser-equivalent 200% layout uses half the CSS viewport. CSS zoom also
        // verifies the control's physical scaling; native browser chrome is manual.
        await page
          .locator('[data-preview-id="c-textarea-6"]')
          .evaluate((e, scale) => {
            (e as HTMLElement).style.width = "";
            (e as HTMLElement).style.zoom = String(scale);
          }, scale);
        await page.setViewportSize({ width: 768, height: 900 });
        await fits(page);
        await page.screenshot({
          path: testInfo.outputPath(
            `${mode}-${density}-${scale * 100}-percent-simulation.png`,
          ),
          fullPage: true,
        });
      }
    });
  }

test("native undo and redo restore accepted edits", async ({ page }) => {
  await bio(page).focus();
  await page.keyboard.type("Biography");
  await bio(page).press("ControlOrMeta+Z");
  await expect.poll(() => bio(page).inputValue()).not.toBe("Biography");
  // Browsers group typing into different native undo transactions.
  expect((await bio(page).inputValue()).length).toBeLessThan(9);
  await bio(page).press("ControlOrMeta+Shift+Z");
  await expect(bio(page)).toHaveValue("Biography");
  await fits(page);
});

test("newline-heavy accepted content remains reachable at the page bottom", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await bio(page).fill("\n".repeat(279) + "z");
  await expect(page.getByText("280/280", { exact: true })).toBeVisible();
  await fits(page);
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  const geometry = await bio(page).evaluate((e) => ({
    bottom: e.getBoundingClientRect().bottom,
    viewport: innerHeight,
  }));
  expect(geometry.bottom).toBeLessThanOrEqual(geometry.viewport + 1);
  await page.screenshot({ path: testInfo.outputPath("newline-bottom.png") });
  await expect(bio(page)).toHaveAccessibleDescription("280/280");
});
