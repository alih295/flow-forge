import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchAvailabeUser } from "../services/WorkspaceServices";

function MemberModel({ isOpen, setMemberModel, id }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState('member')

  useEffect(() => {
    const getAvailableUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchAvailabeUser(id);
        setUsers(data.users);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getAvailableUsers();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(userId);
      console.log(role)
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className={`fixed z-50  inset-0 transition-all duration-300  ${isOpen ? "visible" : "invisible"} `}
    >
      <div
        onClick={() => setMemberModel(false)}
        className={`absolute
         inset-0   bg-black/40 transition-opacity duration-300  ${isOpen ? "opacity-100" : "opacity-0"} `}
      />
      <div
        className={`absolute p-5 bg-white rounded-xl transition-all duration-300   top-1/2 left-1/2  -translate-x-1/2 w-1/2  max-w-100 h-100 ${isOpen ? "-translate-y-1/2 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <header
          className="w-full flex
         items-center justify-between text-black border-b border-black py-1.5
         "
        >
          <h1>Add Member</h1>{" "}
          <span
            className="cursor-pointer"
            onClick={() => {
              setMemberModel(false);
            }}
          >
            <X />
          </span>
        </header>
        <form onSubmit={submitHandler} className="w-full flex flex-col items-center gap-5
         h-60 mt-10  ">
          <div className="w-full py-1.5 border border-border rounded-xl ">
            <h1 className="text-lg font-medium">Select User</h1>
            <select onChange={(e)=>setUserId(e.target.value)}
              className="w-full border py-2 px-6 rounded-xl mt-4
                 "
            >
                <option disabled value="">Select user</option>
              {users.map((item, idx) => {
                return (
                  <option key={idx}  value={item._id} >
                    name {item.name} email {item.email}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full ">
            <h1 className="text-lg font-medium">Select Role</h1>
            <select className="w-full px-6 mt-4 py-2 border rounded-lg " onChange={(e)=>setRole(e.target.value)}>
                <option disabled value="">Select Role</option>
                <option value="member">member</option>
                <option value="manager">manager</option>
            </select>
          </div>



          <button className="w-full py-2 bg-accent text-white font-medium rounded-xl cursor-pointer">Add member</button>
        </form>
      </div>
    </div>
  );
}

export default MemberModel;
