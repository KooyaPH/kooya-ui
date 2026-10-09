import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  Button as AntButton,
  Avatar as AntAvatar,
  Tag,
  Checkbox as AntCheckbox,
  Radio,
  Skeleton as AntSkeleton,
  Progress as AntProgress,
  Tooltip as AntTooltip,
  type CheckboxProps,
  type RadioGroupProps,
  type SkeletonProps,
  type ProgressProps,
  type TooltipProps,
} from "antd";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "secondary",
      size = "md",
      leadingIcon,
      trailingIcon,
      loading = false,
      disabled,
      children,
      className = "",
      type = "button",
      color: _color,
      ...props
    },
    ref,
  ) {
    return (
      <AntButton
        {...props}
        ref={ref}
        htmlType={type}
        type={
          variant === "primary"
            ? "primary"
            : variant === "ghost"
              ? "text"
              : "default"
        }
        danger={variant === "danger"}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={`ku-button ku-button--${variant} ku-button--${size} ${className}`}
      >
        <span className="ku-button-content">
          {leadingIcon && (
            <span className="ku-control-icon" aria-hidden>
              {leadingIcon}
            </span>
          )}
          {loading && (
            <span className="ku-button-busy-mark" aria-hidden>
              <span className="ku-spinner" />
            </span>
          )}
          <span>{children}</span>
          {trailingIcon && (
            <span className="ku-control-icon" aria-hidden>
              {trailingIcon}
            </span>
          )}
        </span>
      </AntButton>
    );
  },
);
export const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
    label: string;
  }
>(function IconButton(
  { label, children, className = "", type = "button", color: _color, ...props },
  ref,
) {
  return (
    <AntButton
      {...props}
      ref={ref}
      htmlType={type}
      aria-label={label}
      title={label}
      type="text"
      className={"ku-icon-button " + className}
    >
      <span role="img" aria-hidden="true">
        {children}
      </span>
    </AntButton>
  );
});
export function Chip({
  children,
  tone = "neutral",
  icon,
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "accent";
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={`ku-chip ku-chip--${tone} ${className}`}>
      {icon && <span aria-hidden>{icon}</span>}
      <span>{children}</span>
    </Tag>
  );
}
export function FilterChip({
  selected = false,
  children,
  className = "",
  type: _type,
  color: _color,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <AntButton
      {...props}
      htmlType="button"
      aria-pressed={selected}
      className={"ku-filter-chip " + className}
    >
      {children}
    </AntButton>
  );
}
export function Avatar({ name }: { name: string }) {
  return (
    <AntAvatar className="ku-avatar" aria-hidden>
      {name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")}
    </AntAvatar>
  );
}
export function Checkbox({
  label,
  ...props
}: Omit<CheckboxProps, "children"> & { label: ReactNode }) {
  return (
    <AntCheckbox
      {...props}
      className={"ku-checkbox " + (props.className ?? "")}
    >
      {label}
    </AntCheckbox>
  );
}
export function RadioGroup({
  label,
  ...props
}: RadioGroupProps & { label: string }) {
  return (
    <Radio.Group
      {...props}
      aria-label={label}
      className={"ku-radio-group " + (props.className ?? "")}
    />
  );
}
export function Skeleton(props: SkeletonProps) {
  return <AntSkeleton {...props} />;
}
export function Progress(props: ProgressProps) {
  return <AntProgress {...props} />;
}
export function Tooltip(props: TooltipProps) {
  return <AntTooltip {...props} />;
}
