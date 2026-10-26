import React, { useState } from "react";
import { ListTodo, Ellipsis, ShowerHead } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { deleteTask } from "../services/TaskServices";
import TaskModel from "./TaskModel";
import TaskStatusModel from "./TaskStatusModel";

function TaskList({ data, setChildRender }) {
  const [showItem, setShowItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskModel, setTaskModel] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [taskStatusModel, settaskStatusModel] = useState(false);

  const handleDeleteTask = async (taskId, workspaceId) => {
    try {
      setLoading(true);

      const response = await deleteTask(taskId, workspaceId);
      if (response.success) {
        toast.success("task deleted successfully");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setChildRender(1);
      setLoading(false);
    }
  };

  return (
    <>
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className="w-full h-50  flex items-center justify-between  p-2 "
          >
            <div className="w-10 h-full flex items-start justify-end    ">
              <p className="w-10 h-10 flex items-center justify-center bg-emerald-400 rounded-lg ">
                <ListTodo size={25} />
              </p>
            </div>
            <Toaster></Toaster>
            <div className="w-[83%]  h-full">
              <h1 className="text-2xl font-bold text-text ">{item.title}</h1>
              <p className="text-muted mt-3 ">
                workspace,
                <span className="text-accent font-medium ">
                  {item?.workspace?.name}
                </span>
              </p>
              <div
                className="flex
               items-center gap-4"
              >
                <span className="px-4 py-1 text-red-800 font-medium text-sm bg-red-600/20 rounded-full ">
                  {item.priority} priority
                </span>{" "}
                <span className={`px-4 py-1 ${item.status === 'todo' ? 'bg-red-600 text-white' : item.status === 'in-progress' ? 'bg-orange-600 text-white' :'bg-green-600 text-white' } rounded-full text-white font-semibold `}>
                  {item.status}
                </span>
              </div>
              <span className="text-sm capitalize text-muted ">
                <strong>Due Date:</strong>{" "}
                {format(new Date(item.dueDate), "dd MMM, yyyy")}{" "}
                <strong className="ml-4"> Assigned</strong> :
                <span className="text-text font-medium text-lg">
                  {item?.assignedTo?.name}
                </span>{" "}
              </span>
            </div>
            <div className="w-[5%] relative flex justify-end h-full">
              <TaskModel
                isOpen={taskModel}
                onClose={() => setTaskModel(false)}
                mode="edit"
                taskId={taskId}
                workspaceId={workspaceId}
                setChildRender={setChildRender}
                initialData={item}
              />

              <TaskStatusModel
                isOpen={taskStatusModel}
                taskId={taskId}
                workspaceId={workspaceId}
                onClose={() => settaskStatusModel(false)}
                setChildRender={setChildRender}
              />

              <span
                onClick={() => {
                  setShowItem(showItem === item._id ? null : item._id);
                }}
                className="cursor-pointer"
              >
                <Ellipsis size={18} />
                {showItem === item._id && (
                  <div className=" z-20  right-0 top-5 w-40 absolute  p-2 rounded-lg bg-white ">
                    <Link
                      to={`/admin/tasks/view/${item._id}`}
                      className="w-full text-left px-4 py-2 hover:bg-bg-soft cursor-pointer"
                    >
                      view task
                    </Link>
                    <button
                      onClick={() => {
                        (setTaskId(item._id),
                          setWorkspaceId(item.workspace._id),
                          setTaskModel(true));
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-bg-soft cursor-pointer"
                    >
                      edit task
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-bg-soft cursor-pointer"
                      onClick={() => {
                        (setWorkspaceId(item.workspace._id),
                          setTaskId(item._id),
                          settaskStatusModel(true));
                      }}
                    >
                      Update status
                    </button>

                    <button
                      onClick={() => {
                        handleDeleteTask(item._id, item.workspace._id);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-bg-soft text-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TaskList;
