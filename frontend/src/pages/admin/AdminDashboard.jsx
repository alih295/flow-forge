import React, { useContext, useEffect, useState } from "react";
import { getRecentActivity } from "../../services/AdminServices";
import Loader from "../../components/Loader";
import TaskChart from "../../components/TaskChart";
import { AdminDashboardContext } from "../../Context/AdminDashboardContext";
import { formatDistanceToNow } from "date-fns";
import WorkspaceModel from "../../components/WorkspaceModel";
function AdminDashboard() {
  const { dashboardData, loading, fetchDashboard } = useContext(
    AdminDashboardContext,
  );
  const [recentActivityLoader, setRecentActivityLoader] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [showWorkspaceModel, setShowWorkspaceModel] = useState(false)

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        setRecentActivityLoader(true);
        const response = await getRecentActivity();
        const data = response?.recentActivity;
        if (response.success) {
          setRecentActivity(data);
        }
        console.log(response);
      } finally {
        setRecentActivityLoader(false);
      }
    };

    fetchRecentActivity();

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const taskData = {
    todo: dashboardData?.todoTask,
    inProgress: dashboardData?.inprogressTask,
    completed: dashboardData?.completedTasks,
  };

  return (
    <div className="w-full p-6 font-[Montserrat] min-h-screen ">
      <div className="w-full flex items-center justify-between ">
        <div>
          <h1 className="text-xl text-text font-bold ">Dashboard</h1>
          <p className="text-sm text-muted">
            System overview and activity
          </p>{" "}
        </div>
        <button onClick={()=>setShowWorkspaceModel(true)} className="px-4 py-2 bg-accent text-white text-lg font-semibold cursor-pointer rounded-lg">
          + Create Workspace
        </button>
        <WorkspaceModel isOpen={showWorkspaceModel} onClose={()=> setShowWorkspaceModel(false)}   />
      </div>
      <div className="w-full mt-10 flex items-center justify-between  h-50 ">
        <div className="w-[24%]   bg-white  p-5 border border-border  rounded-xl ">
          <h1 className="text-sm text-muted font-medium ">Total Users</h1>

          <div className="w-full mt-8 ">
            <h4 className="text-3xl text-dark font-bold mt-3 ">
              {dashboardData?.totalUsers}
            </h4>{" "}
          </div>
        </div>
        <div className="w-[24%]   bg-white  p-5 rounded-xl border border-border ">
          <h1 className="text-sm text-muted font-medium ">Active Users</h1>

          <div className="w-full mt-8 ">
            <h4 className="text-3xl text-dark font-bold ">
              {dashboardData?.activeUsers}
            </h4>{" "}
          </div>
        </div>
        <div className="w-[24%]   bg-white p-5 rounded-xl border border-border ">
          <h1 className="text-sm text-muted font-medium ">Total Workspaces</h1>

          <div className="w-full mt-8 ">
            <h4 className="text-3xl text-dark font-bold ">
              {dashboardData?.totalWorkspaces}
            </h4>{" "}
          </div>
        </div>
        <div className="w-[24%]   bg-white p-5 border border-border  ">
          <h1 className="text-sm text-muted font-muted ">Total Tasks</h1>

          <div className="w-full mt-8 ">
            <h4 className="text-3xl text-dark font-bold ">
              {dashboardData?.totalTasks}
            </h4>{" "}
          </div>
        </div>
      </div>
      <div className="w-full mt-10 h-80 flex items-center justify-between">
        <div className="w-[59%] h-full  p-5 bg-white border border-border  rounded-lg">
          <h1 className="text-xl font-semibold text-text">Task Overview</h1>
          <div className="w-full h-[70%] mt-5  ">
            <TaskChart taskData={taskData} />
          </div>
        </div>
        <div className="w-[39%] overflow-auto h-full bg-white rounded-lg border border-border p-5">
          <h1 className="text-xl font-semibold text-text mb-10 ">
            Recent Activity
          </h1>

          {recentActivityLoader ? (
            <Loader />
          ) : (
            recentActivity.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full p-2 mt-2   flex items-center justify-between border border-border bg-bg-soft rounded-lg "
                >
                  <div className="w-10 bg-cover  bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrb4OvIZOz-Z2RvlJ0xDl1E_e3qOfh_TQK1va1Z7gJ4g&s=10')] h-10 rounded-full border overflow-hidden border-border ">
                    <img
                      className="w-full h-full object-cover "
                      src={item?.user?.profile?.profilePic}
                      alt=""
                    />
                  </div>
                  <div className="w-[80%] h-full ">
                    {" "}
                    <h4 className="text-lg ">{item.action}</h4>{" "}
                    <h5>{item.entityType}</h5>
                    <p className="text-md text-muted">
                      {" "}
                      {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                      })}
                    </p>{" "}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="w-full p-5 rounded-lg shadow bg-white mt-10 ">
        <h1
          className="text-xl font-bold text-text
         "
        >
          Recent User
        </h1>
        <table className="w-full rounded-lg overflow-hidden  mt-2 ">
          <thead>
            <tr className="bg-dark text-white  text-lg  w-full">
              <th className="p-2 border  border-border">idx</th>
              <th className="p-2 border border-border">Name</th>
              <th className="p-2 border border-border">Email</th>
              <th className="p-2 border border-border">Role</th>
              <th className="p-2 border border-border">Status</th>
            </tr>
          </thead>
          <tbody className="bg-bg-soft">
            {dashboardData?.recentUser?.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="p-2 border border-border  ">{idx + 1}</td>
                  <td className="p-2 border border-border  ">{item.name}</td>
                  <td className="p-2 border border-border  ">{item.email}</td>
                  <td className="p-2 border border-border  ">{item.role}</td>
                  <td className="p-2 border border-border">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
