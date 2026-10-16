import { KooyaProvider, useKooyaOptions } from "@kooyaph/ui";
import { DataWorkbench } from "../../site/collections/data";

// Actual public provider presets and actual DataWorkbench. No record injection,
// token substitution, markup clone, or component implementation lives here.
export default function WorkbenchPresetReview({ profile }: { profile: string }) {
  const { mode, density, composition, reducedMotion } = useKooyaOptions();
  if (
    profile !== "signature" &&
    profile !== "canvas" &&
    profile !== "client" &&
    profile !== "mosaic"
  ) {
    throw new Error(`Unsupported actual workbench preset: ${profile}`);
  }
  return (
    <KooyaProvider
      theme={profile}
      mode={mode}
      density={density}
      composition={composition}
      reducedMotion={reducedMotion}
    >
      <DataWorkbench domain="projects" alternate={false} embedded={false} />
    </KooyaProvider>
  );
}
