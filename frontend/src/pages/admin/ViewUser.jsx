import React, { useEffect, useState } from "react";
import { X, Copy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById } from "../../services/UserService";
import Loader from "../../components/Loader";

function ViewUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getSingleUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserById(id);
        setUser(data.user)
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSingleUser()

  }, [id]);

  if(loading){
    return <div className="w-full h-full flex items-center justify-center"><Loader/></div>
  }

  return (
    <section className="w-full rounded-xl   min-h-screen overflow-auto p-6  font-[Montserrat] bg-bg-soft ">
      <div className="w-full flex rounded-xl  bg-white border-b p-2  pb-6 border-border  items-center justify-between">
        <div className="w-[40%] h-full flex items-center justify-center gap-5">
          <div className="w-20 overflow-hidden h-20 bg-red-400 rounded-full">
            <img
              className="w-full h-full bg-cover bg-top"
              src={user?.profile?.profilePic || '../../../public/images/defaultavatar.jpg'}
              alt=""
            />
          </div>
          <div className="w-[70%] flex flex-col items-start justify-center gap-3 ">
            <h1 className="text-xl font-bold capitalize text-text">
              {user?.name}
            </h1>
            <p className="text-lg text-muted">{user?.email}</p>
            <p className=" flex items-center justify-center-safe gap-5">
              <span className="bg-green-500/50 p-1 px-2 rounded-full capitalize font-semibold text-green-800">
                {user.status}
              </span>{" "}
              <span className="text-blue-700 font-semibold capitalize p-1 px-2 rounded-full bg-blue-600/50">
                {user.role}
              </span>
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate("/admin/users")}
          className="cursor-pointer "
        >
          <X />
        </div>
      </div>
      <div className="w-full rounded-xl p-2 py-6 border-b border-border bg-white mt-5">
        <h1 className="text-xl font-semibold ">Personal Information</h1>
        <div className="w-full mt-5 flex items-center justify-start gap-70 ">
          <div>
            <p className="text-muted text-sm capitalize ">full name</p>
            <h4 className="text-lg capitalize font-semibold">{user.name}</h4>

            <p className="text-muted mt-5 text-sm capitalize ">email Address</p>
            <h1 className="text-lg font-semibold">{user.email}</h1>
          </div>
          <div>
            <p className="text-muted text-sm capitalize ">username</p>
            <h4 className="text-lg font-semibold ">{user.name}</h4>

            <p className="text-muted text-sm capitalize mt-5">global Role</p>
            <h1 className="text-lg font-semibold">{user.role}</h1>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-xl p-2 py-6 mt-5 ">
        <h1 className="text-xl font-semibold">Account Information</h1>
        <div className="w-full flex items-center justify-between mt-5">
          <div>
            <p className="text-muted ">Account status</p>{" "}
            <h6 className="text-lg font-medium">{user.status}</h6>
          </div>{" "}
          <div className="px-4 p-1 bg-green-500/20 text-green-700 rounded-full font-semibold">
            {user.isVerify?'verify' : 'not verified'}
          </div>
        </div>
        <div className="w-full mt-5  flex items-center justify-between">
          <div>
            <p className="text-muted ">UserId</p>{" "}
            <h6 className="text-lg font-medium">{user._id}</h6>
          </div>
          <div className="cursor-pointer">
            <Copy size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewUser;
