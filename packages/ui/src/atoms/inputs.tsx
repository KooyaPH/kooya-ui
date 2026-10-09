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
  return <AntInput {...props} ref={ref} className={"ku-input " + className} />;
});
export const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  function TextArea({ className = "", ...props }, ref) {
    return (
      <AntInput.TextArea
        {...props}
        ref={ref}
        className={"ku-textarea " + className}
      />
    );
  },
);
export function Select<Value = string>({
  className = "",
  ...props
}: SelectProps<Value>) {
  return <AntSelect<Value> {...props} className={"ku-select " + className} />;
}
