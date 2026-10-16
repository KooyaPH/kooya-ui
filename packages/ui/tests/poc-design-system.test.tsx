import { describe, it, expect, beforeEach } from "vitest";
import {
  layouts,
  palettes,
  scenes,
  defaultSelection,
  href,
  normalize,
  readSelection,
  scheme,
  providerProps,
  store,
  selectionKey,
  selectionId,
} from "../../../apps/playground/src/poc/model";
import { antTheme, contrastRatio } from "../src/foundations/theme";
describe("corporate POC selections", () => {
  beforeEach(() => localStorage.clear());
  it("offers twelve distinct layouts, twelve palettes, and six work areas", () => {
    expect(new Set(layouts.map((x) => x.id)).size).toBe(12);
    expect(new Set(palettes.map((x) => x.id)).size).toBe(12);
    expect(scenes).toHaveLength(6);
    expect(layouts.length * palettes.length * 2 * 2).toBe(576);
  });
  it("round trips every combination through its public deep link", () => {
    for (const layout of layouts)
      for (const palette of palettes)
        for (const mode of ["light", "dark"] as const)
          for (const density of ["compact", "comfortable"] as const) {
            const s = {
              ...defaultSelection,
              layout: layout.id,
              palette: palette.id,
              mode,
              density,
            };
            expect(readSelection(href(s))).toEqual(s);
          }
  });
  it("restores saved appearance but explicit links take precedence", () => {
    store(selectionKey, {
      ...defaultSelection,
      layout: "relay",
      palette: "teal",
      mode: "dark",
    });
    expect(readSelection("#/overview").palette).toBe("teal");
    expect(readSelection("#/components/button").layout).toBe("relay");
    expect(readSelection("#/components/button").mode).toBe("dark");
    expect(
      readSelection(
        "#/explore/ledger/people?palette=stone&mode=light&density=compact",
      ),
    ).toEqual({
      layout: "ledger",
      scene: "people",
      palette: "stone",
      mode: "light",
      density: "compact",
    });
  });
  it("recovers unknown selection values without loading arbitrary styles", () => {
    expect(
      normalize({ layout: "unknown", palette: "bad", mode: "bad" } as any),
    ).toEqual(defaultSelection);
    expect(selectionId(defaultSelection)).toBe("editorial:olive:light:compact");
  });
  it.each(palettes)(
    "keeps $name text, primary actions, and focus readable in both modes",
    (p) => {
      for (const mode of ["light", "dark"] as const) {
        const s = scheme({ ...defaultSelection, palette: p.id, mode });
        expect(contrastRatio(s.ink, s.surface)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(s.muted, s.surface)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(s.accent, s.accentInk)).toBeGreaterThanOrEqual(
          4.5,
        );
        expect(contrastRatio(s.focus, s.surface)).toBeGreaterThanOrEqual(4.5);
        expect(
          contrastRatio(s.highlightInk, s.highlight),
        ).toBeGreaterThanOrEqual(4.5);
      }
    },
  );
  it("maps scoped geometry into native Ant tokens and retains old control radius", () => {
    const options = providerProps(defaultSelection);
    const themed = antTheme(options.theme, options, options.style);
    expect(themed.token?.borderRadius).toBe(6);
    expect(themed.token?.borderRadiusLG).toBe(10);
    expect(themed.components?.Card?.borderRadiusLG).toBe(8);
    expect(antTheme().token?.borderRadius).toBe(12);
    expect(
      antTheme("mosaic", {}, { "--ku-radius-control": "invalid" }).token
        ?.borderRadius,
    ).toBe(12);
  });
});
