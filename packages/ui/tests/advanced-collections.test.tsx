import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { KooyaProvider } from "../src/foundations";
import ChartDemo, {
  chartData,
} from "../../../apps/playground/src/site/collections/advanced/charts";
import EditorDemo from "../../../apps/playground/src/site/collections/advanced/editor";
import AssistantDemo from "../../../apps/playground/src/site/collections/advanced/assistant";
import { advancedCompositionEntries } from "../../../apps/playground/src/registry/advanced-compositions";
// Canvas rendering is qualified in the browser. Keep real controls and editor here.
vi.mock("../../../apps/playground/node_modules/@ant-design/charts", () => ({
  Area: () => <div />,
  Bar: () => <div />,
  Line: () => <div />,
  Pie: () => <div />,
  DualAxes: () => <div />,
  Gauge: () => <div />,
}));
afterEach(cleanup);
describe("advanced collections", () => {
  it("registers two lazy configurations with truthful local source paths for each engine", async () => {
    expect(advancedCompositionEntries).toHaveLength(12);
    expect(
      new Set(advancedCompositionEntries.map((entry) => entry.id)).size,
    ).toBe(12);
    expect(
      new Set(
        advancedCompositionEntries.flatMap((entry) =>
          entry.variants.map((variant) => variant.id),
        ),
      ).size,
    ).toBe(24);
    for (const entry of advancedCompositionEntries) {
      expect(entry.importPath).toContain(
        "apps/playground/src/site/collections/advanced/",
      );
      expect(entry.variants.map((variant) => variant.id)).toEqual([
        `${entry.id}-standard`,
        `${entry.id}-alternate`,
      ]);
      const code = await entry.variants[1].loadCode();
      expect(code).toContain("alternate={true}");
      expect(code).toContain("@kooyaph/ui/components");
    }
  });
  it("shows status labels and exact numbers instead of relying on chart colors", () => {
    render(
      <KooyaProvider>
        <ChartDemo kind="status" />
      </KooyaProvider>,
    );
    expect(screen.getByText("Delayed")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(chartData("month")[0].value).toBe(96);
    expect(chartData("week", true)[0].value).toBe(36);
  });
  it("saves the actual Tiptap document as inspectable local HTML", () => {
    render(
      <KooyaProvider>
        <EditorDemo />
      </KooyaProvider>,
    );
    expect(
      screen.getByRole("textbox", { name: "Document content" }),
    ).toHaveTextContent("Welcome to the workspace");
    fireEvent.click(screen.getByRole("button", { name: "Save locally" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Saved in this preview",
    );
    expect(
      screen.getByText(/<h2>Welcome to the workspace/),
    ).toBeInTheDocument();
  });
  it("submits an actual Ant X sender prompt and clears the local conversation", () => {
    render(
      <KooyaProvider>
        <AssistantDemo />
      </KooyaProvider>,
    );
    const input = screen.getByPlaceholderText("Write a prompt…");
    fireEvent.change(input, { target: { value: "Plan a review" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", keyCode: 13 });
    expect(
      screen.getByText(/Local demonstration: I received/),
    ).toHaveTextContent("Plan a review");
    fireEvent.click(screen.getByRole("button", { name: "New conversation" }));
    expect(
      screen.getByRole("log", { name: "Conversation" }),
    ).toBeEmptyDOMElement();
  });
});

it("resumes an alternate assistant conversation with usable prompt history", () => {
  render(
    <KooyaProvider>
      <AssistantDemo alternate />
    </KooyaProvider>,
  );
  expect(screen.getByRole("log", { name: "Conversation" })).toHaveTextContent(
    "Draft a launch checklist",
  );
  expect(
    screen.getByRole("combobox", { name: "Prompt history" }),
  ).not.toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "New conversation" }));
  expect(
    screen.getByRole("log", { name: "Conversation" }),
  ).toBeEmptyDOMElement();
});
