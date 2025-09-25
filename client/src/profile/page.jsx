import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  //   const [orders, setOrders] = useState([]);

  // Giả sử userId lấy từ token hoặc context
  const userId = localStorage.getItem("userId");

  // Lấy thông tin user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        fullName: storedUser.fullName || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
        age: storedUser.age || "",
        gender: storedUser.gender || "",
        avatar: storedUser.avatar || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        formData
      );
      setUser(res.data);
      setEditing(false);
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Cập nhật thất bại!");
    }
  };

  if (!user) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {/* User Info */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 max-w-3xl">
        <div className="flex items-center gap-6 mb-4">
          <img
            src={formData.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
          />
          <div>
            {editing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-gray-700 p-2 rounded w-full text-white"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{user.fullName}</h2>
            )}
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            Phone
            {editing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-700 p-2 rounded text-white"
              />
            ) : (
              <span className="text-gray-300">{user.phone || "-"}</span>
            )}
          </label>

          <label className="flex flex-col">
            Address
            {editing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-gray-700 p-2 rounded text-white"
              />
            ) : (
              <span className="text-gray-300">{user.address || "-"}</span>
            )}
          </label>

          <label className="flex flex-col">
            Age
            {editing ? (
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="bg-gray-700 p-2 rounded text-white"
              />
            ) : (
              <span className="text-gray-300">{user.age || "-"}</span>
            )}
          </label>

          <label className="flex flex-col">
            Gender
            {editing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-gray-700 p-2 rounded text-white"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span className="text-gray-300">{user.gender || "-"}</span>
            )}
          </label>
        </div>

        <div className="mt-4 flex gap-4">
          {editing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* User Orders / Dashboard */}
      {/* <div className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400">You have no orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 p-4 rounded-lg shadow hover:scale-102 transition"
              >
                <h3 className="font-semibold mb-2">{order.productName}</h3>
                <p>Price: ${order.finalPrice}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
}
