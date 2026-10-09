async (page) => {
  await page.goto("http://127.0.0.1:5193");
  const checks = [];
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "Overlays", exact: true }).click();
  for (const theme of ["mosaic", "signature", "canvas", "client"]) {
    await page
      .getByRole("combobox", { name: "Theme", exact: true })
      .selectOption(theme);
    await page.getByRole("button", { name: "Open modal", exact: true }).click();
    const dialog = page.getByRole("dialog", {
      name: "A little more detail",
      exact: true,
    });
    await dialog.waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(350);
    await dialog.getByRole("button", {name: "Close", exact: true}).focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    const result = await dialog.evaluate((e) => {
      const root = e.closest(".ku-root");
      const box = e.querySelector(".ant-modal-container");
      const swatch = document.createElement("span");
      swatch.style.color = "var(--ku-surface)";
      root.appendChild(swatch);
      const expected = getComputedStyle(swatch).color;
      swatch.style.color = "var(--ku-focus)";
      const expectedFocus = getComputedStyle(swatch).color;
      swatch.remove();
      return {
        insideProvider: !!root,
        expectedFocus,
        actualFocus: getComputedStyle(e.querySelector("button")).outlineColor,
        background: getComputedStyle(box).backgroundColor,
        expected,
        font: getComputedStyle(box).fontFamily,
        rootFont: getComputedStyle(root).fontFamily,
        description: e.getAttribute("aria-describedby"),
      };
    });
    if (
      !result.insideProvider ||
      result.actualFocus !== result.expectedFocus ||
      result.background !== result.expected ||
      result.font !== result.rootFont ||
      !result.description
    )
      throw Error(JSON.stringify(result));
    checks.push({ theme, ...result });
    await page.screenshot({
      path: `output/playwright/task1-modal-${theme}.png`,
      fullPage: true,
    });
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
  }
  await page
    .getByRole("combobox", { name: "Density", exact: true })
    .selectOption("compact");
  await page
    .getByRole("button", { name: "CRM & accounts", exact: true })
    .click();
  const padding = await page
    .getByRole("table", { name: "CRM organizations", exact: true })
    .getByRole("cell")
    .first()
    .evaluate((e) => getComputedStyle(e).paddingTop);
  if (padding !== "10px") throw Error("Compact table padding " + padding);
  checks.push({ compactPadding: padding });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      document
        .querySelector(".ku-root")
        ?.getAttribute("data-reduced-motion") === "true",
  );
  checks.push({ reducedMotion: true });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page
    .getByRole("combobox", { name: "Density", exact: true })
    .selectOption("comfortable");
  await page
    .getByRole("combobox", { name: "Theme", exact: true })
    .selectOption("mosaic");
  return checks;
}
