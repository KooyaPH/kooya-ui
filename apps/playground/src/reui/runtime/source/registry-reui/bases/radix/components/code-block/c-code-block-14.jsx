"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CodeBlock, CodeBlockCopyButton, } from "../../reui/code-block/code-block.jsx";
import { Frame, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../../../../../../adapters/selection.tsx";
const samples = [
    {
        file: "greeting.tsx",
        language: "tsx",
        code: `export function Greeting({ name }: { name: string }) {
  return <p>Hello {name}</p>
}`,
    },
    {
        file: "greeting.py",
        language: "python",
        code: `def greeting(name: str) -> str:
    return f"Hello {name}"`,
    },
    {
        file: "greeting.sql",
        language: "sql",
        code: `select id, email
from users
where created_at > now() - interval '7 days';`,
    },
    {
        file: "greeting.sh",
        language: "bash",
        code: `curl -s https://api.example.com/v1/users \\
  -H "Authorization: Bearer $TOKEN"`,
    },
];
/*
 * One grammar chunk loads per selected language, so switching files is also a
 * lazy-loading demo.
 *
 * A dense frame is what makes this read as one editor: the panel meets the
 * header with no gap or inset, and the ghost block inside contributes no
 * second border. The tabs live in the header, so the blocks stay headerless
 * and the copy button pins itself over the code.
 */
export default function Pattern() {
    return (_jsx(Tabs, { defaultValue: samples[0].file, className: "w-full max-w-2xl", children: _jsxs(Frame, { dense: true, spacing: "sm", children: [_jsxs(FrameHeader, { className: "flex-row items-center gap-2", children: [_jsx(FrameTitle, { children: "Examples" }), _jsx(TabsList, { className: "ml-auto bg-transparent", children: samples.map((sample) => (_jsx(TabsTrigger, { value: sample.file, children: sample.file }, sample.file))) })] }), _jsx(FramePanel, { className: "p-0!", children: samples.map((sample) => (_jsx(TabsContent, { value: sample.file, children: _jsx(CodeBlock, { code: sample.code, language: sample.language, variant: "ghost", showLineNumbers: true, children: _jsx(CodeBlockCopyButton, { variant: "outline", size: "icon-xs", className: "bg-card hover:bg-muted" }) }) }, sample.file))) })] }) }));
}
