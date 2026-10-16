import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const item = "ant-drawer-native";
const widths = [320, 360, 390, 768, 1024, 1280, 1440, 1920];
const base = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:5302";
const url = (
  fixture = "catalog",
  profile = "default",
  mode = "light",
  density = "comfortable",
) =>
  `${base}/audit.html?item=${item}&fixture=${fixture}&profile=${profile}&mode=${mode}&density=${density}`;

async function open(page: import("@playwright/test").Page) {
  const trigger = page.getByRole("button", {
    name: "Open drawer",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog).toHaveAccessibleName(/Project settings/);
  await expect(dialog).toBeInViewport({ ratio: 1 });
  await expect
    .poll(() =>
      page
        .locator(".ant-drawer-content-wrapper")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .toBe("none");
  return { trigger, dialog };
}

test("catalog label association regression", async ({ page }) => {
  await page.goto(url());
  await open(page);
  await expect(
    page.getByRole("textbox", { name: "Project name", exact: true }),
  ).toBeVisible();
});

for (const fixture of ["catalog", "stress"])
  test(`${fixture} focus trap and keyboard dismissal returns focus`, async ({
    page,
  }) => {
    await page.goto(url(fixture));
    const { trigger } = await open(page);
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      expect(
        await page.evaluate(
          () => !!document.activeElement?.closest(".ant-drawer"),
        ),
      ).toBeTruthy();
    }
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Shift+Tab");
      expect(
        await page.evaluate(
          () => !!document.activeElement?.closest(".ant-drawer"),
        ),
      ).toBeTruthy();
    }
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

for (const width of widths)
  for (const mode of ["light", "dark"])
    for (const density of ["comfortable", "compact"])
      for (const motion of ["no-preference", "reduce"] as const) {
        test(`catalog ${width} ${mode} ${density} ${motion}`, async ({
          page,
        }, info) => {
          await page.setViewportSize({ width, height: 900 });
          await page.emulateMedia({ reducedMotion: motion });
          await page.goto(url("catalog", "default", mode, density));
          await expect(page.getByRole("dialog")).not.toBeVisible();
          const { dialog, trigger } = await open(page);
          const field = page.getByRole("textbox", {
            name: "Project name",
            exact: true,
          });
          await expect(field).toHaveValue("Kooya Studio");
          const box = await dialog.boundingBox();
          expect(box!.x).toBeGreaterThanOrEqual(-1);
          expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
          await expect(
            page.getByRole("button", { name: "Close", exact: true }),
          ).toBeVisible();
          await page.screenshot({
            path: info.outputPath(
              `open-${width}-${mode}-${density}-${motion}.png`,
            ),
            fullPage: true,
            animations: "allow",
          });
          await field.fill("Edited project");
          await page.setViewportSize({
            width: width < 768 ? 1024 : 320,
            height: 700,
          });
          await expect(field).toHaveValue("Edited project");
          await page
            .getByRole("button", { name: "Close", exact: true })
            .click();
          await expect(dialog).not.toBeVisible();
          await expect(trigger).toBeFocused();
        });
      }

test("actual mask pointer dismisses wide viewport drawer", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(url());
  const { trigger, dialog } = await open(page);
  await page.locator(".ant-drawer-mask").click({ position: { x: 20, y: 300 } });
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

for (const profile of ["default", "long", "empty", "error", "loading"])
  test(`stress ${profile} footer and body integrity`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width: 320, height: 600 });
    await page.goto(url("stress", profile));
    const { dialog } = await open(page);
    const footer = page.locator(".ant-drawer-footer");
    await expect(footer).toBeVisible();
    await expect(
      footer.getByRole("button", { name: "Cancel", exact: true }),
    ).toBeVisible();
    const overflow = await dialog.evaluate((el) => ({
      width: el.clientWidth,
      scroll: el.scrollWidth,
    }));
    expect(overflow.scroll).toBeLessThanOrEqual(overflow.width + 1);
    if (profile === "long") {
      const body = page.locator(".ant-drawer-body");
      expect(
        await body.evaluate((el) => el.scrollHeight > el.clientHeight),
      ).toBeTruthy();
      await body.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
      });
      await expect(
        page.getByText("Section 30:", { exact: false }),
      ).toBeInViewport();
      await expect(footer).toBeInViewport();
    } else if (profile === "empty") {
      await expect(
        page.getByText("No project settings available"),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Save changes$/ }),
      ).toBeDisabled();
    } else if (profile === "loading") {
      await expect(
        page.getByRole("textbox", { name: /Project name$/ }),
      ).toBeDisabled();
      await expect(
        page.getByRole("button", { name: /Save changes$/ }),
      ).toBeDisabled();
    } else if (profile === "error") {
      await page.getByRole("button", { name: /Save changes$/ }).click();
      await expect(
        page.getByText("Enter a project name", { exact: true }),
      ).toBeVisible();
      await expect(dialog).toBeVisible();
      await expect(
        page.getByRole("textbox", { name: /Project name$/ }),
      ).toHaveAttribute("aria-invalid", "true");
    } else {
      await page
        .getByRole("textbox", { name: /Project name$/ })
        .fill("Updated project");
    }
    await page.screenshot({
      path: info.outputPath(`stress-${profile}.png`),
      fullPage: true,
      animations: "allow",
    });
  });

test("successful actual form submission closes and announces outcome", async ({
  page,
}) => {
  await page.goto(url("stress"));
  const { dialog, trigger } = await open(page);
  await page
    .getByRole("textbox", { name: /Project name$/ })
    .fill("Updated project");
  await page.getByRole("button", { name: /Save changes$/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Project settings saved");
  await expect(trigger).toBeFocused();
});

for (const mode of ["light", "dark"])
  test(`axe dialog ${mode}`, async ({ page }, info) => {
    await page.goto(url("stress", "default", mode));
    await open(page);
    const result = await new AxeBuilder({ page })
      .include(".ant-drawer")
      .analyze();
    await info.attach("axe-dialog", {
      body: JSON.stringify(result, null, 2),
      contentType: "application/json",
    });
    expect(result.violations).toEqual([]);
  });

test("reduced motion removes drawer movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url());
  await open(page);
  const durations = await page
    .locator(".ant-drawer-content-wrapper")
    .evaluate((el) => ({
      transition: getComputedStyle(el).transitionDuration,
      animation: getComputedStyle(el).animationDuration,
    }));
  const max = (value: string) =>
    Math.max(
      ...value
        .split(",")
        .map(
          (part) =>
            Number.parseFloat(part) * (part.trim().endsWith("ms") ? 1 : 1000),
        ),
    );
  expect(max(durations.transition)).toBeLessThanOrEqual(1);
  expect(max(durations.animation)).toBeLessThanOrEqual(1);
});

test("nested actual date-picker popup remains operable under drawer focus lock", async ({
  page,
}) => {
  await page.goto(url("stress", "nested"));
  const { dialog, trigger } = await open(page);
  const date = page.getByRole("textbox", { name: "Review date", exact: true });
  await date.click();
  const popup = page.locator(".ant-picker-dropdown").filter({ visible: true });
  await expect(popup).toBeVisible();
  const next = popup.locator(".ant-picker-header-next-btn");
  await next.focus();
  await expect(next).toBeFocused();
  const heading = popup.locator(".ant-picker-header-view");
  const before = await heading.innerText();
  await page.keyboard.press("Enter");
  await expect(heading).not.toHaveText(before);
  await expect(dialog).toBeVisible();
  await date.focus();
  await page.keyboard.press("Escape");
  await expect(popup).not.toBeVisible();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
