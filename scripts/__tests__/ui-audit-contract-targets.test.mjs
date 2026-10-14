import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {contractCases} from '../ui-audit-ledger.mjs';
const contract=JSON.parse(fs.readFileSync('qa/ui/contracts/c-textarea-6.json'));
const context={requiredBrowsers:['chromium','firefox','webkit'],requiredTargets:contract.browserTargets};
test('schema2 uses all exact targets and nine contexts, not bundled engine aliases',()=>{
  const cases=contractCases(contract,context);
  assert.equal(cases.length,38016);
  assert.equal(new Set(cases.map(c=>c.id)).size,38016);
  assert.equal(cases.filter(c=>c.targetId==='chrome-stable-155').length,6336);
  assert.ok(cases.some(c=>c.id==='c-textarea-6::preset-mosaic::at-limit-280::chrome-previous-153::320::dark::compact::reduce::100'));
});
test('a bounded catalog subset cannot become the full reviewed denominator',()=>{
  const c=structuredClone(contract);c.fullReachableMatrix=structuredClone(c.boundedCatalogRun);
  assert.throws(()=>contractCases(c,context),/full matrix|denominator/);
});
test('duplicate exact target declarations and target/version substitutions are rejected',()=>{
  const duplicate=structuredClone(contract);duplicate.browserTargets.push(duplicate.browserTargets[0]);
  assert.throws(()=>contractCases(duplicate,context),/duplicate/);
  const changed=structuredClone(contract);changed.browserTargets[0].version='imaginary';
  assert.throws(()=>contractCases(changed,context),/target manifest/);
});
test('schema2 cannot shrink the standard viewport coverage or omit state definitions',()=>{
  const narrowed=structuredClone(contract);narrowed.fullReachableMatrix.viewportWidths=[320];
  assert.throws(()=>contractCases(narrowed,context),/viewport/);
  const missing=structuredClone(contract);delete missing.stateDefinitions.dirty;
  assert.throws(()=>contractCases(missing,context),/state definition/);
});
