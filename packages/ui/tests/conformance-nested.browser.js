async (page) => {
  const results = [];
  const check = (name, pass, detail) => {
    results.push({ name, pass, detail });
    if (!pass) throw Error(JSON.stringify(results.at(-1)));
  };
  await page.goto("http://127.0.0.1:5207/conformance-fixture.html");
  await page
    .getByRole("button", { name: "Conversation actions", exact: true })
    .click();
  await page.waitForTimeout(100);
  await page.getByRole("menuitem", { name: "Mute", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(
    () => document.activeElement?.textContent === "For 8 hours",
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  check(
    "nested Escape returns connected trigger",
    await page
      .getByRole("button", { name: "Conversation actions", exact: true })
      .evaluate((n) => n === document.activeElement),
    {
      open: await page
        .getByRole("menu", { name: "Conversation actions", exact: true })
        .count(),
    },
  );
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
  const popup = page.getByRole("dialog", {
    name: "Nested editor",
    exact: true,
  });
  await popup
    .getByRole("button", { name: "Nested actions", exact: true })
    .click();
  await page.getByRole("menuitem", { name: "Mute", exact: true }).hover();
  await page.getByRole("menuitem", { name: "Always", exact: true }).click();
  check(
    "nested Menu pointer selection leaves Popup and Dialog open",
    (await popup.isVisible()) && (await parent.isVisible()),
  );
  await popup
    .getByRole("button", { name: "Nested actions", exact: true })
    .focus();
  await page.keyboard.press("ArrowDown");
  await page.getByRole("menuitem", { name: "Archive", exact: true }).focus();
  await page.keyboard.press("Enter");
  check(
    "nested Menu Enter leaves Popup and Dialog open",
    (await popup.isVisible()) && (await parent.isVisible()),
  );
  await popup.getByRole("textbox", { name: "Nested note" }).focus();
  await page.keyboard.press("Escape");
  await popup.waitFor({ state: "hidden" });
  await page.waitForTimeout(300);
  check(
    "nested Popup focus return",
    await parent
      .getByRole("button", { name: "Nested editor", exact: true })
      .evaluate((n) => n === document.activeElement),
  );
  await parent
    .getByRole("button", { name: "Nested editor", exact: true })
    .click();
  await popup.waitFor();
  await parent.getByRole("button", { name: "Close", exact: true }).click();
  await parent.waitFor({ state: "hidden" });
  check(
    "parent unmount removes nested popup",
    (await page.getByRole("dialog").count()) === 0,
  );
  return results;
}
