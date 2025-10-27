import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoArrowBack, IoMail, IoLockClosed, IoKey, IoEye, IoEyeOff } from "react-icons/io5";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";

/* Color Constants matching your palette */
const COLORS = {
  navy: {
    1: '#000000',
    2: '#66666e',
    3: '#9999a1',
    4: '#e6e6e9',
    5: '#f4f4f6'
  }
};

// Axios instance with base configuration
const api = axios.create({
  baseURL: "https://lex-eye-backend.vercel.app/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await api.post("/forgot-password", { email });
      
      if (response.data.success) {
        setStep(2);
        setSuccess("OTP sent to your email!");
        startResendTimer();
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/verify", { email, otp: otpString });

      if (response.data.success) {
        setStep(3);
        setSuccess("OTP verified successfully! Set your new password.");
      } else {
        setError(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle new password submission
  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/reset-password", { 
        email, 
        password: newPassword 
      });

      if (response.data.success) {
        setStep(4);
        setSuccess("Password reset successfully!");
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle OTP key down for navigation
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Resend OTP function
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/resend-otp", { email });

      if (response.data.success) {
        setSuccess("New OTP sent to your email!");
        startResendTimer();
      } else {
        setError(response.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Start resend timer (60 seconds)
  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Reset the form
  const handleReset = () => {
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
    setError("");
    setSuccess("");
    setResendTimer(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 md:pt-8 lg:pt-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl -top-8 -left-8 md:-top-20 md:-left-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[3]}10` }}
        />
        <div 
          className="absolute w-40 h-40 md:w-80 md:h-80 rounded-full blur-3xl top-1/4 -right-8 md:top-1/3 md:-right-20 animate-pulse-slower"
          style={{ backgroundColor: `${COLORS.navy[4]}10` }}
        />
        <div 
          className="absolute w-36 h-36 md:w-72 md:h-72 rounded-full blur-3xl bottom-8 left-1/4 md:bottom-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[2]}20` }}
        />
      </div>

      {/* Main Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-sm md:max-w-md mx-auto"
      >
        <div className="backdrop-blur-2xl border rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl"
          style={{
            backgroundColor: `${COLORS.navy[2]}40`,
            borderColor: `${COLORS.navy[4]}20`
          }}
        >
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <Link to="/signin" className="inline-flex items-center gap-2 mb-4 md:mb-6 group">
              <IoArrowBack className="text-lg transition-transform group-hover:-translate-x-1" style={{ color: COLORS.navy[4] }} />
              <span className="font-medium text-sm md:text-base" style={{ color: COLORS.navy[4] }}>Back to Sign In</span>
            </Link>

            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl flex items-center justify-center border"
              style={{
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <IoLockClosed className="text-xl md:text-2xl" style={{ color: COLORS.navy[4] }} />
            </div>

            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2" style={{ color: COLORS.navy[5] }}>
              Forgot Password?
            </h1>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.navy[4] }}>
              {step === 1 && "Enter your email to receive OTP"}
              {step === 2 && "Enter the OTP sent to your email"}
              {step === 3 && "Enter your new password"}
              {step === 4 && "Password reset successful!"}
            </p>
          </div>

          {/* Error and Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3 p-3 mb-4 rounded-xl border text-sm"
                style={{
                  backgroundColor: `${COLORS.navy[3]}20`,
                  borderColor: `${COLORS.navy[3]}30`
                }}
              >
                <FaExclamationTriangle className="flex-shrink-0 mt-0.5" style={{ color: COLORS.navy[3] }} />
                <p className="flex-1" style={{ color: COLORS.navy[5] }}>{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3 p-3 mb-4 rounded-xl border text-sm"
                style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`
                }}
              >
                <FaCheckCircle className="flex-shrink-0 mt-0.5" style={{ color: COLORS.navy[4] }} />
                <p className="flex-1" style={{ color: COLORS.navy[5] }}>{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 1: Email Input */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step-1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleEmailSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: COLORS.navy[4] }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IoMail className="text-lg" style={{ color: COLORS.navy[3] }} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm md:text-base rounded-xl border backdrop-blur-xl transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: `${COLORS.navy[2]}80`,
                        borderColor: `${COLORS.navy[4]}30`,
                        color: COLORS.navy[5],
                      }}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm md:text-base backdrop-blur-xl border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`,
                    color: COLORS.navy[4]
                  }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{
                        borderColor: `${COLORS.navy[4]}30`,
                        borderTopColor: COLORS.navy[4]
                      }} />
                      Sending OTP...
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </motion.button>
              </motion.form>
            )}

            {/* Step 2: OTP Input */}
            {step === 2 && (
              <motion.form
                key="step-2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleOtpSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-3 md:mb-4 text-center" style={{ color: COLORS.navy[4] }}>
                    Enter 6-digit OTP sent to <br className="sm:hidden" />
                    <span className="font-medium">{email}</span>
                  </label>
                  <div className="flex justify-center gap-1 md:gap-2 mb-4 md:mb-6">
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 h-10 md:w-12 md:h-12 text-center rounded-xl border backdrop-blur-xl text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2"
                        style={{
                          backgroundColor: `${COLORS.navy[2]}80`,
                          borderColor: `${COLORS.navy[4]}30`,
                          color: COLORS.navy[5],
                        }}
                        whileFocus={{ scale: 1.05 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0 || loading}
                    className="text-xs md:text-sm font-medium transition-all duration-300 disabled:opacity-50 px-3 py-2 rounded-lg"
                    style={{ 
                      color: COLORS.navy[4],
                      backgroundColor: resendTimer > 0 ? `${COLORS.navy[3]}20` : 'transparent'
                    }}
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>

                <div className="flex gap-2 md:gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm md:text-base backdrop-blur-xl border transition-all duration-300"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[4]
                    }}
                  >
                    Back
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm md:text-base backdrop-blur-xl border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[4]
                    }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{
                          borderColor: `${COLORS.navy[4]}30`,
                          borderTopColor: COLORS.navy[4]
                        }} />
                        <span className="hidden sm:inline">Verifying...</span>
                      </div>
                    ) : (
                      "Verify OTP"
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <motion.form
                key="step-3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleNewPasswordSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-2" style={{ color: COLORS.navy[4] }}>
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IoKey className="text-lg" style={{ color: COLORS.navy[3] }} />
                    </div>
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 text-sm md:text-base rounded-xl border backdrop-blur-xl transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: `${COLORS.navy[2]}80`,
                        borderColor: `${COLORS.navy[4]}30`,
                        color: COLORS.navy[5],
                      }}
                      placeholder="Enter new password"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      style={{ color: COLORS.navy[3] }}
                    >
                      {showPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: COLORS.navy[4] }}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IoKey className="text-lg" style={{ color: COLORS.navy[3] }} />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 text-sm md:text-base rounded-xl border backdrop-blur-xl transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: `${COLORS.navy[2]}80`,
                        borderColor: `${COLORS.navy[4]}30`,
                        color: COLORS.navy[5],
                      }}
                      placeholder="Confirm new password"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      style={{ color: COLORS.navy[3] }}
                    >
                      {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 md:gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setStep(2)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm md:text-base backdrop-blur-xl border transition-all duration-300"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[4]
                    }}
                  >
                    Back
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm md:text-base backdrop-blur-xl border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[4]
                    }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{
                          borderColor: `${COLORS.navy[4]}30`,
                          borderTopColor: COLORS.navy[4]
                        }} />
                        <span className="hidden sm:inline">Resetting...</span>
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                key="step-4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-4 md:space-y-6"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center border-4"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FaCheckCircle className="text-2xl md:text-3xl" style={{ color: COLORS.navy[4] }} />
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: COLORS.navy[5] }}>
                    Password Reset Successful!
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.navy[4] }}>
                    Your password has been reset successfully. You can now sign in with your new password.
                  </p>
                </div>

                <div className="flex gap-2 md:gap-3">
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm md:text-base backdrop-blur-xl border transition-all duration-300"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[4]
                    }}
                  >
                    Reset Another
                  </motion.button>

                  <Link to="/signin" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 rounded-xl font-semibold text-sm md:text-base backdrop-blur-xl border-2 transition-all duration-300"
                      style={{
                        backgroundColor: `${COLORS.navy[4]}20`,
                        borderColor: `${COLORS.navy[4]}30`,
                        color: COLORS.navy[4]
                      }}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t text-center"
            style={{
              borderColor: `${COLORS.navy[4]}20`
            }}
          >
            <p className="text-xs md:text-sm" style={{ color: COLORS.navy[3] }}>
              Need help?{" "}
              <Link to="/contact" className="font-medium hover:underline" style={{ color: COLORS.navy[4] }}>
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;