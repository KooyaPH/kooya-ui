import { useEffect, useRef, type FocusEvent } from "react";

// Native inputs can be shorter than their wrapping affixes. Reveal the painted
// keyboard cue in its own Drawer scroller, without moving document scroll/focus.
const handled = new WeakSet<Event>();
export function useDrawerInputFocus() {
  const active = useRef<{ input: HTMLInputElement; stop: () => void } | null>(null);
  const clear = () => {
    active.current?.stop();
    active.current = null;
  };
  useEffect(() => clear, []);
  return {
    focus(event: FocusEvent<HTMLDivElement>) {
      if (event.defaultPrevented || event.isPropagationStopped() || handled.has(event.nativeEvent)) return;
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || !input.matches("input.ant-input") || input.ownerDocument.activeElement !== input) return;
      const body = input.closest<HTMLElement>(".ku-drawer-body");
      if (!body) return;
      const affix = input.parentElement?.matches(".ant-input-affix-wrapper") ? input.parentElement : null;
      const owner = affix ?? input;
      const group = owner.parentElement?.matches(".ant-input-group") ? owner.parentElement : null;
      const cue = group ?? affix ?? input;
      handled.add(event.nativeEvent);
      clear();
      let frame = 0;
      const update = () => {
        if (event.defaultPrevented || event.isPropagationStopped() || !input.isConnected || input.ownerDocument.activeElement !== input) {
          clear();
          return;
        }
        const bounds = body.getBoundingClientRect();
        const top = bounds.top + body.clientTop;
        const bottom = top + body.clientHeight;
        const height = cue.getBoundingClientRect().height;
        const mode = height + 12 <= body.clientHeight ? "normal" : height <= body.clientHeight ? "inset" : "editable";
        cue.dataset.kuFocusContainment = mode;
        if (!input.matches(":focus-visible")) return;
        const rect = (mode === "editable" ? input : cue).getBoundingClientRect();
        const margin = mode === "normal" ? 6 : mode === "inset" ? 0 : 3;
        if (rect.top < top + margin) body.scrollTop += rect.top - top - margin;
        else if (rect.bottom > bottom - margin) body.scrollTop += rect.bottom - bottom + margin;
      };
      const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      });
      observer?.observe(body);
      observer?.observe(cue);
      active.current = { input, stop() {
        observer?.disconnect();
        cancelAnimationFrame(frame);
        delete cue.dataset.kuFocusContainment;
      } };
      // Portal events can reach ancestor providers. Let all caller handlers run
      // before changing their scroll position or choosing the painted cue.
      frame = requestAnimationFrame(update);
    },
    blur(event: FocusEvent<HTMLDivElement>) {
      if (event.target === active.current?.input) clear();
    },
  };
}
