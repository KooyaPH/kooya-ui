import { useState } from "react";
import {
  ProfileTemplate,
  BusinessPageTemplate,
  ClientPortalTemplate,
  Button,
  TextField,
  Chip,
  Dialog,
  type TemplateState,
} from "@kooyaph/ui";
export function ProfileExample({ state }: { state?: TemplateState }) {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("Helping thoughtful teams launch good ideas.");
  return (
    <ProfileTemplate
      title="Team profile"
      state={state}
      name="Alex Stone"
      subtitle="Workspace owner · Northstar Studio"
      actions={
        <Button onClick={() => setEditing(!editing)}>
          {editing ? "Done editing" : "Edit profile"}
        </Button>
      }
      fields={[
        { id: "email", label: "Email", value: "alex@northstar.example" },
        { id: "timezone", label: "Timezone", value: "Asia/Singapore" },
        {
          id: "bio",
          label: "About",
          value: editing ? (
            <TextField
              label="About Alex"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            bio
          ),
        },
      ]}
      activity={<p>Reviewed the launch brief today.</p>}
    />
  );
}
export function BusinessExample({ state }: { state?: TemplateState }) {
  const [contact, setContact] = useState(false);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <>
      <BusinessPageTemplate
        title="Public business page"
        state={state}
        brand={<strong>Northstar Studio</strong>}
        navigation={
          <Button onClick={() => setContact(true)}>Contact the studio</Button>
        }
        hero={
          <>
            <p className="ku-eyebrow">THOUGHTFUL DESIGN</p>
            <h2>A clear next chapter for your business.</h2>
            <p>
              We bring brand, content and product design into one conversation.
            </p>
            <Button variant="primary" onClick={() => setContact(true)}>
              Start a conversation
            </Button>
          </>
        }
        sections={[
          {
            id: "services",
            title: "How we help",
            content: (
              <p>Brand strategy · Digital experiences · Content systems</p>
            ),
          },
          {
            id: "team",
            title: "A small, dedicated team",
            content: (
              <p>
                Maya Chen and Jordan Lee work together on every fictional
                project.
              </p>
            ),
          },
        ]}
        footer={<p>© 2026 Northstar Studio · Fictional business</p>}
      />
      <Dialog
        title="Contact Northstar"
        open={contact}
        onOpenChange={setContact}
      >
        <form
          className="ku-template-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) setSent(true);
          }}
        >
          <TextField
            label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" disabled={!name.trim()}>
            Send local inquiry
          </Button>
          {sent && (
            <p role="status">
              Thank you, {name}. Your inquiry is shown locally.
            </p>
          )}
        </form>
      </Dialog>
    </>
  );
}
export function PortalExample({ state }: { state?: TemplateState }) {
  const [approved, setApproved] = useState(false);
  const [resource, setResource] = useState(false);
  return (
    <ClientPortalTemplate
      title="Your client space"
      state={state}
      metrics={[
        {
          id: "projects",
          label: "Projects",
          value: "2",
          detail: "One awaiting review",
        },
        {
          id: "files",
          label: "Shared files",
          value: "8",
          detail: "Updated today",
        },
      ]}
      welcome={
        <>
          <h2>Welcome back, Alex.</h2>
          <p>Your launch project is ready for the next step.</p>
        </>
      }
      requests={
        <>
          <h3>Review the launch brief</h3>
          <Chip tone={approved ? "success" : "warning"}>
            {approved ? "Approved locally" : "Awaiting approval"}
          </Chip>
          <Button disabled={approved} onClick={() => setApproved(true)}>
            Approve brief
          </Button>
        </>
      }
      resources={
        <>
          <Button onClick={() => setResource(!resource)}>
            View project guide
          </Button>
          {resource && (
            <p>
              Review the brief, approve the artwork, and schedule your launch.
            </p>
          )}
        </>
      }
    />
  );
}
