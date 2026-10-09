async (page) => {
  await page.goto("http://127.0.0.1:5207/conformance-fixture.html");
  const results = [];
  for (const kind of ["modal", "drawer"])
    for (const mounting of ["persistent", "conditional"]) {
      const id = `${kind}-${mounting}`;
      await page
        .getByRole("button", { name: `Open ${id} actions`, exact: true })
        .click();
      await page
        .getByRole("menuitem", { name: "Edit record", exact: true })
        .click();
      const dialog = page.getByRole("dialog", { name: id, exact: true });
      await dialog
        .getByRole("button", { name: `Finish elsewhere ${id}`, exact: true })
        .click();
      await dialog.waitFor({ state: "hidden" });
      await page.waitForTimeout(350);
      results.push({
        id,
        pass: await page
          .getByRole("button", { name: "Explicit destination", exact: true })
          .evaluate((n) => n === document.activeElement),
        active: await page.evaluate(() =>
          document.activeElement?.textContent?.slice(0, 80),
        ),
      });
    }
  return results;
}
