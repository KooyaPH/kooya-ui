// Run against the built preview on 127.0.0.1:5193 with playwright-cli run-code --filename.
// The drawer intentionally closes immediately after mount to cover the canceled entrance regression.
async (page) => {
  const checks = [];
  const network = [];
  const errors = [];
  const sockets = [];
  page.on("websocket", (socket) => sockets.push(socket.url()));
  page.on("request", (r) =>
    network.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text());
  });
  const check = (name, pass, detail) => {
    checks.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  await page.goto("http://127.0.0.1:5193");
  await page.evaluate(() => document.fonts.ready);
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ["mosaic", "signature", "canvas", "client"]) {
      await page
        .getByRole("combobox", { name: "Theme", exact: true })
        .selectOption(theme);
      for (const composition of ["mosaic", "orbit", "canvas", "flow"]) {
        await page
          .getByRole("combobox", { name: "Composition", exact: true })
          .selectOption(composition);
        await page.waitForTimeout(70);
        const layout = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          viewport: innerWidth,
          heading: document.querySelector("h1")?.textContent,
        }));
        check(
          `${width} ${theme} ${composition}`,
          layout.width <= width + 1 && layout.heading === "CRM & accounts",
          layout,
        );
      }
    }
    await page
      .getByRole("combobox", { name: "Theme", exact: true })
      .selectOption("mosaic");
    await page
      .getByRole("combobox", { name: "Composition", exact: true })
      .selectOption("mosaic");
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `output/playwright/task1-crm-${width}.png`,
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "Foundations", exact: true }).click();
  const long = page.getByRole("button", {
    name: "Review workspace publishing permissions",
    exact: true,
  });
  const normal = page.getByRole("button", {
    name: "Create something",
    exact: true,
  });
  check(
    "primary target",
    (await normal.evaluate((e) => e.getBoundingClientRect().height)) >= 44,
  );
  check(
    "button icon gap",
    (await normal
      .locator(".ku-button-content")
      .evaluate((e) => getComputedStyle(e).gap)) === "8px",
  );
  check(
    "disabled cursor",
    (await page
      .getByRole("button", { name: "Unavailable", exact: true })
      .evaluate((e) => getComputedStyle(e).cursor)) === "not-allowed",
  );
  await page.getByRole("button", { name: "Save sample", exact: true }).click();
  check(
    "busy cursor",
    (await page
      .getByRole("button", { name: "Save sample", exact: true })
      .evaluate((e) => getComputedStyle(e).cursor)) === "progress",
  );
  check(
    "static chip cursor",
    (await page
      .locator(".ku-chip")
      .first()
      .evaluate((e) => getComputedStyle(e).cursor)) === "default",
  );
  await page.screenshot({
    path: "output/playwright/task1-foundations-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 900 });
  await long.scrollIntoViewIfNeeded();
  check(
    "long label remains contained",
    await long.evaluate(
      (e) =>
        e.getBoundingClientRect().right <= innerWidth &&
        e.scrollWidth <= e.clientWidth,
    ),
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  await page.screenshot({
    path: "output/playwright/task1-foundations-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "Forms", exact: true }).click();
  await page.getByRole("button", { name: "Save example", exact: true }).click();
  check(
    "invalid form visible",
    await page
      .getByText("Enter a workspace name.", { exact: true })
      .isVisible(),
  );
  await page
    .getByRole("textbox", { name: "Workspace name", exact: true })
    .fill("Fictional review");
  await page.getByRole("button", { name: "Save example", exact: true }).click();
  check(
    "local save notice",
    await page
      .getByRole("status")
      .filter({ hasText: "Sample form saved for Fictional review." })
      .isVisible(),
  );
  check(
    "text cursor",
    (await page
      .getByRole("textbox", { name: "Read-only reference", exact: true })
      .evaluate((e) => getComputedStyle(e).cursor)) === "text",
  );
  const toggle = page.getByRole("switch", {
    name: "Publishing updates",
    exact: true,
  });
  const before = await toggle.getAttribute("aria-checked");
  await page.getByText("Publishing updates", { exact: true }).click();
  check(
    "switch label works",
    (await toggle.getAttribute("aria-checked")) !== before,
  );
  await page.getByRole("button", { name: "Overlays", exact: true }).click();
  const opener = page.getByRole("button", { name: "Open modal", exact: true });
  await opener.click();
  await page
    .getByRole("dialog", { name: "A little more detail", exact: true })
    .waitFor();
  await page
    .getByRole("textbox", { name: "Sample note", exact: true })
    .fill("Fictional note");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  check(
    "modal focus restoration",
    await opener.evaluate((e) => e === document.activeElement),
  );
  await page.getByRole("button", { name: "Open drawer", exact: true }).click();
  await page
    .getByRole("dialog", { name: "Sample account details", exact: true })
    .waitFor();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.waitForFunction(
    () => document.activeElement?.textContent === "Open drawer",
    {},
    { timeout: 2000 },
  );
  check(
    "rapid Escape drawer focus restoration",
    await page
      .getByRole("button", { name: "Open drawer", exact: true })
      .evaluate((e) => e === document.activeElement),
  );
  await page.getByRole("button", { name: "Open drawer", exact: true }).click();
  await page.waitForTimeout(600);
  await page.keyboard.press("Escape");
  await page.waitForFunction(
    () => document.activeElement?.textContent === "Open drawer",
    {},
    { timeout: 2000 },
  );
  check(
    "settled drawer focus restoration",
    await page
      .getByRole("button", { name: "Open drawer", exact: true })
      .evaluate((e) => e === document.activeElement),
  );
  const menu = page.getByRole("button", { name: "Open menu", exact: true });
  await menu.focus();
  await page.keyboard.press("ArrowDown");
  await page
    .getByRole("menuitem", { name: "View sample", exact: true })
    .waitFor();
  await page.waitForTimeout(80);
  await page.keyboard.press("End");
  await page.waitForTimeout(80);
  await page.keyboard.press("Enter");
  check(
    "menu keyboard action",
    await page
      .getByRole("status")
      .filter({ hasText: "Destructive style sample." })
      .isVisible(),
  );
  await page.setViewportSize({ width: 375, height: 900 });
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page.getByRole("dialog").waitFor();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "CRM & accounts", exact: true })
    .click();
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  check(
    "mobile navigation chooses page",
    await page
      .getByRole("heading", { name: "CRM & accounts", exact: true })
      .isVisible(),
  );
  check(
    "no external services",
    network.every((r) => r.url.startsWith("http://127.0.0.1:5193/")),
    network.filter((r) => !r.url.startsWith("http://127.0.0.1:5193/")),
  );
  check(
    "no API requests",
    network.every((r) => !["fetch", "xhr"].includes(r.type)),
    network.filter((r) => ["fetch", "xhr"].includes(r.type)),
  );
  check("no browser errors", errors.length === 0, errors);
  check("no realtime sockets", sockets.length === 0, sockets);
  return { checks, requests: network, sockets, errors };
}
