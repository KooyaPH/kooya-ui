// Owned responsive correction around the actual attributed REUI recipe.
// Keep the original grid, feature types, state, data and handlers together.
// @ts-expect-error attributed generated REUI module has no declaration file
import OriginalPattern from "../runtime/source/registry-reui/bases/radix/components/data-grid/c-data-grid-22.jsx";

export default function Pattern() {
  return (
    <div
      style={{ width: "100%", minWidth: 0 }}
      className="[&_[data-slot=card-header]]:flex-wrap [&_[data-slot=card-header]]:gap-3 [&_[data-slot=card-header]>div:first-child]:min-w-0 [&_[data-slot=card-header]>div:first-child]:flex-wrap [&_[data-slot=card-header]_[data-slot=input-group]]:max-w-full [&_[data-slot=card-action]]:shrink-0"
    >
      <OriginalPattern />
    </div>
  );
}
