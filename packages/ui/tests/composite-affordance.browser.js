// Built public exports; CLI run-code accepts this function. Add ?red for the short cause probe.
async (page) => {
  const { red, probe, origin, run, cursorOnly, smoke } = await page.evaluate(
    () => {
      const p = new URL(location.href).searchParams;
      return {
        red: p.has("red"),
        probe: p.has("probe"),
        origin: location.origin,
        run: p.get("run"),
        cursorOnly: p.get("scope") === "cursor",
        smoke: p.has("smoke"),
      };
    },
  );
  const short = red || probe,
    artifact = run || (red ? "red-base" : "green-final"),
    results = [],
    errors = [],
    consoleErrors = [],
    requests = [],
    sockets = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") consoleErrors.push(e.text());
  });
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("websocket", (s) => sockets.push(s.url()));
  const check = (name, pass, detail) => results.push({ name, pass, detail });
  const settle = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r)),
      );
      await Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)
          .map((a) => a.finished.catch(() => {})),
      );
    });
  };
  const measure = async (input) =>
    input.evaluate((el) => {
      const outer = el.closest(".ku-select"),
        s = getComputedStyle(el),
        o = getComputedStyle(outer);
      const rgb = (color) =>
        color
          .match(/[\d.]+/g)
          .slice(0, 3)
          .map(Number);
      const lum = (color) =>
        rgb(color)
          .map((v) => {
            v /= 255;
            return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
          })
          .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
      const ratio = (a, b) =>
        (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
      const root = el.closest(".ku-root"),
        surface = getComputedStyle(root)
          .getPropertyValue("--ku-surface")
          .trim();
      // Resolve semantic CSS color syntax with a temporary element, never change focus.
      const swatch = document.createElement("span");
      swatch.style.color = surface;
      root.append(swatch);
      const resolved = getComputedStyle(swatch).color;
      swatch.style.color = getComputedStyle(root)
        .getPropertyValue("--ku-canvas")
        .trim();
      const canvas = getComputedStyle(swatch).color;
      swatch.style.color = o.getPropertyValue("--ku-focus").trim();
      const resolvedFocus = getComputedStyle(swatch).color;
      swatch.remove();
      return {
        active: el === document.activeElement,
        focusVisible: el.matches(":focus-visible"),
        inputOutline: s.outline,
        inputWidth: el.getBoundingClientRect().width,
        inputRect: el.getBoundingClientRect().toJSON(),
        outerRect: outer.getBoundingClientRect().toJSON(),
        outerOutline: o.outline,
        outlineWidth: parseFloat(o.outlineWidth),
        outlineOffset: o.outlineOffset,
        border: o.borderColor,
        focus: o.getPropertyValue("--ku-focus").trim(),
        surface: resolved,
        contrast: Math.min(
          ratio(o.outlineColor, resolved),
          ratio(o.outlineColor, canvas),
        ),
        canvas,
        resolvedFocus,
        outlineColor: o.outlineColor,
        content: outer.textContent,
        outlineStyle: s.outlineStyle,
        innerOutlineWidth: parseFloat(s.outlineWidth),
        scrollWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
      };
    });
  const assertFocus = async (name, input) => {
    const d = await measure(input);
    check(
      name,
      d.active &&
        d.focusVisible &&
        d.innerOutlineWidth === 0 &&
        d.outlineWidth === 3 &&
        d.outlineColor === d.resolvedFocus &&
        d.contrast >= 3 &&
        d.outerRect.x >= 0 &&
        d.outerRect.right <= d.viewport &&
        d.scrollWidth <= d.viewport,
      d,
    );
  };
  const cursorProbe = async (name, expected, increment) => {
    const text = page.getByText(name, { exact: true }),
      chip = text.locator(
        "xpath=ancestor::*[contains(concat(' ',normalize-space(@class),' '),' ku-chip ')][1]",
      );
    await chip.hover();
    const d = await chip.evaluate((el) => ({
      cursor: getComputedStyle(el).cursor,
      parentCursor: getComputedStyle(el.parentElement).cursor,
      rect: el.getBoundingClientRect().toJSON(),
      gap: getComputedStyle(el).gap,
      padding: getComputedStyle(el).padding,
      interactive: el.matches("button,a[href],[tabindex],[role=button]"),
      hit: document.elementFromPoint(
        el.getBoundingClientRect().x + el.getBoundingClientRect().width / 2,
        el.getBoundingClientRect().y + el.getBoundingClientRect().height / 2,
      )?.textContent,
    }));
    const before = Number(
        await page.getByLabel("Action changes").textContent(),
      ),
      box = await chip.boundingBox();
    await page.screenshot({
      path: `output/playwright/composite-affordance/${artifact}-cursor-${page.viewportSize().width}-${name.replaceAll(" ", "-")}.png`,
    });
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    const after = Number(await page.getByLabel("Action changes").textContent());
    check(
      `cursor/${page.viewportSize().width}/${name}`,
      d.cursor === expected && !d.interactive && after - before === increment,
      { ...d, before, after },
    );
  };
  for (const width of cursorOnly
    ? []
    : red
      ? [1440, 320]
      : short || smoke
        ? [1440]
        : [1440, 320, 375])
    for (const theme of short || smoke
      ? ["mosaic"]
      : ["mosaic", "signature", "canvas", "client"])
      for (const mode of short || smoke ? ["light"] : ["light", "dark"])
        for (const motion of short ? ["normal"] : ["normal", "reduced"])
          for (const selected of [false, true]) {
            const name = `${width}/${theme}/${mode}/${motion}/${selected ? "selected" : "empty"}`;
            await page.setViewportSize({ width, height: 1000 });
            await page.emulateMedia({
              reducedMotion: motion === "reduced" ? "reduce" : "no-preference",
            });
            await page.goto(
              `${origin}/composite-affordance-fixture.html?theme=${theme}&mode=${mode}${motion === "reduced" ? "&reduced" : ""}${selected ? "&selected" : ""}`,
            );
            await settle();
            const input = page.getByRole("combobox", {
              name: "Multiple choices",
              exact: true,
            });
            await page.keyboard.press("Tab");
            await settle();
            await assertFocus(`${name}/natural Tab`, input);
            await page.screenshot({
              path: `output/playwright/composite-affordance/${artifact}-${width}-${theme}-${mode}-${motion}-${selected ? "selected" : "empty"}.png`,
            });
            if (short) continue;
            await page.keyboard.type("Sam");
            await settle();
            await assertFocus(`${name}/typed search`, input);
            check(
              `${name}/first query`,
              (await input.inputValue()) === "Sam",
              await input.inputValue(),
            );
            await page.keyboard.press("ArrowDown");
            await page.keyboard.press("Enter");
            await settle();
            check(
              `${name}/selection once`,
              (await page.getByLabel("Choice changes").textContent()) ===
                `1:${selected ? "alex,sam" : "sam"}`,
              await page.getByLabel("Choice changes").textContent(),
            );
            await page.keyboard.press("Escape");
            // Ant keeps this controlled search query; delete the selected tag via its
            // rendered aria-hidden remove icon (secondary DOM evidence, not a public action).
            const field = input.locator(
              'xpath=ancestor::div[contains(concat(" ",normalize-space(@class)," ")," ku-select ")][1]',
            );
            await field
              .getByRole("img", { name: "close", includeHidden: true })
              .last()
              .click();
            await settle();
            check(
              `${name}/delete once`,
              (await page.getByLabel("Choice changes").textContent()) ===
                `2:${selected ? "alex" : ""}`,
              await page.getByLabel("Choice changes").textContent(),
            );
            await page.keyboard.press("Escape");
            await settle();
            await page
              .getByRole("button", { name: "Reset choices", exact: true })
              .click();
            await settle();
            check(
              `${name}/reset`,
              (await page.getByLabel("Choice changes").textContent()) ===
                "2:" && (await input.inputValue()) === "",
              await page.getByLabel("Choice changes").textContent(),
            );
            // Enter the anchored composition from real Tab; initial focus is observed before typing.
            await page.keyboard.press("Tab");
            const trigger = page.getByRole("button", {
              name: "Open choices",
              exact: true,
            });
            check(
              `${name}/trigger Tab`,
              await trigger.evaluate((el) => el === document.activeElement),
            );
            await page.keyboard.press("Enter");
            const dialog = page.getByRole("dialog", {
                name: "Popup choices",
                exact: true,
              }),
              search = dialog.getByRole("combobox", {
                name: "Popup search",
                exact: true,
              });
            await dialog.waitFor();
            await page.waitForFunction(
              () =>
                document.activeElement?.getAttribute("aria-label") ===
                "Popup search",
            );
            await settle();
            await assertFocus(`${name}/after-placement ref`, search);
            await page.screenshot({
              path: `output/playwright/composite-affordance/${artifact}-popup-${width}-${theme}-${mode}-${motion}-${selected ? "selected" : "empty"}.png`,
            });
            await page.keyboard.type("Sam");
            await settle();
            check(
              `${name}/popup first query`,
              (await search.inputValue()) === "Sam",
              await search.inputValue(),
            );
            await page.keyboard.press("Escape");
            await settle();
            await page.keyboard.press("Escape");
            await dialog.waitFor({ state: "hidden" });
            await page.waitForFunction(
              () => document.activeElement?.textContent === "Open choices",
            );
            await settle();
            check(
              `${name}/Escape return`,
              await trigger.evaluate((el) => el === document.activeElement),
            );
          }
  // Cursor and standalone focus regression coverage is independent of the theme matrix.
  for (const cursorWidth of red
    ? [1440, 320]
    : short || smoke
      ? [1440]
      : [1440, 320, 375]) {
    await page.setViewportSize({ width: cursorWidth, height: 1000 });
    await page.goto(`${origin}/composite-affordance-fixture.html`);
    await settle();
    for (const [name, expected, increment] of [
      ["Enabled count", "pointer", 1],
      ["Disabled count", "not-allowed", 0],
      ["Busy count", "progress", 0],
      ["Link count", "pointer", 1],
      ["Row status", "pointer", 1],
      ["Static status", "default", 0],
    ])
      await cursorProbe(name, expected, increment);
  }
  if (!short) {
    await page.goto(`${origin}/composite-affordance-fixture.html`);
    await settle();
    // Navigate from page start solely by Tab until each accessible target is reached.
    for (const [role, name] of [
      ["combobox", "Multiple choices"],
      ["button", "Reset choices"],
      ["button", "Open choices"],
      ["combobox", "Single choice"],
      ["combobox", "Single field"],
      ["combobox", "Raw select"],
      ["textbox", "Standalone text"],
      ["textbox", "Native text"],
      ["checkbox", "Selection control"],
      ["tab", "One"],
    ]) {
      const target = page.getByRole(role, { name, exact: true });
      let found = false;
      for (let i = 0; i < 8 && !found; i++) {
        await page.keyboard.press("Tab");
        found = await target.evaluate((el) => el === document.activeElement);
      }
      await settle();
      await page.screenshot({
        path: `output/playwright/composite-affordance/${artifact}-regression-${name.replaceAll(" ", "-")}.png`,
      });
      if (role === "combobox") await assertFocus(`regression/${name}`, target);
      else {
        const d = await target.evaluate((el) => ({
          active: el === document.activeElement,
          outline: getComputedStyle(el).outline,
          width: parseFloat(getComputedStyle(el).outlineWidth),
        }));
        check(`regression/${name}`, found && d.width >= 3, d);
      }
    }
    const disabled = page.getByRole("combobox", {
        name: "Disabled choices",
        exact: true,
      }),
      busy = page.getByRole("combobox", { name: "Busy choices", exact: true });
    check(
      "disabled/busy semantics",
      (await disabled.isDisabled()) &&
        (await busy.getAttribute("aria-busy")) === "true",
      {
        disabled: await disabled.isDisabled(),
        busy: await busy.evaluate((el) => el.closest(".ku-select").outerHTML),
      },
    );
  }
  const forbidden = requests.filter(
    (r) => ["fetch", "xhr"].includes(r.type) || !r.url.startsWith(origin + "/"),
  );
  check(
    "bounded runtime/network",
    errors.length === 0 &&
      consoleErrors.length === 0 &&
      sockets.length === 0 &&
      forbidden.length === 0,
    {
      errors,
      consoleErrors,
      sockets,
      forbidden,
      staticRequests: requests.length,
    },
  );
  return {
    results,
    cases: cursorOnly ? 0 : red ? 4 : short ? 2 : smoke ? 4 : 96,
    passed: results.filter((r) => r.pass).length,
    failed: results.filter((r) => !r.pass),
    errors,
    consoleErrors,
    requests,
    sockets,
  };
}
