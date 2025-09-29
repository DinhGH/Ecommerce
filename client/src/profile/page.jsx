import { useEffect, useState } from "react";
import axios from "axios";
import { ElegantSpinner } from "../components/ui/Loading";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/user/me", {
          withCredentials: true,
        });

        if (res.data.success) {
          setUser(res.data.user);
          setFormData({
            fullName: res.data.user.fullName || "",
            email: res.data.user.email || "",
            phone: res.data.user.phone || "",
            address: res.data.user.address || "",
            age: res.data.user.age || "",
            gender: res.data.user.gender || "",
            avatar: res.data.user.avatar || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (avatarFile) {
        data.append("avatarFile", avatarFile);
      }

      const res = await axios.put(
        "http://localhost:5000/auth/user/update",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        alert("Profile updated successfully!");
        setUser(res.data.user);
        setFormData({
          ...formData,
          avatar: res.data.user.avatar ? res.data.user.avatar : "",
        });
        setEditMode(false);
        setAvatarFile(null);
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating profile");
    }
  };

  if (loading) return <ElegantSpinner />;
  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 m-5 bg-white shadow-xl rounded">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <a href="/" className="text-2xl font-bold mb-4 hover:underline">
          Home
        </a>
      </div>
      {/* Avatar Upload */}
      <div>
        <label className="block font-medium">Avatar</label>
        <input
          type="file"
          accept="image/*"
          disabled={!editMode}
          onChange={(e) => setAvatarFile(e.target.files[0] || null)}
        />
        <img
          src={
            avatarFile
              ? URL.createObjectURL(avatarFile)
              : formData.avatar || "https://via.placeholder.com/100"
          }
          alt="avatar preview"
          className="w-24 h-24 object-cover mt-2 rounded-full"
        />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={!editMode}
          placeholder="Full Name"
          className="border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode}
          placeholder="Email"
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!editMode}
          placeholder="Phone"
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!editMode}
          placeholder="Address"
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          disabled={!editMode}
          placeholder="Age"
          className="border px-3 py-2 rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          disabled={!editMode}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex ">
        {editMode ? (
          <>
            <button
              onClick={handleUpdate}
              className="bg-[#333] mx-2 hover:bg-[#1d1d1d] text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setAvatarFile(null);
              }}
              className="bg-gray-400 mx-2 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-[#333] hover:bg-[#1d1d1d] text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
