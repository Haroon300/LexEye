import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoBookmarkSharp, IoBookmarkOutline } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import { FaBalanceScale, FaGavel, FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loader from "./Loader";
import {
  addBookmark,
  removeBookmark,
  loadLocalBookmarks,
  processPendingSyncs,
} from "../utils/bookmarkUtils";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();
  const [law, setLaw] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch law (from API or local storage if offline)
  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const { data } = await axios.get(
          `https://lex-eye-backend.vercel.app/api/laws/${lawId}`
        );
        setLaw(data);
      } catch {
        const local = loadLocalBookmarks();
        const found = local.find((l) => l._id === lawId);
        setLaw(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchLaw();
  }, [lawId]);

  // Check if bookmarked + sync when online
  useEffect(() => {
    const local = loadLocalBookmarks();
    setIsBookmarked(local.some((b) => b._id === lawId));

    const syncHandler = () => processPendingSyncs(token);
    window.addEventListener("online", syncHandler);
    return () => window.removeEventListener("online", syncHandler);
  }, [lawId, token]);

  // Toggle bookmark
  const toggleBookmark = async () => {
    if (!law) return;
    if (!token) return navigate("/signin");

    if (isBookmarked) {
      await removeBookmark(law._id, token);
      setIsBookmarked(false);
    } else {
      await addBookmark(law, token);
      setIsBookmarked(true);
    }
  };

  if (loading) return <Loader />;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen mt-[5%] bg-gradient-to-br from-[#051c1f] via-[#08292e] to-[#0a1b1f] text-white relative overflow-hidden">
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20"
          >
            <TiArrowBack className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Previous
          </button>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-4">
                <FaBalanceScale className="text-cyan-400 text-sm" />
                <span className="text-cyan-300 text-sm font-medium">Legal Section</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-200 via-gray-200 to-silver text-transparent bg-clip-text leading-tight mb-4">
                {law?.section || "Unknown Section"}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                {law?.legalConcept || "No legal concept available"}
              </p>
            </div>

            {/* Bookmark Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleBookmark}
              className={`group relative flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold backdrop-blur-xl border-2 transition-all duration-300 ${
                isBookmarked
                  ? "bg-yellow-500/20 border-yellow-400 text-yellow-100 shadow-2xl shadow-yellow-500/20"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-yellow-400/30 hover:text-white"
              }`}
            >
              <AnimatePresence mode="wait">
                {isBookmarked ? (
                  <motion.div
                    key="bookmarked"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IoBookmarkSharp className="text-2xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unbookmarked"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IoBookmarkOutline className="text-2xl" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="hidden sm:block">
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Law Details */}
        <AnimatePresence mode="wait">
          {law && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 lg:grid-cols-3"
            >
              {/* Main Content Card */}
              <motion.section
                variants={sectionVariants}
                className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
              >
                {/* Description */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <FaGavel className="text-cyan-400 text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-gray-200 text-transparent bg-clip-text">
                      Legal Description
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {law?.description || "No description available."}
                  </p>
                </div>

                {/* Legal Consequence */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <FaBalanceScale className="text-red-400 text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-red-200 to-orange-200 text-transparent bg-clip-text">
                      Legal Consequence
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {law?.legalConsequence || "No legal consequence available."}
                  </p>
                </div>

                {/* Prevention Solutions */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FaShieldAlt className="text-green-400 text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-200 to-emerald-200 text-transparent bg-clip-text">
                      Prevention Solutions
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {law?.preventionSolutions || "No prevention solutions available."}
                  </p>
                </div>
              </motion.section>

              {/* Sidebar Information */}
              <motion.div
                variants={sectionVariants}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Law ID Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">Law Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ID:</span>
                      <span className="text-cyan-400 font-mono">{law?._id?.slice(-8) || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Updated:</span>
                      <span className="text-gray-400">Recent</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 text-sm font-medium">
                      Share This Law
                    </button>
                    <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 text-sm font-medium">
                      Print Section
                    </button>
                    <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl py-3 px-4 transition-all duration-300 hover:scale-105 text-sm font-medium">
                      Related Laws
                    </button>
                  </div>
                </div>

                {/* Legal Tips */}
                <div className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-400/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-300 mb-3">💡 Legal Tip</h3>
                  <p className="text-yellow-200/80 text-sm leading-relaxed">
                    Always consult with a qualified legal professional for specific advice related to your situation.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm">
            — End of Legal Section • Always verify with official sources —
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LawDetail;