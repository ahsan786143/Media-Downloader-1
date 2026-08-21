import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Zap,
  Shield,
  Smartphone,
  HelpCircle,
  Download,
  CheckCircle2,
  Loader2,
  ChevronDown,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";
import fetchYouTubeVideo from "../../YouTubeApi";

const YouTubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState("360p");
  const [faqOpen, setFaqOpen] = useState(null);

  const videoRef = useRef(null);

  // ============================================
  // Extract YouTube Video ID
  // ============================================
  const getVideoId = (value) => {
    if (!value) return null;

    const regex =
      /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = value.match(regex);

    return match ? match[1] : null;
  };

  // ============================================
  // Get Video
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setVideoUrl(null);

    const videoId = getVideoId(url.trim());

    if (!videoId) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetchYouTubeVideo(videoId);

      console.log("YouTube API Response:", response);

      const videos = response?.videos?.items || [];

      // First try selected quality
      let stream = videos.find(
        (item) =>
          item.quality === quality &&
          item.url
      );

      // If selected quality is not available,
      // use any available video
      if (!stream) {
        stream = videos.find((item) => item.url);
      }

      if (!stream?.url) {
        throw new Error("No downloadable video found.");
      }

      setVideoUrl(stream.url);

      // Scroll to preview
      setTimeout(() => {
        document
          .getElementById("youtube-video-preview")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 150);

      // Try autoplay
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            console.log("Autoplay blocked by browser.");
          });
        }
      }, 500);
    } catch (err) {
      console.error("YouTube API Error:", err);

      setError(
        "Unable to process this YouTube video. Please check the URL and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Download Video
  // ============================================
  const handleDownload = async () => {
    if (!videoUrl) return;

    setDownloading(true);
    setError("");

    try {
      /*
        Your backend should have:

        GET /api/download?url=VIDEO_URL

        Example:
        http://localhost:5000/api/download?url=...
      */

      const backendUrl =
        `http://localhost:5000/api/download?url=${encodeURIComponent(
          videoUrl
        )}`;

      const response = await fetch(backendUrl);

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
      a.download = `youtube-${quality}-${Date.now()}.mp4`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("Download failed:", err);

      /*
        Fallback:
        Open the actual video URL in a new tab.
        User can use the video's 3 dots/download option.
      */

      try {
        const a = document.createElement("a");

        a.href = videoUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        document.body.appendChild(a);

        a.click();

        a.remove();
      } catch (fallbackError) {
        console.error(
          "Fallback failed:",
          fallbackError
        );

        setError(
          "Download failed. Please open the video and use the video player's download option."
        );
      }
    } finally {
      setTimeout(() => {
        setDownloading(false);
      }, 800);
    }
  };

  // ============================================
  // Features
  // ============================================
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Download YouTube videos quickly with a simple and easy process.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      desc: "No account required. We respect your privacy and keep the process simple.",
    },
    {
      icon: Smartphone,
      title: "Works Everywhere",
      desc: "Use the downloader on mobile, tablet, laptop, or desktop devices.",
    },
  ];

  // ============================================
  // Steps
  // ============================================
  const steps = [
    {
      number: "01",
      title: "Copy YouTube Link",
      desc: "Copy the URL of the YouTube video you want to download.",
    },
    {
      number: "02",
      title: "Paste & Get Video",
      desc: "Paste the YouTube URL, select your preferred quality, and click Get Video.",
    },
    {
      number: "03",
      title: "Preview & Download",
      desc: "Preview your video and click Download Video to save it.",
    },
  ];

  // ============================================
  // FAQs
  // ============================================
  const faqs = [
    {
      q: "Is this YouTube Downloader free?",
      a: "Yes, this downloader is free to use. No account or registration is required.",
    },
    {
      q: "Can I download YouTube videos in HD?",
      a: "Yes. Select the quality you want before processing the video. Availability depends on the video and API response.",
    },
    {
      q: "Does it work on mobile?",
      a: "Yes. The website is responsive and works on Android, iPhone, tablets, laptops, and desktop computers.",
    },
    {
      q: "What if the Download button doesn't work?",
      a: "If the Download Video button does not start the download, the video will be opened in a new tab. Use the three dots on the video player and select the Download option if your browser provides it.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#080b16]">

        {/* Background Glow */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-red-500/20 blur-[130px]" />

          <div className="absolute -right-40 top-20 h-[480px] w-[480px] rounded-full bg-purple-600/20 blur-[130px]" />

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
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-red-400" />

              Fast & Free YouTube Downloader
            </div>
          </motion.div>

          {/* Heading */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto mt-7 max-w-4xl text-center"
          >

            <div className="mb-5 flex justify-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-purple-600 shadow-2xl shadow-red-500/20">

                <Play className="h-8 w-8 fill-current text-white" />

              </div>

            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

              Download YouTube

              <span className="block bg-gradient-to-r from-red-400 via-white to-purple-400 bg-clip-text text-transparent">

                Videos Instantly

              </span>

            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg md:text-xl">

              Paste a YouTube video link, select your quality, preview the
              video and download it quickly.

            </p>

          </motion.div>

          {/* Downloader */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="mx-auto mt-12 max-w-4xl"
          >

            <div className="rounded-[28px] border border-white/10 bg-white/[0.07] p-2 backdrop-blur-2xl sm:p-3">

              <form
                onSubmit={handleSubmit}
                className="rounded-[22px] bg-white p-3 shadow-2xl sm:p-4"
              >

                <div className="flex flex-col gap-3 lg:flex-row">

                  {/* URL */}

                  <div className="relative flex-1">

                    <LinkIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste YouTube video URL here..."
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100 sm:text-base"
                    />

                  </div>

                  {/* Quality */}

                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100"
                  >

                    <option value="144p">
                      144p
                    </option>

                    <option value="240p">
                      240p
                    </option>

                    <option value="360p">
                      360p
                    </option>

                    <option value="480p">
                      480p
                    </option>

                    <option value="720p">
                      720p
                    </option>

                  </select>

                  {/* Submit */}

                  <motion.button
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    type="submit"
                    disabled={loading}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-purple-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                  >

                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />

                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 fill-current" />

                        Get Video
                      </>
                    )}

                  </motion.button>

                </div>

              </form>

              {/* Trust */}

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 py-3 text-xs text-slate-400">

                <span className="flex items-center gap-1.5">

                  <CheckCircle2 className="h-3.5 w-3.5 text-red-400" />

                  No registration

                </span>

                <span className="flex items-center gap-1.5">

                  <CheckCircle2 className="h-3.5 w-3.5 text-red-400" />

                  Free to use

                </span>

                <span className="flex items-center gap-1.5">

                  <CheckCircle2 className="h-3.5 w-3.5 text-red-400" />

                  Fast processing

                </span>

              </div>

            </div>

            {/* Error */}

            <AnimatePresence>

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
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

      {/* =====================================================
          VIDEO PREVIEW
      ====================================================== */}

      <AnimatePresence>

        {videoUrl && (
          <motion.section
            id="youtube-video-preview"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="bg-[#09090f] px-5 py-16"
          >

            <div className="mx-auto max-w-3xl text-center">

              {/* Badge */}

              <div className="mb-7">

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300">

                  <CheckCircle2 className="h-4 w-4 text-red-400" />

                  Video Ready

                </span>

                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">

                  Preview Your Video

                </h2>

                <p className="mt-2 text-sm text-slate-500">

                  Your YouTube video is ready to preview.

                </p>

              </div>

              {/* Video */}

              <div className="mx-auto max-w-[560px] rounded-[30px] border border-white/10 bg-black p-2 shadow-2xl shadow-red-500/10">

                <video
                  ref={videoRef}
                  key={videoUrl}
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  className="aspect-video w-full rounded-[23px] bg-black object-contain"
                >

                  <source
                    src={videoUrl}
                    type="video/mp4"
                  />

                  Your browser does not support video playback.

                </video>

              </div>

              {/* Download */}

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
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-purple-600 px-7 py-3.5 font-bold text-white shadow-xl shadow-red-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {downloading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />

                    Preparing...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />

                    Download Video
                  </>
                )}

              </motion.button>

              {/* Download Note */}

              <div className="mx-auto mt-5 max-w-xl rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-left">

                <div className="flex gap-3">

                  <div className="mt-0.5 shrink-0">

                    <HelpCircle className="h-5 w-5 text-amber-400" />

                  </div>

                  <div>

                    <p className="font-semibold text-amber-300">
                      Download Note
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-400">

                      If the{" "}
                      <span className="font-semibold text-white">
                        Download Video
                      </span>{" "}
                      button does not download the video, open the video in
                      the player and click the{" "}
                      <span className="font-semibold text-white">
                        3 dots (⋮)
                      </span>{" "}
                      on the video. Then select the{" "}
                      <span className="font-semibold text-white">
                        Download
                      </span>{" "}
                      option.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.section>
        )}

      </AnimatePresence>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">

              Why Choose Us

            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">

              Simple. Fast. Private.

            </h2>

            <p className="mt-4 text-slate-500">

              Everything you need for a smooth YouTube downloading experience.

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
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-xl"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-purple-600 text-white shadow-lg">

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

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="border-y border-slate-200 bg-white px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">

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

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-purple-600 text-sm font-black text-white shadow-lg">

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

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl">

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">

              FAQ

            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">

              Frequently Asked Questions

            </h2>

            <p className="mt-4 text-slate-500">

              Everything you need to know about our YouTube downloader.

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
                      ? "border-indigo-200 shadow-md"
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

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">

                        <HelpCircle className="h-4 w-4 text-indigo-600" />

                      </span>

                      <span className="font-semibold text-slate-800">

                        {faq.q}

                      </span>

                    </div>

                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
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

    </main>
  );
};

export default YouTubeDownloader;