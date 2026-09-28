import React, { useState } from "react";
import { Bell } from "lucide-react";
import NotificationDrawer from "./NotificationDrawer";

function Header({ user }) {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <header
      className="w-full h-20 
        z-10 px-8 flex items-center justify-between 
          bg-bg border-b border-border"
    >
      <img className=" h-15 " src="/images/screen.png" alt="" />
      <div className="w-[70%] flex items-center justify-end gap-5">
        <input
          className="w-64 px-4 py-2.5 border border-border rounded-lg outline-none focus:border-primary   "
          type="search"
          placeholder="Search..."
        />
        <div className="w-15 cursor-pointer text-xl flex items-center justify-center  rounded-full h-15 ">
          <Bell onClick={() => setShowNotification(true)} />

          <NotificationDrawer
            isOpen={showNotification}
            onClose={() => setShowNotification(false)}
          />
        </div>

        <div className="w-15 h-15 overflow-hidden rounded-full ">
          {user.profile.profilePic ? (
            <img
              className="w-full h-full object-cover "
              src={user?.profile?.profilePic}
              alt=""
            />
          ) : (
            <img
              className="w-full h-full object-cover "
              src="https://img.magnific.com/premium-vector/icono-perfil-simple-color-blanco-icon_1076610-50204.jpg"
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
