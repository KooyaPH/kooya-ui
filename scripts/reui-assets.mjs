import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import ts from "typescript";
const dir = "vendor/reui/source/registry-reui/bases/radix/components";
const assets = "apps/playground/public/reui-assets/images";
fs.mkdirSync(assets, { recursive: true });
const previous = fs.existsSync("vendor/reui/assets.json")
  ? JSON.parse(fs.readFileSync("vendor/reui/assets.json", "utf8"))
  : { mapping: {}, failures: [] };
const urls = new Set(Object.keys(previous.mapping));
for (const file of fs
  .readdirSync(dir, { recursive: true })
  .filter((f) => f.endsWith(".tsx"))) {
  const text = fs.readFileSync(path.join(dir, file), "utf8");
  const ast = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  function scan(n) {
    if (
      ts.isTemplateExpression(n) &&
      n.head.text.startsWith("https://picsum.photos/")
    ) {
      const count = Math.max(
        10,
        ...[...text.matchAll(/(?:length:|ITEMS_COUNT\s*=)\s*(\d+)/g)].map((m) =>
          Number(m[1]),
        ),
      );
      for (let i = 0; i < count; i++) {
        let url = n.head.text;
        let valid = true;
        for (const span of n.templateSpans) {
          const expression = span.expression.getText(ast);
          const match = expression.match(/^(?:index|i)(?:\s*\+\s*(\d+))?$/);
          if (!match) {
            valid = false;
            break;
          }
          url += String(i + Number(match[1] ?? 0)) + span.literal.text;
        }
        if (valid) urls.add(url);
      }
    }
    if (
      ts.isStringLiteral(n) &&
      /^https:\/\/(images\.unsplash\.com|picsum\.photos|i\.pravatar\.cc|flagcdn\.com|avatars\.githubusercontent\.com|github\.com\/[^/]+\.png)/.test(
        n.text,
      )
    )
      urls.add(n.text);
    ts.forEachChild(n, scan);
  }
  scan(ast);
}
const mapping = { ...previous.mapping };
const failures = [];
const queue = [...urls];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      if (
        mapping[url] &&
        fs.existsSync("apps/playground/public" + mapping[url])
      )
        continue;
      const id = crypto
        .createHash("sha256")
        .update(url)
        .digest("hex")
        .slice(0, 20);
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) throw Error(String(response.status));
        const mime = response.headers.get("content-type") ?? "";
        const extension = mime.includes("png")
          ? "png"
          : mime.includes("svg")
            ? "svg"
            : mime.includes("webp")
              ? "webp"
              : "jpg";
        const name = id + "." + extension;
        fs.writeFileSync(
          path.join(assets, name),
          Buffer.from(await response.arrayBuffer()),
        );
        mapping[url] = "/reui-assets/images/" + name;
      } catch (e) {
        failures.push({ url, error: e.message });
      }
    }
  }),
);
fs.writeFileSync(
  "vendor/reui/assets.json",
  JSON.stringify(
    { mapping, failures, replacements: previous.replacements ?? [] },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify({ downloaded: Object.keys(mapping).length, failures }),
);
