import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
const files = [
    {
        name: "app/api/invites/route.ts",
        added: 12,
        removed: 3,
        code: `export async function POST(request: Request) {
  const { email } = await request.json()
  const invite = await createInvite(session.workspaceId, email)
  return Response.json(invite, { status: 201 })
}`,
    },
    {
        name: "lib/seats.ts",
        added: 8,
        removed: 0,
        code: `export async function countBillableSeats(workspaceId: string) {
  const members = await db.member.findMany({ where: { workspaceId } })
  const used = members.filter((member) => !member.isGuest).length
  return { used, total: await seatAllowance(workspaceId) }
}`,
    },
    {
        name: "emails/workspace-invite.tsx",
        added: 24,
        removed: 1,
        code: `export function WorkspaceInvite({ workspace }: InviteProps) {
  return (
    <Email preview={\`Join \${workspace.name}\`}>
      <Button href={workspace.inviteUrl}>Accept invite</Button>
    </Email>
  )
}`,
    },
];
/**
 * The block owns only its OWN scrolling, so framing is a composition concern:
 * one shadcn `ScrollArea` scrolls the whole changed-file list, each block
 * sizes to its content instead of scrolling separately, and the `Card` is the
 * container - per-style radius comes from it, never from a hand-rolled
 * `rounded-* border` div.
 */
export default function Pattern() {
    return (_jsx(Card, { className: "w-full max-w-2xl gap-0 py-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(ScrollArea, { className: "h-96 rounded-[inherit]", children: _jsx("div", { className: "flex flex-col gap-3 p-3", children: files.map((file) => (_jsx(CodeBlock, { code: file.code, language: "tsx", showLineNumbers: true, children: _jsxs(CodeBlockHeader, { className: "gap-2", children: [_jsx(CodeBlockTitle, { children: file.name }), _jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [_jsxs(Badge, { variant: "success-light", children: ["+", file.added] }), _jsxs(Badge, { variant: "destructive-light", children: ["-", file.removed] }), _jsx(CodeBlockCopyButton, {})] })] }) }, file.name))) }) }) }) }));
}
