import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSearch, 
  FiArrowRight, 
  FiShield, 
  FiBriefcase,
  FiUser,
  FiTrendingUp,
  FiHome,
  FiAlertTriangle,
  FiShoppingBag,
  FiGlobe,
  FiX
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

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

const Search = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Popular search categories
  const quickFilters = [
    { 
      tag: "Police Stops", 
      icon: <FiShield className="text-sm md:text-lg" />,
    },
    { 
      tag: "Tenancy Rights", 
      icon: <FiHome className="text-sm md:text-lg" />,
    },
    { 
      tag: "Harassment", 
      icon: <FiAlertTriangle className="text-sm md:text-lg" />,
    },
    { 
      tag: "Workplace", 
      icon: <FiBriefcase className="text-sm md:text-lg" />,
    },
    { 
      tag: "Digital Safety", 
      icon: <FiGlobe className="text-sm md:text-lg" />,
    },
    { 
      tag: "Consumer Issues", 
      icon: <FiShoppingBag className="text-sm md:text-lg" />,
    },
  ];

  // Popular search suggestions
  const popularSearches = [
    "rights during police stop",
    "tenant deposit return",
    "workplace harassment laws",
    "consumer protection rights",
    "digital privacy laws",
    "employment termination rights"
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentLegalSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentLegalSearches");
  };

  // Debounced search suggestions
  const debouncedSuggestions = useCallback(
    debounce((searchValue) => {
      if (searchValue.length > 1) {
        const filtered = popularSearches.filter(item =>
          item.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 3)); // Limit to 3 suggestions
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSuggestions(query);
  }, [query, debouncedSuggestions]);

  // Handle search with validation
  const handleSearch = useCallback(async (searchText) => {
    const queryToSearch = searchText || query;
    
    if (!queryToSearch.trim()) {
      setError("Please enter a search term");
      return;
    }
    
    if (queryToSearch.length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }
    
    setError("");
    setIsSearching(true);
    setIsFocused(false); // Close suggestions after search

    // Save to recent searches
    const updatedRecent = [queryToSearch, ...recentSearches.filter(s => s !== queryToSearch)].slice(0, 3);
    setRecentSearches(updatedRecent);
    localStorage.setItem("recentLegalSearches", JSON.stringify(updatedRecent));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    navigate(`/laws?query=${encodeURIComponent(queryToSearch)}`);
    setIsSearching(false);
  }, [query, recentSearches, navigate]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      setIsFocused(false);
      setSuggestions([]);
    }
  };

  // Animation variants
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
    <div className="min-h-screen md:pt-[5%] pt-[25%] relative overflow-hidden" style={{ backgroundColor: COLORS.navy[1] }}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl -top-10 -left-10 md:-top-20 md:-left-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[3]}10` }}
        />
        <div 
          className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full blur-3xl top-1/4 -right-10 md:top-1/3 md:-right-20 animate-pulse-slower"
          style={{ backgroundColor: `${COLORS.navy[4]}10` }}
        />
        <div 
          className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full blur-3xl bottom-10 left-1/4 md:bottom-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[2]}20` }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(116,140,171,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(116,140,171,0.1)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 lg:px-8 py-4 md:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl w-full text-center"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="mb-8 md:mb-12 px-2"
          >
            <div 
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 border"
              style={{
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <FiSearch className="text-sm md:text-base" style={{ color: COLORS.navy[4] }} />
              <span className="text-xs md:text-sm font-medium" style={{ color: COLORS.navy[4] }}>Legal Search Engine</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight" style={{ color: COLORS.navy[5] }}>
              Find Legal Answers
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold" style={{ color: COLORS.navy[4] }}>
                Made Simple
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2" style={{ color: COLORS.navy[5] }}>
              Get instant access to simplified legal guides, step-by-step solutions, 
              and clear explanations for your everyday rights and issues.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 md:mb-12 px-2"
          >
            <div className="relative max-w-2xl mx-auto">
              {/* Main Search Container */}
              <div 
                className={`relative backdrop-blur-xl border-2 rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-xl transition-all duration-300 ${
                  error ? 'border-red-400 shadow-red-500/20' : ''
                }`}
                style={{
                  backgroundColor: `${COLORS.navy[2]}80`,
                  borderColor: isFocused 
                    ? `${COLORS.navy[4]}50` 
                    : error 
                    ? `${COLORS.navy[3]}50`
                    : `${COLORS.navy[4]}20`
                }}
              >
                <div className="flex items-center">
                  {/* Search Icon */}
                  <div className="pl-2 md:pl-4 pr-1 md:pr-3">
                    <FiSearch 
                      className={`text-lg md:text-2xl transition-colors duration-300 ${
                        error ? 'text-red-400' : 'text-gray-400'
                      }`}
                      style={isFocused && !error ? { color: COLORS.navy[4] } : {}}
                    />
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder={isMobile ? "Search legal issues..." : "Describe your legal issue: harassment, deposit disputes, police stops, consumer rights..."}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setError("");
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="w-full bg-transparent outline-none placeholder-gray-400 text-sm md:text-lg py-3 md:py-4 px-1 md:px-2"
                    style={{ color: COLORS.navy[5] }}
                    enterKeyHint="search"
                    inputMode="search"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />

                  {/* Search Button */}
                  <motion.button
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSearch()}
                    disabled={!query.trim() || isSearching}
                    className="ml-1 md:ml-2 font-semibold rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg flex items-center gap-1 md:gap-2 min-w-[70px] md:min-w-auto border"
                    style={{
                      backgroundColor: COLORS.navy[1],
                      borderColor: `${COLORS.navy[4]}50`,
                      color: COLORS.navy[5],
                      boxShadow: `0 4px 20px ${COLORS.navy[4]}25`
                    }}
                  >
                    {isSearching ? (
                      <div 
                        className="w-4 h-4 md:w-5 md:h-5 border-2 rounded-full animate-spin"
                        style={{
                          borderColor: `${COLORS.navy[5]}30`,
                          borderTopColor: COLORS.navy[5]
                        }}
                      />
                    ) : isMobile ? (
                      <FiSearch className="text-sm" />
                    ) : (
                      <>
                        <span className="text-sm md:text-base">Search</span>
                        <FiArrowRight className="text-sm md:text-lg" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-1 md:mt-2 text-xs md:text-sm text-center"
                    style={{ color: COLORS.navy[3] }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search Suggestions & Recent Searches - SCROLL REMOVED */}
              <AnimatePresence>
                {isFocused && (suggestions.length > 0 || recentSearches.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 right-0 mt-1 md:mt-2 backdrop-blur-xl border rounded-lg md:rounded-2xl p-2 md:p-4 shadow-xl z-20"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}F0`,
                      borderColor: `${COLORS.navy[4]}30`,
                      maxHeight: 'none',
                      overflow: 'visible'
                    }}
                  >
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && query.length === 0 && (
                      <div className="mb-2 md:mb-3">
                        <div className="flex items-center justify-between mb-1 md:mb-2">
                          <p className="text-xs md:text-sm font-medium" style={{ color: COLORS.navy[4] }}>Recent Searches</p>
                          <button
                            onClick={clearRecentSearches}
                            className="transition-colors duration-200 p-1"
                            style={{ color: COLORS.navy[4] }}
                            title="Clear recent searches"
                          >
                            <FiX className="text-xs" />
                          </button>
                        </div>
                        <div className="space-y-1 md:space-y-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setQuery(search);
                                handleSearch(search);
                              }}
                              className="w-full px-2 md:px-3 py-1.5 md:py-2 border rounded-lg md:rounded-xl text-xs md:text-sm transition-all duration-200 flex items-center gap-1 md:gap-2 text-left"
                              style={{
                                backgroundColor: `${COLORS.navy[4]}20`,
                                borderColor: `${COLORS.navy[4]}30`,
                                color: COLORS.navy[5]
                              }}
                            >
                              <FiSearch className="text-xs flex-shrink-0" style={{ color: COLORS.navy[4] }} />
                              <span className="truncate flex-1">{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <div>
                        <p className="text-xs md:text-sm mb-1 md:mb-2 font-medium text-left" style={{ color: COLORS.navy[4] }}>Try searching for:</p>
                        <div className="space-y-1 md:space-y-2">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setQuery(suggestion);
                                handleSearch(suggestion);
                              }}
                              className="w-full px-2 md:px-3 py-1.5 md:py-2 border rounded-lg md:rounded-xl text-xs md:text-sm transition-all duration-200 text-left"
                              style={{
                                backgroundColor: `${COLORS.navy[2]}80`,
                                borderColor: `${COLORS.navy[4]}20`,
                                color: COLORS.navy[5]
                              }}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Filters Section */}
          <motion.div
            variants={itemVariants}
            className="mb-6 md:mb-8 px-2"
          >
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              <FiTrendingUp className="text-lg md:text-xl" style={{ color: COLORS.navy[4] }} />
              <h2 className="text-lg md:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>Popular Legal Topics</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 max-w-6xl mx-auto">
              {quickFilters.map((filter, index) => (
                <motion.button
                  key={filter.tag}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: isMobile ? 1.02 : 1.05, 
                    y: isMobile ? -2 : -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearch(filter.tag)}
                  className="group relative backdrop-blur-lg border rounded-xl md:rounded-2xl p-2 md:p-3 text-center shadow-lg transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundColor: `${COLORS.navy[2]}40`,
                    borderColor: `${COLORS.navy[4]}20`
                  }}
                >
                  {/* Background Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: `${COLORS.navy[4]}10` }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div 
                      className="inline-flex p-1.5 md:p-3 rounded-lg md:rounded-2xl border mb-1.5 md:mb-3 group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: `${COLORS.navy[4]}20`,
                        borderColor: `${COLORS.navy[4]}30`
                      }}
                    >
                      {filter.icon}
                    </div>
                    <span className="font-medium text-xs md:text-sm transition-colors duration-300 line-clamp-2" style={{ color: COLORS.navy[5] }}>
                      {filter.tag}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-6xl mx-auto mt-8 md:mt-12 lg:mt-16 px-2"
          >
            {[
              {
                icon: <FiSearch className="text-xl md:text-2xl" />,
                title: "Smart Search",
                description: "Advanced algorithms to find exactly what you need"
              },
              {
                icon: <FiUser className="text-xl md:text-2xl" />,
                title: "Plain Language",
                description: "Legal concepts explained in simple terms"
              },
              {
                icon: <FiBriefcase className="text-xl md:text-2xl" />,
                title: "Step-by-Step Guides",
                description: "Clear actions for your specific situation"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: isMobile ? -2 : -5 }}
                className="backdrop-blur-lg border rounded-xl md:rounded-2xl p-4 md:p-6 text-center group transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}10`
                }}
              >
                <div 
                  className="inline-flex p-2 md:p-3 rounded-xl md:rounded-2xl border mb-3 md:mb-4 group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2" style={{ color: COLORS.navy[5] }}>{feature.title}</h3>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: `${COLORS.navy[5]}90` }}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Bottom Padding */}
          {isMobile && <div className="h-8"></div>}
        </motion.div>
      </div>
    </div>
  );
};

export default Search;