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
        toast.error(err?.response?.data?.message || err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    getAdminDashboard();
  }, []);

  return (
    <div className="w-full p-6 md:p-8 min-h-screen space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Projects Overview
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Monitor overall platform performance and user management metrics.
          </p>
        </div>
      </div>

      {/* Main Dashboard Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Main Stat Card - Total Users (Takes 7 cols on large screens) */}
        <div className="lg:col-span-7 bg-[var(--color-anvil-blue)] text-[var(--text-light)] p-6 rounded-2xl shadow-sm border border-white/10 flex flex-col justify-between transition-all duration-300 hover:shadow-md min-h-[300px]">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-white/20 rounded w-1/3"></div>
              <div className="h-12 bg-white/20 rounded w-1/2"></div>
              <div className="h-4 bg-white/20 rounded w-2/3"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-wider text-white/80">
                  User Statistics
                </span>
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="my-6">
                <h2 className="text-sm font-medium text-white/70">Total Registered Users</h2>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {dashboardData?.totalUsers ?? 0}
                  </span>
                  <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> +12% this month
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                <span>Active platform accounts</span>
                <span className="font-semibold text-white">Updated live</span>
              </div>
            </>
          )}
        </div>

        {/* Secondary Stat Cards Column (Takes 5 cols on large screens) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Active Projects Card */}
          <div className="bg-[var(--color-forge-orange)] text-white p-6 rounded-2xl shadow-sm border border-white/10 flex flex-col justify-between h-1/2 min-h-[140px] transition-all duration-300 hover:shadow-md">
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-white/20 rounded w-1/3"></div>
                <div className="h-8 bg-white/20 rounded w-1/4"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Active Projects
                  </span>
                  <FolderKanban className="w-5 h-5 text-white/90" />
                </div>
                <div>
                  <span className="text-3xl font-bold">
                    {dashboardData?.totalProjects ?? 0}
                  </span>
                  <p className="text-xs text-white/80 mt-1">Projects currently in progress</p>
                </div>
              </>
            )}
          </div>

          {/* System Health / Role Overview Card */}
          <div className="bg-[var(--color-flow-cyan)] text-white p-6 rounded-2xl shadow-sm border border-white/10 flex flex-col justify-between h-1/2 min-h-[140px] transition-all duration-300 hover:shadow-md">
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-white/20 rounded w-1/3"></div>
                <div className="h-8 bg-white/20 rounded w-1/4"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    System Managers
                  </span>
                  <ShieldCheck className="w-5 h-5 text-white/90" />
                </div>
                <div>
                  <span className="text-3xl font-bold">
                    {dashboardData?.totalManagers ?? 0}
                  </span>
                  <p className="text-xs text-white/80 mt-1">Assigned administrative managers</p>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;