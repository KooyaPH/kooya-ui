// Focused contrast regression exposed by the dark atomic state catalog.
async(page)=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('http://127.0.0.1:5193');
 await page.getByRole('tab',{name:'Library',exact:true}).click();
 await page.getByRole('button',{name:'Workspace actions for AS',exact:true}).click();
 await page.getByRole('menuitem',{name:'Preview appearance',exact:true}).click();
 await page.getByRole('combobox',{name:'Color mode',exact:true}).click();
 await page.getByRole('option',{name:'Dark',exact:true}).click();
 await page.locator('.ant-select-dropdown:visible').waitFor({state:'hidden'});
 await page.keyboard.press('Escape');
 await page.getByRole('dialog').waitFor({state:'hidden'});
 await page.getByRole('tablist',{name:'library sections'}).getByRole('tab',{name:'Atomic catalog',exact:true}).click();
 const measure=async()=>await page.getByRole('button',{name:'Remove sample',exact:true}).evaluate(e=>{
   const s=getComputedStyle(e);const rgb=v=>v.match(/[\d.]+/g).slice(0,3).map(Number);const luminance=v=>rgb(v).map(n=>{const c=n/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4}).reduce((a,c,i)=>a+c*[.2126,.7152,.0722][i],0);const a=luminance(s.color),b=luminance(s.backgroundColor);return {text:s.color,background:s.backgroundColor,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
 });
 const results=[];
 for(const mode of ['Dark','Light']) {
  if(mode==='Light'){
   await page.getByRole('button',{name:'Workspace actions for AS',exact:true}).click();
   await page.getByRole('menuitem',{name:'Preview appearance',exact:true}).click();
   await page.getByRole('combobox',{name:'Color mode',exact:true}).click();
   await page.getByRole('option',{name:'Light',exact:true}).click();
   await page.locator('.ant-select-dropdown:visible').waitFor({state:'hidden'});
   await page.keyboard.press('Escape');
   await page.getByRole('dialog').waitFor({state:'hidden'});
  }
  for(const theme of ['mosaic','signature','canvas','client']) {
   await page.getByRole('combobox',{name:'Theme',exact:true}).selectOption(theme);
   for(const state of ['default','hover']) {
    if(state==='hover')await page.getByRole('button',{name:'Remove sample',exact:true}).hover();
    else await page.mouse.move(1,1);
    await page.waitForTimeout(220);
    const result={mode,theme,state,...await measure()};results.push(result);
    if(result.ratio<4.5)throw Error('Danger action contrast below4.5: '+JSON.stringify(result));
   }
  }
 }
 return results;
}
