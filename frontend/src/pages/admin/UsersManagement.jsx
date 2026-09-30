import React from "react";

function UsersManagement() {
  return (
    <section className="w-full h-full p-6 font-[Montserrat]">
      <div className="w-full flex items-center justify-between py-2 border-b border-border">
        <h1 className="text-xl text-text font-bold">Users</h1>{" "}
        <button className="px-6 py-2.5 bg-accent rounded-xl text-white font-medium text-lg cursor-pointer hover:opacity-100 opacity-90">
          {" "}
          + Add Users
        </button>
      </div>
      <div className="w-full py-2 mt-5 flex items-center justify-between">
        <input
          type="search"
          className="w-64 px-4 py-2.5 outline-none border-border  border rounded-xl focus:border-primary"
          placeholder="search users..."
        />
        <select className=" w-64  rounded-xl  px-4 py-2.5 text-sm font-medium  ">
          <option value="" disabled hidden>
            Select Role
          </option>
          <option value="manager">Manager</option>
          <option value="member">Member</option>
        </select>
        <select className=" w-64  rounded-xl    px-4 py-2.5 text-sm font-medium  ">
          <option value="" disabled hidden>
            Select Status
          </option>
          <option value="manager">Active</option>
          <option value="member">Blocked</option>
        </select>
      </div>
      <table className="w-full mt-10 rounded-lg overflow-hidden ">
        <thead>
          <tr className="w-full text-lg bg-dark text-white">
            <th className="border border-border text-left p-2 ">Name </th>
            <th className="border border-border p-2 ">Email </th>
            <th className="border border-border p-2 ">Role </th>
            <th className="border border-border p-2 ">Status </th>
            <th className="border  border-border p-2 ">Action </th>
            
          </tr>
        </thead>
        <tbody className="bg-bg-soft">
          <tr>
            <td className="text-center border border-black">ali</td>
            <td className="p-2 border border-black">ali</td>
            <td className="p-2 border border-black">ali</td>
            <td className="p-2 border border-black">ali</td>
            
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default UsersManagement;
