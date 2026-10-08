import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createTask, fetchWorkspaceMember } from "../services/TaskServices";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";

function TaskModel({ isOpen, onClose, id }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [priority, setPriority] = useState("medium");
  const [date, setDate] = useState(new Date());
  const [memberLoading, setMemberLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getWorkspaceMember = async () => {
      try {
        setMemberLoading(true);
        const response = await fetchWorkspaceMember(id);
        setMembers(response.members);
      } catch (err) {
        console.error(err.message);
      } finally {
        setMemberLoading(false);
      }
    };
    getWorkspaceMember();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const taskData = {
        title,
        description,
        assignedTo,
        priority,
        date,
      };
      const data = await createTask(taskData, id);
      if(data.success){
        toast.success('task created Successfully')
        onClose()
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 transition-all duration-300 z-50 ${isOpen ? "visible" : "invisible"}`}
    >
      <Toaster />
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-opacity duration-300  bg-black/40 ${isOpen ? "opacity-100" : "opacity-0"} `}
      />

      <div
        className={`w-1/2 max-w-100 absolute transition-transform duration-300 top-1/2 -translate-y-1/2
       left-1/2 ${isOpen ? "-translate-x-1/2 opacity-100" : "-translate-x-full opacity-0"} bg-white p-5 rounded-xl `}
      >
        <header className="w-full flex items-center justify-between py-2 border-b border-border">
          <h1 className="text-lg font-medium text-text">Create Task</h1>{" "}
          <span onClick={onClose} className="cursor-pointer">
            <X size={18} />
          </span>
        </header>

        <div className="w-full  overflow-y-auto maxx-h-[80vh]  mt-5">
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col gap-4 "
          >
            <div className="w-full">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter Title Here"
                type="text"
                className="w-full mt-2 px-4 py-2 border-gray-600 rounded-lg  outline-none border focus:border-primary"
              />
            </div>
            <div className="w-full">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description Here"
                className="w-full mt-2 px-4 py-2 resize-none border-gray-600 rounded-lg  outline-none border focus:border-primary"
              />
            </div>
            <div className="w-full">
              <label>Assingned To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
                placeholder="Enter Title Here"
                type="text"
                className="w-full mt-2 px-4 py-2 border-gray-600 rounded-lg  outline-none border focus:border-primary"
              >
                <option disabled value="">
                  Select Member
                </option>
                {memberLoading ? (
                  <Loader />
                ) : (
                  members.map((item, idx) => {
                    return (
                      <option
                        className="w-full text-black"
                        key={idx}
                        value={item.user._id}
                      >
                        {item.user?.name}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
            <div className="w-full">
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
                placeholder="Enter Title Here"
                type="text"
                className="w-full mt-2 px-4 py-2 border-gray-600 rounded-lg  outline-none border focus:border-primary"
              >
                <option disabled value="">
                  Set Priotiy
                </option>{" "}
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="w-full">
              <label>due Date</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                placeholder="Enter Title Here"
                type="date"
                className="w-full mt-2 px-4 py-2 border-gray-600 rounded-lg  outline-none border focus:border-primary"
              />
            </div>
            <button className="w-full py-2 bg-accent rounded-lg text-white font-medium cursor-pointer">
              {loading ? <Loader /> : "create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskModel;
