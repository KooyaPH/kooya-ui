import {test} from 'node:test';
import { PNG } from 'pngjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {acceptItem,matrixCases,reconcileItems} from '../ui-audit-ledger.mjs';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const raster = new PNG({width:16,height:16}); raster.data.fill(255);
const validPng=PNG.sync.write(raster);
function fixture(t,{browsers=['chromium','firefox','webkit'],bytes=validPng}={}){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'audit-review-probe-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const contract={item:'probe',states:['default'],contexts:['catalog'],browsers,independentContractReview:{agent:'contract-reviewer',observation:'Reviewed semantic default control and engine scope'}};
 const fp=sha(JSON.stringify(contract));
 const expected=contract.contexts.flatMap(s=>matrixCases('probe',contract.states,browsers).map(c=>`${s}::${c.id}`));
 const cases=expected.map((id,index)=>{
 const workerPath=`worker-${index}.png`, reviewerPath=`reviewer-${index}.png`;
 fs.writeFileSync(path.join(dir,workerPath),bytes);fs.writeFileSync(path.join(dir,reviewerPath),bytes);
 return {id,assertions:'passed',fingerprint:'source',screenshot:workerPath,screenshotSha256:sha(bytes),worker:{agent:'worker',verdict:'passed',fingerprint:'source',contractFingerprint:fp,caseId:id,screenshotSha256:sha(bytes),observation:'Inspected fixture image for '+id},reviewer:{agent:'reviewer',verdict:'passed',fingerprint:'source',contractFingerprint:fp,caseId:id,observation:'Fresh fixture visual check for '+id,screenshot:reviewerPath,screenshotSha256:sha(bytes)}};
 });
 return {item:{id:'probe',classification:'visual',fingerprint:'source',expectedCases:expected,cases},context:{artifactRoot:dir,currentFingerprint:'source',contract},dir};
}
test('review probe: missing PNG is rejected after complete contract provenance',t=>{const f=fixture(t);fs.unlinkSync(path.join(f.dir,f.item.cases[0].screenshot));assert.throws(()=>acceptItem(f.item,f.context),/screenshot file missing/)});
test('review probe: modified screenshot bytes are rejected',t=>{const f=fixture(t);fs.appendFileSync(path.join(f.dir,f.item.cases[0].screenshot),'tampered');assert.throws(()=>acceptItem(f.item,f.context),/screenshot hash or PNG invalid/)});
test('review probe: stale reviewer contract is rejected',t=>{const f=fixture(t);f.item.cases[0].reviewer.contractFingerprint='old';assert.throws(()=>acceptItem(f.item,f.context),/visual inspection provenance missing or stale/)});
test('review probe: fictitious browser cannot establish coverage',t=>{const f=fixture(t,{browsers:['imaginary-browser']});assert.throws(()=>acceptItem(f.item,f.context),/browser coverage differs/)});
test('review probe: truncated eight-byte PNG header cannot serve as visual evidence',t=>{const f=fixture(t,{bytes:Buffer.from('89504e470d0a1a0a','hex')});assert.throws(()=>acceptItem(f.item,f.context),/screenshot PNG cannot be decoded/)});
test('review probe: one replayed worker and reviewer capture cannot cover every distinct case',t=>{const f=fixture(t);f.item.cases[1].screenshot=f.item.cases[0].screenshot;assert.throws(()=>acceptItem(f.item,f.context),/screenshot replay across cases/)});
test('review probe: screenshot symlinks cannot escape artifact root',t=>{const f=fixture(t);const outside=fs.mkdtempSync(path.join(os.tmpdir(),'audit-review-outside-'));t.after(()=>fs.rmSync(outside,{recursive:true,force:true}));fs.writeFileSync(path.join(outside,'image.png'),validPng);fs.unlinkSync(path.join(f.dir,f.item.cases[0].screenshot));fs.symlinkSync(path.join(outside,'image.png'),path.join(f.dir,f.item.cases[0].screenshot));assert.throws(()=>acceptItem(f.item,f.context),/screenshot symlink leaves artifact root/)});
test('review probe: reconciliation must not preserve invalid acceptance solely by unchanged source',()=>{const [item]=reconcileItems([{id:'probe',fingerprint:'source',status:'accepted-local',cases:[]}],[{id:'probe',fingerprint:'source'}]);assert.notEqual(item.status,'accepted-local')});

test('review probe: complete 192-case valid manifest can be accepted',t=>{const f=fixture(t);assert.equal(f.item.cases.length,192);assert.equal(acceptItem(f.item,f.context).status,'accepted-local')});
test('review probe: worker observation binds to captured screenshot hash',t=>{const f=fixture(t);f.item.cases[0].worker.screenshotSha256='wrong';assert.throws(()=>acceptItem(f.item,f.context),/inspection not bound to case and screenshot/)});
