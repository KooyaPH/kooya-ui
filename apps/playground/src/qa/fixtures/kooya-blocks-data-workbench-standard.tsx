import { DataWorkbench } from "../../site/collections/data";

// Only supported props: stress records are entered through the real form in the browser.
export default function WorkbenchFixture({ profile }: { profile: string }) {
  if (profile !== "embedded")
    throw new Error(`Unsupported workbench profile: ${profile}`);
  return <DataWorkbench domain="projects" alternate={false} embedded />;
}
