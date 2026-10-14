import { useMemo, useState } from "react";
import { useKooyaOptions } from "@kooyaph/ui";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { Typography } from "@kooyaph/ui/components";
import "./advanced.css";
// Host the installed engine's fonts at this local path; never use its CDN fallback.
(
  window as unknown as Window & { EXCALIDRAW_ASSET_PATH: string }
).EXCALIDRAW_ASSET_PATH = "/excalidraw-assets/";
export default function WhiteboardDemo({
  alternate = false,
}: {
  alternate?: boolean;
}) {
  const elements = useMemo(
    () =>
      alternate
        ? convertToExcalidrawElements([
            {
              type: "rectangle",
              x: 80,
              y: 80,
              width: 200,
              height: 140,
              backgroundColor: "#d3f9d8",
              label: { text: "Discover\nTalk to the team", fontFamily: 2 },
            },
            {
              type: "rectangle",
              x: 360,
              y: 80,
              width: 200,
              height: 140,
              backgroundColor: "#fff3bf",
              label: { text: "Prototype\nTest one idea", fontFamily: 2 },
            },
            {
              type: "arrow",
              x: 285,
              y: 150,
              width: 70,
              height: 0,
              points: [
                [0, 0],
                [70, 0],
              ],
            },
          ])
        : [],
    [alternate],
  );
  const [count, setCount] = useState(elements.length);
  const { mode } = useKooyaOptions();
  return (
    <section className="advanced-demo">
      <Typography.Title level={4}>
        {alternate ? "Planning canvas" : "Team whiteboard"}
      </Typography.Title>
      <p>
        Draw, select, move and delete shapes. {count} visible elements. This
        canvas stays local to the preview.
      </p>
      <div className="advanced-whiteboard">
        <Excalidraw
          theme={mode}
          initialData={{
            elements,
            scrollToContent: alternate,
            appState: {
              viewBackgroundColor: alternate ? "#f2eee3" : "#ffffff",
              currentItemFontFamily: 2,
            },
          }}
          onChange={(elements) =>
            setCount(elements.filter((element) => !element.isDeleted).length)
          }
          UIOptions={{
            canvasActions: {
              loadScene: false,
              saveToActiveFile: false,
              export: false,
              toggleTheme: false,
            },
            tools: { image: false },
          }}
        />
      </div>
    </section>
  );
}
export { WhiteboardDemo };
