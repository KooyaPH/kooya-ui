import React, { type ReactNode } from "react";

export interface PartProps {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
}
export type Part = React.FC<PartProps> & { recipeRole: string };
export function part(
  role: string,
  tag: "div" | "span" | "label" | "section" | "h3" | "p" | "legend" = "div",
): Part {
  const Component = (({
    children,
    className,
    asChild,
    render,
    ...props
  }: PartProps) => {
    const safe = Object.fromEntries(
      Object.entries(props).filter(
        ([key]) =>
          key.startsWith("aria-") ||
          key.startsWith("data-") ||
          [
            "id",
            "style",
            "title",
            "htmlFor",
            "onClick",
            "onKeyDown",
            "tabIndex",
            "role",
          ].includes(key),
      ),
    );
    if (asChild && React.isValidElement(children))
      return React.cloneElement(children, {
        ...safe,
        className,
      } as React.HTMLAttributes<HTMLElement>);
    if (React.isValidElement(render))
      return React.cloneElement(render, {
        ...safe,
        className,
        children,
      } as React.HTMLAttributes<HTMLElement>);
    const slot = role.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    return React.createElement(
      tag,
      {
        "data-slot": slot,
        ...safe,
        className: [`reui-${role}`, `cn-${slot}`, className]
          .filter(Boolean)
          .join(" "),
      },
      children,
    );
  }) as Part;
  Component.recipeRole = role;
  Component.displayName = role;
  return Component;
}
export function role(node: React.ReactElement) {
  return (node.type as unknown as { recipeRole?: string })?.recipeRole;
}
export function findParts(
  children: ReactNode,
  names: string[],
): React.ReactElement<PartProps>[] {
  const result: React.ReactElement<PartProps>[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<PartProps>(child)) return;
    if (names.includes(role(child) ?? "")) result.push(child);
    else if (child.props.children)
      result.push(...findParts(child.props.children, names));
  });
  return result;
}
export function text(children: ReactNode): string {
  return React.Children.toArray(children)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : React.isValidElement<PartProps>(child)
          ? text(child.props.children)
          : "",
    )
    .join(" ");
}
