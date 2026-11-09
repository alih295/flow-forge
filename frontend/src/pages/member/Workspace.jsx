import { ArrowBigLeft, ArrowUpRight, Code, Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchWorkspace } from "../../services/WorkspaceServices";
import Loader from '../../components/Loader';

function Workspace() {
  const [loading, setLoading] = useState(false);
  const [workspace, setworkspace] = useState([])
  useEffect(() => {
    const getWorkspace = async () => {
      try {
        setLoading(true);
        const response = await fetchWorkspace();
        console.log(response.workspace)
        setworkspace(response?.workspace)
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    getWorkspace();
  }, []);

  return (
    <section className="w-full min-h-screen p-6">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">My Workspace</h1>
          <p className="text-sm text-muted mt-2">
            Manage and explore your workspace
          </p>
        </div>
        <span className="px-2 rounded-full bg-green-200 text-green-600 text-lg font-medium">
          {workspace.length} Workspaces
        </span>
      </div>
      <div className="w-full flex mt-10 items-center justify-between">
        <div className="flex-1 items-center flex ">
          <Search size={18} />{" "}
          <input
            placeholder="Search workspaces..."
            className="flex-1 px-4 outline-none "
            type="search"
          />
        </div>
        <Filter size={18} />
      </div>

      <div className="w-full flex items-center justify-between mt-10">
        {
          loading ? <div className="w-full flex items-center justify-center"><Loader/></div> : workspace.length <=0 ? <div> </div> : workspace.map((item,idx)=>{
            return(<div key={item._id} className="w-[49%]  bg-white border border-border rounded-xl p-4  ">
          <div className="w-full flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-200 ">
              <Code size={18}/>
            </span>{" "}
            <span className="rounded-full px-2 bg-green-100 text-green-600 font-medium">
              Active
            </span>
          </div>
          <div className="w-full mt-2">
            <h1 className="text-lg font-semibold capitalize">{item?.name}</h1>
            <p className="text-sm text-muted">{item?.description}</p>
            <div className="w-full mt-4 flex items-center justify-between">
              <span>{item?.members} members</span> <span>{item?.tasks} task</span>
            </div>
          </div>
          <div className="w-full mt-5 flex items-center justify-between py-2 border-t-2 border-border"><p className="text-sm">owner: <span className="text-lg font-medium capitalize text-accent">{item?.owner?.name}</span> </p>  <ArrowUpRight  size={18}/> </div>
        </div>)
          })
        }
      </div>
    </section>
  );
}

export default Workspace;
