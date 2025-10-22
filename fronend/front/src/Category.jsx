import { useState, useEffect } from "react";
import { IoSearch, IoClose, IoBook, IoArrowBack, IoDocument, IoScale, IoLibrary, IoChevronBack, IoChevronForward, IoMenu, IoGrid } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./components/Loader";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    pageSize: 6 // Reduced for mobile
  });

  // ✅ Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://lex-eye-backend.vercel.app/api/laws/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Fetch laws when category clicked with pagination
  const handleCategoryClick = async (category, page = 1) => {
    setLoading(true);
    setError("");
    setLaws([]);
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, currentPage: page }));
    setIsMobileMenuOpen(false); // Close mobile menu on category select
    
    try {
      const res = await axios.post("https://lex-eye-backend.vercel.app/api/laws/category", {
        category,
        page,
        pageSize: pagination.pageSize
      });
      
      // Handle different response formats
      const lawsData = res.data.laws || res.data.results || [];
      setLaws(lawsData);
      
      // Update pagination info from response
      setPagination(prev => ({
        ...prev,
        currentPage: res.data.currentPage || page,
        totalPages: res.data.totalPages || Math.ceil((res.data.totalCount || lawsData.length) / pagination.pageSize),
        totalCount: res.data.totalCount || res.data.count || lawsData.length
      }));
      
    } catch (err) {
      console.error("Error fetching laws:", err);
      setError("No laws found in this category or failed to load laws.");
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      handleCategoryClick(selectedCategory, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.category?.toLowerCase().includes(search.toLowerCase())
  );

  const clearSearch = () => setSearch("");
  const clearSelection = () => {
    setSelectedCategory("");
    setLaws([]);
    setError("");
    setPagination({
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      pageSize: 6
    });
  };

  // Category icons for better visual appeal
  const categoryIcons = [
    IoScale, IoDocument, IoBook, IoLibrary
  ];

  const getCategoryIcon = (index) => {
    return categoryIcons[index % categoryIcons.length];
  };

  // Mobile Pagination Component
  const MobilePagination = () => {
    if (pagination.totalPages <= 1) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 mt-8"
      >
        {/* Results Info */}
        <div className="text-gray-400 text-sm text-center">
          Page {pagination.currentPage} of {pagination.totalPages}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              pagination.currentPage === 1
                ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
          >
            <IoChevronBack className="text-lg" />
            <span className="text-sm">Prev</span>
          </motion.button>

          {/* Current Page */}
          <div className="px-4 py-3 bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-semibold rounded-xl min-w-[60px] text-center">
            {pagination.currentPage}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              pagination.currentPage === pagination.totalPages
                ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
          >
            <span className="text-sm">Next</span>
            <IoChevronForward className="text-lg" />
          </motion.button>
        </div>

        {/* Total Results */}
        <div className="text-gray-400 text-xs text-center">
          {pagination.totalCount} total laws
        </div>
      </motion.div>
    );
  };

  // Desktop Pagination Component
  const DesktopPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
    
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
        <div className="text-gray-400 text-sm">
          Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} - {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} of {pagination.totalCount} laws
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              pagination.currentPage === 1
                ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
            }`}
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
                  page === pagination.currentPage
                    ? "bg-cyan-500/30 border-cyan-400/50 text-cyan-300 font-semibold shadow-lg shadow-cyan-500/20"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
              >
                {page}
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
              pagination.currentPage === pagination.totalPages
                ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
            }`}
          >
            Next
            <IoChevronForward className="text-lg" />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen md:pt-[5%] pt-[25%] text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl -top-10 -left-10 sm:-top-20 sm:-left-20 animate-pulse-slow" />
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-blue-400/10 rounded-full blur-3xl top-1/3 -right-10 sm:top-1/2 sm:-right-20 animate-pulse-slower" />
        <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-teal-400/10 rounded-full blur-3xl bottom-10 left-1/4 sm:bottom-20 animate-pulse-slow" />
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-cyan-400/5 rounded-full blur-3xl top-1/4 left-1/2 sm:top-1/3 animate-pulse-slow" />
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#08292e] border-l border-white/10 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-cyan-300">Quick Actions</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <IoClose className="text-xl" />
                  </button>
                </div>
                
                {/* Mobile Search */}
                <div className="relative mb-6">
                  <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-cyan-200/60 outline-none"
                  />
                </div>

                {/* Mobile Categories List */}
                <div className="space-y-2">
                  {filteredCategories.slice(0, 10).map((cat, index) => (
                    <button
                      key={cat.category}
                      onClick={() => handleCategoryClick(cat.category)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{cat.category}</span>
                        <span className="text-cyan-400 text-xs bg-cyan-500/20 px-2 py-1 rounded-full">
                          {cat.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* Enhanced Header - Hidden on mobile when viewing laws */}
        {!selectedCategory && (
          <motion.div 
            className="text-center mb-8 lg:mb-16 hidden lg:block"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 lg:w-20 lg:h-20 bg-cyan-500/20 border border-cyan-400/30 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:mb-6"
            >
              <IoLibrary className="text-3xl lg:text-4xl text-cyan-400" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-cyan-200 via-cyan-100 to-gray-200 text-transparent bg-clip-text mb-4 lg:mb-6 leading-tight px-4">
              Legal Categories
            </h1>
            <p className="text-gray-300 text-base lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
              Explore comprehensive legal categories and discover relevant laws, regulations, and legal frameworks
            </p>
          </motion.div>
        )}

        {/* Enhanced Search Bar - Hidden on mobile when viewing laws */}
        {!selectedCategory && (
          <motion.div 
            className="max-w-2xl mx-auto mb-8 lg:mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
              <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xl lg:text-2xl" />
              <input
                type="text"
                placeholder="Search legal categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-white/10 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl px-12 lg:px-16 py-4 lg:py-5 text-white placeholder-cyan-200/60 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 text-base lg:text-lg"
              />
              {search && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoClose className="text-lg lg:text-xl" />
                </motion.button>
              )}
            </div>
            <p className="text-gray-400 text-sm mt-3 text-center">
              {categories.length} legal categories available
            </p>
          </motion.div>
        )}

        {/* Enhanced Categories Grid - Only show when no category selected */}
        <AnimatePresence mode="wait">
          {!selectedCategory && (
            <motion.div 
              className="mb-8 lg:mb-16 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-300 mb-2">Browse Categories</h2>
                <p className="text-gray-400 text-sm lg:text-base">Click on any category to explore related laws</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredCategories.map((cat, index) => {
                    const IconComponent = getCategoryIcon(index);
                    return (
                      <motion.button
                        key={cat.category}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => handleCategoryClick(cat.category)}
                        className="group relative p-4 lg:p-6 rounded-2xl lg:rounded-3xl backdrop-blur-xl border-2 border-white/10 bg-white/5 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-cyan-400/30 text-left"
                      >
                        {/* Background Effect */}
                        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="p-2 lg:p-3 rounded-xl lg:rounded-2xl border border-white/10 bg-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/30 transition-all duration-300 mb-3 lg:mb-4">
                            <IconComponent className="text-lg lg:text-xl text-gray-400 group-hover:text-cyan-300 transition-colors duration-300" />
                          </div>

                          {/* Category Name */}
                          <h3 className="font-bold text-base lg:text-lg text-gray-300 group-hover:text-white transition-colors duration-300 mb-2 line-clamp-2">
                            {cat.category}
                          </h3>

                          {/* Law Count */}
                          <div className="flex items-center justify-between text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            <span className="text-xs lg:text-sm">{cat.count} laws</span>
                            <motion.div
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="w-2 h-2 bg-current rounded-full"
                            />
                          </div>
                        </div>

                        {/* Hover Line */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full" />
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* No Results State */}
              {filteredCategories.length === 0 && search && (
                <motion.div 
                  className="text-center py-12 lg:py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white/5 rounded-2xl lg:rounded-3xl border border-white/10 flex items-center justify-center mx-auto mb-4 lg:mb-6">
                    <IoSearch className="text-2xl lg:text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-300 mb-3">
                    No Categories Found
                  </h3>
                  <p className="text-gray-400 text-base lg:text-lg mb-6 max-w-md mx-auto px-4">
                    No categories found for "<span className="text-cyan-400 font-semibold">{search}</span>"
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearSearch}
                    className="px-6 lg:px-8 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300 font-semibold"
                  >
                    Clear Search
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="flex flex-col items-center justify-center py-16 lg:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader />
            <p className="text-gray-400 mt-4 text-base lg:text-lg text-center px-4">
              {selectedCategory ? `Loading laws for ${selectedCategory}...` : "Loading categories..."}
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            className="max-w-2xl mx-auto text-center py-12 lg:py-16 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl lg:rounded-3xl p-6 lg:p-8">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-500/20 rounded-xl lg:rounded-2xl border border-red-400/30 flex items-center justify-center mx-auto mb-4">
                <IoClose className="text-xl lg:text-2xl text-red-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-red-300 mb-3">No Laws Found</h3>
              <p className="text-red-400 mb-6 text-sm lg:text-base">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearSelection}
                className="px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300 font-medium"
              >
                Try Another Category
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Laws List with Pagination */}
        <AnimatePresence mode="wait">
          {laws.length > 0 && (
            <motion.div 
              className="max-w-6xl mx-auto px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 lg:mb-12 gap-4 lg:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 lg:gap-4 mb-4">
                    <div className="p-2 lg:p-3 bg-cyan-500/20 rounded-xl lg:rounded-2xl border border-cyan-400/30">
                      <IoDocument className="text-xl lg:text-2xl text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-200 to-gray-200 text-transparent bg-clip-text">
                        {selectedCategory}
                      </h2>
                      <p className="text-gray-400 mt-1 lg:mt-2 text-sm lg:text-lg">
                        {pagination.totalCount} {pagination.totalCount === 1 ? 'legal document' : 'legal documents'} found
                        {pagination.totalPages > 1 && ` • Page ${pagination.currentPage} of ${pagination.totalPages}`}
                      </p>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearSelection}
                  className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 font-medium text-sm lg:text-base"
                >
                  <IoArrowBack className="text-lg" />
                  <span className="hidden sm:inline">All Categories</span>
                  <span className="sm:hidden">Back</span>
                </motion.button>
              </div>

              {/* Enhanced Laws Grid */}
              <div className="grid gap-4 lg:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {laws.map((law, index) => (
                  <motion.div
                    key={law._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/law/${law._id}`}>
                      <div className="h-full bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-xl border border-white/10 rounded-2xl lg:rounded-3xl p-4 lg:p-6 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105 hover:shadow-xl lg:hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col">
                        {/* Header */}
                        <div className="flex items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                          <div className="p-2 lg:p-3 bg-cyan-500/20 rounded-xl lg:rounded-2xl border border-cyan-400/30 group-hover:bg-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-300 flex-shrink-0">
                            <IoScale className="text-lg lg:text-xl text-cyan-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg lg:text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2 mb-1 lg:mb-2">
                              {law.section || law.lawTitle || "Unnamed Law"}
                            </h3>
                            {law.legalConcept && (
                              <p className="text-gray-400 text-xs lg:text-sm line-clamp-2">
                                {law.legalConcept}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-xs lg:text-sm leading-relaxed line-clamp-3 mb-4 lg:mb-6 flex-1">
                          {law.description || law.sectionOverview || "No description available."}
                        </p>

                        {/* Footer */}
                        <div className="pt-3 lg:pt-4 border-t border-white/10 mt-auto">
                          <div className="flex items-center justify-between">
                            <span className="text-cyan-400 text-xs lg:text-sm font-medium group-hover:text-cyan-300 transition-colors duration-300 flex items-center gap-1 lg:gap-2">
                              View Details
                              <IoArrowBack className="transform rotate-180 text-sm lg:text-lg group-hover:translate-x-1 transition-transform" />
                            </span>
                            {law.category && (
                              <span className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-2 py-1 hidden sm:block">
                                {law.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="lg:hidden">
                <MobilePagination />
              </div>
              <div className="hidden lg:block">
                <DesktopPagination />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Category;