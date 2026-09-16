import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import OtpVerification from "../pages/OtpVerification";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="verify-otp"  element={<OtpVerification/>}  />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
