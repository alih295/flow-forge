import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="w-full flex items-center justify-center flex-col h-screen bg-(--bg-primary)">
      <h1 className="text-3xl font-bold text-(--text-primary) ">Login</h1>

      <form className="w-1/3 border flex flex-col gap-5  rounded-xl  p-5  mt-5 border-(--border-acent)">
        
        <div>
          <label> Enter Email </label>
          <input
            required placeholder="Enter Email "
            type="email"
            className="w-full text-lg outline-none mt-2 border px-4 py-2 border-(--border-acent) rounded "
          />
        </div>
        <div>
          <label> Enter Password</label>
          <input
            required
            type="password" placeholder="Enter Password"
            className="w-full text-lg mt-2 outline-none border px-4 py-2 border-(--border-acent) rounded "
          />
        </div>
       
        <p>Don't have an Acount |  <Link className="text-(--text-primary) font-bold" to={'/signup'}>Signup</Link></p>

        <button
          className="w-full
        py-2 bg-(--btn-primary-bg) rounded text-(--btn-primary-text) font-semibold text-lg cursor-pointer hover:bg-(--btn-primary-hover) "
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
