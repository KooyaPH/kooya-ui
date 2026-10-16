import fs from "node:fs";
const root = new URL("../dist/", import.meta.url);
for (const file of fs
  .readdirSync(root, { recursive: true })
  .filter((file) => file.endsWith(".d.ts"))) {
  const location = new URL(file, root);
  let source = fs.readFileSync(location, "utf8");
  source = source.replace(
    /(from\s*["']|import\s*\(["'])(\.\.?\/[^"']+)(["'])/g,
    (full, start, target, end) =>
      /\.(?:js|mjs|cjs|json|css)$/.test(target)
        ? full
        : start + target + ".js" + end,
  );
  fs.writeFileSync(location, source);
}
console.log(
  "Qualified ESM declaration paths for bundler and NodeNext consumers",
);
