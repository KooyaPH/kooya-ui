import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KooyaProvider, contrastRatio } from "../src/foundations/theme";
import {
  palettes,
  workspacePalette,
  createPaletteFromAccent,
  normalizeAppearance,
  defaultAppearance,
} from "../src/foundations/palettes";
import * as UI from "../src/legacy";
import { WorkspaceShell } from "../src/compositions/workspace";
import { AppearancePicker } from "../src/compositions/appearance";
import { Select } from "antd";
describe("v1 workspace foundations", () => {
  it.each(palettes)(
    "$name supports readable actions, text, focus and status in both modes",
    ({ id }) => {
      for (const mode of ["light", "dark"] as const) {
        const p = workspacePalette(id, mode);
        expect(contrastRatio(p.ink, p.surface)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(p.muted, p.surface)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(p.accent, p.surface)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(p.accent, p.accentInk)).toBeGreaterThanOrEqual(
          4.5,
        );
        expect(
          contrastRatio(p.highlightInk, p.highlight),
        ).toBeGreaterThanOrEqual(4.5);
        for (const role of [
          "focus",
          "success",
          "warning",
          "danger",
          "info",
        ] as const)
          expect(contrastRatio(p[role], p.surface)).toBeGreaterThanOrEqual(4.5);
      }
    },
  );
  it.each(["#FFFFFF", "#000000", "#FFFF00", "#00FF00", "#FF00FF", "#ABCDEF"])(
    "makes %s readable across modes",
    (accent) => {
      for (const mode of ["light", "dark"] as const) {
        const p = createPaletteFromAccent(accent, mode);
        expect(contrastRatio(p.accent, p.surface)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(p.accent, p.accentInk)).toBeGreaterThanOrEqual(
          4.5,
        );
      }
    },
  );
  it("rejects CSS expressions and invalid custom values", () => {
    expect(() => createPaletteFromAccent("url(https://invalid)")).toThrow();
    expect(
      normalizeAppearance({ palette: "custom", customAccent: "#0f0" }),
    ).toEqual(defaultAppearance);
  });
  it("normalizes custom colors and restores invalid stored selections", () => {
    expect(
      normalizeAppearance({
        palette: "custom",
        customAccent: "#abcdef",
        mode: "system",
        density: "comfortable",
      }),
    ).toEqual({
      palette: "custom",
      customAccent: "#ABCDEF",
      mode: "system",
      density: "comfortable",
    });
    expect(
      normalizeAppearance({
        palette: "missing" as never,
        mode: "sepia" as never,
      }),
    ).toEqual(defaultAppearance);
  });
  it("defaults to Olive Compact and creates an unclipped themed overlay host", () => {
    const { container } = render(
      <KooyaProvider>
        <Select
          aria-label="Record"
          options={[{ value: "a", label: "A long record ".repeat(40) }]}
        />
      </KooyaProvider>,
    );
    const root = container.querySelector(".ku-root")!;
    expect(root).toHaveAttribute("data-theme", "olive");
    expect(root).toHaveAttribute("data-density", "compact");
    const host = document.querySelector(".ku-overlay-host")!;
    expect(host.parentElement).toBe(document.body);
    expect(host).not.toHaveStyle({ pointerEvents: "none" });
    expect(host).toHaveAttribute("data-mode", "light");
  });
  it("provides named content, contextual navigation and an inspector for long records", () => {
    render(
      <KooyaProvider>
        <WorkspaceShell
          header="Workspace"
          navigation="Primary"
          context="Sections"
          inspector="Record details"
        >
          <h1>{"Long title ".repeat(100)}</h1>
        </WorkspaceShell>
      </KooyaProvider>,
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "workspace-content");
    expect(
      screen.getByRole("complementary", { name: "Section navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: "Record details" }),
    ).toBeInTheDocument();
  });
  it("keeps appearance fields controlled", () => {
    let next = defaultAppearance;
    render(
      <KooyaProvider>
        <AppearancePicker
          value={defaultAppearance}
          onChange={(value) => {
            next = value;
          }}
        />
      </KooyaProvider>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(next.mode).toBe("dark");
    expect(screen.getByRole("radio", { name: "Light" })).toBeChecked();
  });
});

it("preserves System preference when catalogue settings are stored", async () => {
  const { readLibraryAppearance, storeLibraryAppearance } = await import(
    "../../../apps/playground/src/site/appearance"
  );
  localStorage.setItem(
    "kooya.ui.v1.appearance",
    JSON.stringify({ ...defaultAppearance, mode: "system" }),
  );
  const appearance = readLibraryAppearance();
  storeLibraryAppearance({ ...appearance, density: "comfortable" });
  expect(JSON.parse(localStorage.getItem("kooya.ui.v1.appearance")!).mode).toBe(
    "system",
  );
  localStorage.removeItem("kooya.ui.v1.appearance");
});

it("gives avatar initials readable neutral foreground and background roles", () => {
  for (const mode of ["light", "dark"] as const) {
    const palette = workspacePalette("olive", mode);
    expect(contrastRatio(palette.ink, palette.subtle)).toBeGreaterThanOrEqual(
      4.5,
    );
  }
});

it("renders utility chrome without repeating the route identity or nesting a header", () => {
  const { container } = render(
    <KooyaProvider>
      <UI.WorkspaceHeader
        presentation="utility"
        name="Kooya"
        area="Work"
        title="Boards"
        collapsed={false}
        onNavigation={() => {}}
        onSearch={() => {}}
      />
    </KooyaProvider>,
  );
  expect(
    screen.getByRole("toolbar", { name: "Workspace toolbar" }).tagName,
  ).toBe("DIV");
  expect(screen.getByRole("button", { name: "Jump to a space" })).toBeTruthy();
  expect(container.textContent).not.toContain("Boards");
  expect(container.querySelector("header")).toBeNull();
});
