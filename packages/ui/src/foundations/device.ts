import { useSyncExternalStore } from "react";
/** Shared viewport contract; CSS seams mirror these exact token values. */
export const deviceBreakpoints = { mobileMax: 640, tabletMax: 1100 } as const;
export type DeviceMode = "mobile" | "tablet" | "desktop";
const queries = [
  `(max-width: ${deviceBreakpoints.mobileMax}px)`,
  `(max-width: ${deviceBreakpoints.tabletMax}px)`,
];
let media: MediaQueryList[] | undefined;
const listeners = new Set<() => void>();
function getMedia() {
  return (media ??= queries.map((q) => window.matchMedia(q)));
}
function changed() {
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  if (!listeners.size)
    getMedia().forEach((m) => m.addEventListener("change", changed));
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      media?.forEach((m) => m.removeEventListener("change", changed));
      media = undefined;
    }
  };
}
function snapshot(): DeviceMode {
  const [mobile, tablet] = getMedia();
  return mobile.matches ? "mobile" : tablet.matches ? "tablet" : "desktop";
}
/** One shared subscription, no UA inference; SSR starts desktop then hydrates. */
export function useDeviceMode(): DeviceMode {
  return useSyncExternalStore(subscribe, snapshot, () => "desktop");
}
/** Product-owned shortcut handlers can use this guard; this module binds no keys. */
export function isEditableTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    !!target.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"]',
    )
  );
}
