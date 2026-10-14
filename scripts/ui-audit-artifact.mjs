import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import cp from 'node:child_process';
import os from 'node:os';

// Build only when no other process is changing render inputs. Artifacts are
// content-addressed copies; reviewers never inspect the mutable build output.
const root = process.cwd();
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const inventory = () => {
  cp.execFileSync('node', ['scripts/ui-audit-inventory.mjs'], {stdio: 'inherit'});
  return JSON.parse(fs.readFileSync('qa/ui/coverage-ledger.json', 'utf8'));
};
const before = inventory();
cp.execFileSync('pnpm', ['--filter', '@kooyaph/ui', 'build'], {stdio: 'inherit'});
cp.execFileSync('pnpm', ['exec', 'vite', 'build', '--config', 'qa/ui/vite.audit.config.mts'], {stdio: 'inherit'});
const after = inventory();
if (before.sourceFingerprint !== after.sourceFingerprint) {
  const paths=new Set([...Object.keys(before.sourceFiles),...Object.keys(after.sourceFiles)]);
  const changed=[...paths].filter(p=>before.sourceFiles[p]!==after.sourceFiles[p]);
  fs.writeFileSync('output/playwright/rejected-build-input-changes.json',JSON.stringify({before:before.sourceFingerprint,after:after.sourceFingerprint,changed},null,2));
  throw Error(`Render inputs changed during build; candidate must not be reviewed (${changed.join(', ')})`);
}
const output = path.join(root, 'output/playwright/candidate/public');
const files = {};
function scan(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const absolute = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw Error(`Artifact symlink forbidden: ${absolute}`);
    if (entry.isDirectory()) scan(absolute);
    else if (entry.isFile()) files[path.relative(output, absolute).split(path.sep).join('/')] = sha(fs.readFileSync(absolute));
  }
}
scan(output);
const artifactId = sha(JSON.stringify(Object.entries(files).sort(([a],[b]) => a.localeCompare(b))));
const destination = path.join(os.homedir(), '.local/share/kooya-ui-runtime', `audit-${artifactId}`, 'public');
if (fs.existsSync(destination)) throw Error(`Preserve existing snapshot; destination already exists: ${destination}`);
fs.mkdirSync(path.dirname(destination), {recursive: true});
fs.cpSync(output, destination, {recursive: true});
const manifest = {
  schemaVersion: 1, artifactId, sourceFingerprint: after.sourceFingerprint, sourceFiles: after.sourceFiles,
  revision: cp.execFileSync('git', ['rev-parse', 'HEAD']).toString().trim(),
  builtAt: new Date().toISOString(), artifactRoot: destination, files,
  environment: {node: process.version, platform: process.platform, architecture: process.arch,
    pnpm: cp.execFileSync('pnpm', ['--version']).toString().trim()},
  qualification: 'Candidate only; no library acceptance inferred from successful build',
};
fs.writeFileSync(path.join(destination, 'audit-provenance.json'), JSON.stringify(manifest, null, 2));
fs.writeFileSync('output/playwright/latest-audit-artifact.json', JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({artifactId, sourceFingerprint: after.sourceFingerprint, artifactRoot: destination}));
