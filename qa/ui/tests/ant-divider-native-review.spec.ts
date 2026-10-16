import { test, expect, chromium, firefox, webkit } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:5300';
const output = path.resolve(process.env.DIVIDER_REVIEW_OUTPUT ?? 'output/playwright/ant-divider-native/durable');
const sha = (bytes: Buffer) => crypto.createHash('sha256').update(bytes).digest('hex');
const cases = ['canonical-shortlabel', 'unlabelled-horizontal', 'vertical-orientation', 'vertical-boolean', 'legacy-type-vertical', 'plain-horizontal', 'title-start-ltr', 'title-end-ltr', 'title-left-rtl', 'title-right-rtl', 'title-start-rtl', 'title-end-rtl', 'variant-solid', 'variant-dashed', 'variant-dotted', 'legacy-dashed', 'size-small', 'size-middle', 'size-medium', 'size-large', 'rich-reactnode', 'long-sentence-180', 'unbroken-token-180', 'unicode-180', 'empty-string', 'numeric-zero', 'semantic-content-margin'];

test('native Divider finite API originals and repair regression gates', async ({}, testInfo) => {
  const engine = testInfo.project.name as 'chromium' | 'firefox' | 'webkit';
  if (!['chromium', 'firefox', 'webkit'].includes(engine)) throw Error(`Unsupported engine ${engine}`);
  const launcher = { chromium, firefox, webkit }[engine];
  const server = await launcher.launchServer({ headless: true, executablePath: engine === 'chromium' ? process.env.AUDIT_CHROMIUM_PATH ?? chromium.executablePath() : launcher.executablePath() });
  const browser = await launcher.connect(server.wsEndpoint());
  const page = await browser.newPage({ viewport: { width: 320, height: 900 }, reducedMotion: 'no-preference' });
  const folder = path.join(output, engine); fs.mkdirSync(folder, { recursive: true });
  const errors: string[] = [], records: unknown[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) errors.push(m.text()); });
  page.on('requestfailed', r => errors.push(r.url()));
  page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  try {
    const response = await page.request.get(`${base}/audit-provenance.json`); expect(response.ok()).toBeTruthy();
    const artifact = await response.json();
    if (process.env.AUDIT_ARTIFACT_ID) expect(artifact.artifactId).toBe(process.env.AUDIT_ARTIFACT_ID);
    if (process.env.AUDIT_SOURCE_FINGERPRINT) expect(artifact.sourceFingerprint).toBe(process.env.AUDIT_SOURCE_FINGERPRINT);
    const pid = server.process().pid, executable = fs.readlinkSync(`/proc/${pid}/exe`);
    fs.writeFileSync(path.join(folder, 'runtime.json'), JSON.stringify({ artifact, engine, browserVersion: browser.version(), actualLauncher: { pid, executable, sha256: sha(fs.readFileSync(executable)) }, specSha256: sha(fs.readFileSync(path.resolve('qa/ui/tests/ant-divider-native-review.spec.ts'))), acceptance: 'pending-individual-original-inspection-and-independent-review' }, null, 2));
    for (const name of cases) {
      const query = new URLSearchParams({ item: 'ant-divider-native', fixture: 'public-props', case: name, profile: 'signature', mode: 'light', density: 'comfortable' });
      await page.goto(`${base}/audit.html?${query}`);
      await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
      await expect(page.locator('[data-divider-ref-match="true"]')).toBeVisible();
      await page.evaluate(async () => { await document.fonts.ready; await new Promise(requestAnimationFrame); await new Promise(requestAnimationFrame); });
      const subject = page.locator('[data-divider-subject]'); await expect(subject).toHaveCount(1);
      const geometry = await subject.evaluate(el => {
        const parent = el.closest('[data-divider-parent]')!, label = el.querySelector('.ant-divider-inner-text');
        return { role: el.getAttribute('role'), orientation: el.getAttribute('aria-orientation'), html: el.outerHTML, rect: el.getBoundingClientRect().toJSON(), parent: parent.getBoundingClientRect().toJSON(), docWidth: document.documentElement.scrollWidth, label: label ? { text: label.textContent, rect: label.getBoundingClientRect().toJSON(), whiteSpace: getComputedStyle(label).whiteSpace } : null, rails: [...el.querySelectorAll('.ant-divider-rail')].map(rail => ({ rect: rail.getBoundingClientRect().toJSON(), border: getComputedStyle(rail).borderBlockStartStyle })) };
      });
      let ax: unknown = null; let verticalAX = false;
      if (engine === 'chromium' && name === 'vertical-orientation') {
        const session = await page.context().newCDPSession(page);
        const { result } = await session.send('Runtime.evaluate', { expression: 'document.querySelector("[data-divider-subject]")' });
        const tree = await session.send('Accessibility.getPartialAXTree', { objectId: result.objectId }); ax = tree.nodes;
        verticalAX = tree.nodes.some(node => node.role?.value === 'separator' && node.properties?.some(property => property.name === 'orientation' && property.value.value === 'vertical')); await session.detach();
      }
      const file = path.join(folder, `${name}.png`); if (fs.existsSync(file)) throw Error(`Refuse original overwrite: ${file}`);
      await page.screenshot({ path: file, fullPage: true });
      records.push({ name, file, sha256: sha(fs.readFileSync(file)), geometry, ax, errors: [...errors], individualOriginalInspection: 'pending', accepted: false });
      fs.writeFileSync(path.join(folder, 'results.json'), JSON.stringify({ artifactId: artifact.artifactId, sourceFingerprint: artifact.sourceFingerprint, engine, records, errors, scope: '27 distinct finite API cases at one light signature comfortable320 environment; not full acceptance' }, null, 2));
      if (engine === 'chromium' && name === 'vertical-orientation') expect(verticalAX).toBeTruthy();
      expect(geometry.role).toBe('separator'); expect(geometry.docWidth).toBeLessThanOrEqual(320); expect(errors).toEqual([]);
      const vertical = name.startsWith('vertical-') || name === 'legacy-type-vertical';
      expect(geometry.orientation).toBe(vertical ? 'vertical' : 'horizontal');
      if (vertical) { expect(geometry.rect.width).toBeGreaterThan(0); expect(geometry.rect.height).toBeGreaterThan(geometry.rect.width); }
      if (name === 'canonical-shortlabel') { expect(geometry.label?.text).toBe('Next'); expect(geometry.label!.rect.height).toBeLessThan(26); }
      if (name.endsWith('-180')) {
        expect(geometry.parent.width).toBe(180); expect(geometry.label!.rect.left).toBeGreaterThanOrEqual(geometry.parent.left); expect(geometry.label!.rect.right).toBeLessThanOrEqual(geometry.parent.right);
        if (name === 'unbroken-token-180') expect(geometry.label?.text).toBe('W'.repeat(512));
        if (name === 'long-sentence-180') expect(geometry.label?.text).toBe('Design and deliver a complete project with every collaborator, deadline and milestone kept clearly visible.');
      }
      if (geometry.label) { expect(geometry.rails).toHaveLength(2); for (const rail of geometry.rails) expect(rail.rect.width).toBeGreaterThan(0); }
      const variant = name === 'legacy-dashed' ? 'dashed' : name.startsWith('variant-') ? name.slice(8) : undefined;
      if (variant) for (const rail of geometry.rails) expect(rail.border).toBe(variant);
    }
  } catch (error) {
    const file = path.join(folder, `failure-${Date.now()}.png`);
    let screenshot: { file: string; sha256: string } | null = null;
    try { await page.screenshot({ path: file, fullPage: true }); screenshot = { file, sha256: sha(fs.readFileSync(file)) }; } catch { /* Explicitly record inaccessible rendering below. */ }
    fs.writeFileSync(path.join(folder, `failure-${Date.now()}.json`), JSON.stringify({ error: String(error), records, errors, screenshot, note: screenshot ? 'Failure original retained; individual inspection pending' : 'Failure rendering unavailable; no screenshot claimed' }, null, 2));
    throw error;
  } finally { await browser.close(); await server.close(); }
});
