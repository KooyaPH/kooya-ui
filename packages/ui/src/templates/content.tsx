import { DataValue } from "../molecules/experience";
import type { ReactNode } from "react";
import { Button, Avatar } from "../atoms/index";
import { Card, Tabs } from "../molecules/index";
import { TemplateFrame, type TemplateProps } from "./shared";
export interface FeedPost {
  id: string;
  author: string;
  role?: string;
  body: string;
  timestamp?: string;
  media?: ReactNode;
  reactionCount: number;
  reacted?: boolean;
  comments?: ReactNode;
}
export interface FeedTemplateProps extends TemplateProps {
  posts: readonly FeedPost[];
  onReact: (id: string) => void;
  composer?: ReactNode;
  empty?: string;
}
export function FeedTemplate({
  posts,
  onReact,
  composer,
  empty = "No posts yet.",
  ...props
}: FeedTemplateProps) {
  return (
    <TemplateFrame {...props}>
      <div className="ku-template-feed">
        {composer}
        {posts.map((p) => (
          <Card key={p.id}>
            <article>
              <div className="ku-template-toolbar">
                <Avatar name={p.author} />
                <strong>
                  <DataValue>
                    {p.author}
                    {p.role && <small> · {p.role}</small>}
                  </DataValue>
                </strong>
                {p.timestamp && (
                  <time>
                    <DataValue>{p.timestamp}</DataValue>
                  </time>
                )}
              </div>
              <p className="ku-template-prose">
                <DataValue block>{p.body}</DataValue>
              </p>
              {p.media}
              <Button
                aria-pressed={p.reacted ?? false}
                disabled={props.state?.status === "loading"}
                onClick={() => onReact(p.id)}
              >
                {p.reacted ? "Liked" : "Like"} ·{" "}
                <DataValue>{p.reactionCount}</DataValue>
              </Button>
              {p.comments}
            </article>
          </Card>
        ))}
        {!posts.length &&
          (props.state?.status === "loading" ? (
            [0, 1, 2].map((index) => (
              <Card key={index}>
                <DataValue loading />
                <p>
                  <DataValue loading block />
                </p>
              </Card>
            ))
          ) : (
            <Card>
              <p>{empty}</p>
            </Card>
          ))}
      </div>
      {props.children}
    </TemplateFrame>
  );
}
export interface ContentEditorTemplateProps extends TemplateProps {
  mode: "edit" | "preview";
  onModeChange: (mode: "edit" | "preview") => void;
  editor: ReactNode;
  preview: ReactNode;
  metadata?: ReactNode;
  saveAction?: ReactNode;
}
export function ContentEditorTemplate({
  mode,
  onModeChange,
  editor,
  preview,
  metadata,
  saveAction,
  ...props
}: ContentEditorTemplateProps) {
  return (
    <TemplateFrame {...props} actions={props.actions ?? saveAction}>
      <div className="ku-template-split">
        <Card>
          <Tabs
            label="Content mode"
            value={mode}
            onValueChange={(v) => onModeChange(v as "edit" | "preview")}
            options={[
              { value: "edit", label: "Edit" },
              { value: "preview", label: "Preview" },
            ]}
          >
            {mode === "edit" ? editor : preview}
          </Tabs>
        </Card>
        {metadata && (
          <aside>
            <Card title="Publishing details">{metadata}</Card>
          </aside>
        )}
      </div>
      {props.children}
    </TemplateFrame>
  );
}
export interface MediaItem {
  id: string;
  title: string;
  src?: string;
  alt?: string;
  kind: string;
  description?: string;
  thumbnail?: ReactNode;
}
export interface MediaGalleryTemplateProps extends TemplateProps {
  items: readonly MediaItem[];
  onSelect: (id: string) => void;
  toolbar?: ReactNode;
  empty?: string;
}
export function MediaGalleryTemplate({
  items,
  onSelect,
  toolbar,
  empty = "No media yet.",
  ...props
}: MediaGalleryTemplateProps) {
  return (
    <TemplateFrame {...props}>
      {toolbar}
      <div className="ku-template-gallery">
        {items.map((i) => (
          <Card key={i.id}>
            <div className="ku-template-thumbnail">
              <DataValue block>
                {i.thumbnail ??
                  (i.src ? (
                    <img loading="lazy" src={i.src} alt={i.alt ?? i.title} />
                  ) : (
                    <span>{i.kind}</span>
                  ))}
              </DataValue>
            </div>
            <h3>
              <DataValue>{i.title}</DataValue>
            </h3>
            <p>
              <DataValue>{i.description ?? i.kind}</DataValue>
            </p>
            <Button
              aria-label={`View ${i.title}`}
              disabled={props.state?.status === "loading"}
              onClick={() => onSelect(i.id)}
            >
              View
            </Button>
          </Card>
        ))}
      </div>
      {!items.length &&
        (props.state?.status === "loading" ? (
          <Card>
            <DataValue loading block />
            <p>
              <DataValue loading />
            </p>
          </Card>
        ) : (
          <Card>
            <p>{empty}</p>
          </Card>
        ))}
      {props.children}
    </TemplateFrame>
  );
}
