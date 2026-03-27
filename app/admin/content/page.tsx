"use client";

import { useState } from "react";
import adminAPI from "../../utils/adminApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ContentPage() {
  const [reelUrl, setReelUrl] = useState("");
  const [reelThumb, setReelThumb] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeThumb, setYoutubeThumb] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔥 ADD REEL
  const handleAddReel = async () => {
    if (!reelUrl || !reelThumb)
      return toast.error("All fields required");

    try {
      setLoading(true);

      await adminAPI.post("/admin/content", {
        type: "reel",
        url: reelUrl,
        thumbnail: reelThumb, // ✅ added
      });

      toast.success("Reel added 🎬");

      setReelUrl("");
      setReelThumb("");
    } catch {
      toast.error("Failed");
    }

    setLoading(false);
  };

  // 🔥 ADD YOUTUBE
  const handleAddYoutube = async () => {
    if (!youtubeUrl)
      return toast.error("YouTube URL required");

    try {
      setLoading(true);

      // 🔥 AUTO THUMBNAIL (YouTube)
      let thumbnail = youtubeThumb;

      if (!thumbnail && youtubeUrl.includes("v=")) {
        const id = youtubeUrl.split("v=")[1]?.split("&")[0];
        thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }

      await adminAPI.post("/admin/content", {
        type: "youtube",
        url: youtubeUrl,
        thumbnail, // ✅ added
      });

      toast.success("Video added ▶️");

      setYoutubeUrl("");
      setYoutubeThumb("");
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

          {/* URL */}
          <input
            value={reelUrl}
            onChange={(e) => setReelUrl(e.target.value)}
            placeholder="Paste Instagram Reel URL"
            className="w-full border p-3 rounded-lg"
          />

          {/* THUMBNAIL */}
          <input
            value={reelThumb}
            onChange={(e) => setReelThumb(e.target.value)}
            placeholder="Paste Thumbnail Image URL"
            className="w-full border p-3 rounded-lg"
          />

          {/* PREVIEW */}
          {reelThumb && (
            <img
              src={reelThumb}
              className="w-full h-40 object-cover rounded-lg"
            />
          )}

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

          {/* URL */}
          <input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste YouTube URL"
            className="w-full border p-3 rounded-lg"
          />

          {/* OPTIONAL THUMBNAIL */}
          <input
            value={youtubeThumb}
            onChange={(e) => setYoutubeThumb(e.target.value)}
            placeholder="Optional Thumbnail URL"
            className="w-full border p-3 rounded-lg"
          />

          {/* PREVIEW */}
          {youtubeThumb && (
            <img
              src={youtubeThumb}
              className="w-full h-40 object-cover rounded-lg"
            />
          )}

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