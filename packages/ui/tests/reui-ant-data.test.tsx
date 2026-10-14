import React from "react";
import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KooyaProvider } from "../src";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../../../apps/playground/src/reui/adapters/data";
import {
  NumberField,
  NumberFieldScrubArea,
  NumberFieldInput,
  Rating,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  ResizablePanelGroup,
  ResizablePanel,
} from "../../../apps/playground/src/reui/adapters/utility";
it("renders a source table through actual Ant while retaining caption and row actions", async () => {
  let selected = false;
  render(
    <KooyaProvider>
      <Table>
        <TableCaption>Project records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Studio</TableCell>
            <TableCell>
              <button onClick={() => (selected = true)}>Choose Studio</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </KooyaProvider>,
  );
  expect(
    screen
      .getByRole("table", { name: "Project records" })
      .closest(".ant-table"),
  ).toBeTruthy();
  await userEvent.click(screen.getByRole("button", { name: "Choose Studio" }));
  expect(selected).toBe(true);
});
it("uses Ant InputNumber with a source label, constraints and controlled change", async () => {
  function Demo() {
    const [value, setValue] = React.useState<number | null>(5);
    return (
      <>
        <NumberField value={value} onValueChange={setValue} min={0} max={10}>
          <NumberFieldScrubArea label="Amount" />
          <NumberFieldInput />
        </NumberField>
        <output>{value}</output>
      </>
    );
  }
  render(
    <KooyaProvider>
      <Demo />
    </KooyaProvider>,
  );
  const field = screen.getByRole("spinbutton", { name: "Amount" });
  expect(field.closest(".ant-input-number")).toBeTruthy();
  await userEvent.clear(field);
  await userEvent.type(field, "8");
  expect(screen.getByRole("status")).toHaveTextContent("8");
});
it("keeps source pagination interactive through actual Ant pages", async () => {
  render(
    <KooyaProvider>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </KooyaProvider>,
  );
  const page = screen.getByTitle("3");
  await userEvent.click(page);
  expect(page).toHaveClass("ant-pagination-item-active");
});
it("uses actual Ant rate and splitter with source content retained", () => {
  render(
    <KooyaProvider>
      <Rating rating={4} showValue />
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={40}>Sidebar</ResizablePanel>
        <ResizablePanel>Main area</ResizablePanel>
      </ResizablePanelGroup>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Workspace</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    </KooyaProvider>,
  );
  expect(screen.getByText("Sidebar").closest(".ant-splitter")).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Home" }).closest(".ant-breadcrumb"),
  ).toBeTruthy();
  expect(screen.getByText("4")).toBeVisible();
});
it("retains body cells in headerless Ant tables", () => {
  render(
    <KooyaProvider>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Employee details</TableCell>
            <TableCell>Engineering</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </KooyaProvider>,
  );
  expect(
    screen.getByText("Employee details").closest(".ant-table"),
  ).toBeTruthy();
  expect(screen.getByRole("table").querySelector("thead")).toBeNull();
});
it("retains and updates pagination summary and first/last controls", async () => {
  render(
    <KooyaProvider>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <span>Page 1 of 10</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink aria-label="Go to first page" />
            <PaginationLink aria-label="Go to last page" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </KooyaProvider>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Go to last page" }),
  );
  expect(screen.getByText("Page 10 of 10")).toBeVisible();
  await userEvent.click(
    screen.getByRole("button", { name: "Go to first page" }),
  );
  expect(screen.getByText("Page 1 of 10")).toBeVisible();
});
it("preserves a minified native-select recipe through real Ant page selection", async () => {
  const a = Object.assign(
    (props: React.PropsWithChildren) => <div>{props.children}</div>,
    { recipeRole: "NativeSelect" },
  );
  render(
    <KooyaProvider>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {React.createElement(
              a,
              { defaultValue: "1" } as React.PropsWithChildren,
              Array.from({ length: 10 }, (_, index) => (
                <option key={index} value={String(index + 1)}>
                  Page {index + 1}
                </option>
              )),
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink aria-label="Go to last page" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </KooyaProvider>,
  );
  const selector = screen.getByRole("combobox", { name: "Page" });
  expect(selector.closest(".ant-select")).toBeTruthy();
  await userEvent.click(selector);
  const option = screen
    .getAllByText("Page 4")
    .find((node) => node.closest(".ant-select-item-option"));
  await userEvent.click(option!);
  expect(screen.getByTitle("4")).toHaveClass("ant-pagination-item-active");
  await userEvent.click(
    screen.getByRole("button", { name: "Go to last page" }),
  );
  expect(screen.getByTitle("10")).toHaveClass("ant-pagination-item-active");
});
it("uses the explicit row count without inventing an extra pagination page", async () => {
  const a = Object.assign(
    (props: React.PropsWithChildren) => <div>{props.children}</div>,
    { recipeRole: "NativeSelect" },
  );
  render(
    <KooyaProvider>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {React.createElement(
              a,
              { defaultValue: "25" } as React.PropsWithChildren,
              <option value="25">25</option>,
            )}
          </PaginationItem>
          <PaginationItem>
            <span>1-25 of 100</span>
            <PaginationLink aria-label="Go to last page" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </KooyaProvider>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Go to last page" }),
  );
  expect(screen.getByText("76-100 of 100")).toBeVisible();
  expect(screen.queryByTitle("5")).toBeNull();
});
