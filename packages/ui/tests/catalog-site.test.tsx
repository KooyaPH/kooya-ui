import { describe, expect, it } from "vitest";
import {
  parseRoute,
  filterCatalog,
  isPreviewSettings,
  catalogHref,
} from "../../../apps/playground/src/site/model";
import type { CatalogEntry } from "../../../apps/playground/src/registry/types";
const entries = [
  {
    id: "button",
    kind: "components",
    title: "Button",
    description: "Trigger an action",
    tags: ["submit"],
    variants: [
      {
        id: "button-icon",
        title: "Icon button",
        description: "An icon action",
      },
    ],
  },
  {
    id: "table",
    kind: "components",
    title: "Table",
    description: "Data rows",
    tags: ["data"],
    variants: [],
  },
] as CatalogEntry[];
describe("catalog navigation", () => {
  it("resolves category and example links and preserves query state", () => {
    expect(parseRoute("#/components/button/button-icon?q=icon")).toEqual({
      page: "collection",
      kind: "components",
      id: "button",
      variantId: "button-icon",
      query: "icon",
    });
    expect(parseRoute("#/preview/button-icon")).toEqual({
      page: "preview",
      variantId: "button-icon",
    });
    expect(parseRoute("#/unknown")).toEqual({ page: "missing" });
    expect(parseRoute("#/%broken")).toEqual({ page: "missing" });
    expect(catalogHref("components", "button", "button-icon")).toBe(
      "#/components/button/button-icon",
    );
  });
  it("searches category metadata and real example titles with whitespace normalization", () => {
    expect(filterCatalog(entries, " ICON ")).toEqual([entries[0]]);
    expect(filterCatalog(entries, "submit")).toEqual([entries[0]]);
    expect(filterCatalog(entries, "missing")).toEqual([]);
    expect(filterCatalog(entries, " ")).toEqual(entries);
  });
  it("validates preview settings before accepting a parent message", () => {
    expect(
      isPreviewSettings({
        type: "kooya-preview-settings",
        mode: "dark",
        density: "compact",
      }),
    ).toBe(true);
    expect(
      isPreviewSettings({
        type: "kooya-preview-settings",
        mode: "purple",
        density: "compact",
      }),
    ).toBe(false);
    expect(
      isPreviewSettings({
        type: "other",
        mode: "light",
        density: "comfortable",
      }),
    ).toBe(false);
    expect(isPreviewSettings(null)).toBe(false);
  });
});

import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KooyaProvider } from "@kooyaph/ui";
import { CatalogPage, CategoryCard } from "../../../apps/playground/src/site/CatalogPages";
import {
  LiveFrame,
  PreviewRoute,
} from "../../../apps/playground/src/site/Preview";
import type { CatalogVariant } from "../../../apps/playground/src/registry/types";
import { vi } from "vitest";

it("filters the real catalog and resets to the full index without invented counts", async () => {
  render(
    <KooyaProvider>
      <CatalogPage
        route={{ page: "collection", kind: "components", query: "" }}
        appearance={{ mode: "light", density: "comfortable" }}
      />
    </KooyaProvider>,
  );
  const originalCount = screen.getByRole("status").textContent;
  await userEvent.type(
    screen.getByRole("searchbox", { name: "Search collection" }),
    "no-such-example-zzzz",
  );
  expect(screen.getByRole("status")).toHaveTextContent("0 categories");
  expect(
    screen.getByText("No matches. Try a different search."),
  ).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Reset filters" }));
  expect(screen.getByRole("status").textContent).toBe(originalCount);
  expect(screen.getByRole("link", { name: /Browse Button,/ })).toHaveAttribute(
    "href",
    "#/components/button",
  );
});

