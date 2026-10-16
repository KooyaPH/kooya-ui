import inventory from "./asset-map.json";
/** Resolve preserved upstream sample images without contacting an external host. */
export function localAsset(url: string) {
  const asset = (inventory.mapping as Record<string, string>)[url];
  if (!asset) throw new Error(`Unregistered sample image: ${url}`);
  return asset;
}
