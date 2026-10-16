import { test, expect, chromium, firefox, webkit } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import crypto from 'node:crypto';

const widths = (process.env.LANDING_WIDTHS ?? '320,360,390,768,1024,1280,1440,1920').split(',').map(Number);
const modes = (process.env.LANDING_MODES ?? 'light,dark').split(',') as ('light'|'dark')[];
const densities = (process.env.LANDING_DENSITIES ?? 'comfortable,compact').split(',') as ('comfortable'|'compact')[];
const motions = (process.env.LANDING_MOTIONS ?? 'no-preference,reduce').split(',') as ('no-preference'|'reduce')[];

for (const width of widths) for (const mode of modes) for (const density of densities) for (const motion of motions) {
  test(`Landing actual provider preset transitions ${width}/${mode}/${density}/${motion}`, async ({page, browser}, info) => {
    test.setTimeout(90_000);
    await page.setViewportSize({width,height:900});
    await page.emulateMedia({reducedMotion:motion});
    const response = await page.request.get('/audit-provenance.json');
    expect(response.ok()).toBeTruthy();
    const provenance = await response.json();
    if (!process.env.LANDING_ARTIFACT || !process.env.LANDING_SOURCE) throw new Error('Explicit immutable LANDING_ARTIFACT and LANDING_SOURCE required');
    expect(provenance.artifactId).toBe(process.env.LANDING_ARTIFACT);
    expect(provenance.sourceFingerprint).toBe(process.env.LANDING_SOURCE);
    const contractSha256 = crypto.createHash('sha256').update(fs.readFileSync('qa/ui/contracts/landing.json')).digest('hex');
    const contract = JSON.parse(fs.readFileSync('qa/ui/contracts/landing.json','utf8'));
    const targetId = process.env.LANDING_BROWSER_TARGET ?? ({chromium:'pw-chromium-156',firefox:'pw-firefox-157',webkit:'pw-webkit-27.2'} as Record<string,string>)[info.project.name];
    const target = contract.browserTargets.find((entry: {id:string})=>entry.id===targetId);
    expect(target).toBeTruthy();
    expect(browser.version()).toBe(target.version);
    const executable = info.project.name==='chromium' ? process.env.AUDIT_CHROMIUM_PATH ?? chromium.executablePath() : info.project.name==='firefox' ? firefox.executablePath() : webkit.executablePath();
    const binaryHash = crypto.createHash('sha256');
    for await (const bytes of fs.createReadStream(executable)) binaryHash.update(bytes);
    const executableSha256 = binaryHash.digest('hex');
    const executedSpecSha256 = crypto.createHash('sha256').update(fs.readFileSync('qa/ui/tests/landing-review.spec.ts')).digest('hex');
    expect(provenance.sourceFiles['qa/ui/contracts/landing.json']).toBe(contractSha256);
    expect(provenance.sourceFiles['qa/ui/tests/landing-review.spec.ts']).toBe(executedSpecSha256);
    await page.goto(`/audit.html?item=landing-review&fixture=props&mode=${mode}&density=${density}&theme=signature`);
    await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
    await page.evaluate(()=>document.fonts.ready);
    const root = page.locator('.landing-review-provider');
    const name = page.getByLabel('Project name',{exact:true});
    const draft = 'Provider transition draft 😀 e\u0301 中 '.repeat(16);
    await name.fill(draft);
    const notifications = page.getByRole('switch',{name:'Team notifications',exact:true});
    await page.getByText('Keep the team in the loop',{exact:true}).click();
    await expect(notifications).toHaveAttribute('aria-checked','false');
    const slider = page.getByRole('slider',{name:'Room to grow',exact:true});
    await slider.focus(); await slider.press('End');
    await expect(slider).toHaveAttribute('aria-valuenow','100');
    const initialHandle = await name.elementHandle();
    const records: unknown[] = [];
    for (const preset of ['signature','canvas','client','mosaic']) {
      await page.getByRole('button',{name:`Review preset ${preset}`,exact:true}).click();
      await expect(root).toHaveAttribute('data-review-preset',preset);
      await expect(root).toHaveAttribute('data-theme',preset);
      await expect(root).toHaveAttribute('data-mode',mode);
      await expect(root).toHaveAttribute('data-density',density);
      await expect(name).toHaveValue(draft);
      await expect(notifications).toHaveAttribute('aria-checked','false');
      await expect(slider).toHaveAttribute('aria-valuenow','100');
      expect(await name.evaluate((element, original)=>element===original,initialHandle)).toBe(true);
      await page.getByRole('button',{name:'Create a local project',exact:true}).click();
      await expect(page.locator('.demo-status')).toHaveText(`“${draft}” is ready in this demo.`);
      await page.locator('.hero-demo').scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      const overflow = await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      const file = info.outputPath(`${preset}-saved.png`);
      await page.screenshot({path:file,fullPage:false});
      const axe = await new AxeBuilder({page}).include('.landing').options({iframes:false}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      const actualMotion = await page.evaluate(()=>({reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,activeAnimations:document.getAnimations().length}));
      records.push({targetId,executable,executableSha256,axeViolations:axe.violations,actualMotion,contractSha256,executedSpecSha256,preset,width,mode,density,motion,overflow,url:page.url(),browser:browser.version(),artifact:provenance.artifactId,sourceFingerprint:provenance.sourceFingerprint,screenshot:file,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),visualReview:'pending original inspection; assertions are not item acceptance'});
      fs.writeFileSync(info.outputPath('preset-proof.json'),JSON.stringify(records,null,2));
      expect(axe.violations).toEqual([]);
      // Force a genuine edit: React may suppress onChange for the identical value.
      await name.fill(`${draft} edited`);
      await name.fill(draft);
      await expect(page.getByRole('button',{name:'Create a local project',exact:true})).toBeVisible();
    }
    await page.getByRole('button',{name:'Review toggle mode',exact:true}).click();
    await page.getByRole('button',{name:'Review toggle density',exact:true}).click();
    await expect(name).toHaveValue(draft);
    await expect(notifications).toHaveAttribute('aria-checked','false');
    await expect(slider).toHaveAttribute('aria-valuenow','100');
    expect(await name.evaluate((element,original)=>element===original,initialHandle)).toBe(true);
    await expect(root).toHaveAttribute('data-mode',mode==='light'?'dark':'light');
    await expect(root).toHaveAttribute('data-density',density==='comfortable'?'compact':'comfortable');
    const summary=info.outputPath('preset-proof.json');fs.writeFileSync(summary,JSON.stringify(records,null,2));
    await info.attach('preset proof',{path:summary,contentType:'application/json'});
  });
}
