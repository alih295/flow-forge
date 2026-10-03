import React from "react";
import { useNavigate } from "react-router-dom";
import { MoveLeft, Dot, UserGroup, Check, Plus, User } from "lucide-react";

function ViewWorkspace() {
  const navigate = useNavigate();

  return (
    <section className="w-full p-6 min-h-screen ">
      <button
        onClick={() => navigate("/admin/workspaces")}
        className="px-6 rounded-xl
       opacity-90 hover:opacity-100 flex items-center justify-between gap-2  cursor-pointer group p-2 bg-accent text-white font-medium text-lg"
      >
        <span>
          <MoveLeft className="group-hover:-translate-x-1.5 duration-100 tranisition-transform" />
        </span>{" "}
        Back to Workspace
      </button>
      <div className="w-full min-h-48 flex items-center justify-between  ">
        <div className="w-[60%] ">
          <h1 className="text-3xl text-text font-bold capitalize ">
            workspace name
          </h1>
          <h4 className="text-sm text-muted mt-4 ">
            workspace desciption Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus, molestiae?
          </h4>
          <h2 className="text-xl mt-4 text-accent font-semibold capitalize">
            owner
          </h2>
        </div>
        <div>
          <div
            className="flex
           gap-5"
          >
            <button className="px-6 py-2.5 bg-accent text-white font-medium rounded-xl ">
              + Add Member
            </button>
            <button className="px-6 py-2.5 bg-dark text-white font-medium rounded-xl ">
              Add task
            </button>
          </div>
          <p className="mt-4 flex items-center text-green-700 font-medium justify-start gap-2 ">
            <span>
              <Dot />
            </span>
            status
          </p>
        </div>
      </div>
      <div
        className="w-full mt-10  flex items-center justify-between
         "
      >
        <div className="w-64 p-5 border  border-border bg-white rounded-xl ">
          <h5
            className="text-muted flex
             items-center justify-between mb-5"
          >
            <span className="text-accent   ">
              <UserGroup />
            </span>
            Members
          </h5>
          <h1 className="text-2xl text-text font-semibold">05</h1>
        </div>
        <div className="w-64 p-5 border  border-border bg-white rounded-xl ">
          <h5
            className="text-muted flex
             items-center justify-between mb-5"
          >
            <span className="text-accent   ">
              <Check />
            </span>
            Toatl Tasks
          </h5>
          <h1 className="text-2xl text-text font-semibold">05</h1>
        </div>
        <div className="w-64 p-5 border  border-border bg-white rounded-xl ">
          <h5
            className="text-muted flex
             items-center justify-between mb-5"
          >
            {" "}
            <span className="text-accent   ">
              <Check />
            </span>
            Completed Tasks
          </h5>
          <h1 className="text-2xl text-text font-semibold">05</h1>
        </div>
      </div>
      <div className="w-full min-h-52 flex items-center justify-between  mt-10">
        <div className="w-[60%] border border-border rounded-xl bg-white p-5 h-full  ">
          <header
            className="w-full 
              flex items-center justify-between"
          >
            <h1 className="text-xl text-text font-medium">Recent Tasks</h1>
            <button
              className="px-4
             py-1.5 text-accent font-bold cursor-pointer"
            >
              View
            </button>
          </header>
          <div className="w-full mt-8 ">
            <div className="w-full py-2 flex items-center justify-between ">
              <p>build authentication api</p> <p>In Progress</p>
            </div>
          </div>
        </div>
        <div className="w-[39%] h-full p-5 bg-white border border-border rounded-xl">
          <header className="w-full flex items-center justify-between">
            <h1 className="text-xl font-semibold text-text">Members</h1>
            <span className="text-accent cursor-pointer font-semibold">
              <Plus size={18} />
            </span>
          </header>
          <div className="w-full mt-8 ">
            <div className="w-full flex items-center justify-between">
              <h2
                className="flex
             items-center justify-center gap-2 text-text text-lg font-medium"
              >
                {" "}
                <span>
                  <User size={18} />
                </span>{" "}
                name
              </h2>{" "}
              <p> owner</p>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-10 min-h-64 p-5 mb-10 bg-white rounded-xl border border-border">
        <header className="w-full flex items-center justify-between"><h1 className="text-xl text-text font-semibold ">Recent activity</h1>     <button className="text-lg text-accent font-bold cursor-pointer">View</button></header>
        <div className="w-full mt-8">
    <div className="w-full flex items-center justify-between">
        <h5 className="flex
         items-center gap-2 "> <span><Dot size={13}/></span> ali haide create a task</h5>
        <p className="text-sm text-muted">time 20 min ago</p>
    </div>

        </div>
      </div>
    </section>
  );
}

export default ViewWorkspace;
