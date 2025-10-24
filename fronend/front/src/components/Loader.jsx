import { motion } from "framer-motion";
import  logo  from "/logo-2.png";

/* Color Constants matching your palette */
const COLORS = {
  navy: {
    1: '#0D1B2A',
    2: '#1D2D44',
    3: '#3E5C76',
    4: '#748CAB',
    5: '#F0EBD8'
  }
};

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
      y: [0, -12, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center mb-[5%] min-h-[60vh] gap-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{ backgroundColor: COLORS.navy[1] }}
    >
      {/* Main Loader Container */}
      <div className="relative flex items-center mt-[10%] justify-center">
        {/* Outer Glow Effect */}
        <motion.div 
          className="absolute w-44 h-44 rounded-full blur-xl"
          style={{ backgroundColor: `${COLORS.navy[4]}20` }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated Rings */}
        <motion.div
          variants={ringVariants}
          className="relative flex items-center justify-center"
        >
          {/* Outer Ring */}
          <div 
            className="w-36 h-36 border-4 rounded-full"
            style={{ borderColor: `${COLORS.navy[4]}30` }}
          />
          
          {/* Spinning Ring */}
          <motion.div
            className="absolute w-36 h-36 border-4 rounded-full"
            style={{
              borderTopColor: COLORS.navy[4],
              borderRightColor: 'transparent',
              borderBottomColor: COLORS.navy[3],
              borderLeftColor: 'transparent'
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner Pulse Ring */}
          <motion.div
            className="absolute w-28 h-28 border-2 rounded-full"
            style={{ borderColor: `${COLORS.navy[4]}50` }}
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
          <motion.div
            variants={iconVariants}
            animate={["animate", "pulse"]}
            className="absolute w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-xl border"
            style={{
              backgroundColor: `${COLORS.navy[2]}80`,
              borderColor: `${COLORS.navy[4]}30`
            }}
          >
            <img
              className="text-4xl"
              src={logo}
              alt="LexEye Logo"
            />
          </motion.div>
        </motion.div>
        
        {/* Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: COLORS.navy[4],
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
          className="text-xl font-semibold mb-2"
          style={{ color: COLORS.navy[5] }}
          variants={textVariants}
          animate="animate"
        >
          Loading LexEye
        </motion.h3>
        <motion.p 
          className="text-sm"
          style={{ color: COLORS.navy[4] }}
          variants={textVariants}
          animate="animate"
        >
          Preparing your legal intelligence...
        </motion.p>
      </motion.div>

      {/* Enhanced Progress Bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "200px" }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="h-2 rounded-full overflow-hidden backdrop-blur-xl border"
        style={{
          backgroundColor: `${COLORS.navy[2]}80`,
          borderColor: `${COLORS.navy[4]}20`
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${COLORS.navy[4]}, ${COLORS.navy[3]})`
          }}
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

      {/* Additional Loading Dots */}
      <motion.div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: COLORS.navy[4] }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </motion.div>
  );
};

export default Loader;