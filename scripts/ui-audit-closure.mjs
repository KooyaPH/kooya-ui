import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {acceptItem} from './ui-audit-ledger.mjs';
import {verifyArtifact,verifyCaseRuntime} from './ui-audit-provenance.mjs';

export function closureReport(ledger, context) {
  const issues=[];
  if (!ledger.items?.length) issues.push({scope:'inventory',reason:'Empty inventory cannot qualify a library'});
  if (context.currentFingerprint !== ledger.sourceFingerprint || context.manifest.sourceFingerprint !== ledger.sourceFingerprint) issues.push({scope:'runtime',reason:'Current inventory and immutable artifact source differ'});
  try {verifyArtifact(context.manifest,context.artifactRoot)} catch(error){issues.push({scope:'runtime',reason:error.message})}
  const missing = (context.expectedIds ?? []).filter(id=>!ledger.items?.some(i=>i.id===id));
  if (!context.expectedIds?.length || missing.length) issues.push({scope:'inventory',reason:'Fresh independently discovered denominator missing or incomplete',missing});
  for(const item of ledger.items ?? []) {
    if(item.status !== 'accepted-local'){issues.push({scope:item.id,reason:`Item is ${item.status}; individual qualification incomplete`});continue}
    try {
      const contract=context.contracts[item.id];
      // Local gate and production runtime proof are both necessary. A unit-test
      // raster manifest or a worker's passing test count cannot close an item.
      acceptItem(item,{artifactRoot:context.evidenceRoot,currentFingerprint:context.currentFingerprint,contract,requiredBrowsers:context.requiredBrowsers});
      for(const c of item.cases){
        const target=context.targets.find(t=>t.id===c.runtimeTarget);
        const parameters=context.caseParameters[c.id];
        if(!parameters)throw Error('Canonical reviewed case parameters missing');
        for(const inspection of [c.worker,c.reviewer]) verifyCaseRuntime(inspection.runtime,{manifest:context.manifest,target,parameters});
        if(c.worker.runtime.runId===c.reviewer.runtime.runId)throw Error('Independent reviewer must execute a fresh run');
      }
    } catch(error){issues.push({scope:item.id,reason:error.message})}
  }
  for(const m of ledger.moduleRecords ?? []) {
    const record=context.moduleReviews?.[m.id];
    if(!record || record.sha256 !== m.sha256 || !record.worker || !record.reviewer || record.worker===record.reviewer || !record.observation || record.status !== 'verified') issues.push({scope:m.id,reason:'Implementation module classification and independent evidence incomplete'});
  }
  if(!ledger.moduleRecords?.length)issues.push({scope:'modules',reason:'Module closure denominator missing'});
  for(const blocker of context.platformBlockers ?? [])issues.push({scope:'platform',reason:blocker});
  if(!context.platformCoverageVerified)issues.push({scope:'platform',reason:'Supported platform/browser/native input coverage unverified'});
  return {schemaVersion:1,checkedAt:new Date().toISOString(),qualified:issues.length===0,artifactId:context.manifest.artifactId,items:ledger.items?.length??0,modules:ledger.moduleRecords?.length??0,issues};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const previous=JSON.parse(fs.readFileSync('qa/ui/coverage-ledger.json'));
  cp.execFileSync('node',['scripts/ui-audit-inventory.mjs'],{stdio:'ignore'});
  const fresh=JSON.parse(fs.readFileSync('qa/ui/coverage-ledger.json'));
  const ledger={...previous,moduleRecords:fresh.moduleRecords};
  const manifest=JSON.parse(fs.readFileSync('output/playwright/latest-audit-artifact.json'));
  const contracts=Object.fromEntries(fs.readdirSync('qa/ui/contracts').filter(f=>f.endsWith('.json')).map(file=>{const c=JSON.parse(fs.readFileSync(path.join('qa/ui/contracts',file)));return [c.item,c]}));
  // Until item-specific complete manifests are supplied, missing context stays
  // an explicit blocker. The CLI cannot infer visual acceptance from test logs.
  const report=closureReport(ledger,{manifest,artifactRoot:manifest.artifactRoot,currentFingerprint:fresh.sourceFingerprint,contracts,expectedIds:fresh.items.map(i=>i.id),targets:[],caseParameters:{},evidenceRoot:path.resolve('output/playwright'),moduleReviews:{},platformCoverageVerified:false,platformBlockers:['Native Safari/iOS, physical touch, native screenreader and exact older Firefox/Edge versions unavailable on this Linux machine']});
  fs.writeFileSync('output/playwright/qualification-closure.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify({qualified:report.qualified,items:report.items,modules:report.modules,openIssues:report.issues.length,artifactId:report.artifactId}));
  process.exitCode=report.qualified?0:1;
}
