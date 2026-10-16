import type { KooyaStyle } from "@kooyaph/ui";
export const layouts = [
  {
    id: "workbench",
    name: "Kooya Workbench",
    subtitle: "A considered everyday workspace",
    description:
      "A clear sidebar, focused actions, and a calm canvas for the work that matters.",
    palette: "olive",
    icon: "▦",
    category: "Administration",
  },
  {
    id: "atlas",
    name: "Atlas",
    subtitle: "Many spaces. One point of view.",
    description:
      "An application rail and project navigation keep a growing organization within reach.",
    palette: "slate",
    icon: "◫",
    category: "Administration",
  },
  {
    id: "horizon",
    name: "Horizon",
    subtitle: "Make room for the big picture",
    description:
      "Horizontal navigation opens up a broad, uninterrupted working canvas.",
    palette: "navy",
    icon: "☰",
    category: "Administration",
  },
  {
    id: "ledger",
    name: "Ledger",
    subtitle: "Clarity in every record",
    description:
      "Persistent filters, precise tables, and contextual details for data-intensive work.",
    palette: "graphite",
    icon: "≡",
    category: "Operations",
  },
  {
    id: "editorial",
    name: "Editorial",
    subtitle: "A place for thoughtful publishing",
    description:
      "A content tree, generous editing surface, and publishing inspector stay in conversation.",
    palette: "stone",
    icon: "¶",
    category: "Content",
  },
  {
    id: "relay",
    name: "Relay",
    subtitle: "Keep the next conversation moving",
    description:
      "A queue, a working record, and its activity create a natural service workflow.",
    palette: "teal",
    icon: "↔",
    category: "Operations",
  },
  {
    id: "delivery",
    name: "Delivery",
    subtitle: "From intention to done",
    description:
      "Project tabs and a board-led workspace bring people and priorities together.",
    palette: "indigo",
    icon: "▤",
    category: "Projects",
  },
  {
    id: "observatory",
    name: "Observatory",
    subtitle: "See what is changing",
    description:
      "An analytical command bar, metric strip, and contextual filters reveal the bigger picture.",
    palette: "steel",
    icon: "◴",
    category: "Analytics",
  },
  {
    id: "directory",
    name: "Directory",
    subtitle: "Know the people behind the work",
    description:
      "Browse a searchable record list alongside a spacious profile and detail workspace.",
    palette: "sage",
    icon: "⊞",
    category: "Operations",
  },
  {
    id: "governance",
    name: "Governance",
    subtitle: "Confidence in the details",
    description:
      "Section navigation and readable forms make complex administration feel straightforward.",
    palette: "plum",
    icon: "◇",
    category: "Administration",
  },
  {
    id: "focus",
    name: "Focus",
    subtitle: "Space to do your best work",
    description:
      "A minimal application rail and a centered canvas let the task take the lead.",
    palette: "cocoa",
    icon: "◎",
    category: "Content",
  },
  {
    id: "soft",
    name: "Kooya Soft",
    subtitle: "Structure with a little warmth",
    description:
      "Quiet modular panels bring a familiar Kooya rhythm to a more formal working day.",
    palette: "forest",
    icon: "▧",
    category: "Administration",
  },
] as const;
export const palettes = [
  { id: "olive", name: "Kooya Olive", accent: "#45583D" },
  { id: "slate", name: "Slate", accent: "#475569" },
  { id: "navy", name: "Navy", accent: "#334E74" },
  { id: "graphite", name: "Graphite", accent: "#42464D" },
  { id: "stone", name: "Warm Stone", accent: "#75634E" },
  { id: "teal", name: "Deep Teal", accent: "#2D6A64" },
  { id: "indigo", name: "Indigo", accent: "#555B91" },
  { id: "steel", name: "Steel Blue", accent: "#48677B" },
  { id: "sage", name: "Sage", accent: "#637257" },
  { id: "plum", name: "Plum", accent: "#76556D" },
  { id: "cocoa", name: "Cocoa", accent: "#795A4B" },
  { id: "forest", name: "Forest", accent: "#31574B" },
] as const;
export const scenes = [
  { id: "dashboard", name: "Overview", icon: "◴" },
  { id: "cms", name: "Content", icon: "▤" },
  { id: "work", name: "Work queue", icon: "☷" },
  { id: "people", name: "People", icon: "♙" },
  { id: "settings", name: "Settings", icon: "⚙" },
  { id: "components", name: "Components", icon: "⊞" },
] as const;
export type LayoutId = (typeof layouts)[number]["id"];
export type PaletteId = (typeof palettes)[number]["id"];
export type SceneId = (typeof scenes)[number]["id"];
export type Selection = {
  layout: LayoutId;
  palette: PaletteId;
  mode: "light" | "dark";
  density: "comfortable" | "compact";
  scene: SceneId;
};
export const defaultSelection: Selection = {
  layout: "editorial",
  palette: "olive",
  mode: "light",
  density: "compact",
  scene: "cms",
};
export const selectionKey = "kooya-ui.poc.selection.v1";
export const favoritesKey = "kooya-ui.poc.favorites.v1";
export function loadStored<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}
export function store(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* The comparison remains usable without browser storage. */
  }
}
export function normalize(value: Partial<Selection>): Selection {
  return {
    layout: layouts.some((x) => x.id === value.layout)
      ? value.layout!
      : defaultSelection.layout,
    palette: palettes.some((x) => x.id === value.palette)
      ? value.palette!
      : defaultSelection.palette,
    mode: value.mode === "dark" ? "dark" : "light",
    density: value.density === "comfortable" ? "comfortable" : "compact",
    scene: scenes.some((x) => x.id === value.scene)
      ? value.scene!
      : defaultSelection.scene,
  };
}
export function readSelection(hash = location.hash): Selection {
  const [path, query = ""] = hash.replace(/^#\/?/, "").split("?");
  const bits = path.split("/");
  const hasDesignRoute = ["explore", "frame", "compare"].includes(bits[0]);
  const p = new URLSearchParams(query);
  const saved = normalize(
    loadStored<Partial<Selection>>(selectionKey, defaultSelection),
  );
  return normalize({
    ...saved,
    ...(hasDesignRoute && bits[1] ? { layout: bits[1] as LayoutId } : {}),
    ...(hasDesignRoute && bits[2] ? { scene: bits[2] as SceneId } : {}),
    ...Object.fromEntries(
      [...p].filter(([key]) => ["palette", "mode", "density"].includes(key)),
    ),
  });
}
export function href(s: Selection, page = "explore") {
  return `#/${page}/${s.layout}/${s.scene}?palette=${s.palette}&mode=${s.mode}&density=${s.density}`;
}
export function selectionId(s: Selection) {
  return [s.layout, s.palette, s.mode, s.density].join(":");
}
function mix(a: string, b: string, t: number) {
  return (
    "#" +
    [1, 3, 5]
      .map((i) =>
        Math.round(
          parseInt(a.slice(i, i + 2), 16) * t +
            parseInt(b.slice(i, i + 2), 16) * (1 - t),
        )
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
export function scheme(s: Selection) {
  const dark = s.mode === "dark";
  const palette = palettes.find((x) => x.id === s.palette)!;
  const surface = dark ? "#1D2329" : "#FFFFFF";
  const accent = dark ? mix("#FFFFFF", palette.accent, 0.58) : palette.accent;
  return {
    name: palette.name,
    canvas: dark ? "#15191D" : "#F6F7F8",
    surface,
    subtle: dark ? "#252D35" : "#F0F2F4",
    ink: dark ? "#EDF1F5" : "#20262D",
    muted: dark ? "#ACB7C2" : "#626B75",
    line: dark ? "#3B4652" : "#DCE1E5",
    focus: accent,
    accent,
    accentInk: dark ? "#15191D" : "#FFFFFF",
    highlight: mix(accent, surface, dark ? 0.18 : 0.09),
    highlightInk: accent,
    secondary: mix(accent, surface, 0.05),
    tertiary: mix(accent, surface, 0.03),
    success: dark ? "#9CD4AC" : "#316545",
    warning: dark ? "#E9C47E" : "#805715",
    danger: dark ? "#F3A39F" : "#A2352B",
    info: dark ? "#A5BDF0" : "#345D9D",
  };
}
export function providerProps(s: Selection) {
  const colors = scheme(s);
  return {
    theme: colors,
    branding: { scheme: colors },
    mode: s.mode,
    density: s.density,
    style: {
      "--ku-radius-control": "6px",
      "--ku-radius-card": s.layout === "soft" ? "12px" : "8px",
      "--ku-radius-overlay": "10px",
      "--poc-accent": colors.accent,
    } as KooyaStyle,
  };
}