it("updates iframe appearance by message without changing the document URL", () => {
  const variant = {
    id: "test-preview",
    title: "Test",
    previewHeight: 300,
  } as CatalogVariant;
  const { rerender } = render(
    <LiveFrame
      variant={variant}
      appearance={{ mode: "light", density: "comfortable" }}
    />,
  );
  const frame = screen.getByTitle("Test preview") as HTMLIFrameElement;
  const initialUrl = frame.getAttribute("src");
  const post = vi.spyOn(frame.contentWindow!, "postMessage");
  rerender(
    <LiveFrame
      variant={variant}
      appearance={{ mode: "dark", density: "compact" }}
    />,
  );
  expect(frame.getAttribute("src")).toBe(initialUrl);
  expect(post).toHaveBeenCalledWith(
    { type: "kooya-preview-settings", mode: "dark", density: "compact" },
    location.origin,
  );
});

it("rejects spoofed iframe settings and accepts only the same-origin parent", () => {
  const { container } = render(<PreviewRoute variantId="missing-preview" />);
  const provider = container.querySelector(".preview-root")!;
  fireEvent(
    window,
    new MessageEvent("message", {
      origin: "https://untrusted.example",
      source: window.parent,
      data: {
        type: "kooya-preview-settings",
        mode: "dark",
        density: "compact",
      },
    }),
  );
  expect(provider).toHaveAttribute("data-mode", "light");
  fireEvent(
    window,
    new MessageEvent("message", {
      origin: location.origin,
      source: null,
      data: {
        type: "kooya-preview-settings",
        mode: "dark",
        density: "compact",
      },
    }),
  );
  expect(provider).toHaveAttribute("data-mode", "light");
  fireEvent(
    window,
    new MessageEvent("message", {
      origin: location.origin,
      source: window.parent,
      data: {
        type: "kooya-preview-settings",
        mode: "dark",
        density: "compact",
      },
    }),
  );
  expect(provider).toHaveAttribute("data-mode", "dark");
  expect(provider).toHaveAttribute("data-density", "compact");
});

import { VariantCard } from "../../../apps/playground/src/site/Preview";
it("switches real iframe viewport widths and exposes source only when Code is opened", async () => {
  const loadCode = vi.fn(
    async () =>
      "import { Button } from '@kooyaph/ui/components';\nexport default () => <Button>Continue</Button>;",
  );
  const variant = {
    id: "viewport-test",
    title: "Viewport demo",
    description: "A control example",
    previewHeight: 280,
    loadCode,
  } as CatalogVariant;
  render(
    <KooyaProvider>
      <VariantCard
        variant={variant}
        appearance={{ mode: "light", density: "comfortable" }}
        href="#/components/button/viewport-test"
      />
    </KooyaProvider>,
  );
  expect(loadCode).not.toHaveBeenCalled();
  await userEvent.click(screen.getByText("Phone"));
  expect(screen.getByTitle("Viewport demo preview")).toHaveStyle({
    width: "390px",
  });
  await userEvent.click(screen.getByText("Tablet"));
  expect(screen.getByTitle("Viewport demo preview")).toHaveStyle({
    width: "768px",
  });
  expect(
    screen.getByRole("link", { name: "Open Viewport demo fullscreen" }),
  ).toHaveAttribute(
    "href",
    "?mode=light&density=comfortable#/preview/viewport-test",
  );
  await userEvent.click(screen.getByRole("tab", { name: "Code" }));
  expect(
    await screen.findByText(
      /import \{ Button \} from '@kooyaph\/ui\/components'/,
    ),
  ).toBeInTheDocument();
});

