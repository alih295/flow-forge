import React from "react";
import { CircleCheck, Clock1, FolderKanban, ListChecks } from "lucide-react";
import TaskProgress from "../../components/member/TaskProgress";
import MyWorkspace from "../../components/member/MyWorkspace";
import RecentActivity from "../../components/member/RecentActivity";
import UpComingDeadlines from "../../components/member/UpComingDeadlines";
import { useEffect, useState } from "react";
import { fetchMemberDashboard } from "../../services/memberDashboardService";
import Loader from '../../components/Loader'

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [myTask, setMyTask] = useState([])
  const [completedTask, setCompletedTask] = useState(0)
  const [inProgressTask, setInProgressTask] = useState(0)
  const [totalWorkspace, setTotalWorkspace] = useState([])
  const [recentActivity,setRecentActivity] = useState([])



  useEffect(() => {
    const getMemberDashboard = async () => {
      try {
        setLoading(true);
        const response = await fetchMemberDashboard();
        console.log(response)
        setMyTask(response.data.myTasks)
        setCompletedTask(response.data.completedTask)
        setInProgressTask(response.data.inProgressTask)
        setTotalWorkspace(response.data.myWorkspaces)
        setRecentActivity(response.data.recentActivity)

      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMemberDashboard();
  }, []);
  if(loading){
    return <div className="w-full h-full flex items-center justify-center">
      <Loader/>
    </div>
  }

  return (
    <section className="w-full min-h-screen p-6">
      <div className="w-full flex flex-wrap items-center gap-4 justify-between ">
        <div className="w-[49%] p-4    bg-white rounded-xl border border-border">
          <div className="w-full flex items-center justify-between ">
            <span>
              <ListChecks size={18} />
            </span>{" "}
            <h6>My Tasks</h6>
          </div>
          <h1 className="mt-4 text-xl font-bold text-text">{myTask.length}</h1>
          <p className="text-muted mt-2">task assigned</p>
        </div>
        <div className="w-[49%] p-4    bg-white rounded-xl border border-border">
          <div className="w-full flex items-center justify-between ">
            <span>
              <Clock1 size={18} />
            </span>{" "}
            <h6>In Progress</h6>
          </div>
          <h1 className="mt-4 text-xl font-bold text-text">{inProgressTask}</h1>
          <p className="text-muted mt-2">currently working</p>
        </div>
        <div className="w-[49%] p-4    bg-white rounded-xl border border-border">
          <div className="w-full flex items-center justify-between ">
            <span>
              <CircleCheck size={18} />
            </span>{" "}
            <h6>Completed Task</h6>
          </div>
          <h1 className="mt-4 text-xl font-bold text-text">{completedTask}</h1>
          <p className="text-muted mt-2">task finished</p>
        </div>
        <div className="w-[49%] p-4    bg-white rounded-xl border border-border">
          <div className="w-full flex items-center justify-between ">
            <span>
              <FolderKanban size={18} />
            </span>{" "}
            <h6>Wrkspaces</h6>
          </div>
          <h1 className="mt-4 text-xl font-bold text-text">{totalWorkspace.length}</h1>
          <p className="text-muted mt-2">joined workspace</p>
        </div>
      </div>
      <TaskProgress data={myTask} />
      <MyWorkspace data={totalWorkspace} />
      <RecentActivity  data={recentActivity}  />
      <UpComingDeadlines />
    </section>
  );
}

export default Dashboard;
