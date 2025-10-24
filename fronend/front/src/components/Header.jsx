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
import logo from '/logo-2.png';

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

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    closed: { 
      opacity: 0, 
      scale: 0.8,
      y: -20 
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1 
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  const dropdownVariants = {
    closed: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95 
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      },
    },
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 lg:px-16 z-50 transition-all duration-500 backdrop-blur-xl ${
        scrolled
          ? "border-b shadow-2xl"
          : "bg-transparent"
      }`}
      style={{ 
        backgroundColor: scrolled ? `${COLORS.navy[1]}E6` : 'transparent',
        borderColor: scrolled ? `${COLORS.navy[4]}20` : 'transparent',
        boxShadow: scrolled ? `0 8px 32px ${COLORS.navy[1]}40` : 'none'
      }}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div 
          className="relative w-12 h-12"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div 
            className="absolute inset-0 rounded-2xl border backdrop-blur-xl"
            style={{
              backgroundColor: `${COLORS.navy[2]}80`,
              borderColor: `${COLORS.navy[4]}30`
            }}
          />
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              className="text-2xl" 
              src={logo}
              alt="LexEye Logo"
            />
          </div>
        </motion.div>
        
        <div className="flex flex-col">
          <motion.h1 
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: COLORS.navy[5] }}
            whileHover={{ scale: 1.02 }}
          >
            Lex<span style={{ color: COLORS.navy[4] }}>Eye</span>
          </motion.h1>
          <motion.p 
            className="text-xs font-medium tracking-wider"
            style={{ color: COLORS.navy[4] }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            LEGAL INTELLIGENCE
          </motion.p>
        </div>
      </Link>

      {/* Enhanced Right Controls */}
      <div className="flex items-center gap-4">
        {/* Enhanced User Dropdown */}
        {userName ? (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative h-11 w-11 flex items-center justify-center font-semibold rounded-2xl shadow-lg transition-all duration-300 overflow-hidden group border"
              style={{
                backgroundColor: COLORS.navy[4],
                color: COLORS.navy[5],
                borderColor: `${COLORS.navy[4]}50`,
                boxShadow: `0 8px 32px ${COLORS.navy[4]}25`
              }}
            >
              <div 
                className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background: `linear-gradient(90deg, transparent, ${COLORS.navy[5]}30, transparent)` }}
              />
              <span className="relative z-10 text-lg font-bold">
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
                  className="absolute right-0 mt-3 w-64 backdrop-blur-2xl border rounded-3xl shadow-2xl overflow-hidden z-50"
                  style={{
                    backgroundColor: `${COLORS.navy[2]}F0`,
                    borderColor: `${COLORS.navy[4]}30`,
                    boxShadow: `0 20px 40px ${COLORS.navy[1]}60`
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: `${COLORS.navy[4]}20` }}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold border"
                        style={{
                          backgroundColor: COLORS.navy[4],
                          color: COLORS.navy[5],
                          borderColor: `${COLORS.navy[4]}50`
                        }}
                      >
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: COLORS.navy[5] }}>
                          {userName}
                        </p>
                        <p className="text-xs" style={{ color: COLORS.navy[4] }}>
                          Active Member
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-300 group"
                      style={{ 
                        color: COLORS.navy[1],
                        backgroundColor: 'transparent'
                      }}
                      whileHover={{
                        backgroundColor: `${COLORS.navy[3]}40`
                      }}
                    >
                      <FiLogOut className="text-lg" />
                      <span className="text-sm font-medium">Sign Out</span>
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
          >
            <Link
              to="/signin"
              className="hidden sm:flex items-center gap-2 font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 border"
              style={{
                backgroundColor: COLORS.navy[4],
                color: COLORS.navy[1],
                borderColor: `${COLORS.navy[4]}50`,
                boxShadow: `0 8px 32px ${COLORS.navy[4]}25`
              }}
            >
              <FiUser className="text-lg" />
              SIGN IN
            </Link>
          </motion.div>
        )}

        {/* Enhanced Menu Icon */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPopupOpen(true)}
          className="p-3 rounded-2xl border transition-all duration-300 backdrop-blur-xl"
          style={{
            backgroundColor: `${COLORS.navy[2]}80`,
            borderColor: `${COLORS.navy[4]}30`,
            color: COLORS.navy[5]
          }}
        >
          <CgMenuGridR className="text-2xl" />
        </motion.button>
      </div>

      {/* Enhanced Overlay */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm z-40"
            style={{ backgroundColor: `${COLORS.navy[1]}CC` }}
            onClick={() => setIsPopupOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Popup Menu */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-1/3 md:top-1/4 md:left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm sm:max-w-md backdrop-blur-2xl border rounded-3xl shadow-2xl z-50 p-6 mx-auto"
            style={{
              backgroundColor: `${COLORS.navy[1]}F0`,
              borderColor: `${COLORS.navy[4]}30`,
              boxShadow: `0 25px 50px ${COLORS.navy[1]}80`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 
                className="text-2xl font-bold flex items-center gap-3"
                style={{ color: COLORS.navy[5] }}
              >
                <CgMenuGridR style={{ color: COLORS.navy[5] }} />
                Navigation
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPopupOpen(false)}
                className="p-2 rounded-xl transition-all duration-200"
                style={{ 
                  color: COLORS.navy[5],
                  backgroundColor: 'transparent'
                }}
              >
                <CgClose className="text-2xl" />
              </motion.button>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={menuVariants}
            >
              {navLinks.map(({ to, label, icon, description }) => (
                <motion.div key={label} variants={itemVariants}>
                  <Link
                    to={to}
                    onClick={() => setIsPopupOpen(false)}
                    className={`group flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 ${
                      location.pathname === to
                        ? "shadow-lg"
                        : "hover:shadow-lg hover:scale-105"
                    }`}
                    style={{
                      backgroundColor: location.pathname === to 
                        ? `${COLORS.navy[4]}20` 
                        : `${COLORS.navy[3]}15`,
                      borderColor: location.pathname === to 
                        ? `${COLORS.navy[4]}50` 
                        : `${COLORS.navy[4]}20`,
                      color: COLORS.navy[5]
                    }}
                  >
                    <motion.div 
                      className="mb-3 text-2xl transition-transform duration-300"
                      style={{ color: COLORS.navy[4] }}
                      whileHover={{ scale: 1.2 }}
                    >
                      {icon}
                    </motion.div>
                    <span className="font-semibold text-sm mb-2 text-center">
                      {label}
                    </span>
                    <span 
                      className="text-xs text-center font-light"
                      style={{ color: `${COLORS.navy[5]}90` }}
                    >
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
              className="mt-8 pt-6 border-t text-center"
              style={{ borderColor: `${COLORS.navy[4]}20` }}
            >
              <p 
                className="text-sm mb-3 font-light"
                style={{ color: `${COLORS.navy[5]}80` }}
              >
                Emergency assistance available
              </p>
              <Link 
                to="/helpline"
                onClick={() => setIsPopupOpen(false)}
                className="inline-block"
              >
                <motion.h3 
                  className="font-semibold mb-2 transition-colors duration-300"
                  style={{ color: COLORS.navy[4] }}
                  whileHover={{ color: COLORS.navy[3] }}
                >
                  Emergency Helpline
                </motion.h3>
              </Link>
              <p 
                className="text-xs font-light pt-4 border-t"
                style={{ 
                  color: `${COLORS.navy[5]}60`,
                  borderColor: `${COLORS.navy[4]}20`
                }}
              >
                LexEye • Legal Intelligence Platform
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}