import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Zap, Shield, EyeOff, HelpCircle } from "lucide-react";
import fetchInstaReel from "../../InstaApi";

const InstagramReel = () => {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVideoUrl(null);

    if (!url.includes("instagram.com")) {
      setError("Please enter a valid Instagram video URL.");
      return;
    }

    try {
      const response = await fetchInstaReel(url);
      const reel =
        response?.media?.[0]?.url || response?.url || response?.video_url;
      if (!reel) throw new Error("No downloadable reel found.");
      setVideoUrl(reel);
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    setDownloading(true);
    try {
      const backendUrl = `http://localhost:5000/api/downloads?url=${encodeURIComponent(
        videoUrl
      )}`;
      const a = document.createElement("a");
      a.href = backendUrl;
      a.setAttribute("download", `instagram-reel-${Date.now()}.mp4`);
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error("Download failed:", e);
    } finally {
      setDownloading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="w-10 h-10 text-pink-500" />,
      title: "Fast & Easy",
      desc: "Download Instagram Reels instantly in one click.",
    },
    {
      icon: <Shield className="w-10 h-10 text-pink-500" />,
      title: "Secure & Safe",
      desc: "We never store your data or links.",
    },
    {
      icon: <EyeOff className="w-10 h-10 text-pink-500" />,
      title: "Private",
      desc: "Download reels anonymously with no login.",
    },
  ];

  const faqs = [
    {
      q: "Is this downloader free?",
      a: "Yes, it's 100% free with no hidden costs.",
    },
    {
      q: "Can I download in HD?",
      a: "Yes! Reels are available in original quality when possible.",
    },
    {
      q: "Does it work on mobile?",
      a: "Yes, it works on phones, tablets, and desktops.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 flex flex-col">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center text-white py-14 px-6"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold italic drop-shadow-lg flex justify-center items-center gap-2">
          <Camera className="w-12 h-12" /> Instagram Reels Downloader
        </h1>
        <p className="mt-4 text-lg md:text-2xl opacity-90">
          Save your favorite Instagram Reels in{" "}
          <span className="font-bold">HD</span> with one click
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col md:flex-row items-center justify-center gap-4 px-6"
      >
        <motion.input
          whileFocus={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(236,72,153,0.7)" }}
          value={url}
          type="text"
          placeholder="Paste Instagram Reel URL..."
          onChange={(e) => setUrl(e.target.value)}
          className="w-full md:w-[420px] text-lg py-3 px-4 text-black border border-gray-300 bg-white rounded-lg shadow focus:outline-none"
        />
        <motion.button
          whileHover={{
            scale: 1.12,
            y: -5,
            boxShadow: "0px 8px 25px rgba(236,72,153,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="text-lg md:text-xl font-bold py-3 px-6 text-white bg-pink-600 hover:bg-purple-500 rounded-lg shadow-lg transition duration-300"
        >
          See Video
        </motion.button>
      </motion.form>

      {error && <p className="text-red-200 text-center mt-4">{error}</p>}

      {/* Video Preview */}
      {videoUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mt-10 px-4 gap-6"
        >
          <motion.video
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(236,72,153,0.7)" }}
            controls
            className="w-[300px] rounded-xl shadow-xl border-4 border-white transition"
          >
            <source src={videoUrl} type="video/mp4" />
          </motion.video>

          <motion.button
            whileHover={{
              scale: 1.1,
              y: -5,
              boxShadow: "0px 10px 30px rgba(236,72,153,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={downloading}
            className="text-lg md:text-xl font-bold py-3 px-6 text-white bg-pink-600 hover:bg-purple-500 rounded-lg shadow-lg transition duration-300 disabled:opacity-60"
          >
            {downloading ? "Preparing..." : "Download Reel"}
          </motion.button>
        </motion.div>
      )}

      {/* Features */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.08,
              y: -8,
              rotate: 1,
              boxShadow: "0px 12px 30px rgba(0,0,0,0.2)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center flex flex-col items-center cursor-pointer"
          >
            {f.icon}
            <h2 className="text-xl font-bold text-pink-600 mt-3">{f.title}</h2>
            <p className="text-gray-700 mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white mt-20 px-6 md:px-20 py-12 shadow-inner rounded-t-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`border rounded-lg p-4 cursor-pointer shadow-md transition ${
                faqOpen === i ? "bg-pink-50" : "bg-white"
              }`}
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg text-gray-800">{faq.q}</p>
                <motion.div
                  animate={{ rotate: faqOpen === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HelpCircle className="w-5 h-5 text-pink-500" />
                </motion.div>
              </div>
              <AnimatePresence>
                {faqOpen === i && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
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

export default InstagramReel;
