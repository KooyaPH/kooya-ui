import './reui/reui.css';
import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/dm-sans";
import "@fontsource/syncopate/700.css";
import "@kooyaph/ui/styles.css";
import "./site/site.css";
import App from "./App";
const root = document.getElementById("root");
if (!root) throw new Error("Missing playground root");
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
