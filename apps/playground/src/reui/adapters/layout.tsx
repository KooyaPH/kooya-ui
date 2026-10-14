import React, { type ReactNode } from "react";
import {
  Avatar as AntAvatar,
  Card as AntCard,
  Divider,
  Empty as AntEmpty,
  Flex,
  Tag,
  Typography,
} from "antd";
import { part, findParts, type PartProps, text } from "./parts";

export function Card({ children, className, ...props }: PartProps) {
  return (
    <AntCard
      {...props}
      className={["reui-card", className].filter(Boolean).join(" ")}
      styles={{ body: { padding: 0 } }}
    >
      {children}
    </AntCard>
  );
}
export const CardHeader = part("CardHeader");
export const CardTitle = part("CardTitle", "h3");
export const CardDescription = part("CardDescription", "p");
export const CardAction = part("CardAction");
export const CardContent = part("CardContent");
export const CardFooter = part("CardFooter");
export const AvatarImage = part("AvatarImage");
export const AvatarFallback = part("AvatarFallback", "span");
export const AvatarBadge = part("AvatarBadge", "span");
export function Avatar({ children, className, ...props }: PartProps) {
  const image = findParts(children, ["AvatarImage"])[0];
  const fallback = findParts(children, ["AvatarFallback"])[0];
  return (
    <AntAvatar
      {...props}
      src={image?.props.src as string}
      alt={image?.props.alt as string}
      className={className}
    >
      {fallback?.props.children ?? children}
    </AntAvatar>
  );
}
export function AvatarGroup(
  props: React.ComponentProps<typeof AntAvatar.Group>,
) {
  return <AntAvatar.Group {...props} />;
}
export const AvatarGroupCount = part("AvatarGroupCount", "span");
export const AvatarGroupTooltip = part("AvatarGroupTooltip");
export function Badge({
  children,
  variant,
  color,
  className,
  ...props
}: PartProps & { variant?: string; color?: string }) {
  const semantic =
    color === "success" ||
    color === "warning" ||
    color === "error" ||
    color === "processing"
      ? color
      : variant === "destructive"
        ? "error"
        : undefined;
  return (
    <Tag
      {...props}
      color={semantic ?? color}
      bordered={variant === "outline"}
      className={className}
    >
      {children}
    </Tag>
  );
}
export function Separator({
  orientation,
  ...props
}: PartProps & { orientation?: "horizontal" | "vertical" }) {
  return (
    <Divider
      {...props}
      orientation={orientation === "vertical" ? "vertical" : "horizontal"}
    />
  );
}
export const Label = part("Label", "label");
export const FieldLabel = part("FieldLabel", "label");
export const FieldTitle = part("FieldTitle", "span");
export const FieldDescription = part("FieldDescription", "p");
export const FieldError = part("FieldError", "p");
export const FieldSeparator = part("FieldSeparator");
export const FieldLegend = part("FieldLegend", "legend");
export function Field({
  children,
  orientation,
  ...props
}: PartProps & { orientation?: string }) {
  return (
    <Flex
      {...props}
      vertical={orientation !== "horizontal"}
      gap={8}
      className={["reui-field", props.className].filter(Boolean).join(" ")}
    >
      {children}
    </Flex>
  );
}
export function FieldGroup(props: PartProps) {
  return <Flex {...props} vertical gap={16} />;
}
export function FieldSet(props: React.HTMLAttributes<HTMLFieldSetElement>) {
  return (
    <fieldset
      {...props}
      className={["reui-fieldset", props.className].filter(Boolean).join(" ")}
    />
  );
}
export const EmptyHeader = part("EmptyHeader");
export const EmptyTitle = part("EmptyTitle", "h3");
export const EmptyDescription = part("EmptyDescription", "p");
export const EmptyContent = part("EmptyContent");
export const EmptyMedia = part("EmptyMedia");
export function Empty({ children, ...props }: PartProps) {
  const title = findParts(children, ["EmptyTitle"])[0];
  const description = findParts(children, ["EmptyDescription"])[0];
  const media = findParts(children, ["EmptyMedia"])[0];
  const content = findParts(children, ["EmptyContent"])[0];
  return (
    <AntEmpty
      {...props}
      image={media?.props.children ?? AntEmpty.PRESENTED_IMAGE_SIMPLE}
      description={
        <>
          <Typography.Title level={5}>{title?.props.children}</Typography.Title>
          {description?.props.children}
        </>
      }
    >
      {content?.props.children}
    </AntEmpty>
  );
}
export const InputGroup = ({ children, ...props }: PartProps) => (
  <Flex
    role="group"
    data-slot="input-group"
    {...props}
    align="center"
    gap={4}
    className={["reui-input-group", props.className].filter(Boolean).join(" ")}
  >
    {children}
  </Flex>
);
const InputGroupAddonPart = part("InputGroupAddon");
export const InputGroupAddon = Object.assign(
  ({ align = "inline-start", ...props }: PartProps) => (
    <InputGroupAddonPart role="group" data-align={align} {...props} />
  ),
  { recipeRole: "InputGroupAddon", displayName: "InputGroupAddon" },
);
export const InputGroupText = part("InputGroupText", "span");
export const InputGroupLabel = part("InputGroupLabel", "label");
export const Item = part("Item");
export const ItemGroup = part("ItemGroup");
export const ItemSeparator = Separator;
export const ItemMedia = part("ItemMedia");
export const ItemContent = part("ItemContent");
export const ItemTitle = part("ItemTitle", "h3");
export const ItemDescription = part("ItemDescription", "p");
export const ItemActions = part("ItemActions");
export const ItemHeader = part("ItemHeader");
export const ItemFooter = part("ItemFooter");
export {
  Button as InputGroupButton,
  Input as InputGroupInput,
  Textarea as InputGroupTextarea,
} from "./controls";
export const FieldContent = part("FieldContent");
