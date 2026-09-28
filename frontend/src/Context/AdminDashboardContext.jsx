import { createContext, useState } from "react";
import { adminDashboard } from "../services/AdminServices.js";

export const AdminDashboardContext = createContext();

export const AdminDashboardProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const fetchDashboard = async () => {
    if (dashboardData) return;
    try {
      setLoading(true);
      const data = await adminDashboard();
      if (data?.success) {
        setDashboardData(data.dashboard);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardContext.Provider
      value={{
        dashboardData,
        loading,
        fetchDashboard,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};
