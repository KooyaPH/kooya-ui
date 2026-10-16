import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KooyaProvider } from "@kooyaph/ui/foundations";
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
} from "../../../apps/playground/src/reui/adapters/autocomplete";
describe("REUI native autocomplete", () => {
  it("uses actual Ant AutoComplete with original render-function items", () => {
    const { container } = render(
      <KooyaProvider>
        <Autocomplete items={[{ id: "one", value: "Fictional option" }]}>
          <AutocompleteInput aria-label="Feature" />
          <AutocompleteContent>
            <AutocompleteEmpty>Nothing found</AutocompleteEmpty>
            <AutocompleteList>
              {(item: { id: string; value: string }) => (
                <AutocompleteItem value={item.value}>
                  {item.value}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </KooyaProvider>,
    );
    expect(
      screen.getByRole("combobox", { name: "Feature" }),
    ).toBeInTheDocument();
    expect(container.querySelector(".ant-select")).toBeInTheDocument();
  });
});

it("filters render-function object options, commits display text and clears a controlled field", async () => {
  const { default: userEvent } = await import("@testing-library/user-event");
  const { useState } = await import("react");
  const Bridge = await import(
    "../../../apps/playground/src/reui/adapters/autocomplete"
  );
  function Fixture() {
    const [value, setValue] = useState("");
    return (
      <KooyaProvider reducedMotion>
        <Bridge.Autocomplete
          value={value}
          onValueChange={setValue}
          items={[
            { name: "Morgan", id: "m" },
            { name: "Taylor", id: "t" },
          ]}
          itemToStringValue={(item) => item.name}
        >
          <Bridge.AutocompleteInput aria-label="Person" showClear showTrigger />
          <Bridge.AutocompleteContent>
            <Bridge.AutocompleteEmpty>No people found</Bridge.AutocompleteEmpty>
            <Bridge.AutocompleteList>
              {(item: { name: string }) => (
                <Bridge.AutocompleteItem value={item}>
                  {item.name}
                </Bridge.AutocompleteItem>
              )}
            </Bridge.AutocompleteList>
          </Bridge.AutocompleteContent>
        </Bridge.Autocomplete>
        <output aria-label="Chosen person">{value}</output>
      </KooyaProvider>
    );
  }
  render(<Fixture />);
  const user = userEvent.setup();
  await user.type(screen.getByRole("combobox", { name: "Person" }), "Mor");
  await user.click(
    await screen.findByText("Morgan", {
      selector: "[data-slot=autocomplete-item]",
    }),
  );
  expect(screen.getByRole("combobox", { name: "Person" })).toHaveValue(
    "Morgan",
  );
  expect(screen.getByLabelText("Chosen person")).toHaveTextContent("Morgan");
  await user.clear(screen.getByRole("combobox", { name: "Person" }));
  await user.type(screen.getByRole("combobox", { name: "Person" }), "none");
  expect(await screen.findByText("No people found")).toBeInTheDocument();
});

it("preserves grouped collections and async status when no option is available", async () => {
  const Bridge = await import(
    "../../../apps/playground/src/reui/adapters/autocomplete"
  );
  const groups = [{ group: "Team", items: [{ name: "Morgan" }] }];
  const { rerender } = render(
    <KooyaProvider reducedMotion>
      <Bridge.Autocomplete
        items={groups}
        itemToStringValue={(item: any) => item.name}
        open
        filter={null}
      >
        <Bridge.AutocompleteInput aria-label="Team member" />
        <Bridge.AutocompleteContent>
          <Bridge.AutocompleteList>
            {(group: (typeof groups)[number]) => (
              <Bridge.AutocompleteGroup items={group.items}>
                <Bridge.AutocompleteGroupLabel>
                  {group.group}
                </Bridge.AutocompleteGroupLabel>
                <Bridge.AutocompleteCollection>
                  {(item: { name: string }) => (
                    <Bridge.AutocompleteItem value={item}>
                      {item.name}
                    </Bridge.AutocompleteItem>
                  )}
                </Bridge.AutocompleteCollection>
              </Bridge.AutocompleteGroup>
            )}
          </Bridge.AutocompleteList>
        </Bridge.AutocompleteContent>
      </Bridge.Autocomplete>
    </KooyaProvider>,
  );
  expect(await screen.findByText("Team")).toBeInTheDocument();
  expect(await screen.findByText("Morgan")).toBeInTheDocument();
  rerender(
    <KooyaProvider reducedMotion>
      <Bridge.Autocomplete items={[]} open filter={null}>
        <Bridge.AutocompleteInput aria-label="Team member" />
        <Bridge.AutocompleteContent>
          <Bridge.AutocompleteStatus>
            Searching locally...
          </Bridge.AutocompleteStatus>
          <Bridge.AutocompleteList>
            {(item: string) => (
              <Bridge.AutocompleteItem value={item}>
                {item}
              </Bridge.AutocompleteItem>
            )}
          </Bridge.AutocompleteList>
        </Bridge.AutocompleteContent>
      </Bridge.Autocomplete>
    </KooyaProvider>,
  );
  expect(await screen.findByRole("status")).toHaveTextContent(
    "Searching locally...",
  );
});
