import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AiOutlineSearch, 
  AiOutlineRocket,
  AiOutlineSafety,
  AiOutlineHome,
  AiOutlineShop,
  AiOutlineTeam 
} from "react-icons/ai";
import { 
  FiSearch, 
  FiArrowRight, 
  FiShield, 
  FiBriefcase,
  FiUser,
  FiTrendingUp
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // Popular search categories with icons
  const quickFilters = [
    { 
      tag: "Police Stops", 
      icon: <FiShield className="text-lg" />,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      tag: "Tenancy Rights", 
      icon: <AiOutlineHome className="text-lg" />,
      color: "from-green-500 to-emerald-500"
    },
    { 
      tag: "Harassment", 
      icon: <AiOutlineSafety className="text-lg" />,
      color: "from-red-500 to-pink-500"
    },
    { 
      tag: "Workplace Disputes", 
      icon: <FiBriefcase className="text-lg" />,
      color: "from-orange-500 to-amber-500"
    },
    { 
      tag: "Digital Safety", 
      icon: <AiOutlineRocket className="text-lg" />,
      color: "from-purple-500 to-indigo-500"
    },
    { 
      tag: "Consumer Issues", 
      icon: <AiOutlineShop className="text-lg" />,
      color: "from-yellow-500 to-orange-500"
    },
  ];

  // Handle search with optional tag
  const handleSearch = (searchText) => {
    const queryToSearch = searchText || query;
    if (!queryToSearch.trim()) return;
    navigate(`/laws?query=${encodeURIComponent(queryToSearch)}`);
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full text-center"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-6">
              <FiSearch className="text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Legal Search Engine</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-cyan-200 via-gray-200 to-silver text-transparent bg-clip-text mb-6 leading-tight">
              Find Legal Answers
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get instant access to simplified legal guides, step-by-step solutions, 
              and clear explanations for your everyday rights and issues.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="relative mb-12"
          >
            <div className={`relative max-w-2xl mx-auto transition-all duration-500 ${
              isFocused ? 'scale-105' : 'scale-100'
            }`}>
              {/* Main Search Container */}
              <div className={`relative bg-white/10 backdrop-blur-2xl border-2 rounded-2xl p-2 shadow-2xl transition-all duration-300 ${
                isFocused 
                  ? 'border-cyan-400 shadow-cyan-500/20' 
                  : 'border-white/10 hover:border-cyan-400/50'
              }`}>
                <div className="flex items-center">
                  {/* Search Icon */}
                  <div className="pl-4 pr-3">
                    <FiSearch className={`text-2xl transition-colors duration-300 ${
                      isFocused ? 'text-cyan-400' : 'text-gray-400'
                    }`} />
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="Describe your legal issue: harassment, deposit disputes, police stops, consumer rights..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-lg py-4 px-2"
                  />

                  {/* Search Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSearch()}
                    disabled={!query.trim()}
                    className="ml-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2"
                  >
                    <span>Search</span>
                    <FiArrowRight className="text-lg" />
                  </motion.button>
                </div>
              </div>

              {/* Floating Suggestions */}
              <AnimatePresence>
                {isFocused && query.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl z-20"
                  >
                    <p className="text-gray-400 text-sm mb-2">Try searching for:</p>
                    <div className="flex flex-wrap gap-2">
                      {["rights during police stop", "tenant deposit return", "workplace harassment laws", "consumer protection"].map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(suggestion)}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-gray-300 transition-colors duration-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Filters Section */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FiTrendingUp className="text-cyan-400 text-xl" />
              <h2 className="text-2xl font-bold text-gray-300">Popular Legal Topics</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {quickFilters.map((filter, index) => (
                <motion.button
                  key={filter.tag}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearch(filter.tag)}
                  className={`group relative bg-gradient-to-br ${filter.color}/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden`}
                >
                  {/* Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${filter.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${filter.color}/30 border border-white/10 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {filter.icon}
                    </div>
                    <span className="text-gray-300 group-hover:text-white font-medium text-sm transition-colors duration-300">
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
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
          >
            {[
              {
                icon: <FiSearch className="text-2xl" />,
                title: "Smart Search",
                description: "Advanced algorithms to find exactly what you need"
              },
              {
                icon: <FiUser className="text-2xl" />,
                title: "Plain Language",
                description: "Legal concepts explained in simple terms"
              },
              {
                icon: <AiOutlineTeam className="text-2xl" />,
                title: "Step-by-Step Guides",
                description: "Clear actions for your specific situation"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="inline-flex p-3 bg-cyan-500/20 rounded-2xl border border-cyan-400/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Search;