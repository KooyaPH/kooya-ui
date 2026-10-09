// Built static playground only. Run with playwright-cli run-code --filename at 5211.
async (page) => {
  const evidence = Date.now();
  const checks = [],
    requests = [],
    errors = [],
    warnings = [],
    sockets = [];
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text());
    if (e.type() === "warning") warnings.push(e.text());
  });
  page.on("websocket", (w) => sockets.push(w.url()));
  const check = (name, pass, detail) => {
    checks.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  await page.goto("http://127.0.0.1:5211/");
  await page.evaluate(() => document.fonts.ready);
  const routes = [
    "overview",
    "components",
    "components/button",
    "templates",
    "templates/dashboard",
    "examples",
    "examples/crm",
    "examples/pages",
    "examples/usage",
  ];
  for (const width of [1440, 1280, 768, 375, 360, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.evaluate((route) => {
        location.hash = "/" + route;
      }, route);
      await page.waitForTimeout(90);
      for (const position of ["top", "middle", "bottom"]) {
        await page.evaluate(
          (position) =>
            window.scrollTo(
              0,
              position === "top"
                ? 0
                : position === "middle"
                  ? (document.documentElement.scrollHeight - innerHeight) / 2
                  : document.documentElement.scrollHeight,
            ),
          position,
        );
        await page.waitForTimeout(220);
        const detail = await page.evaluate(() => {
          const header = document.querySelector(".library-header"),
            bento = document.querySelector(".ku-header-wrap");
          const r = header.getBoundingClientRect();
          const b = bento?.getBoundingClientRect();
          const headerVisible = scrollY <= 128;
          return {
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            y: scrollY,
            headerVisible,
            heading: document.querySelector("h1")?.textContent,
            header: {
              top: r.top,
              bottom: r.bottom,
              inert: header.inert,
              paint:
                document
                  .elementFromPoint(innerWidth / 2, 32)
                  ?.closest(".library-header") === header,
            },
            bento: b
              ? {
                  top: b.top,
                  bottom: b.bottom,
                  background: getComputedStyle(bento).backgroundColor,
                  maskTop:
                    document
                      .elementFromPoint(b.x + b.width / 2, b.top + 3)
                      ?.closest(".ku-header-wrap") === bento,
                }
              : null,
          };
        });
        check(
          `${width}/${route}/${position}`,
          detail.scrollWidth <= width + 1 &&
            detail.header.inert === !detail.headerVisible &&
            (detail.headerVisible
              ? detail.header.top === 0 && detail.header.paint
              : detail.header.bottom <= 0 && !detail.header.paint) &&
            (!detail.bento ||
              (Math.abs(detail.bento.top - (detail.headerVisible ? 64 : 0)) <
                1 &&
                detail.bento.background !== "rgba(0, 0, 0, 0)" &&
                detail.bento.maskTop)),
          detail,
        );
        await page.screenshot({
          path: `output/playwright/${evidence}-layout-head-final-${width}-${route.replaceAll("/", "-")}-${position}.png`,
        });
      }
    }
  }
  check("no runtime errors", errors.length === 0, errors);
  check(
    "local static only",
    !requests.some(
      (r) =>
        !r.url.startsWith("http://127.0.0.1:5211/") ||
        ["fetch", "xhr"].includes(r.type),
    ) && sockets.length === 0,
    { requests: requests.length, sockets },
  );
  return { checks, requests, errors, warnings, sockets };
};
