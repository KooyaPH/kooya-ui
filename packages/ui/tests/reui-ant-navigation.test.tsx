import React from "react";
import { it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KooyaProvider } from "../src";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  type CarouselApi,
} from "../../../apps/playground/src/reui/adapters/navigation";
it("advances actual Ant Carousel and informs source subscribers", async () => {
  let api: CarouselApi | undefined;
  let selected = -1;
  render(
    <KooyaProvider>
      <Carousel
        setApi={(value) => {
          api = value;
          value.on("select", () => (selected = value.selectedScrollSnap()));
        }}
      >
        <CarouselContent>
          <CarouselItem>First slide</CarouselItem>
          <CarouselItem>Second slide</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </KooyaProvider>,
  );
  expect(
    screen.getByRole("region").querySelector(".ant-carousel"),
  ).toBeTruthy();
  expect(api?.scrollSnapList()).toEqual([0, 1]);
  expect(screen.getByRole("button", { name: "Previous slide" })).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: "Next slide" }));
  await waitFor(() => expect(selected).toBe(1), { timeout: 3000 });
  expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Previous slide" })).toBeEnabled();
});
it("opens source details using native Ant Collapse keyboard handling", async () => {
  let opened = false;
  render(
    <KooyaProvider>
      <Collapsible onOpenChange={(value) => (opened = value)}>
        <CollapsibleTrigger>Project details</CollapsibleTrigger>
        <CollapsibleContent>Release notes</CollapsibleContent>
      </Collapsible>
    </KooyaProvider>,
  );
  const trigger = screen.getByRole("button", { name: "Project details" });
  trigger.focus();
  await userEvent.keyboard("{Enter}");
  expect(opened).toBe(true);
  expect(screen.getByText("Release notes")).toBeVisible();
  expect(trigger.closest(".ant-collapse")).toBeTruthy();
});
it("retains navigation link destinations and active-page semantics in Ant Menu", () => {
  render(
    <KooyaProvider>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#/docs" active>
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </KooyaProvider>,
  );
  const link = screen.getByRole("link", { name: "Documentation" });
  expect(link).toHaveAttribute("href", "#/docs");
  expect(link).toHaveAttribute("aria-current", "page");
  expect(link.closest(".ant-menu")).toBeTruthy();
});
it("changes native visible slides and source navigation bounds with the viewport", async () => {
  const previous = window.innerWidth;
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: 360,
    writable: true,
  });
  let api: CarouselApi | undefined;
  const mounted = render(
    <KooyaProvider>
      <Carousel setApi={(value) => (api = value)}>
        <CarouselContent>
          {Array.from({ length: 5 }, (_, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              Slide {index + 1}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </KooyaProvider>,
  );
  expect(mounted.container.querySelectorAll(".slick-active")).toHaveLength(1);
  expect(api?.scrollSnapList()).toHaveLength(5);
  api?.scrollTo(4);
  await waitFor(() => expect(api?.selectedScrollSnap()).toBe(4));
  window.innerWidth = 1280;
  window.dispatchEvent(new Event("resize"));
  await waitFor(() =>
    expect(mounted.container.querySelectorAll(".slick-active")).toHaveLength(4),
  );
  expect(api?.scrollSnapList()).toHaveLength(2);
  await waitFor(() => expect(api?.selectedScrollSnap()).toBe(1));
  mounted.unmount();
  window.innerWidth = previous;
});
