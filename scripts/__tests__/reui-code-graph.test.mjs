import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
const root = path.resolve(import.meta.dirname, "../..");
test("downloaded usage and supporting source have resolvable local imports without upstream aliases", () => {
  const code = path.join(root, "apps/playground/src/reui/code");
  const files = fs
    .readdirSync(code, { recursive: true })
    .filter((file) => file.endsWith(".tsx"));
  assert.ok(files.length >= 1241);
  for (const name of files) {
    const file = path.join(code, name),
      source = fs.readFileSync(file, "utf8"),
      ast = ts.createSourceFile(
        file,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
    function scan(node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const spec = node.moduleSpecifier.text;
        assert.ok(!spec.startsWith("@/"), `${name}: ${spec}`);
        if (spec.startsWith(".")) {
          const target = path.resolve(path.dirname(file), spec);
          assert.ok(
            [
              "",
              ".tsx",
              ".ts",
              ".jsx",
              ".js",
              ".json",
              "/index.tsx",
              "/index.ts",
            ].some((s) => fs.existsSync(target + s)),
            `${name}: ${spec}`,
          );
        }
      }
      ts.forEachChild(node, scan);
    }
    scan(ast);
  }
});
