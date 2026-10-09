async (page) => {
  const evidence = Date.now();
  const checks = [],
    requests = [],
    errors = [],
    sockets = [];
  page.setDefaultTimeout(5000);
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("websocket", (w) => sockets.push(w.url()));
  const check = (name, pass, detail) => {
    checks.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  const route = async (r) => {
    await page.evaluate((r) => (location.hash = "/" + r), r);
    await page.waitForTimeout(100);
  };
  const select = async (name, value) => {
    await page.getByRole("combobox", { name, exact: true }).click();
    await page.getByRole("option", { name: value, exact: true }).click();
  };
  await page.goto("http://127.0.0.1:5211/#/components/button");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole("searchbox", { name: "Find a component" })
    .fill("unfindable");
  check(
    "component empty filter",
    (await page
      .getByRole("status")
      .filter({ hasText: "No components found" })
      .innerText()) === "No components found. Try another name.",
    {},
  );
  await page
    .getByRole("searchbox", { name: "Find a component" })
    .fill("checkbox");
  check(
    "category search",
    (await page
      .getByRole("navigation", { name: "Component categories" })
      .getByRole("link")
      .count()) === 1,
    {},
  );
  await page.getByRole("searchbox", { name: "Find a component" }).fill("");
  await page
    .getByRole("button", { name: "Create sample", exact: true })
    .click();
  check(
    "action changes local state",
    (
      await page
        .getByRole("status")
        .filter({ hasText: "samples created" })
        .innerText()
    ).includes("1 samples"),
    {},
  );
  for (const [name, expected] of [
    ["Create sample", "pointer"],
    ["Unavailable", "not-allowed"],
    ["Saving sample", "progress"],
  ])
    check(
      `cursor ${name}`,
      (await page
        .getByRole("button", { name, exact: true })
        .evaluate((e) => getComputedStyle(e).cursor)) === expected,
      {},
    );
  await page.getByRole("tab", { name: "Code", exact: true }).click();
  check(
    "usage code",
    (await page.getByRole("tabpanel", { name: "Code" }).innerText()).includes(
      "from '@kooyaph/ui'",
    ),
    {},
  );
  await page.getByRole("link", { name: "Key props", exact: true }).click();
  check(
    "local anchor reveal",
    await page
      .locator("#api")
      .evaluate((e) => e.getBoundingClientRect().top >= 64),
    {},
  );
  await route("templates");
  check(
    "17 families",
    (await page.locator(".template-gallery-card").count()) === 17,
    {},
  );
  await select("Template category", "Business");
  check(
    "category gallery",
    (await page.locator(".template-gallery-card").count()) === 8,
    {},
  );
  await page
    .getByRole("searchbox", { name: "Find a template" })
    .fill("no-such");
  check("template no results", await page.getByRole("status").isVisible(), {});
  await page.getByRole("searchbox", { name: "Find a template" }).fill("");
  await select("Template category", "All");
  await page.getByRole("link", { name: /Wizards Open example/ }).click();
  check("focused template URL", page.url().endsWith("/templates/wizard"), {});
  await page.goBack();
  await page.waitForTimeout(100);
  check(
    "browser back restores gallery",
    (await page.locator(".template-gallery-card").count()) === 17,
    {},
  );
  await route("templates/wizard");
  check(
    "invalid wizard Next disabled",
    await page.getByRole("button", { name: "Next", exact: true }).isDisabled(),
    {},
  );
  await page
    .getByRole("textbox", { name: "Workspace name", exact: true })
    .fill("Local launch");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  check(
    "wizard draft retained",
    (await page
      .getByRole("textbox", { name: "Workspace name", exact: true })
      .inputValue()) === "Local launch",
    {},
  );
  await select("Example state", "Error & retry");
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  check(
    "local retry restores template",
    await page
      .getByRole("textbox", { name: "Workspace name", exact: true })
      .isVisible(),
    {},
  );
  await route("templates/board");
  await select("Move Launch brief", "Done");
  check(
    "board move",
    await page
      .getByRole("region", { name: "Done", exact: true })
      .getByText("Launch brief", { exact: true })
      .isVisible(),
    {},
  );
  await route("templates/inbox");
  check(
    "empty send blocked",
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .isDisabled(),
    {},
  );
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Ready locally");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  check(
    "message added",
    await page
      .getByRole("log")
      .getByText("Ready locally", { exact: true })
      .isVisible(),
    {},
  );
  await route("components/overlays");
  const opener = page.getByRole("button", { name: "Open dialog", exact: true });
  await opener.focus();
  await page.keyboard.press("Enter");
  await select("Dialog team", "Content");
  await page.getByRole("button", { name: "Nested menu", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page
    .getByRole("menuitem", { name: "Mark reviewed", exact: true })
    .press("Enter");
  await page.waitForTimeout(250);
  check(
    "nested menu retains dialog",
    await page
      .getByRole("dialog", { name: "Sample dialog", exact: true })
      .isVisible(),
    {},
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  check(
    "dialog returns focus",
    await opener.evaluate((e) => e === document.activeElement),
    {},
  );
  await page.getByRole("button", { name: "Open drawer", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Drawer note", exact: true })
    .fill("Detail");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  check(
    "drawer returns focus",
    await page
      .getByRole("button", { name: "Open drawer", exact: true })
      .evaluate((e) => e === document.activeElement),
    {},
  );
  await route("examples/crm");
  await page
    .getByRole("button", { name: "Add organization", exact: true })
    .click();
  check(
    "empty organization blocked",
    await page
      .getByRole("button", { name: "Create organization", exact: true })
      .isDisabled(),
    {},
  );
  await page
    .getByRole("textbox", { name: "Organization name", exact: true })
    .fill("Layout QA Organization");
  await page
    .getByRole("button", { name: "Create organization", exact: true })
    .click();
  await page.waitForTimeout(250);
  await route("overview");
  await route("examples/crm");
  check(
    "record survives library browsing",
    await page.getByText("Layout QA Organization", { exact: true }).isVisible(),
    {},
  );
  await route("examples/settings");
  await page
    .getByRole("textbox", { name: "Workspace name", exact: true })
    .fill(
      "An intentionally long workspace name for narrow responsive verification",
    );
  await page
    .getByRole("button", { name: "Save settings", exact: true })
    .click();
  await route("overview");
  await route("examples/settings");
  check(
    "settings survive browsing",
    (
      await page
        .getByRole("textbox", { name: "Workspace name", exact: true })
        .inputValue()
    ).startsWith("An intentionally long"),
    {},
  );
  await page.setViewportSize({ width: 320, height: 900 });
  await route("examples/crm");
  check(
    "long workspace fits",
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    {},
  );
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page
    .getByRole("dialog", { name: "Navigation", exact: true })
    .getByRole("button", { name: /Usage dashboard/ })
    .click();
  await page.waitForTimeout(250);
  check(
    "sample mobile nav selects usage",
    page.url().endsWith("/examples/usage") &&
      (await page.getByRole("dialog").count()) === 0,
    {},
  );
  await page
    .getByRole("button", { name: "Browse library", exact: true })
    .click();
  await page
    .getByRole("dialog", { name: "Browse library", exact: true })
    .getByRole("link", { name: "Components", exact: true })
    .click();
  await page.waitForTimeout(250);
  check(
    "library mobile nav closes",
    page.url().endsWith("/components") &&
      (await page.getByRole("dialog").count()) === 0,
    {},
  );
  await page
    .getByRole("button", { name: "Browse components", exact: true })
    .click();
  await page
    .getByRole("dialog", { name: "Browse components", exact: true })
    .getByRole("link", { name: "Labelled fields", exact: true })
    .click();
  await page.waitForTimeout(250);
  check(
    "component mobile nav selects detail",
    page.url().endsWith("/components/fields") &&
      (await page.getByRole("dialog").count()) === 0,
    {},
  );
  await page
    .getByRole("textbox", { name: "Workspace name", exact: true })
    .focus();
  const focused = await page
    .getByRole("textbox", { name: "Workspace name", exact: true })
    .evaluate((e) => {
      const r = e.getBoundingClientRect();
      return {
        top: r.top,
        bottom: r.bottom,
        outline: getComputedStyle(e).outlineStyle,
      };
    });
  check(
    "focused field reachable",
    focused.top >= 64 && focused.bottom <= 900,
    focused,
  );
  await page.screenshot({
    path: `output/playwright/${evidence}-layout-head-interactions-final-320.png`,
  });
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
