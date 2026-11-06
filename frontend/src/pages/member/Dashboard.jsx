import React from "react";
import { ListChecks } from "lucide-react";
import TaskProgress from "../../components/member/TaskProgress";
import MyWorkspace from "../../components/member/MyWorkspace";
import RecentActivity from "../../components/member/RecentActivity";
import UpComingDeadlines from "../../components/member/UpComingDeadlines";

function Dashboard() {
  return (
    <section className="w-full min-h-screen p-6">
      <div className="w-full flex flex-wrap items-center gap-4 justify-between ">
        <div className="w-[49%] p-4    bg-white rounded-xl border border-border">
          <div className="w-full flex items-center justify-between ">
            <span>
              <ListChecks />
            </span>{" "}
            <h6>My Tasks</h6>
          </div>
          <h1 className="mt-4 text-xl font-bold text-text">24</h1>
          <p className="text-muted mt-2">task assigned</p>
        </div>
        <div className="w-[49%] p-4    bg-white rounded-xl border border-border">
          <div className="w-full flex items-center justify-between ">
            <span>
              <ListChecks />
            </span>{" "}
            <h6>My Tasks</h6>
          </div>
          <h1 className="mt-4 text-xl font-bold text-text">24</h1>
          <p className="text-muted mt-2">task assigned</p>
        </div>
        <div className="w-[49%] p-4    bg-white rounded-xl border border-border">
          <div className="w-full flex items-center justify-between ">
            <span>
              <ListChecks />
            </span>{" "}
            <h6>My Tasks</h6>
          </div>
          <h1 className="mt-4 text-xl font-bold text-text">24</h1>
          <p className="text-muted mt-2">task assigned</p>
        </div>
        <div className="w-[49%] p-4    bg-white rounded-xl border border-border">
          <div className="w-full flex items-center justify-between ">
            <span>
              <ListChecks />
            </span>{" "}
            <h6>My Tasks</h6>
          </div>
          <h1 className="mt-4 text-xl font-bold text-text">24</h1>
          <p className="text-muted mt-2">task assigned</p>
        </div>
      </div>
      <TaskProgress/>
      <MyWorkspace/>
      <RecentActivity/>
      <UpComingDeadlines/>




    </section>
  );
}

export default Dashboard;
