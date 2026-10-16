import { createPortal } from "react-dom";
import { workspacePalette, type PaletteId } from "./palettes";
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
import {
  App,
  ConfigProvider,
  theme as ant,
  type ThemeConfig,
  type ConfigProviderProps,
} from "antd";
import { themes, type ThemeOption } from "./themes";
import { kooyaTypography } from "./brand";
import { useDrawerInputFocus } from "./drawer-input-focus";
export { themes } from "./themes";
export type ThemeName = keyof typeof themes;
export type { KooyaTheme, ThemeOption } from "./themes";
export type Density = "comfortable" | "compact";
export type Composition =
  | "editorial"
  | "governance"
  | "mosaic"
  | "orbit"
  | "canvas"
  | "flow";
export type ColorMode = "light" | "dark";
export type KooyaStyle = CSSProperties & {
  [key: `--ku-${string}`]: string | number | undefined;
};
export type ThemeScheme = {
  [K in Exclude<keyof typeof themes.mosaic, "name">]: string;
} & { success: string; warning: string; danger: string; info: string };
export interface BrandingOverrides {
  accent?: string;
  scheme?: Partial<ThemeScheme>;
}
export interface KooyaOptions {
  palette?: PaletteId | "custom";
  customAccent?: string | null;
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
  /** Consumer scope for portaled controls; the host retains independent geometry. */
  overlayClassName?: string;
  children: ReactNode;
}
type NativeDrawerConfig = NonNullable<ConfigProviderProps["drawer"]>;
// Only unwrap our own generated defaults across nested providers. Explicit
// parent semantic styles retain native precedence and callback arguments.
const ownedDrawerStyles = new WeakMap<object, NativeDrawerConfig["styles"]>();

