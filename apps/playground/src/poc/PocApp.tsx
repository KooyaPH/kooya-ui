import { useEffect, useRef, useState } from "react";
import {
  App,
  Button,
  Drawer,
  Input,
  Modal,
  Radio,
  Select,
  Tooltip,
} from "antd";
import { KooyaProvider } from "@kooyaph/ui";
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  LayoutGrid,
  Monitor,
  PanelLeftClose,
  RefreshCw,
  Search,
  Share2,
  SlidersHorizontal,
  Sun,
  Moon,
  Columns2,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";
import {
  layouts,
  palettes,
  scenes,
  defaultSelection,
  normalize,
  readSelection,
  store,
  loadStored,
  selectionKey,
  favoritesKey,
  selectionId,
  href,
  providerProps,
  type Selection,
  type SceneId,
} from "./model";
import { DemoState, useDemo } from "./state";
import { Shell } from "./Shell";
import "./poc.css";
function Frame({ selection, width }: { selection: Selection; width: number }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(700);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setAvailable(entry.contentRect.width),
    );
    if (holder.current) observer.observe(holder.current);
    return () => observer.disconnect();
  }, []);
  const targetWidth = width || 1440;
  const scale = Math.min(1, available / targetWidth);
  const initial = useRef(href(selection, "frame"));
  const send = () =>
    frame.current?.contentWindow?.postMessage(
      { type: "kooya-poc-settings", selection },
      location.origin,
    );
  useEffect(() => {
    send();
    const receive = (e: MessageEvent) => {
      if (
        e.source === frame.current?.contentWindow &&
        e.origin === location.origin &&
        e.data?.type === "kooya-poc-ready"
      )
        send();
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [selection]);
  return (
    <div className="poc-device-holder" ref={holder}>
      <div
        className="poc-scaled-frame"
        style={{ width: targetWidth * scale, height: 1100 * scale }}
      >
        <iframe
          ref={frame}
          title={`${layouts.find((x) => x.id === selection.layout)?.name} comparison`}
          src={initial.current}
          onLoad={send}
          style={{
            width: targetWidth,
            height: 1100,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </div>
  );
}
export default function PocApp() {
  return (
    <DemoState>
      <PocRoot />
    </DemoState>
  );
}
function PocRoot() {
  const [hash, setHash] = useState(location.hash);
  const [selection, setSelection] = useState(() => readSelection());
  const frame = hash.startsWith("#/frame/");
  useEffect(() => {
    if (!frame) store(selectionKey, selection);
  }, [selection, frame]);
  useEffect(() => {
    const update = () => {
      setHash(location.hash);
      setSelection(readSelection());
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    if (!frame) return;
    const receive = (event: MessageEvent) => {
      if (
        event.origin === location.origin &&
        event.source === window.parent &&
        event.data?.type === "kooya-poc-settings" &&
        event.data.selection &&
        typeof event.data.selection === "object"
      )
        setSelection(normalize(event.data.selection));
    };
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "kooya-poc-ready" }, location.origin);
    return () => window.removeEventListener("message", receive);
  }, [frame]);
  useEffect(() => {
    document.title = `${frame ? layouts.find((x) => x.id === selection.layout)?.name : "Design directions"} · Kooya UI`;
  }, [selection.layout, frame]);
  function choose(next: Selection) {
    store(selectionKey, next);
    setSelection(next);
    if (!hash.startsWith("#/overview") && hash !== "#/" && hash !== "")
      location.hash = href(
        next,
        hash.startsWith("#/compare") ? "compare" : "explore",
      );
  }
  return (
    <KooyaProvider
      {...providerProps(selection)}
      className={"poc-root " + (frame ? "poc-frame-root" : "")}
    >
      {frame ? (
        <Shell
          selection={selection}
          onScene={(scene) => {
            setSelection((s) => ({ ...s, scene }));
            window.parent.postMessage(
              { type: "kooya-poc-navigate", scene },
              location.origin,
            );
          }}
        />
      ) : (
        <Lab selection={selection} choose={choose} hash={hash} />
      )}
    </KooyaProvider>
  );
}
function Lab({
  selection,
  choose,
  hash,
}: {
  selection: Selection;
  choose: (s: Selection) => void;
  hash: string;
}) {
  const { message, modal } = App.useApp();
  const demo = useDemo();
  const [query, setQuery] = useState("");
  const [paletteApplied, setPaletteApplied] = useState(false);
  const [category, setCategory] = useState("All directions");
  const [favorites, setFavorites] = useState<Selection[]>(() => {
    const saved = loadStored<unknown>(favoritesKey, []);
    return Array.isArray(saved)
      ? saved.filter((x) => x && typeof x === "object").map((x) => normalize(x))
      : [];
  });
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [controls, setControls] = useState(false);
  const [width, setWidth] = useState(0);
  const [previewState, setPreviewState] = useState("ready");
  const [right, setRight] = useState<Selection>(() => {
    const p = new URLSearchParams(location.hash.split("?")[1] ?? "");
    return normalize({
      ...defaultSelection,
      layout: (p.get("rightLayout") ?? "atlas") as Selection["layout"],
      palette: (p.get("rightPalette") ?? "slate") as Selection["palette"],
      mode: p.get("rightMode") === "dark" ? "dark" : "light",
      density: p.get("rightDensity") === "compact" ? "compact" : "comfortable",
      scene: readSelection().scene,
    });
  });
  const [compareTab, setCompareTab] = useState("a");
  const isExplore = hash.startsWith("#/explore");
  const isCompare = hash.startsWith("#/compare");
  const saved = favorites.some(
    (s) => selectionId(s) === selectionId(selection),
  );
  function favorite(s: Selection) {
    setFavorites((old) => {
      const next = old.some((x) => selectionId(x) === selectionId(s))
        ? old.filter((x) => selectionId(x) !== selectionId(s))
        : [...old, s];
      store(favoritesKey, next);
      return next;
    });
  }
  function change(patch: Partial<Selection>) {
    if (patch.palette) setPaletteApplied(true);
    const next = { ...selection, ...patch };
    if (patch.layout && !isExplore && !isCompare) open(next);
    else choose(next);
  }
  function open(s: Selection, page = "explore") {
    store(selectionKey, s);
    location.hash = href(s, page);
    window.scrollTo(0, 0);
  }
  function compareHref(left: Selection, other: Selection) {
    return (
      href(left, "compare") +
      `&rightLayout=${other.layout}&rightPalette=${other.palette}&rightMode=${other.mode}&rightDensity=${other.density}`
    );
  }
  function rightChange(patch: Partial<Selection>) {
    const next = { ...right, ...patch, scene: selection.scene };
    setRight(next);
    history.replaceState(null, "", compareHref(selection, next));
  }
  useEffect(() => {
    if (!isCompare) return;
    history.replaceState(null, "", compareHref(selection, right));
  }, [selection, isCompare]);
  useEffect(() => {
    if (!isCompare) return;
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        event.data?.type !== "kooya-poc-navigate" ||
        !scenes.some((x) => x.id === event.data.scene)
      )
        return;
      const frames = [...document.querySelectorAll("iframe")];
      if (!frames.some((x) => x.contentWindow === event.source)) return;
      change({ scene: event.data.scene });
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [selection, isCompare]);
  async function share() {
    const url =
      location.origin +
      location.pathname +
      (isCompare ? compareHref(selection, right) : href(selection));
    try {
      await navigator.clipboard.writeText(url);
      message.success("Link copied — your selected combination is included");
    } catch {
      modal.info({
        title: "Share this direction",
        content: (
          <Input
            aria-label="Shareable preview link"
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
          />
        ),
      });
    }
  }
  const fields = (
    <>
      <label>
        Layout
        <Select
          aria-label="Choose layout"
          value={selection.layout}
          onChange={(layout) => change({ layout })}
          options={layouts.map((x) => ({ value: x.id, label: x.name }))}
        />
      </label>
      <label>
        Palette
        <Select
          aria-label="Choose palette"
          value={selection.palette}
          onChange={(palette) => change({ palette })}
          options={palettes.map((x) => ({ value: x.id, label: x.name }))}
        />
      </label>
      <label>
        Appearance
        <Radio.Group
          aria-label="Color mode"
          optionType="button"
          value={selection.mode}
          onChange={(e) => change({ mode: e.target.value })}
          options={[
            {
              value: "light",
              label: (
                <span className="poc-mode-label">
                  <Sun size={14} /> Light
                </span>
              ),
            },
            {
              value: "dark",
              label: (
                <span className="poc-mode-label">
                  <Moon size={14} /> Dark
                </span>
              ),
            },
          ]}
        />
      </label>
      <label>
        Density
        <Select
          aria-label="Choose density"
          value={selection.density}
          onChange={(density) => change({ density })}
          options={[
            { value: "comfortable", label: "Comfortable" },
            { value: "compact", label: "Compact" },
          ]}
        />
      </label>
    </>
  );
  const shown = layouts.filter(
    (x) =>
      (category === "All directions" || x.category === category) &&
      `${x.name} ${x.description} ${x.category}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (!onlyFavorites || favorites.some((s) => s.layout === x.id)),
  );
  return (
    <>
      <a
        className="poc-skip"
        href="#poc-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("poc-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="poc-lab-header">
        <a href="#/overview" className="poc-lab-brand">
          <span>
            <img src="/brand/kooya-wordmark.png" alt="Kooya" />
          </span>
          <strong>Design lab</strong>
          <small>UI EXPLORATIONS</small>
        </a>
        <nav aria-label="Design lab navigation">
          <a
            href="#/overview"
            aria-current={!isExplore && !isCompare ? "page" : undefined}
          >
            Directions
          </a>
          <a
            href={compareHref(selection, right)}
            aria-current={isCompare ? "page" : undefined}
          >
            Compare
          </a>
          <a href="#/components">
            Component library <ArrowUpRight size={13} />
          </a>
        </nav>
        <div>
          <Tooltip title="Your current appearance">
            <Button
              type="text"
              aria-label="Switch color mode"
              icon={
                selection.mode === "light" ? (
                  <Moon size={17} />
                ) : (
                  <Sun size={17} />
                )
              }
              onClick={() =>
                change({ mode: selection.mode === "light" ? "dark" : "light" })
              }
            />
          </Tooltip>
          <AvatarButton
            onClick={() => open({ ...selection, scene: "people" })}
          />
        </div>
      </header>
      <div className="poc-control-bar">
        <div className="poc-controls-desktop">{fields}</div>
        <Button
          className="poc-controls-mobile"
          icon={<SlidersHorizontal size={16} />}
          onClick={() => setControls(true)}
        >
          Customize appearance
        </Button>
        <div className="poc-control-actions">
          <Tooltip
            title={
              saved ? "Remove current favorite" : "Save current combination"
            }
          >
            <Button
              aria-label={saved ? "Remove favorite" : "Save favorite"}
              icon={<Heart size={16} fill={saved ? "currentColor" : "none"} />}
              onClick={() => favorite(selection)}
            />
          </Tooltip>
          <Button icon={<Share2 size={15} />} onClick={() => void share()}>
            Share
          </Button>
        </div>
      </div>
      <main id="poc-content" tabIndex={-1}>
        {isExplore || isCompare ? (
          <>
            <div className="poc-preview-bar">
              <a href="#/overview">
                <ArrowLeft size={15} /> All directions
              </a>
              <div className="poc-preview-scene">
                <label className="sr-only" htmlFor="scene-choice">
                  Preview area
                </label>
                <Select
                  id="scene-choice"
                  aria-label="Preview area"
                  value={selection.scene}
                  onChange={(scene) => change({ scene })}
                  options={scenes.map((x) => ({ value: x.id, label: x.name }))}
                />
              </div>
              <div className="poc-preview-tools">
                <Radio.Group
                  aria-label="Preview viewport"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  optionType="button"
                  options={[
                    {
                      value: 0,
                      label: <Monitor size={16} aria-label="Desktop" />,
                    },
                    {
                      value: 768,
                      label: <Tablet size={16} aria-label="Tablet" />,
                    },
                    {
                      value: 390,
                      label: <Smartphone size={16} aria-label="Phone" />,
                    },
                  ]}
                />
                {!isCompare && (
                  <Select
                    aria-label="Preview state"
                    value={previewState}
                    onChange={setPreviewState}
                    options={["ready", "loading", "empty", "error"].map(
                      (value) => ({
                        value,
                        label: value[0].toUpperCase() + value.slice(1),
                      }),
                    )}
                  />
                )}
                <Tooltip title="Reset fictional workspace records">
                  <Button
                    aria-label="Reset demo data"
                    icon={<RefreshCw size={15} />}
                    onClick={() =>
                      modal.confirm({
                        title: "Reset the sample workspace?",
                        content:
                          "Your saved visual combinations will stay. Sample record edits will be reset.",
                        onOk: () => {
                          demo.reset();
                          message.success("Demo records reset");
                        },
                      })
                    }
                  />
                </Tooltip>
                {!isCompare && (
                  <Button
                    icon={<Columns2 size={15} />}
                    onClick={() => {
                      location.hash = compareHref(selection, right);
                    }}
                  >
                    Compare
                  </Button>
                )}
              </div>
            </div>
            {isCompare ? (
              <>
                <div className="poc-compare-switch">
                  <Radio.Group
                    value={compareTab}
                    onChange={(e) => setCompareTab(e.target.value)}
                    options={[
                      { value: "a", label: "Direction A" },
                      { value: "b", label: "Direction B" },
                    ]}
                    optionType="button"
                  />
                </div>
                <div className={"poc-comparison show-" + compareTab}>
                  <section>
                    <div className="poc-compare-heading">
                      <span>A</span>
                      <strong>
                        {layouts.find((x) => x.id === selection.layout)?.name}
                      </strong>
                      <small>
                        {palettes.find((x) => x.id === selection.palette)?.name}{" "}
                        · {selection.mode}
                      </small>
                    </div>
                    <Frame selection={selection} width={width} />
                  </section>
                  <section>
                    <div className="poc-compare-heading">
                      <span>B</span>
                      <Select
                        aria-label="Compare layout B"
                        value={right.layout}
                        onChange={(layout) => rightChange({ layout })}
                        options={layouts.map((x) => ({
                          value: x.id,
                          label: x.name,
                        }))}
                      />
                      <Select
                        aria-label="Compare palette B"
                        value={right.palette}
                        onChange={(palette) => rightChange({ palette })}
                        options={palettes.map((x) => ({
                          value: x.id,
                          label: x.name,
                        }))}
                      />
                      <Button
                        aria-label="Toggle comparison B mode"
                        icon={
                          right.mode === "light" ? (
                            <Moon size={14} />
                          ) : (
                            <Sun size={14} />
                          )
                        }
                        onClick={() =>
                          rightChange({
                            mode: right.mode === "light" ? "dark" : "light",
                          })
                        }
                      />
                      <Select
                        aria-label="Compare density B"
                        value={right.density}
                        onChange={(density) => rightChange({ density })}
                        options={[
                          { value: "comfortable", label: "Comfortable" },
                          { value: "compact", label: "Compact" },
                        ]}
                      />
                    </div>
                    <Frame
                      selection={{ ...right, scene: selection.scene }}
                      width={width}
                    />
                  </section>
                </div>
              </>
            ) : (
              <div
                className={
                  "poc-preview-stage " + (width ? "poc-sized-preview" : "")
                }
              >
                <div style={{ width: width || "100%", maxWidth: "100%" }}>
                  <Shell
                    selection={selection}
                    onScene={(scene) => change({ scene })}
                    previewState={previewState}
                    onReady={() => setPreviewState("ready")}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="poc-gallery">
            <div className="poc-gallery-intro">
              <div>
                <div className="poc-eyebrow">
                  <span className="poc-online-dot" /> THE NEXT CHAPTER OF KOOYA
                  UI
                </div>
                <h1>
                  Good work deserves
                  <br />a considered workspace.
                </h1>
                <p>
                  Twelve directions. One shared purpose.
                  <br />
                  Explore a quieter, clearer way to bring Kooya to work.
                </p>
                <div className="poc-hero-actions">
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => open(defaultSelection)}
                  >
                    Explore Workbench <ArrowUpRight size={16} />
                  </Button>
                  <Button
                    size="large"
                    onClick={() => {
                      location.hash = compareHref(selection, right);
                    }}
                  >
                    Compare directions <Columns2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="poc-gallery-note">
                <span>ROOM TO FIND YOUR FIT</span>
                <div>
                  <strong>12</strong>
                  <p>distinct layouts</p>
                </div>
                <div>
                  <strong>576</strong>
                  <p>appearance combinations</p>
                </div>
                <small>
                  12 palettes · light & dark · 2 densities
                  <br />6 working areas in every direction
                </small>
              </div>
            </div>
            <section className="poc-palette-strip" aria-label="Theme palettes">
              <div>
                <strong>A little color. A lot of character.</strong>
                <p>Choose a palette. Carry it through every direction.</p>
              </div>
              <div>
                {palettes.map((p) => (
                  <Tooltip key={p.id} title={p.name}>
                    <button
                      aria-label={`Apply ${p.name} palette`}
                      aria-pressed={selection.palette === p.id}
                      style={{ background: p.accent }}
                      onClick={() => change({ palette: p.id })}
                    >
                      {selection.palette === p.id && <Check size={16} />}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </section>
            <div className="poc-gallery-toolbar">
              <div>
                <h2>
                  Find your direction{" "}
                  <span>{shown.length.toString().padStart(2, "0")}</span>
                </h2>
                <p>Different ways to arrange the same working day.</p>
              </div>
              <div>
                <Input
                  aria-label="Search design directions"
                  prefix={<Search size={15} />}
                  placeholder="Find a direction…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Select
                  aria-label="Filter design category"
                  value={category}
                  onChange={setCategory}
                  options={[
                    "All directions",
                    ...new Set(layouts.map((x) => x.category)),
                  ].map((value) => ({ value, label: value }))}
                />
                <Button
                  aria-pressed={onlyFavorites}
                  icon={<Heart size={16} />}
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                >
                  Favorites{favorites.length ? " · " + favorites.length : ""}
                </Button>
              </div>
            </div>
            {onlyFavorites && favorites.length > 0 && (
              <section
                className="poc-saved-combinations"
                aria-label="Saved combinations"
              >
                {favorites.map((s) => (
                  <a key={selectionId(s)} href={href(s)}>
                    <Heart size={14} />
                    <strong>
                      {layouts.find((x) => x.id === s.layout)?.name}
                    </strong>
                    <span>
                      {palettes.find((x) => x.id === s.palette)?.name} ·{" "}
                      {s.mode} · {s.density}
                    </span>
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              </section>
            )}
            <div className="poc-layout-gallery">
              {shown.map((layout, i) => {
                const featured =
                  layout.id === "delivery"
                    ? "work"
                    : layout.id === "observatory"
                      ? "dashboard"
                      : layout.id === "directory"
                        ? "people"
                        : layout.id === "governance"
                          ? "settings"
                          : "cms";
                const s: Selection = {
                  ...selection,
                  layout: layout.id,
                  palette: paletteApplied ? selection.palette : layout.palette,
                  scene: featured,
                };
                const isSaved = favorites.some(
                  (x) => selectionId(x) === selectionId(s),
                );
                return (
                  <article className="poc-direction-card" key={layout.id}>
                    <a
                      className="poc-direction-thumbnail"
                      href={href(s)}
                      aria-label={`Explore ${layout.name}`}
                    >
                      <img
                        loading="lazy"
                        src={`/poc-thumbnails/${layout.id}.jpg`}
                        alt={`${layout.name} workspace layout`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div
                        className={"poc-miniature miniature-" + layout.id}
                        aria-hidden="true"
                      >
                        <div className="mini-top">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="mini-nav">
                          <b>∞</b>
                          {Array.from({ length: 6 }, (_, i) => (
                            <i key={i} />
                          ))}
                        </div>
                        <div className="mini-content">
                          <span />
                          <div className="mini-metrics">
                            <i />
                            <i />
                            <i />
                          </div>
                          <div className="mini-table">
                            {Array.from({ length: 5 }, (_, i) => (
                              <i key={i} />
                            ))}
                          </div>
                        </div>
                        <div className="mini-context">
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                      <span className="poc-thumbnail-tag">
                        {layout.category}
                      </span>
                    </a>
                    <div className="poc-direction-copy">
                      <div className="poc-direction-number">
                        {String(
                          layouts.findIndex((x) => x.id === layout.id) + 1,
                        ).padStart(2, "0")}{" "}
                        / KOOYA UI{" "}
                        {layout.id === "workbench" && <span>START HERE</span>}
                      </div>
                      <div className="poc-direction-title">
                        <h3>
                          <a href={href(s)}>{layout.name}</a>
                        </h3>
                        <Tooltip
                          title={
                            isSaved ? "Remove favorite" : "Save combination"
                          }
                        >
                          <Button
                            type="text"
                            aria-label={`${isSaved ? "Unsave" : "Save"} ${layout.name}`}
                            icon={
                              <Heart
                                size={16}
                                fill={isSaved ? "currentColor" : "none"}
                              />
                            }
                            onClick={() => favorite(s)}
                          />
                        </Tooltip>
                      </div>
                      <p>{layout.description}</p>
                      <div className="poc-direction-footer">
                        <span>{layout.subtitle}</span>
                        <a href={href(s)} aria-label={`Open ${layout.name}`}>
                          <ArrowUpRight size={18} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            {!shown.length && (
              <div className="poc-empty-state">
                <Heart size={30} />
                <h2>
                  {onlyFavorites
                    ? "Your favorites will appear here."
                    : "No directions match your search."}
                </h2>
                <Button
                  onClick={() => {
                    setOnlyFavorites(false);
                    setCategory("All directions");
                    setQuery("");
                  }}
                >
                  Show all directions
                </Button>
              </div>
            )}
            <section className="poc-gallery-end">
              <div className="poc-eyebrow">A SHARED FOUNDATION</div>
              <h2>
                Different expressions.
                <br />
                The same attention to detail.
              </h2>
              <p>
                Every direction brings together real Ant Design controls,
                accessible interactions,
                <br />
                responsive layouts, and Kooya’s considered approach to the
                everyday.
              </p>
              <a href="#/components">
                Explore the component library <ArrowUpRight size={16} />
              </a>
            </section>
          </div>
        )}
      </main>
      <footer className="poc-lab-footer">
        <span>
          Kooya UI <span> / </span> A considered way to work.
        </span>
        <span>Design exploration · Fictional data</span>
        <a href="/build-provenance.json" target="_blank" rel="noreferrer">
          About this preview <ArrowUpRight size={12} />
        </a>
      </footer>
      <Drawer
        title="Customize this direction"
        open={controls}
        onClose={() => setControls(false)}
      >
        <div className="poc-mobile-controls">{fields}</div>
        <Button block type="primary" onClick={() => setControls(false)}>
          Apply & explore
        </Button>
      </Drawer>
    </>
  );
}
function AvatarButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="poc-lab-avatar"
      onClick={onClick}
      aria-label="Open sample team"
    >
      AM
    </button>
  );
}
