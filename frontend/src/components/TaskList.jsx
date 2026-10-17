import React from "react";
import { ListTodo, Ellipsis } from "lucide-react";

function TaskList({ data }) {
    console.log(data)
  return (
    <>
      {data.map((item, idx) => {
        return (
          <div key={idx} className="w-full h-50  flex items-center justify-between  p-2 ">
            <div className="w-10 h-full flex items-start justify-end    ">
              <p className="w-10 h-10 flex items-center justify-center bg-emerald-400 rounded-lg ">
                <ListTodo size={25} />
              </p>
            </div>
            <div className="w-[83%]  h-full">
              <h1 className="text-2xl font-bold text-text ">
            {item.title}
              </h1>
              <p className="text-muted mt-3 ">
                workspace,
                <span className="text-accent font-medium ">{item?.workspace?.name}</span>
              </p>
              <div
                className="flex
               items-center gap-4"
              >
                <span className="px-4 py-1 text-red-800 font-medium text-sm bg-red-600/20 rounded-full ">
                  {item.priority} priority
                </span>{" "}
                <span className="px-4 py-1 bg-gray-400 rounded-full text-white font-semibold ">
                 {item.status}
                </span>
              </div>
              <span className="text-sm capitalize text-muted ">
                due , oct 18 , assigned :
                <span className="text-text font-medium text-lg">{item?.assignedTo?.name}</span>{" "}
              </span>
            </div>
            <div className="w-[5%] flex justify-end h-full">
              <span className="cursor-pointer">
                <Ellipsis size={18} />
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TaskList;
