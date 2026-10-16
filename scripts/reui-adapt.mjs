import fs from "node:fs";
import path from "node:path";
import cp from "node:child_process";
import ts from "typescript";
const root = process.cwd(),
  upstream = process.env.REUI_SOURCE_DIR ?? "/tmp/kooya-reui-source-20261013";
const output = path.join(root, "apps/playground/src/reui");
const mappings = {
  carousel: "navigation",
  collapsible: "navigation",
  "navigation-menu": "navigation",
  table: "data",
  pagination: "data",
  breadcrumb: "utility",
  resizable: "utility",
  button: "controls",
  input: "controls",
  textarea: "controls",
  checkbox: "controls",
  switch: "controls",
  "radio-group": "controls",
  slider: "controls",
  progress: "controls",
  spinner: "controls",
  skeleton: "controls",
  "button-group": "controls",
  select: "selection",
  tabs: "selection",
  accordion: "selection",
  toggle: "selection",
  "toggle-group": "selection",
  "input-otp": "selection",
  card: "layout",
  avatar: "layout",
  badge: "layout",
  separator: "layout",
  label: "layout",
  field: "layout",
  empty: "layout",
  "input-group": "layout",
  item: "layout",
  dialog: "overlays",
  "alert-dialog": "overlays",
  drawer: "overlays",
  sheet: "overlays",
  popover: "overlays",
  tooltip: "overlays",
  "hover-card": "overlays",
  "dropdown-menu": "menus",
  "context-menu": "menus",
  menubar: "menus",
};
const seen = new Set();
const sources = new Map();
const destinations = new Map();
const assetMap = fs.existsSync("vendor/reui/assets.json")
  ? JSON.parse(fs.readFileSync("vendor/reui/assets.json", "utf8")).mapping
  : {};
