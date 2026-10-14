import { test } from 'node:test';
import assert from 'node:assert/strict';
import cp from 'node:child_process';
const archive = 'apps/playground/public/downloads/kooya-recipes.tar.gz';
test('standalone source bundle includes composed template import closure and focus repair', () => {
  const files = new Set(cp.execFileSync('tar',['-tzf',archive]).toString().split('\n'));
  for (const file of ['./site/CatalogPages.tsx','./site/Preview.tsx','./site/site.css','./registry/catalog.ts','./registry/native.ts','./registry/reui-manifest.json','./patches/@rc-component__util@1.13.0.patch']) assert.ok(files.has(file),`Missing bundled dependency: ${file}`);
});
test('standalone viewer loads native controls and compositions through the actual catalog', () => {
  const main = cp.execFileSync('tar',['-xOf',archive,'./main.tsx']).toString();
  assert.match(main,/PreviewRoute/); assert.ok(!main.includes("const examples=import.meta.glob"));
  const pkg = JSON.parse(cp.execFileSync('tar',['-xOf',archive,'./package.json']).toString());
  assert.equal(pkg.pnpm.patchedDependencies['@rc-component/util@1.13.0'],'patches/@rc-component__util@1.13.0.patch');
  for (const key of Object.keys(pkg.pnpm.patchedDependencies)) {
    const separator = key.lastIndexOf('@');
    assert.equal(pkg.pnpm.overrides[key.slice(0, separator)], key.slice(separator + 1), `Unpinned repaired dependency ${key}`);
  }
  for (const [name, version] of Object.entries(pkg.dependencies)) {
    if (name !== '@kooyaph/ui') assert.match(version, /^\d+\.\d+\.\d+(?:[-+].+)?$/, `Unpinned direct dependency ${name}`);
  }
});
