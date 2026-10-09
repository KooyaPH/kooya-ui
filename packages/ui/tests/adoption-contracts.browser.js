// Serve this fixture on 5196 after building @kooyaph/ui. Uses public exports.
async (page) => {
  page.setDefaultTimeout(6000);
  const checks = [];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const check = (name, pass, detail) => {
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
    checks.push({ name, detail });
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:5196/adoption-fixture.html");
  await page.getByRole("button", { name: "Header 0" }).click();
  await page.getByRole("button", { name: "Cell 0" }).click();
  const cell = await page
    .getByRole("button", { name: "Cell 1" })
    .elementHandle();
  const header = await page
    .getByRole("button", { name: "Header 1" })
    .elementHandle();
  await page.getByRole("button", { name: "Update parent" }).click();
  await cell.focus();
  await page.getByLabel("Revision").filter({ hasText: "1" }).waitFor();
  check(
    "stable cell state and focus",
    await cell.evaluate(
      (n) =>
        n.isConnected &&
        document.activeElement === n &&
        n.textContent.includes("Cell 1"),
    ),
  );
  check(
    "stable header state",
    await header.evaluate(
      (n) => n.isConnected && n.textContent.includes("Header 1"),
    ),
  );
  const row = page.getByRole("row", { name: "Account a" });
  await row.focus();
  await page.keyboard.press("Enter");
  check(
    "row keyboard callback",
    (await page.getByLabel("Activated").textContent()) === "keyboard a",
  );
  await row.click({ position: { x: 5, y: 5 } });
  check(
    "row click callback",
    (await page.getByLabel("Activated").textContent()) === "click a",
  );
  check(
    "column metadata",
    await page
      .getByRole("columnheader")
      .evaluate(
        (n) =>
          n.classList.contains("fixture-column") &&
          getComputedStyle(n).textAlign === "right",
      ),
  );
  for (const kind of ["modal", "drawer", "navigation"]) {
    const trigger = page.getByRole("button", {
      name: `Open ${kind}`,
      exact: true,
    });
    await trigger.click();
    let dialog = page.getByRole("dialog", {
      name: `First ${kind}`,
      exact: true,
    });
    await dialog.waitFor();
    await page.waitForTimeout(150);
    await dialog.getByRole("button", { name: "Finish editor" }).focus();
    await page.keyboard.press("Tab");
    const forward = await dialog.evaluate(n => ({ inside: n.contains(document.activeElement), body: document.activeElement === document.body }));
    check(`${kind} forward Tab avoids underlying controls`, forward.inside || forward.body, forward);
    if (forward.body) await page.keyboard.press("Tab");
    check(`${kind} forward Tab returns inside`, await dialog.evaluate(n => n.contains(document.activeElement)));
    await dialog.getByRole("button", { name: `Close ${kind} editor` }).focus();
    await page.keyboard.press("Shift+Tab");
    const backward = await dialog.evaluate(n => ({ inside: n.contains(document.activeElement), body: document.activeElement === document.body }));
    check(`${kind} backward Tab avoids underlying controls`, backward.inside || backward.body, backward);
    if (backward.body) await page.keyboard.press("Shift+Tab");
    check(`${kind} backward Tab returns inside`, await dialog.evaluate(n => n.contains(document.activeElement)));
    check(
      `${kind} initial external description`,
      (await dialog.evaluate(
        (n) =>
          document.getElementById(n.getAttribute("aria-describedby"))
            ?.textContent,
      )) === `First ${kind} instructions`,
    );
    check(
      `${kind} scoped classes and tokens`,
      await dialog.evaluate(
        (n) =>
          !!n.closest(".ku-root") &&
          !!n.closest("[class*='fixture-']") &&
          !!n.querySelector(".ku-overlay-body.fixture-body") &&
          getComputedStyle(n).fontFamily.includes("Arial"),
      ),
    );
    await dialog.getByRole("button", { name: "Second labels" }).click();
    dialog = page.getByRole("dialog", { name: `Second ${kind}`, exact: true });
    await dialog.waitFor();
    check(
      `${kind} dynamic external description`,
      (await dialog.evaluate(
        (n) =>
          document.getElementById(n.getAttribute("aria-describedby"))
            ?.textContent,
      )) === `Second ${kind} instructions`,
    );
    await dialog.getByRole("button", { name: "Generated labels" }).click();
    dialog = page.getByRole("dialog", {
      name: `Generated ${kind}`,
      exact: true,
    });
    await dialog.waitFor();
    check(
      `${kind} removed external description`,
      (await dialog.evaluate(
        (n) =>
          document.getElementById(n.getAttribute("aria-describedby"))
            ?.textContent,
      )) === `Generated ${kind} instructions`,
    );
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    await page.waitForFunction(
      (label) => document.activeElement?.textContent === label,
      `Open ${kind}`,
    );
    check(
      `${kind} Escape restores focus`,
      await trigger.evaluate((n) => document.activeElement === n),
    );
    await trigger.click();
    dialog = page.getByRole("dialog", {
      name: `Generated ${kind}`,
      exact: true,
    });
    await dialog.waitFor();
    check(`${kind} reopen generated name`, (await dialog.count()) === 1);
    await dialog.getByRole("button", { name: "Titleless labels" }).click();
    dialog = page.getByRole("dialog", { name: `First ${kind}`, exact: true });
    await dialog.waitFor();
    check(`${kind} titleless external name`, (await dialog.count()) === 1);
    await dialog.getByRole("button", { name: "Toggle close icon" }).click();
    check(
      `${kind} hidden close icon`,
      (await dialog
        .getByRole("button", { name: `Close ${kind} editor` })
        .count()) === 0,
    );
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    await trigger.click();
    dialog = page.getByRole("dialog", { name: `First ${kind}`, exact: true });
    await dialog.waitFor();
    await page.mouse.click(kind === "navigation" ? 1437 : 3, 3);
    await dialog.waitFor({ state: "hidden" });
    check(`${kind} backdrop works with icon hidden`, true);
    await trigger.click();
    dialog = page.getByRole("dialog", { name: `First ${kind}`, exact: true });
    await dialog.waitFor();
    await dialog.getByRole("button", { name: "Toggle close icon" }).click();
    await dialog.getByRole("button", { name: "Toggle dismissible" }).click();
    check(
      `${kind} nondismissible hides icon`,
      (await dialog
        .getByRole("button", { name: `Close ${kind} editor` })
        .count()) === 0,
    );
    await page.keyboard.press("Escape");
    await page.mouse.click(kind === "navigation" ? 1437 : 3, 3);
    await page.waitForTimeout(100);
    check(
      `${kind} nondismissible Escape and backdrop`,
      await dialog.isVisible(),
    );
    await dialog.getByRole("button", { name: "Toggle dismissible" }).click();
    const desktop = await dialog.boundingBox();
    check(`${kind} numeric width`, desktop.width === 700, desktop);
    await dialog.getByRole("button", { name: "Toggle width" }).click();
    await page.waitForTimeout(150);
    const cssWidth = await dialog.boundingBox();
    check(`${kind} CSS width`, Math.abs(cssWidth.width - 1152) < 2, cssWidth);
    await dialog.getByRole("button", { name: `Close ${kind} editor` }).click();
    await dialog.waitFor({ state: "hidden" });
    check(`${kind} custom close label`, true);
    for (const width of [375, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await trigger.click();
      await dialog.waitFor();
      await page.waitForTimeout(150);
      const box = await dialog.boundingBox();
      check(
        `${kind} ${width}px containment`,
        box.x >= -1 && box.x + box.width <= width + 1,
        box,
      );
      await page.screenshot({
        path: `output/playwright/adoption-${kind}-${width}.png`,
        fullPage: true,
      });
      await dialog.getByRole("button", { name: "Finish editor" }).click();
      await dialog.waitFor({ state: "hidden" });
      await page.waitForFunction(
        (label) => document.activeElement?.textContent === label,
        `Open ${kind}`,
      );
      check(
        `${kind} ${width}px controlled focus return`,
        await trigger.evaluate((n) => document.activeElement === n),
      );
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  check("no runtime errors", errors.length === 0, errors);
  return { count: checks.length, checks };
}
