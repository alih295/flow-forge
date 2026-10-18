import React, { useEffect, useState } from "react";
import {
  ClipboardList,
  CircleDashed,
  Clock,
  CircleCheck,
  Funnel,
  Search,
} from "lucide-react";
import TaskList from "../../components/TaskList";
import KanbanBoard from "../../components/KanbanBoard";
import { fetchTasks } from "../../services/TaskServices";

function TaskManagement() {
  const [taskView, setTaskView] = useState("list");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [totalTask, setTotalTask] = useState(0);
  const [completedTasK, setCompletedTask] = useState(0);
  const [todoTask, setTodoTask] = useState(0);
  const [inProgressTask, setInProgressTask] = useState(0);
  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        if (data.success) {
          console.log(data);
          setTasks(data.tasks);
          setTotalTask(data.totalTask);
          setCompletedTask(data.completedTask);
          setTodoTask(data.todoTask);
          setInProgressTask(data.inProgressTask);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  return (
    <div className="w-full bg-bg-soft min-h-screen p-6 font-[Montserrat]">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold mb-2 text-text">Tasks</h1>
          <p className="text-muted ">Manage and track your workspace tasks</p>
        </div>
        <button className="bg-accent px-6 py-2 text-white font-medium rounded-lg cursor-pointer">
          Create Task
        </button>
      </div>
      <div className="w-full flex mt-10 items-center justify-between  flex-wrap  border border-border rounded-xl gap-2 p-4 ">
        <div className="bg-white rounded-lg p-2 flex flex-col items-start justify-between  w-[49%] gap-2 px-4 ">
          <p className="text-lg text-muted capitalize">total Tasks</p>
          <h1 className="text-3xl text-text font-bold">{totalTask}</h1>
          <span className="text-emerald-600">
            <ClipboardList size={25} />{" "}
          </span>
        </div>
        <div className="bg-white rounded-lg p-2 flex flex-col items-start justify-between  w-[49%] gap-2 px-4 ">
          <p className="text-lg text-muted capitalize">to do</p>
          <h1 className="text-3xl text-text font-bold">{todoTask}</h1>
          <span className="text-gray-600">
            {" "}
            <CircleDashed size={25} />{" "}
          </span>
        </div>
        <div className="bg-white rounded-lg p-2 flex flex-col items-start justify-between  w-[49%] gap-2 px-4 ">
          <p className="text-lg text-muted capitalize">in pogress</p>
          <h1 className="text-3xl text-text font-bold">{inProgressTask}</h1>
          <span className="text-orange-600">
            <Clock size={25} />{" "}
          </span>
        </div>
        <div className="bg-white rounded-lg p-2 flex flex-col items-start justify-between  w-[49%] gap-2 px-4 ">
          <p className="text-lg text-muted capitalize">complete</p>
          <h1 className="text-3xl text-text font-bold">{completedTasK}</h1>
          <span className="text-green-600">
            <CircleCheck />
          </span>
        </div>
      </div>
      <div className="w-full mt-10  ">
        <h1 className="text-xl text-text font-semibold">Task Board</h1>
        <div className="w-full mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setTaskView("list")}
            className={`w-[49%] transition-colors duration-300  ${taskView === "list" ? "bg-dark text-white" : "bg-transparent text-black"} py-3 rounded-lg font-medium `}
          >
            List View
          </button>{" "}
          <button
            onClick={() => setTaskView("kanban")}
            className={`w-[49%] transition-color duration-300 ${taskView === "kanban" ? "bg-dark text-white" : "bg-transparent  text-black"} bg-dark  font-medium py-3 border rounded-lg border-border`}
          >
            Kanban Board
          </button>
        </div>
        <div className="w-full mt-5  flex items-center justify-between ">
          <div className="w-[83%] flex gap-2 p-2 items-center justify-start  border border-border rounded-lg ">
            <Search size={18} />{" "}
            <input
              className="w-full outline-none "
              type="search"
              placeholder="search tasks"
            />{" "}
          </div>
          <div className="w-[15%] flex items-center justify-center gap-2 border border-border p-2 rounded-lg ">
            {" "}
            <Funnel size={18} /> <p>Filter</p>
          </div>
        </div>
        <div
          className="w-full border  rounded-xl  border-border mt-10 p-2
        "
        >
          {taskView === "list" ? (
            <TaskList data={tasks} />
          ) : (
            <KanbanBoard data={tasks} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManagement;
