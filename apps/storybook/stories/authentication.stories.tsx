import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AuthLayout,
  AuthMethodChoice,
  AuthWorkspacePreview,
} from "@kooyaph/ui";
const meta: Meta<typeof AuthLayout> = {
  title: "Compositions/Authentication",
  component: AuthLayout,
  args: {
    presentation: "split",
    brand: "KooyaHQ",
    title: "Sign in",
    introduction: (
      <>
        <h2>Your team. One workspace.</h2>
        <p>Plan projects, share updates and keep work moving.</p>
      </>
    ),
    visual: (
      <AuthWorkspacePreview
        columns={[
          { title: "Planned", cards: ["Define the next milestone"] },
          { title: "In progress", cards: ["Prepare the brief"] },
          { title: "Done", cards: ["Agree on the plan"] },
        ]}
      />
    ),
  },
};
export default meta;
export const SignIn: StoryObj<typeof meta> = {
  render: function Example(args) {
    const [method, setMethod] = useState<string>();
    return (
      <AuthLayout {...args}>
        <AuthMethodChoice
          googleAvailable
          onGoogle={() => setMethod("Google")}
          onEmail={() => setMethod("email")}
        />
        {method && (
          <p role="status">
            {method} selected. This example does not start a real sign-in.
          </p>
        )}
      </AuthLayout>
    );
  },
};
export const SignedOut: StoryObj<typeof meta> = {
  args: {
    title: "You are signed out",
    children: <p>Your session has ended. You can close this page.</p>,
  },
};
