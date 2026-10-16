import { expect, it, vi } from "vitest";
import { act } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { KooyaProvider } from "../src/foundations/theme";
import { SwimlaneBoard, Swimlane } from "../src/compositions/swimlane";
it("hydrates a public provider and stable disclosure ids without replacing server content", async () => {
  const doc = document;
  const tree = (
    <KooyaProvider palette="olive">
      <SwimlaneBoard label="Work">
        <Swimlane label="Editorial" onToggle={() => {}}>
          <p>Known content</p>
        </Swimlane>
      </SwimlaneBoard>
    </KooyaProvider>
  );
  let html = "";
  vi.stubGlobal("document", undefined);
  try {
    html = renderToString(tree);
  } finally {
    vi.stubGlobal("document", doc);
  }
  const container = doc.createElement("div");
  container.innerHTML = html;
  doc.body.append(container);
  const paragraph = container.querySelector("p:last-child");
  const errors: unknown[] = [];
  let root: ReturnType<typeof hydrateRoot>;
  await act(async () => {
    root = hydrateRoot(container, tree, {
      onRecoverableError: (error) => errors.push(error),
    });
  });
  expect(errors).toEqual([]);
  expect(container.querySelector("p:last-child")).toBe(paragraph);
  await act(async () => root!.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
