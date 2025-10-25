import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiHome, 
  FiBookmark, 
  FiSearch,
  FiCompass,
  FiCloudOff,
  FiArrowLeft,
  FiNavigation,
  FiHelpCircle
} from "react-icons/fi";

/* Color Constants matching landing page palette */
const COLORS = {
  navy: {
    1: '#000000',
    2: '#66666e',
    3: '#9999a1',
    4: '#e6e6e9',
    5: '#f4f4f6'
  }
};

const NotFound = () => {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="min-h-screen pt-[8%] relative overflow-hidden" style={{ backgroundColor: COLORS.navy[1] }}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[3]}20` }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower"
          style={{ backgroundColor: `${COLORS.navy[4]}15` }}
        />
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[2]}25` }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.1)_1px,transparent_1px)] bg-[size:80px_80px]"
            style={{ backgroundColor: COLORS.navy[1] }}
          />
        </div>

        {/* Floating 404 Numbers */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl font-black pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: `${COLORS.navy[5]}5`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            404
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl w-full text-center"
        >
          {/* Animated 404 */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 w-48 h-48 rounded-full blur-2xl"
                style={{ backgroundColor: `${COLORS.navy[4]}20` }}
              />
              
              {/* Main 404 Container */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative backdrop-blur-2xl border rounded-3xl p-12 shadow-2xl"
                style={{
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}30`,
                  boxShadow: `0 25px 50px ${COLORS.navy[1]}50`
                }}
              >
                <h1 className="text-8xl sm:text-9xl font-black" style={{ color: COLORS.navy[5] }}>
                  404
                </h1>
                
                {/* Floating Icons Around */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {[FiCloudOff, FiCompass, FiSearch, FiBookmark].map((Icon, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 rounded-xl border flex items-center justify-center"
                      style={{
                        top: '20%',
                        left: '50%',
                        transform: `rotate(${i * 90}deg) translateX(80px) rotate(-${i * 90}deg)`,
                        backgroundColor: `${COLORS.navy[4]}20`,
                        borderColor: `${COLORS.navy[4]}30`
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <Icon className="text-sm" style={{ color: COLORS.navy[4] }} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: COLORS.navy[5] }}>
              Page Not Found
            </h2>
            
            <div className="space-y-4 text-lg max-w-xl mx-auto" style={{ color: COLORS.navy[5] }}>
              <p>
                It seems you've ventured into uncharted territory. The page you're looking for 
                doesn't exist or may have been moved.
              </p>
              <p className="text-sm" style={{ color: `${COLORS.navy[5]}60` }}>
                Don't worry, let's get you back on track with these helpful options.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
          >
            {/* Home Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="group flex flex-col items-center gap-3 backdrop-blur-xl border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.navy[5]}10`,
                  borderColor: `${COLORS.navy[5]}30`,
                  color: COLORS.navy[5]
                }}
              >
                <div 
                  className="p-3 rounded-2xl border group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FiHome className="text-2xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <span className="font-semibold">Go Home</span>
                <span className="text-sm" style={{ color: `${COLORS.navy[5]}60` }}>Start fresh</span>
              </Link>
            </motion.div>

            {/* Search Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/search"
                className="group flex flex-col items-center gap-3 backdrop-blur-xl border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.navy[5]}10`,
                  borderColor: `${COLORS.navy[5]}30`,
                  color: COLORS.navy[5]
                }}
              >
                <div 
                  className="p-3 rounded-2xl border group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FiSearch className="text-2xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <span className="font-semibold">Search</span>
                <span className="text-sm" style={{ color: `${COLORS.navy[5]}60` }}>Find what you need</span>
              </Link>
            </motion.div>

            {/* Back Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.history.back()}
                className="group flex flex-col items-center gap-3 backdrop-blur-xl border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 w-full"
                style={{
                  backgroundColor: `${COLORS.navy[5]}10`,
                  borderColor: `${COLORS.navy[5]}30`,
                  color: COLORS.navy[5]
                }}
              >
                <div 
                  className="p-3 rounded-2xl border group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  <FiArrowLeft className="text-2xl" style={{ color: COLORS.navy[4] }} />
                </div>
                <span className="font-semibold">Go Back</span>
                <span className="text-sm" style={{ color: `${COLORS.navy[5]}60` }}>Previous page</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl border rounded-2xl p-6 max-w-md mx-auto mb-8"
            style={{
              backgroundColor: `${COLORS.navy[2]}40`,
              borderColor: `${COLORS.navy[4]}30`
            }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2" style={{ color: COLORS.navy[5] }}>
              <FiNavigation style={{ color: COLORS.navy[4] }} />
              Quick Navigation
            </h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {[
                { to: "/glossary", label: "Legal Glossary", icon: FiBookmark },
                { to: "/emergency", label: "Helpline", icon: FiHelpCircle },
                { to: "/categories", label: "Categories", icon: FiCompass },
                { to: "/bookmarks", label: "Bookmarks", icon: FiBookmark }
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="flex items-center gap-2 px-3 py-2 border rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: `${COLORS.navy[5]}05`,
                    borderColor: `${COLORS.navy[5]}10`,
                    color: COLORS.navy[5]
                  }}
                >
                  <link.icon className="text-xs" style={{ color: COLORS.navy[4] }} />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl border rounded-2xl p-6 max-w-lg mx-auto"
            style={{
              backgroundColor: `${COLORS.navy[2]}40`,
              borderColor: `${COLORS.navy[4]}30`
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FiHelpCircle className="text-xl" style={{ color: COLORS.navy[4] }} />
              <h3 className="text-lg font-semibold" style={{ color: COLORS.navy[5] }}>Need Help?</h3>
            </div>
            <div className="space-y-3 text-sm" style={{ color: COLORS.navy[5] }}>
              <p>If you continue to experience issues, you can:</p>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.navy[4] }}></div>
                  Check the URL for typos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.navy[4] }}></div>
                  Use the search function to find content
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.navy[4] }}></div>
                  Browse through our main categories
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Help */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 right-6 z-20"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="backdrop-blur-xl border rounded-2xl p-4 shadow-2xl cursor-pointer"
          style={{
            backgroundColor: `${COLORS.navy[4]}20`,
            borderColor: `${COLORS.navy[4]}30`,
            boxShadow: `0 20px 40px ${COLORS.navy[4]}25`,
            color: COLORS.navy[4]
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FiNavigation className="text-2xl" />
        </motion.div>
      </motion.div>

      {/* Bottom Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t z-10"
        style={{
          backgroundColor: `${COLORS.navy[1]}80`,
          borderColor: COLORS.navy[3]
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm"
              style={{
                backgroundColor: `${COLORS.navy[5]}10`,
                borderColor: `${COLORS.navy[5]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiArrowLeft className="text-sm" />
              <span>Back</span>
            </button>
            
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm"
              style={{
                backgroundColor: `${COLORS.navy[5]}10`,
                borderColor: `${COLORS.navy[5]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiHome className="text-sm" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/search"
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm"
              style={{
                backgroundColor: `${COLORS.navy[5]}10`,
                borderColor: `${COLORS.navy[5]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiSearch className="text-sm" />
              <span>Search</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;