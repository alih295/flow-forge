import { Search } from "lucide-react";
import React from "react";

function MemberHeader({ user }) {
  return (
    <header className="w-full h-20 bg-white px-6  flex items-center justify-between ">
      <div className="">
        <h1 className="text-xl tracking-tighter leading-0.5 font-semibold ">
          Hello 👋{" "}
          <span className="text-2xl font-bold capitalize text-text">
            {user?.name}
          </span>{" "}
        </h1>
        <p className="text-sm text-muted mt-2">
          Here's what's happening with your work today.
        </p>
      </div>
      <div className="w-64 flex items-center justify-center border px-4 py-2 border-border rounded-xl">
        <Search className="text-muted" size={18} />{" "}
        <input className="w-full outline-none px-4  " type="search" />
      </div>
    </header>
  );
}

export default MemberHeader;
