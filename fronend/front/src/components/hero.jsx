import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Spline from '@splinetool/react-spline';
import {
  FiSearch,
  FiBook,
  FiBookmark,
  FiUsers,
  FiUser,
  FiArrowRight,
  FiAward,
  FiTarget,
  FiZap,
  FiShield,
  FiFileText,
  FiHome
} from "react-icons/fi";
import {
  FaBalanceScale,
  FaLightbulb,
  FaBook,
  FaHandHoldingHeart
} from "react-icons/fa";

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

/* Enhanced animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2
    }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: COLORS.navy[1] }}>
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"
            style={{ backgroundColor: COLORS.navy[1] }}
          />
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-6 lg:px-20 pt-20">
        {/* Left Content */}
        <div className="max-w-2xl z-10 mt-10 lg:mt-0 text-center lg:text-left">
          {/* Enhanced Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border"
            style={{ 
              backgroundColor: `${COLORS.navy[4]}20`,
              borderColor: `${COLORS.navy[4]}30`,
              color: COLORS.navy[5]
            }}
          >
            <FiShield className="text-lg" />
            <span className="text-sm font-medium">Trusted Legal Guidance</span>
          </motion.div>

          {/* Enhanced Title */}
          <motion.h1
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"
            style={{ color: COLORS.navy[5] }}
          >
            Find Simple Answers.
            <br />
            <span 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold"
              style={{ color: COLORS.navy[4] }}
            >
              Know Your Rights.
            </span>
          </motion.h1>

          {/* Enhanced Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 max-w-2xl font-light"
            style={{ color: COLORS.navy[5] }}
          >
            <Typewriter
              words={[
                "Get the clarity and step-by-step guidance you need without the legal jargon.",
              ]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          </motion.p>

          {/* Enhanced Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/search"
                className="group flex items-center gap-3 font-semibold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 border"
                style={{ 
                  backgroundColor: COLORS.navy[4],
                  color: COLORS.navy[5],
                  borderColor: `${COLORS.navy[4]}50`,
                  boxShadow: `0 20px 40px ${COLORS.navy[4]}25`
                }}
              >
                <FiSearch className="text-xl text-black group-hover:scale-110 transition-transform" />
                Start Your Search
                <FiArrowRight className="text-lg text-black group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/category"
                className="group flex items-center gap-3 backdrop-blur-xl border font-semibold py-4 px-8 rounded-2xl transition-all duration-300"
                style={{ 
                  backgroundColor: `${COLORS.navy[5]}10`,
                  borderColor: `${COLORS.navy[5]}30`,
                  color: COLORS.navy[5]
                }}
              >
                <FiBook className="text-xl" />
                Browse Categories
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Search Bar Preview */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-md"
          >
            <div 
              className="p-4 rounded-2xl backdrop-blur-lg border"
              style={{ 
                backgroundColor: `${COLORS.navy[3]}30`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <div className="flex items-center gap-3 text-sm" style={{ color: COLORS.navy[5] }}>
                <FiSearch className="flex-shrink-0" />
                <span className="opacity-70">Ask your issue as a question: "My landlord won't return the deposit..."</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
          >
            {[
              { number: "500+", label: "Legal Guides" },
              { number: "50+", label: "Categories" },
              { number: "24/7", label: "Access" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: COLORS.navy[4] }}
                >{stat.number}</div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: COLORS.navy[5] }}
                >{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Right Side - Spline Scene */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full lg:w-[50%] h-[400px] sm:h-[500px] lg:h-[700px] mt-12 lg:mt-0 animate-float"
        >
          <Spline 
            scene="https://prod.spline.design/zHdL4fLC68VLmFBT/scene.splinecode"
            className="w-full h-full"
          />
          {/* Enhanced overlay gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 70% 50%, transparent 0%, ${COLORS.navy[1]} 70%)`
            }}
          />
        </motion.div>
      </main>

      {/* Enhanced Why LexEye Section */}
      <section className="py-20 px-6 lg:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 backdrop-blur-sm border"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiTarget className="text-lg" />
              <span className="text-sm font-medium">Our Mission</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              The Law Shouldn't Be a Mystery
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto font-light"
              style={{ color: COLORS.navy[5] }}
            >
              Making Pakistan's laws clear, accessible, and useful for everyone.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FaLightbulb className="text-3xl" />,
                title: "Simplicity First",
                description: "We translate complex legal statutes into clear, actionable steps without the jargon.",
                color: COLORS.navy[4]
              },
              {
                icon: <FaBook className="text-3xl" />,
                title: "Always Accessible",
                description: "Access essential legal guidance anytime, with offline capability when you need it most.",
                color: COLORS.navy[4]
              },
              {
                icon: <FaHandHoldingHeart className="text-3xl" />,
                title: "Practical Focus",
                description: "Real solutions for everyday situations - from tenant disputes to workplace rights.",
                color: COLORS.navy[4]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group rounded-2xl p-8 shadow-2xl transition-all duration-300 backdrop-blur-lg border"
                style={{ 
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}30`,
                  boxShadow: `0 20px 40px ${COLORS.navy[1]}50`
                }}
              >
                <div 
                  className="inline-flex p-4 rounded-2xl border mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ 
                    backgroundColor: `${feature.color}20`,
                    borderColor: `${feature.color}30`
                  }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: COLORS.navy[5] }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="leading-relaxed font-light"
                  style={{ color: COLORS.navy[5] }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section 
        className="py-20 px-6 lg:px-20 backdrop-blur-sm"
        style={{ backgroundColor: `${COLORS.navy[2]}30` }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 backdrop-blur-sm border"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiZap className="text-lg" />
              <span className="text-sm font-medium">Get Started</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              What Can You Do Right Now?
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <FiBook className="text-2xl" />,
                title: "Browse Guides",
                description: "Explore organized sections like Tenancy Rights and Workplace Disputes.",
                link: "/category",
              },
              {
                icon: <FiSearch className="text-2xl" />,
                title: "Quick Search",
                description: "Find rights and sections instantly using plain language questions.",
                link: "/search",
              },
              {
                icon: <FiBookmark className="text-2xl" />,
                title: "Save & Organize",
                description: "Bookmark important guides by creating your personal account.",
                link: "/signin",
              },
              {
                icon: <FiFileText className="text-2xl" />,
                title: "Learn Terms",
                description: "Understand simplified definitions of key legal terminology.",
                link: "/glossary",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <Link
                  to={feature.link}
                  className="group block rounded-2xl p-6 shadow-2xl transition-all duration-300 h-full backdrop-blur-lg border"
                  style={{ 
                    backgroundColor: `${COLORS.navy[2]}40`,
                    borderColor: `${COLORS.navy[4]}30`,
                    boxShadow: `0 15px 30px ${COLORS.navy[1]}30`
                  }}
                >
                  <div 
                    className="inline-flex p-3 rounded-2xl border mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3 group-hover:transition-colors"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed mb-4 font-light"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {feature.description}
                  </p>
                  <div 
                    className="flex items-center gap-2 transition-colors group-hover:font-semibold"
                    style={{ color: COLORS.navy[4] }}
                  >
                    <span className="text-sm">Explore</span>
                    <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              Guides for Real Life
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto font-light"
              style={{ color: COLORS.navy[5] }}
            >
              Direct access to clarity on everyday legal matters in Pakistan
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "💼",
                title: "Workplace Rights",
                description: "Harassment, unfair dismissal, and labor rights explained clearly.",
                link: "/laws?query=workplace",
                color: COLORS.navy[4]
              },
              {
                icon: "🚔",
                title: "Police Interactions",
                description: "Your rights during stops, searches, and FIR registration.",
                link: "/laws?query=police",
                color: COLORS.navy[4]
              },
              {
                icon: "🏠",
                title: "Tenancy Issues",
                description: "Rent agreements, security deposits, and eviction procedures.",
                link: "/laws?query=landlord",
                color: COLORS.navy[4]
              },
              {
                icon: "🛡️",
                title: "Harassment Protection",
                description: "Legal safeguards and complaint procedures for harassment cases.",
                link: "/laws?query=harassment",
                color: COLORS.navy[4]
              },
              {
                icon: "🛒",
                title: "Consumer Rights",
                description: "Refunds, fraud protection, and your rights as a buyer.",
                link: "/laws?query=consumer",
                color: COLORS.navy[4]
              },
              {
                icon: "📄",
                title: "Property Matters",
                description: "Ownership transfers, documentation, and dispute resolution.",
                link: "/laws?query=property",
                color: COLORS.navy[4]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <Link
                  to={category.link}
                  className="group block rounded-2xl p-6 shadow-2xl transition-all duration-300 h-full backdrop-blur-lg border"
                  style={{ 
                    backgroundColor: `${COLORS.navy[2]}40`,
                    borderColor: `${category.color}30`,
                    boxShadow: `0 15px 30px ${COLORS.navy[1]}30`
                  }}
                >
                  <div className="text-3xl mb-4">{category.icon}</div>
                  <h3 
                    className="text-xl font-bold mb-3 transition-colors"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {category.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed font-light"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/category"
                className="inline-flex items-center gap-3 font-semibold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 border"
                style={{ 
                  backgroundColor: COLORS.navy[4],
                  color: COLORS.navy[5],
                  borderColor: `${COLORS.navy[4]}50`,
                  boxShadow: `0 20px 40px ${COLORS.navy[4]}25`
                }}
              >
                Explore All Guides
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section 
        className="py-20 px-6 lg:px-20 backdrop-blur-sm"
        style={{ 
          backgroundColor: `${COLORS.navy[3]}20`,
          backgroundImage: `linear-gradient(135deg, ${COLORS.navy[3]}15 0%, ${COLORS.navy[2]}25 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div 
              className="inline-flex p-4 rounded-2xl border mb-6"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <FiAward className="text-3xl" style={{ color: COLORS.navy[4] }} />
            </div>
            <h2 
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              Master Your <span style={{ color: COLORS.navy[4] }}>Rights</span>
            </h2>
            <p 
              className="text-xl mb-8 max-w-2xl mx-auto font-light"
              style={{ color: COLORS.navy[5] }}
            >
              Take the first step toward legal confidence. Your personalized library awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-3 font-semibold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 border"
                  style={{ 
                    backgroundColor: COLORS.navy[4],
                    color: COLORS.navy[5],
                    borderColor: `${COLORS.navy[4]}50`,
                    boxShadow: `0 20px 40px ${COLORS.navy[4]}25`
                  }}
                >
                  <FiUser className="text-xl" />
                  Sign In to Access Saved Guides
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 backdrop-blur-xl border font-semibold py-4 px-8 rounded-2xl transition-all duration-300"
                  style={{ 
                    backgroundColor: `${COLORS.navy[5]}10`,
                    borderColor: `${COLORS.navy[5]}30`,
                    color: COLORS.navy[5]
                  }}
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Floating Animation CSS */}
      <style jsx>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;