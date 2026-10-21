import React, { useState } from "react";
import { ListTodo, Ellipsis, ShowerHead } from "lucide-react";
import { Link } from "react-router-dom";

function TaskList({ data }) {
  const [showItem, setShowItem] = useState(null);
  

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
                <span className="px-4 py-1 bg-gray-400 rounded-full text-white font-semibold ">
                  {item.status}
                </span>
              </div>
              <span className="text-sm capitalize text-muted ">
                due , oct 18 , assigned :
                <span className="text-text font-medium text-lg">
                  {item?.assignedTo?.name}
                </span>{" "}
              </span>
            </div>
            <div className="w-[5%] relative flex justify-end h-full">
              <span
                onClick={() => {
                  setShowItem(showItem === item._id ? null : item._id);
                }}
                className="cursor-pointer"
              >
                <Ellipsis size={18} />
                {showItem === item._id && (
                  <div className=" z-20  right-0 top-5 w-40 absolute  p-2 rounded-lg bg-white ">
                    <Link to={`/admin/tasks/view/${item._id}`} className="w-full text-left px-4 py-2 hover:bg-bg-soft cursor-pointer">
                      view task
                    </Link>
                    <button className="w-full text-left px-4 py-2 hover:bg-bg-soft cursor-pointer">
                      edit task
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-bg-soft cursor-pointer">
                      comment
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-bg-soft text-red-600 cursor-pointer">
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
