import React, { useEffect, useState } from "react";
import { adminDashboard } from "../services/AdminServices";
import toast from "react-hot-toast";
import { Users, FolderKanban, ShieldCheck, ArrowUpRight } from "lucide-react";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const getAdminDashboard = async () => {
      try {
        setLoading(true);
        const data = await adminDashboard();
        if (data?.success) {
          setDashboardData(data.dashboard);
        }
      } catch (err) {
        console.error(err.message);
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    getAdminDashboard();
  }, []);
  console.log(dashboardData);

  return (
    <div className="w-full p-6 font-[Montserrat] min-h-screen ">
      <div className="w-full flex items-center justify-between ">
        <div>
          <h1 className="text-xl text-text font-bold ">Dashboard</h1>{" "}
          <p className="text-sm text-muted">
            System overview and activity
          </p>{" "}
        </div>
        <button className="px-4 py-2 bg-accent text-white text-lg font-semibold cursor-pointer rounded-lg">
          + Create Workspace
        </button>
      </div>
      <div className="w-full mt-10 flex items-center justify-between  h-50 ">
        <div className="w-[24%]   bg-white  p-4 shadow rounded-lg ">
          <h1 className="text-xl text-primary font-semibold ">Total Users</h1>

          <div className="w-full mt-8 ">
            <h4 className="text-3xl text-dark font-bold ">
              {dashboardData?.totalUsers}
            </h4>{" "}
            <p className="text-muted text-sm">12% from last month</p>
          </div>
        </div>
        <div className="w-[24%]   bg-white  p-4 shadow rounded-lg ">
          <h1 className="text-xl text-primary font-semibold ">Active Users</h1>

          <div className="w-full mt-8 ">
            <h4 className="text-3xl text-dark font-bold ">
              {dashboardData?.activeUsers}
            </h4>{" "}
            <p className="text-muted text-sm">18% from last month</p>
          </div>
        </div>
        <div className="w-[24%]   bg-white  p-4 shadow rounded-lg ">
          <h1 className="text-xl text-primary font-semibold ">
            Total Workspaces
          </h1>

          <div className="w-full mt-8 ">
            <h4 className="text-3xl text-dark font-bold ">
              {dashboardData?.totalWorkspaces}
            </h4>{" "}
            <p className="text-muted text-sm">20% from last month</p>
          </div>
        </div>
        <div className="w-[24%]   bg-white  p-4 shadow rounded-lg ">
          <h1 className="text-xl text-primary font-semibold ">Total Tasks</h1>

          <div className="w-full mt-8 ">
            <h4 className="text-3xl text-dark font-bold ">
              {dashboardData?.totalTasks}
            </h4>{" "}
            <p className="text-muted text-sm">15% from last month</p>
          </div>
        </div>
      </div>
      <div className="w-full h-100 flex items-center justify-between">
        <div className="w-[59%] h-full  p-5 bg-white border border-border  rounded-lg">
          <h1 className="text-xl font-semibold text-text">Task Overview</h1>
          <div className="w-full h-[70%] mt-5  bg-red-600">
            <div className="w-5  bg-bg-soft "></div>
            
          </div>
        </div>
        <div className="w-[39%] h-full bg-white rounded-lg border border-border p-5"></div>
      </div>
    </div>
  );
}

export default AdminDashboard;
