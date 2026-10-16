import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from "react";
import {
  App,
  Button as AntButton,
  Checkbox as AntCheckbox,
  Input as AntInput,
  Progress as AntProgress,
  Radio as AntRadio,
  Skeleton as AntSkeleton,
  Slider as AntSlider,
  Space,
  Spin,
  Switch as AntSwitch,
  type ButtonProps,
  type CheckboxProps,
  type InputProps,
  type InputRef,
  type RadioGroupProps,
  type RadioProps,
  type SwitchProps,
} from "antd";

type RecipeButtonProps = Omit<ButtonProps, "type" | "size" | "variant"> & {
  type?: ButtonProps["type"] | "button" | "submit" | "reset";
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  size?:
    | ButtonProps["size"]
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, RecipeButtonProps>(
  function Button(
    {
      variant = "default",
      size = "default",
      type,
      asChild,
      children,
      className,
      ...props
    },
    ref,
  ) {
    const feedback = App.useApp();
    const nativeType =
      type === "submit" || type === "reset" || type === "button"
        ? type
        : "button";
    const antType =
      type && !["button", "submit", "reset"].includes(type)
        ? (type as ButtonProps["type"])
        : variant === "default" || variant === "destructive"
          ? "primary"
          : variant === "ghost"
            ? "text"
            : variant === "link"
              ? "link"
              : "default";
    const antSize =
      size === "sm" || size === "xs" || size === "icon-sm" || size === "icon-xs"
        ? "small"
        : size === "lg" || size === "icon-lg"
          ? "large"
          : size === "small" || size === "large"
            ? size
            : "middle";
    const child =
      asChild &&
      React.isValidElement<{
        href?: string;
        target?: string;
        rel?: string;
        children?: ReactNode;
        onClick?: ButtonProps["onClick"];
      }>(children)
        ? children
        : undefined;
    return (
      <AntButton
        {...props}
        ref={ref}
        htmlType={nativeType}
        type={antType}
        size={antSize}
        danger={props.danger || variant === "destructive"}
        variant={
          variant === "secondary"
            ? "filled"
            : variant === "outline"
              ? "outlined"
              : variant === "ghost"
                ? "text"
                : variant === "link"
                  ? "link"
                  : "solid"
        }
        color={
          props.color ??
          (variant === "default" || variant === "link"
            ? "primary"
            : variant === "destructive"
              ? "danger"
              : "default")
        }
        href={child?.props.href ?? props.href}
        target={child?.props.target ?? props.target}
        rel={child?.props.rel ?? props.rel}
        className={[
          "reui-ant-button",
          size.startsWith("icon") ? "reui-icon-button" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        data-variant={variant}
        onClick={
          props.onClick ??
          child?.props.onClick ??
          (nativeType === "button" && !props.href && !child?.props.href
            ? () => {
                feedback.message.info("Sample action activated");
              }
            : undefined)
        }
      >
        {child?.props.children ?? children}
      </AntButton>
    );
  },
);

export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: { variant?: string; size?: string; className?: string } = {}) {
  return `reui-link-button reui-link-${variant} reui-size-${size} ${className}`;
}

export const Input = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "size"> & {
    size?: InputProps["size"] | number | "sm" | "lg" | "default";
  }
>(function Input({ size, ...props }, ref) {
  const input = useRef<InputRef>(null);
  useImperativeHandle(ref, () => input.current!.input!);
  return (
    <AntInput
      {...props}
      ref={input}
      size={
        size === "sm"
          ? "small"
          : size === "lg"
            ? "large"
            : typeof size === "string" &&
                ["small", "middle", "large"].includes(size)
              ? (size as InputProps["size"])
              : undefined
      }
    />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof AntInput.TextArea>
>(function Textarea(props, ref) {
  const input = useRef<React.ElementRef<typeof AntInput.TextArea>>(null);
  useImperativeHandle(ref, () => input.current!.resizableTextArea!.textArea);
  return <AntInput.TextArea {...props} ref={input} />;
});

export function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  onChange,
  ...props
}: Omit<CheckboxProps, "checked" | "defaultChecked"> & {
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <AntCheckbox
      {...props}
      checked={checked === "indeterminate" ? false : checked}
      defaultChecked={
        defaultChecked === "indeterminate" ? false : defaultChecked
      }
      indeterminate={checked === "indeterminate" || props.indeterminate}
      onChange={(event) => {
        onCheckedChange?.(event.target.checked);
        onChange?.(event);
      }}
    />
  );
}

export function Switch({
  onCheckedChange,
  onChange,
  ...props
}: SwitchProps & { onCheckedChange?: (value: boolean) => void }) {
  return (
    <AntSwitch
      {...props}
      onChange={(value, event) => {
        onCheckedChange?.(value);
        onChange?.(value, event);
      }}
    />
  );
}

export function RadioGroup({
  onValueChange,
  onChange,
  ...props
}: RadioGroupProps & { onValueChange?: (value: string) => void }) {
  return (
    <AntRadio.Group
      {...props}
      onChange={(event) => {
        onValueChange?.(event.target.value);
        onChange?.(event);
      }}
    />
  );
}

export function RadioGroupItem(props: RadioProps) {
  return <AntRadio {...props} />;
}

type RecipeSliderProps = {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};
export function Slider({
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  orientation,
  ...props
}: RecipeSliderProps) {
  const range = (value ?? defaultValue)?.length === 2;
  const common = {
    ...props,
    vertical: orientation === "vertical",
    onChange: (next: number | number[]) =>
      onValueChange?.(Array.isArray(next) ? next : [next]),
    onChangeComplete: (next: number | number[]) =>
      onValueCommit?.(Array.isArray(next) ? next : [next]),
  };
  return range ? (
    <AntSlider
      {...common}
      range
      value={value as [number, number]}
      defaultValue={defaultValue as [number, number]}
    />
  ) : (
    <AntSlider
      {...common}
      value={value?.[0]}
      defaultValue={defaultValue?.[0]}
    />
  );
}

export function Progress({
  value = 0,
  max = 100,
  className,
  ...props
}: {
  value?: number;
  max?: number;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <AntProgress
      {...props}
      aria-label={props["aria-label"] ?? "Sample progress"}
      percent={max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0}
      showInfo={false}
      className={className}
    />
  );
}
export function Spinner(props: { className?: string; "aria-label"?: string }) {
  return (
    <Spin
      {...props}
      aria-label={props["aria-label"] ?? "Loading…"}
      size="small"
    />
  );
}
export function Skeleton({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={className} style={style}>
      <AntSkeleton.Node
        active
        style={{ width: "100%", height: "100%", minHeight: 24 }}
      />
    </div>
  );
}
export function ButtonGroup({
  orientation,
  ...props
}: React.ComponentProps<typeof Space.Compact> & {
  orientation?: "vertical" | "horizontal";
}) {
  return <Space.Compact {...props} direction={orientation} />;
}
export function ButtonGroupText(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} />;
}
export function ButtonGroupSeparator() {
  return <span aria-hidden="true" className="reui-group-separator" />;
}
