// Owned correction for the adapted REUI recipe; retain the local adapters.
// Owned responsive correction around the actual attributed REUI recipe.
// Keep the actual typed grid body, data, feature state, and handlers together.
// @ts-expect-error attributed generated REUI module has no declaration file
import OriginalPattern from "../../../runtime/source/registry-reui/bases/radix/components/data-grid/c-data-grid-23.jsx";

export default function Pattern() {
  return (
    <div
      style={{ width: "100%", minWidth: 0 }}
      className="[&_[data-slot=frame-panel-header]>div]:min-w-0 [&_[data-slot=frame-panel-header]>div]:max-w-full [&_[data-slot=frame-panel-header]>div]:flex-wrap [&_[data-slot=frame-panel-header]_[data-slot=input-group]]:max-w-full [&_[data-slot=frame-panel-header]_button]:shrink-0"
    >
      <OriginalPattern />
    </div>
  );
}
