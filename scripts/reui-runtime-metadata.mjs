import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
const root = path.resolve("apps/playground/src/reui");
const manifest = JSON.parse(
  fs.readFileSync("vendor/reui/manifest.json", "utf8"),
);
const cache = new Map();
function dependencies(file, seen = new Set()) {
  if (seen.has(file)) return new Set();
  seen.add(file);
  if (!cache.has(file)) {
    const ast = ts.createSourceFile(
      file,
      fs.readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const refs = [];
    function scan(node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      )
        refs.push(node.moduleSpecifier.text);
      ts.forEachChild(node, scan);
    }
    scan(ast);
    cache.set(file, refs);
  }
  const result = new Set();
  for (const spec of cache.get(file)) {
    if (spec.startsWith(".")) {
      const candidate = path.resolve(path.dirname(file), spec);
      const child = [
        "",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        "/index.tsx",
        "/index.ts",
      ]
        .map((s) => candidate + s)
        .find((p) => fs.existsSync(p));
      if (!child) throw Error(`Unresolved ${spec} in ${file}`);
      if (!child.endsWith(".json") && !child.endsWith(".css"))
        for (const dep of dependencies(child, seen)) result.add(dep);
    } else {
      const name = spec.startsWith("@")
        ? spec.split("/").slice(0, 2).join("/")
        : spec.split("/")[0];
      if (name === "@kooyaph/ui") {
        result.add("@kooyaph/ui");
        result.add("antd");
      } else if (!name.startsWith("node:")) result.add(name);
    }
  }
  return result;
}
const examples = Object.fromEntries(
  manifest.examples.map((example) => [
    example.id,
    [
      ...dependencies(
        path.join(
          root,
          "runtime/examples",
          example.category,
          example.id + ".jsx",
        ),
      ),
    ].sort(),
  ]),
);
fs.writeFileSync(
  "apps/playground/src/registry/reui-runtime-dependencies.json",
  JSON.stringify({ revision: manifest.revision, examples }, null, 2) + "\n",
);
console.log(
  `Recorded actual runtime dependencies for ${Object.keys(examples).length} adapted examples`,
);
