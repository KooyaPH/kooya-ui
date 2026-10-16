import { test, expect, chromium, firefox, webkit } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const hash = (bytes:Buffer|string) => crypto.createHash('sha256').update(bytes).digest('hex');
function browserProcessEvidence(launcherPid:number, requestedExecutable:string, engine:string) {
 const snapshot=new Map<number,any>();
 for(const name of fs.readdirSync('/proc').filter(x=>/^\d+$/.test(x))){
  try{const pid=Number(name),stat=fs.readFileSync(`/proc/${pid}/stat`,'utf8');const ppid=Number(stat.slice(stat.lastIndexOf(')')+2).split(' ')[1]);snapshot.set(pid,{pid,ppid});}catch{/* Process exited before observation. */}
 }
 const descendants=new Set<number>([launcherPid]);let changed=true;while(changed){changed=false;for(const x of snapshot.values())if(descendants.has(x.ppid)&&!descendants.has(x.pid)){descendants.add(x.pid);changed=true;}}
 const processes=Array.from(descendants).map(pid=>{try{const executable=fs.realpathSync(`/proc/${pid}/exe`);return {...snapshot.get(pid),pid,executable,executableSha256:hash(fs.readFileSync(`/proc/${pid}/exe`)),commandLine:fs.readFileSync(`/proc/${pid}/cmdline`).toString().split('\0').filter(Boolean)};}catch{return {pid,exitedBeforeExecutableRead:true};}});
 const launcher=processes.find(p=>p.pid===launcherPid)!;
 const actual=engine==='webkit'?processes.find(p=>p.executable?.endsWith('/minibrowser-wpe/bin/MiniBrowser')):launcher;
 if(!actual?.executable)throw Error('Actual browser engine process was not observed');
 if(engine==='webkit'&&!actual.executable.startsWith(fs.realpathSync(path.dirname(requestedExecutable))+'/'))throw Error('WebKit process outside requested bundle');
 return {launcherPid,launcher,actualEnginePid:actual.pid,actualExecutable:actual.executable,actualExecutableSha256:actual.executableSha256,actualCommandLine:actual.commandLine,requestedExecutable,requestedExecutableSha256:hash(fs.readFileSync(requestedExecutable)),processes,observedAt:new Date().toISOString()};
}

