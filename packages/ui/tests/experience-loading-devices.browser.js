async (page) => {
  const checks = [];
  const requests = [];
  const consoleErrors = [];
  page.on("request", (request) => requests.push(request.url()));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  const check = (name, pass, detail) => checks.push({ name, pass, detail });

  await page.goto(
    `http://127.0.0.1:5244/?preview=${Date.now()}#/experience/loading`,
  );
  const busy = page.locator('[aria-busy="true"]');
  await busy.waitFor({ state: "visible" });
  const skeletons = await busy.locator(".ku-skeleton--card").count();
  check("cold read renders its card skeleton", skeletons > 0, skeletons);
  await page.screenshot({ path: "/tmp/kooya-ui-loading-skeleton.png" });
  const ogTitle = await page
    .locator('meta[property="og:title"]')
    .getAttribute("content");
  check("preview publishes a descriptive Open Graph title", !!ogTitle, ogTitle);
  await page.getByRole("button", { name: "Simulate read failure" }).click();
  const alert = page.getByRole("alert");
  await alert.waitFor({ state: "visible" });
  const errorCopy = await alert.innerText();
  check(
    "read failure shows safe public code and status only",
    errorCopy.includes("UI code: UI_DEMO_FAILED") &&
      errorCopy.includes("HTTP 503") &&
      !errorCopy.includes("FICTIONAL_READ_FAILED"),
    errorCopy,
  );
  await page.getByRole("button", { name: "Try again" }).click();
  await page.locator('[aria-busy="true"]').waitFor({ state: "visible" });
  await page
    .getByText("fictional brief", { exact: false })
    .waitFor({ state: "visible" });

  await page.getByRole("tab", { name: "Device compositions" }).click();
  for (const [width, height, mode, className] of [
    [768, 1024, "tablet", "ku-table-priority"],
    [390, 844, "mobile", "ku-table-cards"],
  ]) {
    await page.setViewportSize({ width, height });
    await page
      .getByText(`Current composition: ${mode}`)
      .waitFor({ state: "visible" });
    const layout = page.locator(`.${className}[data-device="${mode}"]`).first();
    const metrics = await layout.evaluate((element) => ({
      width: document.documentElement.scrollWidth,
      classes: element.className,
      bounds: element.getBoundingClientRect().toJSON(),
    }));
    check(
      `${mode} gets its own record composition with no page overflow`,
      metrics.width <= width + 1 && metrics.classes.includes(className),
      metrics,
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `/tmp/kooya-ui-device-${mode}.png`,
      fullPage: true,
    });
  }
  check(
    "the examples load no external services",
    requests.every((url) => url.startsWith("http://127.0.0.1:5244/")),
    requests,
  );
  check(
    "the browser console stays clear",
    consoleErrors.length === 0,
    consoleErrors,
  );
  const failures = checks.filter((item) => !item.pass);
  if (failures.length) throw Error(JSON.stringify({ checks, failures }));
  return { checks };
};
