import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import crypto from 'node:crypto';
import ts from 'typescript';
import { createServer } from 'vite';
import { reconcileItems } from './ui-audit-ledger.mjs';

const root = process.cwd();
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const tracked = [...new Set(cp.execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: root }).toString().split('\0').filter(Boolean))];
const owned = fs.existsSync('qa/ui/contracts') ? fs.readdirSync('qa/ui/contracts').map(p => 'qa/ui/contracts/' + p) : [];
const sourcePaths = [...new Set([...tracked, ...owned])].filter(p => /^(packages|apps)\/.*\.([cm]?[jt]sx?|css|json|html)$/.test(p) || /^(package.json|pnpm-lock.yaml|scripts\/.*\.mjs|qa\/ui\/.*\.(ts|tsx|mts|js|json|html)|patches\/.*\.patch)$/.test(p) || /^apps\/playground\/public\//.test(p)).filter(p => p !== 'qa/ui/coverage-ledger.json').sort();
const sourceFiles = Object.fromEntries(sourcePaths.map(p => [p, fs.existsSync(p) ? sha(fs.readFileSync(p)) : 'missing']));
const sourceFingerprint = sha(Object.entries(sourceFiles).map(([p, digest]) => `${p}:${digest}`).join('\n'));
const server = await createServer({ configFile: false, root: path.join(root, 'apps/playground'), optimizeDeps: { noDiscovery: true, entries: [] }, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
let catalog;
try { catalog = (await server.ssrLoadModule('/src/registry/catalog.ts')).entries; } finally { await server.close(); }
const items = [];
for (const entry of catalog) for (const variant of entry.variants) items.push({ id: variant.id, surface: 'catalog', kind: entry.kind, family: entry.id, title: variant.title, classification: 'visual', source: variant.source ?? { importPath: entry.importPath }, fingerprint: sourceFingerprint });
const pkg = JSON.parse(fs.readFileSync('packages/ui/package.json', 'utf8'));
const publicExposures = [];
for (const [subpath, definition] of Object.entries(pkg.exports)) {
  if (typeof definition === 'string') { publicExposures.push({ subpath, classification: 'stylesheet', file: definition }); continue; }
  const modulePath = path.resolve('packages/ui', definition.import);
  if (!fs.existsSync(modulePath)) throw Error(`Build package before inventory: ${modulePath}`);
  const module = await import(modulePath);
  for (const [name, value] of Object.entries(module)) {
    const id = `public:${subpath}:${name}`;
    const nonvisual = /^(use[A-Z]|theme$|themes$|version$|contrastRatio$|resolveThemeScheme$|themeVariables$|antTheme$|kooya|mosaicTheme$|signatureTheme$|canvasTheme$|clientTheme$)/.test(name);
    const exposure = { id, subpath, name, classification: nonvisual ? 'nonvisual-contract' : 'classification-required', file: definition.import };
    publicExposures.push(exposure);
    items.push({ ...exposure, surface: 'public-export', fingerprint: sourceFingerprint });
    // Runtime candidates are NOT silently promoted to supported compound APIs.
    // Declaration review must classify each candidate (including hooks/utilities).
    if (value && ['function', 'object'].includes(typeof value)) for (const member of Object.getOwnPropertyNames(value)) {
      if (['length', 'name', 'prototype', 'arguments', 'caller', 'displayName', '$$typeof', 'render', 'compare'].includes(member)) continue;
      const property = Object.getOwnPropertyDescriptor(value, member);
      if (!property || !('value' in property)) continue;
      if (!['function', 'object'].includes(typeof property.value) || property.value == null) continue;
      items.push({ id: `${id}.${member}`, surface: 'compound-candidate', classification: 'declaration-review-required', subpath, name, member, fingerprint: sourceFingerprint });
    }
  }
}
for (const file of tracked.filter(p => /^apps\/storybook\/stories\/.*\.stories\.tsx$/.test(p))) {
  const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  for (const statement of ast.statements) if (ts.isVariableStatement(statement) && statement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) for (const declaration of statement.declarationList.declarations) {
    const name = declaration.name.getText(ast);
    items.push({ id: `story:${file}:${name}`, surface: 'storybook', classification: 'visual', file, name, fingerprint: sourceFingerprint });
  }
}
for (const file of tracked.filter(p => /^packages\/ui\/tests\/.*\.html$/.test(p))) items.push({ id: `html:${file}`, surface: 'html-fixture', classification: 'scenario-enumeration-required', file, fingerprint: sourceFingerprint });
// Every implementation module gets a classification record. Catalog wrappers do
// not imply their supporting engines, retained pages or noncatalog UI passed.
const modules = tracked.filter(p => /^(packages\/ui\/src|apps\/playground\/src)\/.*\.([cm]?[jt]sx?)$/.test(p));
const moduleRecords = modules.map(file => ({ id: `module:${file}`, file, sha256: sha(fs.readFileSync(file)), classification: /\/reui\/(runtime\/examples|code\/examples)\//.test(file) ? 'catalog-wrapper-or-usage' : 'classification-required' }));
for (const file of modules.filter(p => !p.includes('/reui/') && !p.includes('/registry/') && !p.includes('/site/collections/'))) items.push({ id: `module:${file}`, surface: 'retained-or-public-module', classification: 'scenario-enumeration-required', file, fingerprint: sourceFingerprint });
const ids = items.map(item => item.id);
if (new Set(ids).size !== ids.length) throw Error('Duplicate coverage IDs');
const destination = 'qa/ui/coverage-ledger.json';
const previous = fs.existsSync(destination) ? JSON.parse(fs.readFileSync(destination, 'utf8')) : { items: [] };
const ledger = { schemaVersion: 1, baselineRevision: 'c1283ad3ed7cd4716890131b2ce9e3cab30de7c6', revision: cp.execFileSync('git', ['rev-parse', 'HEAD']).toString().trim(), sourceFingerprint, sourceFiles, catalog: { entries: catalog.length, variants: catalog.reduce((n, e) => n + e.variants.length, 0) }, publicExposures, moduleRecords, items: reconcileItems(previous.items, items) };
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(ledger, null, 2) + '\n');
const counts = Object.fromEntries([...new Set(items.map(i => i.surface))].map(surface => [surface, items.filter(i => i.surface === surface).length]));
console.log(JSON.stringify({ catalog: ledger.catalog, items: items.length, modules: modules.length, surfaces: counts, acceptedLocal: ledger.items.filter(i => i.status === 'accepted-local').length, sourceFingerprint }, null, 2));
