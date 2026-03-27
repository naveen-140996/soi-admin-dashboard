"use client";

import { useState,useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useRouter } from "next/navigation";


export default function AdminLayout({ children }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        router.push("/admin/login");
    }
    }, []);

  return (
    <div className="flex-1 w-full overflow-hidden">

      {/* 🔥 SIDEBAR */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* 🔥 MAIN */}
      <div className="flex-1 md:ml-64">
        <AdminNavbar setOpen={setOpen} />
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}