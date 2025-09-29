import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/my-orders", {
        withCredentials: true,
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <a href="/" className="text-2xl font-bold mb-4 hover:underline">
          Home
        </a>
      </div>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              <span className="px-3 py-1 text-sm rounded bg-gray-200">
                {order.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Recipient: {order.recipientName} | Phone: {order.recipientPhone}
            </p>
            <p className="text-sm text-gray-600">Address: {order.address}</p>
            <p className="text-sm text-gray-600">
              Order Date: {new Date(order.createdAt).toLocaleString()}
            </p>

            <ul className="divide-y mt-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.product.title}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold">
                    {(item.price * item.quantity).toLocaleString()}$
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-3 font-bold">
              <span>Total:</span>
              <span>{order.total.toLocaleString()}$</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
