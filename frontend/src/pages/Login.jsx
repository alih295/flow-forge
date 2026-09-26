import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import { UserContext } from "../Context/AppContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = {
        email: email,
        password: password,
      };
      const data = await loginUser(userData);
      console.log(data.user.role)
      if (data?.user) {
        toast.success("Login successfully");
        setUser(data.user);

        setEmail("");
        setpassword("");

        const userRole = data.user.role;
        if (userRole === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (userRole === "manager") {
          navigate("/manager/dashboard", { replace: true });
        } else {
          navigate("/user/dashboard", { replace: true });
        }
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full font-[Montserrat] flex items-center justify-center flex-col h-screen bg-(--bg-soft)">
      <div>
        <Toaster></Toaster>
      </div>
      <h1 className="text-3xl font-bold text-text ">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="w-1/3 border flex flex-col gap-5  rounded-xl  p-5  mt-5 border-border"
      >
        <div>
          <label> Enter Email </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="Enter Email "
            type="email"
            className="w-full text-lg outline-none mt-2 border px-4 py-2 border-border rounded-xl  "
          />
        </div>
        <div>
          <label> Enter Password</label>
          <input
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="Enter Password"
            className="w-full text-lg mt-2  outline-none border px-4 py-2 border-border rounded-xl "
          />
        </div>

        <p>
          Don't have an Acount |{" "}
          <Link className="text-text font-bold" to={"/signup"}>
            Sign-up
          </Link>
        </p>

        <button
          className="w-full
        py-2 bg-accent  rounded-xl text-white font-semibold text-lg cursor-pointer opacity-90 hover:opacity-100 "
        >
          {loading ? <Loader /> : "login"}
        </button>
      </form>
    </section>
  );
}

export default Login;
