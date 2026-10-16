import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
vi.mock("../../../apps/playground/src/site/Site",()=>({default:()=> <h1>Kooya UI product site</h1>}));
vi.mock("../../../apps/playground/src/WorkspaceV1",()=>({default:()=> <h1>Editorial workspace demo</h1>}));
vi.mock("../../../apps/playground/src/WorkspaceStress",()=>({default:()=> <h1>Content checks</h1>}));
import App from "../../../apps/playground/src/App";
it("opens the product website at the default URL",async()=>{window.location.hash="";render(<App/>);expect(await screen.findByRole("heading",{name:"Kooya UI product site"})).toBeVisible();});
it("keeps explicit workspace demo URLs available",async()=>{window.location.hash="/workspace/cms";render(<App/>);expect(await screen.findByRole("heading",{name:"Editorial workspace demo"})).toBeVisible();});
it("returns Overview links to the product website",async()=>{window.location.hash="/overview";render(<App/>);expect(await screen.findByRole("heading",{name:"Kooya UI product site"})).toBeVisible();});
