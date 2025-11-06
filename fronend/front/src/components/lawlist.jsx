import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loader from "./Loader";
import { 
  IoArrowBack,
  IoDocumentText,
  IoStarOutline,
  IoSearch,
  IoBook,
  IoAlertCircle,
  IoArrowForward,
  IoFilter,
  IoChevronBack,
  IoChevronForward,
  IoTime,
  IoScale,
  IoMenu,
  IoClose
} from "react-icons/io5";
import { 
  FaBalanceScale,
  FaMapMarkerAlt,
  FaTag
} from "react-icons/fa";

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

const LawList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const navigate = useNavigate();

  const [state, setState] = useState({
    results: [],
    loading: false,
    error: "",
    totalCount: 0,
    currentPage: 1,
    totalPages: 1
  });

  const [sortBy, setSortBy] = useState("relevance");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchLaws = async (page = 1) => {
  if (!query) return;

  setState(prev => ({ ...prev, loading: true, error: "" }));
  try {
    const res = await axios.post(
      "https://lex-eye-backend.vercel.app/api/laws/search",
      { query, page, limit: 9 }
    );

    setState({
      results: res.data.data || [],         // ✅ changed from res.data.results
      loading: false,
      error: "",
      totalCount: res.data.total || 0,      // ✅ changed from res.data.totalCount
      currentPage: page,
      totalPages: Math.ceil((res.data.total || 0) / 9) || 1
    });
  } catch (err) {
    setState(prev => ({
      ...prev,
      results: [],
      loading: false,
      error: err.response?.data?.error || "Failed to fetch laws. Please try again.",
    }));
  }
};


  useEffect(() => {
    fetchLaws(1);
  }, [query]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= state.totalPages) {
      fetchLaws(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sortedResults = [...state.results].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return (a.section || "").localeCompare(b.section || "");
      case "recent":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "relevance":
      default:
        return (b.score || 0) - (a.score || 0);
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Mobile Pagination Component
  const MobilePagination = () => {
    if (state.totalPages <= 1) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 mt-8 lg:hidden"
      >
        {/* Results Info */}
        <div className="text-sm text-center" style={{ color: COLORS.navy[5] }}>
          Page {state.currentPage} of {state.totalPages}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(state.currentPage - 1)}
            disabled={state.currentPage === 1}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              state.currentPage === 1
                ? "cursor-not-allowed"
                : "hover:bg-white/20"
            }`}
            style={{
              backgroundColor: state.currentPage === 1 ? `${COLORS.navy[2]}80` : `${COLORS.navy[2]}80`,
              borderColor: state.currentPage === 1 ? `${COLORS.navy[4]}20` : `${COLORS.navy[4]}30`,
              color: state.currentPage === 1 ? `${COLORS.navy[4]}60` : COLORS.navy[5]
            }}
          >
            <IoChevronBack className="text-lg" />
            <span className="text-sm">Prev</span>
          </motion.button>

          {/* Current Page */}
          <div 
            className="px-4 py-3 font-semibold rounded-xl min-w-[60px] text-center border"
            style={{
              backgroundColor: `${COLORS.navy[4]}30`,
              borderColor: `${COLORS.navy[4]}50`,
              color: COLORS.navy[4]
            }}
          >
            {state.currentPage}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(state.currentPage + 1)}
            disabled={state.currentPage === state.totalPages}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              state.currentPage === state.totalPages
                ? "cursor-not-allowed"
                : "hover:bg-white/20"
            }`}
            style={{
              backgroundColor: state.currentPage === state.totalPages ? `${COLORS.navy[2]}80` : `${COLORS.navy[2]}80`,
              borderColor: state.currentPage === state.totalPages ? `${COLORS.navy[4]}20` : `${COLORS.navy[4]}30`,
              color: state.currentPage === state.totalPages ? `${COLORS.navy[4]}60` : COLORS.navy[5]
            }}
          >
            <span className="text-sm">Next</span>
            <IoChevronForward className="text-lg" />
          </motion.button>
        </div>

        {/* Total Results */}
        <div className="text-xs text-center" style={{ color: COLORS.navy[4] }}>
          {state.totalCount} total results
        </div>
      </motion.div>
    );
  };

  // Desktop Pagination Component
  const DesktopPagination = () => {
    if (state.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(state.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden lg:flex flex-col sm:flex-row justify-between items-center gap-6 mt-12"
      >
        {/* Results Info */}
        <div className="text-sm" style={{ color: COLORS.navy[5] }}>
          Showing {((state.currentPage - 1) * 9) + 1} - {Math.min(state.currentPage * 9, state.totalCount)} of {state.totalCount} results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(state.currentPage - 1)}
            disabled={state.currentPage === 1}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              state.currentPage === 1
                ? "cursor-not-allowed"
                : "hover:bg-white/20"
            }`}
            style={{
              backgroundColor: state.currentPage === 1 ? `${COLORS.navy[2]}80` : `${COLORS.navy[2]}80`,
              borderColor: state.currentPage === 1 ? `${COLORS.navy[4]}20` : `${COLORS.navy[4]}30`,
              color: state.currentPage === 1 ? `${COLORS.navy[4]}60` : COLORS.navy[5]
            }}
          >
            <IoChevronBack className="text-lg" />
            Previous
          </motion.button>

          {/* Page Numbers */}
          <div className="hidden sm:flex gap-1 mx-2">
            {pages.map(page => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-3 rounded-xl border transition-all duration-300 min-w-[48px] ${
                  page === state.currentPage
                    ? "font-semibold shadow-lg"
                    : "hover:bg-white/20"
                }`}
                style={{
                  backgroundColor: page === state.currentPage 
                    ? `${COLORS.navy[4]}30` 
                    : `${COLORS.navy[2]}80`,
                  borderColor: page === state.currentPage 
                    ? `${COLORS.navy[4]}50` 
                    : `${COLORS.navy[4]}30`,
                  color: page === state.currentPage 
                    ? COLORS.navy[4] 
                    : COLORS.navy[5],
                  boxShadow: page === state.currentPage 
                    ? `0 8px 32px ${COLORS.navy[4]}20` 
                    : 'none'
                }}
              >
                {page}
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(state.currentPage + 1)}
            disabled={state.currentPage === state.totalPages}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              state.currentPage === state.totalPages
                ? "cursor-not-allowed"
                : "hover:bg-white/20"
            }`}
            style={{
              backgroundColor: state.currentPage === state.totalPages ? `${COLORS.navy[2]}80` : `${COLORS.navy[2]}80`,
              borderColor: state.currentPage === state.totalPages ? `${COLORS.navy[4]}20` : `${COLORS.navy[4]}30`,
              color: state.currentPage === state.totalPages ? `${COLORS.navy[4]}60` : COLORS.navy[5]
            }}
          >
            Next
            <IoChevronForward className="text-lg" />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen md:pt-[5%] pt-[20%] relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl -top-10 -left-10 md:-top-20 md:-left-20"
          style={{ backgroundColor: '#0e877d40' }}
        />
        <div 
          className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full blur-3xl top-1/4 -right-10 md:top-1/3 md:-right-20"
          style={{ backgroundColor: '#0e877d40' }}
        />
        <div 
          className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl bottom-10 left-1/4 md:bottom-20"
          style={{ backgroundColor: '#0e877d40' }}
        />
      </div>

      {/* Mobile Header */}
      <div 
        className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{ 
          backgroundColor: `${COLORS.navy[1]}E6`,
          borderColor: `${COLORS.navy[4]}20`
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 p-2"
              style={{ color: COLORS.navy[5] }}
            >
              <IoArrowBack className="text-xl" />
            </motion.button>
            
            <div className="flex-1 text-center">
              <h1 
                className="text-lg font-bold line-clamp-1"
                style={{ color: COLORS.navy[5] }}
              >
                {query ? `"${query}"` : "Search Results"}
              </h1>
              {state.totalCount > 0 && (
                <p className="text-xs mt-1" style={{ color: COLORS.navy[4] }}>
                  {state.totalCount} results
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              style={{ color: COLORS.navy[5] }}
            >
              {isMobileMenuOpen ? <IoClose className="text-xl" /> : <IoFilter className="text-xl" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
              style={{ backgroundColor: `${COLORS.navy[1]}CC` }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 border-l z-50 lg:hidden overflow-y-auto backdrop-blur-xl"
              style={{ 
                backgroundColor: `${COLORS.navy[2]}F0`,
                borderColor: `${COLORS.navy[4]}20`
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold" style={{ color: COLORS.navy[4] }}>Filter & Sort</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2"
                    style={{ color: COLORS.navy[5] }}
                  >
                    <IoClose className="text-xl" />
                  </button>
                </div>
                
                {/* Sort Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.navy[5] }}>Sort By</h3>
                  {["relevance", "alphabetical", "recent"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 border ${
                        sortBy === option
                          ? "border text-cyan-300"
                          : "border text-white hover:bg-white/10"
                      }`}
                      style={{
                        backgroundColor: sortBy === option ? `${COLORS.navy[4]}20` : `${COLORS.navy[2]}80`,
                        borderColor: sortBy === option ? `${COLORS.navy[4]}30` : `${COLORS.navy[4]}20`
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize" style={{ color: sortBy === option ? COLORS.navy[4] : COLORS.navy[5] }}>
                          {option}
                        </span>
                        {sortBy === option && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.navy[4] }} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-8 space-y-3">
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.navy[5] }}>Quick Actions</h3>
                  <button
                    onClick={() => navigate("/search")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border transition-colors duration-200"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}20`,
                      color: COLORS.navy[5]
                    }}
                  >
                    <IoSearch style={{ color: COLORS.navy[4] }} />
                    <span>New Search</span>
                  </button>
                  <button
                    onClick={() => navigate("/category")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border transition-colors duration-200"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}20`,
                      color: COLORS.navy[5]
                    }}
                  >
                    <IoBook style={{ color: COLORS.navy[4] }} />
                    <span>Browse Categories</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* Enhanced Header Section - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 lg:mb-12 hidden lg:block"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            {/* Back Button and Title */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="group flex items-center gap-3 backdrop-blur-xl border font-semibold rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.navy[2]}80`,
                  borderColor: `${COLORS.navy[4]}30`,
                  color: COLORS.navy[5]
                }}
              >
                <IoArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
                Back
              </motion.button>

              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: COLORS.navy[5] }}>
                  Search Results
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <p className="flex items-center gap-2 backdrop-blur-xl border rounded-full px-4 py-2" style={{
                    backgroundColor: `${COLORS.navy[2]}80`,
                    borderColor: `${COLORS.navy[4]}20`,
                    color: COLORS.navy[5]
                  }}>
                    <IoSearch style={{ color: COLORS.navy[4] }} className="text-lg" />
                    <span className="font-medium">"{query}"</span>
                  </p>
                  {state.totalCount > 0 && (
                    <div className="flex items-center gap-4 text-sm" style={{ color: COLORS.navy[4] }}>
                      <span className="rounded-full px-3 py-1 border" style={{
                        backgroundColor: `${COLORS.navy[4]}20`,
                        borderColor: `${COLORS.navy[4]}30`,
                        color: COLORS.navy[4]
                      }}>
                        {state.totalCount} results
                      </span>
                      <span>Page {state.currentPage} of {state.totalPages}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sort and Filter */}
            {!state.loading && !state.error && state.results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none backdrop-blur-xl border rounded-xl pl-4 pr-10 py-3 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[5]
                    }}
                  >
                    <option value="relevance">Sort by Relevance</option>
                    <option value="alphabetical">Sort A-Z</option>
                    <option value="recent">Most Recent</option>
                  </select>
                  <IoFilter className="absolute right-3 top-1/2 transform -translate-y-1/2" style={{ color: COLORS.navy[4] }} />
                </div>
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
              className="flex justify-center items-center py-20 lg:py-32"
            >
              <div className="text-center">
                <Loader />
                <p className="mt-4 text-base lg:text-lg" style={{ color: COLORS.navy[5] }}>Searching through legal database...</p>
              </div>
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
              className="text-center py-16 lg:py-20 px-4"
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl border flex items-center justify-center mx-auto mb-6" style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`
                }}>
                  <IoAlertCircle className="text-2xl lg:text-3xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: COLORS.navy[5] }}>
                  Search Failed
                </h3>
                <p className="mb-6 lg:mb-8 leading-relaxed text-sm lg:text-base" style={{ color: COLORS.navy[5] }}>
                  {state.error}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/search")}
                    className="flex items-center justify-center gap-2 px-4 lg:px-6 py-3 border rounded-xl transition-all duration-300 text-sm lg:text-base"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[4]
                    }}
                  >
                    <IoSearch className="text-lg" />
                    New Search
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fetchLaws(1)}
                    className="flex items-center justify-center gap-2 px-4 lg:px-6 py-3 border rounded-xl transition-all duration-300 text-sm lg:text-base"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[5]
                    }}
                  >
                    <IoArrowBack className="text-lg" />
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
              className="min-h-[400px] lg:min-h-[500px]"
            >
              {sortedResults.length === 0 ? (
                // Enhanced Empty State
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-16 lg:py-24 px-4"
                >
                  <div className="max-w-lg mx-auto">
                    <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl border flex items-center justify-center mx-auto mb-6 lg:mb-8" style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}20`
                    }}>
                      <IoSearch className="text-2xl lg:text-4xl" style={{ color: COLORS.navy[4] }} />
                    </div>
                    <h3 className="text-xl lg:text-3xl font-bold mb-4" style={{ color: COLORS.navy[5] }}>
                      No Results Found
                    </h3>
                    <p className="mb-6 lg:mb-8 text-sm lg:text-lg leading-relaxed" style={{ color: COLORS.navy[5] }}>
                      No laws found matching <span className="font-semibold" style={{ color: COLORS.navy[4] }}>"{query}"</span>. 
                      Try different keywords or browse our legal categories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/search")}
                        className="flex items-center justify-center gap-2 px-6 lg:px-8 py-3 border rounded-xl transition-all duration-300 font-semibold text-sm lg:text-base"
                        style={{
                          backgroundColor: `${COLORS.navy[4]}20`,
                          borderColor: `${COLORS.navy[4]}30`,
                          color: COLORS.navy[4]
                        }}
                      >
                        <IoSearch className="text-lg" />
                        New Search
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/category")}
                        className="flex items-center justify-center gap-2 px-6 lg:px-8 py-3 border rounded-xl transition-all duration-300 font-semibold text-sm lg:text-base"
                        style={{
                          backgroundColor: `${COLORS.navy[2]}80`,
                          borderColor: `${COLORS.navy[4]}30`,
                          color: COLORS.navy[5]
                        }}
                      >
                        <IoBook className="text-lg" />
                        Browse Categories
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Enhanced Results Grid
                <>
                  <motion.div
                    variants={containerVariants}
                    className="grid gap-4 lg:gap-6 md:grid-cols-2 xl:grid-cols-3"
                  >
                    <AnimatePresence>
                      {sortedResults.map((law, index) => (
                        <motion.div
                          key={law._id}
                          variants={itemVariants}
                          layout
                          whileHover={{ 
                            y: -4,
                            scale: 1.01,
                            transition: { duration: 0.3 }
                          }}
                          className="group relative backdrop-blur-2xl border rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl lg:shadow-2xl transition-all duration-500 overflow-hidden"
                          style={{
                            backgroundColor: `${COLORS.navy[2]}40`,
                            borderColor: `${COLORS.navy[4]}20`
                          }}
                        >
                          {/* Enhanced Background Effect */}
                          <div 
                            className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 group-hover:opacity-30 transition-all duration-700"
                            style={{ backgroundColor: `${COLORS.navy[4]}10` }}
                          />
                          
                          {/* Content */}
                          <div className="relative z-10 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                              <div 
                                className="p-2 lg:p-3 rounded-xl lg:rounded-2xl border flex-shrink-0 group-hover:border-cyan-400/50 transition-all duration-300"
                                style={{
                                  backgroundColor: `${COLORS.navy[4]}20`,
                                  borderColor: `${COLORS.navy[4]}30`
                                }}
                              >
                                <IoScale className="text-lg lg:text-xl" style={{ color: COLORS.navy[4] }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h2 className="text-lg lg:text-xl font-bold group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2 mb-1 lg:mb-2" style={{ color: COLORS.navy[4] }}>
                                  {law.section || law.legalConcept || "Unnamed Law"}
                                </h2>
                                {law.lawTitle && law.lawTitle !== law.section && (
                                  <p className="text-xs lg:text-sm line-clamp-1" style={{ color: COLORS.navy[5] }}>
                                    {law.lawTitle}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 line-clamp-3 flex-1" style={{ color: COLORS.navy[5] }}>
                              {law.description || law.sectionOverview || "No description available."}
                            </p>

                            {/* Metadata */}
                            <div className="flex flex-wrap gap-1 lg:gap-2 mb-3 lg:mb-4">
                              {law.category && (
                                <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 lg:px-3 py-1 border" style={{
                                  color: COLORS.navy[4],
                                  backgroundColor: `${COLORS.navy[4]}10`,
                                  borderColor: `${COLORS.navy[4]}20`
                                }}>
                                  <FaTag className="text-xs" />
                                  {law.category}
                                </span>
                              )}
                              {law.jurisdiction && (
                                <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 lg:px-3 py-1 border" style={{
                                  color: COLORS.navy[4],
                                  backgroundColor: `${COLORS.navy[4]}10`,
                                  borderColor: `${COLORS.navy[4]}20`
                                }}>
                                  <FaMapMarkerAlt className="text-xs" />
                                  {law.jurisdiction}
                                </span>
                              )}
                              {law.createdAt && (
                                <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 lg:px-3 py-1 border" style={{
                                  color: COLORS.navy[5],
                                  backgroundColor: `${COLORS.navy[2]}80`,
                                  borderColor: `${COLORS.navy[4]}20`
                                }}>
                                  <IoTime className="text-xs" />
                                  {formatDate(law.createdAt)}
                                </span>
                              )}
                            </div>

                            {law?.sabCategory && (
                              <div className="flex items-center gap-2 rounded-full px-2 lg:px-3 py-1 lg:py-2 mb-3 lg:mb-4 border" style={{
                                backgroundColor: `${COLORS.navy[4]}10`,
                                borderColor: `${COLORS.navy[4]}20`
                              }}>
                                <FaTag className="text-xs" style={{ color: COLORS.navy[4] }} />
                                <span className="text-xs font-medium" style={{ color: COLORS.navy[4] }}>{law.sabCategory}</span>
                              </div>
                            )}

                            {/* Action */}
                            <div className="flex justify-between items-center pt-3 lg:pt-4 border-t mt-auto" style={{ borderColor: `${COLORS.navy[4]}20` }}>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                  to={`/law/${law._id}`}
                                  className="group flex items-center gap-2 px-3 lg:px-5 py-2 border rounded-xl hover:bg-cyan-500/30 transition-all duration-300 font-medium text-sm lg:text-base"
                                  style={{
                                    backgroundColor: `${COLORS.navy[4]}20`,
                                    borderColor: `${COLORS.navy[4]}30`,
                                    color: COLORS.navy[4]
                                  }}
                                >
                                  View Details
                                  <IoArrowForward className="text-sm lg:text-lg group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </motion.div>
                              
                              {law.score && (
                                <div className="text-xs flex items-center gap-1" style={{ color: COLORS.navy[5] }}>
                                  <IoStarOutline style={{ color: COLORS.navy[4] }} />
                                  {(law.score * 100).toFixed(0)}% match
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Enhanced Hover Effect */}
                          <div 
                            className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500"
                            style={{ backgroundColor: COLORS.navy[4] }}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Pagination */}
                  <MobilePagination />
                  <DesktopPagination />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LawList;