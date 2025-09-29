/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Confirm from "./Comfirm";
import Announcement from "./Announcement";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  // Form modal
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [form, setForm] = useState({
    userId: "",
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    address: "",
    altRecipientName: "",
    altRecipientPhone: "",
    deliveryTime: "",
    total: 0,
    status: "PENDING",
    items: [],
    proofImageText: "",
  });

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/orders?page=${page}&limit=10`
      );
      setOrders(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("❌ Error fetchOrders:", err.message);
    }
  };

  const resetForm = () => {
    setForm({
      userId: "",
      recipientName: "",
      recipientPhone: "",
      recipientEmail: "",
      address: "",
      altRecipientName: "",
      altRecipientPhone: "",
      deliveryTime: "",
      total: 0,
      status: "PENDING",
      items: [],
      proofImageText: "",
    });
    setProofFile(null);
    setEditing(null);
  };

  // ---------- CRUD ----------
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const onConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/orders/${selectedId}`
      );
      setAnnouncement({
        type: "success",
        message: "Order deleted successfully!",
      });
      fetchOrders();
    } catch (err) {
      setAnnouncement({ type: "error", message: "Failed to delete order." });
      console.log(err);
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  const onCancelDelete = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        { status: newStatus }
      );
      setAnnouncement({ type: "success", message: "Order status updated!" });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setAnnouncement({ type: "error", message: "Failed to update status." });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k !== "items") fd.append(k, v);
      });
      if (proofFile) fd.append("proofImage", proofFile);
      if (form.items.length) fd.append("items", JSON.stringify(form.items));

      const url = editing
        ? `http://localhost:5000/api/admin/orders/${editing}`
        : "http://localhost:5000/api/admin/orders";
      const method = editing ? "put" : "post";

      await axios[method](url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnnouncement({
        type: "success",
        message: editing ? "Order updated!" : "Order created!",
      });
      fetchOrders();
      setShowForm(false);
      resetForm();
    } catch (err) {
      setAnnouncement({ type: "error", message: "Failed to save order." });
      console.log(err);
    }
  };

  // Thêm/xóa item
  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    const newTotal = form.items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      return sum + qty * price;
    }, 0);

    setForm((prev) => ({ ...prev, total: newTotal }));
  }, [form.items]);

  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-bold text-gray-300">Manage Orders</h2>

      {!showForm && (
        <>
          <button
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
            className="flex px-4 py-2 mb-4 text-white bg-blue-600 rounded-lg items-center gap-2 hover:bg-blue-500"
          >
            <PlusCircleIcon className="w-5 h-5" /> Create New
          </button>

          {/* Table */}
          <div className="overflow-x-auto w-full max-h-[420px] rounded-lg border-2 border-gray-400">
            <table className="min-w-[1400px] border-gray-400 border-2 rounded-lg">
              <thead className="text-white text-sm bg-[#55575d]">
                <tr>
                  <th className="min-w-[50px]">ID</th>
                  <th className="min-w-[70px]">User</th>
                  <th className="min-w-[200px]">Email</th>
                  <th className="min-w-[100px]">Phone</th>
                  <th className="min-w-[200px]">Address</th>
                  <th className="min-w-[70px]">Alt Name</th>
                  <th className="min-w-[100px]">Alt Phone</th>
                  <th className="min-w-[70px]">Total</th>
                  <th className="min-w-[200px]">Status</th>
                  <th className="min-w-[100px]">Delivery Time</th>
                  <th className="min-w-[100px]">Proof</th>
                  <th className="min-w-[100px]">Created At</th>
                  <th className="min-w-[100px]">Updated At</th>
                  <th className="min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {orders.length ? (
                  orders.map((o) => (
                    <tr
                      key={o.id}
                      className="h-18 hover:bg-[#050b19] text-center"
                    >
                      <td>{o.id}</td>
                      <td>{o.recipientName}</td>
                      <td className="text-left">{o.recipientEmail || "-"}</td>
                      <td>{o.recipientPhone}</td>
                      <td className="text-left">{o.address}</td>
                      <td>{o.altRecipientName || "-"}</td>
                      <td>{o.altRecipientPhone || "-"}</td>
                      <td>${o.total.toFixed(2)}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleStatusChange(o.id, e.target.value)
                          }
                          className="border rounded px-2 py-1 bg-[#101021] text-white"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PAID">PAID</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td>{o.deliveryTime || "-"}</td>
                      <td>
                        {o.proofImage ? (
                          <img
                            src={o.proofImage}
                            alt="proof"
                            className="w-16 h-16 object-cover mx-auto cursor-pointer"
                            onClick={() => setPreviewImg(o.proofImage)}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{new Date(o.createdAt).toLocaleString()}</td>
                      <td>{new Date(o.updatedAt).toLocaleString()}</td>
                      <td className="flex justify-center relative top-1/2 translate-y-1/2 gap-2">
                        <button
                          onClick={() => {
                            setEditing(o.id);
                            setShowForm(true);
                            setForm({
                              userId: o.userId,
                              recipientName: o.recipientName,
                              recipientPhone: o.recipientPhone,
                              recipientEmail: o.recipientEmail || "",
                              address: o.address,
                              altRecipientName: o.altRecipientName || "",
                              altRecipientPhone: o.altRecipientPhone || "",
                              deliveryTime: o.deliveryTime || "",
                              total: o.total,
                              status: o.status,
                              items: o.items || [],
                              proofImageText: o.proofImage || null,
                            });
                          }}
                        >
                          <PencilSquareIcon className="w-7 h-7 text-blue-500" />
                        </button>
                        <button onClick={() => handleDeleteClick(o.id)}>
                          <TrashIcon className="w-7 h-7 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center py-4">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex py-2 justify-end items-center gap-2">
            <div>
              {page} of {totalPages}
            </div>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              <FaAngleLeft className="ml-2 text-2xl" />
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <FaAngleRight className="mr-2 text-2xl" />
            </button>
          </div>
        </>
      )}

      {/* Form Modal */}
      {showForm && (
        <div
          className="overflow-y-auto
            w-full h-[470px]
            p-6
            bg-[#101021]
            rounded-lg
            shadow-md"
        >
          <form onSubmit={handleFormSubmit} className=" space-y-3">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Order" : "Create Order"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full border rounded px-2 py-1"
                type="number"
                placeholder="User ID"
                required
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
              />
              <input
                className="w-full border rounded px-2 py-1"
                type="text"
                placeholder="Recipient Name"
                required
                value={form.recipientName}
                onChange={(e) =>
                  setForm({ ...form, recipientName: e.target.value })
                }
              />
              <input
                className="w-full border rounded px-2 py-1"
                type="text"
                placeholder="Recipient Phone"
                required
                value={form.recipientPhone}
                onChange={(e) =>
                  setForm({ ...form, recipientPhone: e.target.value })
                }
              />
              <input
                className="w-full border rounded px-2 py-1"
                type="text"
                placeholder="Recipient Email"
                value={form.recipientEmail}
                onChange={(e) =>
                  setForm({ ...form, recipientEmail: e.target.value })
                }
              />
              <input
                className="w-full border rounded px-2 py-1"
                type="text"
                placeholder="Address"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <input
                className="w-full border rounded px-2 py-1"
                type="text"
                placeholder="Alt Recipient Name"
                value={form.altRecipientName}
                onChange={(e) =>
                  setForm({ ...form, altRecipientName: e.target.value })
                }
              />
              <input
                className="w-full border rounded px-2 py-1"
                type="text"
                placeholder="Alt Recipient Phone"
                value={form.altRecipientPhone}
                onChange={(e) =>
                  setForm({ ...form, altRecipientPhone: e.target.value })
                }
              />
              <input
                className="w-full border rounded px-2 py-1"
                type="text"
                placeholder="Delivery Time"
                value={form.deliveryTime}
                onChange={(e) =>
                  setForm({ ...form, deliveryTime: e.target.value })
                }
              />
              {/* <input
                className="w-full border rounded px-2 py-1"
                type="number"
                placeholder="Total"
                required
                value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })}
              /> */}
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="bg-[#101021] text-white px-2 py-1 outline-1 rounded"
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            {/* Proof Image */}
            <div>
              <label>Proof Image</label>
              <input
                className="w-full border rounded px-2 py-1"
                type="file"
                accept="image/*"
                onChange={(e) => setProofFile(e.target.files[0] || null)}
              />
              {(proofFile || (editing && form.proofImageText)) && (
                <img
                  src={
                    proofFile
                      ? URL.createObjectURL(proofFile)
                      : form.proofImageText
                  }
                  alt="preview"
                  className="w-24 h-24 mt-2 object-cover"
                />
              )}
            </div>

            {/* Items */}
            <div>
              <label>Items</label>
              {form.items.map((item, index) => (
                <div key={index} className="flex gap-2 items-center mb-2">
                  <input
                    type="number"
                    placeholder="Product ID"
                    value={item.productId}
                    onChange={(e) => {
                      const newItems = [...form.items];
                      newItems[index].productId = e.target.value;
                      setForm({ ...form, items: newItems });
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...form.items];
                      newItems[index].quantity = e.target.value;
                      setForm({ ...form, items: newItems });
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...form.items];
                      newItems[index].price = e.target.value;
                      setForm({ ...form, items: newItems });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-white bg-[#d22525] hover:bg-[#a41010]  px-2 py-1 rounded-lg ml-3"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="bg-[#2242bf] hover:bg-[#2d13b0] text-white px-2 py-1 rounded-lg ml-3"
              >
                Add Item
              </button>
            </div>

            {/* Total (readonly) */}
            <div>
              <label>Total</label>
              <input
                className="w-full border rounded px-2 py-1 bg-gray-200 cursor-not-allowed"
                type="number"
                value={form.total}
                disabled
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button type="submit" className="px-4 py-2 bg-blue-600 rounded">
                {editing ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-500 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            alt="Preview"
            className="max-h-[90%] max-w-[90%] object-contain rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Confirm Delete */}
      {showConfirm && (
        <Confirm
          message="Are you sure to delete this order?"
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
        />
      )}

      {/* Announcement */}
      {announcement && (
        <Announcement
          type={announcement.type}
          message={announcement.message}
          onClose={() => setAnnouncement(null)}
        />
      )}
    </div>
  );
}
