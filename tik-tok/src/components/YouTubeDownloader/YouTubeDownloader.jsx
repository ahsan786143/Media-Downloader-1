import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Zap, Shield, Smartphone, HelpCircle } from "lucide-react";
import fetchYouTubeVideo from "../../YouTubeApi";

const YouTubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [quality, setQuality] = useState("360p");
  const [faqOpen, setFaqOpen] = useState(null);

  // Extract videoId from YouTube URL
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVideoUrl(null);

    const videoId = getVideoId(url);
    if (!videoId) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }

    try {
      const response = await fetchYouTubeVideo(videoId);
      const stream = response?.videos?.items?.find(
        (item) => item.quality === quality
      );

      if (!stream?.url) throw new Error("No downloadable video found.");
      setVideoUrl(stream.url);
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  const handleDownload = async () => {
    if (!videoUrl) return;
    setDownloading(true);
    try {
      const a = document.createElement("a");
      a.href = `http://localhost:5000/api/download?url=${encodeURIComponent(
        videoUrl
      )}`;
      a.setAttribute("download", `youtube-${quality}-${Date.now()}.mp4`);
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
      icon: <Zap className="w-10 h-10 text-indigo-500" />,
      title: "Lightning Fast",
      desc: "Download YouTube videos instantly with one click.",
    },
    {
      icon: <Shield className="w-10 h-10 text-indigo-500" />,
      title: "Safe & Secure",
      desc: "No account required. We respect your privacy.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-indigo-500" />,
      title: "Works Everywhere",
      desc: "Supports mobile, tablet, and desktop devices.",
    },
  ];

  const faqs = [
    {
      q: "Is this YouTube Downloader free?",
      a: "Yes, this tool is completely free and always will be.",
    },
    {
      q: "Can I download in HD quality?",
      a: "Yes! You can select 720p and higher if available.",
    },
    {
      q: "Does it work on mobile?",
      a: "Absolutely, it works on Android, iOS, and desktop browsers.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 flex flex-col">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center text-white py-14 px-6"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold italic drop-shadow-lg flex justify-center items-center gap-2">
          <Play className="w-12 h-12" /> YouTube Video Downloader
        </h1>
        <p className="mt-4 text-lg md:text-2xl opacity-90">
          Download your favorite YouTube videos in{" "}
          <span className="font-bold">HD quality</span>
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
          whileFocus={{
            scale: 1.02,
            boxShadow: "0px 0px 15px rgba(99,102,241,0.7)",
          }}
          value={url}
          type="text"
          placeholder="Paste YouTube Video URL..."
          onChange={(e) => setUrl(e.target.value)}
          className="w-full md:w-[420px] text-lg py-3 px-4 text-black border border-gray-300 bg-white rounded-lg shadow focus:outline-none"
        />

        <motion.select
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 12px rgba(99,102,241,0.6)",
          }}
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="py-3 px-4 text-lg rounded-lg border bg-white border-gray-300 shadow focus:outline-none"
        >
          <option value="144p">144p</option>
          <option value="240p">240p</option>
          <option value="360p">360p</option>
          <option value="480p">480p</option>
          <option value="720p">720p</option>
        </motion.select>

        <motion.button
          whileHover={{
            scale: 1.12,
            y: -5,
            boxShadow: "0px 8px 25px rgba(99,102,241,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="text-lg md:text-xl font-bold py-3 px-6 text-white bg-indigo-600 hover:bg-purple-500 rounded-lg shadow-lg transition duration-300"
        >
          See Video
        </motion.button>
      </motion.form>

      {error && <p className="text-purple-200 text-center mt-4">{error}</p>}

      {/* Video Preview */}
      {videoUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mt-10 px-4 gap-6"
        >
          <motion.video
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 30px rgba(99,102,241,0.7)",
            }}
            controls
            className="w-[300px] rounded-xl shadow-xl border-4 border-white"
          >
            <source src={videoUrl} type="video/mp4" />
          </motion.video>

          <motion.button
            whileHover={{
              scale: 1.1,
              y: -5,
              boxShadow: "0px 10px 30px rgba(99,102,241,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={downloading}
            className="text-lg md:text-xl font-bold py-3 px-6 text-white bg-indigo-600 hover:bg-purple-500 rounded-lg shadow-lg transition duration-300 disabled:opacity-60"
          >
            {downloading ? "Preparing..." : "Download Video"}
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
            <h2 className="text-xl font-bold text-indigo-600 mt-3">
              {f.title}
            </h2>
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
              className={`border rounded-lg p-4 cursor-pointer shadow-md transition ${
                faqOpen === i ? "bg-indigo-50" : "bg-white"
              }`}
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg text-gray-800">{faq.q}</p>
                <motion.div
                  animate={{ rotate: faqOpen === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HelpCircle className="w-5 h-5 text-indigo-500" />
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

export default YouTubeDownloader;
