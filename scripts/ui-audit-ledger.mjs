import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { PNG } from 'pngjs';
export const widths = [320, 360, 390, 768, 1024, 1280, 1440, 1920];
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
export function matrixCases(item, states, browsers) {
  const result = [];
  for (const state of states) for (const browser of browsers) for (const width of widths)
    for (const mode of ['light', 'dark']) for (const density of ['comfortable', 'compact'])
      for (const motion of ['no-preference', 'reduce']) {
        const parameters = { item, state, browser, width, mode, density, motion };
        result.push({ id: Object.values(parameters).join('::'), ...parameters });
      }
  return result;
}
export function contractCases(contract, context = {}) {
  if (contract.schemaVersion !== 2) {
    if (contract.schemaVersion && contract.schemaVersion !== 1) throw Error('Unsupported contract schema');
    return contract.contexts.flatMap(scene => matrixCases(contract.item, contract.states, contract.browsers)
      .map(c => ({...c,context:scene,id:`${scene}::${c.id}`})));
  }
  const matrix=contract.fullReachableMatrix;
  if (!matrix) throw Error('Reviewed full matrix denominator missing');
  const sameSet=(actual, expected, label)=>{
    if (!Array.isArray(actual) || !actual.length || new Set(actual).size!==actual.length) throw Error(`Invalid or duplicate full matrix ${label}`);
    if (!Array.isArray(expected) || actual.length!==expected.length || actual.some(v=>!expected.includes(v))) throw Error(`Reviewed full matrix ${label} denominator differs`);
  };
  sameSet(matrix.contexts,contract.contexts,'contexts');
  sameSet(matrix.states,contract.states,'states');
  sameSet(matrix.viewportWidths,widths,'viewport widths');
  sameSet(matrix.modes,['light','dark'],'modes');
  sameSet(matrix.densities,['comfortable','compact'],'densities');
  sameSet(matrix.motion,['no-preference','reduce'],'motion');
  const targets=contract.browserTargets;
  if (!Array.isArray(targets) || !targets.length || new Set(targets.map(t=>t.id)).size!==targets.length) throw Error('Missing or duplicate exact target declarations');
  sameSet(matrix.targetIds,targets.map(t=>t.id),'targets');
  sameSet(matrix.targetIds,context.requiredTargets?.map(t=>t.id),'runnable target manifest');
  for(const target of targets){
    const required=context.requiredTargets.find(t=>t.id===target.id);
    for(const field of ['version','channel','runnerProject']) if(!target[field] || target[field]!==required[field]) throw Error(`Exact target manifest ${target.id} ${field} differs`);
  }
  for(const state of matrix.states) if(!contract.stateDefinitions?.[state]?.actions?.length) throw Error(`Reviewed state definition missing: ${state}`);
  for(const scene of matrix.contexts) if(!contract.contextDefinitions?.[scene]?.path || !contract.contextDefinitions[scene].query) throw Error(`Reviewed context definition missing: ${scene}`);
  if(matrix.zoom!==100) throw Error('Canonical full matrix requires native100percent zoom; additional zoom obligations remain separate');
  const result=[];
  for(const scene of matrix.contexts) for(const state of matrix.states) for(const targetId of matrix.targetIds)
    for(const width of matrix.viewportWidths) for(const mode of matrix.modes) for(const density of matrix.densities) for(const motion of matrix.motion){
      const c={item:contract.item,context:scene,state,targetId,width,mode,density,motion,zoom:matrix.zoom};
      result.push({id:Object.values(c).join('::'),...c});
    }
  if(matrix.expectedCases!==result.length) throw Error('Reviewed full matrix expected denominator differs from actual derived cases');
  return result;
}
export function verifyActionObligations(item, contract) {
  const obligations = contract.actionObligations ?? [];
  const evidence = item.actionVerifications ?? [];
  const expected = new Set(item.expectedCases ?? []);
  const byCase = new Map((item.cases ?? []).map(c => [c.id, c]));
  if (new Set(obligations.map(o => o.id)).size !== obligations.length ||
      new Set(evidence.map(e => e.id)).size !== evidence.length ||
      evidence.some(e => !obligations.some(o => o.id === e.id))) {
    throw Error(`${item.id}: undeclared or duplicate action evidence`);
  }
  const contractFingerprint = hash(JSON.stringify(contract));
  for (const obligation of obligations) {
    const required = obligation.caseIds;
    const proof = evidence.find(e => e.id === obligation.id);
    if (!proof || proof.status !== 'verified') throw Error(`${item.id}: action obligation ${obligation.id} lacks verification evidence`);
    if (!required?.length || new Set(required).size !== required.length ||
        required.some(id => !expected.has(id)) || !Array.isArray(proof.caseIds) ||
        new Set(proof.caseIds).size !== proof.caseIds.length || proof.caseIds.length !== required.length ||
        proof.caseIds.some(id => !required.includes(id))) {
      throw Error(`${item.id}: action obligation ${obligation.id} lacks predetermined verified explicit cases`);
    }
    if (proof.fingerprint !== item.fingerprint || proof.contractFingerprint !== contractFingerprint ||
        !proof.observation?.trim() || !proof.workerAgent || !proof.reviewerAgent ||
        proof.workerAgent === proof.reviewerAgent || required.some(id => {
          const c = byCase.get(id);
          return !c || c.worker?.agent !== proof.workerAgent || c.reviewer?.agent !== proof.reviewerAgent;
        })) throw Error(`${item.id}: action evidence ${obligation.id} is stale or lacks independent ownership`);
  }
}
export function acceptItem(item, context = {}) {
  if ((item.defects ?? []).some(defect => defect.status !== 'verified-fixed')) throw Error(`${item.id}: unresolved defect`);
  const expected = new Set(item.expectedCases ?? []), cases = item.cases ?? [];
  if (!expected.size || expected.size !== cases.length || new Set(cases.map(c => c.id)).size !== cases.length || cases.some(c => !expected.has(c.id))) throw Error(`${item.id}: incomplete coverage`);
  for (const c of cases) {
    if (!c.screenshot || !c.screenshotSha256) throw Error(`${c.id}: screenshot evidence missing`);
    if (!c.worker?.agent || !c.reviewer?.agent || c.worker.agent === c.reviewer.agent) throw Error(`${c.id}: independent review missing`);
    if (c.fingerprint !== item.fingerprint) throw Error(`${c.id}: stale evidence`);
    if (c.assertions !== 'passed' || c.worker.verdict !== 'passed' || c.reviewer.verdict !== 'passed') throw Error(`${c.id}: verification incomplete`);
  }
  if (item.blockers?.length) throw Error(`${item.id}: blocked coverage`);
  if (item.classification !== 'visual' || !context.contract || !context.currentFingerprint || !context.artifactRoot) throw Error(`${item.id}: classified contract and current provenance required`);
  const contract = context.contract;
  if (contract.item !== item.id || !contract.states?.length || !contract.browsers?.length || !contract.contexts?.length || !contract.independentContractReview?.agent || !contract.independentContractReview?.observation) throw Error(`${item.id}: reviewed contract coverage required`);
  const requiredBrowsers = context.requiredBrowsers ?? ['chromium', 'firefox', 'webkit'];
  if (requiredBrowsers.some(browser => !contract.browsers.includes(browser)) || contract.browsers.some(browser => !requiredBrowsers.includes(browser))) throw Error(`${item.id}: browser coverage differs from runnable target manifest`);
  for (const field of ['states', 'browsers', 'contexts']) if (new Set(contract[field]).size !== contract[field].length) throw Error(`${item.id}: duplicate contract ${field}`);
  const derived = contractCases(contract,context).map(c=>c.id);
  for (const additional of contract.additionalCases ?? []) derived.push(additional);
  if (derived.length !== expected.size || derived.some(id => !expected.has(id))) throw Error(`${item.id}: coverage differs from reviewed contract`);
  if(contract.schemaVersion===2){
    if(contract.coverageBlockers?.length) throw Error(`${item.id}: unresolved contract coverage blockers`);
    verifyActionObligations(item, contract);
  }
  if (item.fingerprint !== context.currentFingerprint) throw Error(`${item.id}: stale current source`);
  const contractFingerprint = hash(JSON.stringify(contract));
  const captures = new Set();
  for (const c of cases) {
    for (const [capture, digest] of [[c.screenshot, c.screenshotSha256], [c.reviewer.screenshot, c.reviewer.screenshotSha256]]) {
      if (!capture || !digest) throw Error(`${c.id}: fresh reviewer screenshot missing`);
      const file = path.resolve(context.artifactRoot, capture);
      if (!file.startsWith(path.resolve(context.artifactRoot) + path.sep)) throw Error(`${c.id}: screenshot outside artifact root`);
      if (!fs.existsSync(file)) throw Error(`${c.id}: screenshot file missing`);
      const actualPath = fs.realpathSync(file), actualRoot = fs.realpathSync(context.artifactRoot);
      if (!actualPath.startsWith(actualRoot + path.sep)) throw Error(`${c.id}: screenshot symlink leaves artifact root`);
      if (captures.has(actualPath)) throw Error(`${c.id}: screenshot replay across cases`);
      captures.add(actualPath);
      const bytes = fs.readFileSync(file);
      if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || hash(bytes) !== digest) throw Error(`${c.id}: screenshot hash or PNG invalid`);
      try { const decoded = PNG.sync.read(bytes, {checkCRC:true}); if (!decoded.width || !decoded.height || !decoded.data.length) throw Error('Empty PNG'); } catch { throw Error(`${c.id}: screenshot PNG cannot be decoded`); }
    }
    if (c.screenshot === c.reviewer.screenshot) throw Error(`${c.id}: reviewer must capture independently`);
    for (const inspection of [c.worker, c.reviewer]) {
      if (inspection.fingerprint !== item.fingerprint || inspection.contractFingerprint !== contractFingerprint || !inspection.observation?.trim()) throw Error(`${c.id}: visual inspection provenance missing or stale`);
    }
    if (c.worker.screenshotSha256 !== c.screenshotSha256 || c.reviewer.caseId !== c.id || c.worker.caseId !== c.id) throw Error(`${c.id}: inspection not bound to case and screenshot`);
  }
  return { ...item, status: 'accepted-local' };
}
export function reconcileItems(previous, discovered) {
  const byId = new Map(previous.map(item => [item.id, item]));
  const items = discovered.map(item => {
    const old = byId.get(item.id); byId.delete(item.id);
    if (!old) return { ...item, status: 'unassigned', cases: [], defects: [], blockers: [] };
    return { ...old, ...item, status: old.fingerprint === item.fingerprint && old.status !== 'accepted-local' ? old.status : 'stale' };
  });
  // Removed surface area is not silently dropped from the coverage denominator.
  return [...items, ...[...byId.values()].map(item => ({ ...item, status: 'blocked', blockers: [...(item.blockers ?? []), 'Surface disappeared; classify removal and compatibility before closure'] }))];
}
