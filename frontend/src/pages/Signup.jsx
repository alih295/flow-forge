import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthService";
import Loader from "../components/Loader";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setimage] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true)
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    
    if (image) {
      formData.append("image", image);
    }


    const data = await registerUser(formData);
    console.log("Registration Success:", data);
    setLoading(false)
    
    if (data?.success || data) {
      
      navigate("/verify-otp"); 
    }

  } catch (error) {
    setLoading(false)
    console.error("Registration Error:", error?.response?.data || error.message);
    alert(error?.response?.data?.message || "Registration fail ho gayi!");
  }
};
  return (
    <section className="w-full font-Montserrat flex items-center justify-center flex-col h-screen bg-bg-soft">
      <h1 className="text-3xl font-bold text-text ">Register</h1>

      <form
        onSubmit={handleSubmit}
        className="w-1/3 border flex flex-col gap-5  rounded-xl  p-5  mt-5 border-border"
      >
        <div>
          <label> Enter Full Name</label>
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            required
            type="text"
            placeholder="Enter Full Name"
            className="w-full  outline-none text-lg mt-2 border px-4 py-2 border-border rounded-xl "
          />
        </div>
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
            className="w-full text-lg outline-none mt-2 border px-4 py-2 border-border rounded-xl "
          />
        </div>
        <div>
          <label> Enter Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="Enter Password"
            className="w-full  text-lg mt-2 outline-none border px-4 py-2 border-border rounded-xl "
          />
        </div>
        <div
          className="w-full relative flex
         items-center justify-center cursor-pointer  h-20 border border-dashed border-text rounded-xl "
        >
          <p>
            {`${image ? image.name : "Browse & Drag or drop your file here (optional)"}`}
          </p>
          <input
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            className="w-full  opacity-0 h-full absolute"
            type="file"
          />
        </div>
        <p>
          Already have an Acount |{" "}
          <Link className="text-text font-bold" to={"/login"}>
            Login
          </Link>
        </p>

        <button
          className="w-full
        py-2 bg-accent rounded-xl text-white font-semibold text-lg cursor-pointer hover:opacity-100 opacity-90 "
        >
          {loading ? <Loader /> : 'Register'}
         
        </button>
      </form>
    </section>
  );
}

export default Signup;
