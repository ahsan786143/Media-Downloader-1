import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      text: "We may collect basic details such as name and email if you sign up or contact us. No sensitive personal data is required for using our tools.",
    },
    {
      title: "2. How We Use Information",
      text: "We only use your data to improve services, respond to questions, and keep our platform running smoothly.",
    },
    {
      title: "3. Cookies",
      text: "We may use cookies to enhance your browsing experience. You can disable them anytime in your browser settings.",
    },
    {
      title: "4. Third-Party Services",
      text: "Some trusted third-party tools (like analytics) may be used. They follow their own privacy policies.",
    },
    {
      title: "5. Data Security",
      text: "We implement strong security practices but cannot guarantee complete protection for data shared online.",
    },
    {
      title: "6. Your Consent",
      text: "By using our site, you agree to this Privacy Policy. If not, please discontinue using our services.",
    },
    {
      title: "7. Changes to Policy",
      text: "We may update this Privacy Policy over time. Changes will be reflected here with a new date.",
    },
    {
      title: "8. Contact Us",
      text: "If you have questions, email us at support@mediadownloader.com and we’ll be glad to help.",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-800 px-6 py-16">
      {/* Floating background blobs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent mb-10 drop-shadow-md"
        >
          Privacy Policy
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-200 text-center mb-10 leading-relaxed"
        >
          At <span className="font-semibold text-cyan-300">Media Downloader</span>, 
          your privacy matters. This page explains how we collect, use, and protect 
          your information transparently and securely.
        </motion.p>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                boxShadow: "0px 10px 30px rgba(0, 255, 200, 0.5)",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg transition-all duration-300 cursor-pointer"
            >
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent mb-3 hover:from-teal-300 hover:to-cyan-400 transition-all duration-300">
                {section.title}
              </h2>
              <p className="text-gray-200">{section.text}</p>
            </motion.section>
          ))}
        </div>

        {/* Last updated */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-sm text-gray-400 mt-10 text-center italic"
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
