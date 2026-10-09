async (page) => {
  const results = [],
    errors = [],
    blocked = [],
    sockets = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("websocket", (w) => sockets.push(w.url()));
  await page.route("**/*", (r) => {
    const q = r.request();
    if (
      !q.url().startsWith("http://127.0.0.1:5207/") ||
      ["fetch", "xhr"].includes(q.resourceType())
    ) {
      blocked.push(q.url());
      return r.abort();
    }
    return r.continue();
  });
  const labels = [
    "Cue input",
    "Cue affix input",
    "Cue text field",
    "Cue textarea",
    "Cue select",
    "Cue choice",
    "Cue date",
    "Cue number",
    "Cue checkbox",
    "Cue radio",
  ];
  for (const theme of ["mosaic", "signature", "canvas", "client"])
    for (const mode of ["light", "dark"]) {
      await page.goto(
        `http://127.0.0.1:5207/conformance-fixture.html?theme=${theme}&mode=${mode}`,
      );
      await page.setViewportSize({ width: 768, height: 1000 });
      for (const label of labels) {
        const input = page.getByLabel(label, { exact: true });
        const visual = input.locator(
          'xpath=ancestor-or-self::*[contains(concat(" ",normalize-space(@class)," ")," ku-input ") or contains(concat(" ",normalize-space(@class)," ")," ku-textarea ") or contains(concat(" ",normalize-space(@class)," ")," ku-select ") or contains(concat(" ",normalize-space(@class)," ")," ant-picker ") or contains(concat(" ",normalize-space(@class)," ")," ant-input-number ") or contains(concat(" ",normalize-space(@class)," ")," ant-checkbox ") or contains(concat(" ",normalize-space(@class)," ")," ant-radio ")][last()]',
        );
        for (const state of ["rest", "hover", "focus"]) {
          if (state === "rest") {
            await page
              .getByRole("heading", {
                name: "Public conformance fixture",
                exact: true,
              })
              .click();
            await page.mouse.move(0, 0);
          }
          if (state === "hover") await visual.hover();
          if (state === "focus") {
            await page.mouse.move(0, 0);
            await page.keyboard.press("Tab");
            await input.focus();
          }
          await page.waitForTimeout(200);
          const detail = await visual.evaluate((n) => {
            const c = document
              .createElement("canvas")
              .getContext("2d", { willReadFrequently: true });
            const rgba = (s) => {
              c.clearRect(0, 0, 1, 1);
              c.fillStyle = s;
              c.fillRect(0, 0, 1, 1);
              const a = c.getImageData(0, 0, 1, 1).data;
              return [a[0], a[1], a[2], a[3] / 255];
            };
            const blend = (a, b) =>
              a.slice(0, 3).map((x, i) => x * a[3] + b[i] * (1 - a[3]));
            const bg = (n) => {
              const chain = [];
              while (n) {
                chain.unshift(getComputedStyle(n).backgroundColor);
                n = n.parentElement;
              }
              return chain.reduce((b, s) => blend(rgba(s), b), [255, 255, 255]);
            };
            const lum = (x) =>
              x
                .map((v) => {
                  v /= 255;
                  return v <= 0.04045
                    ? v / 12.92
                    : ((v + 0.055) / 1.055) ** 2.4;
                })
                .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
            const ratio = (a, b) =>
              (Math.max(lum(a), lum(b)) + 0.05) /
              (Math.min(lum(a), lum(b)) + 0.05);
            const s = getComputedStyle(n),
              inside = bg(n),
              outside = bg(n.parentElement),
              border = blend(rgba(s.borderTopColor), inside);
            return {
              class: n.className,
              borderColor: s.borderTopColor,
              borderWidth: s.borderTopWidth,
              inside,
              outside,
              border,
              insideRatio: ratio(border, inside),
              outsideRatio: ratio(border, outside),
              fillRatio: ratio(inside, outside),
              outline: s.outline,
              outlineOutsideRatio: ratio(
                blend(rgba(s.outlineColor), outside),
                outside,
              ),
              rect: n.getBoundingClientRect().toJSON(),
            };
          });
          results.push({
            theme,
            mode,
            label,
            state,
            pass:
              parseFloat(detail.borderWidth) > 0 &&
              Math.min(detail.insideRatio, detail.outsideRatio) >= 3,
            ...detail,
          });
        }
      }
      await page
        .getByRole("heading", {
          name: "Public conformance fixture",
          exact: true,
        })
        .click();
      await page.mouse.move(0, 0);
      await page.screenshot({
        path: `output/playwright/control-cues-${theme}-${mode}.png`,
        fullPage: true,
      });
    }
  return { results, errors, blocked, sockets };
}
