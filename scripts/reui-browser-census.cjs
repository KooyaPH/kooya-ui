const fs = require("node:fs");
const inventory = JSON.parse(
  fs.readFileSync(process.cwd() + "/vendor/reui/manifest.json", "utf8"),
);
const ids = inventory.examples.map((e) => e.id);
const start = Number(process.argv[2] || 0),
  end = Number(process.argv[3] || ids.length);
const base = process.env.KOOYA_PREVIEW_URL ?? "http://127.0.0.1:5193";
const qualification = Date.now();
const script = `async (page) => {const failures=[];const issues=[];let current='';page.on('pageerror',e=>issues.push({id:current,error:e.message}));for(const id of ${JSON.stringify(ids.slice(start, end))}){current=id;try{await page.goto('${base}/?qualification=${qualification}#/preview/'+id,{waitUntil:'domcontentloaded'});await page.waitForSelector('.preview-document[data-preview-id="'+id+'"]',{state:'attached',timeout:12000});await page.waitForFunction(()=>!document.querySelector('.preview-loading'),null,{timeout:15000});if(await page.getByText('This example could not be loaded').count())failures.push(id);}catch(e){failures.push(id);issues.push({id,error:e.message});}}return {start:${start},end:${end},failures,issues};}`;
fs.writeFileSync("/tmp/reui-census-code.txt", script);
console.log("Prepared " + (end - start) + " examples");
