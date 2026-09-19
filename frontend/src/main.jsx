import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./Routes/AppRoutes.jsx";
import AppContext from "./Context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContext>
      <AppRoutes />
    </AppContext>
  </StrictMode>,
);
