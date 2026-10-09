async (page) => {
  const checks = [];
  const requests = [];
  const sockets = [];
  page.on("request", (request) => requests.push(request.url()));
  page.on("websocket", (socket) => sockets.push(socket.url()));
  const check = (name, pass, detail) => checks.push({ name, pass, detail });

  await page.goto(
    `http://127.0.0.1:5244/?cache=${Date.now()}#/experience/cache`,
  );
  await page.locator('[aria-busy="true"]').waitFor({ state: "visible" });
  const brief = page.getByRole("heading", {
    name: "Studio A fictional brief",
  });
  await brief.waitFor({ state: "visible" });
  const note = page.getByRole("textbox", {
    name: "Review note (kept during refresh)",
  });
  await note.fill("Keep this draft while the card refreshes");
  await page.getByRole("button", { name: "Invalidate brief" }).click();
  const updating = page.locator('[aria-busy="true"]');
  await updating.waitFor({ state: "visible" });
  check(
    "ordinary refresh keeps cached content and the entered draft mounted",
    (await brief.isVisible()) &&
      (await note.inputValue()) === "Keep this draft while the card refreshes",
    { heading: await brief.innerText(), note: await note.inputValue() },
  );
  await updating.waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "Leave brief" }).click();
  await page.getByText("Brief closed.").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Revisit brief" }).click();
  check(
    "a warm revisit paints the cached brief immediately",
    await brief.isVisible(),
    await brief.innerText(),
  );

  await page.getByRole("tab", { name: "Intent preload" }).click();
  const open = page.getByRole("button", { name: "Open fictional brief" });
  const reads = page.locator('p[role="status"]');
  await open.hover();
  await page.mouse.move(4, 4);
  await page.waitForTimeout(250);
  check(
    "leaving before the intent delay cancels pending preloading",
    (await reads.innerText()).includes("count: 0"),
    await reads.innerText(),
  );

  await page.getByRole("button", { name: "Data saver: off" }).click();
  await open.hover();
  await page.waitForTimeout(250);
  check(
    "data saver suppresses speculative reads",
    (await reads.innerText()).includes("count: 0"),
    await reads.innerText(),
  );

  await page.getByRole("button", { name: "Data saver: on" }).click();
  await open.hover();
  await page.waitForTimeout(200);
  check(
    "hover intent preloads one local read",
    (await reads.innerText()).includes("count: 1"),
    await reads.innerText(),
  );
  await open.click();
  await page.getByText("Studio A fictional brief", { exact: true }).waitFor({
    state: "visible",
  });
  check(
    "opening a preloaded destination reuses the pending query without duplication",
    (await reads.innerText()).includes("count: 1"),
    await reads.innerText(),
  );

  check(
    "cache and preload examples use only local static resources and open no sockets",
    requests.every((url) => url.startsWith("http://127.0.0.1:5244/")) &&
      sockets.length === 0,
    { requests, sockets },
  );
  const failures = checks.filter((item) => !item.pass);
  if (failures.length) throw Error(JSON.stringify({ checks, failures }));
  return { checks };
}
