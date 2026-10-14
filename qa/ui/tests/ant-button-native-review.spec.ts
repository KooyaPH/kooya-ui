import { test, expect, chromium, firefox, webkit, type Page, type Locator } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:5300';
const output = path.resolve(process.env.BUTTON_REVIEW_OUTPUT ?? 'output/playwright/ant-button-native/dev');
const sha = (bytes: Buffer) => crypto.createHash('sha256').update(bytes).digest('hex');
function actualProcesses(pid: number): unknown[] {
  const found: unknown[] = [];
  const hashes = new Map<string, string>();
  function read(id: number) {
    try {
      const exe = fs.readlinkSync(`/proc/${id}/exe`);
      if (!hashes.has(exe)) hashes.set(exe, sha(fs.readFileSync(exe)));
      found.push({ pid: id, executable: exe, sha256: hashes.get(exe) });
      const children = fs.readFileSync(`/proc/${id}/task/${id}/children`, 'utf8').trim().split(/\s+/).filter(Boolean);
      for (const child of children) read(Number(child));
    } catch { /* A process that exited during traversal cannot be qualified. */ }
  }
  read(pid); return found;
}
async function settled(page: Page) {
  await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
  await page.evaluate(async () => { await document.fonts.ready; await new Promise(requestAnimationFrame); await new Promise(requestAnimationFrame); });
}
async function capture(page: Page, folder: string, name: string, errors: string[], subject?: Locator) {
  const file = path.join(folder, `${name}.png`);
  if (fs.existsSync(file)) throw Error(`Refuse evidence overwrite: ${file}`);
  await page.screenshot({ path: file, fullPage: true, animations: 'allow' });
  const geometry = await (subject ?? page.locator('[data-audit-item]')).evaluate(el => {
    const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    const parent = el.parentElement!.getBoundingClientRect();
    return { rect: r.toJSON(), parent: parent.toJSON(), color: s.color, background: s.backgroundColor, cursor: s.cursor, outline: s.outline, text: el.textContent, html: el.outerHTML, overflow: document.documentElement.scrollWidth - innerWidth };
  });
  fs.writeFileSync(path.join(folder, `${name}.json`), JSON.stringify({ name, screenshot: file, sha256: sha(fs.readFileSync(file)), geometry, errors: [...errors], visualInspection: 'pending-original-individual-view' }, null, 2));
}
function url(item: string, parameters: Record<string, string> = {}) {
  return `${base}/audit.html?${new URLSearchParams({ item, ...parameters })}`;
}

