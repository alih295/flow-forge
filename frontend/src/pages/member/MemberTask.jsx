import { FileIcon, Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import TaskCard from "../../components/member/tasks/TaskCard";
import { fetchMemberTasks } from "../../services/TaskServices";
import Loader from "../../components/Loader";

function MemberTask() {
  const [loading, setLoading] = useState(false);
  const [totalTask, setTotalTask] = useState([])
  const [todoTask, setTodoTask] = useState(0)
  const [inProgressTask, setInProgressTask] = useState(0)
  const [completedTask, setCompletedTask] = useState(0)

  useEffect(() => {
    const getTask = async () => {
      try {
        setLoading(true);
        const response = await fetchMemberTasks();
        setTotalTask(response?.totalTask)
        setCompletedTask(response?.completedTask)
        setTodoTask(response?.todoTask)
        setInProgressTask(response?.inProgressTask)
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getTask();
  }, []);

  return (
    <section className="w-full p-6 min-h-screen bg-bg-soft">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-xl font-semibold text-text ">My Tasks</h1>
          <p className="text-sm text-muted">
            Manage and track your assigned tasks
          </p>
        </div>
        <span className="flex rounded-full px-2 shrink-0 bg-blue-100 text-blue-500 font-medium ">
          {totalTask.length} tasks
        </span>
      </div>

      <div className="w-full py-2 rounded-xl px-4 flex mt-10 border border-border group   items-center justify-between">
        <div className="flex  items-center  flex-1   ">
          <Search size={18} className="shrink-0" />{" "}
          <input
            placeholder="search tasks..."
            type="search"
            className="px-4 w-full outline-none focus:group-border-pimary"
          />
        </div>
        <Filter size={18} />
      </div>

      <div className="w-full flex items-center justify-between mt-10">
        <div className="w-[24%] px-2 py-4 bg-white rounded-lg">
          <p className="text-muted">All</p>
          <h4 className="text-lg font-medium">{totalTask.length} </h4>
        </div>
        <div className="w-[24%] px-2 py-4 bg-white rounded-lg">
          <p className="text-muted">todo</p>
          <h4 className="text-lg font-medium">{todoTask}</h4>
        </div>
        <div className="w-[24%] px-2 py-4 bg-white rounded-lg">
          <p className="text-muted">in-progress</p>
          <h4 className="text-lg font-medium">{inProgressTask}</h4>
        </div>
        <div className="w-[24%] px-2 py-4 bg-white rounded-lg">
          <p className="text-muted">completed</p>
          <h4 className="text-lg font-medium">{completedTask}</h4>
        </div>
      </div>

      <div className="w-full my-10">
        <h1 className="text-xl font-semibold">Task List</h1>

        <div className="w-full mt-5 min-h-64 border flex flex-col gap-5 border-border rounded-xl p-2">
          {
            loading ? <div className="w-full flex items-center justify-center "><Loader/> </div> : totalTask.length<= 0 ? <div> </div>  : totalTask.map((item,idx)=>{
                return(
                    <TaskCard data ={item}/>
                )
            })
          }
        </div>
      </div>
    </section>
  );
}

export default MemberTask;
