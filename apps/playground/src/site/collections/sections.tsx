import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Collapse,
  Descriptions,
  Divider,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
  Segmented,
  Select,
  Statistic,
  Steps,
  Switch,
  Table,
  Tag,
} from "@kooyaph/ui/components";
import { MetricGroup } from "@kooyaph/ui/compositions";
import { DemoFrame, optionList } from "./shared";
const features = [
  {
    title: "A clearer starting point",
    text: "Bring briefs, decisions and next steps into one shared place.",
  },
  {
    title: "Room for your process",
    text: "Choose a comfortable rhythm and shape the workspace around your team.",
  },
  {
    title: "A thoughtful handoff",
    text: "Keep the right context with every task, from first idea to final review.",
  },
];
export function SectionDemo({
  family = "hero",
  alternate = false,
  embedded = false,
}: {
  family?: string;
  alternate?: boolean;
  embedded?: boolean;
}) {
  const [dialog, setDialog] = useState("");
  const [notice, setNotice] = useState("");
  const [selection, setSelection] = useState("Overview");
  const [annual, setAnnual] = useState(alternate);
  const [active, setActive] = useState(0);
  const [connected, setConnected] = useState<string[]>(["Calendar"]);
  const signup = (
    <Form
      layout="vertical"
      onFinish={(values) => {
        setNotice(
          `Thanks, ${values.name ?? values.email}. Your request is saved in this local preview.`,
        );
        setDialog("");
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save request locally
      </Button>
    </Form>
  );
  let content;
  switch (family) {
    case "navigation":
      content = (
        <div className="composition-stack">
          <div className="composition-row">
            <strong>NORTHSTAR STUDIO</strong>
            <Menu
              mode={alternate ? "vertical" : "horizontal"}
              selectedKeys={[selection]}
              onClick={({ key }) => setSelection(key)}
              items={["Overview", "Our work", "About", "Contact"].map(
                (label) => ({ key: label, label }),
              )}
            />
            <Button
              type="primary"
              onClick={() => setDialog("Start a conversation")}
            >
              Let’s talk
            </Button>
          </div>
          <Card title={selection}>
            {selection === "Contact" ? (
              signup
            ) : (
              <p>
                {selection === "Our work"
                  ? "Brand systems, useful interfaces and considered stories."
                  : selection === "About"
                    ? "A fictional independent studio for thoughtful teams."
                    : "Good work starts with a clear conversation."}
              </p>
            )}
          </Card>
        </div>
      );
      break;
    case "hero":
      content = (
        <div
          className={`composition-marketing-hero ${alternate ? "alternate" : ""}`}
        >
          <Tag>WORK WITH A LITTLE MORE CLARITY</Tag>
          <h2>
            {alternate
              ? "YOUR NEXT GOOD IDEA STARTS HERE."
              : "SMALL DETAILS. BETTER EVERYDAYS."}
          </h2>
          <p>
            Bring the right people, thoughtful tools, and a clear point of view
            to the work ahead.
          </p>
          <div className="composition-row">
            <Button
              type="primary"
              size="large"
              onClick={() => setDialog("Start your next project")}
            >
              Start a project ↗
            </Button>
            <Button size="large" onClick={() => setDialog("Our approach")}>
              Meet the studio
            </Button>
          </div>
        </div>
      );
      break;
    case "features":
    case "benefits":
      content = (
        <div className="composition-grid">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              title={
                family === "benefits"
                  ? [
                      "Less searching",
                      "Better alignment",
                      "Confident delivery",
                    ][index]
                  : feature.title
              }
            >
              <div className="composition-section-card">
                <Tag>0{index + 1}</Tag>
                <p>{feature.text}</p>
                <Button onClick={() => setDialog(feature.title)}>
                  Explore {family === "features" ? "feature" : "benefit"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      );
      break;
    case "logos":
      content = (
        <div className="composition-stack">
          <p>Fictional teams in this design example</p>
          <div
            className={alternate ? "composition-grid" : "composition-logo-row"}
            style={
              alternate
                ? { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }
                : undefined
            }
          >
            {["NORTHSTAR", "FIELDWORK", "HARBOR", "PAPERWORKS"].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <Button onClick={() => setDialog("About the fictional teams")}>
            Meet the example teams
          </Button>
        </div>
      );
      break;
    case "testimonials":
      content = (
        <div className="composition-grid">
          {[
            "Maya Chen",
            "Jordan Lee",
            ...(alternate ? ["Alex Stone"] : []),
          ].map((name, index) => (
            <Card key={name}>
              <blockquote>
                <p>
                  “
                  {index
                    ? "The right context makes every handoff feel easier."
                    : "A clear place to plan, make and move forward together."}
                  ”
                </p>
              </blockquote>
              <div className="composition-row">
                <Avatar>{name[0]}</Avatar>
                <div>
                  <strong>{name}</strong>
                  <p className="composition-muted">
                    Fictional studio team member
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setDialog(`${name}’s fictional project story`)}
              >
                Read story
              </Button>
            </Card>
          ))}
        </div>
      );
      break;
    case "team":
      content = (
        <div className="composition-grid">
          {["Maya Chen", "Jordan Lee", "Alex Stone"].map((name, index) => (
            <Card key={name}>
              <Avatar
                size={64}
                style={{ background: "#314300", color: "#f2eee3" }}
              >
                {name[0]}
              </Avatar>
              <h3 style={{ marginTop: 16 }}>{name}</h3>
              <p>
                {
                  ["Design director", "Product strategist", "Studio partner"][
                    index
                  ]
                }
              </p>
              <Button onClick={() => setDialog(`Meet ${name}`)}>
                View profile
              </Button>
            </Card>
          ))}
        </div>
      );
      break;
    case "statistics":
      content = (
        <div className="composition-stack">
          <MetricGroup
            metrics={[
              {
                key: "projects",
                label: "Demo projects",
                value: alternate ? 24 : 12,
              },
              { key: "team", label: "Sample teammates", value: 3 },
              {
                key: "tasks",
                label: "Completed demo tasks",
                value: active + 8,
              },
            ]}
          />
          <Button onClick={() => setActive((value) => value + 1)}>
            Complete a demo task
          </Button>
        </div>
      );
      break;
    case "process":
      content = (
        <div className="composition-stack">
          <Steps
            current={active}
            onChange={setActive}
            orientation={alternate ? "vertical" : "horizontal"}
            items={[
              {
                title: "Discover",
                content: "Understand the right problem.",
              },
              { title: "Make", content: "Build something useful." },
              { title: "Refine", content: "Improve with shared feedback." },
            ]}
          />
          <Card
            title={
              [
                "Discover the opportunity",
                "Make the first version",
                "Refine the details",
              ][active]
            }
          >
            {features[active].text}
          </Card>
          <Button onClick={() => setActive((value) => (value + 1) % 3)}>
            Next step
          </Button>
        </div>
      );
      break;
    case "integrations":
      content = (
        <div className="composition-grid">
          {["Calendar", "Documents", "Team chat", "Task board"].map((name) => (
            <Card title={name} key={name}>
              <p>Local integration preference example.</p>
              <Switch
                aria-label={`Enable ${name}`}
                checked={connected.includes(name)}
                onChange={(checked) =>
                  setConnected((current) =>
                    checked
                      ? [...current, name]
                      : current.filter((value) => value !== name),
                  )
                }
              />
              <span style={{ marginLeft: 12 }}>
                {connected.includes(name) ? "Enabled locally" : "Not enabled"}
              </span>
            </Card>
          ))}
        </div>
      );
      break;
    case "pricing":
      content = (
        <div className="composition-stack">
          <Segmented
            aria-label="Billing interval"
            value={annual ? "Annual" : "Monthly"}
            options={["Monthly", "Annual"]}
            onChange={(value) => setAnnual(value === "Annual")}
          />
          <div className="composition-grid">
            {["Solo", "Studio", "Team"].map((name, index) => (
              <Card title={name} key={name}>
                <Statistic
                  value={Math.round([12, 24, 48][index] * (annual ? 0.8 : 1))}
                  prefix="$"
                  suffix="/ month"
                />
                <p>
                  {
                    [
                      "A focused place for independent work.",
                      "A shared space for a small studio.",
                      "More room for a growing team.",
                    ][index]
                  }
                </p>
                <ul>
                  <li>Shared project space</li>
                  <li>{[3, 12, 40][index]} active projects</li>
                  <li>Local demo configuration</li>
                </ul>
                <Button
                  type={index === 1 ? "primary" : "default"}
                  onClick={() => {
                    setSelection(name);
                    setDialog(`Choose ${name}`);
                  }}
                >
                  Choose {name}
                </Button>
              </Card>
            ))}
          </div>
          <p className="composition-muted">
            Fictional pricing example. Selecting a plan never creates a
            subscription.
          </p>
        </div>
      );
      break;
    case "comparison":
      content = (
        <div className="composition-stack">
          {alternate ? (
            <div className="composition-grid">
              {["Solo", "Studio", "Team"].map((plan, index) => (
                <Card
                  key={plan}
                  title={plan}
                  extra={
                    selection === plan ? (
                      <Tag color="success">Selected</Tag>
                    ) : undefined
                  }
                >
                  <Descriptions
                    column={1}
                    items={[
                      {
                        key: "projects",
                        label: "Projects",
                        children: [3, 12, 40][index],
                      },
                      {
                        key: "members",
                        label: "Members",
                        children: [1, 5, 20][index],
                      },
                    ]}
                  />
                  <Button onClick={() => setSelection(plan)}>
                    Compare {plan}
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Table
              rowKey="feature"
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={[
                { feature: "Projects", solo: "3", studio: "12", team: "40" },
                { feature: "Members", solo: "1", studio: "5", team: "20" },
                {
                  feature: "Shared reviews",
                  solo: "Included",
                  studio: "Included",
                  team: "Included",
                },
              ]}
              columns={[
                { title: "Feature", dataIndex: "feature" },
                { title: "Solo", dataIndex: "solo" },
                { title: "Studio", dataIndex: "studio" },
                { title: "Team", dataIndex: "team" },
              ]}
            />
          )}
          <Radio.Group
            aria-label="Compare plan choice"
            options={["Solo", "Studio", "Team"]}
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
          />
          <Button
            onClick={() =>
              setNotice(
                `Selected ${selection === "Overview" ? "Studio" : selection} in this local comparison.`,
              )
            }
          >
            Use selected plan
          </Button>
        </div>
      );
      break;
    case "faq":
      content = (
        <Collapse
          accordion={!alternate}
          defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: "What is this workspace for?",
              children: (
                <p>
                  A local example of how a thoughtful studio might explain its
                  product.
                </p>
              ),
            },
            {
              key: "2",
              label: "Can I change the appearance?",
              children: (
                <p>
                  Use the catalog appearance menu. The same Kooya provider
                  themes every example.
                </p>
              ),
            },
            {
              key: "3",
              label: "Is any information sent?",
              children: (
                <p>No. All demo interactions stay in the current preview.</p>
              ),
            },
          ]}
        />
      );
      break;
    case "blog":
      content = (
        <div className="composition-grid">
          {[
            "A quieter way to launch",
            "The value of a clear brief",
            "Small details, better work",
          ].map((title, index) => (
            <Card title={title} key={title}>
              <Tag>{["Process", "Ideas", "Craft"][index]}</Tag>
              <p>{features[index].text}</p>
              <Button onClick={() => setDialog(title)}>Read article</Button>
            </Card>
          ))}
        </div>
      );
      break;
    case "contact":
      content = (
        <div
          className={
            alternate
              ? "composition-stack composition-form"
              : "composition-split"
          }
        >
          <div>
            <h3>Start with a conversation.</h3>
            <p>
              Tell the fictional Northstar team what you’re thinking about. This
              form stores only a local confirmation.
            </p>
            <p>hello@northstar.example</p>
          </div>
          <Form
            layout="vertical"
            onFinish={(values) =>
              setNotice(
                `Thanks, ${values.name}. Your message is ready locally; nothing was sent.`,
              )
            }
          >
            <Form.Item
              name="name"
              label="Your name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="message"
              label="What are you working on?"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Prepare message
            </Button>
          </Form>
        </div>
      );
      break;
    case "newsletter":
      content = (
        <div className="composition-panel">
          <h3>A good note, now and then.</h3>
          <p>Ideas on thoughtful work from this fictional studio.</p>
          <Form
            className="composition-newsletter-form"
            layout={alternate ? "vertical" : "inline"}
            onFinish={(values) =>
              setNotice(
                `${values.email} added to the local subscriber preview.`,
              )
            }
          >
            <Form.Item
              name="email"
              label="Email address"
              rules={[{ required: true, type: "email" }]}
            >
              <Input type="email" placeholder="you@example.com" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Subscribe locally
            </Button>
          </Form>
        </div>
      );
      break;
    case "cta":
      content = (
        <div
          className={`composition-marketing-hero ${alternate ? "alternate" : ""}`}
        >
          <h2>MAKE ROOM FOR WHAT’S NEXT.</h2>
          <p>One clear conversation can be the start of something useful.</p>
          <Button
            type="primary"
            size="large"
            onClick={() => setDialog("Let’s start a project")}
          >
            Let’s get started ↗
          </Button>
        </div>
      );
      break;
    case "footer":
      content = (
        <footer className="composition-panel">
          <div className={alternate ? "composition-stack" : "composition-row"}>
            <strong>NORTHSTAR STUDIO</strong>
            {["About", "Work", "Privacy", "Contact"].map((label) => (
              <Button type="text" key={label} onClick={() => setDialog(label)}>
                {label}
              </Button>
            ))}
          </div>
          {alternate && (
            <Form
              layout="vertical"
              onFinish={(values) =>
                setNotice(
                  `${values.email} saved to the local newsletter preview.`,
                )
              }
            >
              <Form.Item
                name="email"
                label="Studio notes"
                rules={[{ required: true, type: "email" }]}
              >
                <Input type="email" placeholder="you@example.com" />
              </Form.Item>
              <Button htmlType="submit">Subscribe locally</Button>
            </Form>
          )}
          <Divider />
          <p>A fictional studio. A local design example.</p>
          <p>© 2026 Northstar Studio</p>
        </footer>
      );
      break;
    default:
      content = (
        <div className="composition-grid">
          {features.map((feature) => (
            <Card key={feature.title} title={feature.title}>
              {feature.text}
            </Card>
          ))}
        </div>
      );
  }
  const body = (
    <>
      {content}
      <p role="status" className="composition-feedback">
        {notice}
      </p>
      <Modal
        title={dialog}
        open={!!dialog}
        onCancel={() => setDialog("")}
        footer={null}
      >
        {/start|conversation|Choose|project$/i.test(dialog) ? (
          signup
        ) : (
          <div className="composition-stack">
            <p>
              Northstar is a fictional studio focused on thoughtful, useful
              work. We start with a clear brief, work in the open, and refine
              together.
            </p>
            <p>
              This example keeps its content and interactions entirely in the
              local preview.
            </p>
            <Button
              type="primary"
              onClick={() => setDialog("Start a conversation")}
            >
              Start a conversation
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
  return embedded ? (
    <section className="composition-stack">{body}</section>
  ) : (
    <DemoFrame
      title={`${family.replace(/-/g, " ")} section`}
      alternate={alternate}
    >
      {body}
    </DemoFrame>
  );
}
