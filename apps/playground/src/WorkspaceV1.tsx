import { useEffect, useState } from "react";
import {
  KooyaProvider,
  AppearancePicker,
  defaultAppearance,
  normalizeAppearance,
  type AppearancePreferences,
} from "@kooyaph/ui";
import { Button, Drawer } from "antd";
import { Shell } from "./poc/Shell";
import { DemoState } from "./poc/state";
import { defaultSelection, type Selection } from "./poc/model";
import "./poc/poc.css";
import "./workspace-v1.css";
export default function WorkspaceV1() {
  const [appearance, setAppearance] = useState<AppearancePreferences>(() => {
    try {
      return normalizeAppearance(
        JSON.parse(localStorage.getItem("kooya.ui.v1.appearance") ?? "null") ??
          defaultAppearance,
      );
    } catch {
      return defaultAppearance;
    }
  });
  const [scene, setScene] = useState<Selection["scene"]>(() => {
    const match = location.hash.match(
      /^#\/workspace\/(dashboard|cms|work|people|settings|components)/,
    );
    return (match?.[1] as Selection["scene"]) ?? "cms";
  });
  useEffect(() => {
    const update = () => {
      const match = location.hash.match(
        /^#\/workspace\/(dashboard|cms|work|people|settings|components)/,
      );
      setScene((match?.[1] as Selection["scene"]) ?? "cms");
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.title = "Kooya UI v1 · Editorial & Governance";
    try {
      localStorage.setItem(
        "kooya.ui.v1.appearance",
        JSON.stringify(appearance),
      );
    } catch {}
  }, [appearance]);
  const [systemDark, setSystemDark] = useState(
    () => matchMedia("(prefers-color-scheme: dark)").matches,
  );
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const mode =
    appearance.mode === "system"
      ? systemDark
        ? "dark"
        : "light"
      : appearance.mode;
  const selection: Selection = {
    ...defaultSelection,
    scene,
    layout:
      scene === "settings" || scene === "people" ? "governance" : "editorial",
    palette: appearance.palette === "custom" ? "olive" : appearance.palette,
    mode,
    density: appearance.density,
  };
  return (
    <KooyaProvider
      palette={appearance.palette}
      customAccent={appearance.customAccent}
      mode={mode}
      density={appearance.density}
      className="poc-root ku-v1-review"
    >
      <header className="v1-review-header">
        <a href="#/overview">
          <strong>Kooya UI</strong>
          <span>v1.0 · Editorial & Governance</span>
        </a>
        <nav aria-label="Library navigation">
          <a href="#/components">Components</a>
          <a href="#/docs">Documentation</a>
          <a href="#/stress">Content checks</a>
          <Button onClick={() => setOpen(true)}>Appearance</Button>
        </nav>
      </header>
      <DemoState>
        <Shell
          selection={selection}
          onScene={(next) => {
            setScene(next);
            history.replaceState(null, "", `#/workspace/${next}`);
          }}
        />
      </DemoState>
      <Drawer
        title="Your workspace appearance"
        open={open}
        onClose={() => setOpen(false)}
        width={420}
      >
        <p className="v1-description">
          Kooya Olive is the default. Explore the same components with your
          preferred palette and appearance.
        </p>
        <AppearancePicker value={appearance} onChange={setAppearance} />
        <Button
          style={{ marginTop: 24 }}
          onClick={() => setAppearance(defaultAppearance)}
        >
          Reset to Kooya Olive
        </Button>
      </Drawer>
    </KooyaProvider>
  );
}
