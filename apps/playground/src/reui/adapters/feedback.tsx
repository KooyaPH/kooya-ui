import React, { useEffect, type ReactNode } from "react";
import { App, Button } from "antd";

type Feedback = ReturnType<typeof App.useApp>;
let current: Feedback | undefined;
let sequence = 0;
type ToastOptions = {
  id?: string | number;
  description?: ReactNode;
  duration?: number;
  action?: { label: string; onClick: () => void };
  cancel?: { label: string; onClick?: () => void };
  onDismiss?: () => void;
};

export function FeedbackBridge() {
  const feedback = App.useApp();
  useEffect(() => {
    const previous = current;
    current = feedback;
    return () => {
      if (current === feedback) current = previous;
    };
  }, [feedback]);
  return null;
}

function show(
  content: ReactNode,
  options: ToastOptions = {},
  type: "success" | "error" | "warning" | "info" | "loading" = "info",
) {
  const key = options.id ?? `kooya-sample-${++sequence}`;
  if (!current) return key;
  const duration =
    options.duration === Infinity
      ? 0
      : options.duration === undefined
        ? 4
        : options.duration / 1000;
  if (options.description || options.action || options.cancel) {
    current.notification.open({
      key,
      title: content,
      description: options.description,
      duration,
      onClose: options.onDismiss,
      actions: (
        <>
          {options.cancel && (
            <Button
              onClick={() => {
                options.cancel?.onClick?.();
                current?.notification.destroy(key);
              }}
            >
              {options.cancel.label}
            </Button>
          )}
          {options.action && (
            <Button
              type="primary"
              onClick={() => {
                options.action?.onClick();
                current?.notification.destroy(key);
              }}
            >
              {options.action.label}
            </Button>
          )}
        </>
      ),
    });
  } else
    current.message.open({
      key,
      content,
      type,
      duration,
      onClose: options.onDismiss,
    });
  return key;
}

export const toast = Object.assign(
  (content: ReactNode, options?: ToastOptions) => show(content, options),
  {
    success: (content: ReactNode, options?: ToastOptions) =>
      show(content, options, "success"),
    error: (content: ReactNode, options?: ToastOptions) =>
      show(content, options, "error"),
    warning: (content: ReactNode, options?: ToastOptions) =>
      show(content, options, "warning"),
    info: (content: ReactNode, options?: ToastOptions) =>
      show(content, options, "info"),
    loading: (content: ReactNode, options?: ToastOptions) =>
      show(content, { ...options, duration: Infinity }, "loading"),
    message: (content: ReactNode, options?: ToastOptions) =>
      show(content, options),
    dismiss: (key?: string | number) => {
      current?.message.destroy(key);
      current?.notification.destroy(key);
    },
    custom: (
      render: (id: string | number) => ReactNode,
      options?: ToastOptions,
    ) => {
      const id = options?.id ?? `kooya-sample-${++sequence}`;
      return show(render(id), { ...options, id });
    },
    promise: <T,>(
      promise: Promise<T>,
      options: {
        loading: ReactNode;
        success: ReactNode | ((value: T) => ReactNode);
        error: ReactNode | ((error: unknown) => ReactNode);
      },
    ) => {
      const id = show(options.loading, { duration: Infinity }, "loading");
      promise.then(
        (value) =>
          show(
            typeof options.success === "function"
              ? options.success(value)
              : options.success,
            { id },
            "success",
          ),
        (error) =>
          show(
            typeof options.error === "function"
              ? options.error(error)
              : options.error,
            { id },
            "error",
          ),
      );
      return id;
    },
  },
);
export function Toaster() {
  return <FeedbackBridge />;
}
