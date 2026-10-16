import { lazy, Suspense, useEffect, useState } from "react";
const WorkspaceV1 = lazy(() => import("./WorkspaceV1"));
const WorkspaceStress = lazy(() => import("./WorkspaceStress"));
const LibrarySite = lazy(() => import("./site/Site"));
export default function App() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const update = () => setHash(location.hash);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const isLab =
    !hash ||
    /^#\/?(?:overview|explore|frame|compare)(?:\/|\?|$)/.test(hash) ||
    hash === "#/";
  return (
    <Suspense
      fallback={
        <div role="status" style={{ padding: 40, fontFamily: "sans-serif" }}>
          Opening your workspace…
        </div>
      }
    >
      {hash.startsWith("#/stress") ? (
        <WorkspaceStress />
      ) : isLab || hash.startsWith("#/workspace") ? (
        <WorkspaceV1 />
      ) : (
        <LibrarySite />
      )}
    </Suspense>
  );
}
