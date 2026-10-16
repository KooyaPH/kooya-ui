import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Dropdown,
  Input,
  Menu,
  Modal,
  Radio,
  Select,
  Space,
  Steps,
  Switch,
  Tabs,
  Tooltip,
} from "@kooyaph/ui/components";
import {
  KooyaProvider,
  useKooyaFeedback,
  type ColorMode,
  type Density,
} from "@kooyaph/ui/foundations";
import "../src/styles.css";

function Controls() {
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const feedback = useKooyaFeedback();
  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <Button type="primary">Continue</Button>
      <Button type="primary" danger>
        Danger action
      </Button>
      <Tooltip title="Local tooltip">
        <Button>Hover hint</Button>
      </Tooltip>
      <Input aria-label="Fictional name" placeholder="Name" />
      <Select
        aria-label="Office"
        defaultValue="local"
        options={[
          { value: "local", label: "Local office" },
          { value: "other", label: "Other office" },
        ]}
        style={{ width: 220 }}
      />
      <DatePicker aria-label="Local date" />
      <Checkbox defaultChecked>Selected checkbox</Checkbox>
      <Radio.Group defaultValue="local">
        <Radio value="local">Selected radio</Radio>
        <Radio value="other">Other radio</Radio>
      </Radio.Group>
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        defaultValue="local"
        options={[
          { value: "local", label: "Selected radio button" },
          { value: "other", label: "Other radio button" },
        ]}
      />
      <Steps
        current={1}
        items={[{ title: "Done" }, { title: "Active step" }, { title: "Next" }]}
      />
      <Switch defaultChecked aria-label="Local updates" />
      <Tabs
        defaultActiveKey="one"
        items={[
          { key: "one", label: "Selected tab", children: "First panel" },
          { key: "two", label: "Other tab", children: "Second panel" },
        ]}
      />
      <Menu
        mode="horizontal"
        selectedKeys={["one"]}
        items={[
          { key: "one", label: "Selected menu" },
          { key: "two", label: "Other menu" },
        ]}
      />
      <Dropdown
        menu={{ items: [{ key: "one", label: "Local menu option" }] }}
        trigger={["click"]}
      >
        <Button>Open dropdown</Button>
      </Dropdown>
      <Space wrap>
        <Button onClick={() => setModal(true)}>Open modal</Button>
        <Button onClick={() => setDrawer(true)}>Open drawer</Button>
        <Button
          onClick={() =>
            feedback.notification.success({ title: "Local notification" })
          }
        >
          Notify
        </Button>
        <Button
          onClick={() =>
            feedback.modal.confirm({ title: "Local confirmation" })
          }
        >
          Confirm
        </Button>
      </Space>
      <Modal
        open={modal}
        title="Local modal"
        onCancel={() => setModal(false)}
        onOk={() => setModal(false)}
      >
        Fictional modal content
      </Modal>
      <Drawer
        open={drawer}
        title="Local drawer"
        onClose={() => setDrawer(false)}
      >
        Fictional drawer content
      </Drawer>
    </Space>
  );
}
function Fixture() {
  const [mode, setMode] = useState<ColorMode>("light");
  const [density, setDensity] = useState<Density>("comfortable");
  return (
    <KooyaProvider
      mode={mode}
      density={density}
      style={{ minHeight: "100vh", padding: 24 }}
    >
      <Space wrap style={{ marginBottom: 24 }}>
        <Button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
          Toggle mode
        </Button>
        <Button
          onClick={() =>
            setDensity(density === "comfortable" ? "compact" : "comfortable")
          }
        >
          Toggle density
        </Button>
      </Space>
      <Controls />
    </KooyaProvider>
  );
}
createRoot(document.getElementById("root")!).render(<Fixture />);
