import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { App, ConfigProvider, theme as ant, type ThemeConfig } from "antd";
import { themes, type ThemeOption } from "./themes";
export { themes } from "./themes";
export type ThemeName = keyof typeof themes;
export type { KooyaTheme, ThemeOption } from "./themes";
export type Density = "comfortable" | "compact";
export type Composition = "mosaic" | "orbit" | "canvas" | "flow";
export type ColorMode = "light" | "dark";
export type KooyaStyle = CSSProperties & {
  [key: `--ku-${string}`]: string | number | undefined;
};
export type ThemeScheme = {
  [K in Exclude<keyof typeof themes.mosaic, "name">]: string;
} & { success: string; warning: string; danger: string };
export interface BrandingOverrides {
  accent?: string;
  scheme?: Partial<ThemeScheme>;
}
export interface KooyaOptions {
  theme?: ThemeOption;
  density?: Density;
  composition?: Composition;
  mode?: ColorMode;
  fontFamily?: string;
  branding?: BrandingOverrides;
  reducedMotion?: boolean;
}
export interface KooyaProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    KooyaOptions {
  style?: KooyaStyle;
  children: ReactNode;
}
const defaults = {
  theme: "mosaic",
  density: "comfortable",
  composition: "mosaic",
  mode: "light",
} as const;
const Context = createContext<{
  theme: ThemeOption;
  density: Density;
  composition: Composition;
  mode: ColorMode;
  variables: KooyaStyle;
  root?: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}>({ ...defaults, variables: {}, reducedMotion: false });
