import { useState } from "react";
import { expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as UI from "../src";

it("exports every approved presentational template family", () => {
  for (const name of [
    "DashboardTemplate",
    "CollectionTemplate",
    "RecordDetailTemplate",
    "FormTemplate",
    "WizardTemplate",
    "SettingsTemplate",
    "BoardTemplate",
    "InboxTemplate",
    "FeedTemplate",
    "ContentEditorTemplate",
    "MediaGalleryTemplate",
    "AnalyticsTemplate",
    "AuditTemplate",
    "ProfileTemplate",
    "BusinessPageTemplate",
    "ClientPortalTemplate",
    "FocusedToolTemplate",
  ])
    expect(UI).toHaveProperty(name);
});
it("composable inputs accept an external label without adding a duplicate label", async () => {
  render(
    <UI.KooyaProvider>
      <label htmlFor="raw">Summary</label>
      <UI.Input id="raw" />
      <label htmlFor="body">Body</label>
      <UI.TextArea id="body" />
    </UI.KooyaProvider>,
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: "Summary" }),
    "Draft",
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: "Body" }),
    "Content",
  );
  expect(screen.getByRole("textbox", { name: "Summary" })).toHaveValue("Draft");
  expect(screen.getByRole("textbox", { name: "Body" })).toHaveValue("Content");
});
it("board moves a record by keyboard accessible actions with no drag engine", async () => {
  function Fixture() {
    const [column, setColumn] = useState("todo");
    return (
      <UI.KooyaProvider>
        <UI.BoardTemplate
          title="Work"
          columns={[
            { id: "todo", title: "To do" },
            { id: "done", title: "Done" },
          ]}
          items={[{ id: "brief", title: "Brief", columnId: column }]}
          onMove={(_, next) => setColumn(next)}
        />
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  await userEvent.click(screen.getByRole("combobox", { name: "Move Brief" }));
  await userEvent.click(screen.getByRole("option", { name: "Done" }));
  expect(
    within(screen.getByRole("region", { name: "Done" })).getByText("Brief"),
  ).toBeVisible();
});
it("inbox sends entered text and blocks an empty message", async () => {
  function Fixture() {
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState<UI.ChatMessage[]>([]);
    return (
      <UI.KooyaProvider>
        <UI.InboxTemplate
          title="Inbox"
          threads={[{ id: "one", title: "Design team" }]}
          selectedThreadId="one"
          onSelectThread={() => {}}
          messages={messages}
          draft={draft}
          onDraftChange={setDraft}
          onSend={() => {
            setMessages([
              ...messages,
              { id: "new", author: "Alex", body: draft },
            ]);
            setDraft("");
          }}
        />
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  await userEvent.type(
    screen.getByRole("textbox", { name: "Message" }),
    "Ready for review",
  );
  await userEvent.click(screen.getByRole("button", { name: "Send message" }));
  expect(screen.getByRole("log")).toHaveTextContent("Ready for review");
  expect(screen.getByRole("textbox", { name: "Message" })).toHaveValue("");
});
it("wizard keeps application fields and respects blocked next and back boundaries", async () => {
  function Fixture() {
    const [step, setStep] = useState(0);
    const [value, setValue] = useState("");
    return (
      <UI.KooyaProvider>
        <UI.WizardTemplate
          title="Setup"
          steps={[
            { id: "name", title: "Name" },
            { id: "review", title: "Review" },
          ]}
          step={step}
          onStepChange={setStep}
          canContinue={!!value}
          onComplete={() => setValue("Complete")}
        >
          <UI.TextField
            label="Workspace"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </UI.WizardTemplate>
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  await userEvent.type(
    screen.getByRole("textbox", { name: "Workspace" }),
    "Northstar",
  );
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(screen.getByRole("textbox", { name: "Workspace" })).toHaveValue(
    "Northstar",
  );
  await userEvent.click(screen.getByRole("button", { name: "Finish" }));
  expect(screen.getByRole("textbox", { name: "Workspace" })).toHaveValue(
    "Complete",
  );
});
it("template state handles loading, failure retry and empty data distinctly", async () => {
  const { rerender } = render(
    <UI.KooyaProvider>
      <UI.MediaGalleryTemplate title="Media" items={[]} onSelect={() => {}} />
    </UI.KooyaProvider>,
  );
  expect(screen.getByText("No media yet.")).toBeVisible();
  rerender(
    <UI.KooyaProvider>
      <UI.MediaGalleryTemplate
        title="Media"
        items={[]}
        onSelect={() => {}}
        state={{ status: "loading" }}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("status")).toHaveTextContent("Loading");
  rerender(
    <UI.KooyaProvider>
      <UI.MediaGalleryTemplate
        title="Media"
        items={[]}
        onSelect={() => {}}
        state={{ status: "error", message: "Media could not load" }}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("alert")).toHaveTextContent("UI_REQUEST_FAILED");
  expect(screen.getByRole("alert")).not.toHaveTextContent("Media could not load");
});

it("feed reaction changes its pressed state and visible count", async () => {
  function Fixture() {
    const [liked, setLiked] = useState(false);
    return (
      <UI.KooyaProvider>
        <UI.FeedTemplate
          title="Feed"
          posts={[
            {
              id: "post",
              author: "Maya Chen",
              role: "Designer",
              body: "Review the concept",
              reactionCount: liked ? 4 : 3,
              reacted: liked,
            },
          ]}
          onReact={() => setLiked(!liked)}
        />
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  await userEvent.click(screen.getByRole("button", { name: "Like · 3" }));
  expect(screen.getByRole("button", { name: "Liked · 4" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
it("content preview displays the application editor value without rendering HTML", async () => {
  function Fixture() {
    const [mode, setMode] = useState<"edit" | "preview">("edit");
    const [value, setValue] = useState("<script>sample</script>");
    return (
      <UI.KooyaProvider>
        <UI.ContentEditorTemplate
          title="Editor"
          mode={mode}
          onModeChange={setMode}
          editor={
            <UI.TextField
              label="Content"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          }
          preview={<p>{value}</p>}
        />
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  await userEvent.click(screen.getByRole("tab", { name: "Preview" }));
  expect(screen.getByRole("tabpanel")).toHaveTextContent(
    "<script>sample</script>",
  );
  expect(document.querySelector("script")).toBeNull();
});
it("analytics period selection preserves named meters while changing their values", async () => {
  function Fixture() {
    const [period, setPeriod] = useState("week");
    return (
      <UI.KooyaProvider>
        <UI.AnalyticsTemplate
          title="Usage"
          metrics={[]}
          periods={[
            { id: "week", label: "Week" },
            { id: "month", label: "Month" },
          ]}
          period={period}
          onPeriodChange={setPeriod}
          points={[
            {
              id: "one",
              label: "Requests",
              value: period === "week" ? 10 : 40,
            },
            { id: "two", label: "Exports", value: 5 },
          ]}
        />
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  expect(screen.getByRole("meter", { name: "Requests" })).toHaveAttribute(
    "value",
    "10",
  );
  expect(screen.getByRole("meter", { name: "Exports" })).toHaveAttribute(
    "value",
    "5",
  );
  await userEvent.click(screen.getByRole("button", { name: "Month" }));
  expect(screen.getByRole("meter", { name: "Requests" })).toHaveAttribute(
    "value",
    "40",
  );
  expect(screen.getByRole("meter", { name: "Exports" })).toHaveAttribute(
    "value",
    "5",
  );
  expect(screen.getByRole("button", { name: "Month" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
it("collection list view renders the supplied list and table view keeps labelled rows", () => {
  const table: UI.DataTableProps<{ id: string; name: string }> = {
    label: "Accounts",
    rows: [{ id: "a", name: "Alpine" }],
    rowKey: (r) => r.id,
    columns: [{ key: "name", title: "Name", render: (r) => r.name }],
  };
  const { rerender } = render(
    <UI.KooyaProvider>
      <UI.CollectionTemplate title="Collection" table={table} />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("table", { name: "Accounts" })).toHaveTextContent(
    "Alpine",
  );
  rerender(
    <UI.KooyaProvider>
      <UI.CollectionTemplate
        title="Collection"
        table={table}
        view="list"
        list={<p>Application list layout</p>}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
  expect(screen.getByText("Application list layout")).toBeVisible();
});
it("audit shows the full actor identity and scoped action", () => {
  render(
    <UI.KooyaProvider>
      <UI.AuditTemplate
        title="Audit"
        entries={[
          {
            id: "a",
            actor: "Maya Chen",
            role: "Workspace owner",
            action: "Updated the logo",
            timestamp: "Oct 8, 2026",
          },
        ]}
      />
    </UI.KooyaProvider>,
  );
  expect(screen.getByRole("list", { name: "Audit history" })).toHaveTextContent(
    "Maya Chen · Workspace owner",
  );
  expect(screen.getByRole("list", { name: "Audit history" })).toHaveTextContent(
    "Updated the logo",
  );
});
it("error state retries through the application and restores data", async () => {
  function Fixture() {
    const [failed, setFailed] = useState(true);
    return (
      <UI.KooyaProvider>
        <UI.MediaGalleryTemplate
          title="Media"
          items={[{ id: "one", title: "Brand guide", kind: "Document" }]}
          onSelect={() => {}}
          state={
            failed
              ? {
                  status: "error",
                  message: "Unavailable",
                  onRetry: () => setFailed(false),
                }
              : { status: "ready" }
          }
        />
      </UI.KooyaProvider>
    );
  }
  render(<Fixture />);
  await userEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "View Brand guide" }),
  ).toBeVisible();
});
