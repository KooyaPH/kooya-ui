import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
// Ant keeps generated component rules after the final subscriber unmounts.
// In JSDOM these accumulate across otherwise isolated fixtures and make real
// computed-style/pointer checks progressively expensive. Preserve pre-existing
// styles and remove only this test's generated Ant sheets, after React unmounts.
let existingAntStyles: Set<Element>;
beforeEach(() => {
  existingAntStyles = new Set(document.querySelectorAll("style[data-css-hash]"));
});
afterEach(() => {
  cleanup();
  document.querySelectorAll("style[data-css-hash]").forEach((style) => {
    if (!existingAntStyles.has(style)) style.remove();
  });
});
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  })),
});
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
Element.prototype.scrollIntoView = () => {};
// jsdom does not implement pseudo-element computed styles used by Ant scroll measurement.
const getComputedStyle = window.getComputedStyle;
window.getComputedStyle = (element) => getComputedStyle(element);