function read(p) {
  try {
    return fs.readFileSync(path.join(root, "vendor/reui/source", p), "utf8");
  } catch {
    try {
      const original = cp
        .execFileSync(
          "git",
          ["show", `3b67464bcad3c29fbdb12437afb70153384eee19:${p}`],
          { cwd: upstream, stdio: ["ignore", "pipe", "ignore"] },
        )
        .toString();
      const local = path.join(root, "vendor/reui/source", p);
      fs.mkdirSync(path.dirname(local), { recursive: true });
      fs.writeFileSync(local, original);
      return original;
    } catch {
      return null;
    }
  }
}
function resolve(p) {
  for (const suffix of [
    "",
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
    ".json",
    "/index.tsx",
    "/index.ts",
  ])
    if (read(p + suffix) !== null) return p + suffix;
  throw Error("Missing source " + p);
}
function target(p) {
  return "runtime/source/" + p.replace(/\.(tsx?|jsx?)$/, ".jsx");
}
function visit(p) {
  if (seen.has(p)) return;
  seen.add(p);
  let source = read(p);
  if (p === "registry-reui/bases/radix/components/data-grid/c-data-grid-22.tsx") {
    // Owned semantic correction: this button clears the search, not the clipboard.
    // Guard the actual handler context so upstream changes require a fresh review.
    const clearButton = 'aria-label="Copy"\n                    title="Copy"\n                    size="icon-xs"\n                    onClick={() => setSearchQuery("")}';
    if (source.split(clearButton).length !== 2)
      throw new Error("Grid22 search-clear source changed; review the owned correction");
    source = source.replace(clearButton, clearButton.replaceAll('"Copy"', '"Clear search"'));
  }
  if (p === "registry-reui/bases/radix/components/data-grid/c-data-grid-23.tsx") {
    // Name the original search and each native row-action trigger; preserve handlers/types.
    const search = '<InputGroupInput\n                placeholder="Search..."';
    const action = '<Button className="size-7" size="icon" variant="ghost">';
    if (source.split(search).length !== 2 || source.split(action).length !== 2)
      throw new Error("Grid23 accessible-control source changed; review the owned correction");
    source = source.replace(search, '<InputGroupInput\n                aria-label="Search team members"\n                placeholder="Search..."');
    source = source.replace(action, '<Button className="size-7" size="icon" variant="ghost" aria-label={`Actions for ${row.original.name}`}>');
  }
  if (p === "registry-reui/bases/radix/reui/kanban.tsx") {
    // The actual sortable parent is keyboard-focusable; pointer listeners stay on its handle.
    const item = 'data-disabled={disabled}\n        ref={setNodeRef}\n        style={style}\n        {...attributes}\n        className={cn(\n          isSortableDragging';
    if (source.split(item).length !== 2)
      throw new Error("Kanban focusable-item source changed; review keyboard correction");
    source = source.replace(item, item.replace('        className={cn(', '        onKeyDown={(event) => {\n          if (event.target === event.currentTarget) listeners?.onKeyDown?.(event)\n        }}\n        className={cn('));
  }
  if (p === "registry-reui/bases/radix/components/kanban/c-kanban-6.tsx") {
    const handle = '<Button size="icon-xs" variant="ghost">';
    if (source.split(handle).length !== 2)
      throw new Error("Kanban6 column-handle source changed; review its accessible name");
    source = source.replace(handle, '<Button size="icon-xs" variant="ghost" aria-label={`Move ${COLUMN_TITLES[value] ?? value} column`}>');
  }
  if (p.endsWith(".json")) {
    const dest = path.join(output, target(p));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, source);
    const typedDest = path.join(
      output,
      target(p).replace(/^runtime\/source\//, "code/supporting/"),
    );
    fs.mkdirSync(path.dirname(typedDest), { recursive: true });
    fs.writeFileSync(typedDest, source);
    return;
  }
  source = source.replaceAll(
    "https://cdn.jsdelivr.net/npm/emojibase-data@17.0.0",
    "/reui-assets/emoji",
  );
  for (const [url, local] of Object.entries(assetMap))
    source = source.replaceAll(url, local);
  const mediaAst = ts.createSourceFile(
    p,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const mediaEdits = [];
  function mediaScan(n) {
    if (
      ts.isTemplateExpression(n) &&
      n.head.text.startsWith("https://picsum.photos/")
    )
      mediaEdits.push({
        start: n.getStart(mediaAst),
        end: n.end,
        text: "localAsset(" + n.getText(mediaAst) + ")",
      });
    ts.forEachChild(n, mediaScan);
  }
  mediaScan(mediaAst);
  for (const e of mediaEdits.sort((a, b) => b.start - a.start))
    source = source.slice(0, e.start) + e.text + source.slice(e.end);
  if (mediaEdits.length)
    source = 'import {localAsset} from "@kooya-local-assets";\n' + source;
  if (p.endsWith("/ui/native-select.tsx"))
    source += '\nObject.assign(NativeSelect,{recipeRole:"NativeSelect"});\n';
  sources.set(p, source);
  destinations.set(p, new Map());
  let js = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
  const from = target(p);
  const ast = ts.createSourceFile(
    p,
    js,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  const edits = [];
  function scan(node, currentAst = ast) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const spec = node.moduleSpecifier.text;
      let destination;
      let dest;
      if (spec === "@kooya-local-assets") dest = "adapters/assets.ts";
      else if (spec === "@base-ui/react/autocomplete")
        dest = "adapters/autocomplete.tsx";
      else if (
        /registry-reui\/bases\/radix\/reui\/(stepper|timeline|badge)$/.test(
          spec,
        )
      )
        dest = "adapters/structured.tsx";
      else if (/registry-reui\/bases\/radix\/reui\/autocomplete$/.test(spec))
        dest = "adapters/autocomplete.tsx";
      else if (
        /registry-reui\/bases\/radix\/reui\/cascader\/cascader(?:-(?:item|nav|columns|virtual|footer|context))?$/.test(
          spec,
        )
      )
        dest = "adapters/cascader.tsx";
      else if (
        /registry-reui\/bases\/radix\/reui\/(number-field|rating)$/.test(spec)
      )
        dest = "adapters/utility.tsx";
      else if (spec === "sonner") dest = "adapters/feedback.tsx";
      else if (spec.includes("/icon-placeholder")) dest = "adapters/icons.tsx";
      else if (spec === "next-themes") dest = "adapters/theme.tsx";
      else if (spec.startsWith("@/") || spec.startsWith(".")) {
        const native = spec.match(
          /(?:registry\/bases\/(?:radix|base)\/ui|components\/ui)\/([^/]+)$/,
        )?.[1];
        if (native && mappings[native])
          dest = `adapters/${mappings[native]}.tsx`;
        else {
          const child = resolve(
            spec.startsWith("@/")
              ? spec.slice(2)
              : path.posix.normalize(
                  path.posix.join(path.posix.dirname(p), spec),
                ),
          );
          const family = child.match(
            /(?:registry\/bases\/(?:radix|base)\/ui|components\/ui)\/([^/]+)\.tsx$/,
          )?.[1];
          if (family && mappings[family])
            dest = `adapters/${mappings[family]}.tsx`;
          else {
            visit(child);
            dest = target(child);
          }
        }
      } else return;
      destinations.get(p).set(spec, dest);
      let relative = path.posix.relative(path.posix.dirname(from), dest);
      if (!relative.startsWith(".")) relative = "./" + relative;
      edits.push({
        start: node.moduleSpecifier.getStart(currentAst),
        end: node.moduleSpecifier.end,
        text: JSON.stringify(relative),
      });
    }
    ts.forEachChild(node, (child) => scan(child, currentAst));
  }
  scan(ast);
  for (const e of edits.sort((a, b) => b.start - a.start))
    js = js.slice(0, e.start) + e.text + js.slice(e.end);

  // Keep adapted TypeScript supporting modules alongside runtime output, including
  // type-only and elided imports, so code downloads never require upstream aliases.
  edits.length = 0;
  const originalAst = ts.createSourceFile(
    p,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  scan(originalAst, originalAst);
  let typedSource = source;
  for (const e of edits.sort((a, b) => b.start - a.start)) {
    const typedImport = JSON.parse(e.text).replace(/\.jsx$/, ".tsx");
    typedSource =
      typedSource.slice(0, e.start) +
      JSON.stringify(typedImport) +
      typedSource.slice(e.end);
  }
  const typedDest = path.join(
    output,
    from
      .replace(/^runtime\/source\//, "code/supporting/")
      .replace(/\.jsx$/, ".tsx"),
  );
  fs.mkdirSync(path.dirname(typedDest), { recursive: true });
  fs.writeFileSync(typedDest, typedSource);
  const dest = path.join(output, from);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, js);
}
const manifest = JSON.parse(
  fs.readFileSync("vendor/reui/manifest.json", "utf8"),
);
for (const category of manifest.categories)
  for (const example of manifest.examples.filter(
    (e) => e.category === category.id,
  )) {
    const p = example.files[0].sourcePath;
    visit(p);
    const basename = example.id + ".jsx";
    const dir = path.join(output, "runtime/examples", category.id);
    fs.mkdirSync(dir, { recursive: true });
    let rel = path.posix.relative(`runtime/examples/${category.id}`, target(p));
    fs.writeFileSync(
      path.join(dir, basename),
      `export { default } from '${rel.startsWith(".") ? rel : "./" + rel}';\n`,
    );
    const code = path.join(output, "code/examples", category.id);
    fs.mkdirSync(code, { recursive: true });
    let codeSource = sources.get(p);
    const codeFrom = `code/examples/${category.id}/${example.id}.tsx`;
    const sourceAst = ts.createSourceFile(
      p,
      codeSource,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const codeEdits = [];
    for (const node of sourceAst.statements) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier
      ) {
        const destination = destinations.get(p).get(node.moduleSpecifier.text);
        if (destination) {
          let relative = path.posix.relative(
            path.posix.dirname(codeFrom),
            destination
              .replace(/^runtime\/source\//, "code/supporting/")
              .replace(/\.jsx$/, ".tsx"),
          );
          if (!relative.startsWith(".")) relative = "./" + relative;
          codeEdits.push({
            start: node.moduleSpecifier.getStart(sourceAst),
            end: node.moduleSpecifier.end,
            text: JSON.stringify(relative),
          });
        }
      }
    }
    for (const e of codeEdits.sort((a, b) => b.start - a.start))
      codeSource =
        codeSource.slice(0, e.start) + e.text + codeSource.slice(e.end);
    fs.writeFileSync(
      path.join(code, example.id + ".tsx"),
      "// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.\n" +
        codeSource,
    );
    // Reviewed corrections live outside immutable vendor and generated trees.
    // Generate both runnable JS and copied TS from the same owned source.
    const owned = path.join(output, 'overrides', example.id + '.tsx');
    if (fs.existsSync(owned)) {
      const correction = fs.readFileSync(owned, 'utf8');
      const relocate = (source, destination) => {
        const ast = ts.createSourceFile(owned, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
        const replacements = [];
        function scan(node) {
          if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith('.')) {
            const target = path.resolve(path.dirname(owned), node.moduleSpecifier.text);
            let relative = path.relative(path.dirname(destination), target).split(path.sep).join('/');
            if (!relative.startsWith('.')) relative = './' + relative;
            replacements.push({ start: node.moduleSpecifier.getStart(ast), end: node.moduleSpecifier.end, text: JSON.stringify(relative) });
          }
          ts.forEachChild(node, scan);
        }
        scan(ast);
        for (const e of replacements.sort((a,b) => b.start - a.start)) source = source.slice(0,e.start) + e.text + source.slice(e.end);
        return source;
      };
      const runtimeOverride = path.join(output, 'runtime/overrides', example.id + '.jsx');
      fs.mkdirSync(path.dirname(runtimeOverride), { recursive: true });
      fs.writeFileSync(runtimeOverride, ts.transpileModule(relocate(correction, runtimeOverride), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText);
      let overrideRelative = path.relative(dir, runtimeOverride).split(path.sep).join('/');
      if (!overrideRelative.startsWith('.')) overrideRelative = './' + overrideRelative;
      fs.writeFileSync(path.join(dir, basename), `export { default } from ${JSON.stringify(overrideRelative)};\n`);
      const usageFile = path.join(code, example.id + '.tsx');
      fs.writeFileSync(usageFile, '// Owned correction for the adapted REUI recipe; retain the local adapters.\n' + relocate(correction, usageFile));
    }
  }
console.log(
  `Adapted ${manifest.examples.length} examples across ${seen.size} source modules`,
);
