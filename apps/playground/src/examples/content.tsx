import { useState } from "react";
import {
  ContentEditorTemplate,
  MediaGalleryTemplate,
  Dialog,
  TextArea,
  TextField,
  Button,
  Chip,
  FilterChip,
  type TemplateState,
} from "@kooyaph/ui";
export function ContentExample({ state }: { state?: TemplateState }) {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [title, setTitle] = useState("A quieter launch");
  const [body, setBody] = useState(
    "We help thoughtful teams bring their next idea to life.",
  );
  const [saved, setSaved] = useState(false);
  return (
    <ContentEditorTemplate
      title="Content studio"
      state={state}
      mode={mode}
      onModeChange={setMode}
      editor={
        <div className="ku-template-form">
          <TextField
            label="Page title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSaved(false);
            }}
          />
          <label htmlFor="sample-content-body">Page content</label>
          <TextArea
            id="sample-content-body"
            rows={8}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setSaved(false);
            }}
          />
        </div>
      }
      preview={
        <article>
          <h2>{title}</h2>
          <p className="ku-template-prose">{body}</p>
        </article>
      }
      metadata={
        <>
          <Chip>Draft</Chip>
          <p>northstar.example / launch</p>
          <p>Author · Alex Stone</p>
          {saved && <p role="status">Draft saved locally.</p>}
        </>
      }
      saveAction={
        <Button variant="primary" onClick={() => setSaved(true)}>
          Save draft locally
        </Button>
      }
    />
  );
}
export function MediaExample({
  state,
  empty,
}: {
  state?: TemplateState;
  empty?: boolean;
}) {
  const [kind, setKind] = useState("all");
  const [selected, setSelected] = useState("");
  const items = [
    {
      id: "brand",
      title: "Brand guidelines",
      kind: "Document",
      description: "Fictional studio guidelines · 12 pages",
    },
    {
      id: "campaign",
      title: "Campaign artwork",
      kind: "Image",
      description: "A local abstract placeholder",
      thumbnail: (
        <svg
          viewBox="0 0 200 120"
          aria-label="Abstract campaign preview"
          role="img"
        >
          <rect width="200" height="120" fill="#e3efde" />
          <circle cx="100" cy="60" r="38" fill="#527b53" />
          <path d="M0 110 200 10" stroke="#c4d5bc" strokeWidth="20" />
        </svg>
      ),
    },
    {
      id: "demo",
      title: "Product walkthrough",
      kind: "Video",
      description: "Fictional walkthrough · 2 minutes",
    },
  ];
  return (
    <>
      <MediaGalleryTemplate
        title="Media library"
        state={state}
        items={
          empty ? [] : items.filter((i) => kind === "all" || i.kind === kind)
        }
        toolbar={
          <div className="ku-template-toolbar">
            {["all", "Document", "Image", "Video"].map((k) => (
              <FilterChip
                key={k}
                selected={kind === k}
                onClick={() => setKind(k)}
              >
                {k === "all" ? "All media" : k}
              </FilterChip>
            ))}
          </div>
        }
        onSelect={setSelected}
      />
      <Dialog
        title={items.find((i) => i.id === selected)?.title ?? "Media details"}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected("");
        }}
      >
        <p>{items.find((i) => i.id === selected)?.description}</p>
        <p>This local preview contains no uploaded customer media.</p>
      </Dialog>
    </>
  );
}
