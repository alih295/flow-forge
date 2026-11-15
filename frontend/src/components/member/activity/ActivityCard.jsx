import { BookCheck } from "lucide-react";
import React from "react";

function ActivityCard({data}) {
  return (
    <div key={data._id} className="w-full flex bg-white p-4 rounded-xl border border-border gap-4
    ">
      <span className="flex w-10 h-10 justify-center rounded-lg items-center   shrink-0 bg-emerald-600/20 text-emerald-600 "><BookCheck /></span>
      <div
        className="flex
         flex-1 flex-col"
      >
        <h1 className="text-xl font-semibold">Task completed</h1>
        <p className="text-md mt-4">you completed authentication api</p>

        <p className="text-muted mt-2">Flowforge Development: 10 minues ago</p>

        <div className="  rounded-full font-semibold text-accent ">Task-completed</div>
      </div>
    </div>
  );
}

export default ActivityCard;
