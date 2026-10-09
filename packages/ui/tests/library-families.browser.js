async (page) => {
  const evidence = Date.now();
  const checks = [],
    requests = [],
    errors = [],
    sockets = [];
  page.setDefaultTimeout(6000);
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("websocket", (w) => sockets.push(w.url()));
  const route = async (r) => {
    await page.evaluate((r) => (location.hash = "/" + r), r);
    await page.waitForTimeout(100);
  };
  const select = async (name, value) => {
    await page.getByRole("combobox", { name, exact: true }).click();
    await page.getByRole("option", { name: value, exact: true }).click();
  };
  const check = (name, pass, detail) => {
    checks.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  await page.goto("http://127.0.0.1:5211/");
  await page.evaluate(() => document.fonts.ready);
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const id of [
      "provider",
      "tokens",
      "button",
      "status",
      "selection",
      "inputs",
      "feedback",
      "fields",
      "navigation",
      "menu",
      "cards",
      "table",
      "overlays",
      "workspace",
    ]) {
      await route("components/" + id);
      check(
        `${width} component ${id}`,
        (await page
          .getByRole("tab", { name: "Preview", exact: true })
          .isVisible()) &&
          (await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          )),
        {},
      );
    }
    for (const id of [
      "dashboard",
      "collection",
      "detail",
      "form",
      "wizard",
      "settings",
      "board",
      "inbox",
      "feed",
      "content",
      "media",
      "analytics",
      "audit",
      "profile",
      "business",
      "portal",
      "tool",
    ]) {
      await route("templates/" + id);
      await select("Example state", "Ready");
      await page.evaluate(() =>
        window.scrollTo(0, document.documentElement.scrollHeight),
      );
      check(
        `${width} template ${id}`,
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        {},
      );
      await page.screenshot({
        path: `output/playwright/${evidence}-layout-head-family-${width}-${id}-bottom.png`,
      });
      await select("Example state", "Error & retry");
      check(
        `${width} error ${id}`,
        await page
          .getByRole("button", { name: "Try again", exact: true })
          .isVisible(),
        {},
      );
      await page
        .getByRole("button", { name: "Try again", exact: true })
        .click();
      await select("Example state", "Loading");
      check(
        `${width} loading ${id}`,
        (await page
          .getByRole("status")
          .filter({ hasText: "Loading" })
          .count()) > 0,
        {},
      );
      await select("Example state", "Ready");
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await route("components/fields");
  await select("Country", "Philippines");
  check(
    "reduced-motion select opens and commits",
    await page
      .getByRole("combobox", { name: "Country", exact: true })
      .locator("..")
      .innerText()
      .then((x) => x.includes("Philippines")),
    {},
  );
  check(
    "static-only/error-free",
    errors.length === 0 &&
      sockets.length === 0 &&
      !requests.some(
        (r) =>
          !r.url.startsWith("http://127.0.0.1:5211/") ||
          ["fetch", "xhr"].includes(r.type),
      ),
    { errors, sockets, requests: requests.length },
  );
  return { checks, errors, sockets, requests };
}
