import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/AppContext";
import Header from "../components/Header";
import Aside from "../components/Aside";
import { Outlet } from "react-router-dom";
import MemberHeader from "../components/member/MemberHeader";

function UserLayout() {
  const { user } = useContext(UserContext);

  const nav = [
    {
      section: "Overview",
      items: [
        {
          id: 1,
          name: "Dashboard",
          link: "/user/dashboard",
        },
        {
          id: 3,
          name: "My Workspaces",
          link: "/user/workspaces",
        },
        {
          id: 4,
          name: "My Tasks",
          link: "/user/tasks",
        },
      ],
    },
    {
      section: "COLLABORATION",
      items: [
        {
          id: 5,
          name: "Comments",
          link: "/user/notifications",
        },
        {
          id: 6,
          name: "Notification",
          link: "/user/notifications",
        },
        {
          id: 6,
          name: "Activity Logs",
          link: "/user/activity",
        },
      ],
    },
    {
      section: "Personal",
      items: [
        {
          id: 7,
          name: "My Profile",
          link: "/user/settings",
        },
        {
          id: 7,
          name: "Settings",
          link: "/user/settings",
        },
      ],
    },
  ];

  return (
    <main className="w-full bg-bg-soft h-screen font-[Montserrat]">
      <MemberHeader user={user} />
      <div className="w-full flex items-center justify-between  h-[calc(100%-80px)]">
        <Aside data={nav} />
        <div className="w-[80%] h-full overflow-y-auto">
          <Outlet/>
        </div>
      </div>
    </main>
  );
}

export default UserLayout;
