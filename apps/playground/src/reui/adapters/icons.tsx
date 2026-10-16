import * as icons from "lucide-react";
import type { CSSProperties } from "react";
export function IconPlaceholder({
  lucide,
  className,
  size = 16,
  style,
  ...props
}: {
  lucide?: string;
  className?: string;
  size?: number;
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  const library = icons as unknown as Record<string, icons.LucideIcon>;
  const Icon =
    library[lucide ?? ""] ??
    library[(lucide ?? "").replace(/Icon$/, "")] ??
    icons.Circle;
  return (
    <Icon
      className={className}
      size={size}
      style={style}
      {...Object.fromEntries(
        Object.entries(props).filter(
          ([key]) =>
            key.startsWith("aria-") ||
            key.startsWith("data-") ||
            key === "strokeWidth",
        ),
      )}
    />
  );
}
