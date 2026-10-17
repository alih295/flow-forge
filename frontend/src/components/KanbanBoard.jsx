import { Dot, Plus } from "lucide-react";
import React from "react";
import TaskCard from "./TaskCard";

function KanbanBoard({ data }) {
    
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
              1
            </span>
          </div>
          <div>
            <Plus size={25} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5  mt-5">
          <TaskCard />
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
              1
            </span>
          </div>
          <div>
            <Plus size={25} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5  mt-5">
          <TaskCard />
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
              1
            </span>
          </div>
          <div>
            <Plus size={25} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5  mt-5">
          
        </div>
        <div className="w-full text-center mt-5 ">Add Task</div>
      </div>
    </section>
  );
}

export default KanbanBoard;
