async (page) => {
  const baseline = page.url().includes("baseline=1");
  const views = [],
    checks = [],
    errors = [],
    consoleErrors = [],
    blocked = [],
    sockets = [];
  const origin = page.url().split("/").slice(0, 3).join("/");
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("websocket", (w) => sockets.push(w.url()));
  await page.route("**/*", (r) => {
    const q = r.request();
    if (
      !q.url().startsWith(origin + "/") ||
      ["fetch", "xhr"].includes(q.resourceType())
    ) {
      blocked.push({ url: q.url(), type: q.resourceType() });
      return r.abort();
    }
    return r.continue();
  });
  // Reload after instrumentation so the counters include the measured page boot.
  await page.reload();
  const settle = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)
          .map((a) => a.finished.catch(() => {})),
      );
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r)),
      );
    });
  };
  const check = (name, pass, evidence) =>
    checks.push({ name, pass: !!pass, evidence });
  const choose = async (scope, name, option) => {
    await scope.getByRole("combobox", { name, exact: true }).click();
    await page.getByRole("option", { name: option, exact: true }).click();
    await page
      .locator(".ant-select-dropdown:visible")
      .waitFor({ state: "hidden" });
    await settle();
  };
  const appearance = async (theme, mode) => {
    await page
      .getByRole("button", { name: "Preview appearance", exact: true })
      .click();
    const dialog = page.getByRole("dialog", {
      name: "Preview appearance",
      exact: true,
    });
    await choose(dialog, "Theme", theme);
    await choose(dialog, "Color mode", mode);
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    await settle();
  };
  const measure = async () =>
    page.evaluate(() => {
      const color = (c) => {
        const a = c.match(/[\d.]+/g)?.map(Number);
        if (!a || a.length < 3)
          throw new Error("Unsupported computed color " + c);
        return a;
      };
      const mix = (fg, bg, alpha) =>
        bg.map((v, i) => fg[i] * alpha + v * (1 - alpha));
      const lum = (c) =>
        c
          .slice(0, 3)
          .map((v) => {
            v /= 255;
            return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
          })
          .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
      const ratio = (a, b) =>
        (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
      const effective = (n) => {
        let bg = [255, 255, 255];
        const stack = [];
        for (let p = n; p; p = p.parentElement) stack.unshift(p);
        for (const p of stack) {
          const s = getComputedStyle(p);
          if (s.backgroundImage !== "none" || Number(s.opacity) !== 1)
            throw new Error("Ambiguous background ancestor " + p.tagName);
          const c = color(s.backgroundColor);
          bg = mix(c, bg, c[3] ?? 1);
        }
        return bg;
      };
      const bounds = (el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          right: r.right,
          bottom: r.bottom,
        };
      };
      const svg = document.querySelector(".usage-chart svg"),
        line = svg.querySelector("polyline"),
        fill = svg.querySelector("polygon");
      const stroke = color(getComputedStyle(line).stroke),
        bg = effective(svg),
        fc = color(getComputedStyle(fill).fill);
      const under = mix(
        fc,
        bg,
        Number(getComputedStyle(fill).opacity) * (fc[3] ?? 1),
      );
      const labels = [...document.querySelectorAll(".chart-labels > *")].map(
        (el) => {
          const s = getComputedStyle(el),
            svgText = el instanceof SVGGraphicsElement;
          if (!svgText)
            for (let p = el; p; p = p.parentElement)
              if (getComputedStyle(p).transform !== "none")
                throw new Error("Transformed HTML label");
          const scale = svgText
            ? Math.hypot(el.getScreenCTM().a, el.getScreenCTM().b)
            : 1;
          const fg = color(svgText ? s.fill : s.color),
            background = effective(el);
          const range = document.createRange();
          range.selectNodeContents(el);
          return {
            text: el.textContent,
            computed_font: parseFloat(s.fontSize),
            scale,
            actual_font: parseFloat(s.fontSize) * scale,
            text_bounds: bounds(range),
            bounds: bounds(el),
            contrast: ratio(mix(fg, background, fg[3] ?? 1), background),
          };
        },
      );
      const progress = [
        ...document.querySelectorAll(".allowance [role=progressbar]"),
      ].map((el) => {
        const inner = el.querySelector(".ant-progress-rail"),
          bar = el.querySelector(".ant-progress-track");
        const foreground = color(getComputedStyle(bar).backgroundColor),
          track = effective(inner);
        return {
          name: el.getAttribute("aria-label"),
          value: Number(el.getAttribute("aria-valuenow")),
          min: Number(el.getAttribute("aria-valuemin")),
          max: Number(el.getAttribute("aria-valuemax")),
          contrast: ratio(mix(foreground, track, foreground[3] ?? 1), track),
          foreground,
          track,
          cursor: getComputedStyle(el).cursor,
          bounds: bounds(el),
          bar_bounds: bounds(bar),
          track_bounds: bounds(inner),
        };
      });
      const dot = document.querySelector(".legend-dot"),
        dc = color(getComputedStyle(dot).backgroundColor),
        dbg = effective(dot.parentElement);
      const button = [...document.querySelectorAll("button")].find(
        (b) => b.textContent.trim() === "Plan details",
      );
      const bs = getComputedStyle(button),
        icon = button.querySelector("svg");
      const header = document.querySelector(".library-header"),
        hs = getComputedStyle(header);
      return {
        chart: {
          name: svg.getAttribute("aria-label"),
          bounds: bounds(svg),
          points: line.getAttribute("points"),
          stroke,
          background: bg,
          filled_background: under,
          fill_opacity: Number(getComputedStyle(fill).opacity),
          contrast_plain: ratio(mix(stroke, bg, stroke[3] ?? 1), bg),
          contrast_filled: ratio(mix(stroke, under, stroke[3] ?? 1), under),
        },
        labels,
        progress,
        legend_contrast: ratio(mix(dc, dbg, dc[3] ?? 1), dbg),
        overflow: document.documentElement.scrollWidth > innerWidth,
        header: {
          position: hs.position,
          top: hs.top,
          background: hs.backgroundColor,
          opacity: hs.opacity,
          inert: header.inert,
          bounds: bounds(header),
        },
        button: {
          cursor: bs.cursor,
          bounds: bounds(button),
          gap: bs.gap,
          padding: bs.padding,
          icon: bounds(icon),
        },
        axis_gap: Number.parseFloat(
          getComputedStyle(document.querySelector(".usage-chart")).gap,
        ),
        summary: document.querySelector(".activity-summary").textContent.trim(),
      };
    });
  const qualify = (key, m) => {
    check(
      key + " chart/plain",
      m.chart.contrast_plain >= 3,
      m.chart.contrast_plain,
    );
    check(
      key + " chart/filled",
      m.chart.contrast_filled >= 3,
      m.chart.contrast_filled,
    );
    check(key + " legend", m.legend_contrast >= 3, m.legend_contrast);
    check(
      key + " axis size",
      m.labels.length === 2 && m.labels.every((l) => l.actual_font >= 12),
      m.labels,
    );
    check(
      key + " axis contrast",
      m.labels.every((l) => l.contrast >= 4.5),
      m.labels,
    );
    check(
      key + " progress names/values",
      JSON.stringify(m.progress.map((p) => [p.name, p.value, p.min, p.max])) ===
        JSON.stringify([
          ["Team messages", 42, 0, 100],
          ["Shared storage", 32, 0, 100],
          ["Content views", 21, 0, 100],
        ]),
      m.progress,
    );
    check(
      key + " progress contrast",
      m.progress.length === 3 && m.progress.every((p) => p.contrast >= 3),
      m.progress,
    );
    check(
      key + " progress geometry",
      m.progress.length === 3 &&
        m.progress.every(
          (p) =>
            Math.abs(
              (p.bar_bounds.width / p.track_bounds.width) * 100 - p.value,
            ) < 0.1,
        ),
      m.progress,
    );
    check(
      key + " static progress cursor",
      m.progress.length === 3 &&
        m.progress.every((p) => p.cursor === "default"),
      m.progress.map((p) => p.cursor),
    );
    check(key + " no horizontal overflow", !m.overflow, m.overflow);
    check(
      key + " opaque sticky header",
      m.header.position === "sticky" &&
        m.header.top === "0px" &&
        m.header.opacity === "1" &&
        !m.header.background.startsWith("rgba"),
      m.header,
    );
    check(
      key + " axis gap",
      m.axis_gap === 8 &&
        Math.abs(m.labels[0].bounds.y - m.chart.bounds.bottom - 8) < 0.1,
      m.axis_gap,
    );
    check(
      key + " plan action geometry",
      m.button.cursor === "pointer" &&
        m.button.bounds.height >= 44 &&
        m.button.icon.width === 18 &&
        m.button.gap === "8px",
      m.button,
    );
  };
  for (const theme of baseline
    ? ["Mosaic"]
    : ["Mosaic", "Kooya Signature", "Canvas", "Client"])
    for (const mode of baseline ? ["Dark"] : ["Light", "Dark"]) {
      await appearance(theme, mode);
      for (const width of [320, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await settle();
        for (const period of baseline
          ? ["30 days"]
          : ["7 days", "30 days", "90 days"]) {
          await choose(page, "Usage period", period);
          await page.evaluate(() => window.scrollTo(0, 0));
          await settle();
          const key = `${theme}/${mode}/${width}/${period}`,
            m = await measure();
          qualify(key, m);
          views.push({ key, theme, mode, width, period, ...m });
          const file = `output/playwright/client-graphics-${baseline ? "red" : "final"}-${theme.replaceAll(" ", "-")}-${mode}-${width}-${period.replace(" ", "-")}.png`;
          await page.screenshot({ path: file, fullPage: true });
        }
      }
    }
  if (!baseline) {
    for (const mode of ["Light", "Dark"]) {
      await appearance("Mosaic", mode);
      for (const width of [375, 768]) {
        await page.setViewportSize({ width, height: 900 });
        await settle();
        const m = await measure(),
          key = `extra/${mode}/${width}`;
        qualify(key, m);
        views.push({ key, mode, width, ...m });
        await page.evaluate(() => window.scrollTo(0, 0));
        await settle();
        await page.screenshot({
          path: `output/playwright/client-graphics-final-extra-${mode}-${width}.png`,
          fullPage: true,
        });
      }
      await page.setViewportSize({ width: 320, height: 900 });
      await settle();
      const trigger = page.getByRole("button", {
        name: "Plan details",
        exact: true,
      });
      await trigger.focus();
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog", {
        name: "Your workspace plan",
        exact: true,
      });
      await dialog.waitFor({ state: "visible" });
      await settle();
      check(mode + " plan opens", await dialog.isVisible());
      await page.keyboard.press("Tab");
      check(
        mode + " dialog Tab contained",
        await dialog.evaluate((d) => d.contains(document.activeElement)),
      );
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      await settle();
      await page.waitForFunction(
        () => document.activeElement?.textContent.trim() === "Plan details",
      );
      check(
        mode + " plan Escape returns focus",
        await trigger.evaluate((b) => b === document.activeElement),
      );
      await page.getByRole("combobox", { name: "Usage period" }).focus();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.type("7");
      await page
        .getByRole("option", { name: "7 days", exact: true })
        .waitFor({ state: "visible" });
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
      await page
        .locator(".ant-select-dropdown:visible")
        .waitFor({ state: "hidden" });
      await settle();
      check(
        mode + " keyboard period",
        await page
          .getByRole("img", {
            name: "Sample workspace activity for 7 days",
            exact: true,
          })
          .isVisible(),
      );
      await page.keyboard.press("Tab");
      check(
        mode + " Tab reaches plan action past static progress",
        await trigger.evaluate((button) => button === document.activeElement),
      );
      const original = await page
        .locator(".allowance > div:first-child span")
        .first()
        .textContent();
      await page
        .locator(".allowance > div:first-child span")
        .first()
        .evaluate((el) => {
          el.textContent =
            "Team messages across all shared workspace conversations";
        });
      await settle();
      const long = await measure();
      check(
        mode + " synthetic long allowance wraps",
        !long.overflow && long.progress.every((p) => p.bounds.right <= 320),
        long.progress,
      );
      await page.evaluate(() => window.scrollTo(0, 0));
      await settle();
      await page.screenshot({
        path: `output/playwright/client-graphics-long-label-${mode}-320.png`,
        fullPage: true,
      });
      await page
        .locator(".allowance > div:first-child span")
        .first()
        .evaluate((el, text) => {
          el.textContent = text;
        }, original);
      await page.evaluate(() => window.scrollTo(0, 450));
      await settle();
      const scrolled = await measure();
      check(
        mode + " scroll-down hides library navigation clear of page content",
        scrolled.header.inert && scrolled.header.bounds.bottom <= 0,
        scrolled.header,
      );
      await page.screenshot({
        path: `output/playwright/client-graphics-scrolled-${mode}-320.png`,
      });
    }
    for (const mode of ["Light", "Dark"]) {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await appearance("Mosaic", mode);
      await choose(page, "Usage period", "90 days");
      await settle();
      const m = await measure();
      qualify("reduced/" + mode, m);
      views.push({ key: "reduced/" + mode, mode, width: 320, ...m });
      await page
        .getByRole("button", { name: "Plan details", exact: true })
        .click();
      const dialog = page.getByRole("dialog", {
        name: "Your workspace plan",
        exact: true,
      });
      await dialog.waitFor({ state: "visible" });
      await settle();
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      await settle();
      check(
        "reduced/" + mode + " plan return",
        await page
          .getByRole("button", { name: "Plan details", exact: true })
          .evaluate((b) => b === document.activeElement),
      );
    }
    const matrix = views.filter((v) => v.period);
    for (const period of ["7 days", "30 days", "90 days"]) {
      const expected = {
        "7 days": "3,120",
        "30 days": "12,480",
        "90 days": "34,944",
      }[period];
      check(
        period + " messages update",
        matrix
          .filter((v) => v.period === period)
          .every(
            (v) => v.summary === `${expected} team messages in this period`,
          ),
      );
    }
    check(
      "period points change",
      new Set(matrix.map((v) => v.chart.points)).size === 3,
    );
  }
  check("no page errors", errors.length === 0, errors);
  check("no console errors", consoleErrors.length === 0, consoleErrors);
  check("no API/external requests", blocked.length === 0, blocked);
  check("no WebSockets", sockets.length === 0, sockets);
  return {
    baseline,
    browser: await page.evaluate(() => navigator.userAgent),
    views,
    checks,
    errors,
    consoleErrors,
    blocked,
    sockets,
    passed: checks.filter((c) => c.pass).length,
    failed: checks.filter((c) => !c.pass),
  };
};
