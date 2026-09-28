import React from "react";

function NotificationDrawer({ isOpen, onClose }) {
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
        <div className="h-[calc(100%-5rem)] overflow-y-auto p-4">
          {/* notification items */}
        </div>
      </div>
    </div>
  );
}

export default NotificationDrawer;
