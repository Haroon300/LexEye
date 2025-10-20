import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loader from "./components/Loader";
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiArrowRight,
  FiCheck,
  FiShield
} from "react-icons/fi";

const SignUp = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.name.trim()) {
      newErrors.name = "Full name is required";
    }
    
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
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@#&!]+/)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (password) => {
    setData({ ...data, password });
    setPasswordStrength(checkPasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "from-red-500 to-orange-500";
    if (passwordStrength <= 3) return "from-orange-500 to-yellow-500";
    return "from-green-500 to-emerald-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoader(true);
    setErrors({});

    try {
      const response = await axios.post(
        "https://lex-eye-backend.vercel.app/api/auth/signup",
        data
      );

      setLoader(false);

      // Show success message before redirect
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
      
    } catch (error) {
      setLoader(false);
      if (error.response) {
        setErrors({ submit: error.response.data.message || "Signup failed. Please try again." });
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
          <div className="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl -top-20 -right-20 animate-pulse-slow" />
          <div className="absolute w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl top-1/3 -left-20 animate-pulse-slower" />
          <div className="absolute w-72 h-72 bg-teal-400/10 rounded-full blur-3xl bottom-20 right-1/4 animate-pulse-slow" />
          
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
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-green-500/10"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <div className="inline-flex p-3 bg-green-500/20 rounded-2xl border border-green-400/30 mb-4">
                <FiUser className="text-3xl text-green-400" />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-green-200 to-emerald-200 text-transparent bg-clip-text mb-2">
                Join LexEye
              </h1>
              <p className="text-gray-400 text-sm">
                Create your account to access personalized legal resources
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
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 text-sm font-medium mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      errors.name 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-white/10 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    }`}
                    required
                  />
                </div>
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 text-sm font-medium mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-white/10 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
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
                    placeholder="Create a strong password"
                    value={data.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      errors.password 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-white/10 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                  >
                    {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {data.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 space-y-2"
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength <= 2 ? "text-red-400" :
                        passwordStrength <= 3 ? "text-yellow-400" : "text-green-400"
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-500`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                )}
                
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

              {/* Confirm Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 text-sm font-medium mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      errors.confirmPassword 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-white/10 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </motion.div>


              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loader}
                  className="group relative w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-green-400/30 overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loader ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <FiCheck className="text-xl group-hover:scale-110 transition-transform" />
                        <span>Create Account</span>
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

            {/* Sign In Link */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link 
                  to="/signin" 
                  className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-200 group inline-flex items-center gap-1"
                >
                  Sign In
                  <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default SignUp;