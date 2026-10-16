import { readFileSync } from "node:fs";
const packageVersion = JSON.parse(
  readFileSync(new URL("../packages/ui/package.json", import.meta.url), "utf8"),
).version;
import { createServer } from "vite";
import { mkdir, writeFile } from "node:fs/promises";
const server = await createServer({
  root: new URL("../apps/playground", import.meta.url).pathname,
  server: { middlewareMode: true, hmr: false },
  logLevel: "error",
});
try {
  const { entries } = await server.ssrLoadModule("/src/registry/catalog.ts");
  const inventory = entries.map((entry) => ({
    id: entry.id,
    kind: entry.kind,
    title: entry.title,
    disposition: "retained-and-themed",
    variants: entry.variants.map((v) => ({
      id: v.id,
      title: v.title,
      route: `#/preview/${v.id}`,
    })),
  }));
  await mkdir("docs/v1", { recursive: true });
  await writeFile(
    "docs/v1/component-inventory.json",
    JSON.stringify(
      {
        version: packageVersion,
        entries: inventory,
        variants: inventory.reduce((n, e) => n + e.variants.length, 0),
      },
      null,
      2,
    ) + "\n",
  );
  await mkdir("apps/playground/public/v1", { recursive: true });
  await writeFile(
    "apps/playground/public/v1/component-inventory.json",
    JSON.stringify({ version: packageVersion, entries: inventory }),
  );
  console.log(
    JSON.stringify({
      categories: inventory.length,
      variants: inventory.reduce((n, e) => n + e.variants.length, 0),
    }),
  );
} finally {
  await server.close();
}
