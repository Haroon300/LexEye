import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CgMenuGridR,
  CgClose
} from "react-icons/cg";
import {
  FiHome,
  FiSearch,
  FiFolder,
  FiBookmark,
  FiUser,
  FiLogOut
} from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [userName, setUserName] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserName(userObj.name || userObj.email || "User");
      } catch (err) {
        console.error("Invalid user data:", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    setIsDropdownOpen(false);
    navigate("/signin");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <FiHome className="text-2xl" />, description: "Back to homepage" },
    { to: "/search", label: "Search", icon: <FiSearch className="text-2xl" />, description: "Find legal information" },
    { to: "/category", label: "Categories", icon: <FiFolder className="text-2xl" />, description: "Browse by topic" },
    { to: "/bookmarks", label: "Bookmarks", icon: <FiBookmark className="text-2xl" />, description: "Your saved content" },
  ];

  const menuVariants = {
    closed: { opacity: 0, scale: 0.8 },
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  const dropdownVariants = {
    closed: { opacity: 0, y: -10, scale: 0.95 },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };
  

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 lg:px-16 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-r from-[#04191c]/90 to-[#07242a]/90 backdrop-blur-2xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
        <div className="flex items-center gap-3 relative group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <img
              src="/logo-2.png"
              className="w-full h-full"
              alt="LexEye"
            />
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100"
              initial={false}
              animate={{ opacity: isHoveringLogo ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-cyan-100 to-white text-transparent bg-clip-text tracking-tight">
            Lex<span className="text-cyan-400 drop-shadow-lg">Eye</span>
          </h1>
          <motion.p 
            className="text-cyan-400/80 text-[10px] font-medium tracking-wider hidden sm:block"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            LEGAL INTELLIGENCE
          </motion.p>
        </div>
      </div>
      

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* User Dropdown */}
        {userName ? (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative bg-gradient-to-br from-cyan-500 to-blue-500 h-11 w-11 flex items-center justify-center text-white font-semibold rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative z-10 text-lg">{userName.charAt(0).toUpperCase()}</span>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute right-0 mt-3 w-60 bg-[#081a1e]/95 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl shadow-2xl shadow-cyan-500/10 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{userName}</p>
                        <p className="text-cyan-400 text-xs">Active</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 group"
                    >
                      <FiLogOut className="text-lg" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to="/signin"
            className="hidden sm:block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 border border-cyan-400/30 hover:scale-105"
          >
            SIGN IN
          </Link>
        )}

        {/* Menu Icon */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPopupOpen(true)}
          className="p-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:text-cyan-400 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
        >
          <CgMenuGridR className="text-2xl" />
        </motion.button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsPopupOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Popup Menu */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-1/4 left-auto md:left-1/3 sm:top-1.5 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm sm:max-w-md bg-black backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-cyan-500/20 z-50 p-4 sm:p-6 mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <CgMenuGridR className="text-cyan-400" /> Navigation
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPopupOpen(false)}
                className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                <CgClose className="text-2xl" />
              </motion.button>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              variants={menuVariants}
            >
              {navLinks.map(({ to, label, icon, description }) => (
                <motion.div key={label} variants={itemVariants}>
                  <Link
                    to={to}
                    onClick={() => setIsPopupOpen(false)}
                    className={`group flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                      location.pathname === to
                        ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-300 shadow-md shadow-cyan-500/30"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-cyan-500/10 hover:border-cyan-400/30 hover:text-cyan-300 hover:shadow-md hover:shadow-cyan-500/20"
                    }`}
                  >
                    <div className="mb-2 text-cyan-400 text-2xl group-hover:scale-110 transition-transform">
                      {icon}
                    </div>
                    <span className="font-semibold text-sm mb-1">{label}</span>
                    <span className="text-xs text-gray-400 text-center">
                      {description}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 pt-4 border-t border-white/10 text-center"
            >
              <p className="text-gray-400 text-xs">
                LexEye • Legal Intelligence Platform
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
