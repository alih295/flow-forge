import React, { useContext } from "react";
import { UserContext } from "../Context/AppContext";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";

function AdminLayout() {
  const { user } = useContext(UserContext);
  const nav = [
    { id: 1, name: "dashboard", link: "/admin/dashboard" },
    {
      id: 2,
      name: "workspace",
      link: "/admin/workspace",
    },
    { id: 3, name: "tasks", link: "/admin/tasks" },
  ];
    const location  = useLocation()
    
  return (
    <main className="w-full relative h-screen   font-[montserat]">
      <Header user={user} />
      <div className="w-full flex items-center justify-between  h-[calc(100%-80px)]">
        <Aside data={nav}/>

        <div className="w-[80%] h-full overflow-x-auto ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AdminLayout;
