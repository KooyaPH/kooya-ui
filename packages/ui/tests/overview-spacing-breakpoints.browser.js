async (page) => {
  const checks = [];
  await page.goto(`http://127.0.0.1:5244/?layout=${Date.now()}#/overview`);
  await page.evaluate(() => document.fonts.ready);

  for (const [width, height, expectedMode] of [
    [1440, 900, "desktop"],
    [1101, 900, "desktop"],
    [1100, 900, "tablet"],
    [1024, 900, "tablet"],
    [768, 1024, "tablet"],
    [681, 844, "tablet"],
    [680, 844, "tablet"],
    [641, 844, "tablet"],
    [640, 844, "mobile"],
    [390, 844, "mobile"],
    [320, 720, "mobile"],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo(0, 0));
    const metrics = await page.evaluate(() => {
      const header = document.querySelector(".library-header");
      const hero = document.querySelector(".overview-hero-grid");
      const grid = document.querySelector(".overview-start-grid");
      const aside = document.querySelector(".overview-hero-aside");
      const tiles = document.querySelector(".overview-workspace-tiles");
      const footnote = document.querySelector(".overview-hero-footnote");
      const actions = [...document.querySelectorAll(".demo-actions a")];
      const cards = ["components", "templates", "examples"].map((name) =>
        document.querySelector(`[data-overview-tile="${name}"]`),
      );
      const target = actions[0]?.getBoundingClientRect();
      const componentCard = document.querySelector(
        '[data-overview-tile="components"]',
      );
      const motif = document.querySelector(".overview-control-motif");
      const spacingElements = [
        grid,
        hero,
        componentCard,
        aside,
        tiles,
        tiles?.firstElementChild,
        footnote,
        document.querySelector(".overview-hero-brand"),
        document.querySelector(".overview-hero-brand > span:nth-child(2)"),
        document.querySelector(".overview-hero-version"),
        document.querySelector(".overview-start-card-head"),
        actions[0],
        motif,
        motif?.firstElementChild,
        footnote?.firstElementChild,
      ];
      return {
        documentWidth: document.documentElement.scrollWidth,
        headerHeight: header?.getBoundingClientRect().height,
        heroColumns:
          hero && getComputedStyle(hero).gridTemplateColumns.split(" ").length,
        gridColumns: grid && getComputedStyle(grid).gridTemplateColumns,
        gridAreas: grid && getComputedStyle(grid).gridTemplateAreas,
        actionTarget: target && { width: target.width, height: target.height },
        spacing: spacingElements.map((element) => {
          if (!element) return null;
          const style = getComputedStyle(element);
          return {
            className: element.className,
            gap: style.gap,
            paddingBlock: `${style.paddingTop} ${style.paddingBottom}`,
            paddingInline: `${style.paddingLeft} ${style.paddingRight}`,
          };
        }),
        actionGap:
          actions.length > 1 &&
          actions[0].getBoundingClientRect().top ===
            actions[1].getBoundingClientRect().top
            ? actions[1].getBoundingClientRect().left -
              actions[0].getBoundingClientRect().right
            : null,
        cards: cards.map((card) => {
          const rect = card?.getBoundingClientRect();
          return rect && { top: rect.top, left: rect.left, width: rect.width };
        }),
        interactiveCursors: actions.map(
          (action) => getComputedStyle(action).cursor,
        ),
      };
    });
    const reorders =
      expectedMode === "desktop" ||
      (metrics.cards[0].top <= metrics.cards[1].top &&
        metrics.cards[1].top <= metrics.cards[2].top);
    const dedicatedComposition =
      expectedMode === "desktop"
        ? metrics.heroColumns === 2
        : expectedMode === "tablet"
          ? metrics.heroColumns === 1 &&
            metrics.gridAreas.includes('"components components"')
          : metrics.heroColumns === 1 &&
            metrics.gridAreas.includes('"components"');
    const spacingUsesFourPixelRhythm = metrics.spacing
      .filter(Boolean)
      .flatMap((item) => [item.gap, item.paddingBlock, item.paddingInline])
      .flatMap((value) => value.match(/\d+(?:\.\d+)?px/g) ?? [])
      .every((value) => Number.parseFloat(value) % 4 === 0);
    checks.push({
      width,
      expectedMode,
      noOverflow: metrics.documentWidth <= width + 1,
      minimumActionTarget: metrics.actionTarget?.height >= 44,
      mobileTabletReorder: reorders,
      dedicatedComposition,
      spacingUsesFourPixelRhythm,
      actionsUsePointer: metrics.interactiveCursors.every(
        (cursor) => cursor === "pointer",
      ),
      metrics,
    });
    await page.screenshot({
      path: `/tmp/kooya-ui-overview-${width}-review.png`,
    });
  }
  const failures = checks.filter(
    (check) =>
      !check.noOverflow ||
      !check.minimumActionTarget ||
      !check.mobileTabletReorder ||
      !check.dedicatedComposition ||
      !check.spacingUsesFourPixelRhythm ||
      !check.actionsUsePointer,
  );
  if (failures.length) throw Error(JSON.stringify({ checks, failures }));
  return checks;
}
