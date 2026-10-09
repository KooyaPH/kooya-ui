// Serve packages/ui/tests with Vite on 5194 after building @kooyaph/ui.
async (page) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  page.setDefaultTimeout(5000);
  const checks = [];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const check = (name, pass, detail) => {
    checks.push({ name, pass, detail });
    if (!pass) throw Error(name + ": " + JSON.stringify(detail));
  };
  await page.goto("http://127.0.0.1:5194/review-fixture.html");
  await page.getByRole("button", { name: "Edit row 0" }).click();
  const cell = await page
    .getByRole("button", { name: "Edit row 1" })
    .elementHandle();
  await page.getByRole("button", { name: "Rerender parent" }).click();
  await cell.focus();
  await page.getByLabel("Revision").filter({ hasText: "1" }).waitFor();
  check(
    "table DOM, cell state and focus survive parent rerender",
    await cell.evaluate(
      (node) =>
        node.isConnected &&
        document.activeElement === node &&
        node.textContent === "Edit row 1",
    ),
  );
  for (const controlled of [true, false])
    for (const canceled of [true, false]) {
      const label = `${controlled ? "Controlled" : "Uncontrolled"} ${canceled ? "canceled" : "normal"}`;
      const form = page.getByRole("form", { name: label, exact: true });
      await page
        .getByRole("button", { name: "Reset " + label, exact: true })
        .click();
      await page.waitForFunction(
        (label) => {
          const form = Array.from(document.forms).find(
            (form) => form.ariaLabel === label,
          );
          return new FormData(form).get("region") === "b";
        },
        label,
        { timeout: 5000 },
      );
      check(
        label + " initial reset preserves non-first value",
        await form.evaluate((node) => new FormData(node).get("region") === "b"),
      );
      if (!controlled) {
        await page.getByRole("combobox", { name: label, exact: true }).click();
        await page.getByRole("option", { name: "Alpine" }).click();
      }
      await page
        .getByRole("button", { name: "Reset " + label, exact: true })
        .click();
      const expected = !controlled && canceled ? "a" : "b";
      await page.waitForFunction(
        ({ label, expected }) => {
          const form = Array.from(document.forms).find(
            (form) => form.ariaLabel === label,
          );
          return (
            new FormData(form).get("region") === expected &&
            form
              .querySelector(".ku-select")
              .textContent.includes(expected === "a" ? "Alpine" : "Brook")
          );
        },
        { label, expected },
        { timeout: 5000 },
      );
      const result = await form.evaluate((node) => ({
        value: new FormData(node).get("region"),
        label: node.querySelector(".ku-select").textContent,
      }));
      check(
        label + " reset agrees with FormData",
        result.value === expected &&
          result.label.includes(expected === "a" ? "Alpine" : "Brook"),
        result,
      );
    }
  for (const mode of ["light", "dark"])
    for (const surface of ["#25382a", "#f1f5ef", "#777777"]) {
      await page
        .getByRole("combobox", { name: "Fixture mode" })
        .selectOption(mode);
      await page
        .getByRole("combobox", { name: "Fixture surface" })
        .selectOption(surface);
      const ratios = JSON.parse(
        await page.getByLabel("Contrast ratios").textContent(),
      );
      const button = page.getByRole("button", { name: "Contrast focus" });
      await page.getByRole("combobox", { name: "Fixture surface" }).focus();
      await page.keyboard.press("Tab");
      await page.waitForFunction(
        () => {
          const node = Array.from(document.querySelectorAll("button")).find(
            (node) => node.textContent === "Contrast focus",
          );
          const expected = getComputedStyle(node.closest(".ku-root"))
            .getPropertyValue("--ku-focus")
            .trim();
          return (
            getComputedStyle(node).outlineColor ===
            (expected === "#ffffff" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")
          );
        },
        undefined,
        { timeout: 5000 },
      );
      const style = await button.evaluate((node) => ({
        focus: getComputedStyle(node).outlineColor,
        width: getComputedStyle(node).outlineWidth,
        expected: getComputedStyle(node.closest(".ku-root"))
          .getPropertyValue("--ku-focus")
          .trim(),
        surface: getComputedStyle(node.closest(".ku-root"))
          .getPropertyValue("--ku-surface")
          .trim(),
      }));
      check(
        `${mode} ${surface} semantic contrast and rendered focus`,
        Object.values(ratios).every((ratio) => ratio >= 4.5) &&
          style.width === "3px" &&
          style.surface === surface &&
          (style.expected === "#ffffff"
            ? style.focus === "rgb(255, 255, 255)"
            : style.focus === "rgb(0, 0, 0)"),
        { ratios, style },
      );
    }
  check("no fixture browser errors", errors.length === 0, errors);
  await page.screenshot({
    path: "output/playwright/task1-fix1-custom-surface-focus.png",
  });
  return { checks, errors };
}
