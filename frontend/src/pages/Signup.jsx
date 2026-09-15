import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <section className="w-full flex items-center justify-center flex-col h-screen bg-(--bg-primary)">
      <h1 className="text-3xl font-bold text-(--text-primary) ">Register</h1>

      <form className="w-1/3 border flex flex-col gap-5  rounded-xl  p-5  mt-5 border-(--border-acent)">
        <div>
          <label> Enter Full Name</label>
          <input
            required
            type="text" placeholder="Enter Full Name"
            className="w-full outline-none text-lg mt-2 border px-4 py-2 border-(--border-acent) rounded "
          />
        </div>
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
        <div className="w-full relative flex
         items-center justify-center cursor-pointer  h-20 border border-dashed border-(--border-acent) rounded ">
        <p>Browse & Dragordrop your file here (optional)</p>
        <input className="w-full opacity-0 h-full absolute" type="file" />

        </div>
        <p>Already have an Acount <Link className="text-(--text-primary) font-bold" to={'/login'}>Login</Link></p>

        <button
          className="w-full
        py-2 bg-(--btn-primary-bg) rounded text-(--btn-primary-text) font-semibold text-lg cursor-pointer hover:bg-(--btn-primary-hover) "
        >
          Register
        </button>
      </form>
    </section>
  );
}

export default Signup;
