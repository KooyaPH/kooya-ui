async (page) => {
  const checks = [];
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://127.0.0.1:5244/?preview=${Date.now()}#/overview`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const maxScroll = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );
  for (const [name, fraction] of [
    ["top", 0],
    ["middle", 0.5],
    ["bottom", 1],
  ]) {
    const scrollY = Math.round(maxScroll * fraction);
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(220);
    const layout = await page.evaluate(() => {
      const header = document.querySelector(".library-header");
      const main = document.querySelector(".library-main");
      const h = header.getBoundingClientRect();
      const m = main.getBoundingClientRect();
      const inHeader = document
        .elementFromPoint(innerWidth / 2, 32)
        ?.closest(".library-header");
      return {
        viewport: `${innerWidth}x${innerHeight}`,
        scrollY,
        pageHeight: document.documentElement.scrollHeight,
        documentWidth: document.documentElement.scrollWidth,
        header: {
          top: Math.round(h.top),
          bottom: Math.round(h.bottom),
          position: getComputedStyle(header).position,
          background: getComputedStyle(header).backgroundColor,
          zIndex: getComputedStyle(header).zIndex,
          inert: header.inert,
          paintsOverContent: inHeader === header,
        },
        main: {
          top: Math.round(m.top),
          bottom: Math.round(m.bottom),
        },
      };
    });
    const shouldShowHeader = name === "top" || layout.scrollY < 128;
    if (
      shouldShowHeader !== !layout.header.inert ||
      shouldShowHeader !== (layout.header.top === 0) ||
      shouldShowHeader !== layout.header.paintsOverContent
    ) {
      throw Error(
        `overview header overlaps scrolled content (${name}): ${JSON.stringify(layout.header)}`,
      );
    }
    checks.push({ name, ...layout });
    await page.screenshot({
      path: `/tmp/kooya-ui-overview-${name}-scroll.png`,
    });
  }
  return checks;
}
