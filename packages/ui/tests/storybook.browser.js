// Run against the built static Storybook on 5195; all stories use public exports.
async (page) => {
  const requests = [],
    errors = [],
    results = [];
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  const check = (name, pass, detail) => {
    results.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  await page.goto("http://127.0.0.1:5195/?path=/story/atoms-button--default");
  await page.locator("#storybook-preview-iframe").waitFor();
  const frame = page.frameLocator("#storybook-preview-iframe");
  await frame.getByRole("button", { name: "Save sample" }).waitFor();
  check(
    "manager and public button story",
    await frame.getByRole("button", { name: "Save sample" }).isVisible(),
  );
  await page.screenshot({
    path: "output/playwright/task2-storybook-manager.png",
    fullPage: true,
  });
  const families = [
    ["dashboard", "Studio overview"],
    ["collection", "Relationship collection"],
    ["detail", "Northstar Health"],
    ["form", "Create a workspace"],
    ["wizard", "Workspace setup"],
    ["settings", "Settings & branding"],
    ["board", "Project board"],
    ["inbox", "Team inbox"],
    ["feed", "Workspace feed"],
    ["content", "Content studio"],
    ["media", "Media library"],
    ["analytics", "Usage & allowances"],
    ["audit", "Audit history"],
    ["profile", "Team profile"],
    ["business", "Public business page"],
    ["portal", "Your client space"],
    ["tool", "Focused tool framing"],
  ];
  for (const [family, heading] of families) {
    await page.goto(
      "http://127.0.0.1:5195/iframe.html?id=templates-" +
        family +
        "--ready&viewMode=story",
    );
    await page.getByRole("heading", { name: heading, exact: true }).waitFor();
    check("ready story " + family, true);
  }
  await page.goto(
    "http://127.0.0.1:5195/iframe.html?id=templates-inbox--ready&viewMode=story",
  );
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Storybook local message");
  await page.getByRole("button", { name: "Send message" }).click();
  check(
    "interactive story",
    await page
      .getByRole("log")
      .getByText("Storybook local message", { exact: true })
      .isVisible(),
  );
  await page.goto(
    "http://127.0.0.1:5195/iframe.html?id=templates-media--empty&viewMode=story",
  );
  check(
    "empty story",
    await page.getByText("No media yet.", { exact: true }).isVisible(),
  );
  await page.goto(
    "http://127.0.0.1:5195/iframe.html?id=templates-dashboard--loading&viewMode=story",
  );
  check("loading story", await page.getByRole("status").isVisible());
  await page.goto(
    "http://127.0.0.1:5195/iframe.html?id=templates-dashboard--error&viewMode=story",
  );
  check("error story", await page.getByRole("alert").isVisible());
  await page.goto(
    "http://127.0.0.1:5195/iframe.html?id=atoms-button--disabled&viewMode=story",
  );
  check(
    "disabled story",
    await page.getByRole("button", { name: "Save sample" }).isDisabled(),
  );
  await page.goto(
    "http://127.0.0.1:5195/iframe.html?id=molecules-fields--error&viewMode=story",
  );
  check(
    "field error story",
    (await page
      .getByRole("textbox", { name: "Workspace name" })
      .getAttribute("aria-invalid")) === "true",
  );
  check("no runtime errors", errors.length === 0, errors);
  check(
    "no external network",
    requests.every(
      (r) =>
        r.url.startsWith("http://127.0.0.1:5195/") || r.url.startsWith("data:"),
    ),
    requests.filter(
      (r) =>
        !r.url.startsWith("http://127.0.0.1:5195/") &&
        !r.url.startsWith("data:"),
    ),
  );
  return { results, errors, requests };
}
