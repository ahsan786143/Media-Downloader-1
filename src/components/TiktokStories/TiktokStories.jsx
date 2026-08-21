import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  EyeOff,
  HelpCircle,
  Download,
  Play,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import tiktokvideo from "../../api";

const TiktokStories = () => {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState("0");
  const [faqOpen, setFaqOpen] = useState(null);

  // Video + preview references
  const videoRef = useRef(null);
  const previewRef = useRef(null);

  // =========================================================
  // GET VIDEO
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please paste a TikTok video URL first.");
      return;
    }

    setError("");
    setVideoUrl(null);
    setLoading(true);

    try {
      const response = await tiktokvideo(url, quality);

      const play =
        response?.data?.play ||
        response?.play ||
        response?.url;

      if (!play) {
        throw new Error("No playable URL found");
      }

      // Set video URL
      setVideoUrl(play);

      // Wait for preview to render
      setTimeout(() => {
        // Scroll to video preview
        previewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Try to autoplay video
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .catch((err) => {
                console.log(
                  "Autoplay was blocked by browser:",
                  err
                );
              });
          }
        }, 600);
      }, 200);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to process this link. Please check the URL and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // DOWNLOAD VIDEO
  // =========================================================
  const handleDownload = async () => {
    if (!videoUrl) return;

    setDownloading(true);

    try {
      const res = await fetch(videoUrl, {
        credentials: "omit",
      });

      if (!res.ok) {
        throw new Error("Download failed");
      }

      const blob = await res.blob();

      const objectUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = objectUrl;

      a.download = `tiktok-${
        quality === "1" ? "HD" : "SD"
      }-${Date.now()}.mp4`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error(err);

      // Fallback
      const a = document.createElement("a");

      a.href = videoUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      a.click();
    } finally {
      setDownloading(false);
    }
  };

  // =========================================================
  // FEATURES
  // =========================================================
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Download your favorite TikTok videos in just a few seconds.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Secure",
      desc: "Your links and personal information are never stored.",
    },
    {
      icon: EyeOff,
      title: "No Account Needed",
      desc: "Use the downloader instantly without registration.",
    },
  ];

  // =========================================================
  // FAQ
  // =========================================================
  const faqs = [
    {
      q: "Is this TikTok downloader free?",
      a: "Yes. Our TikTok downloader is completely free to use and does not require an account.",
    },
    {
      q: "Can I download TikTok videos in HD?",
      a: "Yes. Select High Quality from the quality selector before processing your TikTok link.",
    },
    {
      q: "Does this work on mobile?",
      a: "Yes. The website is fully responsive and works on mobile phones, tablets, laptops and desktops.",
    },
    {
      q: "Do I need to install anything?",
      a: "No. Everything works directly in your browser. There is no application or extension required.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#080b16]">

        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#25F4EE]/20 blur-[120px]" />

          <div className="absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-[#FE2C55]/20 blur-[120px]" />

          <div className="absolute bottom-[-200px] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

        </div>

        {/* Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
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

              <Sparkles className="h-4 w-4 text-[#25F4EE]" />

              Fast & Free TikTok Downloader

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
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

              Download TikTok

              <span className="block bg-gradient-to-r from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
                Videos Instantly
              </span>

            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg md:text-xl">
              Paste a TikTok link, choose your quality and download your
              favorite videos quickly and easily.
            </p>
          </motion.div>

          {/* =================================================
              DOWNLOADER
          ================================================= */}
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

                  {/* URL INPUT */}
                  <div className="relative flex-1">

                    <LinkIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      value={url}
                      onChange={(e) =>
                        setUrl(e.target.value)
                      }
                      placeholder="Paste TikTok video URL here..."
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100 sm:text-base"
                    />

                  </div>

                  {/* QUALITY */}
                  <select
                    value={quality}
                    onChange={(e) =>
                      setQuality(e.target.value)
                    }
                    className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100 lg:w-44"
                  >
                    <option value="0">
                      Normal Quality
                    </option>

                    <option value="1">
                      High Quality
                    </option>
                  </select>

                  {/* GET VIDEO */}
                  <motion.button
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    type="submit"
                    disabled={loading}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 text-sm font-bold text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
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
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25F4EE]" />
                  No registration
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25F4EE]" />
                  Free to use
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25F4EE]" />
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
      ===================================================== */}
      <AnimatePresence>
        {videoUrl && (
          <motion.section
            ref={previewRef}
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.5,
            }}
            className="scroll-mt-20 bg-slate-950 px-5 py-16"
          >

            <div className="mx-auto max-w-3xl text-center">

              {/* Video Ready Badge */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300">

                  <CheckCircle2 className="h-4 w-4 text-[#25F4EE]" />

                  Video Ready

                </span>
              </motion.div>

              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Preview Your Video
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Your TikTok video is ready to preview and download.
              </p>

              {/* =================================================
                  VIDEO PLAYER
              ================================================= */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.4,
                }}
                className="mx-auto mt-7 max-w-[340px] rounded-[28px] border border-white/10 bg-black p-2 shadow-2xl shadow-black/40"
              >

                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="aspect-[9/16] w-full rounded-[22px] bg-black object-cover"
                >

                  <source
                    src={videoUrl}
                    type="video/mp4"
                  />

                  Your browser does not support the video tag.

                </video>

              </motion.div>

              {/* Autoplay Notice */}
              <p className="mt-4 text-xs text-slate-500">
                🔊 Tap the video to turn sound on
              </p>

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
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-bold text-slate-950 shadow-xl transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
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

            </div>

          </motion.section>
        )}
      </AnimatePresence>

      {/* =====================================================
          FEATURES
      ===================================================== */}
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
              Everything you need for a smooth TikTok downloading experience.
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

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
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
      ===================================================== */}
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

            {[
              {
                number: "01",
                title: "Copy the Link",
                desc: "Copy the URL of the TikTok video you want to download.",
              },
              {
                number: "02",
                title: "Paste & Process",
                desc: "Paste the link above and choose your preferred quality.",
              },
              {
                number: "03",
                title: "Download",
                desc: "Preview the video and download it to your device.",
              },
            ].map((step, index) => (
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

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
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
      ===================================================== */}
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
              Everything you need to know about our TikTok downloader.
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
                      ? "border-slate-300 shadow-md"
                      : "border-slate-200"
                  }`}
                >

                  <button
                    onClick={() =>
                      setFaqOpen(
                        isOpen ? null : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >

                    <div className="flex items-center gap-3">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">

                        <HelpCircle className="h-4 w-4 text-slate-600" />

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

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="px-5 pb-20 sm:px-6 lg:px-8">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-[#080b16] px-6 py-14 text-center sm:px-10">

          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-[#25F4EE]/10 blur-[90px]" />

          <div className="relative">

            <Sparkles className="mx-auto h-8 w-8 text-[#25F4EE]" />

            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              Ready to Download?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Paste your TikTok link and start downloading your favorite
              videos in seconds.
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
              className="mt-7 rounded-2xl bg-white px-7 py-3.5 font-bold text-slate-950 shadow-xl transition hover:bg-slate-100"
            >
              Start Downloading
            </motion.button>

          </div>
        </div>
      </section>

    </main>
  );
};

export default TiktokStories;