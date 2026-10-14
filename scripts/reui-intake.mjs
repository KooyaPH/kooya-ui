import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const revision = '3b67464bcad3c29fbdb12437afb70153384eee19';
const root = resolve(import.meta.dirname, '..');
const upstream = resolve(process.argv[2] ?? '/tmp/kooya-reui-source-20261013');
const head = execFileSync('git', ['-C', upstream, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (head !== revision) throw new Error(`Expected REUI ${revision}; found ${head}`);
const git = (...args) => execFileSync('git', ['-C', upstream, ...args], { maxBuffer: 16 * 1024 * 1024 });
const committed = path => git('show', `${revision}:${path}`);
const destination = join(root, 'vendor/reui');
mkdirSync(destination, { recursive: true });

const selectedPaths = ['registry-reui/bases/radix/components', 'registry-reui/bases/radix/reui', 'registry-reui/bases/radix/hooks', 'registry/bases/radix/ui', 'components/ui', 'lib/utils.ts', 'app/(create)/components/components', 'components/catalog-page-hero.tsx', 'components/site-header.tsx', 'components/component-preview-frame.tsx', 'components/component-preview-tabs.tsx', 'LICENSE.md'];
const sourcePaths = git('ls-tree', '-rz', '--name-only', revision, '--', ...selectedPaths).toString().split('\0').filter(Boolean);
for (const path of sourcePaths) {
  const to = join(destination, 'source', path);
  mkdirSync(resolve(to, '..'), { recursive: true });
  writeFileSync(to, committed(path));
}
writeFileSync(join(destination, 'LICENSE.md'), committed('LICENSE.md'));

const stats = JSON.parse(committed('registry-reui/_meta/components/registry.json').toString());
const categories = stats.categories.map(c => ({ id: c.name, title: c.label, description: c.description, count: c.count }));
const shards = git('ls-tree', '-rz', '--name-only', revision, '--', 'registry-reui/_meta/components/bases/radix').toString().split('\0').filter(p => p.endsWith('.json')).sort();
const items = shards.flatMap(p => JSON.parse(committed(p).toString()).items ?? []);
const native = {
  accordion:'Collapse', alert:'Alert', 'alert-dialog':'Modal', autocomplete:'AutoComplete', avatar:'Avatar', badge:'Badge,Tag', breadcrumb:'Breadcrumb', button:'Button', calendar:'Calendar,DatePicker', card:'Card', carousel:'Carousel', cascader:'Cascader', checkbox:'Checkbox', collapsible:'Collapse', 'color-picker':'ColorPicker', combobox:'Select', 'context-menu':'Dropdown', 'date-selector':'DatePicker', dialog:'Modal', drawer:'Drawer', 'dropdown-menu':'Dropdown', empty:'Empty', field:'Form.Item', 'file-upload':'Upload', 'hover-card':'Popover', input:'Input', 'input-otp':'Input.OTP', label:'Form.Item', menubar:'Menu', 'navigation-menu':'Menu', 'number-field':'InputNumber', pagination:'Pagination', popover:'Popover', progress:'Progress', 'radio-group':'Radio.Group', rating:'Rate', resizable:'Splitter', select:'Select', separator:'Divider', sheet:'Drawer', sidebar:'Layout,Menu', skeleton:'Skeleton', slider:'Slider', sonner:'App.useApp', spinner:'Spin', stepper:'Steps', switch:'Switch', table:'Table', tabs:'Tabs', textarea:'Input.TextArea', 'time-picker':'TimePicker', timeline:'Timeline', toggle:'Button', 'toggle-group':'Segmented', tooltip:'Tooltip', tree:'Tree'
};
const engines = { chart:'recharts', 'code-block':'shiki', 'data-grid':'@tanstack/react-table', 'emoji-picker':'REUI emoji engine', 'event-calendar':'REUI event-calendar engine', gantt:'REUI gantt engine', kanban:'@dnd-kit/core', 'message-scroller':'REUI message-scroller', 'phone-input':'react-phone-number-input', questionnaire:'@shadcn/react/questionnaire', 'signature-pad':'REUI signature-pad engine', sortable:'@dnd-kit/core' };
const examples = items.map(item => ({
  id: item.name,
  title: item.title ?? item.name,
  description: item.description ?? '',
  category: item.categories[0],
  dependencies: item.dependencies ?? [],
  registryDependencies: item.registryDependencies ?? [],
  strategy: native[item.categories[0]] ? 'ant-native' : engines[item.categories[0]] ? 'reui-engine' : 'ant-composition',
  targetLibraries: native[item.categories[0]] ? ['antd'] : engines[item.categories[0]] ? ['antd', engines[item.categories[0]]] : ['antd'],
  antComponents: native[item.categories[0]]?.split(',') ?? [],
  adaptationStatus: 'source-imported',
  previewHeight: Number(item.meta?.previewHeight) || 240,
  order: item.meta?.order ?? 0,
  files: item.files.map(file => {
    const sourcePath = 'registry-reui/bases/radix/' + file.path;
    const localPath = 'vendor/reui/source/' + sourcePath;
    const source = readFileSync(join(root, localPath));
    return { sourcePath, localPath, sha256: createHash('sha256').update(source).digest('hex') };
  }),
}));
if (examples.length !== 1241 || new Set(examples.map(x => x.id)).size !== 1241 || categories.length !== 86) throw new Error('Upstream census differs from the approved manifest');
const manifest = { revision, repository: 'https://github.com/keenthemes/reui', license: 'MIT', categories, examples };
writeFileSync(join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
const publicRegistry = join(root, 'apps/playground/src/registry');
mkdirSync(publicRegistry, { recursive: true });
writeFileSync(join(publicRegistry, 'reui-manifest.json'), JSON.stringify(manifest) + '\n');
writeFileSync(join(destination, 'README.md'), `# REUI source provenance\n\nImported from https://github.com/keenthemes/reui/tree/${revision}.\n\nThe manifest records 1241 distinct public examples across 86 categories, their source paths and SHA-256 hashes. Only one of the equivalent Base/Radix source sets is imported. Original files in source/ are byte-preserved reference material; the adapted runtime has separate source and modification records. Imported source is covered by the retained MIT license. Counts in this manifest describe source inventory, not completed runtime qualification.\n\nReproduce intake: \`node scripts/reui-intake.mjs /path/to/exact-upstream-checkout\`.\n`);
console.log(`Imported ${examples.length} byte-preserved REUI examples in ${categories.length} categories at ${revision}`);
