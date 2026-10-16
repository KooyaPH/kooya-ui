import React, { useState } from "react";
import {
  Alert,
  Button,
  Drawer,
  DatePicker,
  Empty,
  Form,
  Input,
  Space,
  Spin,
} from "@kooyaph/ui/components";

/** Private audit fixture. Exercises actual exported Ant props without changing the catalog demo. */
export default function DrawerAuditFixture({
  profile = "default",
}: {
  profile?: string;
}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form] = Form.useForm();
  const long = profile === "long";
  const loading = profile === "loading";
  const label = long
    ? "Project name for the international engineering and customer experience workspace"
    : "Project name";
  const close = () => setOpen(false);
  return (
    <>
      <Button
        onClick={() => {
          setSaved(false);
          setOpen(true);
        }}
      >
        Open drawer
      </Button>
      {saved && <div role="status">Project settings saved</div>}
      <Drawer
        title={
          long
            ? "Project settings for the international engineering and customer experience workspace"
            : "Project settings"
        }
        open={open}
        onClose={close}
        size={378}
        footer={
          <Space wrap>
            <Button onClick={close}>Cancel</Button>
            <Button
              type="primary"
              disabled={loading || profile === "empty"}
              loading={loading}
              onClick={() => form.submit()}
            >
              Save changes
            </Button>
          </Space>
        }
      >
        {profile === "empty" ? (
          <Empty description="No project settings available" />
        ) : (
          <Form
            form={form}
            name="drawerAudit"
            layout="vertical"
            initialValues={{
              projectName: profile === "error" ? "" : "Kooya Studio",
            }}
            onFinish={() => {
              setSaved(true);
              close();
            }}
          >
            {profile === "error" && (
              <Alert
                type="error"
                title="Project settings need attention"
                description="Enter a project name before saving."
                showIcon
              />
            )}
            <Form.Item
              name="projectName"
              label={label}
              rules={[{ required: true, message: "Enter a project name" }]}
            >
              <Input disabled={loading} />
            </Form.Item>
            {profile === "nested" && (
              <Form.Item name="reviewDate" label="Review date">
                <DatePicker />
              </Form.Item>
            )}
            {loading && (
              <Spin description="Loading project settings">
                <div aria-busy="true" style={{ height: 120 }}>
                  Loading project settings
                </div>
              </Spin>
            )}
            {long &&
              Array.from({ length: 30 }, (_, i) => (
                <p key={i}>
                  Section {i + 1}: Settings for the international workspace,
                  including project ownership and notification preferences. This
                  fictional content verifies that long drawer bodies scroll
                  while footer actions remain available.
                </p>
              ))}
          </Form>
        )}
      </Drawer>
    </>
  );
}
