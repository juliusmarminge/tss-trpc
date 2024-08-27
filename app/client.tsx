import { StartClient } from "@tanstack/start";
import { hydrateRoot } from "react-dom/client";

import { createRouter } from "./router";

const router = createRouter();

const root = document.querySelector("#root");
if (!root) throw new Error("No element matching selector '#root' found");
hydrateRoot(root, <StartClient router={router} />);
