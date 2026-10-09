import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { KooyaProvider } from "../src/foundations/theme";
import packageManifest from "../package.json";
import { mosaicTheme, themes } from "../src/foundations/themes";

const themeNames = ["mosaic", "signature", "canvas", "client"] as const;

describe("individual theme package imports", () => {
  it.each(themeNames)("publishes the %s theme as its own import", (name) => {
    const manifest = packageManifest.exports as Record<string, unknown>;
    const path = `./themes/${name}`;
    const expected = {
      types: `./dist/foundations/themes/${name}.d.ts`,
      import: `./dist/themes/${name}.js`,
    };
    const sourcePath = resolve(
      process.cwd(),
      `packages/ui/src/foundations/themes/${name}.ts`,
    );

    expect(manifest[path]).toEqual(expected);
    expect(existsSync(sourcePath)).toBe(true);
  });

  it("keeps every separately importable theme in the provider catalog", () => {
    expect(Object.keys(themes)).toEqual([...themeNames]);
    expect(themes.mosaic.name).toBe("Mosaic");
    expect(themes.signature.name).toBe("Kooya Signature");
    expect(themes.canvas.name).toBe("Canvas");
    expect(themes.client.name).toBe("Client");
  });

  it("lets consumers apply a theme imported from a separate package path", () => {
    const consumerTheme = {
      ...mosaicTheme,
      name: "Partner",
      canvas: "#e8e2f0",
    };
    const { container } = render(
      <KooyaProvider theme={consumerTheme}>
        <span>Partner workspace</span>
      </KooyaProvider>,
    );

    expect(screen.getByText("Partner workspace")).toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute(
      "data-theme",
      "partner",
    );
    expect(container.firstElementChild).toHaveStyle({
      "--ku-canvas": "#e8e2f0",
    });
  });
});