function luminance(hex: string) {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((x) => x + x)
          .join("")
      : value;
  if (!/^[0-9a-f]{6}$/i.test(full)) return undefined;
  const c = [0, 2, 4]
    .map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function contrastRatio(a: string, b: string) {
  const x = luminance(a),
    y = luminance(b);
  if (x === undefined || y === undefined) return 0;
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
export function resolveThemeScheme(
  theme: ThemeOption = "mosaic",
  mode: ColorMode = "light",
  branding: BrandingOverrides = {},
): ThemeScheme {
  const selectedTheme = typeof theme === "string" ? themes[theme] : theme;
  const { name: _name, ...base } = selectedTheme;
  const dark = mode === "dark";
  const scheme: ThemeScheme = {
    ...base,
    success: dark ? "#9bd58b" : "#38652a",
    warning: dark ? "#f3c976" : "#805715",
    danger: dark ? "#ffaaa0" : "#a2352b",
    ...(dark
      ? {
          canvas: "#151b18",
          surface: "#202923",
          subtle: "#2a352d",
          ink: "#f1f5ef",
          muted: "#b4c1b2",
          line: "#485448",
          focus: "#c1dfaa",
          highlight: "#35442f",
          highlightInk: "#e2f0d9",
          secondary: "#303c31",
          tertiary: "#403b31",
        }
      : {}),
    ...branding.scheme,
  };
  if (branding.accent) scheme.accent = branding.accent;
  if (branding.accent || branding.scheme?.accent)
    scheme.accentInk =
      contrastRatio(scheme.accent, "#ffffff") >=
      contrastRatio(scheme.accent, "#13120f")
        ? "#ffffff"
        : "#13120f";
  // Select a fallback against the resolved surface, including branded surfaces.
  // For an opaque hex color, at least one of black/white exceeds 4.5:1.
  const contrastFallback =
    contrastRatio("#ffffff", scheme.surface) >=
    contrastRatio("#000000", scheme.surface)
      ? "#ffffff"
      : "#000000";
  for (const key of ["focus", "success", "warning", "danger"] as const)
    if (contrastRatio(scheme[key], scheme.surface) < 4.5)
      scheme[key] = contrastFallback;
  return scheme;
}
export function themeVariables(
  theme: ThemeOption = "mosaic",
  mode: ColorMode = "light",
  branding: BrandingOverrides = {},
): KooyaStyle {
  const scheme = resolveThemeScheme(theme, mode, branding);
  return {
    ...Object.fromEntries(
      Object.entries(scheme).map(([k, v]) => [
        "--ku-" + k.replace(/[A-Z]/g, (x) => "-" + x.toLowerCase()),
        v,
      ]),
    ),
    "--ku-control-border": scheme.muted,
  };
}
export function antTheme(
  theme: ThemeOption = "mosaic",
  options: Omit<KooyaOptions, "theme"> = {},
  variables: KooyaStyle = {},
): ThemeConfig {
  const s = resolveThemeScheme(theme, options.mode, options.branding);
  const v = (key: keyof ThemeScheme) =>
    String(
      variables[
        ("--ku-" +
          key.replace(
            /[A-Z]/g,
            (x) => "-" + x.toLowerCase(),
          )) as `--ku-${string}`
      ] ?? s[key],
    );
  const controlBorder = String(variables["--ku-control-border"] ?? v("muted"));
  const fieldBorder = {
    colorBorder: controlBorder,
    hoverBorderColor: controlBorder,
    activeBorderColor: v("focus"),
    colorTextPlaceholder: v("muted"),
    colorTextQuaternary: v("muted"),
  };
  // Selected indicators need their own contrast pair; a brand accent may be
  // intentionally pale. These are scoped component roles, not palette changes.
  const selectedCue = {
    colorPrimary: v("focus"),
    colorPrimaryHover: v("focus"),
    colorWhite: v("surface"),
  };
  return {
    algorithm: (seed, map) => ({
      ...(options.mode === "dark" ? ant.darkAlgorithm : ant.defaultAlgorithm)(
        seed,
        map,
      ),
      colorPrimary: v("accent"),
      colorSuccess: v("success"),
      colorWarning: v("warning"),
      colorError: v("danger"),
    }),
    token: {
      colorPrimary: v("accent"),
      colorText: v("ink"),
      colorTextSecondary: v("muted"),
      colorBgContainer: v("surface"),
      colorBgElevated: v("surface"),
      colorBgLayout: v("canvas"),
      colorBorder: v("line"),
      colorSuccess: v("success"),
      colorWarning: v("warning"),
      colorError: v("danger"),
      colorLink: v("focus"),
      colorLinkHover: v("ink"),
      colorLinkActive: v("focus"),
      colorTextLightSolid: v("accentInk"),
      controlOutline: v("focus"),
      borderRadius: 12,
      fontSize: 14,
      controlHeight: options.density === "compact" ? 36 : 44,
      fontFamily:
        options.fontFamily ??
        String(
          variables["--ku-font-sans"] ??
            '"Inter Variable", Inter, system-ui, sans-serif',
        ),
      motion: !options.reducedMotion,
      motionDurationMid: "0.18s",
      motionDurationSlow: "0.24s",
    },
    components: {
      Input: fieldBorder,
      InputNumber: fieldBorder,
      Select: fieldBorder,
      DatePicker: fieldBorder,
      Checkbox: { colorBorder: controlBorder, ...selectedCue },
      Radio: { colorBorder: controlBorder, ...selectedCue },
      Switch: { ...selectedCue, handleBg: v("surface") },
      Progress: { defaultColor: v("focus") },
      Button: {
        primaryColor: v("accentInk"),
        defaultColor: v("ink"),
        defaultHoverColor: v("ink"),
        defaultActiveColor: v("ink"),
        defaultHoverBg: v("subtle"),
        defaultActiveBg: v("subtle"),
        textTextColor: v("ink"),
        textTextHoverColor: v("ink"),
        textTextActiveColor: v("ink"),
        colorErrorHover: v("danger"),
        colorErrorActive: v("danger"),
      },
      Breadcrumb: {
        itemColor: v("muted"),
        lastItemColor: v("ink"),
        linkColor: v("focus"),
        linkHoverColor: v("ink"),
        separatorColor: v("muted"),
      },
      Pagination: {
        itemActiveBg: v("surface"),
        itemActiveColor: v("focus"),
        itemActiveColorHover: v("ink"),
        colorPrimary: v("focus"),
        colorPrimaryHover: v("ink"),
      },
      Table: { cellPaddingBlock: options.density === "compact" ? 10 : 16 },
      Card: { bodyPadding: options.density === "compact" ? 20 : 24 },
    },
  };
}
export function useKooyaTheme() {
  return useContext(Context).theme;
}
export function useKooyaRoot() {
  return useContext(Context).root;
}
export function useKooyaPortalTheme() {
  return useContext(Context);
}
export function useKooyaOptions() {
  return useContext(Context);
}
export function useKooyaFeedback() {
  const feedback = App.useApp();
  const root = useKooyaRoot();
  const scoped = (config: import("antd").ModalFuncProps) => ({
    ...config,
    getContainer: config.getContainer ?? (() => root?.current ?? document.body),
  });
  return {
    ...feedback,
    modal: {
      ...feedback.modal,
      confirm: (config: import("antd").ModalFuncProps) =>
        feedback.modal.confirm(scoped(config)),
      info: (config: import("antd").ModalFuncProps) =>
        feedback.modal.info(scoped(config)),
      success: (config: import("antd").ModalFuncProps) =>
        feedback.modal.success(scoped(config)),
      warning: (config: import("antd").ModalFuncProps) =>
        feedback.modal.warning(scoped(config)),
      error: (config: import("antd").ModalFuncProps) =>
        feedback.modal.error(scoped(config)),
    },
  };
}
export function KooyaProvider({
  theme = "mosaic",
  density = "comfortable",
  composition = "mosaic",
  mode = "light",
  branding,
  fontFamily,
  reducedMotion,
  children,
  className = "",
  style,
  ...props
}: KooyaProviderProps) {
  const root = useRef<HTMLDivElement>(null);
  const [systemMotion, setSystemMotion] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemMotion(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  const motion = reducedMotion ?? systemMotion;
  const overrides = Object.fromEntries(
    Object.entries(style ?? {}).filter(([k]) => k.startsWith("--ku-")),
  );
  const variables: KooyaStyle = {
    ...themeVariables(theme, mode, branding),
    ...(fontFamily ? { "--ku-font-sans": fontFamily } : {}),
    ...overrides,
  };
  const container = () => root.current ?? document.body;
  return (
    <Context.Provider
      value={{
        theme,
        density,
        composition,
        mode,
        variables,
        root,
        reducedMotion: motion,
      }}
    >
      <div
        {...props}
        ref={root}
        tabIndex={props.tabIndex ?? -1}
        className={"ku-root " + className}
        data-theme={
          typeof theme === "string"
            ? theme
            : theme.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
        }
        data-density={density}
        data-mode={mode}
        data-reduced-motion={motion}
        style={{ ...variables, ...style }}
      >
        <ConfigProvider
          theme={antTheme(
            theme,
            { density, mode, branding, fontFamily, reducedMotion: motion },
            variables,
          )}
          getPopupContainer={container}
          wave={{ disabled: motion }}
        >
          <App
            component={false}
            message={{ getContainer: container }}
            notification={{ getContainer: container }}
          >
            {children}
          </App>
        </ConfigProvider>
      </div>
    </Context.Provider>
  );
}
