import { EllipsisVertical, FaceExpressionless } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  deleteWorkspace,
  fetchWorkspace,
} from "../../services/WorkspaceServices";
import Loader from "../../components/Loader";
import WorkspaceModel from "../../components/WorkspaceModel";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import TaskModel from "../../components/TaskModel";
import MemberModel from "../../components/MemberModel";

function WorkspaceManagement() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 10;
  const [workspace, setWorkspace] = useState([]);
  const [workspaceModel, setWorkspaceModel] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [memberModel, setMemberModel] = useState(false);
  const [taskModel, setTaskModel] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  useEffect(() => {
    const getWorkspace = async () => {
      try {
        setLoading(true);
        const response = await fetchWorkspace(page, limit);
        setWorkspace(response.workspace);
        setTotalPage(response?.totalPages);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getWorkspace();
  }, [page, deleteLoading]);
  const navigate = useNavigate();
  const handleDelet = async (id) => {
    try {
      setDeleteLoading(true);
      const data = await deleteWorkspace(id);
      if (data.success) {
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="p-6 w-full min-h-screen font-[Montserrat] ">
      <div className="w-full flex items-center justify-between py-2 border-b border-border">
        <Toaster />
        <h1 className="text-xl text-text font-bold">Workspace</h1>
        <button
          onClick={() => {
            setWorkspaceModel(true);
            setMode("create");
            setSelectedWorkspace(null);
          }}
          className="px-4 py-2 bg-accent text-white rounded-lg font-medium text-lg cursor-pointer opacity-90 hover:opacity-100"
        >
          + Create Workspace
        </button>
        <WorkspaceModel
          mode={mode}
          initialData={selectedWorkspace}
          isOpen={workspaceModel}
          onClose={() => setWorkspaceModel(false)}
        />
      </div>

      <div className="w-full mt-5 flex py-2 gap-10">
        <input
          placeholder="search wokspaces..."
          className="w-64 px-6 outline-none  py-2.5 border border-border rounded-lg focus:border-primary"
          type="search"
        />
        <select className="w-52 border px-4 border-border rounded-lg">
          <option disabled>status </option>{" "}
          <option value="active">active</option>{" "}
          <option value="blocked">blocked</option>
        </select>
      </div>
      <div className="w-full overflow-hidden mt-5 rounded-xl ">
        <table className="w-full bg-bg-soft">
          <thead>
            <tr className="w-full bg-dark text-white">
              <th className="px-4 border border-border py-3.5 text-left">
                Name
              </th>
              <th className="px-4 border border-border py-3.5 text-left">
                Owner
              </th>
              <th className="px-4 border border-border py-3.5 text-left">
                Members
              </th>
              <th className="px-4 border border-border py-3.5 text-left">
                Status
              </th>
              <th className="px-4 border border-border py-3.5 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full relative bg-bg-soft">
            {loading ? (
              <div className="w-full absolute flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              workspace.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td className="px-4 py-3.5 border border-border ">
                      {item.name}
                    </td>
                    <td className="px-4 py-3.5 border border-border ">
                      {item.owner.name}
                    </td>
                    <td className="px-4 py-3.5 border border-border ">
                      {item.members}
                    </td>
                    <td className="px-4 py-3.5 border border-border ">
                      {item.status}
                    </td>
                    <td className="p-2 border  border-border relative ">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === item._id ? null : item._id)
                        }
                        className="p-1 rounded hover:bg-white "
                      >
                        <EllipsisVertical size={18} />
                      </button>
                      {openMenu === item._id && (
                        <div className="absolute z-20 w-64 bg-white border border-border rounded-lg shadow-lg  right-2 top-10">
                          <button
                            onClick={() =>
                              navigate(`/admin/workspace/view/${item._id}`)
                            }
                            className="w-full  text-left px-4 py-2 cursor-pointer hover:bg-bg-soft"
                          >
                            View Workspace
                          </button>
                          <button
                            onClick={() => setTaskModel(true)}
                            className="w-full cursor-pointer text-left px-4 py-2 hover:bg-bg-soft"
                          >
                            Add Task
                          </button>
                          <TaskModel
                            isOpen={taskModel}
                            onClose={() => setTaskModel(false)}
                            id={item._id}
                          />
                          <button
                            onClick={() => {
                              setWorkspaceModel(true);
                              setMode("edit");
                              setSelectedWorkspace(item);
                            }}
                            className="w-full cursor-pointer text-left px-4 py-2 hover:bg-bg-soft"
                          >
                            Edit workspace
                          </button>

                          <button
                            onClick={() => setMemberModel(true)}
                            className="w-full cursor-pointer text-left px-4 py-2 hover:bg-bg-soft"
                          >
                            Add Member
                          </button>
                          <MemberModel
                            isOpen={memberModel}
                            setMemberModel={setMemberModel}
                            id={item._id}
                          />

                          <button
                            onClick={() => {
                              handleDelet(item._id);
                            }}
                            className="w-full cursor-pointer text-red-700 text-left px-4 py-2 hover:bg-bg-soft"
                          >
                            {deleteLoading ? <Loader /> : "delete Workspace"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className="w-full flex items-center justify-evenly mt-5 py-4 px-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="px-4 py-2 disabled:bg-gray-500  disabled:text-gray-200 disabled:cursor-not-allowed  bg-dark text-white rounded-lg"
          >
            previous
          </button>
          <p>
            page {page} of {totalPage}{" "}
          </p>
          <button
            disabled={page === totalPage}
            className="px-4 bg-dark text-white py-2 rounded-lg disabled:bg-gray-400 disabled:text-gray-100 "
            onClick={() => setPage((prev) => prev + 1)}
          >
            next
          </button>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceManagement;
