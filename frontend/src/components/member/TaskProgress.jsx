import React from "react";

function TaskProgress({ data }) {
  console.log(data);
  return (
    <div className="mt-10 w-full ">
      <h1 className="text-xl font-bold text-text">My Tasks</h1>
      {data.length <= 0 ? (
        <div className="w-full mt-2 text-muted flex text-center">
          {" "}
          you don't hae any task yet{" "}
        </div>
      ) : (
        data.map((item, idx) => {
          return (
            <div
              key={item._id}
              className="w-full mt-2 bg-white flex items-center justify-between rounded-lg px-4 py-2"
            >
              <h5 className="text-lg font-medium "> {item.title}</h5>{" "}
              <span className="px-4 rounded-full bg-red-100 text-red-600">
                {item.status}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TaskProgress;
