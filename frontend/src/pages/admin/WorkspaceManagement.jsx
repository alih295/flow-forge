import { EllipsisVertical } from "lucide-react";
import React from "react";

function WorkspaceManagement() {
  return (
    <section className="p-6 w-full min-h-screen font-[Montserrat] ">
      <div className="w-full flex items-center justify-between py-2 border-b border-border">
        <h1 className="text-xl text-text font-bold">Workspace</h1>
        <button className="px-4 py-2 bg-accent text-white rounded-lg font-medium text-lg cursor-pointer opacity-90 hover:opacity-100">
          + Create Workspace
        </button>
      </div>
      <div className="w-full mt-5 flex py-2 gap-10">
        <input
          placeholder="search wokspaces..."
          className="w-64 px-6 outline-none  py-2.5 border border-border rounded-lg focus:border-primary"
          type="search"
        />
        <select className="w-52 border px-4 border-border rounded-lg">
          <option disabled>status </option>{" "}
          <option value="active">active</option>{" "}
          <option value="blocked">blocked</option>
        </select>
      </div>
      <div className="w-full overflow-hidden mt-5 rounded-xl ">
        <table className="w-full bg-bg-soft">
          <thead>
            <tr className="w-full bg-dark text-white">
              {/* text-left explicitely center alignment ko override karega */}
              <th className="px-4 border border-border py-3.5 text-left">
                Name
              </th>
              <th className="px-4 border border-border py-3.5 text-left">
                Owner
              </th>
              <th className="px-4 border border-border py-3.5 text-left">
                Members
              </th>
              <th className="px-4 border border-border py-3.5 text-left">
                Status
              </th>
              <th className="px-4 border border-border py-3.5 text-right">
                Action
              </th>{" "}
              {/* Actions usually right aligned hotay hain */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3.5 border border-border ">
                first workspace
              </td>
              <td className="px-4 py-3.5 border border-border ">Ali haider</td>
              <td className="px-4 py-3.5 border border-border ">5</td>
              <td className="px-4 py-3.5 border border-border ">active</td>
              <td className="px-4 py-3.5 border border-border ">
                <EllipsisVertical size={18} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-full bg-red-600 py-4 px-4">
            <button>previous</button>
            <p>page 1 of 10 </p>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceManagement;
