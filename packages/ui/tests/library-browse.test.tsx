import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KooyaProvider } from "../src";
import { LibraryPages } from "../../../apps/playground/src/LibrarySite";
import { ComponentDocs } from "../../../apps/playground/src/ComponentDocs";

it("opens a useful library overview without sample workspace navigation", () => {
  render(
    <KooyaProvider>
      <LibraryPages route="overview" onNavigate={() => {}} />
    </KooyaProvider>,
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "One shared rhythm",
  );
  expect(
    screen.getByRole("link", { name: /Explore components/ }),
  ).toHaveAttribute("href", "#/components/button");
  expect(
    screen.queryByRole("navigation", { name: "Workspace areas" }),
  ).not.toBeInTheDocument();
});
it("filters categorized components with a meaningful empty state", async () => {
  render(
    <KooyaProvider>
      <LibraryPages route="components" onNavigate={() => {}} />
    </KooyaProvider>,
  );
  await userEvent.type(
    screen.getByRole("searchbox", { name: "Find a component" }),
    "no-such-component",
  );
  expect(screen.getByRole("status")).toHaveTextContent("No components found");
  await userEvent.clear(
    screen.getByRole("searchbox", { name: "Find a component" }),
  );
  await userEvent.type(
    screen.getByRole("searchbox", { name: "Find a component" }),
    "checkbox",
  );
  expect(
    screen.getByRole("navigation", { name: "Component categories" }),
  ).toHaveTextContent("Checkbox & radio");
});
it("offers all 17 template routes and filters without replacing live examples", async () => {
  render(
    <KooyaProvider>
      <LibraryPages route="templates" onNavigate={() => {}} />
    </KooyaProvider>,
  );
  expect(screen.getAllByRole("link", { name: /Open example/ })).toHaveLength(
    17,
  );
  await userEvent.type(
    screen.getByRole("searchbox", { name: "Find a template" }),
    "wizard",
  );
  expect(screen.getAllByRole("link", { name: /Open example/ })).toHaveLength(1);
  expect(screen.getByRole("link", { name: /Wizards/ })).toHaveAttribute(
    "href",
    "#/templates/wizard",
  );
});
it("focused action example changes local state and exposes actual public usage code", async () => {
  render(
    <KooyaProvider>
      <ComponentDocs id="button" />
    </KooyaProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Create sample" }));
  expect(screen.getByRole("status")).toHaveTextContent(
    "1 samples created locally",
  );
  await userEvent.click(screen.getByRole("tab", { name: "Code" }));
  expect(screen.getByRole("tabpanel", { name: "Code" })).toHaveTextContent(
    "from '@kooyaph/ui'",
  );
});

it.each(["constructor", "__proto__", "toString", "not-a-template"])(
  "keeps the template gallery usable for unregistered route %s",
  (family) => {
    render(
      <KooyaProvider>
        <LibraryPages route={`templates/${family}`} onNavigate={() => {}} />
      </KooyaProvider>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Template library" }),
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("Template not found");
    expect(screen.getAllByRole("link", { name: /Open example/ })).toHaveLength(
      17,
    );
    expect(
      screen.getByRole("link", { name: /Dashboard Open example/ }),
    ).toHaveAttribute("href", "#/templates/dashboard");
    expect(
      screen.queryByRole("region", { name: "Live template example" }),
    ).not.toBeInTheDocument();
  },
);
it("renders a registered direct template with live state controls", () => {
  render(
    <KooyaProvider>
      <LibraryPages route="templates/dashboard" onNavigate={() => {}} />
    </KooyaProvider>,
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "Dashboard" }),
  ).toBeVisible();
  expect(
    screen.getByRole("region", { name: "Live template example" }),
  ).toBeVisible();
  expect(screen.getByRole("combobox", { name: "Example state" })).toBeVisible();
  expect(screen.getByRole("link", { name: "← All templates" })).toHaveAttribute(
    "href",
    "#/templates",
  );
});
