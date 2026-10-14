import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

const digest = value => crypto.createHash('sha256').update(value).digest('hex');
test('owned textarea correction reaches runtime and copied usage without changing upstream bytes', () => {
  const manifest = JSON.parse(fs.readFileSync('vendor/reui/manifest.json', 'utf8'));
  const item = manifest.examples.find(example => example.id === 'c-textarea-6');
  for (const file of item.files) assert.equal(digest(fs.readFileSync('vendor/reui/source/' + file.sourcePath)), file.sha256);
  const wrapper = fs.readFileSync('apps/playground/src/reui/runtime/examples/textarea/c-textarea-6.jsx', 'utf8');
  assert.match(wrapper, /overrides\/c-textarea-6\.jsx/);
  const usage = fs.readFileSync('apps/playground/src/reui/code/examples/textarea/c-textarea-6.tsx', 'utf8');
  assert.match(usage, /fitAcceptedValue/);
  assert.match(usage, /\.\.\/\.\.\/\.\.\/adapters\/controls/);
});

test('grid search-clear accessibility reaches runtime and typed source while vendor bytes stay intact', () => {
  const manifest = JSON.parse(fs.readFileSync('vendor/reui/manifest.json', 'utf8'));
  const item = manifest.examples.find(example => example.id === 'c-data-grid-22');
  for (const file of item.files) assert.equal(digest(fs.readFileSync('vendor/reui/source/' + file.sourcePath)), file.sha256);
  const module = 'registry-reui/bases/radix/components/data-grid/c-data-grid-22';
  const runtime = fs.readFileSync('apps/playground/src/reui/runtime/source/' + module + '.jsx', 'utf8');
  const typed = fs.readFileSync('apps/playground/src/reui/code/supporting/' + module + '.tsx', 'utf8');
  assert.match(runtime, /"aria-label": "Clear search"/);
  assert.match(typed, /aria-label="Clear search"/);
  assert.match(typed, /title="Clear search"/);
  assert.match(typed, /onClick=\{\(\) => setSearchQuery\(""\)\}/);
  assert.match(typed, /ColumnDef<DataGridFeatures, IData>/);
});

test('grid23 named search and row actions reach both emitted modules without changing vendor or row types', () => {
  const manifest = JSON.parse(fs.readFileSync('vendor/reui/manifest.json', 'utf8'));
  const item = manifest.examples.find(example => example.id === 'c-data-grid-23');
  for (const file of item.files) assert.equal(digest(fs.readFileSync('vendor/reui/source/' + file.sourcePath)), file.sha256);
  const module = 'registry-reui/bases/radix/components/data-grid/c-data-grid-23';
  const runtime = fs.readFileSync('apps/playground/src/reui/runtime/source/' + module + '.jsx', 'utf8');
  const typed = fs.readFileSync('apps/playground/src/reui/code/supporting/' + module + '.tsx', 'utf8');
  assert.match(runtime, /"aria-label": "Search team members"/);
  assert.match(runtime, /Actions for \$\{row.original.name\}/);
  assert.match(typed, /aria-label="Search team members"/);
  assert.match(typed, /aria-label=\{`Actions for \$\{row.original.name\}`\}/);
  assert.match(typed, /row: Row<DataGridFeatures, IData>/);
  assert.match(typed, /onChange=\{\(e\) => setSearchQuery\(e.target.value\)\}/);
});

test('native kanban item keyboard sensor reaches focusable item while vendor and pointer handle stay intact', () => {
  const module='registry-reui/bases/radix/reui/kanban';
  const vendor=fs.readFileSync('vendor/reui/source/'+module+'.tsx','utf8');
  const manifest=JSON.parse(fs.readFileSync('vendor/reui/manifest.json','utf8'));
  assert.equal(digest(vendor),'470304bd61e2a5b5093dc3599b21259339b1d6f268c08ca9fe686312db8971fe');
  const typed=fs.readFileSync('apps/playground/src/reui/code/supporting/'+module+'.tsx','utf8');
  const runtime=fs.readFileSync('apps/playground/src/reui/runtime/source/'+module+'.jsx','utf8');
  assert.match(typed,/if \(event.target === event.currentTarget\) listeners\?\.onKeyDown\?\.\(event\)/);
  assert.match(runtime,/event.target === event.currentTarget/);
  assert.match(typed,/data-slot="kanban-item-handle"[\s\S]*?\.\.\.listeners/);
});

test('Kanban6 column handle names preserve the original persistence and rollback contracts', () => {
  const manifest=JSON.parse(fs.readFileSync('vendor/reui/manifest.json','utf8'));
  const item=manifest.examples.find(e=>e.id==='c-kanban-6');
  for(const file of item.files)assert.equal(digest(fs.readFileSync('vendor/reui/source/'+file.sourcePath)),file.sha256);
  const module='registry-reui/bases/radix/components/kanban/c-kanban-6';
  const typed=fs.readFileSync('apps/playground/src/reui/code/supporting/'+module+'.tsx','utf8');
  const runtime=fs.readFileSync('apps/playground/src/reui/runtime/source/'+module+'.jsx','utf8');
  assert.match(typed,/aria-label=\{`Move \$\{COLUMN_TITLES\[value\] \?\? value\} column`\}/);
  assert.match(runtime,/Move \$\{COLUMN_TITLES\[value\] \?\? value\} column/);
  assert.match(typed,/onValueCommit=\{handleValueCommit\}/);
  assert.match(typed,/const previous = meta.previousValue/);
  assert.match(typed,/Math.random\(\) < 0.25/);
});
