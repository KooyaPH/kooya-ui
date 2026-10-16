import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Typography } from "@kooyaph/ui/components";
import "./advanced.css";
export default function EditorDemo({
  alternate = false,
}: {
  alternate?: boolean;
}) {
  const [saved, setSaved] = useState("");
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit],
    content: alternate
      ? "<h2>Project brief</h2><p>Write the next chapter.</p>"
      : "<h2>Welcome to the workspace</h2><p>Select text to format it, or start writing.</p>",
    editorProps: {
      attributes: {
        "aria-label": "Document content",
        role: "textbox",
        "aria-multiline": "true",
      },
    },
  });
  return (
    <section className="advanced-demo">
      <Typography.Title level={4}>Document editor</Typography.Title>
      <div className="advanced-toolbar">
        <Button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          aria-pressed={editor?.isActive("bold")}
        >
          Bold
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          aria-pressed={editor?.isActive("italic")}
        >
          Italic
        </Button>
        <Button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          Heading
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          Bullet list
        </Button>
        <Button onClick={() => editor?.chain().focus().undo().run()}>
          Undo
        </Button>
        <Button onClick={() => editor?.chain().focus().redo().run()}>
          Redo
        </Button>
        <Button
          type="primary"
          onClick={() => setSaved(editor?.getHTML() ?? "")}
        >
          Save locally
        </Button>
      </div>
      <EditorContent editor={editor} />
      <p role="status">
        {saved
          ? `Saved in this preview (${saved.length} HTML characters).`
          : "Unsaved document. Changes remain in this preview only."}
      </p>
      {saved && (
        <details>
          <summary>Saved HTML</summary>
          <pre>{saved}</pre>
        </details>
      )}
    </section>
  );
}
export { EditorDemo as RichTextDemo };
