import type { Meta, StoryObj } from "@storybook/react-vite";
import { KooyaProvider, Button, Card, useKooyaFeedback } from "@kooyaph/ui";
const meta = {
  title: "Foundations/Provider and branding",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Single KooyaProvider synchronizes owned CSS tokens, Ant theme and contextual notifications. Use locally supplied font assets. Globals change theme, mode, composition, density and font. Accent overrides automatically derive readable text colors.",
      },
      source: {
        code: '<KooyaProvider theme="mosaic" composition="mosaic" density="comfortable" mode="dark" branding={{ accent: "#355d45" }} fontFamily="system-ui, sans-serif">\n  <YourApp />\n</KooyaProvider>',
      },
    },
  },
} satisfies Meta;
export default meta;
function Feedback() {
  const feedback = useKooyaFeedback();
  return (
    <div className="ku-template-toolbar">
      <Button onClick={() => feedback.message.success("Saved locally")}>
        Message
      </Button>
      <Button
        onClick={() =>
          feedback.notification.success({
            title: "Sample updated",
            description: "Contextual theme retained",
          })
        }
      >
        Notification
      </Button>
    </div>
  );
}
export const ContextualFeedback: StoryObj<typeof meta> = {
  render: () => (
    <Card title="Provider feedback">
      <Feedback />
    </Card>
  ),
};
export const Branding: StoryObj<typeof meta> = {
  render: () => (
    <KooyaProvider branding={{ accent: "#355d45" }}>
      <Card title="A consuming project’s identity">
        <Button variant="primary">Branded action</Button>
      </Card>
    </KooyaProvider>
  ),
};
