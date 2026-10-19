import {
  KooyaProvider,
  SpaceSearchTrigger,
  WorkspaceHeader,
} from "@kooyaph/ui/legacy";
export default { title: "Organisms/Space search" };
export const Launcher = () => (
  <KooyaProvider>
    <SpaceSearchTrigger
      shortcut="Ctrl K"
      onClick={() => window.alert("Search requested")}
    />
  </KooyaProvider>
);
export const HostNavigation = () => (
  <KooyaProvider>
    <WorkspaceHeader
      presentation="utility"
      name="Harbor Studio"
      area="Workspace"
      title="Home"
      collapsed={false}
      hideNavigationTrigger
      onNavigation={() => {}}
      onSearch={() => {}}
    />
  </KooyaProvider>
);
