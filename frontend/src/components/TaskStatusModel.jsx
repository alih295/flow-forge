import React, { useState } from "react";
import { FlagTriangleLeft, Loader, X } from "lucide-react";
import { updateTaskStatus } from "../services/TaskServices";
import toast, { Toaster } from "react-hot-toast";

function TaskStatusModel({ isOpen, onClose, taskId, workspaceId ,  setChildRender }) {
  const [taskStatus, setTaskStatus] = useState("");
  const [loading, setLoading] = useState(false);


  const submitHandler = async () => {
    try {
      setLoading(true);
      const response = await updateTaskStatus({
        workspaceId,
        taskId,
        taskStatus,
      });
      console.log(response)
      if(response.success){
        toast.success('task status updated')
        setTaskStatus('')
      }
    
    } catch (err) {
      console.log(err.message);
      toast.error(err.message)
    } finally {
      setLoading(false);
      setChildRender('')
      onClose();
    }
  };


  return (
    <div
      className={`fixed transition-all duration-300  ${isOpen ? "visible" : "invisible"}
     z-20 inset-0`}
    >
      <div
        onClick={onClose}
        className={`absolute transition-opacity duration-300 inset-0 z-55 bg-black/30 ${isOpen ? "opacity-100" : "opacity-100"}   `}
      />
      <Toaster></Toaster>
      <div
        className={`w-1/2 max-w-100   z-60 bg-white transition-all duration-300
                 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 ${isOpen ? "-translate-y-1/2 opacity-100" : "translate-y-full opacity-0"}    p-4 `}
      >
        <header className="w-full py-2 border-b border-border flex items-center justify-between">
          <h1>Update Status</h1>{" "}
          <X onClick={onClose} className="hover:scale-105 cursor-pointer" />
        </header>

        <div className="w-full">
          <select
            onChange={(e) => setTaskStatus(e.target.value)}
            className="w-full my-5 border outline-none border-border py-2 px-6 rounded-lg focus:border-primary"
            value={taskStatus}
          >
            <option disabled value="">
              select Status
            </option>
            <option value="todo">ToDo</option>
            <option value="in-progress">InProgress</option>
            <option value="completed">Complete</option>
          </select>
          <button  onClick={submitHandler} className="mt-4 w-full py-2 bg-accent text-white font-medium rounded-lg">
            {loading ? <Loader/> : 'submit'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default TaskStatusModel;
