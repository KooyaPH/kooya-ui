async (page) => {
  const evidence = Date.now();
  const checks = [],
    requests = [],
    errors = [],
    sockets = [],
    cues = [];
  page.setDefaultTimeout(6000);
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("websocket", (w) => sockets.push(w.url()));
  const check = (name, pass, detail) => {
    checks.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  const route = async (r) => {
    await page.evaluate((r) => (location.hash = "/" + r), r);
    await page.waitForTimeout(80);
  };
  const select = async (name, value) => {
    await page.getByRole("combobox", { name, exact: true }).click();
    await page.getByRole("option", { name: value, exact: true }).click();
  };
  await page.goto("http://127.0.0.1:5211/");
  await page.evaluate(() => document.fonts.ready);
  for (const theme of ["Mosaic", "Kooya Signature", "Canvas", "Client"])
    for (const mode of ["Light", "Dark"]) {
      await page
        .getByRole("button", { name: "Preview appearance", exact: true })
        .click();
      await select("Theme", theme);
      await select("Color mode", mode);
      await page.getByRole("button", { name: "Close", exact: true }).click();
      for (const width of [1440, 320]) {
        await page.setViewportSize({ width, height: 900 });
        for (const r of ["overview", "components/fields", "templates/board"]) {
          await route(r);
          await page.evaluate(() =>
            window.scrollTo(
              0,
              Math.max(
                0,
                (document.documentElement.scrollHeight - innerHeight) / 2,
              ),
            ),
          );
          await page.waitForTimeout(100);
          const detail = await page.evaluate(() => ({
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            theme: document.querySelector(".ku-root").dataset.theme,
            mode: document.querySelector(".ku-root").dataset.mode,
          }));
          check(
            `${theme}/${mode}/${width}/${r}`,
            detail.scrollWidth <= width + 1,
            detail,
          );
          await page.screenshot({
            path: `output/playwright/${evidence}-layout-head-theme-${theme.replaceAll(" ", "-")}-${mode}-${width}-${r.replaceAll("/", "-")}.png`,
          });
        }
      }
      await route("components/fields");
      const measured = await page.evaluate(() => {
        const canvas = document
          .createElement("canvas")
          .getContext("2d", { willReadFrequently: true });
        const rgb = (s) => {
          canvas.clearRect(0, 0, 1, 1);
          canvas.fillStyle = s;
          canvas.fillRect(0, 0, 1, 1);
          return [...canvas.getImageData(0, 0, 1, 1).data];
        };
        const lum = (rgb) =>
          rgb
            .slice(0, 3)
            .map((v) => {
              v /= 255;
              return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
            })
            .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
        const surface = rgb(
          getComputedStyle(document.querySelector(".ku-root")).getPropertyValue(
            "--ku-surface",
          ),
        );
        const ratio = (color) => {
          const c = rgb(color),
            a = c[3] / 255,
            blended = c.slice(0, 3).map((x, i) => x * a + surface[i] * (1 - a));
          return (
            (Math.max(lum(blended), lum(surface)) + 0.05) /
            (Math.min(lum(blended), lum(surface)) + 0.05)
          );
        };
        return Array.from(
          document.querySelectorAll(
            "main .ant-picker-input input,main .ant-picker-suffix,main .ant-select-suffix",
          ),
        ).map((el) => {
          const placeholder = el instanceof HTMLInputElement;
          const color = getComputedStyle(
            el,
            placeholder ? "::placeholder" : null,
          ).color;
          return {
            cue: placeholder ? "Date placeholder" : el.className,
            color,
            ratio: ratio(color),
          };
        });
      });
      cues.push({ theme, mode, measured });
      check(
        `${theme}/${mode} field cues`,
        measured.length >= 3 &&
          measured.every(
            (x) => x.ratio >= (x.cue === "Date placeholder" ? 4.5 : 3),
          ),
        measured,
      );
    }
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const composition of [
    "Orbit · Dock",
    "Canvas · Studio",
    "Flow · Board",
  ]) {
    await page
      .getByRole("button", { name: "Preview appearance", exact: true })
      .click();
    await select("Composition", composition);
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await route("examples/crm");
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(200);
    check(
      composition,
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      {},
    );
    await page.screenshot({
      path: `output/playwright/${evidence}-layout-head-composition-${composition.split(" ")[0]}.png`,
    });
  }
  check(
    "static-only/error-free",
    errors.length === 0 &&
      sockets.length === 0 &&
      !requests.some(
        (r) =>
          !r.url.startsWith("http://127.0.0.1:5211/") ||
          ["fetch", "xhr"].includes(r.type),
      ),
    { errors, sockets, requests: requests.length },
  );
  return { checks, cues, errors, sockets, requests };
}
