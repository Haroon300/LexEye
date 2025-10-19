import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loader from "./Loader";
import { 
  TiArrowBack,
  TiDocument,
  TiStarOutline 
} from "react-icons/ti";
import { 
  FiSearch, 
  FiBook, 
  FiAlertCircle,
  FiArrowRight,
  FiFilter
} from "react-icons/fi";

const LawList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const navigate = useNavigate();

  const [state, setState] = useState({
    results: [],
    loading: false,
    error: "",
  });

  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    if (!query) return;

    const fetchLaws = async () => {
      setState({ results: [], loading: true, error: "" });
      try {
        const res = await axios.post(
          "https://lex-eye-backend.vercel.app/api/laws/search",
          { query }
        );
        setState({
          results: res.data.results || [],
          loading: false,
          error: "",
        });
      } catch (err) {
        setState({
          results: [],
          loading: false,
          error: err.response?.data?.error || "Failed to fetch laws. Please try again.",
        });
      }
    };

    fetchLaws();
  }, [query]);

  const sortedResults = [...state.results].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return (a.section || "").localeCompare(b.section || "");
      case "relevance":
      default:
        return 0; // API already returns by relevance
    }
  });

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
    <div className="min-h-screen pt-[5%] bg-gradient-to-br from-[#051c1f] via-[#08292e] to-[#0a1b1f] text-white relative overflow-hidden">
      {/* Background Effects */}
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
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            {/* Back Button and Title */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300"
              >
                <TiArrowBack className="text-xl" />
                Back
              </motion.button>

              <div>
                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-200 to-gray-200 text-transparent bg-clip-text">
                  Search Results
                </h1>
                <p className="text-gray-400 mt-2 flex items-center gap-2">
                  <FiSearch className="text-cyan-400" />
                  Showing results for: <span className="text-cyan-300 font-semibold">"{query}"</span>
                </p>
              </div>
            </div>

            {/* Results Count and Sort */}
            {!state.loading && !state.error && state.results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2 text-cyan-300 text-sm">
                  {state.results.length} {state.results.length === 1 ? 'result' : 'results'}
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="alphabetical">Sort A-Z</option>
                </select>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Loader */}
        <AnimatePresence>
          {state.loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {state.error && !state.loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-red-500/20 rounded-2xl border border-red-400/30 flex items-center justify-center mx-auto mb-6">
                  <FiAlertCircle className="text-4xl text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-3">
                  Search Failed
                </h3>
                <p className="text-gray-400 mb-6">
                  {state.error}
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/search")}
                    className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
                  >
                    New Search
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-gray-300 rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    Try Again
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {!state.loading && !state.error && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="min-h-[400px]"
            >
              {sortedResults.length === 0 ? (
                // Empty State
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-20"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-6">
                      <FiSearch className="text-4xl text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-300 mb-3">
                      No Results Found
                    </h3>
                    <p className="text-gray-400 mb-6">
                      No laws found matching <span className="text-cyan-400">"{query}"</span>. 
                      Try different keywords or browse categories.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/search")}
                        className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
                      >
                        New Search
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/categories")}
                        className="px-6 py-3 bg-white/10 border border-white/20 text-gray-300 rounded-xl hover:bg-white/20 transition-all duration-300"
                      >
                        Browse Categories
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Results Grid
                <motion.div
                  variants={containerVariants}
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  <AnimatePresence>
                    {sortedResults.map((law, index) => (
                      <motion.div
                        key={law._id}
                        variants={itemVariants}
                        layout
                        whileHover={{ 
                          y: -8,
                          transition: { duration: 0.3 }
                        }}
                        className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden"
                      >
                        {/* Background Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon and Title */}
                          <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-cyan-500/20 rounded-xl border border-cyan-400/30 flex-shrink-0">
                              <TiDocument className="text-cyan-400 text-xl" />
                            </div>
                            <h2 className="text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2">
                              {law.section || law.legalConcept || "Unnamed Law"}
                            </h2>
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                            {law.description || "No description available."}
                          </p>

                          {/* Legal Concept (if different from section) */}
                          {law.legalConcept && law.legalConcept !== law.section && (
                            <div className="mb-4">
                              <span className="text-xs text-cyan-400 font-medium bg-cyan-500/10 border border-cyan-400/20 rounded-full px-3 py-1">
                                {law.legalConcept}
                              </span>
                            </div>
                          )}

                          {/* Action */}
                          <div className="flex justify-between items-center pt-4 border-t border-white/10">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Link
                                to={`/law/${law._id}`}
                                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300 group"
                              >
                                View Details
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </motion.div>
                            
                            <div className="text-gray-400 text-xs">
                              Legal Section
                            </div>
                          </div>
                        </div>

                        {/* Hover Line */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LawList;