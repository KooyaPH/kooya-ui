/** Original REUI autocomplete compound API, controlled by actual Ant AutoComplete. */
import React, {
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AutoComplete,
  Button,
  Input,
  type AutoCompleteProps,
  type ButtonProps,
  type InputProps,
} from "@kooyaph/ui/components";
import { findParts, role, text, type PartProps } from "./parts";

type RenderChildren<T = unknown> =
  | ReactNode
  | ((item: T, index: number) => ReactNode);
interface CollectionProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: RenderChildren<T>;
  items?: readonly T[];
}
interface Option {
  value: string;
  label: ReactNode;
  original: unknown;
  disabled?: boolean;
  key?: React.Key;
}
interface GroupOption {
  label: ReactNode;
  options: Option[];
  key?: React.Key;
}
interface ContextValue {
  value: string;
  open: boolean;
  setValue: (value: string) => void;
  setOpen: (open: boolean) => void;
  disabled: boolean;
}
const Context = createContext<ContextValue | null>(null);
function context() {
  const value = useContext(Context);
  if (!value)
    throw Error("Autocomplete parts must be used within Autocomplete");
  return value;
}
function mark<T>(component: T, name: string): T {
  Object.assign(component as object, { recipeRole: name, displayName: name });
  return component;
}
function marker<T = React.HTMLAttributes<HTMLDivElement>>(name: string) {
  return mark((_props: T) => null, name);
}
export interface AutocompleteProps<T = unknown>
  extends Omit<
    AutoCompleteProps,
    | "items"
    | "options"
    | "children"
    | "filterOption"
    | "onChange"
    | "value"
    | "defaultValue"
    | "open"
    | "defaultOpen"
  > {
  children?: ReactNode;
  items?: readonly T[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (
    value: string,
    details?: { reason: string; event?: unknown },
  ) => void;
  itemToStringValue?: (item: T) => string;
  itemToStringLabel?: (item: T) => string;
  filter?: ((item: T, query: string) => boolean) | null;
  autoHighlight?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details?: { reason: string }) => void;
}
export function useFilter(
  options: Intl.CollatorOptions & { locale?: string | string[] } = {},
) {
  const key = JSON.stringify(options);
  return useMemo(() => {
    const { locale, ...collatorOptions } = options,
      collator = new Intl.Collator(locale, {
        usage: "search",
        sensitivity: "base",
        ...collatorOptions,
      });
    const equal = (a: string, b: string) => collator.compare(a, b) === 0;
    const contains = (value: string, query: string) => {
      if (!query) return true;
      for (let start = 0; start <= value.length - query.length; start++)
        if (equal(value.slice(start, start + query.length), query)) return true;
      return false;
    };
    return {
      contains,
      startsWith: (value: string, query: string) =>
        equal(value.slice(0, query.length), query),
      endsWith: (value: string, query: string) =>
        equal(value.slice(-query.length), query),
    };
    // The serialized options keep the matcher stable for original async effects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
function Root<T>({
  children,
  items = [],
  value,
  defaultValue = "",
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  itemToStringValue,
  itemToStringLabel,
  filter,
  autoHighlight,
  disabled = false,
  className,
  style,
  ...props
}: AutocompleteProps<T>) {
  const [localValue, setLocalValue] = useState(defaultValue),
    [localOpen, setLocalOpen] = useState(defaultOpen);
  const currentValue = value ?? localValue,
    currentOpen = open ?? localOpen;
  const input = findParts(children, ["AutocompleteInput"])[0];
  const content = findParts(children, ["AutocompleteContent"])[0];
  const empty = findParts(content?.props.children, ["AutocompleteEmpty"])[0];
  const statuses = findParts(content?.props.children, ["AutocompleteStatus"]);
  const toString = (item: unknown) => {
    if (typeof item === "string" || typeof item === "number")
      return String(item);
    if (itemToStringValue) return itemToStringValue(item as T);
    const object = item as Record<string, unknown> | null;
    return String(object?.value ?? object?.label ?? object?.name ?? "");
  };
  const compile = (
    nodes: RenderChildren,
    collection: readonly unknown[],
  ): (Option | GroupOption)[] => {
    if (typeof nodes === "function")
      return collection.flatMap((item, index) =>
        compile(nodes(item, index), collection),
      );
    const result: (Option | GroupOption)[] = [];
    React.Children.forEach(nodes, (child) => {
      if (!isValidElement<PartProps>(child)) return;
      const name = role(child);
      if (name === "AutocompleteItem") {
        const original = child.props.value,
          itemValue = toString(original);
        const label = (
          <span className={child.props.className} data-slot="autocomplete-item">
            {child.props.children}
          </span>
        );
        result.push({
          value: itemValue,
          original,
          label: child.props.children
            ? label
            : itemToStringLabel
              ? itemToStringLabel(original as T)
              : itemValue,
          disabled: !!child.props.disabled,
          key: child.key ?? itemValue,
        });
      } else if (name === "AutocompleteGroup") {
        const groupItems = child.props.items as readonly unknown[] | undefined,
          groupLabel = findParts(child.props.children, [
            "AutocompleteGroupLabel",
          ])[0];
        const options = compile(
          child.props.children,
          groupItems ?? collection,
        ).flatMap((option) =>
          "options" in option ? option.options : [option],
        );
        result.push({
          label: groupLabel?.props.children,
          options,
          key: child.key ?? text(groupLabel?.props.children),
        });
      } else if (
        name === "AutocompleteList" ||
        name === "AutocompleteCollection"
      )
        result.push(
          ...compile(
            child.props.children as RenderChildren,
            (child.props.items as readonly unknown[] | undefined) ?? collection,
          ),
        );
      else if (
        name !== "AutocompleteGroupLabel" &&
        name !== "AutocompleteEmpty" &&
        name !== "AutocompleteStatus"
      )
        result.push(
          ...compile(child.props.children as RenderChildren, collection),
        );
    });
    return result;
  };
  const compiled = compile(content?.props.children, items);
  const matches = (option: Option) =>
    filter === null ||
    (filter
      ? filter(option.original as T, currentValue)
      : option.value
          .toLocaleLowerCase()
          .includes(currentValue.toLocaleLowerCase()));
  const filtered = compiled.flatMap<Option | GroupOption>((option) =>
    "options" in option
      ? [{ ...option, options: option.options.filter(matches) }].filter(
          (group) => group.options.length > 0,
        )
      : matches(option)
        ? [option]
        : [],
  );
  const count = filtered.reduce(
    (sum, option) => sum + ("options" in option ? option.options.length : 1),
    0,
  );
  // Ant intentionally hides a popup with zero options. A disabled status row
  // keeps the original async/loading/error/empty surface visible without being selectable.
  const options = count
    ? filtered
    : [
        {
          value: "__reui_autocomplete_empty__",
          label:
            empty?.props.children ??
            (statuses.length ? null : "No results found."),
          disabled: true,
        },
      ];
  const setValue = (next: string) => {
    if (value === undefined) setLocalValue(next);
    onValueChange?.(next, { reason: "input-change" });
  };
  const setOpen = (next: boolean) => {
    if (disabled) return;
    if (open === undefined) setLocalOpen(next);
    onOpenChange?.(next, { reason: next ? "input-press" : "dismiss" });
  };
  const inputProps = (input?.props ?? {}) as React.ComponentProps<
    typeof AutocompleteInput
  >;
  const {
    showClear,
    showTrigger,
    size,
    className: inputClassName,
    children: _inputChildren,
    ...fieldProps
  } = inputProps;
  const nativeSize =
    size === "sm" ? "small" : size === "lg" ? "large" : undefined;
  return (
    <Context.Provider
      value={{
        value: currentValue,
        open: currentOpen,
        setValue,
        setOpen,
        disabled,
      }}
    >
      <AutoComplete
        {...props}
        value={currentValue}
        onChange={setValue}
        open={content ? currentOpen : false}
        onOpenChange={setOpen}
        disabled={disabled}
        options={options}
        filterOption={false}
        defaultActiveFirstOption={!!autoHighlight}
        allowClear={showClear}
        className={className}
        style={{ width: "100%", ...style }}
        popupRender={(menu) => (
          <div
            className={content?.props.className}
            data-slot="autocomplete-popup"
          >
            {statuses.map((status, index) => (
              <AutocompleteStatus key={status.key ?? index} {...status.props}>
                {status.props.children}
              </AutocompleteStatus>
            ))}
            {menu}
          </div>
        )}
      >
        <Input
          {...(fieldProps as InputProps)}
          size={nativeSize}
          className={inputClassName}
          data-slot="autocomplete-input"
          onFocus={(event) => {
            fieldProps.onFocus?.(event);
            setOpen(true);
          }}
          suffix={
            showTrigger ? (
              <Button
                type="text"
                size="small"
                htmlType="button"
                aria-label="Show suggestions"
                disabled={disabled}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setOpen(!currentOpen)}
              >
                ⌄
              </Button>
            ) : undefined
          }
        />
      </AutoComplete>
    </Context.Provider>
  );
}
export const Autocomplete = Object.assign(Root, { useFilter });
mark(Autocomplete, "Autocomplete");
export function AutocompleteInput(
  _props: Omit<InputProps, "size"> & {
    size?: "sm" | "default" | "lg";
    showClear?: boolean;
    showTrigger?: boolean;
  },
) {
  return null;
}
mark(AutocompleteInput, "AutocompleteInput");
export const AutocompleteContent = marker<
  React.HTMLAttributes<HTMLDivElement> & {
    align?: string;
    sideOffset?: number;
    alignOffset?: number;
    side?: string;
    anchor?: unknown;
    showBackdrop?: boolean;
  }
>("AutocompleteContent");
export const AutocompleteList = mark(
  <T,>(_props: CollectionProps<T>) => null,
  "AutocompleteList",
);
export const AutocompleteCollection = mark(
  <T,>(_props: CollectionProps<T>) => null,
  "AutocompleteCollection",
);
export const AutocompleteGroup = mark(
  <T,>(_props: CollectionProps<T>) => null,
  "AutocompleteGroup",
);
export const AutocompleteItem = marker<
  Omit<React.HTMLAttributes<HTMLDivElement>, "value"> & {
    value: unknown;
    disabled?: boolean;
  }
>("AutocompleteItem");
export const AutocompleteGroupLabel = marker("AutocompleteGroupLabel");
export const AutocompleteEmpty = marker("AutocompleteEmpty");
export const AutocompletePortal = marker("AutocompletePortal");
export const AutocompleteBackdrop = marker("AutocompleteBackdrop");
export const AutocompletePositioner = marker("AutocompletePositioner");
export const AutocompleteArrow = marker("AutocompleteArrow");
export function AutocompleteStatus(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      role="status"
      aria-live="polite"
      data-slot="autocomplete-status"
    />
  );
}
mark(AutocompleteStatus, "AutocompleteStatus");
export function AutocompleteValue({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const value = context();
  return (
    <span {...props} data-slot="autocomplete-value">
      {children ?? value.value}
    </span>
  );
}
mark(AutocompleteValue, "AutocompleteValue");
export function AutocompleteRow(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-slot="autocomplete-row" />;
}
mark(AutocompleteRow, "AutocompleteRow");
export function AutocompleteSeparator(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return <div {...props} role="separator" data-slot="autocomplete-separator" />;
}
mark(AutocompleteSeparator, "AutocompleteSeparator");
export function AutocompleteClear(props: ButtonProps) {
  const value = context();
  return (
    <Button
      {...props}
      htmlType="button"
      type="text"
      disabled={value.disabled || props.disabled}
      aria-label={props["aria-label"] ?? "Clear suggestions"}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) value.setValue("");
      }}
    >
      ×
    </Button>
  );
}
export function AutocompleteTrigger(props: ButtonProps) {
  const value = context();
  return (
    <Button
      {...props}
      htmlType="button"
      type="text"
      disabled={value.disabled || props.disabled}
      aria-label={props["aria-label"] ?? "Show suggestions"}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) value.setOpen(!value.open);
      }}
    >
      ⌄
    </Button>
  );
}
