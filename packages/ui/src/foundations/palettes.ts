/** Kooya v1 workspace palettes. Identity and semantic status colors stay independent. */
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
export type PaletteId = (typeof palettes)[number]["id"];
export type AppearancePreferences = {
  palette: PaletteId | "custom";
  customAccent: string | null;
  mode: "light" | "dark" | "system";
  density: "compact" | "comfortable";
};
export const defaultAppearance: AppearancePreferences = {
  palette: "olive",
  customAccent: null,
  mode: "light",
  density: "compact",
};
export function normalizeAppearance(
  input: Partial<AppearancePreferences> = {},
): AppearancePreferences {
  const customAccent =
    typeof input.customAccent === "string" &&
    /^#[0-9a-f]{6}$/i.test(input.customAccent)
      ? input.customAccent.toUpperCase()
      : null;
  return {
    palette:
      input.palette === "custom" && customAccent
        ? "custom"
        : palettes.some((p) => p.id === input.palette)
          ? input.palette!
          : "olive",
    customAccent,
    mode:
      input.mode === "dark" || input.mode === "system" ? input.mode : "light",
    density: input.density === "comfortable" ? "comfortable" : "compact",
  };
}
function rgb(hex: string) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}
function mix(a: string, b: string, amount: number) {
  const x = rgb(a),
    y = rgb(b);
  return (
    "#" +
    x
      .map((v, i) =>
        Math.round(v * (1 - amount) + y[i] * amount)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
function luminance(hex: string) {
  const c = rgb(hex)
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a: string, b: string) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
function readable(color: string, surface: string, dark: boolean) {
  if (ratio(color, surface) >= 4.5) return color;
  for (let i = 1; i <= 100; i++) {
    const next = mix(color, dark ? "#FFFFFF" : "#000000", i / 100);
    if (ratio(next, surface) >= 4.5) return next;
  }
  return dark ? "#FFFFFF" : "#000000";
}
export function createPaletteFromAccent(
  accent: string,
  mode: "light" | "dark" = "light",
  name = "Custom",
) {
  if (!/^#[0-9a-f]{6}$/i.test(accent))
    throw new Error("Use a six-digit hexadecimal accent color");
  const dark = mode === "dark";
  const surface = dark ? "#1D2329" : "#FFFFFF";
  const resolved = readable(
    dark ? mix(accent, "#FFFFFF", 0.42) : accent,
    surface,
    dark,
  );
  const accentInk =
    ratio(resolved, "#FFFFFF") >= ratio(resolved, "#000000")
      ? "#FFFFFF"
      : "#000000";
  const highlight = mix(resolved, surface, dark ? 0.82 : 0.91);
  return {
    name,
    canvas: dark ? "#15191D" : "#F6F7F8",
    surface,
    subtle: dark ? "#252D35" : "#F0F2F4",
    ink: dark ? "#EDF1F5" : "#20262D",
    muted: dark ? "#ACB7C2" : "#626B75",
    line: dark ? "#52606C" : "#CBD1D8",
    accent: resolved,
    accentInk,
    focus: resolved,
    highlight,
    highlightInk: readable(resolved, highlight, dark),
    secondary: mix(resolved, surface, 0.95),
    tertiary: mix(resolved, surface, 0.97),
    success: dark ? "#9CD4AC" : "#316545",
    warning: dark ? "#E9C47E" : "#805715",
    danger: dark ? "#F3A39F" : "#A2352B",
    info: dark ? "#A5BDF0" : "#345D9D",
  };
}
export function workspacePalette(
  palette: PaletteId | "custom" = "olive",
  mode: "light" | "dark" = "light",
  customAccent?: string | null,
) {
  const selected = palettes.find((p) => p.id === palette) ?? palettes[0];
  return createPaletteFromAccent(
    palette === "custom" && customAccent && /^#[0-9a-f]{6}$/i.test(customAccent)
      ? customAccent
      : selected.accent,
    mode,
    palette === "custom" ? "Custom" : selected.name,
  );
}
