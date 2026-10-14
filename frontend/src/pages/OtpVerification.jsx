import React, { useState, useEffect } from "react";
import { verifyOtp } from "../services/AuthService";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast,{Toaster} from 'react-hot-toast'

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (5 * 60 = 300 seconds)
  const [isExpired, setIsExpired] = useState(false);
  const location = useLocation();
  const email = location.state?.email;
  const [loading, setLoading] = useState(false)

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Minutes aur Seconds format karne ke liye
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
const navigate = useNavigate()
  const handleSubmit = async () => {
    try{
      setLoading(true)
      const data = {
        email:email,
        otp:otp
      }
      const response = await verifyOtp(data)
      if(response.success){
        toast.success('email verffiy successfull')
        navigate('/login')
      }
    }catch(err){
      toast.error(err.message)
      navigate('/signup')
    }finally{
      setLoading(false)
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-(--bg-primary)">
      <Toaster></Toaster>
      <div className="w-full  max-w-md flex flex-col gap-5 border rounded-xl p-6 border-(--border-acent) bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-(--text-primary)">
            Verify Your OTP
          </h1>

          {/* Live Timer Display */}
          <span
            className={`font-mono text-sm font-semibold px-3 py-1 rounded-md ${
              isExpired
                ? "bg-red-100 text-red-600"
                : "bg-slate-100 text-(--color-forge-orange)"
            }`}
          >
            {isExpired ? "Expired" : formatTime()}
          </span>
        </div>

        <input
          className="w-full outline-none border focus:border-(--color-flow-cyan) px-4 py-2 rounded-lg text-lg transition-all"
          type="number"
          placeholder="Enter OTP here"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={isExpired}
        />

        <p className="w-full p-3 border border-red-600 text-red-600 text-xs rounded-lg bg-red-200">
          <span className="font-bold">Note!</span> This OTP will expire in 5
          minutes. you can't use this email for register again
        </p>

        <button
          onClick={handleSubmit}
          className="w-full py-2.5 rounded-lg text-white font-medium bg-accent  cursor-pointer text-base transition-all"
        >
          {loading ? <Loader/> : 'submit'}
        </button>
      </div>
    </section>
  );
}

export default OtpVerification;
