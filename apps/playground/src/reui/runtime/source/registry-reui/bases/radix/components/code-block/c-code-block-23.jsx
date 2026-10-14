"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CodeBlock, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ScrollArea, ScrollBar } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
const code = `export async function syncWorkspace(workspaceId: string) {
  const workspace = await db.workspace.findUnique({ where: { id: workspaceId } })

  if (!workspace) {
    throw new WorkspaceNotFoundError(workspaceId)
  }

  const members = await db.member.findMany({ where: { workspaceId } })

  for (const member of members) {
    if (member.status === "invited") {
      await mail.send({
        to: member.email,
        template: "workspace-reminder",
      })
    }
  }

  return { synced: members.length }
}`;
/*
 * The block detects its own regions from indentation, so the only reason this
 * list exists is the "Fold all" button: the snippet is a literal here, so its
 * region starts are known without asking the primitive for them.
 *
 * The ScrollArea composes INSIDE the block, under the header, so the fold
 * controls never scroll away and the block's own chrome stays the container.
 */
const REGION_STARTS = [1, 4, 10, 11, 12];
export default function Pattern() {
    /* Opens with the inner branch folded, so the nesting is visible at a glance:
       folding line 10 swallows it, and unfolding 10 brings it back still
       folded. */
    const [folded, setFolded] = useState([11]);
    return (_jsxs(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, className: "w-full max-w-2xl", foldable: true, folded: folded, onFoldedChange: setFolded, children: [_jsxs(CodeBlockHeader, { className: "gap-1.5", children: [_jsx(CodeBlockTitle, { children: "sync-workspace.ts" }), _jsxs("div", { className: "ml-auto flex items-center gap-1", children: [_jsx(Button, { size: "xs", variant: "ghost", onClick: () => setFolded(REGION_STARTS), children: "Fold all" }), _jsx(Button, { size: "xs", variant: "ghost", disabled: !folded.length, onClick: () => setFolded([]), children: "Unfold all" }), _jsx(Separator, { orientation: "vertical", className: "h-4" }), _jsx(CodeBlockCopyButton, {})] })] }), _jsxs(ScrollArea, { className: "rounded-[inherit] **:data-[slot=scroll-area-viewport]:max-h-72", children: [_jsx(CodeBlockContent, {}), _jsx(ScrollBar, { orientation: "horizontal" })] })] }));
}
