import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MoveLeft, Dot, UserGroup, Check, Plus, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { fetchWorkspaceById } from "../../services/WorkspaceServices";
import Loader from "../../components/Loader";
import { formatDistanceToNow } from "date-fns";
import MemberModel from "../../components/MemberModel";
import TaskModel from "../../components/TaskModel";
function ViewWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState([]);
  const [loading, setLoading] = useState(false);
  const [memberModel, setMemberModel] = useState(false);
  const [taskModel, setTaskModel] = useState(false);

  useEffect(() => {
    const getWorkspaceById = async () => {
      try {
        setLoading(true);
        const data = await fetchWorkspaceById(id);
        setWorkspace(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getWorkspaceById();
  }, []);

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
        <Toaster />
        <div className="w-[60%] ">
          <h1 className="text-3xl text-text font-bold capitalize ">
            {workspace.workspace?.name}
          </h1>
          <h4 className="text-sm text-muted mt-4 ">
            {workspace.workspace?.description}
          </h4>
          <h2 className="text-xl mt-4 text-accent font-semibold capitalize">
            {workspace.member?.role}
          </h2>
        </div>
        <div>
          <div
            className="flex
           gap-5"
          >
            <button
              onClick={() => setMemberModel(true)}
              className="px-6 flex items-center justify-center gap-2 text-md py-2.5 bg-accent text-white font-medium rounded-xl "
            >
              <Plus size={18} /> Add Member
            </button>
            <MemberModel
              id={id}
              isOpen={memberModel}
              setMemberModel={setMemberModel}
            />
            <button
              onClick={() => setTaskModel(true)}
              className="px-6 flex items-center justify-center
             gap-2 text-md py-2.5 bg-dark text-white font-medium rounded-xl "
            >
              <Plus size={18} /> Add task
            </button>
            <TaskModel
              id={id}
              isOpen={taskModel}
              onClose={() => setTaskModel(false)}
            />
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
            member
          </h5>
          <h1 className="text-2xl text-text font-semibold">
            {workspace.members?.length}
          </h1>
        </div>
        <div className="w-64 p-5 border  border-border bg-white rounded-xl ">
          <h5
            className="text-muted flex
             items-center justify-between mb-5"
          >
            <span
              onClick={() => setMemberModel(true)}
              className="text-accent   "
            >
              <Check />
            </span>
            Toatl Tasks
          </h5>
          <h1 className="text-2xl text-text font-semibold">
            {workspace.totalTask?.length}
          </h1>
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
          <h1 className="text-2xl text-text font-semibold">
            {workspace.completedTask}
          </h1>
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
          <div className="w-full mt-8  ">
            {workspace.totalTask?.length <= 0 ? (
              <div className="w-full">
                {" "}
                <p>you don't have any task yet </p>
              </div>
            ) : (
              workspace.totalTask?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full py-2 flex items-center justify-between "
                  >
                    <p>{item.title}</p>{" "}
                    <p
                      className="text-black
               font-medium "
                    >
                      {item.status}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="w-[39%] h-full p-5 bg-white border border-border rounded-xl">
          <header className="w-full flex items-center justify-between">
            <h1 className="text-xl font-semibold text-text">Members</h1>
            <span
              onClick={() => setMemberModel(true)}
              className="text-accent cursor-pointer font-semibold"
            >
              <Plus size={18} />
            </span>
          </header>
          <div className="w-full mt-8 ">
            {workspace.members?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full flex items-center justify-between"
                >
                  <h2
                    className="flex
             items-center justify-center gap-2 text-text text-lg font-medium"
                  >
                    {" "}
                    <span>
                      <User size={18} />
                    </span>{" "}
                    {item.user?.name}
                  </h2>{" "}
                  <p> {item.role}</p>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full mt-10 min-h-64 p-5 mb-10 bg-white rounded-xl border border-border">
        <header className="w-full flex items-center justify-between">
          <h1 className="text-xl text-text font-semibold ">Recent activity</h1>{" "}
          <button className="text-lg text-accent font-bold cursor-pointer">
            View
          </button>
        </header>
        <div className="w-full mt-8">
          {workspace.recentActivity?.length <= 0 ? (
            <div>you don't have any rent activity yet</div>
          ) : (
            workspace.recentActivity?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full flex items-center justify-between"
                >
                  <h5
                    className="flex
         items-center gap-2 "
                  >
                    {" "}
                    <span>
                      <Dot size={13} />
                    </span>{" "}
                    {item.user.name} {item.action}
                  </h5>
                  <p className="text-sm text-muted">
                    {" "}
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default ViewWorkspace;
