async (page) => {
  const results = [];
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(`http://127.0.0.1:5244/?preview=${Date.now()}#/overview`);
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height] of [
    [1440, 900],
    [768, 1024],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `/tmp/kooya-ui-overview-${width}-top.png` });
    const layout = await page.evaluate(() => {
      const grid = document.querySelector(".overview-start-grid");
      const cards = ["components", "templates", "examples"].map((name) =>
        document.querySelector(`[data-overview-tile="${name}"]`),
      );
      if (!grid || cards.some((card) => !card))
        return {
          missingGrid: !grid,
          missingCards: cards.some((card) => !card),
        };
      const cardRects = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };
      });
      return {
        documentWidth: document.documentElement.scrollWidth,
        columns: getComputedStyle(grid).gridTemplateColumns,
        areas: getComputedStyle(grid).gridTemplateAreas,
        cardRects,
      };
    });
    const tile = page.locator('[data-overview-tile="components"]');
    const cursor = (await tile.count())
      ? await tile.evaluate((element) => getComputedStyle(element).cursor)
      : "missing";
    let states = {};
    if (width === 1440 && (await tile.count())) {
      await tile.hover();
      await page.waitForTimeout(220);
      states.hoverTransform = await tile.evaluate(
        (element) => getComputedStyle(element).transform,
      );
      const box = await tile.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      states.active = await tile.evaluate((element) =>
        element.matches(":active"),
      );
      await page.mouse.move(4, 4);
      await page.mouse.up();
      states.selectedSection = await page
        .locator('.library-topnav a[aria-current="page"]')
        .getAttribute("href");
    }
    const orders = layout.cardRects?.map((rect) => rect.top) ?? [];
    results.push({
      viewport: width,
      noOverflow: layout.documentWidth <= width + 1,
      hasBentoGrid: !!layout.areas && !layout.areas.includes("none"),
      mobileReordersIntoStack:
        width > 640 || (orders[0] < orders[1] && orders[1] < orders[2]),
      actionCursor: cursor,
      states,
      layout,
    });
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.screenshot({ path: `/tmp/kooya-ui-overview-${width}.png` });
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`http://127.0.0.1:5244/?reduced=${Date.now()}#/overview`);
  await page.locator('.ku-root[data-reduced-motion="true"]').waitFor({
    state: "visible",
  });
  const reducedTile = page.locator('[data-overview-tile="components"]');
  const restingBackground = await reducedTile.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await reducedTile.hover();
  await page.waitForTimeout(20);
  const reducedHover = await reducedTile.evaluate((element) => ({
    transform: getComputedStyle(element).transform,
    transitionDuration: getComputedStyle(element).transitionDuration,
    background: getComputedStyle(element).backgroundColor,
  }));
  const reducedMotionKeepsNonMotionFeedback =
    reducedHover.transform === "none" &&
    reducedHover.transitionDuration === "0s" &&
    reducedHover.background !== restingBackground;
  results.push({
    viewport: "reduced-motion",
    reducedMotionKeepsNonMotionFeedback,
    restingBackground,
    reducedHover,
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });

  const failures = results.filter((result) => {
    if (result.viewport === "reduced-motion")
      return !result.reducedMotionKeepsNonMotionFeedback;
    return (
      !result.noOverflow ||
      !result.hasBentoGrid ||
      !result.mobileReordersIntoStack ||
      result.actionCursor !== "pointer" ||
      (result.viewport === 1440 &&
        (result.states.hoverTransform === "none" ||
          !result.states.active ||
          result.states.selectedSection !== "#/overview"))
    );
  });
  if (failures.length) throw Error(JSON.stringify({ results, failures }));
  return results;
}
