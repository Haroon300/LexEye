import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import axios from "axios";
import { Server } from "./utils/bookmarkUtils";
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiLogIn,
  FiArrowRight,
  FiShield
} from "react-icons/fi";

const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoader(true);
    setErrors({});

    try {
      const response = await axios.post(
        "https://lex-eye-backend.vercel.app/api/auth/signin",
        data
      );

      setLoader(false);

      const { token, user } = response.data;

      if (!token || !user) {
        alert("Invalid server response. Please try again.");
        return;
      }

      // Store user + token properly
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      try {
        await Server(token);
      } catch (err) {
        console.warn("Could not sync bookmarks:", err.message);
      }

      // Success notification
      setTimeout(() => {
         window.location.href = "/";
      }, 1000);
      
    } catch (error) {
      setLoader(false);
      if (error.response) {
        setErrors({ submit: error.response.data.message || "Invalid credentials" });
      } else if (error.request) {
        setErrors({ submit: "Network error. Please check your internet connection." });
      } else {
        setErrors({ submit: "Error: " + error.message });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {loader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative pt-[5%] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
          <div className="absolute w-80 h-80 bg-blue-400/10 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower" />
          <div className="absolute w-72 h-72 bg-teal-400/10 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <div className="inline-flex p-3 bg-cyan-500/20 rounded-2xl border border-cyan-400/30 mb-4">
                <FiLogIn className="text-3xl text-cyan-400" />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-200 to-gray-200 text-transparent bg-clip-text mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm">
                Sign in to access your legal resources and bookmarks
              </p>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl text-red-300 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <FiShield className="text-lg" />
                    {errors.submit}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 text-sm font-medium mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    }`}
                    required
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 text-sm font-medium mb-3">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      errors.password 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 text-gray-400">
                  <input type="checkbox" className="rounded bg-white/5 border-white/10 text-cyan-400 focus:ring-cyan-400" />
                  Remember me
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loader}
                  className="group relative w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-cyan-400/30 overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loader ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <FiLogIn className="text-xl group-hover:scale-110 transition-transform" />
                        <span>Sign In</span>
                        <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center my-8"
            >
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 group inline-flex items-center gap-1"
                >
                  Sign Up
                  <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </motion.div>

            {/* Security Note */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-4 bg-cyan-500/10 border border-cyan-400/20 rounded-2xl text-center"
            >
              <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm">
                <FiShield className="text-base" />
                <span>Your data is securely encrypted</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default SignIn;