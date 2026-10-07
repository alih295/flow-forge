import React from "react";
import { X } from "lucide-react";

function TaskModel({ isOpen, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}>
      <div onClick={onClose}
        className={`absolute inset-0 transition-opacity duration-300  bg-black/40 ${isOpen ? "opacity-100" : "opacity-0"} `}
      />
    
      
      <div className={`w-1/2 max-w-100 absolute transition-transform duration-300 top-1/2 -translate-y-1/2
       left-1/2 ${isOpen?'-translate-x-1/2 opacity-100' :'-translate-x-full opacity-0'} bg-white p-5 rounded-xl `}>
        <header className="w-full flex items-center justify-between py-2 border-b border-border">
            <h1>Add task</h1> <span className="cursor-pointer"><X size={18}/></span>
        </header>

        <div className="w-full h-20 bg-red-600 mt-5"></div>
       </div>
    </div>
  );
}

export default TaskModel;
