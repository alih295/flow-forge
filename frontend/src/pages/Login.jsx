import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = {
        email: email,
        password: password,
      };
      const data = await loginUser(userData);
      toast.success("login successfully");
      setEmail("");
      setpassword("");
      navigate("/home");
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full font-[montserat] flex items-center justify-center flex-col h-screen bg-(--bg-primary)">
      <div>
        <Toaster></Toaster>
      </div>
      <h1 className="text-3xl font-bold text-(--text-primary) ">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="w-1/3 border flex flex-col gap-5  rounded-xl  p-5  mt-5 border-(--border-acent)"
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
            className="w-full text-lg outline-none mt-2 border px-4 py-2 border-(--border-acent) rounded-xl focus:border-(--color-flow-cyan) "
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
            className="w-full text-lg mt-2 focus:border-(--color-flow-cyan) outline-none border px-4 py-2 border-(--border-acent) rounded-xl "
          />
        </div>

        <p>
          Don't have an Acount |{" "}
          <Link className="text-(--text-primary) font-bold" to={"/signup"}>
            Sign-up
          </Link>
        </p>

        <button
          className="w-full
        py-2 bg-(--btn-primary-bg) rounded-xl text-(--btn-primary-text) font-semibold text-lg cursor-pointer hover:bg-(--btn-primary-hover) "
        >
          {loading ? <Loader /> : "login"}
        </button>
      </form>
    </section>
  );
}

export default Login;
