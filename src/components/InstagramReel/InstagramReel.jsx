import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Zap,
  ShieldCheck,
  EyeOff,
  HelpCircle,
  Download,
  Play,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Link as LinkIcon,
  Loader2,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";
import instaApi from "../../instaApi.js";

const InstagramReel = () => {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const videoRef = useRef(null);

  /*
   * Backend URL
   *
   * Local:
   * http://localhost:5000
   *
   * Production:
   * Add VITE_API_URL in your .env file.
   */
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  // =========================================
  // AUTO PLAY VIDEO
  // =========================================
  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    const video = videoRef.current;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log("Autoplay blocked by browser:", err);
      }
    };

    const timer = setTimeout(playVideo, 400);

    return () => clearTimeout(timer);
  }, [videoUrl]);

  // =========================================
  // GET REEL
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setVideoUrl(null);

    const cleanUrl = url.trim();

    if (!cleanUrl) {
      setError("Please paste an Instagram Reel URL first.");
      return;
    }

    if (
      !cleanUrl.includes("instagram.com") ||
      !cleanUrl.includes("/reel/")
    ) {
      setError("Please enter a valid Instagram Reel URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await instaApi(cleanUrl);

      console.log("Instagram API Response:", response);

      const reel =
        response?.media?.[0]?.url ||
        response?.media?.[0]?.video_url ||
        response?.url ||
        response?.video_url ||
        response?.data?.url ||
        response?.data?.video_url ||
        response?.data?.media?.[0]?.url ||
        response?.data?.media?.[0]?.video_url;

      if (!reel) {
        throw new Error("No downloadable Reel URL found.");
      }

      setVideoUrl(reel);

      // Scroll automatically to preview
      setTimeout(() => {
        document
          .getElementById("video-preview")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 200);
    } catch (err) {
      console.error("Instagram API Error:", err);

      setError(
        "Unable to process this Instagram Reel. Please check the URL and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // DOWNLOAD REEL
  // =========================================
  const handleDownload = async () => {
    if (!videoUrl) return;

    setDownloading(true);
    setError("");

    try {
      const downloadUrl = `${API_BASE_URL}/api/downloads?url=${encodeURIComponent(
        videoUrl
      )}`;

      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error("Download request failed.");
      }

      const blob = await response.blob();

      if (!blob || blob.size === 0) {
        throw new Error("Empty video file received.");
      }

      const objectUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = objectUrl;
      a.download = `instagram-reel-${Date.now()}.mp4`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("Download failed:", err);

      /*
       * Fallback:
       * Open actual video URL in new tab.
       */
      const a = document.createElement("a");

      a.href = videoUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      document.body.appendChild(a);
      a.click();
      a.remove();

      setError(
        "Direct download was unavailable. The video has been opened in a new tab."
      );
    } finally {
      setDownloading(false);
    }
  };

  // =========================================
  // FEATURES
  // =========================================
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Process Instagram Reels quickly and get your video ready in seconds.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Secure",
      desc: "Your Instagram links and personal information are not stored.",
    },
    {
      icon: EyeOff,
      title: "No Account Needed",
      desc: "Download Reels without registration, login, or unnecessary steps.",
    },
  ];

  // =========================================
  // HOW IT WORKS
  // =========================================
  const steps = [
    {
      number: "01",
      title: "Copy Reel Link",
      desc: "Open Instagram and copy the link of the Reel you want to download.",
    },
    {
      number: "02",
      title: "Paste & Get Reel",
      desc: "Paste the Instagram Reel URL above and click Get Reel.",
    },
    {
      number: "03",
      title: "Preview & Download",
      desc: "Preview your Reel and download it directly to your device.",
    },
  ];

  // =========================================
  // FAQ
  // =========================================
  const faqs = [
    {
      q: "Is this Instagram Reel downloader free?",
      a: "Yes. You can use this Instagram Reel downloader for free without creating an account.",
    },
    {
      q: "Can I download Instagram Reels in HD?",
      a: "Yes. The downloader attempts to provide the available original or highest-quality video from the Reel.",
    },
    {
      q: "Does this work on mobile?",
      a: "Yes. The website is responsive and works on Android phones, iPhones, tablets, laptops, and desktop computers.",
    },
    {
      q: "Do I need to install an app?",
      a: "No. Everything works directly from your browser. You do not need to install any additional software.",
    },
    {
      q: "Do I need an Instagram account?",
      a: "No account is required to use the downloader. Simply paste the Reel URL and process it.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* =========================================
          HERO
      ========================================= */}
      <section className="relative overflow-hidden bg-[#100816]">

        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-pink-500/20 blur-[130px]" />

          <div className="absolute right-[-150px] top-20 h-[480px] w-[480px] rounded-full bg-purple-600/20 blur-[130px]" />

          <div className="absolute bottom-[-220px] left-1/2 h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[130px]" />

        </div>

        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-6 md:pb-28 md:pt-20 lg:px-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-pink-400" />
              Fast & Free Instagram Reel Downloader
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-7 max-w-4xl text-center"
          >

            <div className="mb-5 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 shadow-2xl shadow-pink-500/20">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Download Instagram
              <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Reels Instantly
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg md:text-xl">
              Paste an Instagram Reel link, get your video preview and
              download it quickly and easily.
            </p>

          </motion.div>

          {/* =====================================
              SUPPORT NOTIFICATION
          ====================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-5 py-4 text-center backdrop-blur-xl sm:flex-row sm:text-left">

              <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-400" />

              <p className="text-sm leading-6 text-slate-300">
                Having any issue downloading a video?
              </p>

              <a
                href="https://wa.me/923077484583"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="h-4 w-4" />
                Contact WhatsApp
              </a>

              <span className="text-sm font-semibold text-green-400">
                +92 307 7484583
              </span>

            </div>
          </motion.div>

          {/* =====================================
              DOWNLOADER
          ====================================== */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-10 max-w-4xl"
          >

            <div className="rounded-[28px] border border-white/10 bg-white/[0.07] p-2 backdrop-blur-2xl sm:p-3">

              <form
                onSubmit={handleSubmit}
                className="rounded-[22px] bg-white p-3 shadow-2xl sm:p-4"
              >

                <div className="flex flex-col gap-3 lg:flex-row">

                  {/* URL Input */}
                  <div className="relative flex-1">

                    <LinkIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste Instagram Reel URL here..."
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 sm:text-base"
                    />

                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                  >

                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 fill-current" />
                        Get Reel
                      </>
                    )}

                  </motion.button>

                </div>

              </form>

              {/* Trust */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 py-3 text-xs text-slate-400">

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-pink-400" />
                  No registration
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-pink-400" />
                  Free to use
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-pink-400" />
                  Fast processing
                </span>

              </div>

            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Stats */}
          <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-8 text-center">

            <div>
              <p className="text-xl font-bold text-white">
                FREE
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Always
              </p>
            </div>

            <div className="h-9 w-px bg-white/10" />

            <div>
              <p className="text-xl font-bold text-white">
                HD
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Quality
              </p>
            </div>

            <div className="h-9 w-px bg-white/10" />

            <div>
              <p className="text-xl font-bold text-white">
                24/7
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Available
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          VIDEO PREVIEW
      ========================================= */}
      <AnimatePresence>
        {videoUrl && (
          <motion.section
            id="video-preview"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#09090f] px-5 py-16"
          >

            <div className="mx-auto max-w-3xl text-center">

              {/* Badge */}
              <div className="mb-7">

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-pink-400" />
                  Reel Ready
                </span>

                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  Preview Your Reel
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Your Instagram Reel is ready to preview.
                </p>

              </div>

              {/* Video */}
              <div className="mx-auto max-w-[350px] rounded-[30px] border border-white/10 bg-black p-2 shadow-2xl shadow-pink-500/10">

                <video
                  ref={videoRef}
                  key={videoUrl}
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  className="aspect-[9/16] w-full rounded-[23px] bg-black object-cover"
                >

                  <source
                    src={videoUrl}
                    type="video/mp4"
                  />

                  Your browser does not support video playback.

                </video>

              </div>

              {/* Download Button */}
              <motion.button
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleDownload}
                disabled={downloading}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-7 py-3.5 font-bold text-white shadow-xl shadow-pink-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {downloading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download Reel
                  </>
                )}

              </motion.button>

              {/* =====================================
                  DOWNLOAD NOTE
              ====================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="mx-auto mt-4 max-w-md rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3"
              >

                <p className="text-center text-xs leading-5 text-yellow-200 sm:text-sm">

                  <span className="font-bold text-yellow-300">
                    Note:
                  </span>{" "}

                  If the video doesn't download using the button above,
                  tap the{" "}

                  <span className="font-bold text-white">
                    3 dots (⋮)
                  </span>{" "}

                  on the video and select{" "}

                  <span className="font-bold text-white">
                    Download
                  </span>
                  .

                </p>

              </motion.div>

            </div>

          </motion.section>
        )}
      </AnimatePresence>

      {/* =========================================
          FEATURES
      ========================================= */}
      <section className="px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              Why Choose Us
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Simple. Fast. Private.
            </h2>

            <p className="mt-4 text-slate-500">
              Everything you need for a smooth Instagram Reel downloading
              experience.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-pink-200 hover:shadow-xl"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-500">
                    {feature.desc}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================================
          HOW IT WORKS
      ========================================= */}
      <section className="border-y border-slate-200 bg-white px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              How It Works
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Download in 3 Simple Steps
            </h2>

          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="text-center"
              >

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-sm font-black text-white shadow-lg shadow-pink-500/20">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  {step.desc}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================
          FAQ
      ========================================= */}
      <section className="px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl">

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              FAQ
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-slate-500">
              Everything you need to know about our Instagram Reel downloader.
            </p>

          </div>

          <div className="mt-10 space-y-3">

            {faqs.map((faq, index) => {

              const isOpen = faqOpen === index;

              return (
                <motion.div
                  key={faq.q}
                  className={`overflow-hidden rounded-2xl border bg-white transition ${
                    isOpen
                      ? "border-pink-200 shadow-md"
                      : "border-slate-200"
                  }`}
                >

                  <button
                    type="button"
                    onClick={() =>
                      setFaqOpen(
                        isOpen ? null : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >

                    <div className="flex items-center gap-3">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-50">
                        <HelpCircle className="h-4 w-4 text-pink-600" />
                      </span>

                      <span className="font-semibold text-slate-800">
                        {faq.q}
                      </span>

                    </div>

                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                    </motion.div>

                  </button>

                  <AnimatePresence>

                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                      >

                        <p className="px-5 pb-5 pl-16 text-sm leading-7 text-slate-500">
                          {faq.a}
                        </p>

                      </motion.div>
                    )}

                  </AnimatePresence>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}
      <section className="px-5 pb-20 sm:px-6 lg:px-8">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-[#100816] px-6 py-14 text-center sm:px-10">

          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-pink-500/10 blur-[90px]" />

          <div className="relative">

            <Sparkles className="mx-auto h-8 w-8 text-pink-400" />

            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              Ready to Download?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Paste your Instagram Reel link and start downloading your
              favorite videos in seconds.
            </p>

            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-7 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-7 py-3.5 font-bold text-white shadow-xl shadow-pink-500/20 transition hover:brightness-110"
            >
              Start Downloading
            </motion.button>

          </div>

        </div>

      </section>

    </main>
  );
};

export default InstagramReel;