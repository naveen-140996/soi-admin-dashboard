"use client";

import Link from "next/link";
import { X } from "lucide-react";

export default function AdminSidebar({ open, setOpen }: any) {
  return (
    <>
      {/* 🔥 BACKDROP (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-black text-white p-5 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Admin</h1>

          {/* CLOSE BUTTON (mobile) */}
          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-3">
          <Link href="/admin" onClick={()=>setOpen(false)}>
            Dashboard
          </Link>

          <Link href="/admin/content" onClick={()=>setOpen(false)}>
            Content
          </Link>
        </nav>
      </div>
    </>
  );
}