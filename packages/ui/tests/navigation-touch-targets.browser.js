async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:5244/?touch-targets=${Date.now()}#/examples/crm`);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open navigation" }).click();

  const targets = await page.evaluate(() => {
    const drawer = document.querySelector(".ku-drawer--navigation");
    const measure = (element) => {
      const rect = element.getBoundingClientRect();
      return {
        label:
          element.getAttribute("aria-label") || element.textContent.trim(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };
    return [
      measure(drawer.querySelector(".ant-drawer-close")),
      measure(drawer.querySelector(".ku-group-toggle")),
    ];
  });

  const undersized = targets.filter(
    (target) => target.width < 44 || target.height < 44,
  );
  if (undersized.length) {
    throw new Error(`Navigation touch targets are under 44px: ${JSON.stringify(undersized)}`);
  }

  const group = page.locator(".ku-drawer--navigation .ku-group-toggle").first();
  const resting = await group.evaluate((element) => getComputedStyle(element).backgroundColor);
  await group.hover();
  await page.waitForTimeout(220);
  const hovered = await group.evaluate((element) => getComputedStyle(element).backgroundColor);
  const bounds = await group.boundingBox();
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(220);
  const active = await group.evaluate((element) => getComputedStyle(element).backgroundColor);
  await page.mouse.up();
  const expandedBefore = await group.getAttribute("aria-expanded");
  await group.click();
  const expandedAfter = await group.getAttribute("aria-expanded");

  if (resting === hovered || hovered === active || expandedBefore === expandedAfter) {
    throw new Error(
      `Navigation disclosure states are indistinguishable: ${JSON.stringify({ resting, hovered, active, expandedBefore, expandedAfter })}`,
    );
  }
  return { targets, resting, hovered, active, expandedBefore, expandedAfter };
}
