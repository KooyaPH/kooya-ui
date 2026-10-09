import { DeviceExperience } from "./device-experience";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Button,
  BusyBoundary,
  Card,
  Chip,
  ContentSkeleton,
  Dialog,
  ErrorState,
  FeedbackState,
  Progress,
  Tabs,
  TextField,
  type SafeFailure,
} from "@kooyaph/ui";
import {
  localRead,
  permitsIntent,
  transferChunks,
} from "./experience-adapters";
const failure: SafeFailure = {
  publicCode: "UI_DEMO_FAILED",
  codeSource: "client",
  httpStatus: 503,
  recovery: "retry",
};
const loadingFailure: SafeFailure = {
  publicCode: "UI_DEMO_FAILED",
  codeSource: "client",
  httpStatus: 503,
  recovery: "retry",
};
type Transfer = {
  state: "idle" | "running" | "cancelled" | "error" | "ready" | "sent";
  bytes: number;
};
const ExperienceContext = createContext<{
  scope: string;
  changeScope: () => void;
  transfer: Transfer;
  start: (fail: boolean) => void;
  cancel: () => void;
  dismiss: () => void;
  save: () => void;
} | null>(null);
/** Lives above route content, owns only fictional memory and object URLs. */
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const [scope, setScope] = useState("Studio A");
  const [transfer, setTransfer] = useState<Transfer>({
    state: "idle",
    bytes: 0,
  });
  const controller = useRef<AbortController | null>(null),
    url = useRef<string | null>(null),
    generation = useRef(0);
  const dispose = () => {
    controller.current?.abort();
    controller.current = null;
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
  };
  useEffect(
    () => () => {
      generation.current++;
      dispose();
      client.clear();
    },
    [client],
  );
  const cancel = () => {
    generation.current++;
    dispose();
    setTransfer({ state: "cancelled", bytes: 0 });
  };
  const dismiss = () => {
    if (transfer.state === "running") return;
    generation.current++;
    dispose();
    setTransfer({ state: "idle", bytes: 0 });
  };
  const start = async (fail: boolean) => {
    dispose();
    const own = ++generation.current;
    const abort = new AbortController();
    controller.current = abort;
    setTransfer({ state: "running", bytes: 0 });
    try {
      const blob = await transferChunks(
        abort.signal,
        (bytes) => {
          if (own === generation.current)
            setTransfer({ state: "running", bytes });
        },
        fail,
      );
      if (abort.signal.aborted || own !== generation.current) return;
      url.current = URL.createObjectURL(blob);
      setTransfer({ state: "ready", bytes: 1000 });
    } catch {
      if (own === generation.current)
        setTransfer({
          state: abort.signal.aborted ? "cancelled" : "error",
          bytes: 0,
        });
    }
  };
  const save = () => {
    if (!url.current) return;
    const link = document.createElement("a");
    link.href = url.current;
    link.download = "fictional-kooya-brief.txt";
    link.click();
    setTransfer({ state: "sent", bytes: 1000 });
  };
  const changeScope = () => {
    cancel();
    client.clear();
    setScope((current) => (current === "Studio A" ? "Studio B" : "Studio A"));
  };
  return (
    <QueryClientProvider client={client}>
      <ExperienceContext.Provider
        value={{ scope, changeScope, transfer, start, cancel, dismiss, save }}
      >
        {children}
      </ExperienceContext.Provider>
    </QueryClientProvider>
  );
}
function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("ExperienceProvider required");
  return context;
}
const snippets = {
  loading: `const read = useQuery({ queryKey: ['brief', identity],\n  queryFn: ({ signal }) => readBrief(signal) });\n<BusyBoundary busy={read.isPending} skeleton="card">\n  <Brief value={read.data} />\n</BusyBoundary>\nconst failure: SafeFailure = {\n  publicCode: "RESOURCE_UNAVAILABLE", codeSource: "server",\n  httpStatus: 503, recovery: "retry"\n};\n// Map unknown errors to an allowlisted public code. Never show raw details.`,
  cache: `// Reuse your existing Query v5 client and key factory.\nuseQuery({ queryKey: ['brief', identity, organization],\n  queryFn: ({ signal }) => readBrief(signal), staleTime: 30_000 });\nawait queryClient.invalidateQueries({ queryKey: ['brief', identity] });\n// On identity loss: cancel/remove protected queries before replacement.`,
  preload: `// Schedule on pointer hover or keyboard focus; cancel pending intent\n// on leave/blur. Skip offline/saveData/slow connection.\nconst timer = setTimeout(() => queryClient.prefetchQuery(options), 150);\n// clearTimeout(timer) cancels intent; it cannot abort an import already started.`,
  transfer: `const controller = new AbortController();\nconst blob = await readStream(controller.signal, onBytes);\nif (!controller.signal.aborted) objectUrl = URL.createObjectURL(blob);\n// Cancel on scope loss; revoke URLs on replacement and owner teardown.\n// Say 'Sent to browser', never 'Saved to disk'.`,
};
function Guide({
  story,
  behavior,
  limits,
  code,
}: {
  story: string;
  behavior: string;
  limits: string;
  code: string;
}) {
  return (
    <div className="experience-guide">
      <p>
        <strong>User story.</strong> {story}
      </p>
      <p>
        <strong>Expected experience.</strong> {behavior}
      </p>
      <p>
        <strong>Limits.</strong> {limits}
      </p>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
function LoadingDemo() {
  const { scope } = useExperience();
  const [revision, setRevision] = useState(0),
    [fail, setFail] = useState(false);
  const query = useQuery({
    queryKey: ["experience-cold", scope, revision],
    queryFn: ({ signal }) => localRead(scope, signal, fail),
  });
  return (
    <Card title="Cold load, failure and recovery">
      <div className="demo-actions">
        <Button
          onClick={() => {
            setFail(false);
            setRevision((x) => x + 1);
          }}
        >
          Cold load
        </Button>
        <Button
          onClick={() => {
            setFail(true);
            setRevision((x) => x + 1);
          }}
        >
          Simulate read failure
        </Button>
      </div>
      {query.isError ? (
        <ErrorState
          failure={loadingFailure}
          onRetry={() => {
            setFail(false);
            setRevision((x) => x + 1);
          }}
        />
      ) : (
        <BusyBoundary busy={query.isPending} skeleton="card">
          <h3>{query.data?.title}</h3>
          <p>{query.data?.summary}</p>
        </BusyBoundary>
      )}
      <Guide
        story="As a reader, I want a stable page while the brief loads and a useful recovery when it fails."
        behavior="The same card footprint shows skeleton, ready content or safe public code and Retry."
        limits="650ms fictional local read. Failure explicitly demonstrates HTTP 503; no API request or real server response."
        code={snippets.loading}
      />
    </Card>
  );
}
function CacheRecord() {
  const { scope } = useExperience();
  const [count, setCount] = useState(0);
  const query = useQuery({
    queryKey: ["experience-cache", scope],
    queryFn: ({ signal }) => {
      setCount((x) => x + 1);
      return localRead(scope, signal);
    },
  });
  return (
    <BusyBoundary
      busy={query.isFetching}
      keepContent={!!query.data}
      skeleton="card"
      label={query.data ? "Updating cached brief" : "Loading cached brief"}
    >
      <h3>{query.data?.title}</h3>
      <p>{query.data?.summary}</p>
      <p>
        Local reads in this visit: {count}.{" "}
        {query.data
          ? `Loaded at ${new Date(query.data.updatedAt).toLocaleTimeString()}`
          : ""}
      </p>
      <TextField
        label="Review note (kept during refresh)"
        placeholder="Type while invalidating"
      />
    </BusyBoundary>
  );
}
function CacheDemo() {
  const { scope, changeScope } = useExperience();
  const client = useQueryClient();
  const [visible, setVisible] = useState(true);
  return (
    <Card title="Warm cache and identity scope">
      <div className="demo-actions">
        <Button onClick={() => setVisible((x) => !x)}>
          {visible ? "Leave brief" : "Revisit brief"}
        </Button>
        <Button
          onClick={() =>
            client.invalidateQueries({ queryKey: ["experience-cache", scope] })
          }
        >
          Invalidate brief
        </Button>
        <Button onClick={changeScope}>Switch fictional identity</Button>
        <Chip>{scope}</Chip>
      </div>
      {visible ? (
        <CacheRecord />
      ) : (
        <p>
          Brief closed. A revisit within 30 seconds uses this identity’s memory
          cache.
        </p>
      )}
      <Guide
        story="As a returning reader, I want the brief immediately, while staying within my current identity."
        behavior="Warm revisits use Query v5 memory. Invalidation keeps the cached card and input while it refreshes. Switching scope clears protected demo queries and cancels transfers."
        limits="No persistence, production integration or cross-tab state. A closed record's unsaved local note is discarded; live refresh preserves it."
        code={snippets.cache}
      />
    </Card>
  );
}
function PreloadDemo() {
  const { scope } = useExperience();
  const client = useQueryClient();
  const [dataSaver, setSaver] = useState(false),
    [count, setCount] = useState(0),
    [opened, setOpened] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const options = {
    queryKey: ["experience-intent", scope],
    queryFn: ({ signal }: { signal: AbortSignal }) => {
      setCount((x) => x + 1);
      return localRead(scope, signal);
    },
    staleTime: 30_000,
  };
  const clear = () => clearTimeout(timer.current);
  const schedule = () => {
    clear();
    if (permitsIntent(dataSaver))
      timer.current = setTimeout(() => void client.prefetchQuery(options), 150);
  };
  useEffect(() => clear, [scope, dataSaver]);
  return (
    <Card title="Intent preloading">
      <div className="demo-actions">
        <Button aria-pressed={dataSaver} onClick={() => setSaver((x) => !x)}>
          Data saver: {dataSaver ? "on" : "off"}
        </Button>
        <Button
          onPointerEnter={(e) => {
            if (e.pointerType !== "touch") schedule();
          }}
          onPointerLeave={clear}
          onFocus={schedule}
          onBlur={clear}
          onClick={() => {
            clear();
            setOpened(true);
          }}
        >
          Open fictional brief
        </Button>
        <Button
          onClick={() => {
            client.removeQueries({ queryKey: ["experience-intent", scope] });
            setOpened(false);
            setCount(0);
          }}
        >
          Reset intent example
        </Button>
      </div>
      <p role="status">Local preload/read count: {count}</p>
      {opened && <IntentRecord options={options} />}
      <Guide
        story="As a keyboard or pointer user, I want an intended destination to feel ready without wasteful loading."
        behavior="After 150ms hover/focus intent, one deduplicated fictional read warms the cache. Leave/blur cancels the pending delay; data saver suppresses speculation."
        limits="Navigation still works with data saver. Already-started work may complete; dynamic imports cannot really be aborted. Offline and known slow connection APIs are feature-detected."
        code={snippets.preload}
      />
    </Card>
  );
}
function IntentRecord({
  options,
}: {
  options: {
    queryKey: string[];
    queryFn: ({
      signal,
    }: {
      signal: AbortSignal;
    }) => ReturnType<typeof localRead>;
    staleTime: number;
  };
}) {
  const query = useQuery(options);
  return (
    <BusyBoundary busy={query.isPending} skeleton="card">
      <p>{query.data?.title}</p>
    </BusyBoundary>
  );
}
function TransferDemo() {
  const { transfer, start, cancel, save } = useExperience();
  return (
    <Card title="Background fictional transfer">
      <p>
        Simulated timed chunks of local text; progress units are illustrative,
        not network bytes.
      </p>
      <div className="demo-actions">
        <Button
          disabled={transfer.state === "running"}
          onClick={() => void start(false)}
        >
          Start local transfer
        </Button>
        <Button
          disabled={transfer.state === "running"}
          onClick={() => void start(true)}
        >
          Simulate transfer failure
        </Button>
        <Button disabled={transfer.state !== "running"} onClick={cancel}>
          Cancel transfer
        </Button>
        {["ready", "sent"].includes(transfer.state) && (
          <Button onClick={save}>Send file to browser</Button>
        )}
      </div>
      <Progress
        percent={transfer.bytes / 10}
        aria-label="Simulated transfer progress"
      />
      <p role="status">
        Transfer:{" "}
        {transfer.state === "sent" ? "Sent to browser" : transfer.state}
      </p>
      {transfer.state === "error" && (
        <ErrorState failure={failure} onRetry={() => void start(false)} />
      )}
      <a href="#/overview">Visit Overview while this runs</a>
      <Guide
        story="As a user, I want an explicit transfer to continue while I navigate, with a reachable cancel action."
        behavior="The app-level demo owner survives route changes. Cancel prevents a final Blob commit. A ready file is handed to the browser only when requested. The failure state shows a local UI code and illustrative HTTP 503."
        limits="Fictional timer chunks, not a server export. The HTTP 503 is a teaching example, not a network response; this preview sends no request. No tab-close survival; browser save completion is unobservable. Identity switch cancels and discards; URL cleanup runs on replacement/teardown."
        code={snippets.transfer}
      />
    </Card>
  );
}
export function ExperienceTransferStatus() {
  const { transfer, cancel, dismiss } = useExperience();
  if (transfer.state === "idle") return null;
  const dismissAndReturnFocus = () => {
    document
      .querySelector<HTMLElement>("[data-route-heading], .ku-main h1")
      ?.focus();
    dismiss();
  };
  return (
    <aside
      className="experience-transfer-status"
      aria-label="Fictional transfer task"
    >
      <a href="#/experience/transfer">Fictional transfer: {transfer.state}</a>
      <Button
        onClick={transfer.state === "running" ? cancel : dismissAndReturnFocus}
      >
        {transfer.state === "running" ? "Cancel transfer" : "Dismiss status"}
      </Button>
    </aside>
  );
}
export function ExperiencePage({
  selected = "loading",
}: {
  selected?: string;
}) {
  const [help, setHelp] = useState(false);
  const [active, setActive] = useState(selected);
  useEffect(() => setActive(selected), [selected]);
  const options = [
    { value: "loading", label: "Loading & recovery" },
    { value: "cache", label: "Warm cache" },
    { value: "preload", label: "Intent preload" },
    { value: "transfer", label: "Background transfer" },
    { value: "states", label: "State library" },
    { value: "devices", label: "Device compositions" },
  ];
  const value = options.some((x) => x.value === active) ? active : "loading";
  return (
    <main id="library-main" className="library-main experience-page">
      <header className="document-heading">
        <p className="ku-eyebrow">PERCEIVED PERFORMANCE</p>
        <h1 data-route-heading tabIndex={-1}>
          Experience
        </h1>
        <p>
          Working fictional examples. No external APIs, realtime connections or
          persistent records.
        </p>
        <Button onClick={() => setHelp(true)}>
          Keyboard and accessibility help
        </Button>
      </header>
      <Tabs
        label="Experience examples"
        value={value}
        activation="manual"
        options={options}
        onValueChange={(next) => {
          setActive(next);
          window.location.hash = `/experience/${next}`;
        }}
      >
        {value === "loading" ? (
          <LoadingDemo />
        ) : value === "cache" ? (
          <CacheDemo />
        ) : value === "preload" ? (
          <PreloadDemo />
        ) : value === "transfer" ? (
          <TransferDemo />
        ) : value === "devices" ? (
          <DeviceExperience />
        ) : (
          <StateLibrary />
        )}
      </Tabs>
      <Dialog
        title="Keyboard and accessibility help"
        open={help}
        onOpenChange={setHelp}
      >
        <p>
          Tab moves between controls. On these tabs, Left/Right and Home/End
          move focus; Enter or Space activates. Escape closes this help and
          returns focus.
        </p>
        <p>
          Use Appearance for theme, color mode and font. System reduced motion
          is respected. Public image and metadata guidance is in the Experience
          guide.
        </p>
      </Dialog>
    </main>
  );
}
function StateLibrary() {
  const [busy, setBusy] = useState(false);
  const [saves, setSaves] = useState(0);
  return (
    <div className="ku-template-stack">
      <Card title="Mutation button states">
        <div className="demo-actions">
          <Button
            aria-pressed={busy}
            onClick={() => setBusy((value) => !value)}
          >
            Preview busy state
          </Button>
          <Button
            variant="primary"
            loading={busy}
            onClick={() => setSaves((value) => value + 1)}
          >
            Save fictional sample
          </Button>
        </div>
        <p role="status">Local saves: {saves}</p>
        <p>
          Busy preview preserves the action geometry and blocks repeat
          activation. No request is sent.
        </p>
      </Card>
      <Card title="Skeleton structures">
        {(
          ["page", "metric", "card", "table", "list", "form", "inbox"] as const
        ).map((layout) => (
          <section key={layout}>
            <h3>{layout}</h3>
            <ContentSkeleton layout={layout} rows={2} />
          </section>
        ))}
      </Card>
      <FeedbackState kind="empty" />
      <FeedbackState kind="offline" />
      <FeedbackState kind="permission-denied" />
      <FeedbackState kind="success" />
      <ErrorState
        failure={{
          publicCode: "RESOURCE_UNAVAILABLE",
          codeSource: "client",
          httpStatus: 503,
          recovery: "retry",
          supportReference: "DEMO-103",
        }}
      />
    </div>
  );
}
