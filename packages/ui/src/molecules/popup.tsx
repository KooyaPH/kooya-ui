import {
  cloneElement,
  useEffect,
  useRef,
  useState,
  useId,
  type RefObject,
  type ReactElement,
  type ReactNode,
  type HTMLAttributes,
  type CSSProperties,
} from "react";
import { Popover } from "antd";
import { useKooyaRoot } from "../foundations/index";

export interface PopupProps {
  label: string;
  trigger: ReactElement<HTMLAttributes<HTMLElement>>;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  /** Focus after placement, without scrolling. Omit premature child autoFocus. */
  initialFocusRef?: RefObject<{ focus(options?: FocusOptions): void } | null>;
  align?: "start" | "end";
  className?: string;
  style?: CSSProperties;
}
/** Nonmodal anchored content. Ant owns placement, portals and outside dismissal. */
export function Popup({
  label,
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  onClose,
  initialFocusRef,
  align = "start",
  className = "",
  style,
}: PopupProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const visible = open ?? internal;
  const root = useKooyaRoot();
  const anchor = useRef<HTMLSpanElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const previous = useRef(false);
  const id = useId();
  const restore = () => {
    const active = document.activeElement;
    // Do not steal focus from an outside action or a newly opened dialog.
    if (active === document.body || content.current?.contains(active)) {
      const target = anchor.current?.querySelector<HTMLElement>(
        "button,a,[tabindex]",
      );
      if (target?.isConnected) target.focus({ preventScroll: true });
    }
  };
  useEffect(() => {
    if (previous.current && !visible) restore();
    previous.current = visible;
  }, [visible]);
  useEffect(
    () => () => {
      const target = anchor.current?.querySelector<HTMLElement>(
        "button,a,[tabindex]",
      );
      requestAnimationFrame(() => {
        if (document.activeElement === document.body && target?.isConnected)
          target.focus({ preventScroll: true });
      });
    },
    [],
  );
  const change = (next: boolean) => {
    if (next === visible) return;
    setInternal(next);
    onOpenChange?.(next);
    if (!next) onClose?.();
  };
  return (
    <span ref={anchor} className="ku-popup-trigger">
      <Popover
        open={visible}
        onOpenChange={change}
        trigger="click"
        placement={align === "start" ? "bottomLeft" : "bottomRight"}
        arrow={false}
        destroyOnHidden
        styles={{ root: { pointerEvents: "auto" } }}
        getPopupContainer={(node) =>
          node.closest<HTMLElement>('[role="dialog"]') ??
          root?.current ??
          document.body
        }
        afterOpenChange={(next) => {
          if (
            next &&
            content.current &&
            !content.current.contains(document.activeElement)
          ) {
            initialFocusRef?.current?.focus({ preventScroll: true });
            // A disabled, detached or absent target may leave focus unchanged.
            if (!content.current.contains(document.activeElement))
              content.current.focus({ preventScroll: true });
          }
          if (!next) restore();
        }}
        content={
          <div
            id={id}
            ref={content}
            role="dialog"
            aria-label={label}
            tabIndex={-1}
            className={`ku-popup-content ${className}`}
            style={style}
            onKeyDown={(event) => {
              if (event.key === "Escape" && !event.defaultPrevented) {
                event.preventDefault();
                event.stopPropagation();
                change(false);
              }
            }}
          >
            {children}
          </div>
        }
      >
        {cloneElement(trigger, {
          "aria-haspopup": "dialog",
          "aria-expanded": visible,
          "aria-controls": visible ? id : undefined,
        })}
      </Popover>
    </span>
  );
}
