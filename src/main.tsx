/**
 * @file Application entry point.
 * @author Danil Klimov
 * @version 1.0.1
 *
 * **MIT License**
 * **Copyright (c) 2025 Danil Klimov**
 *
 * Full text of the MIT License can be found in the LICENSE file in the root
 * directory of this source code.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
