import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiDeleteBin5Fill, 
  RiBookmarkFill, 
  RiBookmarkLine,
  RiSearchLine 
} from "react-icons/ri";
import { 
  FiEye, 
  FiTrash2, 
  FiBookmark,
  FiAlertCircle,
  FiFilter
} from "react-icons/fi";
import { loadLocalBookmarks, removeBookmark } from "./utils/bookmarkUtils";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const savedBookmarks = loadLocalBookmarks();
    setBookmarks(savedBookmarks);
    setFilteredBookmarks(savedBookmarks);
  }, []);

  useEffect(() => {
    const filtered = bookmarks.filter(bookmark =>
      bookmark.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.legalConcept?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookmarks(filtered);
  }, [searchTerm, bookmarks]);

  const handleRemove = async (id) => {
    setIsDeleting(id);
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    await removeBookmark(id, token);
    const updatedBookmarks = loadLocalBookmarks();
    setBookmarks(updatedBookmarks);
    setIsDeleting(null);
  };

  const clearAllBookmarks = async () => {
    if (window.confirm("Are you sure you want to clear all bookmarks?")) {
      for (const bookmark of bookmarks) {
        await removeBookmark(bookmark._id, token);
      }
      setBookmarks([]);
    }
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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen mt-[5%] bg-gradient-to-br from-[#051c1f] via-[#08292e] to-[#0a1b1f] text-white relative overflow-hidden">
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
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-400/30">
                  <RiBookmarkFill className="text-3xl text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-200 via-gray-200 to-silver text-transparent bg-clip-text">
                    My Bookmarks
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Your saved legal sections and concepts
                  </p>
                </div>
              </div>
            </div>

            {bookmarks.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllBookmarks}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-400/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300"
              >
                <FiTrash2 className="text-lg" />
                Clear All
              </motion.button>
            )}
          </div>

          {/* Stats and Search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 text-sm text-gray-400"
            >
              <span className="bg-cyan-500/20 border border-cyan-400/30 rounded-full px-3 py-1 text-cyan-300">
                {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
              </span>
              {searchTerm && (
                <span className="bg-white/10 border border-white/10 rounded-full px-3 py-1">
                  {filteredBookmarks.length} results for "{searchTerm}"
                </span>
              )}
            </motion.div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <RiSearchLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bookmarks Grid */}
        <AnimatePresence mode="wait">
          {bookmarks.length > 0 ? (
            filteredBookmarks.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence>
                  {filteredBookmarks.map((law) => (
                    <motion.div
                      key={law._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden"
                    >
                      {/* Background Effect */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500" />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <h2 className="text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 mb-3 line-clamp-2">
                          {law.section || "Unnamed Section"}
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                          {law.legalConcept || "No description available."}
                        </p>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                              to={`/law/${law._id}`}
                              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
                            >
                              <FiEye className="text-lg" />
                              View Details
                            </Link>
                          </motion.div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemove(law._id)}
                            disabled={isDeleting === law._id}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-300 rounded-xl hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                          >
                            {isDeleting === law._id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                                Removing...
                              </>
                            ) : (
                              <>
                                <FiTrash2 className="text-lg" />
                                Remove
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>

                      {/* Hover Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-6">
                    <RiSearchLine className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-300 mb-3">
                    No bookmarks found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    No bookmarks match "<span className="text-cyan-400">{searchTerm}</span>". Try different keywords.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
                  >
                    Clear Search
                  </button>
                </div>
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <RiBookmarkLine className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-3">
                  No bookmarks yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Start exploring legal sections and save your favorites for quick access later.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
                >
                  <FiBookmark className="text-lg" />
                  Explore Laws
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Bookmarks;