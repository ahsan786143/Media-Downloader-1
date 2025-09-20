import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/logosmall.svg";
import AuthModal from "../AuthModal/AuthModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  const navLinks = [
    { name: "Download TikTok", href: "/", title: "Download TikTok Stories" },
    { name: "Download Instagram", href: "/instagramreel", title: "Download Instagram Reels" },
    { name: "Download Youtube", href: "/youtubedownloader", title: "Download Youtube video" },
   
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center px-4 md:px-8 lg:px-12 py-3 shadow-md bg-white sticky top-0 z-50"
      >
        {/* Logo + Name */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2"
        >
          <img className="w-10 h-10" src={Logo} alt="logo" />
          <h1 className="text-xl md:text-2xl font-bold text-indigo-600">
            Media Downloader
          </h1>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex flex-wrap gap-6 lg:gap-10">
          {navLinks.map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <a
                href={link.href}
                title={link.title}
                className="font-semibold text-base lg:text-lg text-indigo-500 hover:text-teal-400 transition-colors"
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Login Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpenAuth(true)}
          className="hidden md:block text-base lg:text-lg font-semibold text-indigo-500 hover:text-teal-400 py-2 px-4 lg:px-6 border-2 border-indigo-500 hover:border-teal-400 rounded-lg transition-colors"
        >
          Login
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-indigo-600 hover:text-teal-400 transition-colors"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-2xl p-6 flex flex-col space-y-5 md:hidden z-40"
          >
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="font-semibold text-lg text-indigo-500 hover:text-teal-400 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Login Button */}
            <button
              onClick={() => {
                setOpenAuth(true);
                setMenuOpen(false);
              }}
              className="w-full text-lg font-semibold text-indigo-500 hover:text-teal-400 py-2 px-4 border-2 border-indigo-500 hover:border-teal-400 rounded-lg transition-colors"
            >
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
};

export default Navbar;
