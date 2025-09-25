import { Routes, Route } from "react-router-dom";

import "./App.css";
import Admin from "./admin/page.jsx";
import Home from "./home/page.jsx";
import Auth from "./auth/page.jsx";
import Profile from "./profile/page.jsx";
import Order from "./order/page.jsx";
import ChangeAccount from "./change-account/page.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order" element={<Order />} />
      <Route path="/change-accountt" element={<ChangeAccount />} />
    </Routes>
  );
}
