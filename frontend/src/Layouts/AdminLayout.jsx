import React, { useContext } from "react";
import { UserContext } from "../Context/AppContext";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const { user } = useContext(UserContext);

  return (
    <main
      className="w-full relative h-screen flex
     items-center justify-between  bg-(--bg-primary) font-[montserat]"
    >
      <header
        className="w-full h-20 fixed
       top-0 left-0 z-10 px-10 flex items-center justify-between bg-(--bg-secondary)"
      >
        <img className=" h-15 " src="../../public/images/screen.png" alt="" />
        <h1 className="text-xl font-semibold text-(--text-primary)">
          Welcome <br />{" "}
          <span className="font-bold text-2xl text-(--color-forge-orange)">
            {user.name}
          </span>{" "}
          👋{" "}
        </h1>
        <div className="w-15 h-15 overflow-hidden rounded-full ">
          {user.profile.profilePic ? (
            <img
              className="w-full h-full obgect-cover "
              src={user.profile.profilePic}
              alt=""
            />
          ) : (
            <img
              className="w-full h-full obgect-cover "
              src="https://img.magnific.com/premium-vector/icono-perfil-simple-color-blanco-icon_1076610-50204.jpg"
            />
          )}
        </div>
      </header>

      <aside className="w-[20%] h-[calc(100% - 80px)] bg-(--color-anvil-blue)">
        <div className="w-[90%] h-10 bg-white "></div>
      </aside>

      <div className="w-[75%] h-full overflow-x-auto ">
        <Outlet />
      </div>
    </main>
  );
}

export default AdminLayout;
