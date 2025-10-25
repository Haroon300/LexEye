import React, { useState } from "react";
import { GiScales } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiSend, FiUser, FiMail, FiFolder, FiZap, FiHeart } from "react-icons/fi";

/* Color Constants matching landing page palette */
const COLORS = {
  navy: {
    1: '#000000',
    2: '#66666e',
    3: '#9999a1',
    4: '#e6e6e9',
    5: '#f4f4f6'
  }
};

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
    <div className="min-h-screen md:pt-[10%] pt-[20%] flex items-center justify-center px-4 py-8 relative overflow-hidden" style={{ backgroundColor: COLORS.navy[1] }}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[3]}20` }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower"
          style={{ backgroundColor: `${COLORS.navy[4]}15` }}
        />
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[2]}25` }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.1)_1px,transparent_1px)] bg-[size:80px_80px]"
            style={{ backgroundColor: COLORS.navy[1] }}
          />
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
              className="absolute inset-0 flex items-center justify-center z-50 px-4"
            >
              <div 
                className="backdrop-blur-2xl border rounded-3xl p-6 md:p-12 text-center shadow-2xl w-full max-w-sm mx-auto"
                style={{ 
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`,
                  boxShadow: `0 25px 50px ${COLORS.navy[4]}25`
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border"
                  style={{ 
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FiCheck className="text-2xl md:text-4xl" style={{ color: COLORS.navy[4] }} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: COLORS.navy[5] }}>
                  Thank You!
                </h3>
                <p className="text-base md:text-lg mb-4 md:mb-6 px-2" style={{ color: COLORS.navy[5] }}>
                  Your feedback helps us improve LexEye for everyone.
                </p>
                <div 
                  className="w-6 h-6 md:w-8 md:h-8 border-4 rounded-full animate-spin mx-auto"
                  style={{ 
                    borderColor: COLORS.navy[4],
                    borderTopColor: 'transparent'
                  }}
                ></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-2xl border rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl mx-2"
          style={{ 
            backgroundColor: `${COLORS.navy[2]}40`,
            borderColor: `${COLORS.navy[4]}30`,
            boxShadow: `0 25px 50px ${COLORS.navy[1]}50`
          }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div 
                className="p-3 md:p-4 rounded-2xl border"
                style={{ 
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`
                }}
              >
                <GiScales className="text-4xl md:text-5xl" style={{ color: COLORS.navy[4] }} />
              </div>
              <div className="px-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4" style={{ color: COLORS.navy[5] }}>
                  Help Us Balance the Scales
                </h1>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: COLORS.navy[5] }}>
                  Your insights shape LexEye's future. Share your experience to help us create a better legal resource for everyone.
                </p>
              </div>
            </div>
          </motion.div>

          <form
            action="https://formsubmit.co/contact.lexeye78@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-8"
          >
            {/* Contact Information */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="backdrop-blur-xl border rounded-2xl p-4 sm:p-6 md:p-8"
              style={{ 
                backgroundColor: `${COLORS.navy[2]}40`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div 
                  className="p-2 md:p-3 rounded-xl border flex-shrink-0"
                  style={{ 
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FiUser className="text-lg md:text-xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                    Your Details
                  </h2>
                  <p className="text-xs md:text-sm" style={{ color: `${COLORS.navy[5]}60` }}>We'll use this to follow up if needed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2" style={{ color: `${COLORS.navy[5]}40` }} />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-xl transition-all duration-300 placeholder-opacity-40 text-sm md:text-base"
                      style={{ 
                        backgroundColor: `${COLORS.navy[1]}50`,
                        borderColor: COLORS.navy[3],
                        color: COLORS.navy[5],
                        placeholder: `${COLORS.navy[5]}40`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2" style={{ color: `${COLORS.navy[5]}40` }} />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      required
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-xl transition-all duration-300 placeholder-opacity-40 text-sm md:text-base"
                      style={{ 
                        backgroundColor: `${COLORS.navy[1]}50`,
                        borderColor: COLORS.navy[3],
                        color: COLORS.navy[5],
                        placeholder: `${COLORS.navy[5]}40`
                      }}
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
              className="backdrop-blur-xl border rounded-2xl p-4 sm:p-6 md:p-8"
              style={{ 
                backgroundColor: `${COLORS.navy[2]}40`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div 
                  className="p-2 md:p-3 rounded-xl border flex-shrink-0"
                  style={{ 
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FiFolder className="text-lg md:text-xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                    Content Quality
                  </h2>
                  <p className="text-xs md:text-sm" style={{ color: `${COLORS.navy[5]}60` }}>How helpful was our legal content?</p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Which topic did you review?
                  </label>
                  <select
                    name="topicReviewed"
                    required
                    className="w-full px-3 md:px-4 py-3 md:py-4 rounded-xl transition-all duration-300 text-sm md:text-base"
                    style={{ 
                      backgroundColor: `${COLORS.navy[1]}50`,
                      borderColor: COLORS.navy[3],
                      color: COLORS.navy[5]
                    }}
                  >
                    <option value="" disabled selected style={{ color: `${COLORS.navy[5]}40` }}>
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
                  <label className="block font-semibold mb-3 md:mb-4 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    How clear was the content?
                  </label>
                  <div className="space-y-3 md:space-y-4">
                    <input
                      type="range"
                      name="clarity"
                      min="1"
                      max="5"
                      value={clarity}
                      onChange={(e) => setClarity(Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer 
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 md:[&::-webkit-slider-thumb]:h-5 md:[&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:rounded-full"
                      style={{ 
                        backgroundColor: COLORS.navy[3],
                      }}
                    />
                    <div className="flex justify-between text-xs md:text-sm">
                      <span style={{ color: `${COLORS.navy[5]}60` }}>Too Complex</span>
                      <span className="font-semibold" style={{ color: COLORS.navy[4] }}>Selected: {clarity}/5</span>
                      <span style={{ color: `${COLORS.navy[5]}60` }}>Perfectly Clear</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Was the content accurate?
                  </label>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {["Yes", "No", "Unsure"].map((val) => (
                      <label key={val} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="accuracy"
                          value={val}
                          required
                          className="peer hidden"
                        />
                        <div 
                          className="w-4 h-4 md:w-5 md:h-5 border-2 rounded-full flex items-center justify-center transition-all duration-300
                          group-hover:border-[#748CAB] peer-checked:border-[#748CAB]"
                          style={{ 
                            borderColor: COLORS.navy[3],
                            backgroundColor: 'transparent'
                          }}
                        >
                          <div 
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"
                            style={{ backgroundColor: COLORS.navy[4] }}
                          />
                        </div>
                        <span className="text-sm md:text-base" style={{ color: `${COLORS.navy[5]}80` }}>{val}</span>
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
              className="backdrop-blur-xl border rounded-2xl p-4 sm:p-6 md:p-8"
              style={{ 
                backgroundColor: `${COLORS.navy[2]}40`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div 
                  className="p-2 md:p-3 rounded-xl border flex-shrink-0"
                  style={{ 
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FiZap className="text-lg md:text-xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                    Usability & Performance
                  </h2>
                  <p className="text-xs md:text-sm" style={{ color: `${COLORS.navy[5]}60` }}>How was your experience using LexEye?</p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Which feature are you commenting on?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    {["Search", "Bookmarks", "Categories", "UI/Design", "Navigation", "Emergency Helpline", "Legal Glossary", "Offline Mode", "Language Support"].map((val) => (
                      <label 
                        key={val} 
                        className="flex items-center gap-2 md:gap-3 cursor-pointer group p-2 md:p-3 rounded-lg transition-all duration-300 border text-xs md:text-sm"
                        style={{ 
                          backgroundColor: `${COLORS.navy[1]}30`,
                          borderColor: 'transparent'
                        }}
                      >
                        <input
                          type="radio"
                          name="featureFocus"
                          value={val}
                          required
                          className="peer hidden"
                        />
                        <div 
                          className="w-3 h-3 md:w-4 md:h-4 border-2 rounded flex items-center justify-center transition-all duration-300 peer-checked:border-[#748CAB] flex-shrink-0"
                          style={{ borderColor: COLORS.navy[3] }}
                        >
                          <FiCheck 
                            className="text-xs opacity-0 peer-checked:opacity-100 transition-opacity" 
                            style={{ color: COLORS.navy[5] }}
                          />
                        </div>
                        <span style={{ color: `${COLORS.navy[5]}80` }}>{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-3 md:mb-4 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    How fast was your experience?
                  </label>
                  <div className="space-y-3 md:space-y-4">
                    <input
                      type="range"
                      name="speed"
                      min="1"
                      max="5"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer 
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 md:[&::-webkit-slider-thumb]:h-5 md:[&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:rounded-full"
                      style={{ 
                        backgroundColor: COLORS.navy[3],
                      }}
                    />
                    <div className="flex justify-between text-xs md:text-sm">
                      <span style={{ color: `${COLORS.navy[5]}60` }}>Too Slow</span>
                      <span className="font-semibold" style={{ color: COLORS.navy[4] }}>Selected: {speed}/5</span>
                      <span style={{ color: `${COLORS.navy[5]}60` }}>Lightning Fast</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Describe any issues or suggestions
                  </label>
                  <textarea
                    name="bugDescription"
                    placeholder="Tell us about any bugs, issues, or improvement ideas..."
                    rows="3"
                    className="w-full px-3 md:px-4 py-3 md:py-4 rounded-xl transition-all duration-300 resize-none placeholder-opacity-40 text-sm md:text-base"
                    style={{ 
                      backgroundColor: `${COLORS.navy[1]}50`,
                      borderColor: COLORS.navy[3],
                      color: COLORS.navy[5],
                      placeholder: `${COLORS.navy[5]}40`
                    }}
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
              className="backdrop-blur-xl border rounded-2xl p-4 sm:p-6 md:p-8"
              style={{ 
                backgroundColor: `${COLORS.navy[2]}40`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div 
                  className="p-2 md:p-3 rounded-xl border flex-shrink-0"
                  style={{ 
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FiHeart className="text-lg md:text-xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                    Additional Feedback
                  </h2>
                  <p className="text-xs md:text-sm" style={{ color: `${COLORS.navy[5]}60` }}>Help us improve LexEye further</p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Suggest a new legal topic we should cover
                  </label>
                  <input
                    type="text"
                    name="newTopic"
                    placeholder="E.g., Traffic fines, Property laws, Business regulations..."
                    className="w-full px-3 md:px-4 py-3 md:py-4 rounded-xl transition-all duration-300 placeholder-opacity-40 text-sm md:text-base"
                    style={{ 
                      backgroundColor: `${COLORS.navy[1]}50`,
                      borderColor: COLORS.navy[3],
                      color: COLORS.navy[5],
                      placeholder: `${COLORS.navy[5]}40`
                    }}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-3 md:mb-4 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Overall satisfaction with LexEye
                  </label>
                  <div className="flex gap-1 md:gap-2 justify-between">
                    {["😞", "😐", "🙂", "😀", "🤩"].map((emoji, index) => (
                      <label key={index} className="flex flex-col items-center gap-1 md:gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="satisfaction"
                          value={index + 1}
                          required
                          className="hidden peer"
                        />
                        <div 
                          className="text-2xl md:text-3xl transition-all duration-300 transform peer-checked:scale-110 md:peer-checked:scale-125 group-hover:scale-105 md:group-hover:scale-110"
                          style={{ 
                            filter: 'peer-checked:drop-shadow(0 0 8px rgba(230, 230, 233, 0.6))'
                          }}
                        >
                          {emoji}
                        </div>
                        <span className="text-xs" style={{ color: `${COLORS.navy[5]}60` }}>{index + 1}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{ color: COLORS.navy[5] }}>
                    Any other comments or suggestions?
                  </label>
                  <textarea
                    name="additionalComments"
                    placeholder="We'd love to hear your thoughts, ideas, or any other feedback..."
                    rows="2"
                    className="w-full px-3 md:px-4 py-3 md:py-4 rounded-xl transition-all duration-300 resize-none placeholder-opacity-40 text-sm md:text-base"
                    style={{ 
                      backgroundColor: `${COLORS.navy[1]}50`,
                      borderColor: COLORS.navy[3],
                      color: COLORS.navy[5],
                      placeholder: `${COLORS.navy[5]}40`
                    }}
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
              className="flex justify-center pt-4 md:pt-6"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative font-bold py-4 md:py-5 px-8 md:px-12 rounded-2xl transition-all duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden border w-full max-w-sm"
                style={{ 
                  backgroundColor: COLORS.navy[4],
                  color: COLORS.navy[1],
                  borderColor: `${COLORS.navy[4]}50`,
                  boxShadow: `0 20px 40px ${COLORS.navy[4]}25`
                }}
              >
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  {isSubmitting ? (
                    <>
                      <div 
                        className="w-4 h-4 md:w-5 md:h-5 border-2 rounded-full animate-spin"
                        style={{ 
                          borderColor: COLORS.navy[1],
                          borderTopColor: 'transparent'
                        }}
                      />
                      <span className="text-sm md:text-base">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="text-lg md:text-xl group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm md:text-base">Submit Your Feedback</span>
                    </>
                  )}
                </div>
                
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{ 
                    background: 'linear-gradient(to right, transparent, rgba(244, 244, 246, 0.1), transparent)'
                  }}
                />
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}