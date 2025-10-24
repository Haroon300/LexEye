import React, { useState } from "react";
import { GiScales } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiSend, FiUser, FiMail, FiFolder, FiZap, FiHeart } from "react-icons/fi";

export default function FeedbackPage() {
  const [clarity, setClarity] = useState(5);
  const [speed, setSpeed] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      
      // Redirect after success message
      setTimeout(() => {
        window.location.href = "https://lexeye.vercel.app/";
      }, 2000);
    }, 1500);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen pt-[5%] flex items-center justify-center bg-gradient-to-br from-[#0D1B2A] via-[#1D2D44] to-[#3E5C76] text-[#F0EBD8] px-4 py-8 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#748CAB]/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-[#3E5C76]/20 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-[#1D2D44]/20 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Success Overlay */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-2xl border border-green-400/30 rounded-3xl p-12 text-center shadow-2xl shadow-green-500/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/30"
                >
                  <FiCheck className="text-4xl text-green-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-green-300 mb-4">Thank You!</h3>
                <p className="text-green-200/80 text-lg mb-6">
                  Your feedback helps us improve LexEye for everyone.
                </p>
                <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="p-4 bg-[#748CAB]/20 rounded-2xl border border-[#748CAB]/30">
                <GiScales className="text-5xl text-[#748CAB]" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#F0EBD8] via-[#F0EBD8] to-[#748CAB] text-transparent bg-clip-text mb-4">
                  Help Us Balance the Scales
                </h1>
                <p className="text-[#F0EBD8]/80 text-lg leading-relaxed max-w-2xl mx-auto">
                  Your insights shape LexEye's future. Share your experience to help us create a better legal resource for everyone.
                </p>
              </div>
            </div>
          </motion.div>

          <form
            action="https://formsubmit.co/contact.lexeye78@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Contact Information */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-[#1D2D44]/50 to-[#3E5C76]/50 backdrop-blur-xl border border-[#748CAB]/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#748CAB]/20 rounded-xl border border-[#748CAB]/30">
                  <FiUser className="text-[#748CAB] text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#F0EBD8]">
                    Your Details
                  </h2>
                  <p className="text-[#F0EBD8]/60 text-sm">We'll use this to follow up if needed</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[#F0EBD8] font-semibold mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]/40" />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-[#0D1B2A]/50 border border-[#3E5C76] rounded-xl text-[#F0EBD8] 
                        focus:outline-none focus:border-[#748CAB] focus:ring-4 focus:ring-[#748CAB]/20 transition-all duration-300 placeholder-[#F0EBD8]/40"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#F0EBD8] font-semibold mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]/40" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-[#0D1B2A]/50 border border-[#3E5C76] rounded-xl text-[#F0EBD8] 
                        focus:outline-none focus:border-[#748CAB] focus:ring-4 focus:ring-[#748CAB]/20 transition-all duration-300 placeholder-[#F0EBD8]/40"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Quality */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#1D2D44]/50 to-[#3E5C76]/50 backdrop-blur-xl border border-[#748CAB]/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#3E5C76]/20 rounded-xl border border-[#3E5C76]/30">
                  <FiFolder className="text-[#3E5C76] text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#F0EBD8]">
                    Content Quality
                  </h2>
                  <p className="text-[#F0EBD8]/60 text-sm">How helpful was our legal content?</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-3">
                    Which topic did you review?
                  </label>
                  <select
                    name="topicReviewed"
                    required
                    className="w-full px-4 py-4 bg-[#0D1B2A]/50 border border-[#3E5C76] rounded-xl text-[#F0EBD8] 
                      focus:outline-none focus:border-[#748CAB] focus:ring-4 focus:ring-[#748CAB]/20 transition-all duration-300"
                  >
                    <option value="" disabled selected className="text-[#F0EBD8]/40">
                      Select a legal category
                    </option>
                    <option>Tenancy Rights</option>
                    <option>Workplace Issues</option>
                    <option>Harassment</option>
                    <option>Digital Safety</option>
                    <option>Consumer Issues</option>
                    <option>Criminal Laws</option>
                    <option>Family Laws</option>
                    <option>Property Laws</option>
                    <option>Other / Missing Topic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-4">
                    How clear was the content?
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      name="clarity"
                      min="1"
                      max="5"
                      value={clarity}
                      onChange={(e) => setClarity(Number(e.target.value))}
                      className="w-full h-2 bg-[#3E5C76] rounded-lg appearance-none cursor-pointer 
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#748CAB]"
                    />
                    <div className="flex justify-between text-sm text-[#F0EBD8]/60">
                      <span>Too Complex</span>
                      <span className="text-[#748CAB] font-semibold">Selected: {clarity}/5</span>
                      <span>Perfectly Clear</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-3">
                    Was the content accurate?
                  </label>
                  <div className="flex gap-4">
                    {["Yes", "No", "Unsure"].map((val) => (
                      <label key={val} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="accuracy"
                          value={val}
                          required
                          className="peer hidden"
                        />
                        <div className="w-5 h-5 border-2 border-[#3E5C76] rounded-full flex items-center justify-center 
                          peer-checked:bg-[#748CAB] peer-checked:border-[#748CAB] transition-all duration-300
                          group-hover:border-[#748CAB]">
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[#F0EBD8]/80 group-hover:text-[#748CAB] transition-colors">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Usability & Performance */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1D2D44]/50 to-[#3E5C76]/50 backdrop-blur-xl border border-[#748CAB]/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#748CAB]/20 rounded-xl border border-[#748CAB]/30">
                  <FiZap className="text-[#748CAB] text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#F0EBD8]">
                    Usability & Performance
                  </h2>
                  <p className="text-[#F0EBD8]/60 text-sm">How was your experience using LexEye?</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-3">
                    Which feature are you commenting on?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Search", "Bookmarks", "Categories", "UI/Design", "Navigation", "Emergency Helpline", "Legal Glossary", "Offline Mode", "Language Support"].map((val) => (
                      <label key={val} className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg bg-[#0D1B2A]/30 hover:bg-[#0D1B2A]/50 transition-all duration-300 border border-transparent hover:border-[#748CAB]/20">
                        <input
                          type="radio"
                          name="featureFocus"
                          value={val}
                          required
                          className="peer hidden"
                        />
                        <div className="w-4 h-4 border-2 border-[#3E5C76] rounded flex items-center justify-center 
                          peer-checked:bg-[#748CAB] peer-checked:border-[#748CAB] transition-all duration-300">
                          <FiCheck className="text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[#F0EBD8]/80 group-hover:text-[#F0EBD8] transition-colors text-sm">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-4">
                    How fast was your experience?
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      name="speed"
                      min="1"
                      max="5"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full h-2 bg-[#3E5C76] rounded-lg appearance-none cursor-pointer 
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#748CAB]"
                    />
                    <div className="flex justify-between text-sm text-[#F0EBD8]/60">
                      <span>Too Slow</span>
                      <span className="text-[#748CAB] font-semibold">Selected: {speed}/5</span>
                      <span>Lightning Fast</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-3">
                    Describe any issues or suggestions
                  </label>
                  <textarea
                    name="bugDescription"
                    placeholder="Tell us about any bugs, issues, or improvement ideas..."
                    rows="4"
                    className="w-full px-4 py-4 bg-[#0D1B2A]/50 border border-[#3E5C76] rounded-xl text-[#F0EBD8] 
                      focus:outline-none focus:border-[#748CAB] focus:ring-4 focus:ring-[#748CAB]/20 transition-all duration-300 resize-none placeholder-[#F0EBD8]/40"
                  ></textarea>
                </div>
              </div>
            </motion.div>

            {/* Additional Feedback */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#1D2D44]/50 to-[#3E5C76]/50 backdrop-blur-xl border border-[#748CAB]/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#3E5C76]/20 rounded-xl border border-[#3E5C76]/30">
                  <FiHeart className="text-[#3E5C76] text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#F0EBD8]">
                    Additional Feedback
                  </h2>
                  <p className="text-[#F0EBD8]/60 text-sm">Help us improve LexEye further</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-3">
                    Suggest a new legal topic we should cover
                  </label>
                  <input
                    type="text"
                    name="newTopic"
                    placeholder="E.g., Traffic fines, Property laws, Business regulations..."
                    className="w-full px-4 py-4 bg-[#0D1B2A]/50 border border-[#3E5C76] rounded-xl text-[#F0EBD8] 
                      focus:outline-none focus:border-[#748CAB] focus:ring-4 focus:ring-[#748CAB]/20 transition-all duration-300 placeholder-[#F0EBD8]/40"
                  />
                </div>

                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-4">
                    Overall satisfaction with LexEye
                  </label>
                  <div className="flex gap-2 justify-between">
                    {["😞", "😐", "🙂", "😀", "🤩"].map((emoji, index) => (
                      <label key={index} className="flex flex-col items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="satisfaction"
                          value={index + 1}
                          required
                          className="hidden peer"
                        />
                        <div className="text-3xl transition-all duration-300 transform peer-checked:scale-125 peer-checked:drop-shadow-[0_0_12px_rgba(116,140,171,0.6)] group-hover:scale-110">
                          {emoji}
                        </div>
                        <span className="text-xs text-[#F0EBD8]/60 peer-checked:text-[#748CAB]">{index + 1}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#F0EBD8] font-semibold mb-3">
                    Any other comments or suggestions?
                  </label>
                  <textarea
                    name="additionalComments"
                    placeholder="We'd love to hear your thoughts, ideas, or any other feedback..."
                    rows="3"
                    className="w-full px-4 py-4 bg-[#0D1B2A]/50 border border-[#3E5C76] rounded-xl text-[#F0EBD8] 
                      focus:outline-none focus:border-[#748CAB] focus:ring-4 focus:ring-[#748CAB]/20 transition-all duration-300 resize-none placeholder-[#F0EBD8]/40"
                  ></textarea>
                </div>
              </div>
            </motion.div>

            {/* Hidden Fields */}
            <input type="hidden" name="_next" value="https://lexeye.vercel.app/" />
            <input type="hidden" name="_captcha" value="false" />

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center pt-6"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative bg-gradient-to-r from-[#748CAB] to-[#3E5C76] text-[#F0EBD8] font-bold py-5 px-12 rounded-2xl 
                  transition-all duration-300 hover:from-[#8FA8C9] hover:to-[#4A6B8A] hover:shadow-2xl hover:shadow-[#748CAB]/25 
                  disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden border border-[#748CAB]/30"
              >
                <div className="flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#F0EBD8] border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="text-xl group-hover:translate-x-1 transition-transform" />
                      <span>Submit Your Feedback</span>
                    </>
                  )}
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#F0EBD8]/10 to-transparent" />
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}