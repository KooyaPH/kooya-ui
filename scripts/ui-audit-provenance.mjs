import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
export const sha = data => crypto.createHash('sha256').update(data).digest('hex');

export function verifyArtifact(manifest, artifactRoot) {
  if (manifest.schemaVersion !== 1 || !manifest.sourceFingerprint || !Object.keys(manifest.files ?? {}).length) throw Error('Complete immutable build provenance required');
  const actualRoot = fs.realpathSync(artifactRoot);
  for (const [relative, digest] of Object.entries(manifest.files)) {
    const file = path.resolve(actualRoot, relative);
    if (!file.startsWith(actualRoot + path.sep) || !fs.existsSync(file)) throw Error('Missing or escaped artifact file');
    if (!fs.realpathSync(file).startsWith(actualRoot + path.sep) || !fs.lstatSync(file).isFile()) throw Error('Artifact symlink or nonregular file');
    if (sha(fs.readFileSync(file)) !== digest) throw Error(`Changed immutable artifact: ${relative}`);
  }
  const id = sha(JSON.stringify(Object.entries(manifest.files).sort(([a],[b]) => a.localeCompare(b))));
  if (manifest.artifactId !== id) throw Error('Artifact identity does not match file manifest');
  return id;
}

export function verifyCaseRuntime(evidence, {manifest, target, parameters}) {
  if (evidence.artifactId !== manifest.artifactId || evidence.sourceFingerprint !== manifest.sourceFingerprint) throw Error('Case runtime is not the reviewed immutable build');
  if (!target || evidence.browser?.id !== target.id || evidence.browser?.version !== target.version || evidence.browser?.channel !== target.channel) throw Error('Exact browser target/version/channel proof missing');
  if (!evidence.browser.engineFiles?.length || !target.engineFiles?.length || !isDeepStrictEqual(evidence.browser.engineFiles, target.engineFiles)) throw Error('Reviewed browser engine closure missing or different');
  for (const entry of evidence.browser.engineFiles) {
    if (/\.(sh|bat|cmd)$/.test(entry.path)) throw Error('Launcher wrapper is not browser engine proof');
    if (!fs.existsSync(entry.path) || sha(fs.readFileSync(entry.path)) !== entry.sha256) throw Error('Browser engine bytes missing or changed');
  }
  if (!isDeepStrictEqual(evidence.parameters, parameters)) throw Error('Measured scene parameters differ from reviewed case');
  if (!evidence.runId || !evidence.executedSpecSha256 || !evidence.fixtureSha256 || !evidence.actions?.length || evidence.actions.some(a => !a.type || !a.target || !a.completedAt)) throw Error('Actual fixture and completed action evidence missing');
  const g = evidence.geometry;
  if (!g || g.viewport?.width !== parameters.width || !(g.viewport.height > 0) || !(g.viewport.deviceScaleFactor > 0) || !(g.component?.width > 0) || !(g.component.height > 0) || !(g.document?.scrollWidth > 0) || !Array.isArray(g.portals)) throw Error('Actual viewport/component/document/portal measurements missing');
  const startedAt = Date.parse(evidence.startedAt), capturedAt = Date.parse(evidence.capturedAt);
  if (!evidence.renderReady || !Number.isFinite(startedAt) || !Number.isFinite(capturedAt) || capturedAt < startedAt ||
      evidence.actions.some(action => {
        const completedAt = Date.parse(action.completedAt);
        return !Number.isFinite(completedAt) || completedAt < startedAt || completedAt > capturedAt;
      })) throw Error('Render readiness/action/capture chronology missing or invalid');
  if (!Array.isArray(evidence.consoleErrors) || evidence.consoleErrors.length || !Array.isArray(evidence.failedRequests) || evidence.failedRequests.length) throw Error('Runtime failures prevent qualification');
  return true;
}
