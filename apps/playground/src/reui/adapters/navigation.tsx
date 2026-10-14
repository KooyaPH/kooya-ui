import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  Carousel as AntCarousel,
  Collapse,
  Menu,
  Typography,
  Button,
} from "antd";
import { useKooyaOptions } from "@kooyaph/ui";
import type { CarouselRef } from "antd/es/carousel";
import { part, findParts, text, role, type PartProps } from "./parts";
export const CarouselContent = part("CarouselContent");
export const CarouselItem = part("CarouselItem");
export type CarouselApi = {
  selectedScrollSnap: () => number;
  scrollSnapList: () => number[];
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  on: (event: string, callback: () => void) => CarouselApi;
  off: (event: string, callback: () => void) => CarouselApi;
};
const CarouselContext = createContext<{
  api: CarouselApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} | null>(null);
export function useCarousel() {
  const value = useContext(CarouselContext);
  if (!value) throw Error("Carousel controls require a Carousel");
  return {
    ...value,
    scrollPrev: value.api.scrollPrev,
    scrollNext: value.api.scrollNext,
  };
}
export function Carousel({
  children,
  setApi,
  orientation,
  opts,
  plugins,
  ...props
}: PartProps & {
  setApi?: (api: CarouselApi) => void;
  orientation?: string;
  opts?: { loop?: boolean; align?: string };
  plugins?: unknown[];
}) {
  const { reducedMotion } = useKooyaOptions();
  const ref = useRef<CarouselRef>(null),
    current = useRef(0),
    listeners = useRef(new Map<string, Set<() => void>>());
  const [index, setIndex] = useState(0);
  const content = findParts(children, ["CarouselContent"])[0];
  const slides = findParts(content?.props.children, ["CarouselItem"]);
  const count = slides.length;
  const classes = slides[0]?.props.className ?? "";
  const fraction = (token: string) => {
    const match = token.match(/basis-(\d+)\/(\d+)/);
    if (match) return Number(match[2]) / Number(match[1]);
    const percent = token.match(/basis-\[(\d+)%\]/);
    return percent ? 100 / Number(percent[1]) : 1;
  };
  const base = classes.split(/\s+/).find((token) => token.startsWith("basis-"));
  const visible = Math.min(count, base ? fraction(base) : 1);
  const [viewport, setViewport] = useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  useEffect(() => {
    const resize = () => setViewport(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const responsive = [
    { breakpoint: 640, settings: { slidesToShow: visible } },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: fraction(
          classes.split(/\s+/).find((token) => token.startsWith("sm:basis-")) ??
            base ??
            "",
        ),
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: fraction(
          classes.split(/\s+/).find((token) => token.startsWith("md:basis-")) ??
            classes
              .split(/\s+/)
              .find((token) => token.startsWith("sm:basis-")) ??
            base ??
            "",
        ),
      },
    },
  ];
  const desktop = fraction(
    classes.split(/\s+/).find((token) => token.startsWith("lg:basis-")) ??
      classes.split(/\s+/).find((token) => token.startsWith("md:basis-")) ??
      classes.split(/\s+/).find((token) => token.startsWith("sm:basis-")) ??
      base ??
      "",
  );
  const activeVisible =
    viewport < 640
      ? visible
      : viewport < 768
        ? responsive[1].settings.slidesToShow
        : viewport < 1024
          ? responsive[2].settings.slidesToShow
          : desktop;
  const snapCount = Math.max(
    1,
    Math.ceil(count - Math.min(count, activeVisible) + 1),
  );
  const api: CarouselApi = useMemo<CarouselApi>(
    () => ({
      selectedScrollSnap: () => current.current,
      scrollSnapList: () => Array.from({ length: snapCount }, (_, i) => i),
      scrollTo: (i) => ref.current?.goTo(i),
      scrollPrev: () => ref.current?.prev(),
      scrollNext: () => ref.current?.next(),
      canScrollPrev: () => !!opts?.loop || current.current > 0,
      canScrollNext: () => !!opts?.loop || current.current < snapCount - 1,
      on: (event, callback) => {
        if (!listeners.current.has(event))
          listeners.current.set(event, new Set());
        listeners.current.get(event)!.add(callback);
        return api;
      },
      off: (event, callback) => {
        listeners.current.get(event)?.delete(callback);
        return api;
      },
    }),
    [snapCount, opts?.loop],
  );
  useEffect(() => {
    if (!opts?.loop && current.current >= snapCount)
      ref.current?.goTo(snapCount - 1, true);
  }, [snapCount, opts?.loop]);
  const setter = useRef(setApi);
  setter.current = setApi;
  useEffect(() => {
    setter.current?.(api);
    listeners.current.get("reInit")?.forEach((callback) => callback());
  }, [api]);
  const remainder = React.Children.toArray(children).filter(
    (node) => !React.isValidElement(node) || role(node) !== "CarouselContent",
  );
  return (
    <CarouselContext.Provider
      value={{
        api,
        canScrollPrev: api.canScrollPrev(),
        canScrollNext: api.canScrollNext(),
      }}
    >
      <div {...props} role="region" aria-roledescription="carousel">
        <AntCarousel
          ref={ref}
          dots={false}
          slidesToShow={Math.min(count, activeVisible)}
          slidesToScroll={1}
          centerMode={opts?.align === "center"}
          centerPadding="0px"
          className={content?.props.className}
          infinite={!!opts?.loop}
          vertical={orientation === "vertical"}
          autoplay={!reducedMotion && !!plugins?.length}
          autoplaySpeed={
            (plugins?.[0] as { options?: { delay?: number } } | undefined)
              ?.options?.delay ?? 3000
          }
          speed={reducedMotion ? 0 : 500}
          draggable
          waitForAnimate={false}
          beforeChange={(_, next) => {
            current.current = next;
            setIndex(next);
            listeners.current.get("select")?.forEach((callback) => callback());
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.key ?? i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className={slide.props.className
                ?.split(/\s+/)
                .filter((token) => !token.includes("basis-"))
                .join(" ")}
            >
              {slide.props.children}
            </div>
          ))}
        </AntCarousel>
        {remainder}
      </div>
    </CarouselContext.Provider>
  );
}
export function CarouselPrevious(props: React.ComponentProps<typeof Button>) {
  const value = useCarousel();
  return (
    <Button
      {...props}
      htmlType="button"
      aria-label={props["aria-label"] ?? "Previous slide"}
      disabled={!value.canScrollPrev}
      onClick={value.scrollPrev}
    >
      {props.children ?? "←"}
    </Button>
  );
}
export function CarouselNext(props: React.ComponentProps<typeof Button>) {
  const value = useCarousel();
  return (
    <Button
      {...props}
      htmlType="button"
      aria-label={props["aria-label"] ?? "Next slide"}
      disabled={!value.canScrollNext}
      onClick={value.scrollNext}
    >
      {props.children ?? "→"}
    </Button>
  );
}
export const CollapsibleTrigger = part("CollapsibleTrigger");
export const CollapsibleContent = part("CollapsibleContent");
function omitTrigger(children: React.ReactNode): React.ReactNode {
  if (Array.isArray(children)) return children.map(omitTrigger);
  if (!React.isValidElement<PartProps>(children)) return children;
  if (role(children) === "CollapsibleTrigger") return null;
  return children.props.children
    ? React.cloneElement(children, {
        children: omitTrigger(children.props.children),
      })
    : children;
}
export function Collapsible({
  children,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: PartProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [local, setLocal] = useState(!!defaultOpen);
  const trigger = findParts(children, ["CollapsibleTrigger"])[0];
  const content = findParts(children, ["CollapsibleContent"])[0];
  const outside = React.Children.toArray(children).filter(
    (node) =>
      !React.isValidElement(node) || role(node) !== "CollapsibleContent",
  );
  return (
    <div {...props}>
      {outside.map(omitTrigger)}
      <Collapse
        activeKey={(open ?? local) ? ["content"] : []}
        items={[
          {
            key: "content",
            label: text(trigger?.props.children) || "Toggle details",
            children: content?.props.children,
            collapsible: props.disabled ? "disabled" : undefined,
          },
        ]}
        onChange={(keys) => {
          const next = keys.length > 0;
          setLocal(next);
          onOpenChange?.(next);
        }}
      />
    </div>
  );
}
export const NavigationMenuList = part("NavigationMenuList");
export const NavigationMenuItem = part("NavigationMenuItem");
export const NavigationMenuTrigger = part("NavigationMenuTrigger");
export const NavigationMenuContent = part("NavigationMenuContent");
export const NavigationMenuViewport = () => null;
export const NavigationMenuIndicator = () => null;
export function NavigationMenuLink({
  asChild,
  active,
  children,
  ...props
}: PartProps) {
  if (asChild && React.isValidElement(children))
    return React.cloneElement(children, {
      ...props,
      "aria-current": active ? "page" : undefined,
    } as React.HTMLAttributes<HTMLElement>);
  return (
    <Typography.Link {...props} aria-current={active ? "page" : undefined}>
      {children}
    </Typography.Link>
  );
}
NavigationMenuLink.recipeRole = "NavigationMenuLink";
export const navigationMenuTriggerStyle = () => "reui-navigation-trigger";
export function NavigationMenu({
  children,
  value,
  defaultValue,
  onValueChange,
  ...props
}: PartProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const entries = findParts(children, ["NavigationMenuItem"]).map(
    (item, index) => {
      const trigger = findParts(item.props.children, [
          "NavigationMenuTrigger",
        ])[0],
        content = findParts(item.props.children, ["NavigationMenuContent"])[0];
      return {
        key: String(item.props.value ?? index),
        label: trigger?.props.children ?? item.props.children,
        children: content
          ? [
              {
                key: String(index) + "-content",
                label: (
                  <div className="reui-navigation-content">
                    {content.props.children}
                  </div>
                ),
              },
            ]
          : undefined,
      };
    },
  );
  return (
    <Menu
      {...props}
      mode="horizontal"
      items={entries}
      openKeys={value === undefined ? undefined : value ? [value] : []}
      defaultOpenKeys={defaultValue ? [defaultValue] : []}
      onOpenChange={(keys) => onValueChange?.(keys[0] ?? "")}
    />
  );
}
