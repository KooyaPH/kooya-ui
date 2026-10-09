import { useState } from "react";
import {
  FocusedToolTemplate,
  Button,
  FilterChip,
  Chip,
  type TemplateState,
} from "@kooyaph/ui";
export function ToolExample({ state }: { state?: TemplateState }) {
  const [kind, setKind] = useState("meeting");
  const [active, setActive] = useState(false);
  return (
    <FocusedToolTemplate
      title="Focused tool framing"
      description="Presentational slots for a meeting, game or map engine."
      state={state}
      toolLabel={kind + " stage"}
      toolbar={
        <>
          {["meeting", "game", "map"].map((k) => (
            <FilterChip
              key={k}
              selected={kind === k}
              onClick={() => {
                setKind(k);
                setActive(false);
              }}
            >
              {k === "meeting" ? "Meeting" : k === "game" ? "Game" : "Map"}
            </FilterChip>
          ))}
        </>
      }
      stage={
        <div className="tool-placeholder">
          <h2>
            {kind === "meeting"
              ? "Studio meeting"
              : kind === "game"
                ? "Team game"
                : "Project locations"}
          </h2>
          <p>
            {kind === "meeting"
              ? "The consuming application supplies participants and media."
              : kind === "game"
                ? "The consuming application supplies the game rules and renderer."
                : "The consuming application supplies tiles and location controls."}
          </p>
          <Button onClick={() => setActive(!active)}>
            {active ? "Pause local preview" : "Start local preview"}
          </Button>
          <p role="status">{active ? "Preview running" : "Preview paused"}</p>
        </div>
      }
      inspector={
        <>
          <Chip>Local framing sample</Chip>
          <p>Maya Chen · Alex Stone</p>
          <p>Ready for your engine slot.</p>
        </>
      }
    />
  );
}