it("reports a preview that never becomes ready and retries the real document", () => {
  vi.useFakeTimers();
  try {
    const variant = { id: "test-preview", title: "Test", previewHeight: 300 } as CatalogVariant;
    render(<KooyaProvider><LiveFrame variant={variant} appearance={{ mode: "light", density: "comfortable" }} /></KooyaProvider>);
    const first = screen.getByTitle("Test preview") as HTMLIFrameElement;
    expect(screen.getByRole("status")).toHaveTextContent("Loading preview");
    expect(first).not.toBeVisible();
    act(() => vi.advanceTimersByTime(15000));
    expect(screen.getByText("Preview could not be loaded")).toBeInTheDocument();
    expect(first).not.toBeVisible();
    const retryButton = screen.getByRole("button", { name: "Retry preview" });
    retryButton.focus();
    fireEvent.click(retryButton);
    expect(screen.getByRole("region", { name: "Test preview area" })).toHaveFocus();
    const retry = screen.getByTitle("Test preview") as HTMLIFrameElement;
    expect(retry).not.toBe(first);
    expect(retry).toHaveAttribute("src", first.getAttribute("src"));
    fireEvent(window, new MessageEvent("message", { source: first.contentWindow, origin: location.origin, data: { type: "kooya-preview-ready", variantId: variant.id } }));
    act(() => vi.advanceTimersByTime(15000));
    expect(screen.getByText("Preview could not be loaded")).toBeInTheDocument();
  } finally { vi.useRealTimers(); }
});

it("accepts readiness only from the actual same-origin preview document", () => {
  vi.useFakeTimers();
  try {
    const variant = { id: "test-preview", title: "Test", previewHeight: 300 } as CatalogVariant;
    render(<LiveFrame variant={variant} appearance={{ mode: "light", density: "comfortable" }} />);
    const frame = screen.getByTitle("Test preview") as HTMLIFrameElement;
    fireEvent(window, new MessageEvent("message", { source: frame.contentWindow, origin: location.origin, data: { type: "kooya-preview-ready", variantId: variant.id } }));
    act(() => vi.advanceTimersByTime(20000));
    expect(screen.queryByText("Preview could not be loaded")).not.toBeInTheDocument();
    expect(frame).toBeVisible();
  } finally { vi.useRealTimers(); }
});

it("places actionable thumbnail recovery outside the decorative category link", () => {
  vi.useFakeTimers();
  try {
    const entry = { ...entries[0], variants: [{ id: "test-preview", title: "Test", previewHeight: 300 }] } as CatalogEntry;
    render(<KooyaProvider><CategoryCard entry={entry} appearance={{ mode: "light", density: "comfortable" }} /></KooyaProvider>);
    const first = screen.getByTitle("Test preview") as HTMLIFrameElement;
    act(() => vi.advanceTimersByTime(15000));
    const retry = screen.getByRole("button", { name: "Retry Button preview" });
    expect(retry.closest("a")).toBeNull();
    expect(retry.closest('[aria-hidden="true"]')).toBeNull();
    expect(screen.getByRole("link", { name: "Browse Button, 1 example" })).toBeInTheDocument();
    retry.focus();
    fireEvent.click(retry);
    expect(screen.getByRole("link", { name: "Browse Button, 1 example" })).toHaveFocus();
    expect(screen.getByTitle("Test preview")).not.toBe(first);
    expect(screen.queryByRole("button", { name: "Retry Button preview" })).not.toBeInTheDocument();
  } finally { vi.useRealTimers(); }
});

it.each(['/audit.html','/kooya/audit.html','/index.html','/kooya/index.html'])('loads the real sibling Site preview when embedded at %s', path => {
  const before=location.href;
  try {
    history.replaceState({},'',path+'?item=landing-review');
    const variant={id:'test-preview',title:'Test',previewHeight:300} as CatalogVariant;
    render(<LiveFrame variant={variant} appearance={{mode:'dark',density:'compact'}} />);
    const frame=screen.getByTitle('Test preview');
    const url=new URL(frame.getAttribute('src')!,location.href);
    expect(url.pathname).toBe(path.slice(0,path.lastIndexOf('/')+1));
    expect(url.searchParams.get('mode')).toBe('dark');
    expect(url.searchParams.get('density')).toBe('compact');
    expect(url.hash).toBe('#/preview/test-preview');
  }finally{history.replaceState({},'',before);}
});
