import React, { useContext } from "react";
import { UserContext } from "../Context/AppContext";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";

function AdminLayout() {
  const { user } = useContext(UserContext);
  const nav = [
    {
      section: "Overview",
      items: [
        {
          id: 1,
          name: "Dashboard",
          link: "/admin/dashboard",
        },
      ],
    },
    {
      section: "Management",
      items: [
        {
          id: 2,
          name: "Users",
          link: "/admin/users",
        },
        {
          id: 3,
          name: "Workspaces",
          link: "/admin/workspaces",
        },
        {
          id: 4,
          name: "Tasks",
          link: "/admin/tasks",
        },
      ],
    },
    {
      section: "System",
      items: [
        {
          id: 5,
          name: "Notifications",
          link: "/admin/notifications",
        },
        {
          id: 6,
          name: "Activity Logs",
          link: "/admin/activity",
        },
      ],
    },
    {
      section: "Settings",
      items: [
        {
          id: 7,
          name: "Settings",
          link: "/admin/settings",
        },
      ],
    },
  ];

  return (
    <main className="w-full relative h-screen   font-Montseerat">
      <Header user={user} />
      <div className="w-full flex items-center justify-between  h-[calc(100%-80px)]">
        <Aside data={nav} />

        <div className="w-[80%] h-full overflow-x-auto ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AdminLayout;
