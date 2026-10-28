import { Bell, Ellipsis } from "lucide-react";
import React from "react";
import { useContext } from "react";
import { NotificationContext } from "../../Context/NotificationContext";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

function Notificaton() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    notificationData,
    fetchNotification,
    notificationloading,
    unReadNotification,
    totalPage,
  } = useContext(NotificationContext);
  useEffect(() => {
    fetchNotification(page, limit);
  }, [page]);
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>{unReadNotification} Unread</span>
          </div>
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
        {notificationData.map((item, idx) => {
          return (
            <div
              key={item._id}
              className="w-full p-4 border border-border rounded-2xl bg-white  transition-all duration-200 flex items-start gap-4"
            >
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <img
                    className="w-full h-full bg-cover bg-center"
                    src={
                      item?.sender?.profile?.profilePic ||
                      "/images/defaultavatar.jpg"
                    }
                    alt=""
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                    {item.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-0.5 truncate">
                  You have been assigned{" "}
                  <span className="font-medium text-gray-900">
                    {item?.message}
                  </span>
                </p>

                <div className="flex items-center gap-1.5 mt-2">
                  {item.isRead ? (
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-500"></span>
                  ) : (
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  )}
                  <span className="text-xs font-medium text-gray-500">
                    {item?.workspace?.name}
                  </span>
                </div>
              </div>

              <div className="shrink-0 ">
                <button className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Ellipsis className="w-5 h-5" />{" "}
                </button>
              </div>
            </div>
          );
        })}

        <div className="w-full h-20 flex items-center justify-center gap-5">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
            className="px-6 py-2 bg-dark cursor-pointer rounded-lg text-white  disabled:bg-gray-400 disabled:cursor-not-allowed  font-medium"
          >
            Previous
          </button>
          <p className="text-muted text-sm">
            page <span className="text-md font-medium text-black">{page}</span>{" "}
            of
            <span>{totalPage}</span>
          </p>
          <button
            disabled={page === totalPage}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            className={`px-6 py-2 bg-dark disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer rounded-lg text-white  font-medium`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notificaton;
