import React, { useState } from "react";
import {
  Truck,
  CreditCard,
  Headphones,
  ShieldCheck,
  Star,
  RotateCcw,
  ShoppingCart,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const features = [
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Quick nationwide delivery right to your doorstep.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    desc: "Safe and multiple payment options.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Customer support available anytime.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    desc: "Authentic products with guaranteed quality.",
  },
  {
    icon: Star,
    title: "Premium Service",
    desc: "Exclusive services for the best shopping experience.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Hassle-free returns within 7 days.",
  },
  {
    icon: ShoppingCart,
    title: "Smart Cart",
    desc: "Simple cart management and fast checkout.",
  },
  {
    icon: Package,
    title: "Order Tracking",
    desc: "Real-time order tracking updates.",
  },
];

export default function About() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [productName, setProductName] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("productName", productName);
      formData.append("issueType", issueType);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/report", // backend endpoint
        formData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Report submitted successfully!");
        // reset form
        setOrderId("");
        setProductName("");
        setIssueType("");
        setDescription("");
        setImage(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-[#242424] py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About Our E-Commerce Store</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          We provide a safe, convenient, and fast online shopping experience.
          Customers are always at the heart of our services.
        </p>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-500 shadow rounded-2xl flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition"
            >
              <f.icon className="w-12 h-12 text-black mb-4" />
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 text-center">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Report Forms */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-gray-600 p-8 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-100">
              Contact Support
            </h2>
            <form className="space-y-4">
              <input
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                placeholder="Your Name"
              />
              <input
                type="email"
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                placeholder="Your Email"
              />
              <input
                type="tel"
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                placeholder="Phone"
              />
              <input
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                placeholder="Subject"
              />
              <textarea
                rows="4"
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                placeholder="Message"
              ></textarea>
              <button className="w-full bg-[#333] hover:bg-[#242424] text-white py-3 rounded-lg transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Report Form */}
          <div className="bg-gray-600 p-8 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-100">
              Report Product Issue
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                placeholder="Order ID"
                required
              />
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                placeholder="Product Name"
                required
              />
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                required
              >
                <option value="">Select Issue</option>
                <option value="damaged">Damaged Product</option>
                <option value="wrong">Wrong Item</option>
                <option value="missing">Missing Item</option>
                <option value="other">Other</option>
              </select>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
                placeholder="Describe the issue..."
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-600 bg-gray-100 p-3 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                className="w-full bg-[#333] hover:bg-[#242424] text-white py-3 rounded-lg transition"
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-[#181818] text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="mb-6">
          Discover thousands of high-quality products today.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#242424] hover:bg-[#000000] text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Shop Now
        </button>
      </section>
    </div>
  );
}
