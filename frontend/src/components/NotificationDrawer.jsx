import React from "react";

function NotificationDrawer({ isOpen, onClose, notificationData }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
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
        <div className="h-[calc(100%-5rem)] pb-25 overflow-y-auto p-4">
          {notificationData.map((item, idx) => {
            return (
              <div
                key={idx}
                className="w-full bg-yellow-300 flex items-center justify-between  rounded-lg px-4 gap-5 text-sm border border-border p-2"
              >
                <div className="w-20
                 h-20 bg-red-600"></div>
                 <div><h4 className="text-md font-medium">{item.title}</h4>
                <h6 className="text-lg text-text font-semibold">
                  <span className="text-md text-accent">
                    {item.sender.name}
                  </span>
                  Assigned you a task
                </h6>
                <p className="text-muted">20 min ago</p></div>
                
              </div>
            );
          })}

          <div className="w-full p-4 fixed bottom-0 left-0 bg-bg-soft flex items-center justify-between mt-10">
            <button className="text-sm bg-dark cursor-pointer opacity-90 hover:opacity-100 font-medium text-white px-4 py-1.5 rounded   ">
              Mark all as Read
            </button>

            <div className=" flex text-sm border border-border rounded-lg items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 ease-in-out  py-1.5
             px-4">
            
              view All Notification
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationDrawer;
