import fs from "node:fs";
import path from "node:path";
import cp from "node:child_process";
const temporary = fs.mkdtempSync("/tmp/kooya-recipe-bundle-");
const target = path.join(process.cwd(), "apps/playground/public/downloads");
fs.mkdirSync(target, { recursive: true });
cp.execFileSync(
  "corepack",
  ["pnpm", "--filter", "@kooyaph/ui", "pack", "--pack-destination", temporary],
  { stdio: "ignore" },
);
fs.cpSync("apps/playground/src/reui", path.join(temporary, "reui"), {
  recursive: true,
});
fs.cpSync(
  "apps/playground/src/site",
  path.join(temporary, "site"),
  { recursive: true },
);
fs.cpSync('apps/playground/src/registry',path.join(temporary,'registry'),{recursive:true});
fs.cpSync('patches',path.join(temporary,'patches'),{recursive:true});
fs.cpSync('apps/playground/public/brand',path.join(temporary,'public/brand'),{recursive:true});
fs.copyFileSync('apps/playground/public/favicon.svg',path.join(temporary,'public/favicon.svg'));
fs.cpSync(
  "apps/playground/public/reui-assets",
  path.join(temporary, "public/reui-assets"),
  { recursive: true },
);
fs.cpSync(
  "apps/playground/public/excalidraw-assets",
  path.join(temporary, "public/excalidraw-assets"),
  { recursive: true },
);
const app = JSON.parse(fs.readFileSync("apps/playground/package.json", "utf8"));
const tooling = JSON.parse(fs.readFileSync("package.json", "utf8"));
// The workspace lock does not travel with this independent consumer. Resolve
// its direct versions from the installed, verified workspace and pin every
// patched transitive package so a future resolution cannot bypass a repair.
const dependencies = Object.fromEntries(Object.keys(app.dependencies).map(name => [
  name,
  name === "@kooyaph/ui" ? app.dependencies[name] : JSON.parse(
    fs.readFileSync(path.join("apps/playground/node_modules", name, "package.json"), "utf8"),
  ).version,
]));
const patchOverrides = Object.fromEntries(Object.keys(tooling.pnpm.patchedDependencies).map(key => {
  const separator = key.lastIndexOf("@");
  return [key.slice(0, separator), key.slice(separator + 1)];
}));
const archive = fs.readdirSync(temporary).find((file) => file.endsWith(".tgz"));
fs.writeFileSync(
  path.join(temporary, "package.json"),
  JSON.stringify(
    {
      name: "kooya-recipes",
      private: true,
      type: "module",
      packageManager: tooling.packageManager,
      engines: tooling.engines,
      pnpm: {...tooling.pnpm, overrides: {...tooling.pnpm.overrides, ...patchOverrides}},
      scripts: {
        dev: "vite --host 127.0.0.1 --port 5196 --strictPort",
        build: "vite build",
      },
      dependencies: { ...dependencies, "@kooyaph/ui": "file:./" + archive },
      devDependencies: {
        ...app.devDependencies,
        vite: tooling.devDependencies.vite,
        "@vitejs/plugin-react": tooling.devDependencies["@vitejs/plugin-react"],
      },
    },
    null,
    2,
  ),
);
fs.writeFileSync(
  path.join(temporary, "index.html"),
  '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kooya recipe</title><link rel="icon" type="image/svg+xml" href="./favicon.svg"></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
);
fs.writeFileSync(
  path.join(temporary, "vite.config.ts"),
  "import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import tailwindcss from '@tailwindcss/vite';export default defineConfig({plugins:[react(),tailwindcss()]});\n",
);
fs.writeFileSync(
  path.join(temporary, "main.tsx"),
  `import React from 'react';import {createRoot} from 'react-dom/client';import {PreviewRoute} from './site/Preview';import {parseRoute} from './site/model';import '@kooyaph/ui/styles.css';import './reui/reui.css';import './site/site.css';import '@fontsource-variable/dm-sans';import '@fontsource/syncopate/700.css';const route=parseRoute(location.hash);const id=route.page==='preview'?route.variantId:new URLSearchParams(location.search).get('example')??'c-button-1';createRoot(document.getElementById('root')!).render(<React.StrictMode><PreviewRoute variantId={id}/></React.StrictMode>);\n`,
);
fs.writeFileSync(
  path.join(temporary, "README.md"),
  `# Kooya recipes\n\nThis is a complete standalone source bundle with actual Ant Design, adapted MIT REUI source, Kooya's packed library, exact dependency versions, local sample assets and Vite/Tailwind configuration. It also includes the composed groups/blocks/sections/templates source under site/collections.\n\nUse Node22 or later. Run corepack pnpm install, then corepack pnpm dev. Open http://127.0.0.1:5196/?example=c-button-1. Choose another upstream example ID with the example query parameter; use mode=dark for dark mode. Run corepack pnpm build to build the standalone recipe viewer.\n\nWhen copying into an existing app, retain the local supporting modules and import reui/reui.css. Add @tailwindcss/vite to your Vite plugins and copy public/reui-assets and public/excalidraw-assets into your public directory. Canonical native controls use @kooyaph/ui/components; adapted recipes use the local adapter APIs. The source licenses are included. No publishing or external application backend is required.\n`,
);
cp.execFileSync("tar", [
  "-czf",
  path.join(target, "kooya-recipes.tar.gz"),
  "-C",
  temporary,
  ".",
]);
console.log("Created complete standalone recipe bundle from " + temporary);
