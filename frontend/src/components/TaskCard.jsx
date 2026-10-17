import { Ellipsis } from "lucide-react";
import React from "react";

function TaskCard() {
  return (
    <div className="w-full relative bg-white  flex items-center justify-between  rounded-lg p-4 ">
      <div className="w-[80%]  h-full ">
        <span className="bg-green-600/20 px-2 text-green-600 font-semibold   py-1 rounded-full inline">
          Completed
        </span>
        <h1 className="text-xl mt-3 font-semibold text-text">
          Create Workspace API
        </h1>
        <p className="text-sm mb-3 text-muted mt-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, eos.
        </p>
        <span
          className="mt-3 
            "
        >
          completed
        </span>
      </div>

      <span className="absolute right-4 top-4">
        {" "}
        <Ellipsis />
      </span>

      <div className="w-10 absolute right-4 bottom-4 h-10 rounded-full bg-red-600"></div>
    </div>
  );
}

export default TaskCard;
