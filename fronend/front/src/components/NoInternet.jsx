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
    <div className="min-h-screen pt-[8%] bg-gradient-to-br from-[#051c1f] via-[#08292e] to-[#0a1b1f] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-orange-500/10 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-amber-500/10 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
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
                className="absolute inset-0 w-32 h-32 bg-red-500/20 rounded-full"
              />
              
              {/* Main Icon Container */}
              <div className="relative bg-red-500/20 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8 shadow-2xl shadow-red-500/20">
                <MdSignalWifiOff className="text-6xl text-red-400" />
                
                {/* Small Icons Around */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-6 h-6 bg-red-400/30 rounded-full flex items-center justify-center"
                      style={{
                        top: '10%',
                        left: '50%',
                        transform: `rotate(${i * 90}deg) translateX(60px) rotate(-${i * 90}deg)`,
                      }}
                    >
                      <FiWifi className="text-red-400 text-xs" />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-200 to-orange-200 text-transparent bg-clip-text mb-6">
              Connection Lost
            </h1>
            
            <div className="space-y-4 text-lg text-gray-300 max-w-xl mx-auto">
              <p>
                It seems you've lost connection to the internet. 
                Don't worry, your saved content is still accessible.
              </p>
              <p className="text-gray-400 text-sm">
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
                className="group flex items-center gap-3 bg-cyan-500/20 backdrop-blur-xl border border-cyan-400/30 text-cyan-300 rounded-2xl px-8 py-4 font-semibold hover:bg-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <FiBookmark className="text-xl group-hover:scale-110 transition-transform" />
                View Bookmarks
                <span className="text-cyan-200/70 text-sm">(Available Offline)</span>
              </Link>
            </motion.div>

            {/* Retry Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl px-8 py-4 font-semibold hover:bg-white/20 hover:shadow-lg transition-all duration-300"
            >
              <MdRefresh className="text-xl group-hover:rotate-180 transition-transform duration-500" />
              Retry Connection
            </motion.button>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md mx-auto"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <FiSettings className="text-cyan-400" />
              Quick Tips
            </h3>
            <ul className="text-gray-400 text-sm space-y-2 text-left">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                Check your Wi-Fi or mobile data connection
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                Try turning airplane mode on and off
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                Restart your router if possible
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
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
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
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
        className="fixed bottom-6 z-50 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-2 text-red-300 text-sm"
      >
        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
        Offline Mode
      </motion.div>
    </div>
  );
};

export default NoInternet;