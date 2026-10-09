async (page) => {
  const checks = [];
  const requests = [];
  const consoleErrors = [];
  const sockets = [];
  page.on("request", (request) =>
    requests.push({ url: request.url(), type: request.resourceType() }),
  );
  page.on("websocket", (socket) => sockets.push(socket.url()));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  const check = (name, pass, detail) => checks.push({ name, pass, detail });

  await page.goto(
    `http://127.0.0.1:5244/?preview=${Date.now()}#/experience/transfer`,
  );
  await page.getByRole("button", { name: "Simulate transfer failure" }).click();
  const alert = page.getByRole("alert");
  await alert.waitFor({ state: "visible" });
  const message = await alert.innerText();
  check(
    "transfer error shows a safe public code and example HTTP status",
    message.includes("UI_DEMO_FAILED") &&
      message.includes("HTTP 503") &&
      !message.includes("FICTIONAL_TRANSFER_FAILED"),
    message,
  );
  const retry = page.getByRole("button", { name: "Try again" });
  const retryCursor = await retry.evaluate(
    (element) => getComputedStyle(element).cursor,
  );
  check(
    "retry action exposes a pointer cursor",
    retryCursor === "pointer",
    retryCursor,
  );

  for (const [width, height] of [
    [768, 1024],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `/tmp/kooya-ui-transfer-${width}-viewport.png`,
    });
    const copy = page.locator(".experience-guide p").nth(1);
    await copy.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      window.scrollTo(
        0,
        window.scrollY + rect.bottom - (window.innerHeight - 24),
      );
    });
    await page.waitForTimeout(50);
    const geometry = await page.evaluate(() => {
      const copy = document.querySelector(".experience-guide p:nth-of-type(2)");
      const task = document.querySelector(
        '[aria-label="Fictional transfer task"]',
      );
      if (!copy || !task) return { missingCopy: !copy, missingTask: !task };
      const text = copy.getBoundingClientRect();
      const status = task.getBoundingClientRect();
      return {
        viewport: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        overlap:
          text.left < status.right &&
          text.right > status.left &&
          text.top < status.bottom &&
          text.bottom > status.top,
        copy: {
          left: Math.round(text.left),
          top: Math.round(text.top),
          right: Math.round(text.right),
          bottom: Math.round(text.bottom),
        },
        task: {
          position: getComputedStyle(task).position,
          left: Math.round(status.left),
          top: Math.round(status.top),
          right: Math.round(status.right),
          bottom: Math.round(status.bottom),
        },
      };
    });
    check(
      `transfer task never obscures visible copy at ${width}px`,
      geometry.documentWidth <= width + 1 && !geometry.overlap,
      geometry,
    );
  }

  await retry.click();
  const transferReady = page
    .locator('p[role="status"]')
    .filter({ hasText: "Transfer: ready" });
  await transferReady.waitFor({ state: "visible" });
  check(
    "retry completes the fictional transfer and restores its action",
    await page
      .getByRole("button", { name: "Send file to browser" })
      .isVisible(),
    await transferReady.innerText(),
  );
  await page.goto(
    `http://127.0.0.1:5244/?preview=${Date.now()}#/experience/transfer`,
  );
  await page.getByRole("button", { name: "Start local transfer" }).click();
  await page
    .locator('p[role="status"]')
    .filter({ hasText: "Transfer: running" })
    .waitFor({ state: "visible" });
  await page
    .getByRole("link", { name: "Visit Overview while this runs" })
    .click();
  await page.waitForFunction(() =>
    document.activeElement?.matches("[data-route-heading]"),
  );
  const task = page.getByLabel("Fictional transfer task");
  const cancel = task.getByRole("button", { name: "Cancel transfer" });
  await cancel.focus();
  await page.keyboard.press("Enter");
  const cancelled = task.getByRole("link", {
    name: "Fictional transfer: cancelled",
  });
  await cancelled.waitFor({ state: "visible" });
  await page.keyboard.press("Tab");
  const focusAfterTab = await page.evaluate(() => {
    const element = document.activeElement;
    return `${element?.tagName}:${element?.textContent?.trim()}:${element?.getAttribute("href") ?? ""}`;
  });
  await page.waitForTimeout(150);
  const focusRemainsWithUser = await page.evaluate((before) => {
    const element = document.activeElement;
    return (
      `${element?.tagName}:${element?.textContent?.trim()}:${element?.getAttribute("href") ?? ""}` ===
      before
    );
  }, focusAfterTab);
  check(
    "cancelling does not steal focus after the user tabs away",
    focusRemainsWithUser,
    {
      focusAfterTab,
      actual: await page.evaluate(() => document.activeElement?.outerHTML),
    },
  );

  await page.goto(
    `http://127.0.0.1:5244/?preview=${Date.now()}#/experience/transfer`,
  );
  await page.getByRole("button", { name: "Start local transfer" }).click();
  const taskAgain = page.getByLabel("Fictional transfer task");
  const cancelAgain = taskAgain.getByRole("button", {
    name: "Cancel transfer",
  });
  await cancelAgain.focus();
  const ready = page
    .locator('p[role="status"]')
    .filter({ hasText: "Transfer: ready" });
  await ready.waitFor({ state: "visible" });
  const persistentAction = taskAgain.getByRole("button", {
    name: "Dismiss status",
  });
  check(
    "natural completion keeps keyboard focus on the persistent task action",
    await persistentAction.evaluate(
      (element) => document.activeElement === element,
    ),
    await page.evaluate(() => document.activeElement?.outerHTML),
  );
  await page.keyboard.press("Enter");
  await taskAgain.waitFor({ state: "hidden" });
  check(
    "dismissing a finished task returns focus to the page heading",
    await page.evaluate(
      () =>
        document.activeElement ===
        document.querySelector("[data-route-heading]"),
    ),
    await page.evaluate(() => document.activeElement?.outerHTML),
  );

  await page.goto(
    `http://127.0.0.1:5244/?preview=${Date.now()}#/experience/transfer`,
  );
  await page.getByRole("button", { name: "Simulate transfer failure" }).click();
  const failureTask = page.getByLabel("Fictional transfer task");
  const failureCancel = failureTask.getByRole("button", {
    name: "Cancel transfer",
  });
  await failureCancel.focus();
  await page.getByRole("alert").waitFor({ state: "visible" });
  const failureDismiss = failureTask.getByRole("button", {
    name: "Dismiss status",
  });
  check(
    "a focused task action stays mounted when the transfer fails",
    await failureDismiss.evaluate(
      (element) => document.activeElement === element,
    ),
    await page.evaluate(() => document.activeElement?.outerHTML),
  );
  await page.keyboard.press("Enter");
  await failureTask.waitFor({ state: "hidden" });
  check(
    "dismissing a failed task returns focus to the page heading",
    await page.evaluate(
      () =>
        document.activeElement ===
        document.querySelector("[data-route-heading]"),
    ),
    await page.evaluate(() => document.activeElement?.outerHTML),
  );

  check(
    "the preview makes no API, dynamic-data, or external requests across all transfer flows",
    requests.every(({ url, type }) => {
      const path = url.replace(/^https?:\/\/[^/]+/, "").split(/[?#]/, 1)[0];
      return (
        url.startsWith("http://127.0.0.1:5244/") &&
        !path.startsWith("/api/") &&
        !path.startsWith("/graphql") &&
        (["document", "script", "stylesheet", "font", "image"].includes(type) ||
          (path === "/favicon.svg" && type === "other"))
      );
    }),
    requests,
  );
  check(
    "the preview has no browser console errors across all transfer flows",
    consoleErrors.length === 0,
    consoleErrors,
  );
  check(
    "the preview opens no realtime sockets across all transfer flows",
    sockets.length === 0,
    sockets,
  );

  const failures = checks.filter((item) => !item.pass);
  if (failures.length) throw Error(JSON.stringify({ checks, failures }));
  return { checks };
}
