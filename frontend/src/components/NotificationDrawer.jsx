import React from "react";
import { formatDistanceToNow } from "date-fns";
function NotificationDrawer({ isOpen, onClose, notificationData }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all  duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-100 max-w-[90%] bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-border">
          <h2 className="text-lg font-bold text-dark">Notifications</h2>

          <button onClick={onClose} className="text-muted hover:text-dark">
            ✕
          </button>
        </div>

        {/* Notifications */}
        <div className="h-[calc(100%-5rem)] pb-25  overflow-y-auto p-4">
          {notificationData.map((item, idx) => {
            return (
              <div
                key={idx}
                className="w-full bg-bg-soft mt-3  flex items-center justify-between  rounded-lg px-4 text-sm border border-border p-2"
              >
                <div
                  className="w-15 bg-cover bg-center bg-no-repeat
                 h-15 rounded-full bg-[url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')] overflow-hidden"
                >
                  <img className="w-full h-full object-cover "
                    src={item.sender.profile.profilePic}
                    alt="img"
                  />
                </div>
                <div className="w-[80%] h-full flex flex-col gap-0.5 ">
                  <h6 className="text-sm text-accent font-medium">
                    {" "}
                    {item.sender.name}
                  </h6>
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <h5 className="text-xs text-muted">{item.message}</h5>
                  <p className="text-red-700 text-xs ">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="w-full p-4 fixed bottom-0 left-0 bg-bg-soft flex items-center justify-between mt-10">
            <button className="text-sm bg-dark cursor-pointer opacity-90 hover:opacity-100 font-medium text-white px-4 py-1.5 rounded   ">
              Mark all as Read
            </button>

            <div
              className=" flex text-sm border border-border rounded-lg items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 ease-in-out  py-1.5
             px-4"
            >
              view All Notification
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationDrawer;
