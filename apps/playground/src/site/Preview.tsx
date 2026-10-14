import React, {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MotionConfig } from "motion/react";
import { KooyaProvider } from "@kooyaph/ui";
import { Alert, Button, Segmented, Spin, Tabs } from "@kooyaph/ui/components";
import { getVariant } from "../registry/catalog";
import { FeedbackBridge } from "../reui/adapters/feedback";
import type { CatalogVariant } from "../registry/types";
import { isPreviewSettings, type Appearance } from "./model";

export class PreviewBoundary extends Component<
  { children: React.ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <Alert
        type="error"
        title="This example could not be loaded"
        description="Reload the example to try again."
        action={<Button onClick={() => location.reload()}>Reload</Button>}
      />
    ) : (
      this.props.children
    );
  }
}

export function PreviewRoute({ variantId }: { variantId: string }) {
  const found = getVariant(variantId);
  const [appearance, setAppearance] = useState<Appearance>(() => {
    const params = new URLSearchParams(location.search);
    return {
      mode: params.get("mode") === "dark" ? "dark" : "light",
      density: params.get("density") === "compact" ? "compact" : "comfortable",
    };
  });
  useEffect(() => {
    const root = document.documentElement;
    const previous = {
      mode: root.dataset.mode,
      density: root.dataset.density,
      preview: root.dataset.kooyaPreview,
    };
    root.dataset.mode = appearance.mode;
    root.dataset.density = appearance.density;
    root.dataset.kooyaPreview = "true";
    return () => {
      for (const [key, value] of Object.entries({
        mode: previous.mode,
        density: previous.density,
        kooyaPreview: previous.preview,
      })) {
        if (value === undefined) delete root.dataset[key];
        else root.dataset[key] = value;
      }
    };
  }, [appearance.mode, appearance.density]);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.source === window.parent &&
        event.origin === location.origin &&
        isPreviewSettings(event.data)
      )
        setAppearance({ mode: event.data.mode, density: event.data.density });
    };
    window.addEventListener("message", receive);
    // The iframe load event may precede React installing this listener.
    // Announce readiness after subscription so the parent sends current settings.
    if (window.parent !== window)
      window.parent.postMessage(
        { type: "kooya-preview-ready", variantId },
        location.origin,
      );
    return () => window.removeEventListener("message", receive);
  }, [variantId]);
  const Demo = useMemo(
    () => (found ? lazy(found.variant.load) : null),
    [variantId],
  );
  return (
    <KooyaProvider {...appearance} className="preview-root style-vega">
      <FeedbackBridge />
      <MotionConfig reducedMotion="user">
        <main
          className="preview-document"
          data-preview-id={variantId}
          aria-label={
            found
              ? `${found.variant.title} live example`
              : "Example unavailable"
          }
        >
          <h1 className="sr-only">{found?.variant.title ?? "Example preview"}</h1>
          {Demo ? (
            <PreviewBoundary key={variantId}>
              <Suspense
                fallback={
                  <Spin description="Loading example">
                    <div className="preview-loading" />
                  </Spin>
                }
              >
                <Demo />
              </Suspense>
            </PreviewBoundary>
          ) : (
            <Alert
              title="Example not found"
              description={<a href="#/components">Browse components</a>}
              type="warning"
            />
          )}
        </main>
      </MotionConfig>
    </KooyaProvider>
  );
}

