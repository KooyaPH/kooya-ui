import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CodeBlock, CodeBlockContent, CodeBlockCopyButton, } from "../../reui/code-block/code-block.jsx";
import { ScrollArea, ScrollBar } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
const code = `export async function resolveWorkspaceMembershipForActiveSubscription(workspaceId: string, userId: string) {
  const membership = await db.membership.findFirst({ where: { workspaceId, userId, status: "active" } })
  if (!membership) throw new WorkspaceAccessError("No active membership for this workspace")
  return membership
}

export function formatSeatSummary(seats: number, used: number) {
  return \`\${used} of \${seats} seats in use, \${Math.max(0, seats - used)} remaining\`
}

export function countBillableSeats(members: Member[]) {
  return members.filter((member) => member.status === "active" && !member.isGuest).length
}

export function canInviteMember(seats: number, used: number) {
  return used < seats
}`;
/**
 * Both axes belong to the consumer's ScrollArea here: `CodeBlockContent`
 * hands the surface over without an internal scroll container, and the block
 * itself stays the bordered chrome. `max-h` rather than a fixed height, so a
 * short file does not leave dead space under the code.
 *
 * With no header the copy button pins itself over the code surface, hidden
 * until the block is hovered or the button takes focus. Line 1 scrolls
 * underneath it, so the button needs a backdrop of its own: `outline` draws
 * the border, and `bg-card` fills it (the variant's own dark fill is 4.5%
 * opaque, which the code shows through).
 */
export default function Pattern() {
    return (_jsxs(CodeBlock, { code: code, language: "typescript", className: "w-full max-w-2xl", children: [_jsx(CodeBlockCopyButton, { variant: "outline", size: "icon-sm", className: "bg-card hover:bg-muted" }), _jsxs(ScrollArea, { className: "rounded-[inherit] **:data-[slot=scroll-area-viewport]:max-h-56", children: [_jsx(CodeBlockContent, {}), _jsx(ScrollBar, { orientation: "horizontal" })] })] }));
}
