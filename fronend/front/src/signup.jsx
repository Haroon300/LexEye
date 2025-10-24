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
  FiShield,
  FiHome,
  FiBookmark,
  FiStar
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
          <div className="absolute w-96 h-96 bg-[#748CAB]/20 rounded-full blur-3xl -top-20 -right-20 animate-pulse-slow" />
          <div className="absolute w-80 h-80 bg-[#3E5C76]/20 rounded-full blur-3xl top-1/3 -left-20 animate-pulse-slower" />
          <div className="absolute w-72 h-72 bg-[#1D2D44]/20 rounded-full blur-3xl bottom-20 right-1/4 animate-pulse-slow" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>
        </div>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 left-6 z-20"
        >
          <Link
            to="/"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#F0EBD8] font-semibold hover:bg-white/20 rounded-xl px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <FiHome className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm">Home</span>
          </Link>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-[#000000]/80 to-[#66666e]/80 backdrop-blur-2xl border border-[#748CAB]/20 rounded-3xl p-8 shadow-2xl shadow-[#748CAB]/10"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <div className="inline-flex p-4 bg-[#66666e]/20 rounded-2xl border border-[#000]/30 mb-4">
                <FiUser className="text-3xl text-[#e6e6e9]" />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-[#fff] to-[#fff] text-transparent bg-clip-text mb-2">
                Join LexEye
              </h1>
              <p className="text-[#F0EBD8]/60 text-sm">
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

            {/* Benefits Section */}
            <motion.div
              variants={itemVariants}
              className="mb-6 p-4 bg-[#748CAB]/10 border border-[#748CAB]/20 rounded-2xl"
            >
              <h3 className="text-[#fff] font-semibold text-sm mb-3 text-center">Create your account to unlock:</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { icon: FiBookmark, text: "Save Legal Guides" },
                  { icon: FiStar, text: "Personal Profile" },
                  { icon: FiShield, text: "Secure Access" },
                  { icon: FiUser, text: "Track History" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-[#F0EBD8]/70 p-2 rounded-lg bg-[#0D1B2A]/30">
                    <benefit.icon className="text-[#66666e] text-sm" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-[#fff] text-sm font-medium mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]/40 text-lg" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className={`w-full pl-12 pr-4 py-4 bg-[#000]/50 backdrop-blur-xl border rounded-2xl text-[#fff] placeholder-[#F0EBD8]/40 focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-[#9999a1] focus:border-[#9999a1] focus:ring-2 focus:ring-[#66666e]/20"
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
                <label className="block text-[#fff] text-sm font-medium mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]/40 text-lg" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className={`w-full pl-12 pr-4 py-4 bg-[#000]/50 backdrop-blur-xl border rounded-2xl text-[#fff] placeholder-[#F0EBD8]/40 focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-[#9999a1] focus:border-[#9999a1] focus:ring-2 focus:ring-[#66666e]/20"
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
                <label className="block text-[#fff] text-sm font-medium mb-3">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]/40 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={data.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 bg-[#000]/50 backdrop-blur-xl border rounded-2xl text-[#fff] placeholder-[#F0EBD8]/40 focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-[#9999a1] focus:border-[#9999a1] focus:ring-2 focus:ring-[#66666e]/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]/40 hover:text-[#748CAB] transition-colors duration-200"
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
                      <span className="text-[#F0EBD8]/60">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength <= 2 ? "text-red-400" :
                        passwordStrength <= 3 ? "text-yellow-400" : "text-green-400"
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-[#0D1B2A]/50 rounded-full h-2">
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
                <label className="block text-[#fff] text-sm font-medium mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#fff] text-lg" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 bg-[#000]/50 backdrop-blur-xl border rounded-2xl text-[#fff] placeholder-[#F0EBD8]/40 focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" 
                        : "border-[#9999a1] focus:border-[#9999a1] focus:ring-2 focus:ring-[#66666e]/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]/40 hover:text-[#748CAB] transition-colors duration-200"
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

              {/* Terms Agreement */}
              <motion.div variants={itemVariants}>
                <label className="flex items-start gap-3 text-[#F0EBD8]/60 text-sm cursor-pointer group">
                  <input 
                    type="checkbox" 
                    required
                    className="mt-1 rounded bg-[#0D1B2A]/50 border-[#3E5C76] text-[#748CAB] focus:ring-[#748CAB] focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#0D1B2A] transition-all duration-300 group-hover:border-[#748CAB]" 
                  />
                  <span>
                    I agree to the{" "}
                    <Link to="/terms" className="text-[#748CAB] hover:text-[#8FA8C9] transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-[#748CAB] hover:text-[#8FA8C9] transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loader}
                  className="group relative w-full bg-gradient-to-r from-[#9999a1] to-[#66666e] text-[#fff] font-semibold py-4 px-8 rounded-2xl shadow-2xl shadow-[#748CAB]/25 hover:shadow-[#748CAB]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-[#748CAB]/30 overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#F0EBD8]/10 to-transparent" />
                  
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loader ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#F0EBD8] border-t-transparent rounded-full animate-spin" />
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
              <div className="flex-1 h-px bg-[#F0EBD8]/10"></div>
              <span className="px-4 text-[#F0EBD8]/40 text-sm">Already have an account?</span>
              <div className="flex-1 h-px bg-[#F0EBD8]/10"></div>
            </motion.div>

            {/* Sign In Link */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <Link 
                to="/signin" 
                className="group flex items-center justify-center gap-3 w-full bg-[#66666e]/50 border border-[#9999a1] text-[#fff] font-semibold py-4 px-8 rounded-2xl hover:bg-[#000] hover:border-[#9999a1] transition-all duration-300"
              >
                <FiUser className="text-lg group-hover:scale-110 transition-transform" />
                <span>Sign In to Existing Account</span>
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Security Note */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 bg-[#748CAB]/10 border border-[#748CAB]/20 rounded-2xl text-center"
            >
              <div className="flex items-center justify-center gap-2 text-[#66666e] text-sm">
                <FiShield className="text-base" />
                <span>Your legal information is protected with encryption</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Background Legal Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl text-[#F0EBD8]/5"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 12}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
              }}
            >
              ⚖️
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
};

export default SignUp;