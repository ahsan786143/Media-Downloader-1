import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../LoginPage/LoginPage";
import SignupForm from "../SignupPage/SignupPage";

const AuthModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState("login");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Banner */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-white w-[90%] md:w-[500px] rounded-2xl shadow-2xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
            >
              x
            </button>

            {/* Tabs */}
            <div className="flex justify-around mb-6">
              <button
                onClick={() => setTab("login")}
                className={`text-lg font-semibold pb-2 border-b-2 ${
                  tab === "login"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`text-lg font-semibold pb-2 border-b-2 ${
                  tab === "signup"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Render Forms */}
            {tab === "login" ? <LoginForm /> : <SignupForm />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