const defaults = {
  theme: "olive",
  density: "compact",
  composition: "editorial",
  mode: "light",
} as const;
const Context = createContext<{
  theme: ThemeOption;
  density: Density;
  composition: Composition;
  mode: ColorMode;
  variables: KooyaStyle;
  root?: RefObject<HTMLDivElement | null>;
  overlayRoot?: RefObject<HTMLDivElement | null>;
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
  theme: ThemeOption = "olive",
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
    info: dark ? "#9fb1ff" : "#1d46d9",
    ...(dark && theme !== "olive"
      ? {
          canvas: "#13120f",
          surface: "#1f1e19",
          subtle: "#2c2b24",
          ink: "#f2eee3",
          muted: "#c5c0b3",
          line: "#49473e",
          focus: "#d7f20f",
          highlight: "#314300",
          highlightInk: "#f2eee3",
          secondary: "#302f27",
          tertiary: "#343020",
        }
      : {}),
    ...(theme === "olive" ? workspacePalette("olive", mode) : {}),
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
  for (const key of ["focus", "success", "warning", "danger", "info"] as const)
    if (contrastRatio(scheme[key], scheme.surface) < 4.5)
      scheme[key] = contrastFallback;
  return scheme;
}
export function themeVariables(
  theme: ThemeOption = "olive",
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
    "--ku-font-sans": kooyaTypography.interface,
    "--ku-font-display": kooyaTypography.display,
  };
}
/** Scoped geometry uses numeric pixels, matching Ant's token units. */
function radiusToken(value: string | number | undefined, fallback: number) {
  if (value === undefined) return fallback;
  if (typeof value === "string" && !/^\d+(?:\.\d+)?(?:px)?$/.test(value))
    return fallback;
  const parsed = Number.parseFloat(String(value));
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 48
    ? parsed
    : fallback;
}
export function antTheme(
  theme: ThemeOption = "olive",
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
    colorPrimaryActive: v("focus"),
    colorTextLightSolid: v("surface"),
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
      colorInfo: v("info"),
    }),
    token: {
      colorPrimary: v("accent"),
      colorText: v("ink"),
      colorTextSecondary: v("muted"),
      colorBgContainer: v("surface"),
      colorBgElevated: v("surface"),
      colorBgLayout: v("canvas"),
      colorFillAlter: v("subtle"),
      controlItemBgActive: v("highlight"),
      controlItemBgActiveHover: v("highlight"),
      controlItemBgHover: v("subtle"),
      colorBorder: v("line"),
      colorSuccess: v("success"),
      colorWarning: v("warning"),
      colorError: v("danger"),
      colorInfo: v("info"),
      colorLink: v("focus"),
      colorLinkHover: v("ink"),
      colorLinkActive: v("focus"),
      colorTextLightSolid: v("accentInk"),
      controlOutline: v("focus"),
      borderRadius: radiusToken(variables["--ku-radius-control"], 12),
      ...(variables["--ku-radius-overlay"] !== undefined
        ? { borderRadiusLG: radiusToken(variables["--ku-radius-overlay"], 16) }
        : {}),
      fontSize: 14,
      controlHeight: options.density === "compact" ? 36 : 44,
      fontFamily:
        options.fontFamily ??
        String(variables["--ku-font-sans"] ?? kooyaTypography.interface),
      motion: !options.reducedMotion,
      motionDurationMid: "0.18s",
      motionDurationSlow: "0.24s",
    },
    components: {
      Avatar: {
        colorTextPlaceholder: v("subtle"),
        colorTextLightSolid: v("ink"),
      },
      Tooltip: {
        colorBgSpotlight: v("surface"),
        colorTextLightSolid: v("ink"),
        // Compact noninteractive captions retain their font size at native
        // browser zoom without covering the focused trigger.
        maxWidth: 320,
        lineHeight: 20 / 14,
        paddingSM: 6,
        controlHeight: 26,
      },
      // Native menu items use the shared 3px outline + 3px offset. Keep
      // their complete focus cue within the popup, including viewport edges.
      Dropdown: { paddingXXS: 8, colorTextDescription: v("muted") },
      Menu: {
        itemColor: v("ink"),
        itemHoverColor: v("ink"),
        itemHoverBg: v("subtle"),
        itemSelectedColor: v("focus"),
        horizontalItemSelectedColor: v("focus"),
        horizontalItemHoverColor: v("ink"),
        itemSelectedBg: v("subtle"),
        subMenuItemBg: v("surface"),
        popupBg: v("surface"),
        darkItemBg: v("surface"),
        darkSubMenuItemBg: v("surface"),
        darkPopupBg: v("surface"),
        darkItemColor: v("muted"),
        darkItemHoverColor: v("ink"),
        darkItemSelectedColor: v("highlightInk"),
        darkItemSelectedBg: v("highlight"),
      },
      Tabs: {
        itemColor: v("muted"),
        itemHoverColor: v("ink"),
        itemActiveColor: v("focus"),
        itemSelectedColor: v("focus"),
        inkBarColor: v("focus"),
      },
      Steps: selectedCue,
      Tree: {
        nodeSelectedBg: v("highlight"),
        nodeSelectedColor: v("highlightInk"),
      },
      TreeSelect: {
        nodeSelectedBg: v("highlight"),
        nodeSelectedColor: v("highlightInk"),
        ...fieldBorder,
      },
      Slider: {
        trackBg: v("focus"),
        trackHoverBg: v("focus"),
        handleColor: v("focus"),
        handleActiveColor: v("focus"),
      },
      Input: { ...fieldBorder, colorTextDescription: v("muted") },
      InputNumber: fieldBorder,
      Select: {
        ...fieldBorder,
        optionSelectedBg: v("highlight"),
        optionSelectedColor: v("highlightInk"),
        optionActiveBg: v("subtle"),
      },
      DatePicker: {
        ...fieldBorder,
        colorPrimary: v("focus"),
        colorTextLightSolid: v("surface"),
        cellActiveWithRangeBg: v("subtle"),
      },
      Checkbox: { colorBorder: controlBorder, ...selectedCue },
      Radio: { colorBorder: controlBorder, ...selectedCue },
      Switch: { ...selectedCue, handleBg: v("surface") },
      Progress: { defaultColor: v("focus") },
      Spin: { colorPrimary: v("focus") },
      Empty: { colorTextDescription: v("muted") },
      Tag: {
        // Dark semantic foreground seeds can derive mid-tone Ant tag surfaces.
        // Preserve semantic meaning with explicit legible text/surface pairs.
        colorSuccess: v("success"),
        colorSuccessBg: v("surface"),
        colorSuccessBorder: v("success"),
        colorError: v("danger"),
        colorErrorBg: v("surface"),
        colorErrorBorder: v("danger"),
        colorWarning: v("warning"),
        colorWarningBg: v("surface"),
        colorWarningBorder: v("warning"),
        colorInfo: v("info"),
        colorInfoBg: v("surface"),
        colorInfoBorder: v("info"),
      },
      Button: {
        primaryColor: v("accentInk"),
        dangerColor:
          contrastRatio(v("danger"), "#ffffff") >=
          contrastRatio(v("danger"), "#000000")
            ? "#ffffff"
            : "#000000",
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
      Table: {
        colorPrimary: v("focus"),
        colorIcon: v("ink"),
        colorIconHover: v("ink"),
        cellPaddingBlock: options.density === "compact" ? 10 : 16,
        headerBg: v("subtle"),
        headerColor: v("ink"),
        rowSelectedBg: v("highlight"),
        rowSelectedHoverBg: v("subtle"),
      },
      Card: {
        bodyPadding: options.density === "compact" ? 20 : 24,
        ...(variables["--ku-radius-card"] !== undefined
          ? { borderRadiusLG: radiusToken(variables["--ku-radius-card"], 16) }
          : {}),
      },
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
export function useKooyaOverlayRoot() {
  const context = useContext(Context);
  return context.overlayRoot ?? context.root;
}
export function useKooyaFeedback(): ReturnType<typeof App.useApp> {
  const feedback = App.useApp();
  const root = useKooyaOverlayRoot();
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
  theme = "olive",
  palette,
  customAccent,
  density = "compact",
  composition = "editorial",
  mode = "light",
  branding,
  fontFamily,
  reducedMotion,
  children,
  className = "",
  overlayClassName = "",
  style,
  ...props
}: KooyaProviderProps) {
  if (palette) {
    const scheme = workspacePalette(palette, mode, customAccent);
    theme = scheme;
    branding = { ...branding, scheme: { ...scheme, ...branding?.scheme } };
  }
  const drawerInputFocus = useDrawerInputFocus();
  const inheritedDrawer = useContext(ConfigProvider.ConfigContext).drawer;
  const root = useRef<HTMLDivElement>(null);
  const overlayRoot = useRef<HTMLDivElement>(null);
  const [systemMotion, setSystemMotion] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemMotion(q.matches);
    update();
    setMotionReady(true);
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  const motion = reducedMotion ?? systemMotion;
  const overrides = Object.fromEntries(
    Object.entries(style ?? {}).filter(([k]) => k.startsWith("--ku-")),
  );
  const variables: KooyaStyle = {
    ...themeVariables(theme, mode, branding),
    "--ku-control-height": density === "compact" ? "36px" : "44px",
    "--ku-font-display": kooyaTypography.interface,
    "--ku-radius-control": "6px",
    "--ku-radius-card": "8px",
    "--ku-radius-overlay": "10px",
    ...(fontFamily ? { "--ku-font-sans": fontFamily } : {}),
    ...overrides,
  };
  // Native Drawer callers may portal outside the provider DOM. Carry only
  // owned styling through public semantic configuration; native caller merges
  // still run afterwards and retain their precedence.
  const parentDrawerStyles = inheritedDrawer?.styles;
  const rawDrawerStyles =
    typeof parentDrawerStyles === "function" &&
    ownedDrawerStyles.has(parentDrawerStyles)
      ? ownedDrawerStyles.get(parentDrawerStyles)
      : parentDrawerStyles;
  const drawerConfig: NativeDrawerConfig = {
    ...inheritedDrawer,
    classNames: (info) => {
      const inherited =
        typeof inheritedDrawer?.classNames === "function"
          ? inheritedDrawer.classNames(info)
          : inheritedDrawer?.classNames;
      return {
        ...inherited,
        root: [inherited?.root, "ku-drawer-scope"].filter(Boolean).join(" "),
        body: [inherited?.body, "ku-drawer-body"].filter(Boolean).join(" "),
      };
    },
    styles: (info) => {
      const inherited =
        typeof rawDrawerStyles === "function"
          ? rawDrawerStyles(info)
          : rawDrawerStyles;
      return { ...inherited, root: { ...variables, ...inherited?.root } };
    },
  };
  if (typeof drawerConfig.styles === "function") {
    ownedDrawerStyles.set(drawerConfig.styles, rawDrawerStyles);
  }
  const container = () => overlayRoot.current ?? root.current ?? document.body;
  return (
    <Context.Provider
      value={{
        theme,
        density,
        composition,
        mode,
        variables,
        root,
        overlayRoot,
        reducedMotion: motion,
      }}
    >
      <div
        {...props}
        ref={root}
        onFocus={(event) => {
          props.onFocus?.(event);
          drawerInputFocus.focus(event);
        }}
        onBlur={(event) => {
          drawerInputFocus.blur(event);
          props.onBlur?.(event);
        }}
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
        {motionReady &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              ref={overlayRoot}
              className={`ku-root ku-overlay-host ${overlayClassName}`}
              data-mode={mode}
              data-density={density}
              data-reduced-motion={motion}
              style={{
                ...variables,
                position: "absolute",
                insetInline: 0,
                top: 0,
                height: 0,
                minHeight: 0,
                padding: 0,
                margin: 0,
                border: 0,
                display: "block",
                overflow: "visible",
                background: "transparent",
                pointerEvents: "auto",
              }}
            />,
            document.body,
          )}
        <ConfigProvider
          theme={antTheme(
            theme,
            // Ant's MotionWrapper inserts providers on its first disabled
            // motion render. Establish that stable tree before mount effects;
            // later OS preference changes must not remount unsaved children.
            {
              density,
              mode,
              branding,
              fontFamily,
              reducedMotion: motion || !motionReady,
            },
            variables,
          )}
          drawer={drawerConfig}
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
