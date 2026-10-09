// Run against the built public-export fixture; URL alone may be adapted.
async (page) => {
  const focusedOnly = page.url().includes("menu-dialog-only");
  const results = [],
    errors = [],
    requests = [],
    sockets = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) =>
    requests.push({ url: r.url(), type: r.resourceType() }),
  );
  page.on("websocket", (w) => sockets.push(w.url()));
  const check = (name, pass, detail) => {
    results.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  const clickVisible = async (locator) => {
    const box = await locator.boundingBox();
    if(!box || box.y<0 || box.y+box.height>800) throw Error('Trigger must be visible before pointer entry');
    await page.mouse.click(box.x+box.width/2,box.y+box.height/2);
  };
  const settle = async () =>
    page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      await Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)
          .map((a) => a.finished.catch(() => {})),
      );
    });
  await page.setViewportSize({ width: 320, height: 800 });
  for (const motion of ["normal", "reduced"]) {
    await page.goto(
      "http://127.0.0.1:5215/accessible-focus-fixture.html" +
        (motion === "reduced" ? "?reduced" : ""),
    );
    await settle();
    if (!focusedOnly) for (const at of ["top", "middle", "end"])
      for (const kind of [
        "single",
        "multiple",
        "native",
        "public",
        "disabled",
        "disabled-choice",
        "nonfocusable",
        "null",
      ]) {
        const name = kind + " " + at,
          trigger = page.getByRole("button", { name, exact: true });
        await trigger.evaluate((el) => {
          window.scrollTo(
            0,
            el.getBoundingClientRect().top + window.scrollY - 640,
          );
        });
        await settle();
        const before = await page.evaluate(() => scrollY);
        await clickVisible(trigger);
        const dialog = page.getByRole("dialog", { name, exact: true });
        await dialog.waitFor();
        await page.waitForFunction((name) => {
          const el = [...document.querySelectorAll("[role=dialog]")].find(
            (el) => el.getAttribute("aria-label") === name,
          );
          return el?.contains(document.activeElement);
        }, name);
        await settle();
        const focus = dialog.getByRole(
          kind === "single" || kind === "multiple" ? "combobox" : "textbox",
        );
        const detail = await dialog.evaluate((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.x,
            y: r.y,
            right: r.right,
            bottom: r.bottom,
            scroll: scrollY,
            active: document.activeElement?.outerHTML,
            dialogFocused: el === document.activeElement,
          };
        });
        const fallback = ["disabled", "disabled-choice", "nonfocusable", "null"].includes(kind);
        check(
          `${motion}/${name}/entry`,
          Math.abs(detail.scroll - before) <= 1 &&
            detail.x >= -1 &&
            detail.right <= 321 &&
            detail.y >= 0 &&
            detail.bottom <= 801 &&
            (fallback
              ? detail.dialogFocused
              : await focus.evaluate((el) => el === document.activeElement)),
          { before, ...detail },
        );
        if (!fallback) {
          await page.keyboard.type("Sam");
          check(
            `${motion}/${name}/first query`,
            (await focus.inputValue()) === "Sam",
            await focus.inputValue(),
          );
          if (kind === "single" || kind === "multiple") {
            await page.keyboard.press("ArrowDown");
            await settle();
            const list = page.getByRole("listbox");
            await list.waitFor();
            const bounds = await page
              .getByRole("option", { name: "Sam", exact: true })
              .boundingBox();
            check(
              `${motion}/${name}/choices visible`,
              !!bounds && bounds.y >= 0 && bounds.y + bounds.height <= 800,
              bounds,
            );
            await page.keyboard.press("Enter");
            check(
              `${motion}/${name}/selection once`,
              (await page.getByLabel(name + " selections").textContent()) ===
                "1:sam",
              await page.getByLabel(name + " selections").textContent(),
            );
            if ((await focus.getAttribute("aria-expanded")) === "true")
              await page.keyboard.press("Escape");
            check(
              `${motion}/${name}/layered choice Escape`,
              await dialog.isVisible(),
              null,
            );
          }
        }
        await page.screenshot({
          path: `output/playwright/accessible-focus-${motion}-${kind}-${at}.png`,
        });
        await page.keyboard.press("Escape");
        await page
          .locator(`[role=dialog][aria-label="${name}"]`)
          .waitFor({ state: "detached" });
        await settle();
        check(
          `${motion}/${name}/return`,
          await trigger.evaluate((el) => el === document.activeElement),
          null,
        );
        await clickVisible(trigger);
        await dialog.waitFor();
        await page.waitForFunction((name) => {
          const el = [...document.querySelectorAll("[role=dialog]")].find(
            (el) => el.getAttribute("aria-label") === name,
          );
          return el?.contains(document.activeElement);
        }, name);
        await settle();
        check(
          `${motion}/${name}/reopen`,
          fallback
            ? await dialog.evaluate((el) => el === document.activeElement)
            : await focus.evaluate((el) => el === document.activeElement),
          null,
        );
        await page.keyboard.press("Escape");
        await page
          .locator(`[role=dialog][aria-label="${name}"]`)
          .waitFor({ state: "detached" });
      }
    // Menu to dialog focus retains the newer destination after Popup unmount.
    await page.getByRole("button", { name: "single end", exact: true }).click();
    const popup = page.getByRole("dialog", { name: "single end", exact: true });
    await settle();
    await popup
      .getByRole("button", { name: "Search actions", exact: true })
      .click();
    await page
      .getByRole("menuitem", { name: "Open editor", exact: true })
      .click();
    const editor = page.getByRole("dialog", {
      name: "Search editor",
      exact: true,
    });
    await editor.waitFor();
    await settle();
    // Observe the public Dialog's natural destination before any interaction in it.
    const destination = await editor.evaluate((el) => ({
      inside: el.contains(document.activeElement),
      active: document.activeElement?.outerHTML,
      dialogFocused: el === document.activeElement,
    }));
    check(
      `${motion}/menu to dialog natural focus`,
      destination.inside,
      destination,
    );
    await popup.waitFor({ state: "detached" });
    await page
      .getByRole("menuitem", { name: "Open editor", exact: true })
      .waitFor({ state: "hidden" });
    await settle();
    check(
      `${motion}/no late popup restoration`,
      await editor.evaluate((el) => el.contains(document.activeElement)),
      await page.evaluate(() => document.activeElement?.outerHTML),
    );
    check(
      `${motion}/menu selection once and editor remains open`,
      (await editor.isVisible()) &&
        (await page
          .getByLabel("single end editor selections")
          .textContent()) === "1",
      await page.getByLabel("single end editor selections").textContent(),
    );
    await page.screenshot({
      path: `output/playwright/accessible-fix1-${await page.evaluate(() => location.port)}-${motion}-natural.png`,
    });
    // The default dialog container/close control is valid; reach the input by Tab.
    const editorText = editor.getByRole("textbox", { name: "Editor text" });
    let tabs = 0;
    while (
      !(await editorText.evaluate((el) => el === document.activeElement)) &&
      tabs < 8
    ) {
      await page.keyboard.press("Tab");
      tabs += 1;
    }
    check(
      `${motion}/editor keyboard reachable`,
      await editorText.evaluate((el) => el === document.activeElement),
      { tabs },
    );
    await page.keyboard.type("Natural transition");
    check(
      `${motion}/editor keyboard usable`,
      (await editorText.inputValue()) === "Natural transition",
      await editorText.inputValue(),
    );
    await page.keyboard.press("Escape");
    await editor.waitFor({ state: "hidden" });
    await settle();
    check(
      `${motion}/editor Escape closes layer`,
      !(await editor.isVisible()),
      null,
    );
    // Reopen the surviving outer trigger and verify its ordinary close return.
    const outerTrigger = page.getByRole("button", {
      name: "single end",
      exact: true,
    });
    await outerTrigger.click();
    await popup.waitFor();
    await settle();
    await popup
      .getByRole("button", { name: "Search actions", exact: true })
      .click();
    await page
      .getByRole("menuitem", { name: "Open editor", exact: true })
      .waitFor();
    await page.waitForFunction(() =>
      [...document.querySelectorAll("[role=menu]")].some((el) =>
        el.contains(document.activeElement),
      ),
    );
    await settle();
    await page.keyboard.press("Escape");
    await page
      .getByRole("menuitem", { name: "Open editor", exact: true })
      .waitFor({ state: "hidden" });
    check(
      `${motion}/menu Escape preserves popup`,
      await popup.isVisible(),
      null,
    );
    await page.keyboard.press("Escape");
    await popup.waitFor({ state: "detached" });
    await settle();
    check(
      `${motion}/popup close returns outer trigger`,
      await outerTrigger.evaluate((el) => el === document.activeElement),
      null,
    );
    if (focusedOnly) continue;
    await page.getByRole("button", { name: "single top", exact: true }).click();
    await settle();
    await page
      .getByRole("button", { name: "Toggle panels", exact: true })
      .click();
    await settle();
    check(
      `${motion}/unmount`,
      (await page.getByRole("dialog").count()) === 0,
      null,
    );
  }
  if (!focusedOnly) {
    await page.goto(
      "http://127.0.0.1:5215/accessible-focus-fixture.html?standalone",
    );
    await settle();
    check(
      "standalone autoFocus",
      await page
        .getByRole("combobox", { name: "Standalone", exact: true })
        .evaluate((el) => el === document.activeElement),
      null,
    );
  }
  check("no browser errors", !errors.length, errors);
  check(
    "local static only",
    !sockets.length &&
      !requests.some(
        (r) =>
          !r.url.startsWith("http://127.0.0.1:5215/") ||
          ["fetch", "xhr"].includes(r.type),
      ),
    { requests, sockets },
  );
  return { results, errors, requests, sockets };
}
