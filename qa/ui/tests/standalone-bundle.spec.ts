import { test, expect } from '@playwright/test';
import crypto from 'node:crypto';
import fs from 'node:fs';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.AUDIT_STANDALONE_URL ?? 'http://127.0.0.1:5196';
test('downloaded source: owned textarea edits and rejects excessive text', async ({page}, info) => {
  await page.goto(`${base}/?example=c-textarea-6&mode=dark&density=compact`);
  const input=page.getByRole('textbox',{name:'Bio',exact:true});
  await input.fill('Independent installed consumer');
  await expect(input).toHaveValue('Independent installed consumer');
  await input.fill('a'.repeat(281));
  await expect(input).toHaveValue('Independent installed consumer');
  await expect(input).toHaveAccessibleDescription('30/280');
  const file=info.outputPath('installed-textarea.png'); await page.screenshot({path:file,fullPage:true});
  await info.attach('sha256',{body:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),contentType:'text/plain'});
});
test('downloaded source: native Drawer labels and boundary Tab patch work', async ({page},info)=>{
  await page.goto(`${base}/?example=ant-drawer-native`);
  await page.getByRole('button',{name:'Open drawer',exact:true}).click();
  const dialog=page.getByRole('dialog'); await expect(dialog).toBeVisible();
  const input=dialog.getByRole('textbox',{name:'Project name',exact:true});
  await expect(input).toHaveValue('Kooya Studio');
  await page.locator('.ant-drawer').evaluate(async e=>{
    await new Promise(requestAnimationFrame);
    await Promise.all(e.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
  });
  // Firefox fill uses composition events; ordinary keyboard input should not
  // exercise Ant's intentional 200ms IME Escape guard.
  await input.press('ControlOrMeta+A'); await input.pressSequentially('Standalone draft');
  await input.focus(); await page.keyboard.press('Tab');
  expect(await dialog.evaluate(e=>e.contains(document.activeElement))).toBe(true);
  await page.screenshot({path:info.outputPath('installed-drawer.png'),fullPage:true});
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();
});
test('downloaded source: workbench filter labels and measurement clones work',async({page},info)=>{
  await page.goto(`${base}/?example=kooya-blocks-data-workbench-standard`);
  await expect(page.locator('.ant-table-row').first()).toBeVisible();
  await page.getByText('Table controls',{exact:true}).click();
  await expect(page.getByRole('slider',{name:'Name column width'})).toHaveCount(1);
  await expect(page.locator('.ant-table-measure-row')).toHaveAttribute('inert','');
  const header=page.locator('th').filter({hasText:'Category'});await header.locator('.ant-table-filter-trigger').click();
  const popup=page.locator('.ant-table-filter-dropdown');await expect(popup).toBeVisible();
  for(const name of ['Design','Product','Operations']) await expect(popup.getByRole('checkbox',{name,exact:true})).toHaveCount(1);
  await popup.evaluate(async e=>{
    await new Promise(requestAnimationFrame);
    await Promise.all(e.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
  });
  await expect(popup).toBeVisible();
  await page.screenshot({path:info.outputPath('installed-filter-labels.png')});
});
test('downloaded source: composed dashboard template import closure renders',async({page},info)=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}/?example=kooya-templates-dashboard-standard`);
  await expect(page.locator('main')).toContainText('Studio overview');
  await expect(page.getByText('This example could not be loaded',{exact:true})).toHaveCount(0);
  expect(errors).toEqual([]);
  await page.screenshot({path:info.outputPath('installed-template.png'),fullPage:true});
});
test('downloaded source: real document language and heading accessibility', async({page},info)=>{
  await page.goto(`${base}/?example=c-textarea-6`);
  await expect(page.getByRole('textbox',{name:'Bio',exact:true})).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expect(page.getByRole('heading',{level:1})).toHaveCount(1);
  const results=await new AxeBuilder({page}).analyze();
  fs.writeFileSync(info.outputPath('installed-document-axe.json'),JSON.stringify(results,null,2));
  expect(results.violations).toEqual([]);
});
