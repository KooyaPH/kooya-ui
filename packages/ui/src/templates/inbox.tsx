import { useDeviceMode } from "../foundations/device";
import {
  useId,
  useState,
  useRef,
  useLayoutEffect,
  type ReactNode,
} from "react";
import { Button, Avatar } from "../atoms/index";
import { Card } from "../molecules/index";
import { TextArea } from "../atoms/inputs";
import { TemplateFrame, type TemplateProps } from "./shared";
export interface InboxThread {
  id: string;
  title: string;
  preview?: string;
  unread?: number;
}
export interface ChatMessage {
  id: string;
  author: string;
  body: string;
  timestamp?: string;
  attachment?: ReactNode;
}
export interface InboxTemplateProps extends TemplateProps {
  threads: readonly InboxThread[];
  selectedThreadId?: string;
  onSelectThread: (id: string) => void;
  messages: readonly ChatMessage[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  sending?: boolean;
  threadActions?: ReactNode;
  mobilePane?: "conversations" | "thread";
  onMobilePaneChange?: (pane: "conversations" | "thread") => void;
}
export function InboxTemplate({
  threads,
  selectedThreadId,
  onSelectThread,
  messages,
  draft,
  onDraftChange,
  onSend,
  sending,
  threadActions,
  mobilePane,
  onMobilePaneChange,
  ...props
}: InboxTemplateProps) {
  const draftId = useId();
  const mode = useDeviceMode();
  const [internalPane, setPane] = useState<"conversations" | "thread">(
    selectedThreadId ? "thread" : "conversations",
  );
  const pane = mobilePane ?? internalPane;
  const listPane = useRef<HTMLDivElement>(null),
    threadPane = useRef<HTMLDivElement>(null);
  // Capture the current focus before React applies hidden/removal mutations.
  // The active-element guard prevents a later commit from stealing overlay focus.
  const focusedBeforeRender =
    typeof document === "undefined" ? null : document.activeElement;
  const focusedBackBeforeRender =
    threadPane.current?.contains(focusedBeforeRender) &&
    focusedBeforeRender instanceof HTMLElement &&
    focusedBeforeRender.dataset.inboxBack === "true";
  useLayoutEffect(() => {
    if (!(focusedBeforeRender instanceof HTMLElement)) return;
    const active = document.activeElement;
    if (active !== focusedBeforeRender && active !== document.body) return;
    const hiddenPane =
      pane === "thread" ? listPane.current : threadPane.current;
    if (mode === "mobile" && hiddenPane?.contains(focusedBeforeRender)) {
      const visiblePane =
        pane === "thread" ? threadPane.current : listPane.current;
      const target = visiblePane?.querySelector<HTMLElement>(
        "button:not(:disabled), textarea:not(:disabled)",
      );
      (target ?? visiblePane)?.focus({ preventScroll: true });
    } else if (mode !== "mobile" && focusedBackBeforeRender) {
      const composer = threadPane.current?.querySelector<HTMLTextAreaElement>(
        "textarea:not(:disabled)",
      );
      (composer ?? threadPane.current)?.focus({ preventScroll: true });
    }
  }, [mode, pane, focusedBeforeRender, focusedBackBeforeRender]);
  const changePane = (next: "conversations" | "thread") => {
    setPane(next);
    onMobilePaneChange?.(next);
  };

  return (
    <TemplateFrame skeleton="inbox" {...props}>
      <div className="ku-template-inbox" data-device={mode}>
        <div
          ref={listPane}
          tabIndex={-1}
          hidden={mode === "mobile" && pane !== "conversations"}
        >
          <Card title="Conversations">
            <nav aria-label="Conversations" className="ku-template-stack">
              {threads.map((t) => (
                <Button
                  key={t.id}
                  aria-pressed={t.id === selectedThreadId}
                  onClick={() => {
                    onSelectThread(t.id);
                    changePane("thread");
                  }}
                >
                  {t.title}
                  {t.unread ? ` (${t.unread} unread)` : ""}
                  {t.preview && <small>{t.preview}</small>}
                </Button>
              ))}
              {!threads.length && <p>No conversations.</p>}
            </nav>
          </Card>
        </div>
        <div
          ref={threadPane}
          role="region"
          aria-label="Conversation thread"
          tabIndex={-1}
          hidden={mode === "mobile" && pane !== "thread"}
        >
          {mode === "mobile" && (
            <Button
              data-inbox-back="true"
              onClick={() => changePane("conversations")}
            >
              Back to conversations
            </Button>
          )}
          <Card
            title={
              threads.find((t) => t.id === selectedThreadId)?.title ??
              "Choose a conversation"
            }
            actions={threadActions}
          >
            <div
              role="log"
              aria-label="Messages"
              aria-live="polite"
              className="ku-template-messages"
            >
              {messages.map((m) => (
                <article key={m.id}>
                  <Avatar name={m.author} />
                  <div>
                    <strong>{m.author}</strong>
                    {m.timestamp && <time>{m.timestamp}</time>}
                    <p>{m.body}</p>
                    {m.attachment}
                  </div>
                </article>
              ))}
              {selectedThreadId && !messages.length && <p>No messages yet.</p>}
            </div>
            <form
              className="ku-template-form"
              aria-label="Message composer"
              onSubmit={(e) => {
                e.preventDefault();
                if (draft.trim() && selectedThreadId && !sending) onSend();
              }}
            >
              <label htmlFor={draftId}>Message</label>
              <TextArea
                id={draftId}
                value={draft}
                onChange={(e) => onDraftChange(e.target.value)}
                disabled={!selectedThreadId}
                rows={3}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={!draft.trim() || !selectedThreadId}
                loading={sending}
              >
                Send message
              </Button>
            </form>
          </Card>
        </div>
      </div>
      {props.children}
    </TemplateFrame>
  );
}
