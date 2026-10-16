import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  Button,
  Drawer as AntDrawer,
  Modal,
  Popover as AntPopover,
  Tooltip as AntTooltip,
} from "antd";
import { findParts, part, type PartProps } from "./parts";

const OverlayContext = createContext<(open: boolean) => void>(() => {});
function triggerNode(marker?: React.ReactElement<PartProps>) {
  const target = marker?.props.render ?? marker?.props.children;
  return React.isValidElement(target) ? (
    target
  ) : (
    <Button>{(target as ReactNode) ?? "Open sample"}</Button>
  );
}
function overlay(kind: "Dialog" | "AlertDialog" | "Drawer" | "Sheet") {
  return function Overlay({
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    ...props
  }: PartProps & {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }) {
    const [local, setLocal] = useState(defaultOpen);
    const active = open ?? local;
    const change = (next: boolean) => {
      setLocal(next);
      onOpenChange?.(next);
    };
    const trigger = findParts(children, [kind + "Trigger"])[0];
    const content = findParts(children, [kind + "Content"])[0];
    const title = findParts(content?.props.children, [kind + "Title"])[0]?.props
      .children;
    const original = triggerNode(trigger);
    const connectedTrigger = trigger
      ? React.cloneElement(
          original as React.ReactElement<{
            onClick?: (event: React.MouseEvent) => void;
          }>,
          {
            onClick: (event: React.SyntheticEvent) => {
              original.props.onClick?.(event);
              if (!event.defaultPrevented) change(true);
            },
          },
        )
      : null;
    const drawer = kind === "Drawer" || kind === "Sheet";
    const placement =
      (content?.props.side ?? props.direction) === "left" ||
      (content?.props.side ?? props.direction) === "top" ||
      (content?.props.side ?? props.direction) === "bottom"
        ? ((content?.props.side ?? props.direction) as
            | "left"
            | "top"
            | "bottom")
        : kind === "Drawer"
          ? "bottom"
          : "right";
    function withoutTitle(children: ReactNode): ReactNode {
      if (Array.isArray(children)) return children.map(withoutTitle);
      if (!React.isValidElement<PartProps>(children)) return children;
      if (
        (children.type as { recipeRole?: string }).recipeRole ===
        kind + "Title"
      )
        return null;
      return children.props.children != null
        ? React.cloneElement(children, {
            children: withoutTitle(children.props.children),
          })
        : children;
    }
    const body = (
      <div className="reui-overlay-body">
        {withoutTitle(content?.props.children)}
      </div>
    );
    return (
      <OverlayContext.Provider value={change}>
        {connectedTrigger}
        {drawer ? (
          <AntDrawer
            {...props}
            title={title}
            open={active}
            placement={placement}
            onClose={() => change(false)}
            size={placement === "bottom" ? "default" : 420}
          >
            {body}
          </AntDrawer>
        ) : (
          <Modal
            {...props}
            title={title}
            open={active}
            footer={null}
            onCancel={() => change(false)}
            focusable={{ focusTriggerAfterClose: true }}
          >
            {body}
          </Modal>
        )}
      </OverlayContext.Provider>
    );
  };
}

export const Dialog = overlay("Dialog");
export const DialogTrigger = part("DialogTrigger");
export const DialogContent = part("DialogContent");
export const DialogHeader = part("DialogHeader");
export const DialogTitle = part("DialogTitle", "h3");
export const DialogDescription = part("DialogDescription", "p");
export const DialogFooter = part("DialogFooter");
export function DialogClose({
  children,
  asChild,
  render,
  ...props
}: PartProps) {
  const change = useContext(OverlayContext);
  const target = asChild ? children : render;
  if (
    React.isValidElement<{ onClick?: (event: React.MouseEvent) => void }>(
      target,
    )
  )
    return React.cloneElement(target, {
      onClick: (event: React.MouseEvent) => {
        target.props.onClick?.(event);
        if (!event.defaultPrevented) change(false);
      },
    });
  return (
    <Button {...props} onClick={() => change(false)}>
      {children ?? "Close"}
    </Button>
  );
}
export const DialogPortal = ({ children }: PartProps) => <>{children}</>;
export const DialogOverlay = () => null;

