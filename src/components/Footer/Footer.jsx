import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowUpRight,
  Heart,
  Download,
} from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      name: "TikTok Downloader",
      href: "/",
    },
    {
      name: "Instagram Reels Downloader",
      href: "/instagramreel",
    },
    {
      name: "YouTube Downloader",
      href: "/youtubedownloader",
    },
    {
      name: "Privacy Policy",
      href: "/privacypolicy",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  const socials = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "#",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden bg-[#080b16] text-white"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-[110px]" />

        <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-[#FE2C55]/10 blur-[110px]" />

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25F4EE]/5 blur-[100px]" />
      </div>

      {/* Top Gradient Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <a
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] opacity-0 blur-xl transition duration-500 group-hover:opacity-30" />

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-lg backdrop-blur-xl">
                  <Download className="h-5 w-5 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  Media Downloader
                </h2>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Fast • Free • Simple
                </p>
              </div>
            </a>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Download your favorite TikTok videos, Instagram Reels and
              YouTube videos quickly and easily. No complicated setup,
              no unnecessary registration.
            </p>

            {/* Mini Features */}
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-400">
                Free to use
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-400">
                Fast downloads
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-400">
                No registration
              </span>
            </div>
          </motion.div>

          {/* ================= QUICK LINKS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                  }}
                >
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                  >
                    <span>{link.name}</span>

                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ================= SOCIAL ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Follow Us
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Follow us on social media for updates and new features.
            </p>

            <div className="mt-5 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    whileHover={{
                      y: -4,
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-400 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
        >
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <div>
              <h3 className="font-bold text-white">
                Ready to download?
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Download your favorite videos in seconds.
              </p>
            </div>

            <motion.a
              href="/"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-slate-100"
            >
              Start Downloading
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>

          </div>
        </motion.div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Media Downloader. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Made with
            <Heart className="h-3.5 w-3.5 fill-current text-[#FE2C55]" />
            for everyone
          </p>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;