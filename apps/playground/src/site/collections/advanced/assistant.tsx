import { useState } from "react";
import { Bubble, Sender } from "@ant-design/x";
import {
  Button,
  Select,
  Steps,
  Tag,
  Typography,
  Upload,
} from "@kooyaph/ui/components";
import "./advanced.css";
export default function AssistantDemo({
  alternate = false,
}: {
  alternate?: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState(
    alternate
      ? [
          {
            id: "prior-question",
            role: "user",
            content: "Draft a launch checklist",
          },
          {
            id: "prior-answer",
            role: "assistant",
            content:
              "Local demonstration checklist: confirm the owner, review the brief, test the release, and record approval. What should we refine?",
          },
        ]
      : [
          {
            id: "welcome",
            role: "assistant",
            content: "How can I help organize your work?",
          },
        ],
  );
  const [files, setFiles] = useState<string[]>([]);
  const [history, setHistory] = useState<{ value: string; label: string }[]>(
    alternate
      ? [
          {
            value: "Draft a launch checklist",
            label: "Draft a launch checklist",
          },
        ]
      : [],
  );
  const [completed, setCompleted] = useState(alternate);
  const submit = (value: string) => {
    if (!value.trim()) return;
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", content: value },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Local demonstration: I received “${value}”${files.length ? ` with ${files.length} attachment(s)` : ""}. Suggested next steps: identify the owner, review the scope, and record the outcome.`,
      },
    ]);
    setHistory((current) => [...current, { value, label: value.slice(0, 60) }]);
    setPrompt("");
    setCompleted(true);
  };
  return (
    <section className="advanced-demo">
      <div className="advanced-toolbar">
        <Typography.Title level={4}>AI workspace</Typography.Title>
        <Button
          onClick={() => {
            setMessages([]);
            setCompleted(false);
            setFiles([]);
            setPrompt("");
          }}
        >
          New conversation
        </Button>
        <Select
          aria-label="Prompt history"
          placeholder="Prompt history"
          options={history}
          onChange={setPrompt}
          value={undefined}
          disabled={!history.length}
        />
      </div>
      <p>
        Fictional, deterministic local replies. Attachments record names only;
        no model or upload service is connected.
      </p>
      <div className="advanced-chat" role="log" aria-label="Conversation">
        {messages.map((message) => (
          <Bubble
            key={message.id}
            content={message.content}
            placement={message.role === "user" ? "end" : "start"}
          />
        ))}
      </div>
      <Steps
        size="small"
        current={completed ? 3 : 0}
        items={[
          { title: "Receive prompt" },
          { title: "Review local context" },
          { title: "Draft response" },
        ]}
      />
      <div className="advanced-toolbar">
        <Upload
          beforeUpload={(file) => {
            setFiles((current) => [...current, file.name]);
            return false;
          }}
          showUploadList={false}
        >
          <Button>Attach local file</Button>
        </Upload>
        {files.map((file, index) => (
          <Tag
            key={`${file}-${index}`}
            closable
            onClose={() =>
              setFiles((current) => current.filter((_, i) => i !== index))
            }
          >
            {file}
          </Tag>
        ))}
      </div>
      <Sender
        value={prompt}
        onChange={setPrompt}
        onSubmit={submit}
        placeholder="Write a prompt…"
      />
    </section>
  );
}
export { AssistantDemo };
