import { Bell, Ellipsis } from "lucide-react";
import React from "react";

function Notificaton() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 font-[Montserrat] p-6 py-10">
      <header className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Notification</h1>
          <p className="text-sm text-muted capitalize">
            stay updated with your workspace activity
          </p>
        </div>

        <span>
          <Bell></Bell>
        </span>
      </header>
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center gap-5">
          <h1 className="text-xl font-bold ">Activity</h1>{" "}
          <p className="px-2 py-1 bg-blue-600/40 rounded-full text-blue-500 font-medium">
            {" "}
            4 unread
          </p>{" "}
        </div>
        <button>Mark all as read</button>
      </div>
      <div className="flex gap-10">
        <button className="px-4 font-medium py-2 bg-dark text-white  rounded-full">
          All
        </button>
        <button>Unread(3)</button>
        <button>Read</button>
      </div>
      <div className="w-full flex flex-col   gap-3">
        <div className="w-full p-4 border border-border rounded-2xl bg-white  transition-all duration-200 flex items-start gap-4">
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <img
                className="w-full h-full bg-cover bg-center"
                src="/images/defaultavatar.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                New Task Assigned
              </h3>
              <span className="text-xs text-gray-400 font-medium">
                5 min ago
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-0.5 truncate">
              You have been assigned{" "}
              <span className="font-medium text-gray-900">
                "Implement Login API"
              </span>
            </p>

            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-medium text-gray-500">
                Flow Forge Workspace
              </span>
            </div>
          </div>

          <div className="shrink-0 ">
            <button className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              <Ellipsis className="w-5 h-5" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notificaton;
