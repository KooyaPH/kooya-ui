// Serve the built playground at 5195; run with playwright-cli run-code --filename.
async (page) => {
  await page.goto("http://127.0.0.1:5195");
  await page.getByRole("tab", { name: "Library", exact: true }).click();
  await page.getByRole("tab", { name: "Templates", exact: true }).click();
  await page
    .getByRole("combobox", { name: "Template family", exact: true })
    .click();
  await page
    .getByRole("option", { name: "Client · Analytics & usage", exact: true })
    .click();
  await page
    .locator(".ant-select-dropdown:visible")
    .waitFor({ state: "hidden" });
  const results = [];
  for (const [period, points] of [
    [
      "This week",
      [
        ["Mon", 24],
        ["Tue", 38],
        ["Wed", 31],
        ["Thu", 52],
        ["Fri", 45],
      ],
    ],
    [
      "This month",
      [
        ["Week 1", 108],
        ["Week 2", 146],
        ["Week 3", 120],
        ["Week 4", 182],
      ],
    ],
  ]) {
    await page.getByRole("button", { name: period, exact: true }).click();
    for (const [name, value] of points) {
      const meter = page.getByRole("meter", { name, exact: true });
      const actual = await meter.getAttribute("value");
      if (actual !== String(value))
        throw Error(
          "Named meter value: " +
            JSON.stringify({ period, name, actual, value }),
        );
      results.push({ period, name, value: Number(actual) });
    }
    if ((await page.getByRole("meter").count()) !== points.length)
      throw Error("Unexpected meter count for " + period);
  }
  return results;
}
