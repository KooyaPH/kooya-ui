import {
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type ReactElement,
  type MouseEvent,
  type HTMLAttributes,
} from "react";
import { Modal, Drawer as AntDrawer } from "antd";
import { useKooyaRoot } from "../foundations/index";
export interface DialogProps {
  title?: ReactNode;
  dismissible?: boolean;
  showCloseButton?: boolean;
  closeLabel?: string;
  width?: number | string;
  labelledBy?: string;
  describedBy?: string;
  className?: string;
  bodyClassName?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  kind?: "modal" | "drawer" | "navigation";
  /** Same mounted modal; CSS provides a mobile task surface. */
  mobilePresentation?: "compact" | "task";
}
export function Dialog({
  title,
  description,
  children,
  footer,
  trigger,
  open,
  onOpenChange,
  kind = "modal",
  dismissible = true,
  showCloseButton = true,
  closeLabel = "Close",
  width,
  labelledBy,
  describedBy,
  className,
  bodyClassName,
  mobilePresentation = "compact",
}: DialogProps) {
  const [internal, setInternal] = useState(false);
  const visible = open ?? internal;
  const root = useKooyaRoot();
  const previous = useRef<HTMLElement | null>(null);
  const descriptionId = useId();
  const titleId = useId();
  const body = useRef<HTMLDivElement>(null);
  const panelNode = useRef<Element | null>(null);
  const wasOpen = useRef(false);
  const closingFocus = useRef<Element | null>(null);
  const restored = useRef(true);
  const change = (next: boolean) => {
    if (next)
      previous.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    setInternal(next);
    onOpenChange?.(next);
  };
  useLayoutEffect(() => {
    if (visible) restored.current = false;
    if (visible && !previous.current)
      previous.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
  }, [visible]);
  const restore = () => {
    if (restored.current) return;
    restored.current = true;
    const target =
      previous.current?.isConnected && previous.current !== document.body
        ? previous.current
        : root?.current;
    const active = document.activeElement;
    const panel = panelNode.current;
    // A completed action may deliberately focus a different connected control.
    // Restore only abandoned focus or focus still owned by this closing panel.
    if (
      active === document.body ||
      active === target ||
      active === closingFocus.current ||
      panel?.contains(active) ||
      (panel && active?.contains(panel))
    )
      target?.focus({ preventScroll: true });
    previous.current = null;
  };
  useEffect(
    () => () => {
      const target = previous.current;
      // Conditional mounting can remove Ant's panel before afterClose runs.
      // Only restore a connected initiator when no subsequent action owns focus.
      requestAnimationFrame(() => {
        if (document.activeElement === document.body && target?.isConnected)
          target.focus({ preventScroll: true });
      });
    },
    [],
  );
  useLayoutEffect(() => {
    const closing = wasOpen.current && !visible;
    wasOpen.current = visible;
    if (visible) closingFocus.current = null;
    if (closing) {
      const active = document.activeElement;
      const panel = panelNode.current;
      if (panel && (panel.contains(active) || active?.contains(panel)))
        closingFocus.current = active;
    }
    if (!closing || kind === "modal") return;
    // Ant can destroy a drawer closed during its entrance before it emits
    // afterOpenChange(false). Restore focus once that content has unmounted.
    const frame = requestAnimationFrame(() => {
      if (!body.current?.isConnected) restore();
    });
    return () => cancelAnimationFrame(frame);
  }, [visible, kind]);
  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<HTMLAttributes<HTMLElement>>, {
        onClick: (e: MouseEvent<HTMLElement>) => {
          (trigger.props as HTMLAttributes<HTMLElement>).onClick?.(e);
          if (!e.defaultPrevented) change(true);
        },
      })
    : trigger;
  // Ant 6.6.5 Modal does not forward external ARIA references to its panel.
  // Bridge only standard semantic attributes on the enclosing native dialog.
  // The owned ref also runs when portaled content first mounts or reopens.
  const syncAria = (element: HTMLDivElement | null) => {
    const panel = element?.closest('[role="dialog"]');
    if (!panel) return;
    panelNode.current = panel;
    const label = labelledBy ?? (title != null ? titleId : undefined);
    const descriptionReference =
      describedBy ?? (description ? descriptionId : undefined);
    for (const [attribute, value] of [
      ["aria-labelledby", label],
      ["aria-describedby", descriptionReference],
    ] as const) {
      if (value) panel.setAttribute(attribute, value);
      else panel.removeAttribute(attribute);
    }
  };
  useLayoutEffect(() => {
    syncAria(body.current);
  }, [visible, title, labelledBy, describedBy, description]);
  const content = (
    <>
      {description && (
        <p id={descriptionId} className="ku-overlay-description">
          {description}
        </p>
      )}
      <div
        ref={(element) => {
          body.current = element;
          syncAria(element);
        }}
        className={["ku-overlay-body", bodyClassName].filter(Boolean).join(" ")}
      >
        {children}
      </div>
    </>
  );
  const common = {
    title: title != null ? <span id={titleId}>{title}</span> : undefined,
    open: visible,
    footer: footer ?? null,
    getContainer: () => root?.current ?? document.body,
    keyboard: dismissible,
    mask: { closable: dismissible },
    closable:
      dismissible && showCloseButton ? { "aria-label": closeLabel } : false,
    closeIcon: <span aria-hidden="true">×</span>,
  };
  return (
    <>
      {triggerNode}
      {kind === "modal" ? (
        <Modal
          {...common}
          className={[
            "ku-modal",
            mobilePresentation === "task" && "ku-modal--task",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          width={width}
          onCancel={() => change(false)}
          afterClose={restore}
          focusable={{ focusTriggerAfterClose: false }}
          destroyOnHidden
          centered
        >
          {content}
        </Modal>
      ) : (
        <AntDrawer
          {...common}
          rootClassName={["ku-drawer", "ku-drawer--" + kind, className]
            .filter(Boolean)
            .join(" ")}
          focusable={{ focusTriggerAfterClose: false }}
          placement={kind === "navigation" ? "left" : "right"}
          size={width ?? (kind === "navigation" ? 344 : 480)}
          onClose={() => change(false)}
          afterOpenChange={(next) => {
            if (!next) requestAnimationFrame(restore);
          }}
          destroyOnHidden
        >
          {content}
        </AntDrawer>
      )}
    </>
  );
}
export function Drawer(props: Omit<DialogProps, "kind">) {
  return <Dialog {...props} kind="drawer" />;
}
