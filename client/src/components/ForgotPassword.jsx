import { useState } from "react";
import axios from "axios";
import { SecondaryButton } from "./ui/Buttons";
import { TbHomeMove } from "react-icons/tb";
import { Link } from "react-router-dom";
import Announcement from "./Announcement";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [announcement, setAnnouncement] = useState(null); // lưu thông báo

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/auth/user/forgot-password", {
        email,
      });
      setAnnouncement({
        type: "success",
        message: "Check your email for reset link!",
      });
    } catch (err) {
      setAnnouncement({
        type: "error",
        message:
          err.response?.data?.error || "Error sending reset link. Try again!",
      });
    }
  };

  return (
    <>
      <div className="w-10/12 sm:w-4/12 md:w-3/12 relative left-1/2 mt-10 -translate-x-1/2 border-2 border-gray-800 px-7 py-5 rounded-lg shadow-2xl">
        <h2 className="text-xl text-center font-bold ">Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg my-3"
        />

        <SecondaryButton
          title={"SEND RESET LINK"}
          onClick={handleSubmit}
          editStyle="py-2 px-2 my-3 text-center cursor-pointer "
        />
      </div>
      <Link to={"/"}>
        <TbHomeMove className="fixed bottom-0 right-0 mr-3 mb-2 sm:mr-5 sm:mb-5 text-2xl text-black transition hover:text-white hover:bg-[#292929] border-2 border-[#292929] rounded-full w-[45px] h-[45px] p-2" />
      </Link>

      {/* Hiện thông báo khi có announcement */}
      {announcement && (
        <Announcement
          type={announcement.type}
          message={announcement.message}
          onClose={() => setAnnouncement(null)} // đóng thông báo
        />
      )}
    </>
  );
}
