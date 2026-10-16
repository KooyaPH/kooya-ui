import { readFileSync } from "node:fs";
const packageVersion = JSON.parse(
  readFileSync(new URL("../packages/ui/package.json", import.meta.url), "utf8"),
).version;
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
const root = process.cwd();
const digest = (bytes) =>
  crypto.createHash("sha256").update(bytes).digest("hex");
const sourceFiles = execFileSync(
  "git",
  ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean)
  .sort();
const inventory = [];
for (const file of sourceFiles) {
  try {
    const bytes = await fs.readFile(path.join(root, file));
    inventory.push({ path: file, sha256: digest(bytes) });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
const fingerprint = digest(JSON.stringify(inventory));
const build = path.join(root, "apps/playground/dist");
const buildTime = (await fs.stat(path.join(build, "index.html"))).mtimeMs;
for (const file of sourceFiles.filter((x) =>
  /^(apps\/playground\/src|packages\/ui\/src)\//.test(x),
)) {
  if ((await fs.stat(path.join(root, file))).mtimeMs > buildTime)
    throw new Error("Source changed after the build: " + file);
}
const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15);
const snapshot = path.join(
  root,
  "output/previews",
  `editorial-v1-${stamp}-${fingerprint.slice(0, 12)}`,
);
await fs.mkdir(snapshot, { recursive: true });
await fs.cp(build, path.join(snapshot, "dist"), { recursive: true });
const assets = {};
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name !== "build-provenance.json")
      assets[path.relative(path.join(snapshot, "dist"), file)] = digest(
        await fs.readFile(file),
      );
  }
}
await walk(path.join(snapshot, "dist"));
const provenance = {
  name: "Kooya UI v1 Editorial and Governance",
  version: packageVersion,
  built_at: new Date(buildTime).toISOString(),
  frozen_at: new Date().toISOString(),
  source_base_sha: execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim(),
  branch: execFileSync("git", ["branch", "--show-current"], {
    encoding: "utf8",
  }).trim(),
  source_status:
    "Source inventory records the exact candidate, including any uncommitted changes",
  source_fingerprint: fingerprint,
  layouts: 2,
  compositions: ["editorial", "governance"],
  custom_accents: true,
  palettes: 12,
  modes: 2,
  densities: 2,
  combinations: 96,
  scenes: 6,
  assets,
};
await fs.writeFile(
  path.join(snapshot, "dist/build-provenance.json"),
  JSON.stringify(provenance, null, 2) + "\n",
);
await fs.writeFile(
  path.join(snapshot, "source-inventory.json"),
  JSON.stringify(inventory, null, 2) + "\n",
);
await fs.writeFile(
  path.join(snapshot, "vite.preview.config.mjs"),
  `export default ${JSON.stringify({ root: snapshot, build: { outDir: "dist" }, server: { proxy: {}, hmr: false }, preview: { proxy: {}, host: "127.0.0.1", port: Number(process.env.V1_PREVIEW_PORT ?? 5825), strictPort: true, allowedHosts: ["ui.test.kooyaai.com", "localhost", "127.0.0.1"] } })};\n`,
);
console.log(
  JSON.stringify(
    { snapshot, fingerprint, assets: Object.keys(assets).length },
    null,
    2,
  ),
);
