import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbHomeMove } from "react-icons/tb";
import Announcement from "./Announcement";

const ResetPassword = () => {
  const { token } = useParams(); // lấy token từ URL /reset-password/:token
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/auth/user/reset-password",
        { token, password }
      );

      setMsg({
        type: "success",
        text: res.data.msg || "Password reset successful!",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      if (err.response) {
        setMsg({
          type: "error",
          text: err.response.data.error || "Something went wrong",
        });
      } else {
        setMsg({ type: "error", text: "Server error: " + err.message });
      }
    }
  };

  return (
    <>
      <div className="w-10/12 sm:w-4/12 md:w-3/12 relative left-1/2 mt-10 -translate-x-1/2 border-2 border-gray-800 px-7 py-5 rounded-lg shadow-2xl">
        <h2 className="text-center text-xl font-bold">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-lg font-semibold">New Password:</label>

          <input
            type="password"
            className="rounded-lg text-xl my-3 border-2 border-gray-700 focus:border-gray-900 w-full px-2 py-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-[#161616] hover:bg-[#2e2d2d] py-2 px-4 my-3 text-center cursor-pointer w-full rounded-lg text-white"
          >
            RESET
          </button>
        </form>
      </div>

      <Link to={"/"}>
        <TbHomeMove className="fixed bottom-0 right-0 mr-3 mb-2 sm:mr-5 sm:mb-5 text-2xl text-black transition hover:text-white hover:bg-[#292929] border-2 border-[#292929] rounded-full w-[45px] h-[45px] p-2" />
      </Link>

      {/* Hiển thị thông báo */}
      {msg && <Announcement type={msg.type} message={msg.text} />}
    </>
  );
};

export default ResetPassword;
