import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/dm-sans";
import "@kooyaph/ui/styles.css";
import "./playground.css";
import App from "./App";
const root = document.getElementById("root");
if (!root) throw new Error("Missing playground root");
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
