import React, { useEffect, useState } from "react";
import ActiviyCard from "../../components/ActiviyCard";
import { getRecentActivity } from "../../services/AdminServices";
import { fetchActivityLog, getActivityWorkspaces } from "../../services/ActivityServices";

function ActivityLog() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [workspace, setWorkspace] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)
  const [page, setPage] = useState(0)
  const limit = 10
  const activityTypes = [
  { label: "All Activities", value: "" },
  { label: "Task Created", value: "task_created" },
  { label: "Task Updated", value: "task_updated" },
  { label: "Task Deleted", value: "task_deleted" },
  { label: "Task Assigned", value: "task_assigned" },
  { label: "Status Changed", value: "status_changed" },
  { label: "Member Added", value: "member_added" },
  { label: "Member Removed", value: "member_removed" },
  { label: "Workspace Created", value: "workspace_created" },
  { label: "Workspace Updated", value: "workspace_updated" },
];

  useEffect(() => {
    const fetchActivityWorkspace = async () => {
      try {
        const data = await getActivityWorkspaces()
        if(data.success){
          setWorkspace(data.workspaces)
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchActivityWorkspace()
  }, []);
  useEffect(() => {
    const getActivity = async()=>{
      try{
        setLoading(true)
        const data = await fetchActivityLog(search , action, workspace , page , limit)
        console.log(data)
      }catch(err){
        toast.error(err.message)
      }finally{
        setLoading(false)
      }
    }
    getActivity()
    
  }, [action , selectedWorkspace,search,page])
  

  return (
    <div className="w-full flex flex-col gap-5 min-h-screen font-[Montserrat] bg-bg-soft px-6 py-10 ">
      <header className="w-full">
        <h1 className=" text-2xl font-bold text-text">Activity</h1>
        <p className="text-sm text-muted ">
          Track all activities accross your workspaces
        </p>
      </header>
      <div className="w-full grid  gap-5 items-center grid-cols-3">
        <div className="bg-white text-left rounded-xl p-4 ">
          <p className="text-sm capitalize ">total activity</p>
          <h5 className="text-2xl mt-2 font-semibold text-text">248</h5>
        </div>
        <div className="bg-white text-left rounded-xl p-4 ">
          <p className="text-sm capitalize ">Today</p>
          <h5 className="text-2xl mt-2 font-semibold text-text">12</h5>
        </div>
        <div className="bg-white text-left rounded-xl p-4 ">
          <p className="text-sm capitalize ">activity users</p>
          <h5 className="text-2xl mt-2 font-semibold text-text">20</h5>
        </div>
      </div>
      <h1 className="text-xl font-semibold ">Filters</h1>
      <div className="w-full">
        <p>Search Activiy</p>
        <input
          className="w-full px-6 outline-none focus:border-primary py-2 border border-border rounded-lg"
          type="search"
          placeholder="search by users or activity"
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full mt-5 border border-border rounded-xl p-4">
            <p>Workspace</p>
            <select value={selectedWorkspace} onChange={(e)=>setSelectedWorkspace(e.target.value)} className="w-full mt-3 outline-none ">
              <option disabled value="">
                All Workspaces
              </option>
              {
                workspace.map((item,idx)=>{
                  return <option key={idx} value={item._id}>{item.name}</option>
                })
              }
            </select>
          </div>
          <div className="w-full mt-5 border border-border rounded-xl p-4">
            <p>Acctivity Type</p>
            <select value={action} onChange={(e)=>setAction(e.target.value)} className="w-full mt-3 outline-none ">
              {activityTypes.map((item,idx)=>{
                return(<option key={idx} value={item.value}>
                {item.label}
              </option>)
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div className="w-full flex items-center ">
          <div className="flex-1 ">
            <h1 className="text-xl font-semibold">Recent Activity</h1>
          </div>
          <p className="shrink-0 text-sm text-muted">Latest First</p>
        </div>

        <div className="w-full flex flex-col gap-5 py-6 ">
          {activity.map((item, idx) => {
            return <ActiviyCard item={item} />;
          })}
          <div className="w-full flex items-center justify-center gap-5">
            <button className="px-4 py-1.5 bg-dark rounded-full text-white cursor-pointer ">
              Previous
            </button>
            <div>
              <p>
                page <span>1</span> of <span>150</span>{" "}
              </p>
            </div>
            <button className="px-4 py-1.5 bg-dark text-white font-medium rounded-full cursor-pointer ">
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityLog;
