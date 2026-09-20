import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import OtpVerification from "../pages/OtpVerification";
import AdminProtectedRoute from "../ProtectedRoutes/AdminProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLayout from "../Layouts/AdminLayout";
import ManagerLayout from "../Layouts/ManagerLayout";
import ManagerProtectedRoute from "../ProtectedRoutes/ManagerProtectedRote";
import UserProtectedRoute from "../ProtectedRoutes/UserProtectedRoute";
import UserLayout from "../Layouts/UserLayout";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/verify-otp" element={<OtpVerification />} />
        {/* admin routes are called here */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* manager Routes aare called here */}
        <Route
          path="/manager"
          element={
            <ManagerProtectedRoute>
              <ManagerLayout />
            </ManagerProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={"manager dashboard"} />
        </Route>

        {/* user routes are called here  */}
        <Route
          path="/user"
          element={
            <UserProtectedRoute>
              <UserLayout />
            </UserProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={"user dashboard"} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
