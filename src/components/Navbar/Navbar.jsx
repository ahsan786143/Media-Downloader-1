import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, AlertCircle } from "lucide-react";
import Logo from "../../assets/logosmall.svg";

// Optional, add once in your global CSS:
// @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap');

const navLinks = [
  {
    name: "Download TikTok",
    href: "/",
    title: "Download TikTok Stories",
    dot: "bg-gradient-to-br from-[#25F4EE] to-[#FE2C55]",
    pill: "bg-gradient-to-r from-[#25F4EE]/15 to-[#FE2C55]/15",
  },
  {
    name: "Download Instagram",
    href: "/instagramreel",
    title: "Download Instagram Reels",
    dot: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4]",
    pill: "bg-gradient-to-r from-[#F58529]/15 via-[#DD2A7B]/15 to-[#515BD4]/15",
  },
  {
    name: "Download Youtube",
    href: "/youtubedownloader",
    title: "Download Youtube video",
    dot: "bg-[#FF0033]",
    pill: "bg-[#FF0033]/10",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          NOTIFICATION BAR
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-[60] w-full overflow-hidden bg-slate-950"
      >
        {/* Subtle glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-80 -translate-x-1/2 bg-[#25D366]/5 blur-2xl" />

        <div className="relative mx-auto flex min-h-[40px] items-center justify-center px-4 py-2 text-center">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[11px] font-medium leading-5 text-slate-300 sm:text-xs">

            <span className="inline-flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" />

              Having trouble downloading a video?
            </span>

            <span className="hidden text-slate-600 sm:inline">
              •
            </span>

            <span>
              Contact us on WhatsApp:
            </span>

            <a
              href="https://wa.me/923077484583"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-bold text-[#25D366] transition-colors duration-300 hover:text-[#4ade80]"
            >
              <MessageCircle className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />

              +92 307 7484583
            </a>
          </p>
        </div>
      </motion.div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <div
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out ${
          scrolled
            ? "px-3 pt-3 md:px-6"
            : "px-0 pt-0"
        }`}
      >
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className={`mx-auto flex max-w-6xl items-center justify-between transition-all duration-500 ease-out ${
            scrolled
              ? "rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2.5 shadow-lg shadow-slate-900/[0.06] backdrop-blur-xl md:px-6"
              : "rounded-none border-b border-slate-100 bg-white px-4 py-3 md:px-8 lg:px-12"
          }`}
        >
          {/* =================================================
              LOGO
          ================================================= */}
          <motion.a
            href="/"
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex items-center justify-center">

              {/* Logo Glow */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />

              <img
                className="relative h-9 w-9 md:h-10 md:w-10"
                src={Logo}
                alt="Media Downloader logo"
              />

              {/* Online indicator */}
              <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-emerald-500" />
              </span>
            </span>

            <div className="flex flex-col leading-none">
              <h1
                className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-rose-500 bg-clip-text text-xl font-bold tracking-tight text-transparent md:text-2xl"
                style={{
                  fontFamily:
                    "'Space Grotesk', 'Inter', sans-serif",
                }}
              >
                Media Downloader
              </h1>

              <span className="hidden text-[11px] font-medium tracking-wide text-slate-400 md:block">
                Fast · Free · No login
              </span>
            </div>
          </motion.a>

          {/* =================================================
              DESKTOP LINKS
          ================================================= */}
          <ul
            onMouseLeave={() => setHovered(null)}
            className="relative hidden items-center gap-1 md:flex"
          >
            {navLinks.map((link, index) => (
              <li
                key={index}
                onMouseEnter={() => setHovered(index)}
                className="relative"
              >
                {hovered === index && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className={`absolute inset-0 rounded-full ${link.pill}`}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                <a
                  href={link.href}
                  title={link.title}
                  className="relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold text-slate-600 transition-colors hover:text-slate-900 lg:text-base"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${link.dot}`}
                  />

                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            className="rounded-lg p-1.5 text-slate-700 transition-colors hover:bg-slate-100 hover:text-indigo-600 md:hidden"
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </motion.nav>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              onClick={() => setMenuOpen(false)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="panel"
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
              }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 max-w-[80%] flex-col bg-white p-6 shadow-2xl md:hidden"
            >
              {/* Close */}
              <div className="mb-8 flex justify-end">
                <button
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  aria-label="Close menu"
                  className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-1 flex-col gap-1">
                {navLinks.map(
                  (link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      title={link.title}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.08 * index +
                          0.1,
                      }}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${link.dot}`}
                      />

                      {link.name}
                    </motion.a>
                  )
                )}
              </div>

              {/* Mobile WhatsApp */}
              <div className="border-t border-slate-100 pt-5">

                <p className="mb-3 text-center text-xs text-slate-400">
                  Having download issues?
                </p>

                <a
                  href="https://wa.me/923077484583"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-5 w-5" />

                  WhatsApp Support
                </a>

                <p className="mt-2 text-center text-[11px] text-slate-400">
                  +92 307 7484583
                </p>
              </div>

              <p className="pt-4 text-center text-xs text-slate-400">
                Fast. Free. No login.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;