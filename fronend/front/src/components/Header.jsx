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
  const [userName, setUserName] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Load user info from localStorage
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

  // ✅ Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("User");
    localStorage.removeItem("offlineBookmarks");
    localStorage.removeItem("pendingBookmarkActions");
    localStorage.removeItem("bookmarks");
    
    setUserName(null);
    setIsDropdownOpen(false);
    navigate("/signin");
  };

  // ✅ Navigation links
  const navLinks = [
    { 
      to: "/", 
      label: "Home", 
      icon: <FiHome className="text-2xl" />,
      description: "Back to homepage"
    },
    { 
      to: "/search", 
      label: "Search", 
      icon: <FiSearch className="text-2xl" />,
      description: "Find legal information"
    },
    { 
      to: "/category", 
      label: "Categories", 
      icon: <FiFolder className="text-2xl" />,
      description: "Browse by topic"
    },
    { 
      to: "/bookmarks", 
      label: "Bookmarks", 
      icon: <FiBookmark className="text-2xl" />,
      description: "Your saved content"
    },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 lg:px-20 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gradient-to-r from-[#051c1f]/95 to-[#08292e]/95 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 border-b border-white/10" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/")}
      >
        <div className="relative">
          <img
            src="/logo-2.png"
            className="w-12 h-12 rounded-xl border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/20"
            alt="LexEye"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-2xl shadow-cyan-500/20" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-200 to-gray-200 text-transparent bg-clip-text">
          Lex<span className="text-cyan-400">Eye</span>
        </h1>
      </motion.div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* User Avatar / Signin */}
        {userName ? (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative bg-gradient-to-br from-cyan-500 to-blue-500 h-12 w-12 flex items-center justify-center text-white font-bold rounded-2xl shadow-2xl shadow-cyan-500/25 border border-cyan-400/30 hover:shadow-cyan-500/40 transition-all duration-300 overflow-hidden group"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              <span className="relative z-10 text-lg">
                {userName.charAt(0).toUpperCase()}
              </span>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute right-0 mt-3 w-64 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden z-50"
                >
                  {/* User Info */}
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

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 group"
                    >
                      <FiUser className="text-lg group-hover:text-cyan-400" />
                      <span className="text-sm">Profile Settings</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden min-[451px]:block"
          >
            <Link
              to="/signin"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-400/30 hover:scale-105"
            >
              SIGN IN
            </Link>
          </motion.div>
        )}

        {/* Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPopupOpen(true)}
          className="p-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:text-cyan-400 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300"
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setIsPopupOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation Popup - FIXED POSITIONING */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-cyan-500/20 z-50 p-6 mx-auto"
            style={{
              maxHeight: "80vh",
              overflowY: "auto"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-2xl border border-cyan-400/30">
                  <CgMenuGridR className="text-2xl text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Navigation</h2>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPopupOpen(false)}
                className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                <CgClose className="text-2xl" />
              </motion.button>
            </div>

            {/* Navigation Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              variants={menuVariants}
            >
              {navLinks.map(({ to, label, icon, description }) => (
                <motion.div
                  key={label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={to}
                    onClick={() => setIsPopupOpen(false)}
                    className={`group flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                      location.pathname === to
                        ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-2xl shadow-cyan-500/20"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-cyan-500/10 hover:border-cyan-400/30 hover:text-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/10"
                    }`}
                  >
                    <div className={`mb-2 transition-transform duration-300 group-hover:scale-110 ${
                      location.pathname === to ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                    }`}>
                      {icon}
                    </div>
                    <span className="font-semibold text-center text-sm mb-1">{label}</span>
                    <span className="text-xs text-gray-400 group-hover:text-cyan-300 text-center">
                      {description}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Sign In */}
              {!userName && (
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="max-[450px]:col-span-2 hidden max-[450px]:block"
                >
                  <Link
                    to="/signin"
                    onClick={() => setIsPopupOpen(false)}
                    className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300"
                  >
                    <FiUser className="text-2xl mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-center text-sm mb-1">Sign In</span>
                    <span className="text-xs text-cyan-400/70 text-center">
                      Access your account
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Footer */}
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