// Run the built playground on 5193 with playwright-cli run-code --filename.
async (page) => {
  const results = [],
    requests = [],
    errors = [];
  page.setDefaultTimeout(8000);
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("websocket", (s) =>
    requests.push({ url: s.url(), type: "websocket" }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  const check = (name, pass, detail) => {
    results.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  const choose = async (label, option) => {
    await page.getByRole("combobox", { name: label, exact: true }).click();
    await page.getByRole("option", { name: option, exact: true }).click();
    await page
      .locator(".ant-select-dropdown:visible")
      .waitFor({ state: "hidden" });
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:5193");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("tab", { name: "Library", exact: true }).click();
  await page.getByRole("tab", { name: "Templates", exact: true }).click();
  const families = [
    ["Console · Dashboard", "Studio overview"],
    ["Console · Table & list collections", "Relationship collection"],
    ["Console · Record details", "Northstar Health"],
    ["Console · Forms", "Create a workspace"],
    ["Console · Wizards", "Workspace setup"],
    ["Console · Settings & branding", "Settings & branding"],
    ["Business · Boards", "Project board"],
    ["Business · Inbox & chat", "Team inbox"],
    ["Business · Feeds", "Workspace feed"],
    ["Business · CMS & content editing", "Content studio"],
    ["Business · Media galleries", "Media library"],
    ["Client · Analytics & usage", "Usage & allowances"],
    ["Console · Audit history", "Audit history"],
    ["Business · Profiles", "Team profile"],
    ["Business · Public business pages", "Public business page"],
    ["Client · Client portals", "Your client space"],
    ["Business · Meetings / games / maps framing", "Focused tool framing"],
  ];
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [option, heading] of families) {
      await choose("Template family", option);
      await page.getByRole("heading", { name: heading, exact: true }).waitFor();
      await page.waitForFunction(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
        {},
        { timeout: 2000 },
      );
      const layout = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        viewport: innerWidth,
      }));
      check(`${width} ${option}`, layout.scroll <= width + 1, layout);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await choose("Template family", "Console · Dashboard");
  await page.getByRole("checkbox", { name: "Review the launch brief" }).check();
  check(
    "dashboard checklist",
    await page
      .getByRole("status")
      .filter({ hasText: "Brief reviewed." })
      .isVisible(),
  );
  await choose("Template family", "Console · Table & list collections");
  await page
    .getByRole("searchbox", { name: "Search accounts" })
    .fill("Northstar");
  check(
    "collection filtering",
    (await page
      .getByRole("table", { name: "Relationships" })
      .getByRole("row")
      .count()) === 2,
  );
  await page.getByRole("button", { name: "List", exact: true }).click();
  await page
    .getByRole("button", { name: "Open Northstar Health", exact: true })
    .click();
  check(
    "collection list action",
    await page
      .getByRole("status")
      .filter({ hasText: "Selected Northstar Health" })
      .isVisible(),
  );
  await choose("Template family", "Console · Record details");
  await page.getByRole("button", { name: "Archive account" }).click();
  check(
    "record archive",
    await page.getByText("Archived locally", { exact: true }).isVisible(),
  );
  await choose("Template family", "Console · Forms");
  await page.getByRole("button", { name: "Create locally" }).click();
  check("form negative path", await page.getByRole("alert").isVisible());
  await page
    .getByRole("textbox", { name: "Workspace name", exact: true })
    .fill("River Studio");
  await page.getByRole("button", { name: "Create locally" }).click();
  check(
    "form save",
    await page
      .getByRole("status")
      .filter({ hasText: "Created River Studio locally." })
      .isVisible(),
  );
  await choose("Template family", "Console · Wizards");
  check(
    "wizard invalid next",
    await page.getByRole("button", { name: "Next", exact: true }).isDisabled(),
  );
  await page
    .getByRole("textbox", { name: "Workspace name", exact: true })
    .fill("River Studio");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  check(
    "wizard retains draft",
    (await page
      .getByRole("textbox", { name: "Workspace name", exact: true })
      .inputValue()) === "River Studio",
  );
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Finish", exact: true }).click();
  check(
    "wizard finish",
    await page
      .getByRole("status")
      .filter({ hasText: "Setup complete locally" })
      .isVisible(),
  );
  await choose("Template family", "Console · Settings & branding");
  await page.getByRole("textbox", { name: "Brand name" }).fill("River Studio");
  await page.getByRole("switch", { name: "Email summaries" }).click();
  await page.getByRole("button", { name: "Save settings locally" }).click();
  check(
    "branding preview",
    await page.getByRole("heading", { name: "River Studio" }).isVisible(),
  );
  check(
    "settings save",
    await page
      .getByRole("status")
      .filter({ hasText: "Saved River Studio" })
      .isVisible(),
  );
  await choose("Template family", "Business · Boards");
  await choose("Move Launch brief", "Done");
  check(
    "board move",
    await page
      .getByRole("region", { name: "Done", exact: true })
      .getByRole("heading", { name: "Launch brief" })
      .isVisible(),
  );
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({
    path: "output/playwright/task2-board-desktop.png",
    fullPage: true,
  });
  await choose("Template family", "Business · Inbox & chat");
  check(
    "empty send disabled",
    await page.getByRole("button", { name: "Send message" }).isDisabled(),
  );
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Ready for review");
  await page.getByRole("button", { name: "Send message" }).click();
  check(
    "message sent",
    await page
      .getByRole("log")
      .getByText("Ready for review", { exact: true })
      .isVisible(),
  );
  check(
    "sent draft cleared",
    (await page
      .getByRole("textbox", { name: "Message", exact: true })
      .inputValue()) === "",
  );
  await page.getByRole("button", { name: "Content team", exact: true }).click();
  check(
    "isolated conversation",
    !(await page
      .getByRole("log")
      .getByText("Ready for review", { exact: true })
      .count()),
  );
  await choose("Template family", "Business · Feeds");
  await page.getByRole("button", { name: "Like · 3" }).click();
  check(
    "feed reaction",
    (await page
      .getByRole("button", { name: "Liked · 4" })
      .getAttribute("aria-pressed")) === "true",
  );
  await page
    .getByRole("textbox", { name: "Write a post" })
    .fill("Local team update");
  await page.getByRole("button", { name: "Post locally" }).click();
  check(
    "feed posting",
    await page.getByText("Local team update", { exact: true }).isVisible(),
  );
  await choose("Template family", "Business · CMS & content editing");
  await page
    .getByRole("textbox", { name: "Page title", exact: true })
    .fill("New local story");
  await page.getByRole("tab", { name: "Preview", exact: true }).click();
  check(
    "CMS preview",
    await page.getByRole("heading", { name: "New local story" }).isVisible(),
  );
  await page.getByRole("button", { name: "Save draft locally" }).click();
  check(
    "CMS save",
    await page
      .getByRole("status")
      .filter({ hasText: "Draft saved locally." })
      .isVisible(),
  );
  await choose("Template family", "Business · Media galleries");
  await page.getByRole("button", { name: "Image", exact: true }).click();
  await page.getByRole("button", { name: "View Campaign artwork" }).click();
  await page.getByRole("dialog", { name: "Campaign artwork" }).waitFor();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({state:"hidden"});
  await page.waitForFunction(()=>document.activeElement?.textContent?.includes("View Campaign artwork"));
  check(
    "media focus restored",
    await page
      .getByRole("button", { name: "View Campaign artwork" })
      .evaluate((e) => e === document.activeElement),
  );
  await choose("Template family", "Client · Analytics & usage");
  await page.getByRole("button", { name: "This month", exact: true }).click();
  check(
    "analytics period",
    (await page
      .getByRole("list", { name: "Usage by period" })
      .getByRole("listitem")
      .count()) === 4,
  );
  await page.getByRole("button", { name: "Prepare report" }).click();
  check(
    "analytics report",
    await page
      .getByRole("status")
      .filter({ hasText: "Local report prepared for this month." })
      .isVisible(),
  );
  await choose("Template family", "Console · Audit history");
  await page.getByRole("button", { name: "Branding", exact: true }).click();
  check(
    "audit actor and filter",
    (await page
      .getByRole("list", { name: "Audit history" })
      .getByRole("listitem")
      .count()) === 1 &&
      (
        await page.getByRole("list", { name: "Audit history" }).textContent()
      ).includes("Maya Chen"),
  );
  await choose("Template family", "Business · Profiles");
  await page.getByRole("button", { name: "Edit profile" }).click();
  await page
    .getByRole("textbox", { name: "About Alex" })
    .fill("A revised local profile");
  await page.getByRole("button", { name: "Done editing" }).click();
  check(
    "profile edit",
    await page
      .getByText("A revised local profile", { exact: true })
      .isVisible(),
  );
  await choose("Template family", "Business · Public business pages");
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await page.getByRole("textbox", { name: "Your name" }).fill("Alex");
  await page.getByRole("button", { name: "Send local inquiry" }).click();
  check(
    "public contact",
    await page
      .getByRole("status")
      .filter({ hasText: "Thank you, Alex." })
      .isVisible(),
  );
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({state:"hidden"});
  await choose("Template family", "Client · Client portals");
  await page
    .getByRole("button", { name: "Approve brief", exact: true })
    .click();
  check(
    "portal approval",
    await page.getByText("Approved locally", { exact: true }).isVisible(),
  );
  await page.getByRole("button", { name: "View project guide" }).click();
  check(
    "portal resource",
    await page
      .getByText(
        "Review the brief, approve the artwork, and schedule your launch.",
        { exact: true },
      )
      .isVisible(),
  );
  await choose("Template family", "Business · Meetings / games / maps framing");
  for (const label of ["Meeting", "Game", "Map"]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await page.getByRole("button", { name: "Start local preview" }).click();
    check(
      "tool framing " + label,
      await page
        .getByRole("status")
        .filter({ hasText: "Preview running" })
        .isVisible(),
    );
  }
  await choose("Example state", "Loading");
  check(
    "loading state",
    await page.getByRole("status").filter({ hasText: "Loading" }).isVisible(),
  );
  await choose("Example state", "Error & retry");
  await page.getByRole("button", { name: "Try again" }).click();
  check("error retry", !(await page.getByRole("alert").count()));
  await choose("Template family", "Business · Media galleries");
  await choose("Example state", "Empty collections");
  check(
    "media empty",
    await page.getByText("No media yet.", { exact: true }).isVisible(),
  );
  await choose("Example state", "Ready");
  await page
    .getByRole("button", { name: "Workspace actions for AS", exact: true })
    .click();
  await page
    .getByRole("menuitem", { name: "Preview appearance", exact: true })
    .click();
  await choose("Color mode", "Dark");
  await choose("Interface font", "DM Sans (locally bundled)");
  check(
    "dark provider",
    (await page.locator(".ku-root").first().getAttribute("data-mode")) ===
      "dark",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({state:"hidden"});
  await page.setViewportSize({ width: 375, height: 900 });
  await choose("Template family", "Business · Boards");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "output/playwright/task2-board-dark-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("tab", { name: "Atomic catalog", exact: true }).click();
  for (const label of ["Foundations", "Atoms", "Molecules", "Organisms"]) {
    await page.getByRole("tablist", { name: "Atomic categories" }).getByRole("tab", { name: label, exact: true }).click();
    check(
      "atomic " + label,
      await page
        .getByRole("heading", { name: "Atomic component catalog" })
        .isVisible(),
    );
  }
  await page.getByRole("tab", { name: "Atoms", exact: true }).click();
  check(
    "enabled cursor",
    (await page
      .getByRole("button", { name: "Create sample" })
      .evaluate((e) => getComputedStyle(e).cursor)) === "pointer",
  );
  check(
    "disabled cursor",
    (await page
      .getByRole("button", { name: "Disabled", exact: true })
      .evaluate((e) => getComputedStyle(e).cursor)) === "not-allowed",
  );
  check(
    "busy cursor",
    (await page
      .getByRole("button", { name: "Busy", exact: true })
      .evaluate((e) => getComputedStyle(e).cursor)) === "progress",
  );
  check(
    "text cursor",
    (await page
      .getByRole("textbox", { name: "External input label" })
      .evaluate((e) => getComputedStyle(e).cursor)) === "text",
  );
  check(
    "static cursor",
    (await page
      .getByText("Published", { exact: true })
      .evaluate((e) => getComputedStyle(e).cursor)) === "default",
  );
  const target = await page
    .getByRole("button", { name: "Create sample" })
    .evaluate((e) => ({
      height: e.getBoundingClientRect().height,
      gap: getComputedStyle(e.querySelector(".ku-button-content")).gap,
    }));
  check(
    "atomic primary geometry",
    target.height >= 44 && target.gap === "8px",
    target,
  );
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({
    path: "output/playwright/task2-atomic-desktop.png",
    fullPage: true,
  });
  check("no runtime errors", errors.length === 0, errors);
  check(
    "local-only network",
    requests.every((r) => r.url.startsWith("http://127.0.0.1:5193/")),
    requests.filter((r) => !r.url.startsWith("http://127.0.0.1:5193/")),
  );
  check(
    "no API or realtime",
    !requests.some((r) => ["fetch", "xhr", "websocket"].includes(r.type)),
    requests.filter((r) => ["fetch", "xhr", "websocket"].includes(r.type)),
  );
  return { results, errors, requests };
}
