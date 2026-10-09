// Requires the local-only MV3 zoom extension and viewport:null; no emulated scale.
async (page) => {
  const evidence = Date.now();
  const checks = [],
    requests = [],
    errors = [],
    sockets = [];
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("websocket", (w) => sockets.push(w.url()));
  const context = page.context();
  let worker = context.serviceWorkers()[0];
  if (!worker)
    worker = await context.waitForEvent("serviceworker", { timeout: 10000 });
  const proof = await worker.evaluate(async () => {
    const tabs = await chrome.tabs.query({ url: ["http://127.0.0.1:5211/*"] });
    if (tabs.length !== 1) throw Error("One owned tab required");
    const id = tabs[0].id;
    await chrome.tabs.setZoomSettings(id, {
      mode: "automatic",
      scope: "per-tab",
    });
    await chrome.tabs.setZoom(id, 2);
    return { zoom: await chrome.tabs.getZoom(id), url: tabs[0].url };
  });
  if (proof.zoom !== 2) throw Error("Native browser zoom did not reach 2");
  for (const route of [
    "overview",
    "components/fields",
    "templates/dashboard",
    "examples/crm",
  ]) {
    await page.goto("http://127.0.0.1:5211/#/" + route);
    await page.evaluate(() => document.fonts.ready);
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
      await page.waitForTimeout(80);
      const geometry = await page.evaluate(() => ({
        width: innerWidth,
        height: innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        dpr: devicePixelRatio,
      }));
      checks.push({ route, position, ...geometry });
      if (geometry.scrollWidth > geometry.width + 1)
        throw Error(JSON.stringify(checks.at(-1)));
      // Playwright's screenshot clip can be incorrect at native browser zoom.
      // Capture the compositor viewport without applying an emulated scale.
      const cdp = await page.context().newCDPSession(page);
      const shot = await cdp.send("Page.captureScreenshot", {
        format: "png", fromSurface: true, captureBeyondViewport: false,
      });
      await cdp.detach();
      const downloading = page.waitForEvent("download");
      await page.evaluate(data => {
        const link = document.createElement("a");
        link.href = "data:image/png;base64," + data;
        link.download = "zoom-native.png";
        document.body.append(link); link.click(); link.remove();
      }, shot.data);
      const download = await downloading;
      await download.saveAs(`output/playwright/${evidence}-layout-head-zoom200-native-${route.replaceAll("/", "-")}-${position}.png`);
    }
  }
  await page
    .getByRole("button", { name: "Preview appearance", exact: true })
    .click();
  await page.getByRole("combobox", { name: "Color mode", exact: true }).click();
  await page.getByRole("option", { name: "Dark", exact: true }).click();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  if (
    errors.length ||
    sockets.length ||
    requests.some(
      (r) =>
        !r.url.startsWith("http://127.0.0.1:5211/") ||
        ["fetch", "xhr"].includes(r.type),
    )
  )
    throw Error(JSON.stringify({ errors, sockets, requests }));
  return { proof, checks, requests, errors, sockets };
}
