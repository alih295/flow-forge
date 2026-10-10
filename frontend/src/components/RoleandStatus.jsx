import React, { useState } from "react";

function RoleandStatus({ isOpen, onClose, id }) {
  const [role, setRole] = useState("member");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(second)

  return (
    <div
      className={`fixed z-50 inset-0 transition-all duration-300 ${isOpen ? "visible" : "invisible"}  `}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={` absolute w-64 -translate-x-1/2 left-1/2 top-1/2  h-64  bg-white transition-all duration-300 ${isOpen ? "-translate-y-1/2 opacity-100" : "-translate-y-full opacity-0"}  `}
      ></div>
    </div>
  );
}

export default RoleandStatus;
