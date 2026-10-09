import { useState } from "react";
import {
  BoardTemplate,
  InboxTemplate,
  FeedTemplate,
  TextField,
  Button,
  type BoardItem,
  type ChatMessage,
  type FeedPost,
  type TemplateState,
} from "@kooyaph/ui";
export function BoardExample({
  state,
  empty,
}: {
  state?: TemplateState;
  empty?: boolean;
}) {
  const [items, setItems] = useState<BoardItem[]>([
    {
      id: "brief",
      title: "Launch brief",
      columnId: "todo",
      description: "Maya Chen · Due Friday",
    },
    {
      id: "assets",
      title: "Campaign assets",
      columnId: "progress",
      description: "Jordan Lee · In design",
    },
  ]);
  const [opened, setOpened] = useState("");
  return (
    <BoardTemplate
      title="Project board"
      state={state}
      columns={[
        { id: "todo", title: "To do" },
        { id: "progress", title: "In progress" },
        { id: "done", title: "Done" },
      ]}
      items={empty ? [] : items}
      onMove={(id, columnId) =>
        setItems(items.map((i) => (i.id === id ? { ...i, columnId } : i)))
      }
      onOpen={(id) => setOpened(items.find((i) => i.id === id)?.title ?? "")}
    >
      {opened && <p role="status">Opened {opened} locally.</p>}
    </BoardTemplate>
  );
}
const initialMessages: Record<string, ChatMessage[]> = {
  design: [
    {
      id: "a",
      author: "Maya Chen",
      body: "The launch brief is ready for review.",
      timestamp: "10:42",
    },
  ],
  content: [
    {
      id: "b",
      author: "Jordan Lee",
      body: "Can we publish the story this afternoon?",
      timestamp: "09:20",
    },
  ],
};
export function InboxExample({
  state,
  empty,
}: {
  state?: TemplateState;
  empty?: boolean;
}) {
  const [thread, setThread] = useState("design");
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  return (
    <InboxTemplate
      title="Team inbox"
      state={state}
      threads={
        empty
          ? []
          : [
              { id: "design", title: "Design team", unread: 1 },
              { id: "content", title: "Content team" },
            ]
      }
      selectedThreadId={empty ? undefined : thread}
      onSelectThread={(id) => {
        setThread(id);
        setDraft("");
      }}
      messages={empty ? [] : messages[thread]}
      draft={draft}
      onDraftChange={setDraft}
      onSend={() => {
        setMessages({
          ...messages,
          [thread]: [
            ...messages[thread],
            {
              id: crypto.randomUUID(),
              author: "Alex Stone",
              body: draft,
              timestamp: "Now",
            },
          ],
        });
        setDraft("");
      }}
    />
  );
}
export function FeedExample({
  state,
  empty,
}: {
  state?: TemplateState;
  empty?: boolean;
}) {
  const [posts, setPosts] = useState<FeedPost[]>([
    {
      id: "a",
      author: "Maya Chen",
      role: "Designer",
      body: "Sharing the first campaign concept for our studio.",
      timestamp: "Today · 10:42",
      reactionCount: 3,
    },
  ]);
  const [draft, setDraft] = useState("");
  return (
    <FeedTemplate
      title="Workspace feed"
      state={state}
      posts={empty ? [] : posts}
      onReact={(id) =>
        setPosts(
          posts.map((p) =>
            p.id === id
              ? {
                  ...p,
                  reacted: !p.reacted,
                  reactionCount: p.reactionCount + (p.reacted ? -1 : 1),
                }
              : p,
          ),
        )
      }
      composer={
        <form
          className="ku-template-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            setPosts([
              {
                id: crypto.randomUUID(),
                author: "Alex Stone",
                role: "Workspace owner",
                body: draft,
                reactionCount: 0,
                timestamp: "Now",
              },
              ...posts,
            ]);
            setDraft("");
          }}
        >
          <TextField
            label="Write a post"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <Button type="submit" disabled={!draft.trim()}>
            Post locally
          </Button>
        </form>
      }
    />
  );
}
