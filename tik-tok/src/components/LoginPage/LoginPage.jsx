import React from "react";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-center text-red-600 mb-6"
      >
        Login to Your Account 
      </motion.h2>

      {/* Form */}
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-500 transition-colors shadow"
        >
          Login
        </motion.button>
      </form>

      {/* Forgot Password */}
      <p className="text-sm text-gray-500 text-center mt-4">
        Forgot password?{" "}
        <span className="text-red-500 cursor-pointer hover:underline">
          Reset here
        </span>
      </p>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="px-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      {/* Social Logins */}
      <div className="flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
        >
          <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
          Continue with Facebook
        </motion.button>
      </div>

      {/* Signup Redirect */}
      <p className="text-sm text-center mt-6 text-gray-600">
        Don’t have an account?{" "}
        <span className="text-red-500 font-semibold cursor-pointer hover:underline">
          Sign up
        </span>
      </p>
    </motion.div>
  );
};

export default LoginPage;
