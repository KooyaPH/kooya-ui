import { oliveTheme } from "./themes/olive";
import { canvasTheme } from "./themes/canvas";
import { clientTheme } from "./themes/client";
import { mosaicTheme } from "./themes/mosaic";
import { signatureTheme } from "./themes/signature";

export { oliveTheme, canvasTheme, clientTheme, mosaicTheme, signatureTheme };

export const themes = {
  olive: oliveTheme,
  mosaic: mosaicTheme,
  signature: signatureTheme,
  canvas: canvasTheme,
  client: clientTheme,
} as const;

export type KooyaThemeName = keyof typeof themes;
export type KooyaTheme = {
  name: string;
} & {
  [Key in Exclude<keyof typeof mosaicTheme, "name">]: string;
};
export type ThemeOption = KooyaThemeName | KooyaTheme;
