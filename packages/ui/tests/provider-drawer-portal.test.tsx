import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ConfigProvider, Drawer, Input } from "antd";
import { KooyaProvider } from "../src/foundations";
afterEach(cleanup);
for (const functional of [false, true]) {
  it(`preserves inherited ${functional ? "callback" : "object"} Drawer semantics in an external portal`, () => {
    const names = { root: "parent-drawer", body: "parent-body" };
    const styles = {
      root: { "--caller-color": "cyan" } as React.CSSProperties,
      body: { padding: 17 },
    };
    render(
      <ConfigProvider
        drawer={{
          closable: false,
          mask: false,
          classNames: functional ? () => names : names,
          styles: functional ? () => styles : styles,
        }}
      >
        <KooyaProvider reducedMotion>
          <Drawer
            open
            getContainer={() => document.body}
            classNames={{ root: "caller-drawer" }}
            styles={{ body: { scrollPaddingBlock: 8 } }}
          >
            <Input aria-label="External field" />
          </Drawer>
        </KooyaProvider>
      </ConfigProvider>,
    );
    const root = document.querySelector(".caller-drawer") as HTMLElement;
    expect(root).toHaveClass("parent-drawer", "ku-drawer-scope");
    expect(root.style.getPropertyValue("--caller-color")).toBe("cyan");
    expect(root.style.getPropertyValue("--ku-focus")).not.toBe("");
    const body = root.querySelector(".ant-drawer-body") as HTMLElement;
    expect(body).toHaveClass("parent-body");
    expect(body.style.padding).toBe("17px");
    expect(body.style.scrollPaddingBlock).toBe("8px");
    expect(root.querySelector(".ant-drawer-mask")).toBeNull();
    expect(root.querySelector(".ant-drawer-close")).toBeNull();
  });
}
it("keeps the inner Kooya theme in a nested external Drawer portal", () => {
  render(
    <KooyaProvider mode="light" reducedMotion>
      <KooyaProvider mode="dark" reducedMotion>
        <Drawer
          open
          getContainer={() => document.body}
          classNames={{ root: "nested-drawer" }}
        >
          <Input aria-label="Nested field" />
        </Drawer>
      </KooyaProvider>
    </KooyaProvider>,
  );
  const inner = document.querySelector(
    '.ku-root[data-mode="dark"]',
  ) as HTMLElement;
  const drawer = document.querySelector(".nested-drawer") as HTMLElement;
  for (const variable of ["--ku-ink", "--ku-focus", "--ku-surface"]) {
    expect(drawer.style.getPropertyValue(variable)).toBe(
      inner.style.getPropertyValue(variable),
    );
  }
});
it("keeps explicit inherited Drawer variables through nested Kooya providers", () => {
  render(
    <ConfigProvider
      drawer={{
        styles: { root: { "--ku-focus": "#ff00ff" } as React.CSSProperties },
      }}
    >
      <KooyaProvider mode="light" reducedMotion>
        <KooyaProvider mode="dark" reducedMotion>
          <Drawer
            open
            getContainer={() => document.body}
            classNames={{ root: "explicit-nested-drawer" }}
          >
            <Input aria-label="Custom field" />
          </Drawer>
        </KooyaProvider>
      </KooyaProvider>
    </ConfigProvider>,
  );
  expect(
    (
      document.querySelector(".explicit-nested-drawer") as HTMLElement
    ).style.getPropertyValue("--ku-focus"),
  ).toBe("#ff00ff");
});
