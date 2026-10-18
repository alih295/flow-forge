import { Dot, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

function KanbanBoard({ data }) {
  const [completedTask, setCompletedTask] = useState([]);
  const [inProgressTask, setInProgressTask] = useState([]);
  const [todoTask, setTodoTask] = useState([]);
  useEffect(() => {
    const compTask = data.filter((item) => {
      return item.status === "completed";
    });
    const progTask = data.filter((item) => {
      return item.status === "in-progress";
    });
    const tdTask = data.filter((item) => {
      return item.status === "todo";
    });
    setCompletedTask(compTask);
    setInProgressTask(progTask);
    setTodoTask(tdTask);
  }, []);


  return (
    <section className="w-full flex flex-col gap-10  rounded-2xl  p-4">
      <div className="w-full    ">
        <div className=" w-full flex items-center justify-between gap-4">
          <div
            className="flex
           items-center justify-center gap-4"
          >
            <span className="w-4 h-4 rounded-full bg-green-600"></span>
            <h1 className="text-xl font-medium capitalize">completed</h1>
            <span className="px-2 rounded-lg font-semibold bg-gray-400 text-white ">
              {completedTask.length}
            </span>
          </div>
          <div>
            <Plus size={25} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5  mt-5">
          { completedTask.length <= 0 ? <div className="w-full"> <h5>you don't have a task yet</h5> </div> :  completedTask.map((item,idx)=>{
            return (<TaskCard item={item}/>)
          })}
        </div>
        <div className="w-full text-center mt-5 ">Add Task</div>
      </div>
      <div className="w-full   ">
        <div className=" w-full flex items-center justify-between gap-4">
          <div
            className="flex
           items-center justify-center gap-4"
          >
            <span className="w-4 h-4 rounded-full bg-gray-600"></span>
            <h1 className="text-xl font-medium capitalize">ToDo</h1>
            <span className="px-2 rounded-lg font-semibold bg-gray-400 text-white ">
              {todoTask.length}
            </span>
          </div>
          <div>
            <Plus size={25} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5  mt-5">
          { todoTask.length <= 0 ? <div className="w-full"> <h5>you don't have a task yet</h5> </div> :  todoTask.map((item,idx)=>{
            return (<TaskCard item={item}/>)
          })}
        </div>
        <div className="w-full text-center mt-5 ">Add Task</div>
      </div>
      <div className="w-full   ">
        <div className=" w-full flex items-center justify-between gap-4">
          <div
            className="flex
           items-center justify-center gap-4"
          >
            <span className="w-4 h-4 rounded-full bg-orange-500"></span>
            <h1 className="text-xl font-medium capitalize">INProgress</h1>
            <span className="px-2 rounded-lg font-semibold bg-gray-400 text-white ">
              {inProgressTask.length}
            </span>
          </div>
          <div>
            <Plus size={25} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5  mt-5">
           { inProgressTask.length <= 0 ? <div className="w-full"> <h5>you don't have a task yet</h5> </div> :  inProgressTask.map((item,idx)=>{
            return (<TaskCard item={item}/>)
          })}
        </div>
        <div className="w-full text-center mt-5 ">Add Task</div>
      </div>
    </section>
  );
}

export default KanbanBoard;
