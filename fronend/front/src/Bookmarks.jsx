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
  FiFilter,
  FiArrowRight
} from "react-icons/fi";
import { loadLocalBookmarks, removeBookmark } from "./utils/bookmarkUtils";

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
      bookmark.legalConcept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen pt-[5%] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[3]}10` }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower"
          style={{ backgroundColor: `${COLORS.navy[4]}10` }}
        />
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[2]}20` }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
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
                <div 
                  className="p-3 rounded-2xl border backdrop-blur-xl"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <RiBookmarkFill className="text-3xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-black" style={{ color: COLORS.navy[5] }}>
                    My Bookmarks
                  </h1>
                  <p className="mt-2" style={{ color: COLORS.navy[4] }}>
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
                className="flex items-center gap-2 px-6 py-3 border rounded-xl transition-all duration-300 backdrop-blur-xl"
                style={{
                  backgroundColor: `${COLORS.navy[3]}20`,
                  borderColor: `${COLORS.navy[3]}30`,
                  color: COLORS.navy[3]
                }}
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
              className="flex items-center gap-4 text-sm"
            >
              <span 
                className="rounded-full px-3 py-1 border"
                style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`,
                  color: COLORS.navy[4]
                }}
              >
                {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
              </span>
              {searchTerm && (
                <span 
                  className="rounded-full px-3 py-1 border"
                  style={{
                    backgroundColor: `${COLORS.navy[2]}80`,
                    borderColor: `${COLORS.navy[4]}20`,
                    color: COLORS.navy[5]
                  }}
                >
                  {filteredBookmarks.length} results for "{searchTerm}"
                </span>
              )}
            </motion.div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <RiSearchLine 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg"
                style={{ color: COLORS.navy[4] }}
              />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 backdrop-blur-xl border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.navy[2]}80`,
                  borderColor: `${COLORS.navy[4]}30`,
                  color: COLORS.navy[5],
                  boxShadow: searchTerm ? `0 0 0 4px ${COLORS.navy[4]}20` : 'none'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                  style={{ color: COLORS.navy[4] }}
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
                      className="group relative backdrop-blur-xl border rounded-2xl p-6 shadow-2xl transition-all duration-300 overflow-hidden"
                      style={{
                        backgroundColor: `${COLORS.navy[2]}40`,
                        borderColor: `${COLORS.navy[4]}20`
                      }}
                    >
                      {/* Background Effect */}
                      <div 
                        className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"
                        style={{ backgroundColor: `${COLORS.navy[4]}10` }}
                      />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <h2 className="text-xl font-bold transition-colors duration-300 mb-3 line-clamp-2" style={{ color: COLORS.navy[4] }}>
                          {law.section || "Unnamed Section"}
                        </h2>
                        <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: COLORS.navy[5] }}>
                          {law.legalConcept || law.description || "No description available."}
                        </p>

                        {/* Metadata */}
                        {(law.category || law.sabCategory) && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {law.category && (
                              <span 
                                className="text-xs rounded-full px-2 py-1 border"
                                style={{
                                  backgroundColor: `${COLORS.navy[4]}20`,
                                  borderColor: `${COLORS.navy[4]}30`,
                                  color: COLORS.navy[4]
                                }}
                              >
                                {law.category}
                              </span>
                            )}
                            {law.sabCategory && (
                              <span 
                                className="text-xs rounded-full px-2 py-1 border"
                                style={{
                                  backgroundColor: `${COLORS.navy[3]}20`,
                                  borderColor: `${COLORS.navy[3]}30`,
                                  color: COLORS.navy[3]
                                }}
                              >
                                {law.sabCategory}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: `${COLORS.navy[4]}20` }}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                              to={`/law/${law._id}`}
                              className="flex items-center gap-2 px-4 py-2 border rounded-xl transition-all duration-300 group"
                              style={{
                                backgroundColor: `${COLORS.navy[4]}20`,
                                borderColor: `${COLORS.navy[4]}30`,
                                color: COLORS.navy[4]
                              }}
                            >
                              <FiEye className="text-lg" />
                              View Details
                              <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </motion.div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemove(law._id)}
                            disabled={isDeleting === law._id}
                            className="flex items-center gap-2 px-4 py-2 border rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              backgroundColor: `${COLORS.navy[3]}20`,
                              borderColor: `${COLORS.navy[3]}30`,
                              color: COLORS.navy[3]
                            }}
                          >
                            {isDeleting === law._id ? (
                              <>
                                <div 
                                  className="w-4 h-4 border-2 rounded-full animate-spin"
                                  style={{
                                    borderColor: `${COLORS.navy[3]}30`,
                                    borderTopColor: COLORS.navy[3]
                                  }}
                                />
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
                      <div 
                        className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500 rounded-full"
                        style={{ backgroundColor: COLORS.navy[4] }}
                      />
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
                  <div 
                    className="w-24 h-24 rounded-2xl border flex items-center justify-center mx-auto mb-6 backdrop-blur-xl"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}20`
                    }}
                  >
                    <RiSearchLine className="text-4xl" style={{ color: COLORS.navy[4] }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.navy[5] }}>
                    No bookmarks found
                  </h3>
                  <p className="mb-6" style={{ color: COLORS.navy[5] }}>
                    No bookmarks match "<span style={{ color: COLORS.navy[4] }}>{searchTerm}</span>". Try different keywords.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-3 border rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[4]
                    }}
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
                <div 
                  className="w-24 h-24 rounded-2xl border flex items-center justify-center mx-auto mb-6 backdrop-blur-xl"
                  style={{
                    backgroundColor: `${COLORS.navy[2]}80`,
                    borderColor: `${COLORS.navy[4]}20`
                  }}
                >
                  <RiBookmarkLine className="text-4xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.navy[5] }}>
                  No bookmarks yet
                </h3>
                <p className="mb-6" style={{ color: COLORS.navy[5] }}>
                  Start exploring legal sections and save your favorites for quick access later.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 border rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`,
                    color: COLORS.navy[4]
                  }}
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