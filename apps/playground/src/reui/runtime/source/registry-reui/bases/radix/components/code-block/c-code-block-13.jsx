"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle, useCodeBlockConfig, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { ScrollArea, ScrollBar } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const code = `export async function createInvite(workspaceId: string, email: string) {
  const workspace = await db.workspace.findUnique({ where: { id: workspaceId } })
  if (!workspace) throw new WorkspaceNotFoundError(workspaceId)

  const seats = await countBillableSeats(workspaceId)
  if (seats.used >= seats.total) {
    throw new SeatLimitError(workspaceId, seats.total)
  }

  const invite = await db.invite.create({
    data: { workspaceId, email, status: "pending" },
  })

  await mail.send({ to: email, template: "workspace-invite" })
  return invite
}`;
/**
 * The counter takes no `code` prop: `useCodeBlockConfig` hands it the block's
 * own source, so a control composed into the header cannot drift from what the
 * block actually renders.
 *
 * Counting is case SENSITIVE on purpose. `highlightedWords` marks exact
 * matches, so a case-insensitive count reports 11 where the block paints 10
 * and the header quietly contradicts the code under it.
 */
function MatchCount({ query }) {
    const { code: source } = useCodeBlockConfig("MatchCount");
    const matches = useMemo(() => {
        const needle = query.trim();
        if (needle.length < 2)
            return null;
        return source.split(needle).length - 1;
    }, [source, query]);
    if (matches === null)
        return null;
    return (_jsxs(Badge, { variant: matches ? "primary-light" : "secondary", children: [matches, " ", matches === 1 ? "match" : "matches"] }));
}
export default function Pattern() {
    const [query, setQuery] = useState("workspace");
    /* `highlightedWords` is a spec, not a regex: a query under two characters
       would mark almost every line, so it stays empty until the search is worth
       rendering. */
    const words = useMemo(() => (query.trim().length < 2 ? undefined : [query.trim()]), [query]);
    return (_jsxs(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, highlightedWords: words, className: "w-full max-w-2xl", children: [_jsxs(CodeBlockHeader, { className: "gap-2", children: [_jsx(CodeBlockTitle, { children: "invites.ts" }), _jsxs("div", { className: "ml-auto flex items-center gap-2", children: [_jsx(MatchCount, { query: query }), _jsxs(ButtonGroup, { children: [_jsx(Input, { type: "search", value: query, "aria-label": "Search in file", placeholder: "Search", onChange: (event) => setQuery(event.target.value), className: "w-40 text-xs" }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Clear search", disabled: !query, onClick: () => setQuery(""), children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine" }) })] })] })] }), _jsx(CodeBlockCopyButton, { variant: "outline", size: "icon-xs", className: "bg-card hover:bg-muted" }), _jsxs(ScrollArea, { className: "rounded-[inherit] **:data-[slot=scroll-area-viewport]:max-h-72", children: [_jsx(CodeBlockContent, {}), _jsx(ScrollBar, { orientation: "horizontal" })] })] }));
}
