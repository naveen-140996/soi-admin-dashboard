"use client";

import { useState } from "react";
import adminAPI from "../../utils/adminApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ContentPage() {
  const [reelUrl, setReelUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 ADD REEL
  const handleAddReel = async () => {
    if (!reelUrl) return toast.error("Reel URL required");

    try {
      setLoading(true);
      await adminAPI.post("/admin/content", {
        type: "reel",
        url: reelUrl,
      });

      toast.success("Reel added 🎬");
      setReelUrl("");
    } catch {
      toast.error("Failed");
    }
    setLoading(false);
  };

  // 🔥 ADD YOUTUBE
  const handleAddYoutube = async () => {
    if (!youtubeUrl) return toast.error("YouTube URL required");

    try {
      setLoading(true);
      await adminAPI.post("/admin/content", {
        type: "youtube",
        url: youtubeUrl,
      });

      toast.success("Video added ▶️");
      setYoutubeUrl("");
    } catch {
      toast.error("Failed");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">

      <h1 className="text-xl font-bold">Content Management</h1>

      {/* 🔥 GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 🎬 INSTAGRAM REELS */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white p-5 rounded-xl shadow space-y-4"
        >
          <h2 className="text-lg font-semibold text-green-600">
            Instagram Reels
          </h2>

          <input
            value={reelUrl}
            onChange={(e) => setReelUrl(e.target.value)}
            placeholder="Paste Instagram Reel URL"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button
            onClick={handleAddReel}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            {loading ? "Adding..." : "Add Reel"}
          </button>
        </motion.div>

        {/* ▶️ YOUTUBE */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white p-5 rounded-xl shadow space-y-4"
        >
          <h2 className="text-lg font-semibold text-red-600">
            YouTube Videos
          </h2>

          <input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste YouTube URL"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />

          <button
            onClick={handleAddYoutube}
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg"
          >
            {loading ? "Adding..." : "Add Video"}
          </button>
        </motion.div>

      </div>
    </div>
  );
}