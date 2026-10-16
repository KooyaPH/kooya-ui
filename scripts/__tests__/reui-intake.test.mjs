import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const manifestPath = resolve(root, 'vendor/reui/manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { categories: [], examples: [] };

test('imports every distinct public REUI example and category at the approved revision', () => {
  assert.equal(manifest.revision, '3b67464bcad3c29fbdb12437afb70153384eee19');
  assert.equal(manifest.categories.length, 86);
  assert.equal(manifest.examples.length, 1241);
  assert.equal(new Set(manifest.examples.map(x => x.id)).size, 1241);
});

test('retains byte-identical source and source provenance for each imported example', () => {
  assert.equal(manifest.examples.length, 1241);
  for (const example of manifest.examples) {
    assert.ok(manifest.categories.some(c => c.id === example.category), example.id);
    assert.ok(example.title, example.id);
    for (const file of example.files) {
      const source = readFileSync(resolve(root, file.localPath));
      assert.equal(createHash('sha256').update(source).digest('hex'), file.sha256, file.sourcePath);
    }
  }
  assert.match(readFileSync(resolve(root, 'vendor/reui/LICENSE.md'), 'utf8'), /Copyright \(c\) 2025 Keenthemes Inc/);
});

test('family totals match the distinct source inventory', () => {
  assert.equal(manifest.categories.reduce((n, c) => n + c.count, 0), 1241);
  for (const c of manifest.categories) assert.equal(manifest.examples.filter(x => x.category === c.id).length, c.count, c.id);
});

test('classifies native Ant controls and advanced engines without claiming they are implemented', () => {
  const button = manifest.examples.find(x => x.id === 'c-button-1');
  assert.equal(button?.strategy, 'ant-native');
  assert.deepEqual(button.antComponents, ['Button']);
  const grid = manifest.examples.find(x => x.id === 'c-data-grid-1');
  assert.equal(grid?.strategy, 'reui-engine');
  assert.ok(grid.targetLibraries.includes('@tanstack/react-table'));
  assert.ok(manifest.examples.every(x => x.adaptationStatus === 'source-imported'));
});
