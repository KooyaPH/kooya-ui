import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:5300';
const out = path.resolve(process.env.DRAWER_REVIEW_OUTPUT ?? 'output/playwright/drawer-independent');
test.setTimeout(180_000);
test.use({actionTimeout:15_000});
async function open(page: Page) {
  const trigger = page.getByRole('button', {name: 'Open drawer', exact: true});
  await trigger.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect.poll(() => page.locator('.ant-drawer-content-wrapper').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  return trigger;
}
function url(fixture='catalog', profile='default', mode='light', density='comfortable') {
  return `${base}/audit.html?item=ant-drawer-native&fixture=${fixture}&profile=${profile}&mode=${mode}&density=${density}`;
}
async function capture(page: Page, engine: string, name: string) {
  fs.mkdirSync(path.join(out, engine), {recursive:true});
  await page.screenshot({path:path.join(out,engine,`${name}.png`), fullPage:true, animations:'allow'});
}
test('independent settled keyboard, dismissal and 30-cycle cleanup', async ({page}, info) => {
  const errors: string[]=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.goto(url());
  const trigger=await open(page);
  await expect(page.getByRole('dialog')).toHaveAccessibleName('Project settings');
  const field=page.getByRole('textbox',{name:/Project name$/});
  await expect(field).toHaveValue('Kooya Studio');
  for(const key of ['Tab','Shift+Tab']) for(let i=0;i<12;i++) {
    await page.keyboard.press(key);
    await expect.poll(()=>page.evaluate(()=>!!document.activeElement?.closest('.ant-drawer'))).toBe(true);
  }
  await capture(page,info.project.name,'keyboard-focus');
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).not.toBeVisible(); await expect(trigger).toBeFocused();
  for(let i=0;i<30;i++) {
    await open(page);
    if(i%3===0) await page.getByRole('button',{name:'Close',exact:true}).click();
    else if(i%3===1) await page.locator('.ant-drawer-mask').click({position:{x:20,y:300}});
    else await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible(); await expect(trigger).toBeFocused();
    await expect(page.locator('.ant-drawer-open')).toHaveCount(0);
  }
  await expect.poll(()=>page.evaluate(()=>getComputedStyle(document.body).overflow)).not.toBe('hidden');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(()=>!!document.activeElement?.closest('.ant-drawer'))).toBe(false);
  expect(errors).toEqual([]);
});
test('independent dirty appearance and OS motion transitions preserve focus identity', async ({page},info)=>{
  await page.goto(url('stress'));
  await open(page);
  const field=page.getByRole('textbox',{name:/Project name$/});
  await field.fill('Dirty Singapore 🚀 é');
  const original=await field.elementHandle();
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(field).toHaveValue('Dirty Singapore 🚀 é');
  await expect(field).toBeFocused();
  expect(await original!.evaluate(el=>el.isConnected)).toBe(true);
  await page.evaluate(()=>window.postMessage({type:'kooya-preview-settings',mode:'dark',density:'compact'},location.origin));
  await expect.poll(()=>page.evaluate(()=>document.documentElement.dataset.mode)).toBe('dark');
  await expect(field).toHaveValue('Dirty Singapore 🚀 é'); await expect(field).toBeFocused();
  await page.setViewportSize({width:320,height:600});
  await expect(field).toHaveValue('Dirty Singapore 🚀 é');
  await page.waitForTimeout(400);
  await capture(page,info.project.name,'dirty-dark-compact-reduced-320');
  await page.emulateMedia({reducedMotion:'no-preference'}); await expect(field).toHaveValue('Dirty Singapore 🚀 é');
});
test('independent all fixture profiles fresh renders and nested popup traversal',async({page},info)=>{
  for(const profile of ['default','long','empty','error','loading','nested']) {
    await page.setViewportSize({width:320,height:600}); await page.goto(url('stress',profile)); await open(page);
    if(profile==='error') {await page.getByRole('button',{name:'Save changes',exact:true}).click(); await expect(page.getByText('Enter a project name',{exact:true})).toBeVisible(); await page.waitForTimeout(400);}
    if(profile==='long') await page.locator('.ant-drawer-body').evaluate(el=>el.scrollTop=el.scrollHeight);
    if(profile==='nested') {
      const date=page.getByRole('textbox',{name:'Review date',exact:true}); await date.click();
      const popup=page.locator('.ant-picker-dropdown').filter({visible:true}); await expect(popup).toBeVisible();
      const next=popup.locator('.ant-picker-header-next-btn'); await next.focus(); await page.keyboard.press('Enter'); await expect(next).toBeFocused();
      await expect(popup.locator('.ant-picker-panel')).toBeVisible(); await page.waitForTimeout(400);
      await capture(page,info.project.name,'nested-popup-320');
      await date.focus(); await page.keyboard.press('Escape'); await expect(popup).not.toBeVisible(); await expect(page.getByRole('dialog')).toBeVisible();
    }
    await capture(page,info.project.name,`stress-${profile}-320`);
    const dialog=page.getByRole('dialog'); const box=await dialog.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(-1); expect(box!.width).toBeLessThanOrEqual(321);
    await expect(page.locator('.ant-drawer-footer')).toBeInViewport();
    await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible();
  }
  for(const width of [320,768,1920]) for(const mode of ['light','dark']) {
    await page.setViewportSize({width,height:900}); await page.goto(url('catalog','default',mode,mode==='dark'?'compact':'comfortable')); await open(page);
    await capture(page,info.project.name,`catalog-${width}-${mode}`);
  }
});
test('independent native nested lock stack and restoration',async({page},info)=>{
  await page.goto(`${base}/audit.html?item=ant-drawer-native-review&fixture=stress`);
  const trigger=await open(page);
  const childTrigger=page.getByRole('button',{name:'Open child drawer',exact:true});
  await childTrigger.click();
  const child=page.getByRole('dialog',{name:'Child project settings',exact:true}); await expect(child).toBeVisible();
  await expect.poll(()=>child.locator('..').evaluate(el=>getComputedStyle(el).transform)).toBe('none');
  for(const key of ['Tab','Shift+Tab']) for(let i=0;i<8;i++) {
    await page.keyboard.press(key); expect(await child.evaluate(el=>el.contains(document.activeElement))).toBe(true);
  }
  await capture(page,info.project.name,'nested-drawer-open');
  await page.keyboard.press('Escape'); await expect(child).not.toBeVisible(); await expect(childTrigger).toBeFocused();
  await page.keyboard.press('Shift+Tab'); expect(await page.getByRole('dialog',{name:'Parent project settings',exact:true}).evaluate(el=>el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).not.toBeVisible(); await expect(trigger).toBeFocused();
});
test('independent no enabled focus controls retains modal keyboard focus',async({page},info)=>{
  await page.goto(`${base}/audit.html?item=ant-drawer-native-review&fixture=stress&profile=no-focusable`);
  const trigger=await open(page);
  const dialog=page.getByRole('dialog',{name:'Parent project settings',exact:true});
  await capture(page,info.project.name,'no-focusable-initial');
  for(const key of ['Tab','Shift+Tab']) {
    await page.keyboard.press(key); await capture(page,info.project.name,`no-focusable-${key==='Tab'?'forward':'reverse'}`);
    expect(await page.evaluate(()=>!!document.activeElement?.closest('.ant-drawer'))).toBe(true);
    await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible(); await expect(trigger).toBeFocused();
    if(key==='Tab') await open(page);
  }
});
test('independent measured narrow nested popup containment',async({page},info)=>{
  await page.setViewportSize({width:320,height:600}); await page.goto(url('stress','nested')); await open(page);
  await page.getByRole('textbox',{name:'Review date',exact:true}).click();
  const popup=page.locator('.ant-picker-dropdown').filter({visible:true}); await expect(popup).toBeVisible();
  await expect(popup.locator('.ant-picker-panel')).toBeVisible(); await page.waitForTimeout(400);
  await expect.poll(()=>popup.evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length)).toBe(0);
  const geometry=await popup.evaluate(el=>({popup:{x:el.getBoundingClientRect().x,right:el.getBoundingClientRect().right,width:el.getBoundingClientRect().width},panel:el.querySelector('.ant-picker-panel')!.getBoundingClientRect().toJSON(),cellWidth:getComputedStyle(el).getPropertyValue('--ant-date-picker-cell-width').trim(),viewport:innerWidth,scroll:document.documentElement.scrollWidth,scrollX,drawer:document.querySelector('.ant-drawer-section')!.getBoundingClientRect().toJSON()}));
  await info.attach('popup-geometry',{body:JSON.stringify(geometry),contentType:'application/json'});
  fs.mkdirSync(path.join(out,info.project.name),{recursive:true});fs.writeFileSync(path.join(out,info.project.name,'popup-geometry.json'),JSON.stringify(geometry,null,2));
  await capture(page,info.project.name,'measured-nested-popup-320');
  expect.soft(geometry.scroll).toBeLessThanOrEqual(321);
  expect.soft(geometry.popup.x).toBeGreaterThanOrEqual(-1); expect.soft(geometry.popup.right).toBeLessThanOrEqual(321);
  expect(geometry.panel.width).toBeGreaterThan(200); expect(geometry.panel.right).toBeLessThanOrEqual(321);
  expect(geometry.cellWidth).toBe('36px');
});
test('independent measured active loading status contrast and settled error rendering',async({page},info)=>{
  await page.setViewportSize({width:320,height:600}); await page.goto(url('stress','loading')); await open(page);
  const colors=await page.locator('.ant-spin-description').evaluate(el=>({color:getComputedStyle(el).color,background:getComputedStyle(document.querySelector('.ant-drawer-section')!).backgroundColor,text:el.textContent}));
  const lum=(color:string)=>{const c=color.match(/[\d.]+/g)!.slice(0,3).map(v=>{const x=Number(v)/255;return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;});return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;};
  const a=lum(colors.color),b=lum(colors.background),ratio=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
  fs.mkdirSync(path.join(out,info.project.name),{recursive:true});fs.writeFileSync(path.join(out,info.project.name,'loading-contrast.json'),JSON.stringify({...colors,ratio},null,2));
  await capture(page,info.project.name,'measured-loading-320'); expect.soft(ratio).toBeGreaterThanOrEqual(4.5);
  await page.goto(url('stress','error')); await open(page); await page.getByRole('button',{name:'Save changes',exact:true}).click();
  await expect(page.getByText('Enter a project name',{exact:true})).toBeVisible();
  await expect.poll(()=>page.locator('.ant-form-item').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length)).toBe(0);
  await page.waitForTimeout(400);
  await capture(page,info.project.name,'settled-error-320');
});
test('independent measured dirty open resize document containment',async({page},info)=>{
  await page.goto(url('stress')); await open(page); await page.getByRole('textbox',{name:/Project name$/}).fill('Dirty Singapore');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.evaluate(()=>window.postMessage({type:'kooya-preview-settings',mode:'dark',density:'compact'},location.origin));
  await expect.poll(()=>page.evaluate(()=>document.documentElement.dataset.mode)).toBe('dark');
  await page.setViewportSize({width:320,height:600});
  await expect(page.getByRole('textbox',{name:/Project name$/})).toHaveValue('Dirty Singapore');
  await page.waitForTimeout(400);
  const geometry=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,body:document.body.getBoundingClientRect().toJSON(),bodyStyle:document.body.getAttribute('style'),main:document.querySelector('main')!.getBoundingClientRect().toJSON()}));
  fs.mkdirSync(path.join(out,info.project.name),{recursive:true});fs.writeFileSync(path.join(out,info.project.name,'dirty-resize-geometry.json'),JSON.stringify(geometry,null,2));
  await capture(page,info.project.name,'measured-dirty-resize-320'); expect(geometry.scroll).toBeLessThanOrEqual(321);
});
test('independent bottom calendar action reachable after actual pointer wheel',async({page},info)=>{
  await page.setViewportSize({width:320,height:600}); await page.goto(url('stress','nested')); await open(page);
  const field=page.getByRole('textbox',{name:'Review date',exact:true}); await field.click();
  const popup=page.locator('.ant-picker-dropdown').filter({visible:true}); await expect(popup.locator('.ant-picker-panel')).toBeVisible(); await page.waitForTimeout(400);
  const today=popup.getByText('Today',{exact:true});
  const before=await today.boundingBox();
  fs.mkdirSync(path.join(out,info.project.name),{recursive:true});
  await page.screenshot({path:path.join(out,info.project.name,'calendar-bottom-before-wheel.png'),animations:'allow'});
  await page.mouse.move(180,440); await page.mouse.wheel(0,400); await page.waitForTimeout(400);
  const after=await today.boundingBox();
  const documentState=await page.evaluate(()=>({scrollY,scrollHeight:document.documentElement.scrollHeight,clientHeight:document.documentElement.clientHeight,bodyOverflow:getComputedStyle(document.body).overflow,rootOverflow:getComputedStyle(document.querySelector('.ku-root')!).overflow}));
  fs.writeFileSync(path.join(out,info.project.name,'calendar-bottom-wheel.json'),JSON.stringify({before,after,documentState},null,2));
  await page.screenshot({path:path.join(out,info.project.name,'calendar-bottom-after-wheel.png'),animations:'allow'});
  await expect(today).toBeInViewport({ratio:1});
  const currentDate=await page.evaluate(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;});
  await today.click(); await expect(field).toHaveValue(currentDate); await expect(popup).not.toBeVisible(); await expect(page.getByRole('dialog')).toBeVisible();
});
test('independent vertical popup alignment geometry at short heights',async({page},info)=>{
  for(const height of [300,400,600]) {
    await page.setViewportSize({width:320,height}); await page.goto(url('stress','nested')); await open(page);
    await page.getByRole('textbox',{name:'Review date',exact:true}).click();
    const popup=page.locator('.ant-picker-dropdown').filter({visible:true}); await expect(popup.locator('.ant-picker-panel')).toBeVisible(); await page.waitForTimeout(400);
    const read=()=>popup.evaluate(el=>{
      const style=getComputedStyle(el),rect=(q:string)=>document.querySelector(q)?.getBoundingClientRect().toJSON();
      return {viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},popup:el.getBoundingClientRect().toJSON(),popupStyle:{position:style.position,top:style.top,left:style.left,transform:style.transform,height:style.height,maxHeight:style.maxHeight,overflow:style.overflow},panel:rect('.ant-picker-panel'),panelContainer:rect('.ant-picker-panel-container'),trigger:rect('.ant-picker input'),today:rect('.ant-picker-now-btn'),drawer:rect('.ant-drawer-section'),document:{height:document.documentElement.scrollHeight,clientHeight:document.documentElement.clientHeight,bodyOverflow:getComputedStyle(document.body).overflow,htmlOverflow:getComputedStyle(document.documentElement).overflow,rootOverflow:getComputedStyle(document.querySelector('.ku-root')!).overflow}};
    });
    const before=await read();fs.mkdirSync(path.join(out,info.project.name),{recursive:true});
    expect.soft(before.popup.top).toBeGreaterThanOrEqual(-1); expect.soft(before.popup.bottom).toBeLessThanOrEqual(height+1);
    await expect(popup.getByRole('button',{name:'Next month',exact:true})).toHaveAccessibleName('Next month');
    const next=popup.locator('.ant-picker-header-next-btn'),heading=popup.locator('.ant-picker-header-view');
    const monthBefore=await heading.innerText(); await next.focus(); await expect(next).toBeInViewport({ratio:1}); await page.keyboard.press('Enter'); await expect(heading).not.toHaveText(monthBefore);
    await expect(popup.locator('thead th')).toHaveCount(7); expect((await popup.locator('thead th').allTextContents()).every(label=>label.trim().length>0)).toBe(true);
    await page.screenshot({path:path.join(out,info.project.name,`vertical-${height}-before-wheel.png`),animations:'allow'});
    const today=popup.getByText('Today',{exact:true});
    const footerVisible=()=>today.evaluate(el=>{const r=el.getBoundingClientRect(),p=el.closest('.ant-picker-dropdown')!.getBoundingClientRect();return r.top>=Math.max(0,p.top)&&r.bottom<=Math.min(innerHeight,p.bottom);});
    let wheelGestures=0;
    while(wheelGestures<6 && !(await footerVisible())) {
      const box=await popup.boundingBox();await page.mouse.move(box!.x+box!.width/2,box!.y+box!.height/2);await page.mouse.wheel(0,400);await page.waitForTimeout(400);wheelGestures++;
    }
    const after=await read();fs.writeFileSync(path.join(out,info.project.name,`vertical-${height}.json`),JSON.stringify({before,after,wheelGestures},null,2));
    await page.screenshot({path:path.join(out,info.project.name,`vertical-${height}-after-wheel.png`),animations:'allow'});
    expect.soft(after.popup.top).toBeGreaterThanOrEqual(-1); expect.soft(after.popup.bottom).toBeLessThanOrEqual(height+1); expect.soft(after.document.height).toBeLessThanOrEqual(height+1); expect.soft(after.scroll.y).toBeLessThanOrEqual(1);
    await expect(today).toBeInViewport({ratio:1});
    await page.screenshot({path:path.join(out,info.project.name,`vertical-${height}-footer-reached.png`),animations:'allow'});
    const currentDate=await page.evaluate(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;});
    await today.click(); const field=page.getByRole('textbox',{name:'Review date',exact:true}); await expect(field).toHaveValue(currentDate); await expect(popup).not.toBeVisible();
    await field.click(); await field.fill('2026-02-03'); await page.keyboard.press('Enter'); await expect(field).toHaveValue('2026-02-03'); await expect(popup).not.toBeVisible(); await expect(page.getByRole('dialog')).toBeVisible();
    const body=await page.locator('.ant-drawer-body').boundingBox();await page.mouse.move(body!.x+body!.width/2,body!.y+body!.height/2);await page.mouse.wheel(0,120);await page.waitForTimeout(400);
    const fieldContainer=field.locator('..').locator('..');await expect(fieldContainer).toBeInViewport({ratio:1});
    await page.screenshot({path:path.join(out,info.project.name,`vertical-${height}-keyboard-committed.png`),animations:'allow'});
  }
});
