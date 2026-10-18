import { Ellipsis } from "lucide-react";
import React from "react";

function TaskCard({item}) {

  return (
    <div className="w-full relative bg-white  flex items-center justify-between  rounded-lg p-4 ">
      <div className="w-[80%]  h-full ">
        <span className={`${item.status === 'completed' ? 'bg-green-600/20 text-green-600 ' : item.status === 'todo' ? 'bg-gray-800/40 text-white' :'bg-orange-600/20 text-orange-600 ' } px-2 text-green-600 font-semibold   py-1 rounded-full inline`}>
          {item.status}
        </span>
        <h1 className="text-xl mt-3 font-semibold text-text">
        {item.title}
        </h1>
        <p className="text-sm mb-3 text-muted mt-3">
       {item.description}
        </p>
        <span
          className="mt-3 
            "
        >
          {item.status}
        </span>
      </div>

      <span className="absolute right-4 top-4">
        {" "}
        <Ellipsis />
      </span>

      <div className=" absolute right-4 bottom-4  px-4 py-1 rounded-lg bg-dark text-white font-medium">{item?.assignedTo?.name || 'null'}</div>
    </div>
  );
}

export default TaskCard;
