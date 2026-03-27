"use client";

import { useState } from "react";
import adminAPI from "../../utils/adminApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error("All fields required");
    }

    try {
      setLoading(true);

      const res = await adminAPI.post("/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);

      toast.success("Login success ✅");
      router.push("/admin");
    } catch {
      toast.error("Invalid credentials ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* 🔥 LEFT SIDE (DESKTOP ONLY) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-500 to-green-700 text-white items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-4xl font-bold mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg opacity-90">
            Manage users, track progress, and control content easily.
          </p>
        </div>
      </div>

      {/* 🔥 RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-md p-6 md:p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Admin Login
          </h2>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Secure admin access 🔒
          </p>
        </motion.div>
      </div>
    </div>
  );
}