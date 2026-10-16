import { useDataLoading } from "../molecules/experience";
import { forwardRef } from "react";
import {
  Input as AntInput,
  Select as AntSelect,
  type InputProps,
  type InputRef,
  type SelectProps,
} from "antd";
import type { TextAreaProps, TextAreaRef } from "antd/es/input/TextArea";
export type { InputRef } from "antd";

/** Unlabelled primitives for composition in a consuming form item. Supply a label or aria-label. */
export const Input = forwardRef<InputRef, InputProps>(function Input(
  { className = "", ...props },
  ref,
) {
  const loading = useDataLoading() && props.type !== "hidden";
  return (
    <AntInput
      {...props}
      {...(loading
        ? {
            value: "",
            disabled: true,
            placeholder: "",
            "data-skeleton": "value",
          }
        : {})}
      ref={ref}
      className={
        "ku-input " + className + (loading ? " ku-control-loading" : "")
      }
    />
  );
});
export const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  function TextArea({ className = "", ...props }, ref) {
    const loading = useDataLoading();
    return (
      <AntInput.TextArea
        {...props}
        {...(loading
          ? {
              value: "",
              disabled: true,
              placeholder: "",
              "data-skeleton": "value",
            }
          : {})}
        ref={ref}
        className={
          "ku-textarea " + className + (loading ? " ku-control-loading" : "")
        }
      />
    );
  },
);
export function Select<Value = string>({
  className = "",
  ...props
}: SelectProps<Value>) {
  const loading = useDataLoading();
  return (
    <AntSelect<Value>
      {...props}
      {...(loading ? { value: undefined, disabled: true } : {})}
      className={
        "ku-select " + className + (loading ? " ku-control-loading" : "")
      }
    />
  );
}
