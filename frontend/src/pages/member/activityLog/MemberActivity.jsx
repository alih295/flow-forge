import { Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import ActivityCard from "../../../components/member/activity/ActivityCard";
import { fetchActivityLog } from "../../../services/ActivityServices";
import Loader from "../../../components/Loader";

function MemberActivity() {

  const [loading, setLoading] = useState(false)
  const [activity, setActivity] = useState([])

  useEffect(() => {
    const getActivity = async()=>{
      try{
          setLoading(true)
          const response = await fetchActivityLog()
          
          if(response.success){
            setActivity(response.activities)
          }
      }catch(err){
        console.error(err.message)
      }finally{
        setLoading(false)
      }
    }
    getActivity()
  
   
  }, [])

  




  return (
    <section className="w-full flex flex-col gap-10 min-h-screen bg-bg-soft p-6">
      <header className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl text-text font-bold">Activity Log</h1>
          <p className="text-sm text-muted">
            Track recent activity across your workspace
          </p>
        </div>

        <span className="px-2 rounded-full bg-green-600/20 text-green-600 font-semibold">
          Live Updates
        </span>
      </header>
      <div className="w-full flex items-center bg-white border border-border py-2 rounded-xl px-4 justify-between">
        <div className="flex flex-1 items-center justify-center gap-2">
          <Search size={18} />{" "}
          <input
            placeholder="Search Activity.."
            className="w-full outline-none text-md pr-4 "
            type="search"
          />
        </div>
        <span className="flex shrink-0">
          <Filter size={18} />
        </span>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="w-[33%] p-4  bg-white  rounded-xl border border-border">
          <p className="text-sm text-muted mb-2">Total</p>
          <h1 className="text-lg font-semibold ">{activity.length}</h1>
        </div>
        <div className="w-[33%] p-4  bg-white  rounded-xl border border-border">
          <p className="text-sm text-muted mb-2">today</p>
          <h1 className="text-lg font-semibold ">05</h1>
        </div>
        <div className="w-[33%] p-4  bg-white  rounded-xl border border-border">
          <p className="text-sm text-muted mb-2">This Week</p>
          <h1 className="text-lg font-semibold ">08</h1>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Filters</h1>
        <p>Workspace</p>
        <select
          value={""}
          className="w-full px-4 py-2 border rounded-xl  border-border outline-none "
        >
          <option disabled value="">
            All Workspace
          </option>
          <option disabled value="">
            Pharmacy workspace
          </option>
          <option disabled value="">
            Manage ment workspace
          </option>
        </select>

        <p className="text-muted">Activty Type</p>
        <div className="flex items-center gap-2">
          <p
            className="text-lg bg-blue-600/20 text-blue-600 font-medium
           px-2 rounded-full "
          >
            All
          </p>
          <p
            className="text-lg bg-gray-600/40 text-white font-medium
           px-2 rounded-full "
          >
            Tasks
          </p>
          <p
            className="text-lg bg-gray-600/40 text-white font-medium
           px-2 rounded-full "
          >
            Members
          </p>
          <p
            className="text-lg bg-gray-600/40 text-white font-medium
           px-2 rounded-full "
          >
            Workspace
          </p>
          <p
            className="text-lg bg-gray-600/40 text-white font-medium
           px-2 rounded-full "
          >
            Comments
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 ">
        <h1 className="text-xl font-semibold text-text">Recent Activities</h1>
      {
        loading ? <Loader/> : activity.length<=0 ? <div> </div> : activity.map((item,idx)=>{
            return (<ActivityCard data={item}/>)
        })
      }
      </div>
    </section>
  );
}

export default MemberActivity;
