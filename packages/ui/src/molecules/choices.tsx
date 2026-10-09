import { Select, type RefSelectProps } from "antd";
import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";

export interface ChoiceOption {
  value: string;
  /** Plain accessible/filter/selected text; display can include decorative rich content. */
  label: string;
  display?: ReactNode;
  disabled?: boolean;
}
interface ChoiceSelectBaseProps {
  label: string;
  options: readonly ChoiceOption[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  searchValue?: string;
  onSearch?: (query: string) => void;
  /** false for application-filtered/remote options. */
  filterOption?: false | ((query: string, option: ChoiceOption) => boolean);
  loading?: boolean;
  loadingContent?: ReactNode;
  /** Persistent status after the combobox; may include a keyboard-reachable Retry button. */
  error?: ReactNode;
  /** Noninteractive message within the empty option list. Put actions in footer. */
  emptyContent?: ReactNode;
  /** Persistent actions after the combobox/status, outside the transient option popup. */
  footer?: ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
}
export type ChoiceSelectProps = ChoiceSelectBaseProps &
  (
    | {
        multiple?: false;
        value?: string;
        onValueChange: (value: string) => void;
      }
    | {
        multiple: true;
        value: string[];
        onValueChange: (value: string[]) => void;
      }
  );
export interface ChoiceSelectRef {
  focus(options?: FocusOptions): void;
  blur(): void;
}

/** Searchable choices with Ant-owned option keyboard, selection and popup behavior. */
export const ChoiceSelect = forwardRef<ChoiceSelectRef, ChoiceSelectProps>(
  function ChoiceSelect(props, ref) {
    const select = useRef<RefSelectProps>(null);
    useImperativeHandle(
      ref,
      () => ({
        focus: (options) => select.current?.focus(options),
        blur: () => select.current?.blur(),
      }),
      [],
    );
    const {
      label,
      options,
      open,
      defaultOpen,
      onOpenChange,
      searchValue,
      onSearch,
      filterOption,
      loading,
      loadingContent = "Loading…",
      error,
      emptyContent = "No options found",
      footer,
      disabled,
      autoFocus,
      placeholder,
      className = "",
    } = props;
    const state = error ? (
      <div role="alert">{error}</div>
    ) : loading ? (
      <div role="status">{loadingContent}</div>
    ) : null;
    return (
      <div className="ku-choice-field">
        <Select<string | string[], ChoiceOption>
          ref={select}
          aria-label={label}
          aria-busy={loading || undefined}
          status={error ? "error" : undefined}
          className={`ku-select ku-choice-select ${className}`}
          virtual={false}
          options={options.map((option) => ({
            ...option,
            "aria-label": option.label,
          }))}
          value={props.value}
          mode={props.multiple ? "multiple" : undefined}
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          showSearch={{
            searchValue,
            onSearch,
            optionFilterProp: "label",
            filterOption:
              typeof filterOption === "function"
                ? (query, option) => !!option && filterOption(query, option)
                : filterOption,
          }}
          optionRender={(option) => option.data.display ?? option.data.label}
          optionLabelProp="label"
          loading={loading}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          notFoundContent={state ? null : emptyContent}
          onChange={(value) => {
            if (props.multiple)
              props.onValueChange(Array.isArray(value) ? value : [value]);
            else if (typeof value === "string") props.onValueChange(value);
          }}
        />
        {state && <div className="ku-choice-state">{state}</div>}
        {footer && <div className="ku-choice-footer">{footer}</div>}
      </div>
    );
  },
);
