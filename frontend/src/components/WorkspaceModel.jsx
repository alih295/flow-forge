import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import { createWorkspace } from "../services/WorkspaceServices";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { AdminDashboardContext } from "../Context/AdminDashboardContext";

function WorkspaceModel({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchDashboard } = useContext(AdminDashboardContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const workspaceData = {
        name: name,
        description: description,
      };
      const response = await createWorkspace(workspaceData);
      if (response?.success || response?.data?.success) {
        toast.success("Workspace created successfully");

        if (fetchDashboard) {
          await fetchDashboard(true);
        }

        setName("");
        setDescription("");
        onClose();
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "visible" : "invisible"}  `}
    >
      <Toaster />
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-opacity duration-300  bg-black/20 ${isOpen ? "opacity-100" : " opacity-0"}  `}
      />
      <div
        className={`absolute -translate-x-1/2 p-5 top-1/2 left-1/2 h-100 w-100 max-w-[90%] bg-white rounded-xl shadow-xl transition-transform duration-300 ${isOpen ? "-translate-y-1/2" : "translate-y-full"}`}
      >
        <div className="w-full border-b border-border p-2 flex items-center justify-between ">
          <h1 className="text-xl text-text font-medium">Create Workspace</h1>
          <span onClick={onClose} className="text-xl text-muted">
            <X />
          </span>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-5 p-2 mt-5"
        >
          <div className="w-full flex flex-col gap-3  ">
            <label>Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Workspace Name"
              className="w-full px-4 text-md py-2.5 border border-border focus:border-primary outline-none rounded-xl"
            />
          </div>
          <div className="w-full flex flex-col gap-3  ">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Workspace Description (optional)"
              className="w-full px-4 text-md resize-none py-2.5 border border-border focus:border-primary outline-none rounded-xl"
              type="text"
            />
          </div>
          <button className="w-full py-1.5 bg-accent text-white font-semibold rounded-xl mt-5 text-lg ">
            {loading ? <Loader /> : "create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkspaceModel;
