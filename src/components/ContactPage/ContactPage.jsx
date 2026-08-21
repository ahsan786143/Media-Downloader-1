import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16 px-6 md:px-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full grid md:grid-cols-2 gap-10"
      >
        {/* Left Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Let’s Build Something{" "}
            <motion.span
              whileHover={{ scale: 1.2, color: "#fde047", rotate: -3 }}
              className="text-yellow-300 inline-block cursor-pointer"
            >
              Great
            </motion.span>{" "}
            Together
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Have an idea, feedback, or just want to say hello? We’d love to hear
            from you. Fill out the form and we’ll get back to you soon.
          </p>

          <div className="space-y-4">
            {[
              { icon: <Mail />, text: "mediadownloader@gmail.com", color: "text-yellow-300" },
              { icon: <Phone />, text: "+92 300 1234567", color: "text-green-300" },
              { icon: <MapPin />, text: "Okara, Pakistan", color: "text-pink-300" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.1,
                  x: 10,
                  color: "#fff",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center gap-4 cursor-pointer"
              >
                <div className={`${item.color} w-6 h-6`}>{item.icon}</div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-10"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {["name", "email"].map((field, i) => (
                <motion.input
                  key={i}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Your Full Name"
                      : "Your Email Address"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  whileFocus={{
                    scale: 1.03,
                    boxShadow: "0px 0px 15px rgba(255,255,255,0.4)",
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
                />
              ))}
              <motion.textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                whileFocus={{
                  scale: 1.03,
                  boxShadow: "0px 0px 15px rgba(255,255,255,0.4)",
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
              ></motion.textarea>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: "0px 10px 25px rgba(253,224,71,0.6)",
                  backgroundColor: "#facc15",
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                <Send className="w-5 h-5" /> Send Message
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.h2
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
                className="text-2xl font-bold text-green-400 mb-4"
              >
                 Message Sent!
              </motion.h2>
              <p className="text-gray-100">
                Thank you for contacting us. We’ll respond as soon as possible.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