export const AlertDialog = overlay("AlertDialog");
export const AlertDialogTrigger = part("AlertDialogTrigger");
export const AlertDialogContent = part("AlertDialogContent");
export const AlertDialogHeader = part("AlertDialogHeader");
export const AlertDialogTitle = part("AlertDialogTitle", "h3");
export const AlertDialogDescription = part("AlertDialogDescription", "p");
export const AlertDialogFooter = part("AlertDialogFooter");
export const AlertDialogMedia = part("AlertDialogMedia");
export const AlertDialogAction = DialogClose;
export const AlertDialogCancel = DialogClose;
export const AlertDialogPortal = DialogPortal;
export const AlertDialogOverlay = DialogOverlay;

export const Drawer = overlay("Drawer");
export const DrawerTrigger = part("DrawerTrigger");
export const DrawerContent = part("DrawerContent");
export const DrawerHeader = part("DrawerHeader");
export const DrawerTitle = part("DrawerTitle", "h3");
export const DrawerDescription = part("DrawerDescription", "p");
export const DrawerFooter = part("DrawerFooter");
export const DrawerClose = DialogClose;
export const DrawerPortal = DialogPortal;
export const DrawerOverlay = DialogOverlay;
export const Sheet = overlay("Sheet");
export const SheetTrigger = part("SheetTrigger");
export const SheetContent = part("SheetContent");
export const SheetHeader = part("SheetHeader");
export const SheetTitle = part("SheetTitle", "h3");
export const SheetDescription = part("SheetDescription", "p");
export const SheetFooter = part("SheetFooter");
export const SheetClose = DialogClose;
export const SheetPortal = DialogPortal;
export const SheetOverlay = DialogOverlay;

export const PopoverTrigger = part("PopoverTrigger");
export const PopoverContent = part("PopoverContent");
export const PopoverAnchor = part("PopoverAnchor");
export const PopoverHeader = part("PopoverHeader");
export const PopoverTitle = part("PopoverTitle", "h3");
export const PopoverDescription = part("PopoverDescription", "p");
export const PopoverClose = DialogClose;
export const PopoverPortal = DialogPortal;
export function Popover({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: PartProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [local, setLocal] = useState(defaultOpen);
  const trigger = findParts(children, ["PopoverTrigger"])[0];
  const content = findParts(children, ["PopoverContent"])[0];
  const change = (next: boolean) => {
    setLocal(next);
    onOpenChange?.(next);
  };
  return (
    <OverlayContext.Provider value={change}>
      <AntPopover
        open={open ?? local}
        onOpenChange={change}
        trigger="click"
        content={
          <div className={content?.props.className}>
            {content?.props.children}
          </div>
        }
      >
        {triggerNode(trigger)}
      </AntPopover>
    </OverlayContext.Provider>
  );
}

export const TooltipProvider = ({ children }: PartProps) => <>{children}</>;
export const TooltipTrigger = part("TooltipTrigger");
export const TooltipContent = part("TooltipContent");
export function Tooltip({ children }: PartProps) {
  const trigger = findParts(children, ["TooltipTrigger"])[0];
  const content = findParts(children, ["TooltipContent"])[0];
  return (
    <AntTooltip title={content?.props.children}>
      {triggerNode(trigger)}
    </AntTooltip>
  );
}
export const HoverCardTrigger = part("HoverCardTrigger");
export const HoverCardContent = part("HoverCardContent");
export function HoverCard({ children }: PartProps) {
  const trigger = findParts(children, ["HoverCardTrigger"])[0];
  const content = findParts(children, ["HoverCardContent"])[0];
  return (
    <AntPopover trigger={["hover", "focus"]} content={content?.props.children}>
      {triggerNode(trigger)}
    </AntPopover>
  );
}
