async (page) => {
  const checks = [],
    errors = [],
    warnings = [],
    blocked = [],
    sockets = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "warning") warnings.push(m.text());
  });
  page.on("websocket", (w) => sockets.push(w.url()));
  await page.route("**/*", (r) => {
    const q = r.request();
    if (
      !q.url().startsWith("http://127.0.0.1:5207/") ||
      ["fetch", "xhr"].includes(q.resourceType())
    ) {
      blocked.push(q.url());
      return r.abort();
    }
    return r.continue();
  });
  await page.goto("http://127.0.0.1:5207/conformance-fixture.html");
  const check = (name, pass, detail) => checks.push({ name, pass, detail });
  for (const [label, action, output, value] of [
    ["Keyboard retry", "Retry keyboard choices", "Keyboard retried", "true"],
    [
      "Keyboard empty",
      "Create empty project",
      "Keyboard created",
      "empty-created",
    ],
    [
      "Keyboard results",
      "Create another project",
      "Keyboard created",
      "result-created",
    ],
  ]) {
    const combo = page.getByRole("combobox", { name: label, exact: true });
    await combo.focus();
    await page.keyboard.press("ArrowDown");
    if (label === "Keyboard results") {
      await page.keyboard.press("Escape");
      await page.waitForTimeout(100);
    }
    await page.keyboard.press("Tab");
    await page.waitForTimeout(200);
    const button = page.getByRole("button", { name: action, exact: true });
    const focused =
      (await button.count()) > 0 &&
      (await button.evaluate((n) => n === document.activeElement));
    check(label + " native Tab reaches action", focused, {
      active: await page.evaluate(() => ({
        role: document.activeElement?.getAttribute("role"),
        text: document.activeElement?.textContent,
      })),
    });
    if (focused) {
      await page.keyboard.press("Enter");
      check(
        label + " Enter action payload",
        (await page.getByLabel(output, { exact: true }).textContent()) ===
          value,
      );
    }
  }
  const combo = page.getByRole("combobox", {
    name: "Keyboard results",
    exact: true,
  });
  await combo.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  check(
    "controlled selection string ID",
    (await page
      .getByLabel("Keyboard selected", { exact: true })
      .textContent()) === "existing-id",
  );
  check(
    "controlled single selection dismisses",
    (await page.getByLabel("Keyboard open", { exact: true }).textContent()) ===
      "false",
  );
  await combo.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(100);
  await page.keyboard.press("Tab");
  check(
    "Ant option Tab commit then next Tab reaches stable footer",
    await page
      .getByRole("button", { name: "Create another project", exact: true })
      .evaluate((n) => n === document.activeElement),
  );
  await page.keyboard.press("Shift+Tab");
  check(
    "footer Shift Tab returns combobox",
    await combo.evaluate((n) => n === document.activeElement),
  );
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const cursor = await page
      .getByRole("tab", { name: "Unavailable section", exact: true })
      .evaluate((n) => getComputedStyle(n).cursor);
    check("disabled tab cursor " + width, cursor === "not-allowed", cursor);
  }
  await page
    .getByRole("button", { name: "Open parent editor", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await page
    .getByRole("dialog", { name: "Parent editor", exact: true })
    .waitFor();
  await page
    .getByRole("button", { name: "Nested editor", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  const popup = page.getByRole("dialog", {
    name: "Nested editor",
    exact: true,
  });
  await popup.waitFor();
  await popup
    .getByRole("combobox", { name: "Nested assignee", exact: true })
    .focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(100);
  await page.keyboard.press("Tab");
  const nestedAction = popup.getByRole("button", {
    name: "Create nested assignee",
    exact: true,
  });
  const nestedFocused = await nestedAction.evaluate(
    (n) => n === document.activeElement,
  );
  check("nested choice Escape Tab reaches external footer", nestedFocused);
  if (nestedFocused) {
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    check(
      "nested action payload with Popup and Dialog retained",
      (await popup.isVisible()) &&
        (await page
          .getByRole("dialog", { name: "Parent editor", exact: true })
          .isVisible()) &&
        (await page
          .getByLabel("Assignee value", { exact: true })
          .textContent()) === "nested-created",
    );
  }
  check(
    "no runtime errors or request attempts",
    !errors.length && !blocked.length && !sockets.length,
    { errors, blocked, sockets },
  );
  return { checks, errors, warnings, blocked, sockets };
}
