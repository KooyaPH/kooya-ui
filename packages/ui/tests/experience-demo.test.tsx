// @vitest-environment jsdom
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KooyaProvider } from "../src";
import {
  ExperiencePage,
  ExperienceProvider,
} from "../../../apps/playground/src/examples/experience";
it("standalone Storybook experience tabs activate without an application router", async () => {
  render(
    <KooyaProvider>
      <ExperienceProvider>
        <ExperiencePage selected="loading" />
      </ExperienceProvider>
    </KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("tab", { name: "Warm cache" }));
  expect(
    screen.getByRole("button", { name: "Invalidate brief" }),
  ).toBeVisible();
});
it("cold loading example renders a card skeleton", () => {
  render(
    <KooyaProvider>
      <ExperienceProvider>
        <ExperiencePage selected="loading" />
      </ExperienceProvider>
    </KooyaProvider>,
  );
  expect(
    document.querySelector('[aria-busy="true"] [data-skeleton="card"]'),
  ).not.toBeNull();
});
it("loading recovery example shows safe public code and its simulated HTTP status", async () => {
  render(
    <KooyaProvider>
      <ExperienceProvider>
        <ExperiencePage selected="loading" />
      </ExperienceProvider>
    </KooyaProvider>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Simulate read failure" }),
  );
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("UI code: UI_DEMO_FAILED");
  expect(alert).toHaveTextContent("UI_DEMO_FAILED");
  expect(alert).toHaveTextContent("HTTP 503");
  expect(alert).not.toHaveTextContent("FICTIONAL_READ_FAILED");
});
