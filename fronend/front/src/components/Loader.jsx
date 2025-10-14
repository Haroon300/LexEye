import { motion } from "framer-motion";
import icon from '/logo-2.png';

const Loader = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const ringVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Main Loader Container */}
      <div className="relative flex items-center mt-[5%] justify-center">
        {/* Outer Glow Effect */}
        <div className="absolute w-44 h-44 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
        
        {/* Animated Rings */}
        <motion.div
          variants={ringVariants}
          className="relative flex items-center justify-center"
        >
          {/* Outer Ring */}
          <div className="w-36 h-36 border-4 border-cyan-400/30 rounded-full" />
          
          {/* Spinning Ring */}
          <motion.div
            className="absolute w-36 h-36 border-4 border-t-cyan-400 border-r-transparent border-b-cyan-600 border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner Pulse Ring */}
          <motion.div
            className="absolute w-28 h-28 border-2 border-cyan-400/50 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Center Icon */}
          <motion.img
            src={icon}
            alt="Loading"
            variants={iconVariants}
            animate={["animate", "pulse"]}
            className="absolute w-20 h-20 rounded-lg"
          />
        </motion.div>
        
        {/* Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              top: `${Math.sin((i * Math.PI) / 2) * 50 + 50}%`,
              left: `${Math.cos((i * Math.PI) / 2) * 50 + 50}%`,
            }}
            variants={dotVariants}
            animate="animate"
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <motion.h3 
          className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading LexEye
        </motion.h3>
        
        {/* Animated Dots */}
        <div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="text-cyan-400 text-lg"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              .
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "200px" }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="h-1 bg-gray-700 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;