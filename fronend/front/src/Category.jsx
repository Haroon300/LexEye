import { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
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

  // ✅ Fetch laws when category clicked
  const handleCategoryClick = async (category) => {
    setLoading(true);
    setError("");
    setLaws([]);
    setSelectedCategory(category);
    try {
      const res = await axios.post("https://lex-eye-backend.vercel.app/api/laws/category", {
        category,
      });
      setLaws(res.data.laws || []);
    } catch (err) {
      setError("No laws found in this category.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.category.toLowerCase().includes(search.toLowerCase())
  );

  const clearSearch = () => setSearch("");
  const clearSelection = () => {
    setSelectedCategory("");
    setLaws([]);
    setError("");
  };

  return (
    <div className="min-h-screen mt-[5%] bg-gradient-to-br from-[#051c1f] via-[#08292e] to-[#0a1b1f] text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-blue-400/10 rounded-full blur-3xl top-1/2 -right-20 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-teal-400/10 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-cyan-200 via-gray-200 to-silver text-transparent bg-clip-text mb-4">
            Law Categories
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore comprehensive legal categories and discover relevant laws and regulations
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
            <AiOutlineSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xl" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full bg-white/10 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl px-14 py-4 text-white placeholder-cyan-200/60 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-white transition-colors duration-200"
              >
                <AiOutlineClose className="text-lg" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence mode="popLayout">
              {filteredCategories.map((cat, index) => (
                <motion.button
                  key={cat.category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(cat.category)}
                  className={`group relative px-6 py-4 rounded-2xl font-semibold backdrop-blur-xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedCategory === cat.category
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-2xl shadow-cyan-500/20"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">
                    {cat.category}
                  </span>
                  <span className={`ml-2 text-sm px-2 py-1 rounded-full ${
                    selectedCategory === cat.category 
                      ? "bg-cyan-500/30 text-cyan-100" 
                      : "bg-white/10 text-gray-400"
                  }`}>
                    {cat.count}
                  </span>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {filteredCategories.length === 0 && search && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-lg">
                No categories found for "<span className="text-cyan-400">{search}</span>"
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 px-6 py-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            className="max-w-2xl mx-auto text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={clearSelection}
                className="px-6 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300"
              >
                Try Another Category
              </button>
            </div>
          </motion.div>
        )}

        {/* Laws List */}
        <AnimatePresence mode="wait">
          {laws.length > 0 && (
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-200 to-gray-200 text-transparent bg-clip-text">
                    {selectedCategory}
                  </h2>
                  <p className="text-gray-400 mt-2">
                    {laws.length} {laws.length === 1 ? 'law' : 'laws'} found in this category
                  </p>
                </div>
                <button
                  onClick={clearSelection}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300"
                >
                  View All Categories
                </button>
              </div>

              {/* Laws Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {laws.map((law, index) => (
                  <motion.div
                    key={law._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/law/${law._id}`}>
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
                        <h3 className="text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 mb-3">
                          {law.section || "Unnamed Law"}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {law.legalConcept || "No legal concept available."}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <span className="text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors duration-300">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Category;