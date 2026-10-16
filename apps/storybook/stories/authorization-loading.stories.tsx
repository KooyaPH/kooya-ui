import type { Meta, StoryObj } from "@storybook/react-vite";
import { KooyaProvider } from "@kooyaph/ui";
import AuthorizationDemo from "../../playground/src/site/collections/authorization";
import LoadingPatterns from "../../playground/src/site/collections/loading";
const meta: Meta = {
  title: "V1/Connections and loading",
  decorators: [
    (Story) => (
      <KooyaProvider>
        <Story />
      </KooyaProvider>
    ),
  ],
};
export default meta;
export const PermissionReview: StoryObj = {
  render: () => <AuthorizationDemo />,
};
export const RepositorySelection: StoryObj = {
  render: () => <AuthorizationDemo variant="repositories" />,
};
export const Authorizing: StoryObj = {
  render: () => <AuthorizationDemo variant="authorizing" />,
};
export const Approved: StoryObj = {
  render: () => <AuthorizationDemo variant="approved" />,
};
export const Cancelled: StoryObj = {
  render: () => <AuthorizationDemo variant="denied" />,
};
export const Recovery: StoryObj = {
  render: () => <AuthorizationDemo variant="error" />,
};
export const LongText: StoryObj = {
  render: () => <AuthorizationDemo variant="long-text" />,
};
export const TableValues: StoryObj = { render: () => <LoadingPatterns /> };
export const MetricValues: StoryObj = {
  render: () => <LoadingPatterns variant="metrics" />,
};
export const DetailValues: StoryObj = {
  render: () => <LoadingPatterns variant="detail" />,
};
export const ActionProgress: StoryObj = {
  render: () => <LoadingPatterns variant="action" />,
};
