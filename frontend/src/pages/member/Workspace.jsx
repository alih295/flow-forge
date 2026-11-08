import { Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchWorkspace } from "../../services/WorkspaceServices";

function Workspace() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getWorkspace = async () => {
      try {
        setLoading(true);
        const response = await fetchWorkspace();
        console.log(response);
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
          04 Workspaces
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

      <div className="w-full ml-10"></div>
    </section>
  );
}

export default Workspace;
