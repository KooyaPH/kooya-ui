import { expect, test } from '@playwright/test';

test('real catalog fixture resolves, exposes semantic content and preserves dirty appearance state', async ({page}) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/audit.html?item=c-textarea-6');
  await expect(page.locator('[data-audit-item]')).toHaveAttribute('data-audit-ready','true');
  await expect(page.locator('[data-audit-loading]')).toHaveCount(0);
  const bio = page.getByRole('textbox',{name:'Bio',exact:true});
  await expect(bio).toBeVisible(); await bio.fill('Draft survives harness settings');
  await page.evaluate(() => window.postMessage({type:'kooya-preview-settings',mode:'dark',density:'compact'},location.origin));
  await expect(page.locator('html')).toHaveAttribute('data-density','compact');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(bio).toHaveValue('Draft survives harness settings');
  expect(errors).toEqual([]);
});
for (const query of ['item=unknown-audit-negative-control','item=c-textarea-6&fixture=missing']) test(`unknown lookup fails visibly and cannot appear ready: ${query}`, async ({page},info) => {
  await page.goto('/audit.html?'+query);
  await expect(page.getByText('This example could not be loaded',{exact:true})).toBeVisible();
  await expect(page.locator('[data-audit-ready=true]')).toHaveCount(0);
  await expect(page.getByRole('textbox')).toHaveCount(0);
  await page.screenshot({path:info.outputPath('visible-negative-control.png'),fullPage:true,animations:'allow'});
});
test('lazy fixture is not marked ready while its module request is withheld', async ({page}) => {
  let release!: () => void; const blocked = new Promise<void>(resolve => {release=resolve});
  await page.route('**/reui/runtime/examples/textarea/c-textarea-6.jsx*', async route => {await blocked; await route.continue()});
  await page.goto('/audit.html?item=c-textarea-6', {waitUntil:'domcontentloaded'});
  await expect(page.locator('[data-audit-loading]')).toBeVisible();
  await expect(page.locator('[data-audit-ready=true]')).toHaveCount(0);
  release(); await expect(page.getByRole('textbox',{name:'Bio',exact:true})).toBeVisible();
  await expect(page.locator('[data-audit-item]')).toHaveAttribute('data-audit-ready','true');
});
