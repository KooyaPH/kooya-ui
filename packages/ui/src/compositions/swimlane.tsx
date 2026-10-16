import { DataValue } from "../molecules/experience";
import {
  useId,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type CSSProperties,
} from "react";

export interface SwimlaneBoardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  hint?: string;
  busy?: boolean;
}
/** Composable board: applications own cards, permissions and move persistence. */
export function SwimlaneBoard({
  label,
  hint = "Scroll horizontally to browse status columns.",
  busy = false,
  children,
  className = "",
  ...props
}: SwimlaneBoardProps) {
  const hintId = useId();
  const board = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const defaultHint = "Scroll horizontally to browse status columns.";
  const showHint = !!hint && (hint !== defaultHint || overflowing);
  useEffect(() => {
    const rails = [
      ...(board.current?.querySelectorAll<HTMLElement>(".ku-swimlane-rail") ??
        []),
    ];
    const measure = () =>
      setOverflowing(
        rails.some((rail) => rail.scrollWidth > rail.clientWidth + 1),
      );
    measure();
    const observer =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(measure);
    rails.forEach((rail) => observer?.observe(rail));
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children]);
  return (
    <div
      {...props}
      ref={board}
      className={`ku-swimlane-board ${className}`}
      role="group"
      aria-label={label}
      aria-busy={busy}
    >
      {showHint && (
        <p id={hintId} className="ku-swimlane-board__hint">
          {hint}
        </p>
      )}
      <div
        className="ku-swimlane-board__lanes"
        aria-describedby={showHint ? hintId : undefined}
      >
        {children}
      </div>
    </div>
  );
}
export interface SwimlaneProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  count?: number;
  collapsed?: boolean;
  onToggle?: () => void;
  showHeading?: boolean;
}
export function Swimlane({
  label,
  count,
  collapsed = false,
  onToggle,
  showHeading = true,
  children,
  className = "",
  ...props
}: SwimlaneProps) {
  const id = useId();
  return (
    <div
      {...props}
      className={`ku-swimlane ${collapsed ? "is-collapsed" : ""} ${className}`}
    >
      {showHeading && (
        <div className="ku-swimlane__heading">
          {onToggle ? (
            <button
              type="button"
              aria-expanded={!collapsed}
              aria-controls={id}
              onClick={onToggle}
            >
              <span aria-hidden="true">{collapsed ? "▸" : "▾"}</span>
              <span>{label}</span>
              {count !== undefined && (
                <small>
                  <DataValue width={24}>{count}</DataValue>
                </small>
              )}
            </button>
          ) : (
            <h2>
              {label}
              {count !== undefined && (
                <small>
                  <DataValue width={24}>{count}</DataValue>
                </small>
              )}
            </h2>
          )}
        </div>
      )}
      <div id={id} hidden={collapsed}>
        {children}
      </div>
    </div>
  );
}
export function SwimlaneRail({
  children,
  className = "",
  style,
  columns,
  ...props
}: HTMLAttributes<HTMLDivElement> & { columns?: number }) {
  return (
    <div
      {...props}
      className={`ku-swimlane-rail ${className}`}
      style={{ "--ku-board-columns": columns ?? 3, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}
export function SwimlaneColumn({
  title,
  count,
  actions,
  header,
  children,
  className = "",
  ...props
}: Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title?: ReactNode;
  count?: number;
  actions?: ReactNode;
  header?: ReactNode;
}) {
  return (
    <section {...props} className={`ku-swimlane-column ${className}`}>
      {header ??
        (title !== undefined && (
          <header>
            <h3>{title}</h3>
            {count !== undefined && (
              <small>
                <DataValue width={24}>{count}</DataValue>
              </small>
            )}
            {actions}
          </header>
        ))}
      {header || title !== undefined ? (
        <div className="ku-swimlane-column__items">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
export function SwimlaneCard({
  title,
  children,
  actions,
  className = "",
  ...props
}: Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <article {...props} className={`ku-swimlane-card ${className}`}>
      {title !== undefined && <h4>{title}</h4>}
      {children}
      {actions && <div className="ku-swimlane-card__actions">{actions}</div>}
    </article>
  );
}
