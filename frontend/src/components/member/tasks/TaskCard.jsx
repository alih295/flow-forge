import React from "react";

function TaskCard({ data }) {
  return (
    <div key={data._id} className="w-full border-b py-2 flex flex-col gap-2 border-border">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-lg font-semibold capitalize">{data?.title}</h1>
        <span className="bg-green-100 px-2 rounded-full text-green-500 font-medium">
          {data?.status}
        </span>
      </div>
      <p className="text-muted text-md">{data?.workspace?.name}</p>
      <div className="w-full flex items-center justify-between ">
        <span className="bg-red-100 px-2 rounded-full text-red-600 font-medium">
          {data.priority} Priority
        </span>
        <p>Due: nov 12</p>
      </div>
    </div>
  );
}

export default TaskCard;
