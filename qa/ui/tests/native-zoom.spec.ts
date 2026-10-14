import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

test('owned native browser zoom preserves accepted textarea text at 200 and 400 percent', async ({ browserName }, info) => {
  test.skip(browserName !== 'chromium', 'Native browser zoom extension is Chromium-specific; other engines remain blocked for native zoom');
  const extension = path.resolve('qa/ui/extension');
  const profile = info.outputPath('owned-profile');
  const context = await chromium.launchPersistentContext(profile, { headless: true, channel: 'chromium', viewport: null, args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`, '--window-size=1280,900'] });
  try {
    const worker = context.serviceWorkers()[0] ?? await context.waitForEvent('serviceworker');
    const page = context.pages()[0] ?? await context.newPage();
    const baseURL = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:5300';
    await page.goto(`${baseURL}/?mode=dark#/preview/c-textarea-6`);
    const bio = page.getByRole('textbox', { name: 'Bio', exact: true });
    await bio.fill('a'.repeat(280));
    const proofs = [];
    for (const zoom of [1, 2, 4]) {
      const applied = await worker.evaluate(async ({ zoom, baseURL }) => {
        const chromeApi = (globalThis as any).chrome;
        const tabs = await chromeApi.tabs.query({ url: `${baseURL}/*` });
        if (tabs.length !== 1) throw Error('Exactly one owned audit tab required');
        await chromeApi.tabs.setZoomSettings(tabs[0].id, { mode: 'automatic', scope: 'per-tab' });
        await chromeApi.tabs.setZoom(tabs[0].id, zoom);
        return { zoom: await chromeApi.tabs.getZoom(tabs[0].id), url: tabs[0].url };
      }, { zoom, baseURL });
      expect(applied.zoom).toBeCloseTo(zoom, 8);
      await expect(bio).toHaveValue('a'.repeat(280));
      await expect.poll(() => bio.evaluate(el => el.scrollHeight - el.clientHeight)).toBeLessThanOrEqual(1);
      const geometry = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, dpr: devicePixelRatio }));
      expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.width + 1);
      const cdp = await context.newCDPSession(page);
      const capture = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
      await cdp.detach();
      const screenshot = info.outputPath(`native-zoom-${zoom * 100}.png`);
      fs.writeFileSync(screenshot, Buffer.from(capture.data, 'base64'));
      proofs.push({ ...applied, geometry, browser: context.browser()?.version(), screenshot });
    }
    await info.attach('native-zoom-proof', { body: JSON.stringify(proofs, null, 2), contentType: 'application/json' });
  } finally { await context.close(); }
});