export function LiveFrame({
  variant,
  appearance,
  thumbnail = false,
  width = "desktop",
  reset = 0,
  onLoadStateChange,
}: {
  variant: CatalogVariant;
  appearance: Appearance;
  thumbnail?: boolean;
  width?: string;
  reset?: number;
  onLoadStateChange?: (state: "loading" | "ready" | "failed") => void;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "failed">("loading");
  useEffect(() => onLoadStateChange?.(loadState), [loadState, onLoadStateChange]);
  // Capture appearance when the lazy document becomes visible, rather than
  // when its offscreen holder mounts. Later changes preserve the iframe state.
  const [initial, setInitial] = useState<Appearance | null>(null);
  useEffect(() => {
    if (visible && initial === null) setInitial(appearance);
  }, [visible, initial, appearance.mode, appearance.density]);
  useEffect(() => {
    if (!holder.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" },
    );
    observer.observe(holder.current);
    return () => observer.disconnect();
  }, []);
  const send = useCallback(() =>
    frame.current?.contentWindow?.postMessage(
      { type: "kooya-preview-settings", ...appearance },
      location.origin,
    ), [appearance.mode, appearance.density]);
  useEffect(send, [send]);
  useEffect(() => {
    if (!visible || !initial) return;
    setLoadState("loading");
    // Navigation failures do not consistently dispatch iframe error events.
    // Only the validated child handshake proves the example can render.
    const timeout = window.setTimeout(() => {
      setLoadState(current => current === "ready" ? current : "failed");
    }, 15_000);
    return () => window.clearTimeout(timeout);
  }, [visible, initial, reset, attempt, variant.id]);
  useEffect(() => {
    const receiveReady = (event: MessageEvent) => {
      if (
        event.source === frame.current?.contentWindow &&
        event.origin === location.origin &&
        event.data?.type === "kooya-preview-ready" &&
        event.data.variantId === variant.id
      ) {
        setLoadState("ready");
        send();
      }
    };
    window.addEventListener("message", receiveReady);
    return () => window.removeEventListener("message", receiveReady);
  }, [send, variant.id]);
  return (
    <div
      ref={holder}
      className={`live-frame ${thumbnail ? "live-frame-thumbnail" : ""}`}
      data-viewport={width}
      tabIndex={thumbnail ? undefined : -1}
      role={thumbnail ? undefined : "region"}
      aria-label={thumbnail ? undefined : `${variant.title} preview area`}
    >
      {visible && initial && loadState === "loading" && (
        <div className="preview-loading" role="status">Loading preview…</div>
      )}
      {loadState === "failed" && !thumbnail && (
        <Alert
          className="preview-load-error"
          type="error"
          title="Preview could not be loaded"
          description="Check your connection and try again."
          action={<Button onClick={event => {
            const restoreFocus = document.activeElement === event.currentTarget;
            setLoadState("loading");
            setAttempt(current => current + 1);
            if (restoreFocus) holder.current?.focus();
          }}>Retry preview</Button>}
        />
      )}
      {visible && initial ? (
        <iframe
          key={`${reset}:${attempt}`}
          ref={frame}
          title={`${variant.title} preview`}
          loading="lazy"
          tabIndex={thumbnail ? -1 : undefined}
          src={`./?mode=${initial.mode}&density=${initial.density}#/preview/${encodeURIComponent(variant.id)}`}
          onLoad={send}
          onError={() => setLoadState("failed")}
          style={{
            height: thumbnail ? 320 : Math.max(240, variant.previewHeight),
            width: width === "phone" ? 390 : width === "tablet" ? 768 : "100%",
            display: loadState === "failed" ? "none" : undefined,
            visibility: loadState === "loading" ? "hidden" : undefined,
          }}
        />
      ) : (
        <div className="preview-placeholder" role="status">
          Preview loads when visible
        </div>
      )}
    </div>
  );
}

function SourceCode({ variant }: { variant: CatalogVariant }) {
  const [code, setCode] = useState("Loading source…");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    let active = true;
    variant
      .loadCode()
      .then((source) => {
        if (active) setCode(source);
      })
      .catch(() => {
        if (active)
          setCode("Source could not be loaded. Reopen this tab to retry.");
      });
    return () => {
      active = false;
    };
  }, [variant]);
  return (
    <div className="source-panel">
      <div className="source-actions">
        <Button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setCopyError(false);
            } catch {
              setCopied(false);
              setCopyError(true);
            }
          }}
        >
          {copied ? "Copied" : "Copy source"}
        </Button>
        <Button href="/downloads/kooya-recipes.tar.gz" download>
          Download recipes
        </Button>
      </div>
      {copyError && (
        <p role="status" className="source-provenance">
          Clipboard unavailable. Select the source below to copy it.
        </p>
      )}
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
      {variant.source && (
        <p className="source-provenance">
          Adapted from{" "}
          <a
            href={`${variant.source.repository.replace(/\.git$/, "")}/blob/${variant.source.revision}/${variant.source.path}`}
            target="_blank"
            rel="noreferrer"
          >
            REUI source ↗
          </a>{" "}
          · MIT license
        </p>
      )}
    </div>
  );
}

export function VariantCard({
  variant,
  appearance,
  href,
}: {
  variant: CatalogVariant;
  appearance: Appearance;
  href: string;
}) {
  const [width, setWidth] = useState("desktop");
  const [reset, setReset] = useState(0);
  return (
    <article className="variant-card" id={variant.id}>
      <div className="variant-heading">
        <div>
          <h2>
            <a href={href}>{variant.title}</a>
          </h2>
          <p>{variant.description}</p>
        </div>
        <a
          className="fullscreen-link"
          href={`?mode=${appearance.mode}&density=${appearance.density}#/preview/${encodeURIComponent(variant.id)}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${variant.title} fullscreen`}
        >
          ↗
        </a>
      </div>
      <Tabs
        defaultActiveKey="preview"
        items={[
          {
            key: "preview",
            label: "Preview",
            children: (
              <>
                <div className="preview-controls">
                  <Segmented
                    aria-label={`${variant.title} viewport`}
                    value={width}
                    onChange={(value) => setWidth(String(value))}
                    options={[
                      { label: "Desktop", value: "desktop" },
                      { label: "Tablet", value: "tablet" },
                      { label: "Phone", value: "phone" },
                    ]}
                  />
                  <Button onClick={() => setReset((value) => value + 1)}>
                    Reset
                  </Button>
                </div>
                <LiveFrame
                  variant={variant}
                  appearance={appearance}
                  width={width}
                  reset={reset}
                />
              </>
            ),
          },
          {
            key: "code",
            label: "Code",
            children: <SourceCode variant={variant} />,
          },
        ]}
      />
    </article>
  );
}
