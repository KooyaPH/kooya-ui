# @kooyaph/ui v1

Kooya's reusable React design system for formal workspaces. Defaults: Kooya Olive, Light, Compact. Editorial supports work and content; Governance supports administration.

```tsx
import { KooyaProvider, WorkspaceShell } from "@kooyaph/ui";
import { Button } from "@kooyaph/ui/components";
import "@kooyaph/ui/styles.css";

<KooyaProvider palette="olive" mode="light" density="compact">
  <Button type="primary">Save changes</Button>
</KooyaProvider>;
```

Twelve palettes and custom accents share readable semantic roles in Light and Dark. `AppearancePicker` is controlled; applications own persistence and resolve System mode. `WorkspaceShell` provides responsive navigation, section navigation, content and inspector slots.

Components use canonical Ant Design 6.6.5 APIs, refs and compound exports. Previous Kooya wrapper contracts remain under `/legacy` for migration. Historical theme imports remain available, while active v1 defaults use Olive.

The provider owns a themed document-level overlay host so popups escape clipped page containers. Consumer popup styling can use `overlayClassName`. Respect reduced motion and retain focus restoration.

Requires React 18.3+ or 19, React DOM, and Ant Design 6.6.5. Source, design contracts, migration notes and the full catalogue are maintained at [KooyaPH/kooya-ui](https://github.com/KooyaPH/kooya-ui). Public immutable GitHub Release tarballs support installs without registry credentials. Licensed MIT; see THIRD_PARTY_NOTICES.md for attributed dependencies.