test('actual native Button catalog and API bounded evidence', async ({}, info) => {
  test.setTimeout(240_000);
  const engine = info.project.name;
  if (!(engine === 'chromium' || engine === 'firefox' || engine === 'webkit')) throw Error(`Unknown exact engine ${engine}`);
  const folder = path.join(output, engine);
  if (fs.existsSync(path.join(folder, 'runtime.json'))) throw Error(`Refuse runtime evidence overwrite: ${folder}`);
  fs.mkdirSync(folder, { recursive: true });
  const type = { chromium, firefox, webkit }[engine];
  const executablePath = engine === 'chromium' ? process.env.AUDIT_CHROMIUM_PATH ?? chromium.executablePath() : undefined;
  const server = await type.launchServer({ headless: true, executablePath });
  const browser = await type.connect(server.wsEndpoint());
  const context = await browser.newContext({ viewport: { width: Number(process.env.BUTTON_WIDTH ?? 320), height: 900 }, reducedMotion: process.env.BUTTON_MOTION === 'reduce' ? 'reduce' : 'no-preference' });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()} ${JSON.stringify(m.location())}`); });
  page.on('requestfailed', r => errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
  try {
    await page.goto(url('ant-button-native', { mode: process.env.BUTTON_MODE ?? 'light', density: process.env.BUTTON_DENSITY ?? 'comfortable' })); await settled(page);
    const manifest = await page.request.get(`${base}/audit-provenance.json`);
    let artifact: unknown = null;
    if (manifest.ok()) {
      artifact = await manifest.json();
      if (process.env.AUDIT_ARTIFACT_ID) expect((artifact as { artifactId: string }).artifactId).toBe(process.env.AUDIT_ARTIFACT_ID);
      if (process.env.AUDIT_SOURCE_FINGERPRINT) expect((artifact as { sourceFingerprint: string }).sourceFingerprint).toBe(process.env.AUDIT_SOURCE_FINGERPRINT);
    } else if (process.env.AUDIT_ARTIFACT_ID) throw Error('Immutable artifact manifest absent');
    fs.writeFileSync(path.join(folder, 'runtime.json'), JSON.stringify({ engine, version: browser.version(), launcherPid: server.process().pid, actualProcesses: actualProcesses(server.process().pid), base, artifact, specSha256: sha(fs.readFileSync(path.resolve('qa/ui/tests/ant-button-native-review.spec.ts'))), acceptance: 'not-accepted' }, null, 2));
    await expect(page.locator('.ant-btn')).toHaveCount(4);
    await capture(page, folder, 'catalog-default', errors);
    for (const name of ['Primary', 'Default', 'Danger']) {
      const button = page.getByRole('button', { name, exact: true });
      await button.hover(); await capture(page, folder, `catalog-${name.toLowerCase()}-hover`, errors, button);
      await button.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
      await capture(page, folder, `catalog-${name.toLowerCase()}-keyboard-focus`, errors, button);
    }
    const params = { fixture: 'review', profile: process.env.BUTTON_PRESET ?? 'signature', mode: process.env.BUTTON_MODE ?? 'light', density: process.env.BUTTON_DENSITY ?? 'comfortable' };
    for (const label of ['normal', 'sentence', 'unbroken', 'unicode']) {
      await page.goto(url('ant-button-native-review', { ...params, label, narrow: 'true', block: 'true' })); await settled(page);
      const button = page.locator('[data-button-subject]');
      await capture(page, folder, `api-${label}-180px`, errors, button);
      const bounds = await button.evaluate(el => { const r = el.getBoundingClientRect(), p = el.parentElement!.getBoundingClientRect(); return { left: r.left >= p.left - 1, right: r.right <= p.right + 1, clipped: el.scrollWidth > el.clientWidth + 1 }; });
      fs.writeFileSync(path.join(folder, `api-${label}-bounds.json`), JSON.stringify(bounds, null, 2));
    }
    await page.goto(url('ant-button-native-review', params)); await settled(page);
    const subject = page.locator('[data-button-subject]');
    await subject.focus(); await page.keyboard.press('Enter'); await page.keyboard.press('Space');
    await expect(page.locator('[data-button-events]')).toHaveText(JSON.stringify({ clicks: 2, submits: 0, resets: 0 }));
    await page.getByRole('button', { name: 'Toggle native loading' }).click();
    await expect(subject).toHaveClass(/ant-btn-loading/);
    await subject.focus(); await page.keyboard.press('Enter'); await page.keyboard.press('Space');
    await expect(page.locator('[data-button-events]')).toHaveText(JSON.stringify({ clicks: 2, submits: 0, resets: 0 }));
    await capture(page, folder, 'api-loading-keyboard-repeat', errors, subject);
    await page.getByRole('button', { name: 'Toggle native loading' }).click();
    await expect(subject).not.toHaveClass(/ant-btn-loading/);
    await subject.click(); await expect(page.locator('[data-button-events]')).toHaveText(JSON.stringify({ clicks: 3, submits: 0, resets: 0 }));
    await capture(page, folder, 'api-loading-recovery', errors, subject);
    fs.writeFileSync(path.join(folder, 'errors.json'), JSON.stringify(errors, null, 2));
    expect(errors, 'Unexplained browser errors are defects, never suppressed').toEqual([]);
  } finally { await context.close(); await browser.close(); await server.close(); }
});
