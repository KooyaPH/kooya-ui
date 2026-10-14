// Playwright CLI consumes a function expression, without a statement terminator.
// prettier-ignore
async (page) => {
  await page.goto("http://127.0.0.1:5194/ant-foundation-fixture.html");
  const results = [];
  const rgb = (value) =>
    value
      .match(/[\d.]+/g)
      .slice(0, 3)
      .map(Number);
  const luminance = (value) =>
    rgb(value)
      .map((v) => {
        v /= 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      })
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const contrast = (a, b) =>
    (Math.max(luminance(a), luminance(b)) + 0.05) /
    (Math.min(luminance(a), luminance(b)) + 0.05);
  const read = async (locator, pseudo) =>
    locator.evaluate((e, pseudo) => {
      const style = getComputedStyle(e, pseudo);
      const root = e.closest(".ku-root");
      const swatch = document.createElement("span");
      swatch.style.color = "var(--ku-surface)";
      root.appendChild(swatch);
      const surface = getComputedStyle(swatch).color;
      swatch.remove();
      return {
        color: style.color,
        background: style.backgroundColor,
        border: style.borderColor,
        surface,
        font: style.fontFamily,
        scope: !!root,
        height: e.getBoundingClientRect().height,
      };
    }, pseudo);
  for (const mode of ["light", "dark"]) {
    await page.setViewportSize({ width: 1280, height: 1000 });
    if (mode === "dark")
      await page.getByRole("button", { name: "Toggle mode" }).click();
    const primary = page.getByRole("button", { name: "Continue", exact: true });
    for (const state of ["default", "hover"]) {
      if (state === "hover") await primary.hover();
      else await page.mouse.move(1250, 990);
      await page.waitForTimeout(250);
      const style = await read(primary);
      const ratio = contrast(style.color, style.background);
      if (ratio < 4.5 || style.height < 44)
        throw Error(
          `${mode} primary ${state}: ${JSON.stringify({ ...style, ratio })}`,
        );
      results.push({ mode, primary: state, ratio, height: style.height });
    }
    const danger = page.getByRole("button", { name: "Danger action", exact: true });
    for (const state of ["default", "hover", "active"]) {
      if (state === "default") await page.mouse.move(1250, 990); else await danger.hover();
      if (state === "active") await page.mouse.down();
      await page.waitForTimeout(250);
      const style = await read(danger);
      const ratio = contrast(style.color, style.background);
      if (state === "active") await page.mouse.up();
      if (ratio < 4.5) throw Error(`${mode} danger ${state}: ${JSON.stringify({ ...style, ratio })}`);
      results.push({ mode, danger: state, ratio });
    }
    await page.getByRole("button", { name: "Hover hint" }).hover();
    const tooltip = page.locator(".ant-tooltip-container");
    await tooltip.waitFor({ state: "visible" });
    const tooltipStyle = await read(tooltip);
    if (!tooltipStyle.scope || contrast(tooltipStyle.color, tooltipStyle.background) < 4.5) throw Error(`${mode} tooltip ${JSON.stringify(tooltipStyle)}`);
    results.push({ mode, tooltip: tooltipStyle });
    await page.mouse.move(1250, 990);
    const solidRadio = await read(
      page.locator(".ant-radio-button-wrapper-checked"),
    );
    if (contrast(solidRadio.color, solidRadio.background) < 4.5)
      throw Error(`${mode} solid Radio button ${JSON.stringify(solidRadio)}`);
    results.push({ mode, solidRadio });
    const step = await read(
      page.locator(".ant-steps-item-process .ant-steps-item-icon"),
    );
    if (contrast(step.color, step.background) < 4.5)
      throw Error(`${mode} active step ${JSON.stringify(step)}`);
    results.push({ mode, step });
    for (const selector of [
      ".ant-checkbox-checked",
      ".ant-radio-checked",
      ".ant-switch-checked",
    ]) {
      const style = await read(page.locator(selector));
      const ratio = contrast(style.background, style.surface);
      if (ratio < 3)
        throw Error(
          `${mode} selected ${selector}: ${JSON.stringify({ ...style, ratio })}`,
        );
      results.push({ mode, selected: selector, ratio });
    }
    for (const selector of [
      ".ant-tabs-tab-active .ant-tabs-tab-btn",
      ".ant-menu-item-selected",
    ]) {
      const style = await read(page.locator(selector));
      const ratio = contrast(style.color, style.surface);
      if (ratio < 4.5)
        throw Error(
          `${mode} selected text ${selector}: ${JSON.stringify({ ...style, ratio })}`,
        );
      results.push({ mode, selected: selector, ratio });
    }
    await page.getByRole("combobox", { name: "Office" }).click();
    const select = page.locator(".ant-select-dropdown");
    await select.waitFor({ state: "visible" });
    for (const overlay of [
      select,
      page.locator(".ant-select-item-option-selected"),
    ]) {
      const style = await read(overlay);
      if (!style.scope || contrast(style.color, style.background) < 4.5)
        throw Error(`${mode} select ${JSON.stringify(style)}`);
      results.push({ mode, select: style });
    }
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Open dropdown" }).click();
    const dropdown = page.locator(".ant-dropdown-menu");
    await dropdown.waitFor({ state: "visible" });
    const dropdownStyle = await read(dropdown);
    if (
      !dropdownStyle.scope ||
      dropdownStyle.background !== dropdownStyle.surface
    )
      throw Error(`${mode} dropdown ${JSON.stringify(dropdownStyle)}`);
    results.push({ mode, dropdown: dropdownStyle });
    await page.keyboard.press("Escape");
    await page.mouse.click(1250, 990);
    for (const [button, selector] of [
      ["Open modal", ".ant-modal-container"],
      ["Open drawer", ".ant-drawer-section"],
    ]) {
      await page.getByRole("button", { name: button, exact: true }).click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible" });
      const style = await read(page.locator(selector));
      if (
        !style.scope ||
        style.background !== style.surface ||
        contrast(style.color, style.background) < 4.5
      )
        throw Error(`${mode} ${button} ${JSON.stringify(style)}`);
      results.push({ mode, overlay: button, ...style });
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      await page.waitForFunction((button) => document.activeElement?.textContent?.trim() === button, button);
      results.push({ mode, focusReturned: button });
    }
    await page.getByRole("button", { name: "Notify" }).click();
    const notification = page.locator(".ant-notification-notice");
    await notification.waitFor({ state: "visible" });
    const notificationStyle = await read(notification);
    if (
      !notificationStyle.scope ||
      notificationStyle.background !== notificationStyle.surface
    )
      throw Error(`${mode} notification ${JSON.stringify(notificationStyle)}`);
    results.push({ mode, notification: notificationStyle });
    await page.getByRole("button", { name: "Close", exact: true }).click();
  }
  for (const width of [360, 768, 1280]) {
    await page.setViewportSize({ width, height: 1000 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    if (overflow) throw Error(`Foundation fixture overflow at ${width}`);
    results.push({ width, overflow });
  }
  await page.getByRole("button", { name: "Toggle density" }).click();
  await page.waitForFunction(
    () =>
      document.querySelector(".ant-btn-primary").getBoundingClientRect()
        .height === 36,
  );
  const compact = await read(
    page.getByRole("button", { name: "Continue", exact: true }),
  );
  if (compact.height !== 36)
    throw Error(`Compact primary height ${compact.height}`);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      document
        .querySelector(".ku-root")
        ?.getAttribute("data-reduced-motion") === "true",
  );
  results.push({ compactHeight: compact.height, reducedMotion: true });
  return results;
}
