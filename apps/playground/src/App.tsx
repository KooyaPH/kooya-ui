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
  return (
    <Suspense
      fallback={
        <div role="status" style={{ padding: 40, fontFamily: "sans-serif" }}>
          Opening Kooya UI…
        </div>
      }
    >
      {hash.startsWith("#/stress") ? (
        <WorkspaceStress />
      ) : hash.startsWith("#/workspace") ||
        /^#\/(explore|frame|compare)/.test(hash) ? (
        <WorkspaceV1 />
      ) : (
        <LibrarySite />
      )}
    </Suspense>
  );
}
