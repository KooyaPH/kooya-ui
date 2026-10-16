import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const base = process.env.V1_BASE_URL ?? "https://ui.test.kooyaai.com/";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const report = [];
for (const scene of ["cms", "settings"])
  for (const mode of ["light", "dark"]) {
    await page.goto(base + "#/workspace/" + scene);
    await page.evaluate(
      (mode) =>
        localStorage.setItem(
          "kooya.ui.v1.appearance",
          JSON.stringify({
            palette: "olive",
            customAccent: null,
            mode,
            density: "compact",
          }),
        ),
      mode,
    );
    await page.reload();
    await page.locator(".poc-work-area").waitFor();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    report.push({
      scene,
      mode,
      violations: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
await fs.writeFile(
  "output/playwright/v1/public-accessibility.json",
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify(
    report.map((r) => ({
      scene: r.scene,
      mode: r.mode,
      violations: r.violations.map((v) => v.id),
    })),
  ),
);
await browser.close();
if (report.some((r) => r.violations.length)) process.exitCode = 1;
