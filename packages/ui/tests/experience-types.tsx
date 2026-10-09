import {
  BusyBoundary,
  ContentSkeleton,
  ErrorState,
  FeedbackState,
  TemplateFrame,
  FormTemplate,
  DataTable,
  InboxTemplate,
  Dialog,
  Tabs,
  WorkspaceHeader,
  WorkspaceSidebar,
  BentoShell,
  type SafeFailure,
  type DeviceMode,
  useDeviceMode,
  deviceBreakpoints,
  isEditableTarget,
} from "@kooyaph/ui";
import { ContentSkeleton as SkeletonMolecule } from "@kooyaph/ui/molecules";
import { useDeviceMode as DeviceFoundation } from "@kooyaph/ui/foundations";
const failure: SafeFailure = {
  publicCode: "PUBLIC_FAILURE",
  codeSource: "server",
  httpStatus: 503,
  recovery: "retry",
};
export function PublicExperience() {
  const mode: DeviceMode = useDeviceMode();
  DeviceFoundation();
  isEditableTarget(null);
  return (
    <>
      <p>
        {mode} {deviceBreakpoints.mobileMax}
      </p>
      <BusyBoundary busy skeleton="inbox">
        <p>Cached content</p>
      </BusyBoundary>
      <ContentSkeleton layout="form" />
      <SkeletonMolecule layout="table" />
      <ErrorState failure={failure} />
      <FeedbackState kind="permission-denied" />
      <TemplateFrame
        title="Example"
        state={{ status: "ready", refreshing: true, failure }}
      />
      <FormTemplate
        title="Form"
        onSubmit={(e) => e.preventDefault()}
        failure={failure}
      />
      <DataTable
        label="Records"
        rows={[{ id: "a" }]}
        rowKey={(r) => r.id}
        presentation="adaptive"
        columns={[
          {
            key: "id",
            title: "Record",
            mobileLabel: "Record",
            priority: "secondary",
            render: (r) => r.id,
          },
        ]}
      />
      <InboxTemplate
        title="Inbox"
        threads={[]}
        onSelectThread={() => {}}
        messages={[]}
        draft=""
        onDraftChange={() => {}}
        onSend={() => {}}
        mobilePane="conversations"
        onMobilePaneChange={() => {}}
      />
      <Dialog title="Task" mobilePresentation="task">
        <p>Body</p>
      </Dialog>
      <Tabs
        label="Sections"
        value="one"
        options={[{ value: "one", label: "One" }]}
        onValueChange={() => {}}
        orientation="vertical"
        activation="manual"
      >
        <p>Panel</p>
      </Tabs>
      <BentoShell
        navigationOpen={false}
        onNavigationOpenChange={() => {}}
        sidebar={
          <WorkspaceSidebar
            name="Demo"
            brand="K"
            groups={[]}
            selected=""
            presentation="expanded"
          />
        }
        header={
          <WorkspaceHeader
            name="Demo"
            area="Example"
            title="Records"
            collapsed={false}
            onNavigation={() => {}}
            onSearch={() => {}}
            searchShortcut="Ctrl K"
            onShortcutHelp={() => {}}
          />
        }
      >
        <p>Content</p>
      </BentoShell>
    </>
  );
}
