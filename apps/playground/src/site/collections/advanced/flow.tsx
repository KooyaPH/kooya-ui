import { useKooyaOptions } from "@kooyaph/ui";
import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Connection,
} from "@xyflow/react";
import { Button, Typography } from "@kooyaph/ui/components";
import "@xyflow/react/dist/style.css";
import "./advanced.css";
export default function FlowDemo({
  alternate = false,
}: {
  alternate?: boolean;
}) {
  const { mode } = useKooyaOptions();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
    alternate
      ? [
          {
            id: "start",
            type: "input",
            position: { x: 200, y: 0 },
            data: { label: "Request received" },
          },
          {
            id: "review",
            position: { x: 200, y: 130 },
            data: { label: "Review scope" },
          },
          {
            id: "approve",
            type: "output",
            position: { x: 50, y: 280 },
            data: { label: "Approve and schedule" },
          },
          {
            id: "revise",
            type: "output",
            position: { x: 350, y: 280 },
            data: { label: "Request changes" },
          },
        ]
      : [
          {
            id: "start",
            position: { x: 0, y: 50 },
            data: { label: "New request" },
          },
          {
            id: "review",
            position: { x: 250, y: 50 },
            data: { label: "Approve" },
          },
        ],
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "start-review", source: "start", target: "review" },
    ...(alternate
      ? [
          {
            id: "review-approve",
            source: "review",
            target: "approve",
            label: "Ready",
          },
          {
            id: "review-revise",
            source: "review",
            target: "revise",
            label: "Needs revision",
          },
        ]
      : []),
  ]);
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((current) => addEdge(connection, current)),
    [setEdges],
  );
  return (
    <section className="advanced-demo">
      <div className="advanced-toolbar">
        <Typography.Title level={4}>Workflow editor</Typography.Title>
        <Button
          onClick={() =>
            setNodes((current) => [
              ...current,
              {
                id: crypto.randomUUID(),
                position: { x: current.length * 100, y: 180 },
                data: { label: `Step ${current.length + 1}` },
              },
            ])
          }
        >
          Add step
        </Button>
        <Button
          disabled={!nodes.some((node) => node.selected)}
          onClick={() => {
            const ids = nodes
              .filter((node) => node.selected)
              .map((node) => node.id);
            setNodes((current) =>
              current.filter((node) => !ids.includes(node.id)),
            );
            setEdges((current) =>
              current.filter(
                (edge) =>
                  !ids.includes(edge.source) && !ids.includes(edge.target),
              ),
            );
          }}
        >
          Remove selected
        </Button>
      </div>
      <p>
        Drag handles to connect steps. Select a step and press Delete to remove
        it. {nodes.length} steps, {edges.length} connections.
      </p>
      <div className="advanced-flow">
        <ReactFlow
          colorMode={mode}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          deleteKeyCode={["Backspace", "Delete"]}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </section>
  );
}
export { FlowDemo };
