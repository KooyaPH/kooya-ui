import { test as base, expect, chromium, firefox, webkit } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const contractFile = path.resolve('qa/ui/contracts/c-textarea-6.json');
const contractBytes = fs.readFileSync(contractFile);
const contract = JSON.parse(contractBytes.toString());
const hash = (bytes: Buffer | string) => crypto.createHash('sha256').update(bytes).digest('hex');
const contractSha256 = hash(contractBytes);
const executedSpecSha256 = hash(fs.readFileSync(path.resolve('qa/ui/tests/c-textarea-6-matrix-review.spec.ts')));
const output = path.resolve('output/playwright/c-textarea-6-independent', process.env.REVIEW_TARGET ?? 'pending-full-context-matrix');
const contextId = process.env.REVIEW_CONTEXT ?? 'catalog';
const targetId = process.env.REVIEW_BROWSER_TARGET;
if (!contextId || !contract.contexts.includes(contextId)) throw Error('Select one declared REVIEW_CONTEXT');
const selectedTarget = contract.browserTargets.find((t:any) => t.id === (targetId ?? 'pw-chromium-156'));
if (!selectedTarget) throw Error('Select one declared REVIEW_BROWSER_TARGET');
const contextDefinition = contract.contextDefinitions[contextId];
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

let processEvidence:any;
const test = base.extend({browser:[async ({browserName},use) => {
 const type = {chromium,firefox,webkit}[selectedTarget.runnerProject as 'chromium'|'firefox'|'webkit'];
 const executablePath = selectedTarget.executable ?? type.executablePath();
 const server = await type.launchServer({headless:true,executablePath});
 const browser = await type.connect(server.wsEndpoint());
 try {
  const pid=server.process().pid!;
  processEvidence=browserProcessEvidence(pid,executablePath,selectedTarget.runnerProject);
  const actualExecutable=processEvidence.actualExecutable;
  if(selectedTarget.runnerProject==='chromium')expect(actualExecutable).toBe(fs.realpathSync(executablePath));
  if(selectedTarget.executable){const released=JSON.parse(fs.readFileSync('output/playwright/released-chrome-targets.json','utf8')).targets.find((t:any)=>t.version===selectedTarget.version);expect(processEvidence.actualExecutableSha256).toBe(released.executableSha256);}
  await use(browser);
 }finally{await browser.close();await server.close();}
},{scope:'worker'}]});
const counterContrast = (color:string, background:string) => {
 const lum = (s:string) => (s.match(/[\d.]+/g)??[]).slice(0,3).map(Number).map(x=>{const n=x/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
 const a=lum(color),b=lum(background);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
};

for (const width of contract.layout.viewportWidths) for(const mode of contract.layout.modes)
 for(const density of contract.layout.densities) for(const motion of contract.layout.motion) {
 test(`${contextId} ${targetId} ${width} ${mode} ${density} ${motion}: all 11 canonical real states`, async({page,browser,browserName},info)=>{
  test.skip(!targetId || browserName !== selectedTarget.runnerProject, 'Exactly one selected engine/project');
  test.setTimeout(120_000);
  fs.mkdirSync(output,{recursive:true});const runtimeTarget=selectedTarget;
  expect(browser.version()).toBe(runtimeTarget.version);
  const provenance = await (await page.request.get('/audit-provenance.json')).json();
  expect(provenance.artifactId).toBe(process.env.AUDIT_ARTIFACT_ID);
  expect(provenance.sourceFingerprint).toBe(process.env.AUDIT_SOURCE_FINGERPRINT);
  const consoleErrors:string[]=[],resourceFailures:any[]=[];const failures:string[]=[];
  page.on('pageerror',e=>consoleErrors.push(e.message));page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
  page.on('requestfailed',r=>resourceFailures.push({url:r.url(),error:r.failure()?.errorText,occurredAt:new Date().toISOString()}));
  await page.setViewportSize({width,height:900});
  await page.emulateMedia({reducedMotion:motion});
  const query = Object.fromEntries(Object.entries({...contextDefinition.query,mode,density}).map(([key,value])=>[key,String(value)]));
  await page.goto(`/audit.html?${new URLSearchParams(query)}`);
  await expect(page.locator('[data-audit-ready="true"]')).toBeVisible();
  const composition=contextId==='two-instance'||contextId!.startsWith('preset-');
  const input=composition?page.getByRole('region',{name:'Second bio example'}).getByRole('textbox',{name:'Bio',exact:true}):page.getByRole('textbox',{name:'Bio',exact:true});
  await expect(input).toHaveCount(1);
  const first=composition?page.getByRole('region',{name:'First bio example'}).getByRole('textbox',{name:'Bio',exact:true}):undefined;
  if(first)await first.fill('First instance sentinel');
  const ids=await page.locator('textarea').evaluateAll(fields=>fields.flatMap(field=>[field.id,field.getAttribute('aria-describedby')]));
  expect(new Set(ids).size).toBe(ids.length);
  await (composition?page.getByRole('region',{name:'Second bio example'}).locator('label'):page.locator('label')).click();await expect(input).toBeFocused();await input.blur();
  await expect(input.locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " ku-root ")][1]')).toHaveAttribute('data-theme',contextDefinition.query.theme ?? 'signature');
  await page.evaluate(()=>document.fonts.ready);
  await input.evaluate(e=>{const events:any[]=[];(window as any).__textareaMatrixEvents=events;for(const type of ['beforeinput','input','keydown','keyup','focus','blur','pointerenter','pointerleave','compositionstart','compositionupdate','compositionend'])e.addEventListener(type,event=>events.push({type:event.type,time:performance.now(),key:(event as KeyboardEvent).key,inputType:(event as InputEvent).inputType,data:(event as InputEvent).data,value:(e as HTMLTextAreaElement).value}));});
  for(const state of contract.states) {
   const definition=contract.stateDefinitions[state];
   const caseId=['c-textarea-6',contextId,state,runtimeTarget.id,width,mode,density,motion,100].join('::');
   const basename=[contextId,runtimeTarget.id,width,mode,density,motion,state].join('--');
   const screenshot=path.join(output,`${basename}.png`),recordFile=path.join(output,`${basename}.json`);
   if(fs.existsSync(screenshot)||fs.existsSync(recordFile))throw Error(`Preserved case already exists: ${caseId}; select a unique attempt directory`);
   const actions:any[]=[];const act=async(name:string,work:()=>Promise<any>)=>{const start=new Date().toISOString();await work();actions.push({name,start,finish:new Date().toISOString()});};
   await page.evaluate(()=>{(window as any).__textareaMatrixEvents.length=0});
   const caseStartedAt=new Date().toISOString();let failure:string|undefined;
   try {
    await act('native-fill-empty',()=>input.fill(''));await act('blur',()=>input.blur());await act('pointer-outside',()=>page.mouse.move(0,0));
    if(state==='hover')await act('pointer-hover',()=>input.hover());
    else if(state==='keyboard-focus'){
     await act('native-focus',()=>input.focus());await act('Shift+Tab',()=>page.keyboard.press('Shift+Tab'));await act('Tab',()=>page.keyboard.press('Tab'));
    }else if(state==='multiline'){
     await act('native-fill-first-line',()=>input.fill('First line'));await act('Enter',()=>input.press('Enter'));await act('native-keyboard-insert-second-line',()=>page.keyboard.insertText('Second line'));await act('Enter',()=>input.press('Enter'));await act('native-keyboard-insert-third-line',()=>page.keyboard.insertText('Third line'));await act('blur',()=>input.blur());await act('pointer-outside',()=>page.mouse.move(0,0));
    }else if(state==='rejected-over-limit'){
     await act('native-fill-280',()=>input.fill(definition.expectedValue));await act('End',()=>input.press('End'));await act('native-keyboard-insert-x',()=>page.keyboard.insertText('x'));
    }else if(state==='cleared'){
     await act('native-fill-accepted',()=>input.fill('Previously accepted biography 😀'));await act('ControlOrMeta+A',()=>input.press('ControlOrMeta+A'));await act('Backspace',()=>input.press('Backspace'));await act('blur',()=>input.blur());await act('pointer-outside',()=>page.mouse.move(0,0));
    }else if(state==='selected-text'){
     await act('native-fill-accepted',()=>input.fill(definition.expectedValue));await act('ControlOrMeta+A',()=>input.press('ControlOrMeta+A'));
    }else if(definition.expectedValue){
     await act('native-fill-accepted',()=>input.fill(definition.expectedValue));await act('blur',()=>input.blur());await act('pointer-outside',()=>page.mouse.move(0,0));
    }
    await expect(input).toHaveValue(definition.expectedValue);
    if(first){await expect(first).toHaveValue('First instance sentinel');await expect(first).toHaveAccessibleDescription('23/280');}
    await expect(input).toHaveAttribute('aria-describedby', /.+/);
    await expect(input).toHaveAccessibleName('Bio');await expect(input).toHaveAccessibleDescription(`${definition.expectedUTF16Length}/280`);
    await expect(input).toHaveCSS('resize','none');
    if(state==='placeholder')await expect(input).toHaveAttribute('placeholder','Tell us about yourself...');
    await expect.poll(()=>input.evaluate(e=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(1);
    const stateFlags=await input.evaluate((e:HTMLTextAreaElement)=>({focus:e===document.activeElement,hover:e.matches(':hover'),start:e.selectionStart,end:e.selectionEnd,length:e.value.length}));
    expect(stateFlags.focus).toBe(definition.focus);expect(stateFlags.hover).toBe(definition.hover);
    if(state==='selected-text')expect([stateFlags.start,stateFlags.end]).toEqual([0,definition.expectedUTF16Length]);
    const geometry=await input.evaluate(e=>({rect:e.getBoundingClientRect().toJSON(),overflow:document.documentElement.scrollWidth-innerWidth}));
    expect(geometry.overflow).toBeLessThanOrEqual(1);expect(geometry.rect.left).toBeGreaterThanOrEqual(0);expect(geometry.rect.right).toBeLessThanOrEqual(width+1);
    const containment=await input.evaluate(e=>{const parent=e.closest('[data-review-container]')??e.closest('main')!;const rect=parent.getBoundingClientRect(),style=getComputedStyle(parent),field=e.getBoundingClientRect();return {parentRect:rect.toJSON(),fieldRect:field.toJSON(),contentLeft:rect.left+parseFloat(style.borderLeftWidth)+parseFloat(style.paddingLeft),contentRight:rect.right-parseFloat(style.borderRightWidth)-parseFloat(style.paddingRight)}});
    expect(containment.fieldRect.left).toBeGreaterThanOrEqual(containment.contentLeft-1);expect(containment.fieldRect.right).toBeLessThanOrEqual(containment.contentRight+1);
    expect(consoleErrors).toEqual([]);expect(resourceFailures).toEqual([]);
    // Naturally settle actual active transitions; preserve browser caret and animation rules.
    await input.evaluate(async e=>{await Promise.all(e.getAnimations().map(a=>a.finished.catch(()=>undefined)));});
   }catch(error){failure=String(error);}
   await page.screenshot({path:screenshot,fullPage:true,animations:'allow',caret:'initial'});
   const actual=await input.evaluate((e:HTMLTextAreaElement)=>{
    const count=document.getElementById(e.getAttribute('aria-describedby')??'')!;let parent:Element|null=count,bg='rgba(0, 0, 0, 0)';while(parent&&bg==='rgba(0, 0, 0, 0)'){bg=getComputedStyle(parent).backgroundColor;parent=parent.parentElement}const style=getComputedStyle(e);
    const provider=e.closest('.ku-root')!;const main=e.closest('main')!;const nested=e.closest('[data-review-container]');const bound=nested??main,br=bound.getBoundingClientRect(),bs=getComputedStyle(bound);
    return {providerProps:{theme:provider.getAttribute('data-theme'),mode:provider.getAttribute('data-mode'),density:provider.getAttribute('data-density'),reducedMotion:provider.getAttribute('data-reduced-motion')},containerGeometry:{main:main.getBoundingClientRect().toJSON(),nested:nested?.getBoundingClientRect().toJSON()??null,nestedGrid:nested?getComputedStyle(nested).gridTemplateColumns:null,contentBox:{left:br.left+parseFloat(bs.borderLeftWidth)+parseFloat(bs.paddingLeft),right:br.right-parseFloat(bs.borderRightWidth)-parseFloat(bs.paddingRight)}},value:e.value,length:e.value.length,counter:count.textContent,controlId:e.id,descriptionId:count.id,labelTexts:Array.from(e.labels??[]).map(l=>l.textContent),focus:document.activeElement===e,hover:e.matches(':hover'),selection:[e.selectionStart,e.selectionEnd],geometry:{rect:e.getBoundingClientRect().toJSON(),clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,clientWidth:e.clientWidth,scrollWidth:e.scrollWidth,viewport:{width:innerWidth,height:innerHeight},document:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}},styles:{font:style.font,fontFamily:style.fontFamily,lineHeight:style.lineHeight,color:style.color,background:style.backgroundColor,border:style.borderColor,boxShadow:style.boxShadow,transitionProperty:style.transitionProperty,resize:style.resize},counterStyle:{color:getComputedStyle(count).color,background:bg},events:(window as any).__textareaMatrixEvents};
   });
   const ratio=counterContrast(actual.counterStyle.color,actual.counterStyle.background);
   if(ratio<4.5&&!failure)failure=`Counter contrast ${ratio} below4.5`;
   if(actual.events.length===0&&!failure)failure='No actual native input/focus/pointer events recorded';
   const record={schemaVersion:2,item:'c-textarea-6',context:contextId,processEvidence,caseId,state,targetId:runtimeTarget.id,runnerProject:browserName,runtimeVersion:browser.version(),channel:runtimeTarget.channel,width,height:900,mode,density,motion,zoom:100,fixtureQuery:query,firstInstanceSentinel:first?await first.inputValue():null,expectedProps:{state:definition,context:contextDefinition},actions,actualNativeEvents:actual.events,actualValue:actual.value,counter:actual.counter,accessibleName:actual.labelTexts.join(' '),accessibleDescription:actual.counter,focus:actual.focus,hover:actual.hover,selection:actual.selection,geometry:actual.geometry,styles:actual.styles,actualProviderProps:actual.providerProps,actualContainerGeometry:actual.containerGeometry,counterContrast:ratio,consoleErrors:[...consoleErrors],resourceFailures:[...resourceFailures],contractSha256,executedSpecSha256,caseStartedAt,artifactId:provenance.artifactId,sourceFingerprint:provenance.sourceFingerprint,capturedAt:new Date().toISOString(),screenshotPath:screenshot,screenshotSha256:hash(fs.readFileSync(screenshot)),assertions:failure?'failed':'passed',failure:failure??null,review:{status:'uninspected',reviewer:'/root/textarea_independent_review'}};
   fs.writeFileSync(recordFile,JSON.stringify(record,null,2));
   if(failure)failures.push(`${caseId}: ${failure}`);
  }
  if(failures.length)throw Error(failures.join('\n'));
 });
}
