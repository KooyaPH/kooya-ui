import type { CSSProperties, HTMLAttributes } from "react";

/** Semantic grid only. Item content owns its own surface and business behavior. */
export function CollectionGrid({
  children,
  className = "",
  minItemWidth = 220,
  gap = 16,
  style,
  ...props
}: HTMLAttributes<HTMLUListElement> & { minItemWidth?: number; gap?: number }) {
  return (
    <ul
      {...props}
      className={`ku-collection-grid ${className}`}
      style={
        {
          "--ku-collection-min": `${minItemWidth}px`,
          "--ku-collection-gap": `${gap}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </ul>
  );
}
