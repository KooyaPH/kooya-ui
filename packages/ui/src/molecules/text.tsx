import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

export interface ExpandableTextProps {
  text: string;
  lines?: number;
  className?: string;
}
/** Supporting prose only. Never use for field labels, errors, permissions or primary documents. */
export function ExpandableText({
  text,
  lines = 3,
  className = "",
}: ExpandableTextProps) {
  const id = useId();
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const rows = Math.max(1, Math.min(10, Math.floor(lines) || 3));
  useEffect(() => {
    setExpanded(false);
  }, [text]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let live = true;
    const measure = () => {
      if (!live) return;
      const style = getComputedStyle(element);
      const lineHeight =
        parseFloat(style.lineHeight) ||
        (parseFloat(style.fontSize) || 14) * 1.5;
      setOverflows(element.scrollHeight > lineHeight * rows + 2);
    };
    measure();
    const observer =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(measure);
    observer?.observe(element);
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      live = false;
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text, rows]);
  return (
    <div className={`ku-expandable-text ${className}`}>
      <p
        ref={ref}
        id={id}
        className={expanded ? "is-expanded" : ""}
        style={{ "--ku-text-lines": rows } as CSSProperties}
      >
        {text}
      </p>
      {overflows && (
        <button
          type="button"
          className="ku-text-disclosure"
          aria-controls={id}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
