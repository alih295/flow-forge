import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./Routes/AppRoutes.jsx";
import AppContext from "./Context/AppContext.jsx";
import { AdminDashboardProvider } from "./Context/AdminDashboardContext.jsx";
import { NotificationProvider } from "./Context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
 
    <AppContext>
      <AdminDashboardProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AdminDashboardProvider>
    </AppContext>
  ,
);
