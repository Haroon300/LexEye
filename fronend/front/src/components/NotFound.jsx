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
    <div className="min-h-screen pt-[8%] bg-gradient-to-br from-[#0D1B2A] via-[#1D2D44] to-[#3E5C76] text-[#F0EBD8] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#748CAB]/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-[#3E5C76]/20 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-[#1D2D44]/20 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* Floating 404 Numbers */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl font-black text-[#F0EBD8]/5 pointer-events-none"
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
              <div className="absolute inset-0 w-48 h-48 bg-[#748CAB]/20 rounded-full blur-2xl" />
              
              {/* Main 404 Container */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl"
              >
                <h1 className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-[#F0EBD8] via-[#F0EBD8] to-[#748CAB] text-transparent bg-clip-text">
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
                      className="absolute w-8 h-8 bg-[#748CAB]/20 rounded-xl border border-[#748CAB]/30 flex items-center justify-center"
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
                      <Icon className="text-[#748CAB] text-sm" />
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EBD8] mb-4">
              Page Not Found
            </h2>
            
            <div className="space-y-4 text-lg text-[#F0EBD8]/80 max-w-xl mx-auto">
              <p>
                It seems you've ventured into uncharted territory. The page you're looking for 
                doesn't exist or may have been moved.
              </p>
              <p className="text-[#F0EBD8]/60 text-sm">
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
                className="group flex flex-col items-center gap-3 bg-[#748CAB]/20 backdrop-blur-xl border border-[#748CAB]/30 text-[#748CAB] rounded-2xl p-6 hover:bg-[#748CAB]/30 hover:shadow-lg hover:shadow-[#748CAB]/25 transition-all duration-300"
              >
                <div className="p-3 bg-[#748CAB]/30 rounded-2xl border border-[#748CAB]/30 group-hover:scale-110 transition-transform">
                  <FiHome className="text-2xl" />
                </div>
                <span className="font-semibold">Go Home</span>
                <span className="text-[#748CAB]/70 text-sm">Start fresh</span>
              </Link>
            </motion.div>

            {/* Search Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/search"
                className="group flex flex-col items-center gap-3 bg-[#3E5C76]/20 backdrop-blur-xl border border-[#3E5C76]/30 text-[#3E5C76] rounded-2xl p-6 hover:bg-[#3E5C76]/30 hover:shadow-lg hover:shadow-[#3E5C76]/25 transition-all duration-300"
              >
                <div className="p-3 bg-[#3E5C76]/30 rounded-2xl border border-[#3E5C76]/30 group-hover:scale-110 transition-transform">
                  <FiSearch className="text-2xl" />
                </div>
                <span className="font-semibold">Search</span>
                <span className="text-[#3E5C76]/70 text-sm">Find what you need</span>
              </Link>
            </motion.div>

            {/* Back Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.history.back()}
                className="group flex flex-col items-center gap-3 bg-[#1D2D44]/20 backdrop-blur-xl border border-[#1D2D44]/30 text-[#1D2D44] rounded-2xl p-6 hover:bg-[#1D2D44]/30 hover:shadow-lg hover:shadow-[#1D2D44]/25 transition-all duration-300 w-full"
              >
                <div className="p-3 bg-[#1D2D44]/30 rounded-2xl border border-[#1D2D44]/30 group-hover:scale-110 transition-transform">
                  <FiArrowLeft className="text-2xl" />
                </div>
                <span className="font-semibold">Go Back</span>
                <span className="text-[#1D2D44]/70 text-sm">Previous page</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md mx-auto mb-8"
          >
            <h3 className="text-lg font-semibold text-[#F0EBD8] mb-4 flex items-center justify-center gap-2">
              <FiNavigation className="text-[#748CAB]" />
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
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#F0EBD8]/80 hover:text-[#F0EBD8] transition-all duration-300"
                >
                  <link.icon className="text-[#748CAB] text-xs" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-[#1D2D44]/50 to-[#3E5C76]/50 backdrop-blur-xl border border-[#748CAB]/20 rounded-2xl p-6 max-w-lg mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FiHelpCircle className="text-[#748CAB] text-xl" />
              <h3 className="text-lg font-semibold text-[#F0EBD8]">Need Help?</h3>
            </div>
            <div className="space-y-3 text-sm text-[#F0EBD8]/80">
              <p>If you continue to experience issues, you can:</p>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#748CAB] rounded-full"></div>
                  Check the URL for typos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#748CAB] rounded-full"></div>
                  Use the search function to find content
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#748CAB] rounded-full"></div>
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
          className="bg-[#748CAB]/20 backdrop-blur-xl border border-[#748CAB]/30 rounded-2xl p-4 text-[#748CAB] shadow-2xl shadow-[#748CAB]/20 cursor-pointer"
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
        className="fixed bottom-0 left-0 right-0 bg-[#0D1B2A]/80 backdrop-blur-xl border-t border-[#1D2D44] z-10"
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-[#1D2D44]/50 border border-[#3E5C76] rounded-xl text-[#F0EBD8] hover:bg-[#1D2D44] transition-all duration-300"
            >
              <FiArrowLeft className="text-sm" />
              <span className="text-sm">Back</span>
            </button>
            
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-[#748CAB]/20 border border-[#748CAB] rounded-xl text-[#F0EBD8] hover:bg-[#748CAB]/30 transition-all duration-300"
            >
              <FiHome className="text-sm" />
              <span className="text-sm">Home</span>
            </Link>
            
            <Link
              to="/search"
              className="flex items-center gap-2 px-4 py-2 bg-[#3E5C76]/20 border border-[#3E5C76] rounded-xl text-[#F0EBD8] hover:bg-[#3E5C76]/30 transition-all duration-300"
            >
              <FiSearch className="text-sm" />
              <span className="text-sm">Search</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;