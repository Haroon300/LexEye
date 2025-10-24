import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MdSignalWifiOff, 
  MdRefresh
} from "react-icons/md";
import { 
  FiWifi, 
  FiBookmark, 
  FiHome,
  FiSettings 
} from "react-icons/fi";

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

const NoInternet = () => {
  const handleRetry = () => {
    window.location.reload();
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

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* Animated Connection Lines */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: '10%',
                right: '10%',
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl w-full text-center"
        >
          {/* Animated Icon */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              {/* Outer Ring */}
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="absolute inset-0 w-32 h-32 rounded-full"
                style={{ backgroundColor: `${COLORS.navy[3]}20` }}
              />
              
              {/* Main Icon Container */}
              <div 
                className="relative backdrop-blur-xl border rounded-3xl p-8 shadow-2xl"
                style={{
                  backgroundColor: `${COLORS.navy[2]}80`,
                  borderColor: `${COLORS.navy[3]}30`
                }}
              >
                <MdSignalWifiOff className="text-6xl" style={{ color: COLORS.navy[3] }} />
                
                {/* Small Icons Around */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${COLORS.navy[3]}30`,
                        top: '10%',
                        left: '50%',
                        transform: `rotate(${i * 90}deg) translateX(60px) rotate(-${i * 90}deg)`,
                      }}
                    >
                      <FiWifi className="text-xs" style={{ color: COLORS.navy[3] }} />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6" style={{ color: COLORS.navy[5] }}>
              Connection Lost
            </h1>
            
            <div className="space-y-4 text-lg max-w-xl mx-auto">
              <p style={{ color: COLORS.navy[5] }}>
                It seems you've lost connection to the internet. 
                Don't worry, your saved content is still accessible.
              </p>
              <p className="text-sm" style={{ color: COLORS.navy[4] }}>
                Check your network settings or try refreshing the page
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {/* Bookmarks Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/bookmarks"
                className="group flex items-center gap-3 backdrop-blur-xl border rounded-2xl px-8 py-4 font-semibold transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`,
                  color: COLORS.navy[4]
                }}
              >
                <FiBookmark className="text-xl group-hover:scale-110 transition-transform" />
                View Bookmarks
                <span className="text-sm" style={{ color: `${COLORS.navy[4]}80` }}>(Available Offline)</span>
              </Link>
            </motion.div>

            {/* Retry Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="group flex items-center gap-3 backdrop-blur-xl border rounded-2xl px-8 py-4 font-semibold transition-all duration-300"
              style={{
                backgroundColor: `${COLORS.navy[2]}80`,
                borderColor: `${COLORS.navy[4]}30`,
                color: COLORS.navy[5]
              }}
            >
              <MdRefresh className="text-xl group-hover:rotate-180 transition-transform duration-500" />
              Retry Connection
            </motion.button>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl border rounded-2xl p-6 max-w-md mx-auto"
            style={{
              backgroundColor: `${COLORS.navy[2]}40`,
              borderColor: `${COLORS.navy[4]}20`
            }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2" style={{ color: COLORS.navy[5] }}>
              <FiSettings style={{ color: COLORS.navy[4] }} />
              Quick Tips
            </h3>
            <ul className="text-sm space-y-2 text-left">
              <li className="flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.navy[4] }} />
                Check your Wi-Fi or mobile data connection
              </li>
              <li className="flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.navy[4] }} />
                Try turning airplane mode on and off
              </li>
              <li className="flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.navy[4] }} />
                Restart your router if possible
              </li>
              <li className="flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.navy[4] }} />
                Access bookmarks and saved content offline
              </li>
            </ul>
          </motion.div>

          {/* Home Link */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 transition-colors duration-300 group"
              style={{ color: COLORS.navy[4] }}
            >
              <FiHome className="group-hover:-translate-x-1 transition-transform" />
              Return to Homepage
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Connection Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 z-50 left-1/2 transform -translate-x-1/2 flex items-center gap-2 border rounded-full px-4 py-2 text-sm backdrop-blur-xl"
        style={{
          backgroundColor: `${COLORS.navy[3]}20`,
          borderColor: `${COLORS.navy[3]}30`,
          color: COLORS.navy[3]
        }}
      >
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: COLORS.navy[3] }} />
        Offline Mode
      </motion.div>
    </div>
  );
};

export default NoInternet;