import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
for (const filename of ["styles.css", "brand.css"]) {
  await copyFile(
    new URL(`../src/${filename}`, import.meta.url),
    new URL(`../dist/${filename}`, import.meta.url),
  );
}
// Peer-package repairs belong to the application's package-manager config.
// Ship the reviewed bytes with the tarball so consumers do not need this repo.
const tooling = JSON.parse(await readFile(new URL("../../../package.json", import.meta.url), "utf8"));
const output = new URL("../dist/patches/", import.meta.url);
await mkdir(output, { recursive: true });
const patches = [];
for (const [packageAndVersion, source] of Object.entries(tooling.pnpm.patchedDependencies)) {
  const filename = source.split("/").at(-1);
  const bytes = await readFile(new URL(`../../../${source}`, import.meta.url));
  await writeFile(new URL(filename, output), bytes);
  patches.push({ packageAndVersion, filename, sha256: createHash("sha256").update(bytes).digest("hex") });
}
await writeFile(new URL("manifest.json", output), JSON.stringify({ schemaVersion: 1, patches }, null, 2) + "\n");
