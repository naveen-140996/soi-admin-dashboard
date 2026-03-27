"use client";

import { useEffect, useState } from "react";
import adminAPI from "../utils/adminApi";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const router = useRouter();

  // 🔐 AUTH
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admin-login");
  }, []);

  // 🔥 FETCH
  const fetchData = async () => {
    const res = await adminAPI.get(
      `/admin/dashboard?page=${page}&limit=10&search=${search}`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  // 📤 EXPORT
  const exportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(data.diets);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Report");
    XLSX.writeFile(wb, "report.xlsx");
  };

  if (!data) {
    return (
      <div className="p-4 md:p-6 space-y-4">
        <div className="h-20 bg-gray-200 animate-pulse rounded" />
        <div className="h-40 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-hidden">

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Users" value={data.totalUsers} />
        <Card title="Entries" value={data.totalEntries} />
        <Card title="Records" value={data.totalRecords} />
      </div>

      {/* 🔥 SEARCH + EXPORT */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-80 border p-2 rounded-lg"
        />

        <button
          onClick={exportExcel}
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Export Excel
        </button>
      </div>

      {/* 🔥 HORIZONTAL CARDS */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {data.diets.map((d: any, i: number) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="min-w-[260px] bg-white p-4 rounded-xl shadow"
          >
            <h3 className="font-semibold">{d.name}</h3>
            <p className="text-sm text-gray-500">{d.email}</p>

            <div className="mt-2 text-sm space-y-1">
              <p>Start: {d.startWeight} kg</p>
              <p>Current: {d.currentWeight} kg</p>
              <p className="text-green-600">
                Target: {d.targetWeight} kg
              </p>
              <p className="text-blue-600">
                Progress: {d.progress}%
              </p>
            </div>

            <button
              onClick={() => setSelectedUser(d)}
              className="mt-3 w-full bg-blue-500 text-white py-1 rounded-lg"
            >
              View Plan
            </button>
          </motion.div>
        ))}
      </div>

      {/* 🔥 TABLE (DESKTOP) */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Current</th>
              <th className="p-3">Target</th>
              <th className="p-3">Progress</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.diets.map((d: any, i: number) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{d.name}</td>
                <td className="p-3 text-gray-600">{d.email}</td>
                <td className="p-3">{d.currentWeight} kg</td>
                <td className="p-3 text-green-600">
                  {d.targetWeight} kg
                </td>
                <td className="p-3">{d.progress}%</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedUser(d)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {data.diets.map((d: any, i: number) => (
          <div key={i} className="bg-white p-3 rounded-lg shadow">
            <p className="font-semibold">{d.name}</p>
            <p className="text-sm text-gray-500">{d.email}</p>

            <div className="mt-2 text-sm">
              <p>Current: {d.currentWeight}kg</p>
              <p>Target: {d.targetWeight}kg</p>
              <p>Progress: {d.progress}%</p>
            </div>

            <button
              onClick={() => setSelectedUser(d)}
              className="mt-2 w-full bg-blue-500 text-white py-1 rounded"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 PAGINATION */}
      <div className="flex justify-center gap-2 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(data.totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === data.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* 🔥 MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-3 z-50">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white w-full max-w-lg p-5 rounded-xl"
          >
            <h2 className="font-bold text-lg mb-3">
              {selectedUser.name}
            </h2>

            <div className="max-h-80 overflow-y-auto space-y-3">
              {selectedUser.entries.map((e: any, i: number) => (
                <div key={i} className="border p-3 rounded">
                  <div className="flex justify-between">
                    <span>Day {e.day}</span>
                    <span>{e.weight} kg</span>
                  </div>
                  <p>🌅 {e.morning}</p>
                  <p>🍛 {e.lunch}</p>
                  <p>🌙 {e.dinner}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl md:text-2xl font-bold">{value}</h2>
    </div>
  );
}