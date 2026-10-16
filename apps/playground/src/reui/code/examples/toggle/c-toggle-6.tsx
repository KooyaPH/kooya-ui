// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Toggle } from "../../../adapters/selection.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Toggle variant="outline" aria-label="Toggle bookmark">
        <IconPlaceholder
          lucide="BookmarkIcon"
          tabler="IconBookmark"
          hugeicons="Bookmark02Icon"
          phosphor="BookmarkSimpleIcon"
          remixicon="RiBookmarkLine"
          className="group-data-[state=on]/toggle:fill-accent-foreground"
        />
        Bookmark
      </Toggle>
    </div>
  )
}
