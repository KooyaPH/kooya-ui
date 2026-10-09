async (page) => {
  const checks = [],
    errors = [],
    blocked = [],
    sockets = [];
  page.setDefaultTimeout(6000);
  page.on("pageerror", (e) => errors.push(e.message));
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
  const check = (name, pass, detail) => {
    checks.push({ name, pass, detail });
    if (!pass) throw Error(JSON.stringify(checks.at(-1)));
  };
  const focus = async (name, role = "menuitem") => {
    await page.waitForFunction(
      ({ name, role }) => {
        const e = document.activeElement;
        return e?.getAttribute("role") === role && e.textContent.includes(name);
      },
      { name, role },
    );
  };
  const load = () =>
    page.goto("http://127.0.0.1:5207/conformance-fixture.html");
  await load();
  for (const kind of ["modal", "drawer"])
    for (const mounting of ["persistent", "conditional"])
      for (const method of ["Enter", "mouse"]) {
        const id = `${kind}-${mounting}`;
        const trigger = page.getByRole("button", {
          name: `Open ${id} actions`,
          exact: true,
        });
        await trigger.click();
        const item = page.getByRole("menuitem", {
          name: "Edit record",
          exact: true,
        });
        await item.waitFor();
        if (method === "Enter") {
          await item.focus();
          await page.keyboard.press("Enter");
        } else await item.click();
        const dialog = page.getByRole("dialog", { name: id, exact: true });
        await dialog.waitFor();
        await page.waitForTimeout(150);
        check(`${id} ${method} remains open`, await dialog.isVisible());
        const clicks = JSON.parse(
          await page.getByLabel(`${id} clicks`, { exact: true }).textContent(),
        );
        check(
          `${id} ${method} no synthetic close`,
          !clicks.includes("×"),
          clicks,
        );
        check(
          `${id} ${method} exactly one selection`,
          (await page
            .getByLabel(`${id} selections`, { exact: true })
            .textContent()) === (method === "Enter" ? "1" : "2"),
        );
        await page.keyboard.press("Escape");
        await dialog.waitFor({ state: "hidden" });
        await page.waitForTimeout(100);
        check(
          `${id} ${method} returns trigger`,
          await trigger.evaluate((n) => n === document.activeElement),
        );
      }
  const trigger = page.getByRole("button", {
    name: "Conversation actions",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  await focus("Archive");
  await page.keyboard.press("ArrowDown");
  await focus("Mute");
  await page.keyboard.press("ArrowRight");
  await focus("For 8 hours");
  await page.keyboard.press("End");
  await focus("Always");
  await page.keyboard.press("Home");
  await focus("For 8 hours");
  await page.keyboard.press("ArrowDown");
  await focus("For 1 week");
  await page.keyboard.press("ArrowLeft");
  await focus("Mute");
  await page.keyboard.press("ArrowRight");
  await focus("For 8 hours");
  await page.keyboard.press("Enter");
  await page
    .getByRole("menu", { name: "Conversation actions", exact: true })
    .waitFor({ state: "hidden" });
  check(
    "nested Enter selects once",
    (await page
      .getByLabel("Menu selections", { exact: true })
      .textContent()) === "1",
  );
  check(
    "nested selection close callback once",
    (await page
      .getByLabel("Menu close requests", { exact: true })
      .textContent()) === "1",
  );
  check(
    "nested selection focus return",
    await trigger.evaluate((n) => n === document.activeElement),
  );
  await page
    .getByRole("button", { name: "Toggle external menu", exact: true })
    .click();
  await page
    .getByRole("menu", { name: "Conversation actions", exact: true })
    .waitFor();
  await page.keyboard.press("Escape");
  await page
    .getByRole("menu", { name: "Conversation actions", exact: true })
    .waitFor({ state: "hidden" });
  check("controlled prop and Escape", true);
  await trigger.click();
  await page.getByRole("menuitem", { name: "Mute", exact: true }).hover();
  await page.getByRole("menuitem", { name: "Always", exact: true }).click();
  check(
    "pointer nested selection",
    (await page
      .getByLabel("Menu selections", { exact: true })
      .textContent()) === "2",
  );
  await trigger.click();
  await page
    .getByRole("heading", { name: "Public conformance fixture" })
    .click();
  await page
    .getByRole("menu", { name: "Conversation actions", exact: true })
    .waitFor({ state: "hidden" });
  check("outside menu dismissal", true);
  await page
    .getByRole("button", { name: "Conditional actions", exact: true })
    .click();
  await page.getByRole("menuitem", { name: "Unmount menu" }).focus();
  await page.keyboard.press("Enter");
  check(
    "conditional menu unmount",
    (await page
      .getByRole("button", { name: "Conditional actions", exact: true })
      .count()) === 0,
  );
  const zone = page.getByRole("combobox", { name: "Timezone", exact: true });
  for (const [q, want, value] of [
    ["new york", "America/New_York", "America/New_York"],
    ["+08:00", "Asia/Singapore UTC +8", "Asia/Singapore"],
  ]) {
    await zone.fill(q);
    const option = page.getByRole("option", { name: want, exact: true });
    await option.waitFor();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    check(
      `timezone ${q} payload`,
      (await page
        .getByLabel("Timezone value", { exact: true })
        .textContent()) === value,
    );
  }
  await zone.fill("");
  await zone.click();
  check(
    "empty search includes disabled",
    (await page
      .getByRole("option", { name: "London", exact: true })
      .getAttribute("aria-disabled")) === "true",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Add Tokyo" }).click();
  await zone.fill("Tokyo");
  await page.getByRole("option", { name: "Tokyo", exact: true }).click();
  check(
    "dynamic options selection",
    (await page.getByLabel("Timezone value", { exact: true }).textContent()) ===
      "Asia/Tokyo",
  );
  const ordinary = page.getByRole("combobox", {
    name: "Default search",
    exact: true,
  });
  await ordinary.fill("Sing");
  check(
    "default label filtering",
    await page
      .getByRole("option", { name: "Asia/Singapore UTC +8", exact: true })
      .isVisible(),
  );
  await page.keyboard.press("Escape");
  const assignee = page.getByRole("combobox", {
    name: "Assignee",
    exact: true,
  });
  await assignee.fill("Alex");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  check(
    "rich option plain search and payload",
    (await page.getByLabel("Assignee value", { exact: true }).textContent()) ===
      "alex",
  );
  const projects = page.getByRole("combobox", {
    name: "Projects",
    exact: true,
  });
  await projects.click();
  await page.getByRole("option", { name: "Alex Example", exact: true }).click();
  await page.getByRole("option", { name: "Sam Example", exact: true }).click();
  check(
    "multiple choice values",
    (await page.getByLabel("Projects value", { exact: true }).textContent()) ===
      "alex,sam",
  );
  await page.keyboard.press("Escape");
  const remote = page.getByRole("combobox", {
    name: "Remote tickets",
    exact: true,
  });
  await remote.fill("Sam");
  check(
    "controlled remote search",
    await page
      .getByRole("option", { name: "Sam Example", exact: true })
      .isVisible(),
  );
  await page.keyboard.press("Escape");
  for (const [button, text] of [
    ["Pending choices", "Loading…"],
    ["Failed choices", "Search failed"],
    ["Empty choices", "No matching tickets"],
  ]) {
    await page.getByRole("button", { name: button, exact: true }).click();
    await remote.click();
    check(
      button,
      await page
        .getByText(text, { exact: button !== "Failed choices" })
        .isVisible(),
    );
    await page.keyboard.press("Escape");
  }
  const filters = page.getByRole("button", {
    name: "Board filters",
    exact: true,
  });
  await filters.click();
  const popup = page.getByRole("dialog", {
    name: "Board filters",
    exact: true,
  });
  await popup.waitFor();
  await page.waitForTimeout(100);
  check(
    "Popup focuses content",
    await popup.evaluate((n) => n.contains(document.activeElement)),
  );
  await popup.getByRole("textbox", { name: "Filter name" }).fill("Title");
  await page.keyboard.press("Escape");
  await popup.waitFor({ state: "hidden" });
  check(
    "Popup Escape restores trigger",
    await filters.evaluate((n) => n === document.activeElement),
  );
  await filters.click();
  await page
    .getByRole("heading", { name: "Public conformance fixture" })
    .click();
  await popup.waitFor({ state: "hidden" });
  check("Popup outside dismissal", true);
  await page
    .getByRole("button", { name: "Open parent editor", exact: true })
    .click();
  const parent = page.getByRole("dialog", {
    name: "Parent editor",
    exact: true,
  });
  await parent
    .getByRole("button", { name: "Nested editor", exact: true })
    .click();
  const nested = page.getByRole("dialog", {
    name: "Nested editor",
    exact: true,
  });
  await nested.waitFor();
  await nested
    .getByRole("combobox", { name: "Nested assignee", exact: true })
    .click();
  await page.getByRole("option", { name: "Sam Example", exact: true }).click();
  check("choice portal leaves nested popup open", await nested.isVisible());
  await nested.getByRole("textbox", { name: "Nested note" }).focus();
  await page.keyboard.press("Escape");
  await nested.waitFor({ state: "hidden" });
  check("nested Escape keeps parent dialog", await parent.isVisible());
  await page.waitForFunction(
    () => document.activeElement?.textContent === "Nested editor",
  );
  await page.waitForTimeout(300);
  await page.keyboard.press("Escape");
  await parent.waitFor({ state: "hidden" });
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const tabs = page.getByRole("tablist", { name: "Every section" });
    await tabs.getByRole("tab", { name: "First section", exact: true }).click();
    await page.keyboard.press("End");
    await focus("Final long section", "tab");
    check(
      `tabs ${width} last reachable`,
      await page
        .getByRole("tabpanel", { name: "Final long section", exact: true })
        .isVisible(),
    );
    await page.keyboard.press("Home");
    await focus("First section", "tab");
    await page.keyboard.press("ArrowRight");
    await focus("Second long section", "tab");
    check(
      `tabs ${width} no invalid tablist child`,
      (await tabs.locator("button:not([role=tab])").count()) === 0,
    );
    await page.keyboard.press("Home");
    for (const name of [
      "First section",
      "Second long section",
      "Third long section",
      "Fourth long section",
      "Final long section",
    ]) {
      await focus(name, "tab");
      const detail = await tabs
        .getByRole("tab", { name, exact: true })
        .evaluate((node) => {
          const panel = document.getElementById(
            node.getAttribute("aria-controls"),
          );
          const rect = node.getBoundingClientRect(),
            strip = node.parentElement.getBoundingClientRect();
          return {
            name: node.textContent,
            selected: node.getAttribute("aria-selected"),
            panelText: panel?.textContent,
            panelName: panel?.getAttribute("aria-labelledby"),
            tabId: node.id,
            visible:
              rect.left >= strip.left - 1 && rect.right <= strip.right + 1,
          };
        });
      check(
        `tabs ${width} ${name} content and visible focus`,
        detail.selected === "true" &&
          !!detail.panelText?.trim() &&
          detail.panelName === detail.tabId &&
          detail.visible,
        detail,
      );
      await page.keyboard.press("ArrowRight");
    }
    await focus("First section", "tab");
    check(
      `tabs ${width} disabled skipped and wraps`,
      await tabs.getByRole("tab", { name: "Unavailable section" }).isDisabled(),
    );
  }
  check("zero runtime errors", errors.length === 0, errors);
  check(
    "zero API/external/socket attempts",
    blocked.length === 0 && sockets.length === 0,
    { blocked, sockets },
  );
  return { checks, errors, blocked, sockets };
}