const out = path.resolve('output/playwright/c-textarea-6-independent', process.env.REVIEW_TARGET ?? 'engines');
const bio = (p: any) => p.getByRole('textbox', { name: 'Bio', exact: true });
const settings = (p: any, mode: string, density: string) => p.evaluate(({ mode, density }: any) => window.postMessage({type:'kooya-preview-settings',mode,density},location.origin), {mode,density});
async function capture(p: any, name: string, records: any[]) {
  fs.mkdirSync(out, { recursive: true });
  const file = path.join(out, `${name}.png`);
  await p.screenshot({path:file, fullPage: false});
  records.push({name, screenshot:file, sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'), url:p.url(), geometry:await bio(p).evaluate((e: HTMLTextAreaElement)=>({width:innerWidth,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,value:e.value,selection:[e.selectionStart,e.selectionEnd],focused:document.activeElement===e,documentOverflow:document.documentElement.scrollWidth-innerWidth,rect:e.getBoundingClientRect().toJSON()}))});
}

test('independent focused stress, delayed fonts, rejection, and container props', async ({page, browserName, browser, context}) => {
  const records:any[] = [], errors:string[] = [], resources:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('requestfailed',r=>resources.push(`${r.url()}: ${r.failure()?.errorText}`));
  let releaseFonts!:()=>void; const fontGate=new Promise<void>(resolve=>{releaseFonts=resolve});
  await page.route(/\.woff2?(\?|$)/, async route=>{await fontGate;await route.continue();});
  await page.setViewportSize({width:320,height:900});
  await page.goto('/audit.html?item=c-textarea-6&mode=dark&density=comfortable&container=180',{waitUntil:'domcontentloaded'});
  await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
  const value=('Line 😀 e\u0301 עברית 中\n').repeat(20).slice(0,280);
  await bio(page).fill(value);
  await bio(page).focus();
  await bio(page).press('ControlOrMeta+Home');
  await bio(page).press('ArrowRight');
  await bio(page).press('Shift+ArrowRight');
  const selection=await bio(page).evaluate((e:HTMLTextAreaElement)=>[e.selectionStart,e.selectionEnd]);
  const fontStatusBefore=await page.evaluate(()=>document.fonts.status);
  await capture(page,`${browserName}-delayed-font-focused`,records);releaseFonts();
  await page.evaluate(()=>document.fonts.ready);
  records.push({fontStatusBefore,fontStatusAfter:await page.evaluate(()=>document.fonts.status)});
  await capture(page,`${browserName}-font-ready-focused`,records);
  for (const [mode,density,motion] of [['light','compact','reduce'],['dark','comfortable','no-preference']] as const) {
    await settings(page,mode,density); await expect(page.locator('html')).toHaveAttribute('data-density',density);
    await page.emulateMedia({reducedMotion:motion});
    await expect(bio(page)).toHaveValue(value); await expect(bio(page)).toBeFocused();
    expect(await bio(page).evaluate((e:HTMLTextAreaElement)=>[e.selectionStart,e.selectionEnd])).toEqual(selection);
    await expect.poll(()=>bio(page).evaluate((e:HTMLTextAreaElement)=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(1);
    await capture(page,`${browserName}-${mode}-${density}-focused-selection-motion`,records);
  }
  await bio(page).press('ArrowRight'); await page.keyboard.insertText('Z');
  expect(await bio(page).inputValue()).toBe(value); // Whole edit exceeds 280.
  await capture(page,`${browserName}-rejected-keyboard-insert`,records);
  if(browserName==='chromium') {
    await context.grantPermissions(['clipboard-read','clipboard-write']);
    await page.evaluate(()=>navigator.clipboard.writeText('界'.repeat(512)));
    await bio(page).press('ControlOrMeta+A'); await bio(page).press('ControlOrMeta+V');
    await expect(bio(page)).toHaveValue(value);
    await capture(page,`${browserName}-actual-512-unbroken-paste-rejected`,records);
  }
  await bio(page).fill('\n'.repeat(279)+'z');
  await expect.poll(()=>bio(page).evaluate((e:HTMLTextAreaElement)=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(1);
  await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
  await expect(page.getByText('280/280',{exact:true})).toBeVisible();
  await capture(page,`${browserName}-279-newlines-bottom`,records);
  // Genuine container prop at navigation, no live DOM width/text injection.
  for(const container of [180,240,320]) {
    await page.goto(`/audit.html?item=c-textarea-6&container=${container}&mode=light&density=compact`);
    await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
    await bio(page).fill('界'.repeat(280));
    await expect.poll(()=>bio(page).evaluate((e:HTMLTextAreaElement)=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(1);
    await capture(page,`${browserName}-real-container-${container}-unicode`,records);
  }
  expect(errors).toEqual([]);expect(resources).toEqual([]);
  fs.writeFileSync(path.join(out,`${browserName}-fresh-records.json`),JSON.stringify({browser:browser.version(),errors,resources,records},null,2));
});

test('independent genuine native zoom rendering', async ({browserName}) => {
 test.skip(browserName!=='chromium','Native zoom proof Chromium only');
 const extension=path.resolve('qa/ui/extension');fs.mkdirSync(out,{recursive:true});
 const ctx=await chromium.launchPersistentContext(path.join(out,'native-profile'),{headless:true,channel:'chromium',viewport:null,args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--window-size=1280,900']});
 try {
  const worker=ctx.serviceWorkers()[0]??await ctx.waitForEvent('serviceworker');const page=ctx.pages()[0]??await ctx.newPage();const baseURL=process.env.AUDIT_BASE_URL??'http://127.0.0.1:5303';
  await page.goto(`${baseURL}/audit.html?item=c-textarea-6&mode=dark`);await bio(page).fill('😀'.repeat(139)+'z!');const records=[];
  for(const zoom of [1,2,4]){
   const proof=await worker.evaluate(async({zoom,baseURL})=>{const api=(globalThis as any).chrome;const tabs=await api.tabs.query({url:`${baseURL}/*`});if(tabs.length!==1)throw Error('Owned tab count');await api.tabs.setZoomSettings(tabs[0].id,{mode:'automatic',scope:'per-tab'});await api.tabs.setZoom(tabs[0].id,zoom);return {actualZoom:await api.tabs.getZoom(tabs[0].id),url:tabs[0].url};},{zoom,baseURL});expect(proof.actualZoom).toBeCloseTo(zoom,8);
   await expect(bio(page)).toHaveValue('😀'.repeat(139)+'z!');await expect.poll(()=>bio(page).evaluate(e=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(1);
   const cdp=await ctx.newCDPSession(page);const png=await cdp.send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});await cdp.detach();
   const file=path.join(out,`native-${zoom*100}.png`);fs.writeFileSync(file,Buffer.from(png.data,'base64'));records.push({...proof,browser:ctx.browser()?.version(),screenshot:file,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),geometry:await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,dpr:devicePixelRatio}))});
  if(zoom===4){await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));const session=await ctx.newCDPSession(page);const bottom=await session.send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});await session.detach();const bottomFile=path.join(out,'native-400-bottom.png');fs.writeFileSync(bottomFile,Buffer.from(bottom.data,'base64'));records.push({actualZoom:proof.actualZoom,screenshot:bottomFile,sha256:crypto.createHash('sha256').update(fs.readFileSync(bottomFile)).digest('hex'),bottom:await bio(page).evaluate(e=>e.getBoundingClientRect().bottom),viewport:await page.evaluate(()=>innerHeight)});}
  }fs.writeFileSync(path.join(out,'native-zoom-proof.json'),JSON.stringify(records,null,2));
 }finally{await ctx.close();}
});

test('appearance transition keeps accepted text readable on every sampled frame', async ({page,browserName})=>{
 const records:any[]=[];await page.goto('/audit.html?item=c-textarea-6&mode=dark&container=180');await bio(page).fill('Visible multiline biography\n'.repeat(10));await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(300);
 const samples=await page.evaluate(async()=>{
  const e=document.querySelector('textarea')!;const samples:any[]=[];const start=performance.now();
  const lum=(s:string)=>{const rgb=(s.match(/[\d.]+/g)??[]).slice(0,3).map(Number);return rgb.map(x=>{const n=x/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0)};
  const done=new Promise<void>(resolve=>{function frame(){const s=getComputedStyle(e);const a=lum(s.color),b=lum(s.backgroundColor);samples.push({elapsed:performance.now()-start,color:s.color,background:s.backgroundColor,contrast:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),duration:s.transitionDuration,property:s.transitionProperty});if(performance.now()-start<400)requestAnimationFrame(frame);else resolve()}requestAnimationFrame(frame)});
  window.postMessage({type:'kooya-preview-settings',mode:'light',density:'compact'},location.origin);await done;return samples;
 });
 await capture(page,`${browserName}-appearance-transition-settled`,records);fs.writeFileSync(path.join(out,`${browserName}-temporal-contrast.json`),JSON.stringify({samples,records},null,2));
 expect(Math.min(...samples.map((s:any)=>s.contrast)),'Every animation frame must retain AA text contrast').toBeGreaterThanOrEqual(4.5);
});

test('two actual instances keep IDs names descriptions and label focus independent', async({page,browserName,browser})=>{
 fs.mkdirSync(out,{recursive:true});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/audit.html?item=c-textarea-6-review&fixture=real&mode=light&container=360');
 await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
 const first=page.getByRole('region',{name:'First bio example'}),second=page.getByRole('region',{name:'Second bio example'});
 const one=first.locator('textarea'),two=second.locator('textarea');
 await two.fill('Second bio only');await second.getByText('Bio',{exact:true}).click();
 const details=await page.evaluate(()=>Array.from(document.querySelectorAll('textarea')).map(e=>({id:e.id,value:e.value,labelTexts:Array.from(e.labels??[]).map(l=>l.textContent),descriptionId:e.getAttribute('aria-describedby'),descriptionText:document.getElementById(e.getAttribute('aria-describedby')??'')?.textContent,focused:document.activeElement===e})));
 const screenshot=path.join(out,`${browserName}-two-instance-second-edited.png`);await page.screenshot({path:screenshot,fullPage:true});
 fs.writeFileSync(path.join(out,`${browserName}-two-instance.json`),JSON.stringify({browser:browser.version(),details,errors,screenshot,sha256:crypto.createHash('sha256').update(fs.readFileSync(screenshot)).digest('hex'),source:crypto.createHash('sha256').update(fs.readFileSync('apps/playground/src/reui/overrides/c-textarea-6.tsx')).digest('hex')},null,2));
 await expect(one).toHaveValue('');await expect(two).toHaveValue('Second bio only');
 expect.soft(new Set(details.map(d=>d.id)).size,'Control IDs must be unique').toBe(2);
 expect.soft(new Set(details.map(d=>d.descriptionId)).size,'Counter IDs must be unique').toBe(2);
 await expect.soft(one).toHaveAccessibleName('Bio');await expect.soft(one).toHaveAccessibleDescription('0/280');
 await expect.soft(two).toHaveAccessibleName('Bio');await expect.soft(two).toHaveAccessibleDescription('15/280');
 expect.soft(details.map(d=>d.labelTexts),'Exactly one actual label per control').toEqual([['Bio'],['Bio']]);
 await expect.soft(two).toBeFocused();expect(errors).toEqual([]);
});

test('four real theme presets preserve textarea geometry and counter contrast',async({page,browserName,browser})=>{
 fs.mkdirSync(out,{recursive:true});const records:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:390,height:1000});
 for(const theme of ['signature','canvas','client','mosaic']) for(const mode of ['light','dark']){
  await page.goto(`/audit.html?item=c-textarea-6-review&fixture=real&container=360&theme=${theme}&mode=${mode}&density=compact`);await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
  await expect(page.locator(`[data-review-preset="${theme}"]`)).toHaveAttribute('data-theme',theme);
  const second=page.getByRole('region',{name:'Second bio example'}),input=second.locator('textarea');
  const contrasts=[];
  for(const n of [0,260,280]){
   await input.fill('界'.repeat(n));await expect.poll(()=>input.evaluate(e=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(1);
   const ratio=await second.getByText(`${n}/280`,{exact:true}).evaluate(e=>{
    const lum=(s:string)=>{const rgb=(s.match(/[\d.]+/g)??[]).slice(0,3).map(Number);return rgb.map(x=>{const n=x/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0)};
    let p:Element|null=e,bg='rgba(0, 0, 0, 0)';while(p&&bg==='rgba(0, 0, 0, 0)'){bg=getComputedStyle(p).backgroundColor;p=p.parentElement}const a=lum(getComputedStyle(e).color),b=lum(bg);return {ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),color:getComputedStyle(e).color,background:bg};});
   contrasts.push({n,...ratio});expect.soft(ratio.ratio,`${theme} ${mode} ${n}/280`).toBeGreaterThanOrEqual(4.5);
  }
  const screenshot=path.join(out,`${browserName}-${theme}-${mode}-two-instance-limit.png`);await page.screenshot({path:screenshot,fullPage:true});records.push({theme,mode,contrasts,screenshot,sha256:crypto.createHash('sha256').update(fs.readFileSync(screenshot)).digest('hex'),geometry:await input.evaluate(e=>({scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,width:e.getBoundingClientRect().width,documentOverflow:document.documentElement.scrollWidth-innerWidth}))});
 }
 fs.writeFileSync(path.join(out,`${browserName}-four-presets.json`),JSON.stringify({browser:browser.version(),errors,records},null,2));expect(errors).toEqual([]);
});

test('live user text-spacing and font loading preserve accepted dirty content', async ({page,browserName,browser}) => {
 test.setTimeout(240_000);fs.mkdirSync(out,{recursive:true});
 const errors:string[]=[],resources:any[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>resources.push({url:r.url(),error:r.failure()?.errorText,time:new Date().toISOString()}));
 const provenance=await (await page.request.get('/audit-provenance.json')).json();
 const records:any[]=[],images:any[]=[],captured=new Set<string>();
 const values={unbroken:'a'.repeat(280),sentence:('Wide words move across lines. ').repeat(10).slice(0,280),rtlCjk:('עברית 中文 字界 😀 e\u0301 ').repeat(20).slice(0,280)};
 const overrides={letter:'letter-spacing:.12em !important;',word:'word-spacing:.16em !important;',line:'line-height:1.5 !important;',combined:'letter-spacing:.12em !important;word-spacing:.16em !important;line-height:1.5 !important;'};
 const measure=()=>bio(page).evaluate((e:HTMLTextAreaElement)=>{const s=getComputedStyle(e),parent=e.closest('.max-w-xs')!;return {value:e.value,length:e.value.length,counter:document.getElementById(e.getAttribute('aria-describedby')??'')?.textContent,selection:[e.selectionStart,e.selectionEnd],focused:document.activeElement===e,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,clientWidth:e.clientWidth,scrollWidth:e.scrollWidth,inlineHeight:e.style.height,rect:e.getBoundingClientRect().toJSON(),container:parent.getBoundingClientRect().toJSON(),styles:{fontFamily:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing,wordSpacing:s.wordSpacing,paddingTop:s.paddingTop,paddingBottom:s.paddingBottom,fieldSizing:s.getPropertyValue('field-sizing'),minHeight:s.minHeight,overflow:s.overflow}}});
 async function shot(name:string){const file=path.join(out,`${browserName}-${name}.png`);await page.screenshot({path:file,fullPage:true});images.push({name,path:file,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')});}
 let nativeSupport=false;
 for(const width of [180,240])for(const mode of ['light','dark'])for(const density of ['comfortable','compact']){
  await page.goto(`/audit.html?item=c-textarea-6&fixture=catalog&container=${width}&mode=${mode}&density=${density}`);await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);nativeSupport=await page.evaluate(()=>CSS.supports('field-sizing','content'));
  for(const [content,value] of Object.entries(values))for(const [spacing,css] of Object.entries(overrides)){
   await bio(page).fill(value);await bio(page).focus();await bio(page).press('ControlOrMeta+Home');await bio(page).press('Shift+ArrowRight');await page.waitForTimeout(60);const before=await measure();
   const key=`${content}-${spacing}`;const keep=!captured.has(key)&&content==='unbroken'&&spacing==='combined';if(keep)await shot(`${width}-${mode}-${density}-${key}-before`);
   const style=await page.addStyleTag({content:`textarea {${css}}`});await page.waitForTimeout(160);const after=await measure();if(keep){await shot(`${width}-${mode}-${density}-${key}-after`);captured.add(key);}
   records.push({kind:'user-text-spacing',width,mode,density,content,spacing,css,before,after,overflow:after.scrollHeight-after.clientHeight,valuePreserved:after.value===before.value,counterPreserved:after.counter===before.counter,selectionPreserved:JSON.stringify(before.selection)===JSON.stringify(after.selection)});await style.evaluate((e:HTMLStyleElement)=>e.remove());await page.waitForTimeout(40);
  }
 }
 // A genuine font request begins only after the original fonts.ready has settled.
 await page.goto('/audit.html?item=c-textarea-6&container=180&mode=light&density=compact');await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
 await bio(page).fill(values.sentence);await bio(page).focus();await bio(page).press('ControlOrMeta+Home');await bio(page).press('Shift+ArrowRight');await page.waitForTimeout(100);
 const fontBefore=await measure();await shot('late-font-before');
 let release!:()=>void;const gate=new Promise<void>(r=>release=r);await page.route('**/excalidraw-assets/fonts/Virgil/Virgil-Regular.woff2?textarea-review-late',async route=>{await gate;await route.continue();});
 await page.addStyleTag({content:"@font-face {font-family:TextareaReviewLate;src:url('/excalidraw-assets/fonts/Virgil/Virgil-Regular.woff2?textarea-review-late') format('woff2');font-display:swap;} textarea {font-family:TextareaReviewLate,'DM Sans Variable',sans-serif !important;}"});
 await page.waitForTimeout(100);const fontDuring=await measure(),fontLoadingStatus=await page.evaluate(()=>document.fonts.status);release();await page.evaluate(()=>document.fonts.load('14px TextareaReviewLate'));await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(150);const fontAfter=await measure();await shot('late-font-after');records.push({kind:'late-font',before:fontBefore,during:fontDuring,after:fontAfter,fontLoadingStatus,fontReadyStatus:await page.evaluate(()=>document.fonts.status),overflow:fontAfter.scrollHeight-fontAfter.clientHeight});
 const native:any={supported:nativeSupport};
 if(nativeSupport){
  await page.addStyleTag({content:'textarea {field-sizing:content !important;height:auto !important;}'});await bio(page).fill('');await page.waitForTimeout(100);native.empty=await measure();await bio(page).fill(values.unbroken);await page.waitForTimeout(100);native.dirty=await measure();await page.addStyleTag({content:`textarea {${overrides.combined}}`});await page.waitForTimeout(100);native.spaced=await measure();await shot('native-field-sizing-spaced');
 }
 fs.writeFileSync(path.join(out,`${browserName}-live-spacing-font.json`),JSON.stringify({browser:browser.version(),provenance,executedSpecSha256:crypto.createHash('sha256').update(fs.readFileSync('qa/ui/tests/c-textarea-6-review.spec.ts')).digest('hex'),native,records,images,errors,resources},null,2));
 expect(errors).toEqual([]);expect(resources).toEqual([]);
 const failures=records.filter(r=>r.overflow>1||r.valuePreserved===false||r.counterPreserved===false||r.selectionPreserved===false);
 expect(failures.map(r=>({kind:r.kind,width:r.width,mode:r.mode,density:r.density,content:r.content,spacing:r.spacing,overflow:r.overflow})),'Live spacing/font changes must preserve complete accepted text without clipping').toEqual([]);
});

test('native content sizing support and exact two-row density minimum', async ({page,browserName,browser})=>{
 test.setTimeout(90_000);fs.mkdirSync(out,{recursive:true});const records:any[]=[],errors:any[]=[];
 const run=async(p:any,target:string,version:string)=>{
  p.on('pageerror',(e:any)=>errors.push({target,error:e.message}));p.on('requestfailed',(r:any)=>errors.push({target,url:r.url(),error:r.failure()?.errorText}));
  for(const density of ['comfortable','compact']){
   await p.goto(`${process.env.AUDIT_BASE_URL??'http://127.0.0.1:5306'}/audit.html?item=c-textarea-6&fixture=catalog&mode=light&density=${density}`);await expect(p.locator('[data-audit-ready="true"]')).toBeVisible();await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(100);
   const measure=()=>bio(p).evaluate((e:HTMLTextAreaElement)=>{const s=getComputedStyle(e);return {supports:CSS.supports('field-sizing','content'),value:e.value,counter:document.getElementById(e.getAttribute('aria-describedby')??'')?.textContent,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,outerHeight:e.getBoundingClientRect().height,inlineHeight:e.style.height,fontSize:s.fontSize,lineHeight:s.lineHeight,paddingTop:s.paddingTop,paddingBottom:s.paddingBottom,borderTop:s.borderTopWidth,borderBottom:s.borderBottomWidth,minBlockSize:s.minBlockSize,fieldSizing:s.getPropertyValue('field-sizing'),antInputPaddingBlock:s.getPropertyValue('--ant-input-padding-block'),antLineWidth:s.getPropertyValue('--ant-line-width'),antInputLineWidth:s.getPropertyValue('--ant-input-line-width'),antInputPaddingInline:s.getPropertyValue('--ant-input-padding-inline'),height:s.height,rows:e.rows}});
   const before=await measure();await p.addStyleTag({content:'textarea {field-sizing:content !important;height:auto !important;min-block-size:calc(2lh + 2 * var(--ant-input-padding-block) + 2 * var(--ant-line-width)) !important;}'});await p.waitForTimeout(120);const empty=await measure();
   await bio(p).fill('a'.repeat(280));await p.waitForTimeout(100);const dirty=await measure();await p.addStyleTag({content:'textarea {letter-spacing:.12em !important;word-spacing:.16em !important;line-height:1.5 !important;}'});await p.waitForTimeout(100);const spaced=await measure();await bio(p).fill('');await p.waitForTimeout(100);const cleared=await measure();
   const file=path.join(out,`${target}-${density}-native-two-row-empty.png`);await p.screenshot({path:file,fullPage:true});records.push({target,version,density,before,empty,dirty,spaced,cleared,screenshot:file,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')});
  }
 };
 await run(page,browserName,browser.version());
 if(browserName==='chromium'){
  const targets=JSON.parse(fs.readFileSync('output/playwright/released-chrome-targets.json','utf8')).targets;
  for(const target of targets){expect(crypto.createHash('sha256').update(fs.readFileSync(target.executable)).digest('hex')).toBe(target.executableSha256);const b=await chromium.launch({headless:true,executablePath:target.executable});try{expect(b.version()).toBe(target.version);const p=await b.newPage({viewport:{width:1280,height:900}});await run(p,`chrome-${target.major}`,b.version());}finally{await b.close();}}
 }
 fs.writeFileSync(path.join(out,`${browserName}-native-two-row-proof.json`),JSON.stringify({records,errors,executedSpecSha256:crypto.createHash('sha256').update(fs.readFileSync('qa/ui/tests/c-textarea-6-review.spec.ts')).digest('hex')},null,2));expect(errors).toEqual([]);
 for(const r of records){expect(r.empty.supports).toBe(true);for(const [state,g] of Object.entries(r).filter(([k])=>['empty','dirty','spaced','cleared'].includes(k)) as any){expect(g.scrollHeight-g.clientHeight,`${r.target} ${r.density} ${state} fit`).toBeLessThanOrEqual(1);if(state==='empty'||state==='cleared')expect(g.outerHeight,`${r.target} ${r.density} ${state} native two-row minimum`).toBeCloseTo(2*parseFloat(g.lineHeight)+parseFloat(g.paddingTop)+parseFloat(g.paddingBottom)+parseFloat(g.borderTop)+parseFloat(g.borderBottom),0);}}
});


test('production native sizing, minimum rows, and rejected edits across six targets', async ({page,browserName,browser})=>{
 test.setTimeout(120_000);fs.mkdirSync(out,{recursive:true});const records:any[]=[],errors:any[]=[];
 const provenance=await (await page.request.get('/audit-provenance.json')).json();
 const run=async(p:any,target:string,version:string)=>{
  p.on('pageerror',(e:any)=>errors.push({target,error:e.message}));p.on('requestfailed',(r:any)=>errors.push({target,url:r.url(),error:r.failure()?.errorText}));
  for(const density of ['comfortable','compact']){
   await p.goto(`${process.env.AUDIT_BASE_URL}/audit.html?item=c-textarea-6&fixture=catalog&mode=light&density=${density}`);await expect(p.locator('[data-audit-ready="true"]')).toBeVisible();await p.evaluate(()=>document.fonts.ready);
   const measure=()=>bio(p).evaluate((e:HTMLTextAreaElement)=>{const s=getComputedStyle(e);return {supports:CSS.supports('field-sizing','content'),value:e.value,counter:document.getElementById(e.getAttribute('aria-describedby')??'')?.textContent,selection:[e.selectionStart,e.selectionEnd],focused:document.activeElement===e,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,outerHeight:e.getBoundingClientRect().height,inlineHeight:e.style.height,inlineFieldSizing:e.style.getPropertyValue('field-sizing'),lineHeight:s.lineHeight,paddingTop:s.paddingTop,paddingBottom:s.paddingBottom,borderTop:s.borderTopWidth,borderBottom:s.borderBottomWidth,minBlockSize:s.minBlockSize,fieldSizing:s.getPropertyValue('field-sizing'),antInputPaddingBlock:s.getPropertyValue('--ant-input-padding-block'),antLineWidth:s.getPropertyValue('--ant-line-width'),antInputLineWidth:s.getPropertyValue('--ant-input-line-width')}});
   const empty=await measure();await bio(p).fill('a'.repeat(280));await bio(p).focus();await bio(p).press('ControlOrMeta+Home');await bio(p).press('Shift+ArrowRight');const dirty=await measure();
   await p.addStyleTag({content:'textarea {letter-spacing:.12em !important;word-spacing:.16em !important;line-height:1.5 !important;}'});await p.waitForTimeout(120);const spaced=await measure();
   await bio(p).press('ControlOrMeta+End');await p.keyboard.insertText('Z');const rejectedInsert=await measure();await bio(p).press('ControlOrMeta+A');await p.keyboard.insertText('界'.repeat(512));const rejectedReplacement=await measure();
   const cases:any={empty,dirty,spaced,rejectedInsert,rejectedReplacement};
   for(const [state,g] of Object.entries(cases) as any){expect(g.fieldSizing,`${target} ${density} ${state} actual production branch`).toBe('content');expect(g.inlineHeight).toBe('auto');expect(g.scrollHeight-g.clientHeight,`${target} ${density} ${state} fit`).toBeLessThanOrEqual(1);if(state!=='empty'){expect(g.value).toBe('a'.repeat(280));expect(g.counter).toBe('280/280');}}
   expect(spaced.selection).toEqual(dirty.selection);expect(spaced.focused).toBe(true);
   const dirtyFile=path.join(out,`${target}-${density}-production-spaced-rejected.png`);await p.screenshot({path:dirtyFile,fullPage:true});
   await bio(p).fill('');await p.waitForTimeout(80);const cleared=await measure();const emptyFile=path.join(out,`${target}-${density}-production-cleared.png`);await p.screenshot({path:emptyFile,fullPage:true});
   for(const g of [empty,cleared])expect(g.outerHeight).toBeCloseTo(2*parseFloat(g.lineHeight)+parseFloat(g.paddingTop)+parseFloat(g.paddingBottom)+parseFloat(g.borderTop)+parseFloat(g.borderBottom),0);
   records.push({target,version,density,...cases,cleared,images:[dirtyFile,emptyFile].map(file=>({path:file,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')}))});
  }
 };
 await run(page,browserName,browser.version());if(browserName==='chromium'){for(const target of JSON.parse(fs.readFileSync('output/playwright/released-chrome-targets.json','utf8')).targets){expect(crypto.createHash('sha256').update(fs.readFileSync(target.executable)).digest('hex')).toBe(target.executableSha256);const b=await chromium.launch({headless:true,executablePath:target.executable});try{expect(b.version()).toBe(target.version);await run(await b.newPage({viewport:{width:1280,height:900}}),`chrome-${target.major}`,b.version());}finally{await b.close();}}}
 fs.writeFileSync(path.join(out,`${browserName}-production-native-proof.json`),JSON.stringify({provenance,records,errors,executedSpecSha256:crypto.createHash('sha256').update(fs.readFileSync('qa/ui/tests/c-textarea-6-review.spec.ts')).digest('hex')},null,2));expect(errors).toEqual([]);
});


test('unsupported native sizing emulation exercises measured production fallback',async({page,browserName,browser})=>{
 test.skip(browserName!=='chromium','Explicit Chromium emulation is not old-engine coverage');test.setTimeout(90_000);fs.mkdirSync(out,{recursive:true});const records:any[]=[],errors:any[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push({url:r.url(),error:r.failure()?.errorText}));
 await page.addInitScript(()=>{const original=CSS.supports.bind(CSS);CSS.supports=((...args:any[])=>args.some(v=>typeof v==='string'&&v.includes('field-sizing'))?false:(original as any)(...args)) as typeof CSS.supports;});
 let release!:()=>void;const gate=new Promise<void>(r=>release=r);let interceptedFonts=0;await page.route(/\.woff2?(\?|$)/,async route=>{interceptedFonts++;await gate;await route.continue();});
 await page.setViewportSize({width:390,height:900});await page.goto('/audit.html?item=c-textarea-6&mode=light&density=comfortable',{waitUntil:'domcontentloaded'});await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();await page.addStyleTag({content:'textarea {field-sizing:fixed !important;}'});
 const measure=()=>bio(page).evaluate((e:HTMLTextAreaElement)=>({supports:CSS.supports('field-sizing','content'),value:e.value,counter:document.getElementById(e.getAttribute('aria-describedby')??'')?.textContent,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,inlineHeight:e.style.height,fieldSizing:getComputedStyle(e).getPropertyValue('field-sizing'),fontStatus:document.fonts.status}));
 const save=async(state:string)=>{await page.waitForTimeout(120);const actual=await measure();const file=path.join(out,`chromium-emulated-fallback-${state}.png`);const cdp=await page.context().newCDPSession(page);try{const png=await cdp.send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});fs.writeFileSync(file,Buffer.from(png.data,'base64'));}finally{await cdp.detach();}records.push({state,...actual,screenshot:file,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')});expect(actual.supports).toBe(false);expect(actual.fieldSizing).toBe('fixed');expect(actual.inlineHeight).toMatch(/^\d+(\.\d+)?px$/);expect(actual.scrollHeight-actual.clientHeight).toBeLessThanOrEqual(1);return actual;};
 const value='a'.repeat(280);await bio(page).fill(value);const accepted=await save('accepted');await bio(page).press('ControlOrMeta+End');await page.keyboard.insertText('Z');await expect(bio(page)).toHaveValue(value);await save('rejected');await page.setViewportSize({width:320,height:900});const narrow=await save('container-shrink');expect(narrow.width).toBeLessThan(accepted.width);expect(narrow.height).toBeGreaterThanOrEqual(accepted.height);
 await settings(page,'dark','compact');await expect(page.locator('html')).toHaveAttribute('data-density','compact');await save('density-change');const fontStatusBefore=await page.evaluate(()=>document.fonts.status);release();await page.evaluate(()=>document.fonts.ready);await save('fonts-ready');await bio(page).fill('short');const deleted=await save('deleted');expect(deleted.height).toBeLessThan(narrow.height);await bio(page).fill('');await save('cleared');
 fs.writeFileSync(path.join(out,'chromium-emulated-fallback-proof.json'),JSON.stringify({browser:browser.version(),emulation:'CSS.supports(field-sizing) false plus actual field-sizing:fixed; not native unavailable-engine proof',fontStatusBefore,interceptedFonts,records,errors,executedSpecSha256:crypto.createHash('sha256').update(fs.readFileSync('qa/ui/tests/c-textarea-6-review.spec.ts')).digest('hex')},null,2));expect(errors).toEqual([]);expect(interceptedFonts).toBeGreaterThan(0);
});

test('real React dirty preset and nested container transitions retain native field identity', async ({browserName}) => {
 test.setTimeout(180_000);
 const contract=JSON.parse(fs.readFileSync('qa/ui/contracts/c-textarea-6.json','utf8'));
 const target=contract.browserTargets.find((x:any)=>x.id===process.env.REVIEW_BROWSER_TARGET);
 test.skip(!target||target.runnerProject!==browserName,'Select one exact runtime target');
 const type={chromium,firefox,webkit}[browserName];const executable=target.executable??type.executablePath();
 const server=await type.launchServer({headless:true,executablePath:executable});const browser=await type.connect(server.wsEndpoint());
 const context=await browser.newContext({viewport:{width:390,height:900},baseURL:process.env.AUDIT_BASE_URL});const page=await context.newPage();
 const records:any[]=[],errors:any[]=[];fs.mkdirSync(out,{recursive:true});
 page.on('pageerror',e=>errors.push({type:'pageerror',message:e.message,time:new Date().toISOString()}));page.on('console',m=>{if(m.type()==='error')errors.push({type:'console',message:m.text(),time:new Date().toISOString()})});page.on('requestfailed',r=>errors.push({type:'resource',url:r.url(),error:r.failure()?.errorText,time:new Date().toISOString()}));
 try {
  const processEvidence=browserProcessEvidence(server.process().pid!,executable,browserName);const actualExecutable=processEvidence.actualExecutable;
  expect(browser.version()).toBe(target.version);if(browserName==='chromium')expect(actualExecutable).toBe(fs.realpathSync(executable));
  if(target.executable){const manifest=JSON.parse(fs.readFileSync('output/playwright/released-chrome-targets.json','utf8'));expect(processEvidence.actualExecutableSha256).toBe(manifest.targets.find((t:any)=>t.version===target.version).executableSha256);}
  const provenance=await (await page.request.get('/audit-provenance.json')).json();expect(provenance.artifactId).toBe(process.env.AUDIT_ARTIFACT_ID);expect(provenance.sourceFingerprint).toBe(process.env.AUDIT_SOURCE_FINGERPRINT);
  await page.goto('/audit.html?item=c-textarea-6-review&fixture=real&controls=true&reviewContainer=320');await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
  const region=page.getByRole('region',{name:'Second bio example'}),field=region.getByRole('textbox',{name:'Bio',exact:true});const first=page.getByRole('region',{name:'First bio example'}).getByRole('textbox',{name:'Bio',exact:true});await first.fill('First instance sentinel');
  const identity=await field.elementHandle();const values=['a'.repeat(280),('Natural biography sentence with real spaces. ').repeat(9).slice(0,280),('עברית 中 😀 e\u0301 ').repeat(30).slice(0,280),('Biography line\n').repeat(30).slice(0,280)];
  for(let index=0;index<values.length;index++){
   const value=values[index];await field.fill(value);await field.press('ControlOrMeta+Home');await field.press('Shift+ArrowRight');const selection=await field.evaluate((e:HTMLTextAreaElement)=>[e.selectionStart,e.selectionEnd]);
   const operations=[...['canvas','client','mosaic','signature'].map(v=>({name:`Preset ${v}`,attribute:'data-theme',expected:v})),...[240,180,320].map(v=>({name:`Container ${v}`,attribute:'container',expected:String(v)})),...['dark','light'].map(v=>({name:`Mode ${v}`,attribute:'data-mode',expected:v})),...['compact','comfortable'].map(v=>({name:`Density ${v}`,attribute:'data-density',expected:v})),...['reduce','no-preference'].map(v=>({name:`Motion ${v}`,attribute:'data-reduced-motion',expected:String(v==='reduce')}))];
   for(const operation of operations){
    const startedAt=new Date().toISOString();if(operation.attribute==='data-reduced-motion')await page.emulateMedia({reducedMotion:operation.name.endsWith('no-preference')?'no-preference':'reduce'});else await page.getByRole('button',{name:operation.name,exact:true}).click();
    const provider=page.locator('[data-review-preset]');if(operation.attribute==='container')await expect(page.locator('[data-review-container]')).toHaveAttribute('data-review-container',operation.expected);else await expect(provider).toHaveAttribute(operation.attribute,operation.expected);
    await expect(field).toHaveValue(value);await expect(field).toHaveAccessibleDescription('280/280');await expect(field).toBeFocused();expect(await field.evaluate((e:HTMLTextAreaElement)=>[e.selectionStart,e.selectionEnd])).toEqual(selection);expect(await identity!.evaluate(e=>e.isConnected&&e===document.activeElement)).toBe(true);await expect(first).toHaveValue('First instance sentinel');await expect(first).toHaveAccessibleDescription('23/280');await expect.poll(()=>field.evaluate(e=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(1);
    const containment=await field.evaluate(e=>{const parent=e.closest('[data-review-container]')!,rect=parent.getBoundingClientRect(),style=getComputedStyle(parent),field=e.getBoundingClientRect();return {parentRect:rect.toJSON(),fieldRect:field.toJSON(),contentLeft:rect.left+parseFloat(style.borderLeftWidth)+parseFloat(style.paddingLeft),contentRight:rect.right-parseFloat(style.borderRightWidth)-parseFloat(style.paddingRight)}});
    expect(containment.fieldRect.left).toBeGreaterThanOrEqual(containment.contentLeft-1);expect(containment.fieldRect.right).toBeLessThanOrEqual(containment.contentRight+1);
    await page.mouse.move(0,0);await field.evaluate(async e=>{await Promise.all(e.getAnimations().map(a=>a.finished.catch(()=>undefined)))});
    const actual=await field.evaluate((e:HTMLTextAreaElement)=>{const provider=e.closest('.ku-root')!;const container=e.closest('[data-review-container]')!;return {value:e.value,controlId:e.id,counter:document.getElementById(e.getAttribute('aria-describedby')!)?.textContent,selection:[e.selectionStart,e.selectionEnd],focused:e===document.activeElement,rect:e.getBoundingClientRect().toJSON(),containerRect:container.getBoundingClientRect().toJSON(),containerProp:container.getAttribute('data-review-container'),clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,theme:provider.getAttribute('data-theme'),mode:provider.getAttribute('data-mode'),density:provider.getAttribute('data-density'),motion:provider.getAttribute('data-reduced-motion'),fontFamily:getComputedStyle(e).fontFamily,fieldSizing:getComputedStyle(e).getPropertyValue('field-sizing')}});
    const screenshot=path.join(out,`${target.id}-dirty-${index}-${operation.name.replace(/ /g,'-')}.png`);await page.screenshot({path:screenshot,fullPage:true,animations:'allow',caret:'initial'});records.push({containment,operation:operation.name,valueIndex:index,startedAt,capturedAt:new Date().toISOString(),actual,screenshot,screenshotSha256:crypto.createHash('sha256').update(fs.readFileSync(screenshot)).digest('hex'),review:{status:'uninspected'}});
   }
   await field.press('ControlOrMeta+End');await page.keyboard.insertText('Z');await expect(field).toHaveValue(value);await expect(field).toHaveAccessibleDescription('280/280');
  }
  fs.writeFileSync(path.join(out,`${target.id}-react-prop-transitions.json`),JSON.stringify({target,processEvidence,provenance,records,errors,executedSpecSha256:crypto.createHash('sha256').update(fs.readFileSync('qa/ui/tests/c-textarea-6-review.spec.ts')).digest('hex'),contractSha256:crypto.createHash('sha256').update(fs.readFileSync('qa/ui/contracts/c-textarea-6.json')).digest('hex'),scope:'Real prop changes and settled snapshots; temporal contrast, clipboard and OS IME remain separate obligations'},null,2));expect(errors).toEqual([]);
 }finally{await context.close();await browser.close();await server.close();}
});
