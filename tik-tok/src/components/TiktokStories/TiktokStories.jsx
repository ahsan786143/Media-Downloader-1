import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, EyeOff, HelpCircle } from "lucide-react";
import tiktokvideo from "../../api";

const TiktokStories = () => {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [quality, setQuality] = useState("0");
  const [faqOpen, setFaqOpen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVideoUrl(null);
    try {
      const response = await tiktokvideo(url, quality);
      const play = response?.data?.play || response?.play || response?.url;
      if (!play) throw new Error("No playable URL found ");
      setVideoUrl(play);
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  const handleDownload = async () => {
    if (!videoUrl) return;
    setDownloading(true);
    try {
      const res = await fetch(videoUrl, { credentials: "omit" });
      if (!res.ok) throw new Error("Fetch failed");
      const blob = await res.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `tiktok-${quality === "1" ? "HD" : "SD"}-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (e) {
      const a = document.createElement("a");
      a.href = videoUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="w-10 h-10 text-indigo-500" />,
      title: "Fast & Easy",
      desc: "Download videos instantly with one click.",
    },
    {
      icon: <Shield className="w-10 h-10 text-indigo-500" />,
      title: "Safe & Secure",
      desc: "We never store your links or data.",
    },
    {
      icon: <EyeOff className="w-10 h-10 text-indigo-500" />,
      title: "100% Anonymous",
      desc: "No account, no watermark, no tracking.",
    },
  ];

  const faqs = [
    {
      q: "Is this TikTok downloader free?",
      a: "Yes! You can use it unlimited times for free.",
    },
    {
      q: "Can I download in HD?",
      a: "Yes, choose 'High Quality' before downloading.",
    },
    {
      q: "Does it work on mobile?",
      a: "Yes! You can use it on any device with a browser.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center text-white py-16 px-6"
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-4xl md:text-6xl font-extrabold drop-shadow-lg italic"
        >
          TikTok Story Downloader
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-lg md:text-2xl opacity-90"
        >
          Download TikTok videos & stories in{" "}
          <span className="font-bold">HD</span> – Fast, Free, & Secure
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col md:flex-row items-center justify-center gap-4 px-6"
      >
        <motion.input
          whileFocus={{ scale: 1.03 }}
          value={url}
          type="text"
          placeholder="Paste TikTok video URL..."
          onChange={(e) => setUrl(e.target.value)}
          className="w-full md:w-[420px] text-lg py-3 px-4 text-black border border-gray-300 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <motion.select
          whileHover={{ scale: 1.03 }}
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="py-3 px-4 text-lg rounded-lg border bg-white border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="0">Normal Quality</option>
          <option value="1">High Quality</option>
        </motion.select>
        <motion.button
          whileHover={{
            scale: 1.08,
            y: -3,
            boxShadow: "0px 0px 15px rgba(255,255,255,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="text-lg md:text-xl font-bold py-3 px-6 text-white bg-gradient-to-r from-indigo-600 to-pink-500 rounded-lg shadow-lg transition duration-300"
        >
          See Video
        </motion.button>
      </motion.form>

      {error && <p className="text-red-200 text-center mt-4">{error}</p>}

      {/* Video Preview */}
      <AnimatePresence>
        {videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mt-10 px-4 gap-6"
          >
            <video
              controls
              className="w-[260px] h-[360px] rounded-xl shadow-xl border-4 border-white"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            <motion.button
              whileHover={{
                scale: 1.08,
                y: -3,
                boxShadow: "0px 0px 20px rgba(255,255,255,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              disabled={downloading}
              className="text-lg md:text-xl font-bold py-3 px-6 text-white bg-gradient-to-r from-indigo-600 to-pink-500 rounded-lg shadow-lg transition duration-300 disabled:opacity-60"
            >
              {downloading ? "Preparing..." : "Download Video"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.05,
              y: -8,
              boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center flex flex-col items-center"
          >
            {f.icon}
            <h2 className="text-xl font-bold text-indigo-600 mt-3">{f.title}</h2>
            <p className="text-gray-700 mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white mt-20 px-6 md:px-20 py-12 shadow-inner rounded-t-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="border rounded-lg p-4 cursor-pointer shadow-sm"
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg text-gray-800">{faq.q}</p>
                <HelpCircle className="w-5 h-5 text-indigo-500" />
              </div>
              <AnimatePresence>
                {faqOpen === i && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2 text-gray-600"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiktokStories;
