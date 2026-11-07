import React from "react";

function MyWorkspace({ data }) {
  console.log(data);
  return (
    <div className="w-full mt-10">
      <h1 className="text-xl font-bold text-text">My Wokspace</h1>
      {data.length <= 0 ? (
        <div
          className="w-full flex items-center justify-center text-muted
       ml-2"
        >
          {" "}
          you don't have any workspace yet{" "}
        </div>
      ) : (
        data.map((item, idx) => {
          return (
            <div key={item._id} className="w-full px-4 py-2 border mt-2 rounded-lg border-border flex items-center justify-between">
              <h5 className="text-lg font-semibold ">
                {item?.workspace?.name}
              </h5>
              <span className="px-2 rounded-full font-medium bg-gray-400 text-gray-100">
                {item.role}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyWorkspace;
