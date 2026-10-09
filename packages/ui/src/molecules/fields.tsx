import {
  useId,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  type ReactNode,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
} from "react";
import {
  Input,
  Select,
  Switch as AntSwitch,
  InputNumber,
  DatePicker,
  type InputNumberProps,
  type DatePickerProps,
} from "antd";
export function TextField({
  label,
  hint,
  error,
  icon,
  id,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
}) {
  const auto = useId(),
    inputId = id ?? auto,
    detailId = inputId + "-detail";
  const { size: _size, ...input } = props;
  return (
    <div className={"ku-field " + className}>
      <label htmlFor={inputId}>{label}</label>
      <Input
        {...input}
        id={inputId}
        prefix={
          icon && (
            <span className="ku-input-icon" aria-hidden>
              {icon}
            </span>
          )
        }
        status={error ? "error" : undefined}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={
          [props["aria-describedby"], error || hint ? detailId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className="ku-input"
      />
      {(error || hint) && (
        <small
          id={detailId}
          className={error ? "ku-field-error" : "ku-field-hint"}
        >
          {error || hint}
        </small>
      )}
    </div>
  );
}
export interface SelectFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "multiple" | "size" | "value" | "defaultValue"
> & {
  label: string;
  value?: string;
  defaultValue?: string;
  options: readonly SelectFieldOption[];
  filterOption?: (query: string, option: SelectFieldOption) => boolean;
  searchable?: boolean;
};
/** Ant owns the visible control; a hidden form bridge preserves native change events and FormData. */
export function SelectField({
  label,
  options,
  id,
  className = "",
  onChange,
  value,
  defaultValue,
  searchable = true,
  filterOption,
  onValueChange,
  disabled,
  name,
  required,
  autoFocus,
  onBlur,
  onFocus,
  ...props
}: SelectFieldProps & { onValueChange?: (value: string) => void }) {
  const auto = useId(),
    inputId = id ?? auto;
  const [internal, setInternal] = useState(
    defaultValue ?? options[0]?.value ?? "",
  );
  const bridge = useRef<HTMLSelectElement>(null);
  const control = useRef<import("antd").RefSelectProps>(null);
  const selected = value ?? internal;
  const resetState = useRef({
    value,
    fallback: defaultValue ?? options[0]?.value ?? "",
  });
  useLayoutEffect(() => {
    resetState.current = {
      value,
      fallback: defaultValue ?? options[0]?.value ?? "",
    };
  }, [value, defaultValue, options]);
  useEffect(() => {
    const form = bridge.current?.form;
    if (!form) return;
    const reset = (event: Event) => {
      // A task waits for the native reset default action and ancestor cancellation.
      // Microtasks can run between browser event listeners, before that action.
      setTimeout(() => {
        if (event.defaultPrevented || bridge.current?.form !== form) return;
        const { value: controlled, fallback } = resetState.current;
        const next = controlled ?? fallback;
        setInternal(fallback);
        // A controlled value or unchanged default may not cause a React render.
        bridge.current.value = next;
      });
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [props.form]);
  return (
    <div className={"ku-field " + className} style={props.style}>
      <label htmlFor={inputId}>{label}</label>
      <Select<string, SelectFieldOption>
        ref={control}
        id={inputId}
        className="ku-select"
        virtual={false}
        aria-label={props["aria-label"] ?? label}
        aria-required={required}
        aria-describedby={props["aria-describedby"]}
        aria-invalid={props["aria-invalid"]}
        disabled={disabled}
        autoFocus={autoFocus}
        tabIndex={props.tabIndex}
        title={props.title}
        value={selected}
        options={[...options]}
        showSearch={
          searchable
            ? {
                optionFilterProp: "label",
                filterOption: filterOption
                  ? (query, option) => !!option && filterOption(query, option)
                  : undefined,
              }
            : false
        }
        onFocus={() =>
          bridge.current?.dispatchEvent(
            new FocusEvent("focusin", { bubbles: true }),
          )
        }
        onBlur={() =>
          bridge.current?.dispatchEvent(
            new FocusEvent("focusout", { bubbles: true }),
          )
        }
        onChange={(next) => {
          if (!bridge.current) return;
          bridge.current.value = next;
          bridge.current.dispatchEvent(new Event("change", { bubbles: true }));
        }}
      />
      <select
        {...props}
        ref={bridge}
        hidden
        aria-hidden
        tabIndex={-1}
        id={inputId + "-form-value"}
        name={name}
        required={required}
        disabled={disabled}
        value={selected}
        onFocus={onFocus}
        onBlur={onBlur}
        onInvalid={(event) => {
          event.preventDefault();
          control.current?.focus();
          props.onInvalid?.(event);
        }}
        onChange={(event) => {
          setInternal(event.target.value);
          onValueChange?.(event.target.value);
          onChange?.(event);
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export function Switch({
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="ku-switch-row">
      <label htmlFor={id}>
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </label>
      <AntSwitch
        id={id}
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={onCheckedChange}
      />
    </div>
  );
}
export function NumberField({
  label,
  id,
  ...props
}: InputNumberProps & { label: string }) {
  const auto = useId();
  return (
    <div className="ku-field">
      <label htmlFor={id ?? auto}>{label}</label>
      <InputNumber {...props} id={id ?? auto} />
    </div>
  );
}
export function DateField({
  label,
  id,
  ...props
}: DatePickerProps & { label: string }) {
  const auto = useId();
  return (
    <div className="ku-field">
      <label htmlFor={id ?? auto}>{label}</label>
      <DatePicker {...props} id={id ?? auto} />
    </div>
  );
}
