import React from "react";

function TaskProgress() {
  return (
    <div className="mt-10 w-full ">
      <h1 className="text-xl font-bold text-text">My Tasks</h1>
      <div className="w-full mt-2 bg-white flex items-center justify-between rounded-lg px-4 py-2">
        <h5 className="text-lg font-medium "> complete a ui of pharmacy website</h5>{" "}
        <span className="px-4 rounded-full bg-red-100 text-red-600">
          in-progress
        </span>
      </div>
     
    </div>
  );
}

export default TaskProgress;
