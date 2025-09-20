import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { name: "TikTok Downloader", href: "/" },
    { name: "Instagram Reels Downloader", href: "/instagramreel" },
    { name: "YouTube Downloader", href: "/youtubedownloader" },
    { name: "Privacy Policy", href: "/privacypolicy" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-indigo-600 to-red-600 text-white py-12 mt-16"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2 className="text-2xl font-bold">Media Downloader</h2>
          <p className="mt-3 text-gray-200 text-sm">
            Download TikTok Stories, Instagram Reels, and YouTube videos easily
            with our free tool.
          </p>
        </motion.div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {footerLinks.map((link, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <a
                  href={link.href}
                  className="hover:text-yellow-300 transition-colors text-sm"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-5">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.3, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-yellow-300"
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="border-t border-white/30 mt-10 pt-4 text-center text-sm text-gray-200"
      >
        © {new Date().getFullYear()} Media Downloader. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
