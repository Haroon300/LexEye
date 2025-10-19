import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiHome, 
  FiBookmark, 
  FiSearch,
  FiCompass,
  FiCloudOff
} from "react-icons/fi";

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
    <div className="min-h-screen pt-[8%] bg-gradient-to-br from-[#051c1f] via-[#08292e] to-[#0a1b1f] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-pink-500/10 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* Floating 404 Numbers */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl font-black text-white/5 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
              <div className="absolute inset-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl -inset-8" />
              
              {/* Main 404 Container */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl"
              >
                <h1 className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">
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
                      className="absolute w-8 h-8 bg-purple-500/20 rounded-xl border border-purple-400/30 flex items-center justify-center"
                      style={{
                        top: '20%',
                        left: '50%',
                        transform: `rotate(${i * 90}deg) translateX(80px) rotate(-${i * 90}deg)`,
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
                      <Icon className="text-purple-400 text-sm" />
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            
            <div className="space-y-4 text-lg text-gray-300 max-w-xl mx-auto">
              <p>
                It seems you've ventured into uncharted territory. The page you're looking for 
                doesn't exist or may have been moved.
              </p>
              <p className="text-gray-400 text-sm">
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
                className="group flex flex-col items-center gap-3 bg-cyan-500/20 backdrop-blur-xl border border-cyan-400/30 text-cyan-300 rounded-2xl p-6 hover:bg-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <div className="p-3 bg-cyan-500/30 rounded-2xl border border-cyan-400/30 group-hover:scale-110 transition-transform">
                  <FiHome className="text-2xl" />
                </div>
                <span className="font-semibold">Go Home</span>
                <span className="text-cyan-200/70 text-sm">Start fresh</span>
              </Link>
            </motion.div>

            {/* Bookmarks Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/bookmarks"
                className="group flex flex-col items-center gap-3 bg-green-500/20 backdrop-blur-xl border border-green-400/30 text-green-300 rounded-2xl p-6 hover:bg-green-500/30 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                <div className="p-3 bg-green-500/30 rounded-2xl border border-green-400/30 group-hover:scale-110 transition-transform">
                  <FiBookmark className="text-2xl" />
                </div>
                <span className="font-semibold">Bookmarks</span>
                <span className="text-green-200/70 text-sm">Your saved content</span>
              </Link>
            </motion.div>

            {/* Search Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/search"
                className="group flex flex-col items-center gap-3 bg-purple-500/20 backdrop-blur-xl border border-purple-400/30 text-purple-300 rounded-2xl p-6 hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <div className="p-3 bg-purple-500/30 rounded-2xl border border-purple-400/30 group-hover:scale-110 transition-transform">
                  <FiSearch className="text-2xl" />
                </div>
                <span className="font-semibold">Search</span>
                <span className="text-purple-200/70 text-sm">Find what you need</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md mx-auto"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <FiCompass className="text-cyan-400" />
              Quick Navigation
            </h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {[
                { to: "/glossary", label: "Glossary" },
                { to: "/categories", label: "Categories" },
                { to: "/faq", label: "FAQ" },
                { to: "/about", label: "About" }
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              Still lost?{" "}
              <button 
                onClick={() => window.history.back()}
                className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
              >
                Go back to previous page
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Help */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 right-6"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-cyan-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-4 text-cyan-300 shadow-2xl shadow-cyan-500/20"
        >
          <FiCompass className="text-2xl" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;