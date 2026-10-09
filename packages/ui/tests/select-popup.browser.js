// Bounded diagnostic for first-open/reopen alignment; reports failures without hiding them.
async (page) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  page.setDefaultTimeout(5000);
  const results = [];
  for (const target of ["built", "bare"]) {
    for (const reducedMotion of ["reduce", "no-preference"]) {
      await page.emulateMedia({ reducedMotion });
      await page.goto(
        target === "built"
          ? "http://127.0.0.1:5193"
          : "http://127.0.0.1:5194/review-fixture.html",
      );
      await page.evaluate(() => document.fonts.ready);
      const name = target === "built" ? "CRM stage" : "Uncontrolled canceled";
      const optionName = target === "built" ? "Active" : "Alpine";
      const combo = page.getByRole("combobox", { name, exact: true });
      for (const opening of ["first", "reopen"]) {
        await combo.click();
        const option = page.getByRole("option", {
          name: optionName,
          exact: true,
        });
        await option.waitFor();
        let aligned = true;
        try {
          await page.waitForFunction(
            (name) => {
              const options = Array.from(
                document.querySelectorAll('[role="option"]'),
              );
              const node = options.find((n) => n.textContent.trim() === name);
              if (!node) return false;
              const r = node.getBoundingClientRect();
              return (
                r.width > 0 &&
                r.height > 0 &&
                r.left >= 0 &&
                r.top >= 0 &&
                r.right <= innerWidth &&
                r.bottom <= innerHeight
              );
            },
            optionName,
            { timeout: 3000 },
          );
        } catch {
          aligned = false;
        }
        if (aligned) await option.click({ trial: true });
        const detail = await option.evaluate((node) => ({
          rect: node.getBoundingClientRect().toJSON(),
          popup: node.closest(".ant-select-dropdown")?.getAttribute("style"),
          visible: getComputedStyle(node).visibility,
        }));
        results.push({ target, reducedMotion, opening, aligned, detail });
        if (aligned) await option.click();
        else
          await page.screenshot({
            path: `output/playwright/task1-popup-${target}-${reducedMotion}-${opening}.png`,
          });
        await combo.press("Escape");
      }
    }
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  if (!results.every((r) => r.aligned)) throw Error(JSON.stringify(results));
  return { results, allAligned: true, bareProviderReducedMotion: true };
}
