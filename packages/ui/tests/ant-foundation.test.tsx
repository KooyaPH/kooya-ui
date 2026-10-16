import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button, Drawer, Modal, Select, theme as ant } from "antd";
import {
  KooyaProvider,
  antTheme,
  contrastRatio,
  resolveThemeScheme,
  themeVariables,
  useKooyaFeedback,
} from "../src/foundations";
import packageManifest from "../package.json";

function TokenProbe() {
  const { token } = ant.useToken();
  return (
    <output data-testid="tokens">
      {JSON.stringify({
        canvas: token.colorBgLayout,
        surface: token.colorBgContainer,
        primary: token.colorPrimary,
        ink: token.colorText,
        font: token.fontFamily,
        height: token.controlHeight,
        motion: token.motion,
      })}
    </output>
  );
}
function tokens() {
  return JSON.parse(screen.getByTestId("tokens").textContent!);
}

describe("brand-first Ant foundation", () => {
  it("uses the v1 Olive, neutral surfaces and Compact default", () => {
    const { container } = render(
      <KooyaProvider>
        <TokenProbe />
      </KooyaProvider>,
    );
    expect(container.firstElementChild).toHaveAttribute("data-theme", "olive");
    expect(tokens()).toMatchObject({
      canvas: "#F6F7F8",
      ink: "#20262D",
      primary: "#45583D",
      height: 36,
    });
    expect(tokens().font).toContain("DM Sans");
    expect(resolveThemeScheme().canvas).toBe("#F6F7F8");
    expect(themeVariables()["--ku-font-display"]).toContain("Syncopate");
    expect(antTheme().token?.colorPrimary).toBe("#45583D");
  });

  it("updates actual Ant controls to charcoal dark, compact density and reduced motion", () => {
    const { container, rerender } = render(
      <KooyaProvider>
        <TokenProbe />
        <Button type="primary">Continue</Button>
      </KooyaProvider>,
    );
    rerender(
      <KooyaProvider mode="dark" density="compact" reducedMotion>
        <TokenProbe />
        <Button type="primary">Continue</Button>
      </KooyaProvider>,
    );
    expect(tokens()).toMatchObject({
      canvas: "#15191D",
      surface: "#1D2329",
      ink: "#EDF1F5",
      primary: "#939e8e",
      height: 36,
      motion: false,
    });
    expect(container.firstElementChild).toHaveAttribute(
      "data-reduced-motion",
      "true",
    );
    expect(screen.getByRole("button", { name: "Continue" })).toHaveClass(
      "ant-btn-primary",
    );
  });

  it("provides legible semantic roles and selected indicator pairs in both brand modes", () => {
    for (const mode of ["light", "dark"] as const) {
      const scheme = resolveThemeScheme("signature", mode);
      expect(scheme).toHaveProperty(
        "info",
        mode === "light" ? "#1d46d9" : "#9fb1ff",
      );
      for (const role of [
        "ink",
        "muted",
        "focus",
        "success",
        "warning",
        "danger",
        "info",
      ] as const)
        expect(
          contrastRatio(scheme[role], scheme.surface),
          `${mode} ${role}`,
        ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(scheme.accentInk, scheme.accent),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(scheme.highlightInk, scheme.highlight),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        antTheme("signature", { mode }).components?.Tabs?.itemSelectedColor,
      ).toBe(scheme.focus);
      expect(
        antTheme("signature", { mode }).components?.Menu?.itemSelectedColor,
      ).toBe(scheme.focus);
      expect(
        antTheme("signature", { mode }).components?.Menu
          ?.horizontalItemSelectedColor,
      ).toBe(scheme.focus);
    }
  });

  it("qualifies danger actions and tooltip text independently from lime primary text", () => {
    for (const mode of ["light", "dark"] as const) {
      const scheme = resolveThemeScheme("signature", mode);
      const config = antTheme("signature", { mode });
      const dangerInk = config.components?.Button?.dangerColor;
      expect(dangerInk).toBeDefined();
      expect(
        contrastRatio(String(dangerInk), scheme.danger),
      ).toBeGreaterThanOrEqual(4.5);
      expect(config.components?.Tooltip?.colorBgSpotlight).toBe(scheme.surface);
      expect(config.components?.Tooltip?.colorTextLightSolid).toBe(scheme.ink);
    }
  });

  it("publishes the canonical component entry with separate declarations and runtime", () => {
    expect(
      (packageManifest.exports as Record<string, unknown>)["./components"],
    ).toEqual({
      types: "./dist/components/index.d.ts",
      import: "./dist/components.js",
    });
  });

  it("keeps Select, Modal and Drawer in the provider-owned overlay host", async () => {
    const { container, rerender } = render(
      <KooyaProvider mode="dark">
        <Select
          aria-label="Location"
          open
          options={[{ value: "local", label: "Local office" }]}
        />
        <Modal open title="Local modal" footer={null}>
          Modal detail
        </Modal>
        <Drawer open title="Local drawer">
          Drawer detail
        </Drawer>
      </KooyaProvider>,
    );
    const root = document.querySelector(".ku-overlay-host") as HTMLElement;
    expect(await screen.findByText("Local office")).toBeInTheDocument();
    expect(root).toContainElement(screen.getByText("Local office"));
    for (const text of ["Modal detail", "Drawer detail"])
      expect(root).toContainElement(await screen.findByText(text));
    rerender(
      <KooyaProvider>
        <Select
          aria-label="Location"
          open
          options={[{ value: "local", label: "Local office" }]}
        />
        <Modal open title="Local modal" footer={null}>
          Modal detail
        </Modal>
        <Drawer open title="Local drawer">
          Drawer detail
        </Drawer>
      </KooyaProvider>,
    );
    expect(root).toHaveAttribute("data-mode", "light");
    expect(root).toHaveStyle({ "--ku-canvas": "#F6F7F8" });
  });

  it("scopes contextual message, notification and modal feedback to the current provider", async () => {
    function Feedback() {
      const { message, notification, modal } = useKooyaFeedback();
      return (
        <>
          <Button onClick={() => message.success("Local message")}>
            Message
          </Button>
          <Button
            onClick={() =>
              notification.success({ title: "Local notification" })
            }
          >
            Notification
          </Button>
          <Button
            onClick={() => modal.confirm({ title: "Local confirmation" })}
          >
            Confirm
          </Button>
        </>
      );
    }
    const { container } = render(
      <KooyaProvider mode="dark" reducedMotion>
        <Feedback />
      </KooyaProvider>,
    );
    const user = userEvent.setup();
    for (const [button, text] of [
      ["Message", "Local message"],
      ["Notification", "Local notification"],
      ["Confirm", "Local confirmation"],
    ]) {
      await user.click(screen.getByRole("button", { name: button }));
      for (const element of await screen.findAllByText(text))
        expect(document.querySelector(".ku-overlay-host")).toContainElement(
          element,
        );
    }
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Cancel",
      }),
    );
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("responds to the system reduced-motion setting and supports an explicit override", async () => {
    let listener: (() => void) | undefined;
    const query = {
      matches: true,
      addEventListener: (_event: string, callback: () => void) => {
        listener = callback;
      },
      removeEventListener: vi.fn(),
    };
    const media = vi
      .spyOn(window, "matchMedia")
      .mockReturnValue(query as unknown as MediaQueryList);
    try {
      const { rerender, unmount } = render(
        <KooyaProvider>
          <TokenProbe />
        </KooyaProvider>,
      );
      expect(tokens().motion).toBe(false);
      query.matches = false;
      act(() => listener?.());
      expect(tokens().motion).toBe(true);
      rerender(
        <KooyaProvider reducedMotion>
          <TokenProbe />
        </KooyaProvider>,
      );
      expect(tokens().motion).toBe(false);
      unmount();
      expect(query.removeEventListener).toHaveBeenCalledWith(
        "change",
        listener,
      );
    } finally {
      media.mockRestore();
    }
  });
});
