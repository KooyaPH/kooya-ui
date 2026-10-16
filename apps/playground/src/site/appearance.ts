import {
  defaultAppearance,
  normalizeAppearance,
  type AppearancePreferences,
} from "@kooyaph/ui";
import type { Appearance } from "./model";
export function readLibraryAppearance(): Appearance {
  let value: AppearancePreferences = defaultAppearance;
  try {
    value = normalizeAppearance(
      JSON.parse(localStorage.getItem("kooya.ui.v1.appearance") ?? "null") ??
        defaultAppearance,
    );
  } catch {}
  return {
    ...value,
    preferredMode: value.mode,
    mode:
      value.mode === "system"
        ? matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : value.mode,
  };
}
export function storeLibraryAppearance(value: Appearance) {
  try {
    localStorage.setItem(
      "kooya.ui.v1.appearance",
      JSON.stringify({ ...value, mode: value.preferredMode ?? value.mode }),
    );
  } catch {}
}
