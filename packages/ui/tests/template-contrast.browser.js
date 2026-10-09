// Serve the built playground at 5195; run with playwright-cli run-code --filename.
async (page) => {
  const results = [];
  const choose = async (label, option) => {
    await page.getByRole("combobox", { name: label, exact: true }).click();
    await page.getByRole("option", { name: option, exact: true }).click();
    await page
      .locator(".ant-select-dropdown:visible")
      .waitFor({ state: "hidden" });
  };
  const appearance = async (mode, accent) => {
    await page
      .getByRole("button", { name: "Workspace actions for AS", exact: true })
      .click();
    await page
      .getByRole("menuitem", { name: "Preview appearance", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Reset appearance overrides", exact: true })
      .click();
    await choose("Color mode", mode);
    if (accent) {
      await page
        .getByLabel("Brand accent", { exact: true })
        .evaluate((input, value) => {
          Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value",
          ).set.call(input, value);
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }, accent);
    }
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "hidden" });
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:5195");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("tab", { name: "Library", exact: true }).click();
  await page.getByRole("tab", { name: "Templates", exact: true }).click();
  await choose("Template family", "Console · Wizards");
  for (const theme of ["signature", "mosaic", "canvas", "client"]) {
    await page
      .getByRole("combobox", { name: "Theme", exact: true })
      .selectOption(theme);
    for (const mode of ["Light", "Dark"]) {
      for (const accent of [null, "#ffffaa"]) {
        await appearance(mode, accent);
        const current = page
          .getByRole("list", { name: "Progress", exact: true })
          .locator('[aria-current="step"]');
        const measured = await current.evaluate((step) => {
          const s = getComputedStyle(step);
          let ancestor = step;
          let background;
          do {
            background = getComputedStyle(ancestor).backgroundColor;
            ancestor = ancestor.parentElement;
          } while (
            ancestor &&
            (background === "transparent" || background === "rgba(0, 0, 0, 0)")
          );
          const luminance = (value) =>
            value
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number)
              .map((n) => {
                const c = n / 255;
                return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
              })
              .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
          const text = luminance(s.color),
            surface = luminance(background);
          return {
            text: s.color,
            background,
            ratio:
              (Math.max(text, surface) + 0.05) /
              (Math.min(text, surface) + 0.05),
            weight: s.fontWeight,
            label: step.textContent,
            accent: s.getPropertyValue("--ku-accent").trim(),
          };
        });
        const result = { theme, mode, customAccent: accent, ...measured };
        results.push(result);
        if (accent && measured.accent !== accent)
          throw Error(
            "Custom accent did not reach the template: " +
              JSON.stringify(result),
          );
        if (measured.weight !== "700" || !/^1\. /.test(measured.label))
          throw Error(
            "Current step lost its noncolor indication: " +
              JSON.stringify(result),
          );
      }
    }
  }
  const failures = results.filter((r) => r.ratio < 4.5);
  if (failures.length)
    throw Error(
      "Wizard contrast below 4.5: " + JSON.stringify({ results, failures }),
    );
  return results;
}
