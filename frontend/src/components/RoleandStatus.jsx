import React, { useState } from "react";
import {  X } from "lucide-react";
import { changeRoleStatus } from "../services/UserService";
import Loader from '../components/Loader'
import toast,{Toaster} from 'react-hot-toast'

function RoleandStatus({ isOpen, onClose, id }) {
  const [role, setRole] = useState("member");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        role: role,
        status: status,
      };
      
      const response = await changeRoleStatus(data, id);
      if(response.success){
        toast.success('user updated successfully')
        onClose()
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 transition-all duration-300 ${isOpen ? "visible" : "invisible"}  `}
    >
      <Toaster/>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={` absolute max-w-100 w-94 -translate-x-1/2 left-1/2 top-1/2 p-4 rounded-xl   bg-white transition-all duration-300 ${isOpen ? "-translate-y-1/2 opacity-100" : "-translate-y-full opacity-0"}  `}
      >
        <header className="w-full flex items-center justify-between py-4 border-b border-border ">
          <h1 className="text-lg font-semibold text-text ">
            Change status & Role of User
          </h1>{" "}
          <X onClick={onClose} size={18} className="cursor-pointer " />
        </header>
        <form onSubmit={submitHandler} className="w-full mt-5 h-full ">
          <div className="w-full flex flex-col items-start justify-center gap-2 ">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-primary "
            >
              <option disabled value="">
                Select Role
              </option>
              <option value="member">Member</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-2  ">
            <label>Select status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-primary "
            >
              <option disabled value="">
                Select status
              </option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <button className="w-full text-white font-medium rounded-lg mt-5 py-2 bg-accent">
            {loading ? <Loader /> : "submit"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoleandStatus;
