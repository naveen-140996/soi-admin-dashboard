"use client";

import { Menu } from "lucide-react";

export default function AdminNavbar({ setOpen }: any) {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      {/* 🔥 MOBILE MENU BUTTON */}
      <button
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>

      <h2 className="font-bold">Dashboard</h2>

      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}