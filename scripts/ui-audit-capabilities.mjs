import fs from 'node:fs';
import cp from 'node:child_process';
import crypto from 'node:crypto';
import path from 'node:path';
import { chromium, firefox, webkit } from '@playwright/test';

const results = [];
const hashFile = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function engineProof(name, launcher) {
  const executable = name === 'webkit' && process.platform === 'linux'
    ? path.join(path.dirname(launcher), 'minibrowser-wpe/bin/MiniBrowser')
    : launcher;
  if (!fs.readFileSync(executable).subarray(0,4).equals(Buffer.from([127,69,76,70])))
    throw Error(`Expected an actual Linux ELF engine, not a launch wrapper: ${executable}`);
  const engineFiles = [{path: executable, sha256: hashFile(executable)}];
  const bundleFiles = {};
  if (name === 'webkit') {
    const bundle = path.join(path.dirname(launcher), 'minibrowser-wpe');
    const visit = dir => {
      for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) visit(file);
        else if (entry.isFile()) bundleFiles[path.relative(bundle,file)] = hashFile(file);
        else if (entry.isSymbolicLink()) bundleFiles[path.relative(bundle,file)] = {symlink:fs.readlinkSync(file),targetSha256:hashFile(fs.realpathSync(file))};
      }
    };
    visit(bundle);
    for (const relative of ['bin/WPEWebProcess','bin/WPEGPUProcess','bin/WPENetworkProcess','lib/libWPEWebKit-2.0.so.1.12.0']) {
      const file = path.join(bundle,relative);
      engineFiles.push({path:file,sha256:hashFile(file)});
    }
  }
  return {executable,executableSha256:hashFile(executable),launcher,launcherSha256:hashFile(launcher),engineFiles,bundleFiles};
}
for (const [name, browserType] of Object.entries({ chromium, firefox, webkit })) {
  const executable = browserType.executablePath();
  try {
    // Chromium's default headless launch selects a separate headless-shell
    // binary. Launch the exact path whose bytes this manifest qualifies.
    const browser = await browserType.launch({ headless: true, executablePath: executable });
    const page = await browser.newPage(); await page.setContent('<label>Probe<input></label>');
    await page.getByRole('textbox', { name: 'Probe' }).fill('runtime proof');
    const userAgent = await page.evaluate(() => navigator.userAgent);
    results.push({ name, status: 'runnable', version: browser.version(), userAgent, ...engineProof(name, executable), coverage: name === 'webkit' ? 'Linux WebKit engine; not Safari/iOS' : 'Pinned Playwright browser; released-channel coverage requires separate target manifest' });
    await browser.close();
  } catch (error) { results.push({ name, executable, status: 'blocked', reason: error.message }); }
}
const proof = { schemaVersion: 1, timestamp: new Date().toISOString(), platform: process.platform, arch: process.arch, node: process.version, playwright: JSON.parse(fs.readFileSync('node_modules/@playwright/test/package.json')).version, revision: cp.execFileSync('git', ['rev-parse','HEAD']).toString().trim(), browsers: results, blockedPlatforms: ['Native Safari/macOS/iOS', 'Physical touch devices', 'Native screen reader interaction', 'Previous two released Firefox/Edge/Safari majors until exact runnable binaries are qualified'] };
fs.mkdirSync('output/playwright', { recursive: true });
fs.writeFileSync('output/playwright/capabilities.json', JSON.stringify(proof,null,2)+'\n');
console.log(JSON.stringify(proof,null,2));
