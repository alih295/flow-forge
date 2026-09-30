import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { fetchUser } from "../../services/UserService";
import Loader from "../../components/Loader";

function UsersManagement() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUser(page, limit);
        setUsers(response.users);
        setTotalPages(response.totalPage);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [page]);

  return (
    <section className="w-full min-h-screen p-6  font-[Montserrat]">
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
      <div>
        {loading? <Loader/> :<table className="w-full mt-10 rounded-lg overflow-hidden ">
          <thead>
            <tr className="w-full text-lg bg-dark text-white">
              <th className="border border-border text-left p-2 ">Name </th>
              <th className="border border-border text-left p-2 ">Email </th>
              <th className="border border-border text-left p-2 ">Role </th>
              <th className="border border-border text-left p-2 ">Status </th>
              <th
                className="border text-left
              border-border p-2 "
              >
                Action{" "}
              </th>
            </tr>
          </thead>
          <tbody className="bg-bg-soft">
            {users.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="p-2 border border-black">{item.name}</td>
                  <td className="p-2 border border-black">{item.email}</td>
                  <td className="p-2 border border-black">{item.role}</td>
                  <td className="p-2 border border-black">{item.status}</td>
                  <td className="p-2 border border-black">
                    <EllipsisVertical />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>}
        
        <div className="w-full flex items-center justify-center gap-10  py-2 mt-4 mb-5">
          <button onClick={()=> setPage((prev)=>prev - 1)} className="px-4 py-2 bg-dark text-white rounded-lg cursor-pointer disabled:text-gray-300 disabled:bg-muted" disabled={page === 1}>Previous</button>{" "}
          <p>
            {" "}
            page <span className="text-lg font-medium">{page}</span> of  <span className="text-lg font-medium">{totalPages}</span>
          </p>{" "}
          <button onClick={()=>setPage((prev)=>prev+1)} className="px-4 py-2 bg-dark text-white rounded-lg cursor-pointer disabled:text-gray-300 disabled:bg-muted"  disabled={page === totalPages}>next</button>
        </div>
      </div>
    </section>
  );
}

export default UsersManagement;
