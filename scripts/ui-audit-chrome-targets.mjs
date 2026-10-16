import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import crypto from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { chromium } from '@playwright/test';

const stableSource = 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json';
const milestoneSource = 'https://googlechromelabs.github.io/chrome-for-testing/latest-versions-per-milestone-with-downloads.json';
async function json(url) { const response = await fetch(url); if (!response.ok) throw Error(`${url}: ${response.status}`); return response.json(); }
const stable = (await json(stableSource)).channels.Stable;
const milestones = (await json(milestoneSource)).milestones;
const current = Number(stable.version.split('.')[0]);
const targets = [];
const cacheRoot = process.env.AUDIT_BROWSER_CACHE ?? '/home/stephen-kooya/.local/share/kooya-ui-runtime/audit-browsers';
for (const major of [current, current - 1, current - 2]) {
  const release = major === current ? stable : milestones[String(major)];
  const download = release?.downloads?.chrome?.find(d => d.platform === 'linux64');
  if (!download) { targets.push({major,status:'blocked',reason:'No official Linux64 artifact'}); continue; }
  const directory = path.join(cacheRoot, release.version);
  const archive = path.join(directory, 'chrome-linux64.zip');
  const executable = path.join(directory, 'chrome-linux64/chrome');
  fs.mkdirSync(directory,{recursive:true});
  if (!fs.existsSync(executable)) {
    const response = await fetch(download.url); if (!response.ok || !response.body) throw Error(`Browser download failed: ${response.status}`);
    await pipeline(Readable.fromWeb(response.body),fs.createWriteStream(archive));
    cp.execFileSync('unzip',['-q','-o',archive,'-d',directory]);
  }
  try {
    const browser = await chromium.launch({executablePath:executable,headless:true});
    targets.push({major,status:'runnable',version:browser.version(),executable,executableSha256:crypto.createHash('sha256').update(fs.readFileSync(executable)).digest('hex'),url:download.url,channel:major===current?'Stable':'Previous released major milestone artifact',coverage:'Chrome for Testing Linux; platform and custom-binary protocol qualification still require item tests'});
    await browser.close();
  } catch(error) { targets.push({major,executable,status:'blocked',reason:error.message}); }
}
const manifest = { schemaVersion:1,capturedAt:new Date().toISOString(),sources:[stableSource,milestoneSource],policy:'Current plus previous two released Chrome majors, frozen at capture',targets };
fs.mkdirSync('output/playwright',{recursive:true}); fs.writeFileSync('output/playwright/released-chrome-targets.json',JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest,null,2));
