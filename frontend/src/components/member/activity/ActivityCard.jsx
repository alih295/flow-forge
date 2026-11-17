import { formatDistanceToNow } from "date-fns";
import { BookCheck } from "lucide-react";
import React from "react";

function ActivityCard({data}) {
  console.log(data)
  return (
    <div key={data._id} className="w-full flex bg-white p-4 rounded-xl border border-border gap-4
    ">
      <span className="flex w-10 h-10 justify-center rounded-lg items-center   shrink-0 bg-emerald-600/20 text-emerald-600 "><BookCheck /></span>
      <div
        className="flex
         flex-1 flex-col"
      >
        <h1 className="text-xl font-semibold">{data?.action}</h1>

        <p className="text-muted mt-2">{data.workspace.name}:  {formatDistanceToNow(new Date(data.createdAt), {
                                addSuffix: true,
                              })}</p>

        <div className="  rounded-full font-semibold text-accent ">{data.entityType}</div>
      </div>
    </div>
  );
}

export default ActivityCard;
