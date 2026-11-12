import { ArrowRight, PersonStanding, User } from "lucide-react";
import React from "react";

function CommentsCard() {
  return (
    <div className="w-full  border border-border rounded-xl p-4 ">
      <div className="w-full flex  items-center justify-between">
        <h1 className="text-xl font-semibold ">Task:Authentication API</h1>  <p>2 hours ago</p>
      </div>
      <div className="w-full flex gap-4 mt-4 items-center justify-start">
        <span className="w-12 bg-gray-600 h-12 items-center justify-center rounded-full flex text-white shrink-0 ">
            <User size={18} />
        </span>
        <div>
            <h1 className="text-lg font-bold">ali haider</h1>
            <p className="text-sm text-accent">Flowforge </p>
        </div>
      </div>
      <p className="text-md mt-2 mb-4 ">API authentication is working now. Please check the login response and let me know if anything needs improvement.</p>
      <div className="w-full border-t flex items-center justify-between py-4 border-border">
        <span>12 replies</span> <span className="flex items-center gap-2 cursor-pointer group ">view task <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={15}/></span>
      </div>
    </div>
  );
}

export default CommentsCard;
