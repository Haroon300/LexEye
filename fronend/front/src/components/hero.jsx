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
  FiHome,
  FiBriefcase,
  FiShield as FiPolice,
  FiHome as FiHouse,
  FiUserCheck,
  FiShoppingCart,
  FiMapPin
} from "react-icons/fi";
import {
  FaBalanceScale,
  FaLightbulb,
  FaBook,
  FaHandHoldingHeart
} from "react-icons/fa";

/* Original Color Constants */
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl -top-10 -left-10 md:-top-20 md:-left-20 bg-[#0e877d]/25"
        />
        <div 
          className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full blur-3xl top-1/4 -right-10 md:top-1/3 md:-right-20 bg-[#0e877d]/15"
        />
        <div 
          className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl bottom-10 left-1/4 md:bottom-20 bg-[#0e877d]/25"
        />
      </div>

      {/* Enhanced Hero Section - Mobile First */}
      <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-4 sm:px-6 lg:px-8 xl:px-20 pt-16 lg:pt-20 z-10">
        {/* Left Content */}
        <div className="max-w-2xl z-10 mt-8 lg:mt-4 text-center lg:text-left w-full">
          {/* Enhanced Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm border mx-auto lg:mx-0"
            style={{ 
              backgroundColor: `${COLORS.navy[4]}20`,
              borderColor: `${COLORS.navy[4]}30`,
              color: COLORS.navy[5]
            }}
          >
            <FiShield className="text-sm md:text-lg" />
            <span className="text-xs md:text-sm font-medium">Trusted Legal Guidance</span>
          </motion.div>

          {/* Enhanced Title */}
          <motion.section className="text-center lg:text-left py-8 md:py-10 lg:py-12 px-2">
            {/* Heading */}
            <motion.h1
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight"
            >
              Find <span style={{ color: "#ffffff" }}>Simple Legal Answers</span>.
              <br />
              <span
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold block mt-2 md:mt-4"
                style={{ color: "#E8F9F7" }}
              >
                Know Your Rights in Pakistan.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light mx-auto lg:mx-0"
              style={{
                color: "#ffffff",
                minHeight: "72px",
              }}
            >
              <Typewriter
                words={[
                  "Understand your legal rights — clear and simple.",
                  "No legal jargon, just easy guidance.",
                  "Learn what the law says about your problem.",
                ]}
                loop={true}
                typeSpeed={50}
                deleteSpeed={30}
                pauseFor={2000}
                delaySpeed={1000}
              />
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              {/* Start Search Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/search"
                  className="group flex items-center justify-center gap-2 md:gap-3 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl shadow-2xl transition-all duration-300 border text-sm md:text-base w-full sm:w-auto"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#0E877D",
                    borderColor: "#ffffff50",
                    boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
                  }}
                >
                  <FiSearch className="text-lg md:text-xl text-[#0E877D] group-hover:scale-110 transition-transform" />
                  <span>Start Search</span>
                  <FiArrowRight className="text-base md:text-lg text-[#0E877D] group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Browse Categories Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/category"
                  className="group flex items-center justify-center gap-2 md:gap-3 backdrop-blur-xl border font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 text-sm md:text-base w-full sm:w-auto"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "#ffffff",
                  }}
                >
                  <FiBook className="text-lg md:text-xl" />
                  <span>Browse Categories</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Enhanced Search Bar Preview */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-md mx-auto lg:mx-0"
          >
            <div 
              className="p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-lg border"
              style={{ 
                backgroundColor: `${COLORS.navy[3]}30`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm" style={{ color: COLORS.navy[5] }}>
                <FiSearch className="flex-shrink-0 opacity-70" />
                <span className="opacity-80">Ask your issue: "My landlord won't return the deposit..."</span>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 mb-5 justify-center lg:justify-start"
          >
            {[
              { number: "500+", label: "Legal Guides" },
              { number: "50+", label: "Categories" },
              { number: "24/7", label: "Access" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-xl md:text-2xl font-bold mb-1"
                  style={{ color: COLORS.navy[4] }}
                >{stat.number}</div>
                <div 
                  className="text-xs md:text-sm font-medium opacity-80"
                  style={{ color: COLORS.navy[5] }}
                >{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side - Spline Scene */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative w-full lg:w-[45%] h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] mt-8 md:mt-12 lg:mt-0 animate-float"
        >
          <Spline 
            scene="https://prod.spline.design/zHdL4fLC68VLmFBT/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </main>

      {/* Enhanced Why LexEye Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 relative" style={{ backgroundColor: `${COLORS.navy[1]}` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div 
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4 backdrop-blur-sm border"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiTarget className="text-sm md:text-lg" />
              <span className="text-xs md:text-sm font-medium">Our Mission</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              The Law Shouldn't Be a Mystery
            </h2>
            <p 
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light opacity-90 px-4"
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
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          >
            {[
              {
                icon: <FaLightbulb className="text-2xl md:text-3xl" />,
                title: "Simplicity First",
                description: "We translate complex legal statutes into clear, actionable steps without the jargon.",
                color: COLORS.navy[4]
              },
              {
                icon: <FaBook className="text-2xl md:text-3xl" />,
                title: "Always Accessible",
                description: "Access essential legal guidance anytime, with offline capability when you need it most.",
                color: COLORS.navy[4]
              },
              {
                icon: <FaHandHoldingHeart className="text-2xl md:text-3xl" />,
                title: "Practical Focus",
                description: "Real solutions for everyday situations - from tenant disputes to workplace rights.",
                color: COLORS.navy[4]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="group rounded-xl md:rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-300 backdrop-blur-lg border"
                style={{ 
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}30`,
                  boxShadow: `0 20px 40px ${COLORS.navy[1]}50`
                }}
              >
                <div 
                  className="inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl border mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-300"
                  style={{ 
                    backgroundColor: `${feature.color}20`,
                    borderColor: `${feature.color}30`
                  }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3 md:mb-4"
                  style={{ color: COLORS.navy[5] }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-sm md:text-base leading-relaxed font-light opacity-90"
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
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 backdrop-blur-sm"
        style={{ backgroundColor: `${COLORS.navy[2]}30` }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div 
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4 backdrop-blur-sm border"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiZap className="text-sm md:text-lg" />
              <span className="text-xs md:text-sm font-medium">Get Started</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              {
                icon: <FiBook className="text-xl md:text-2xl" />,
                title: "Browse Guides",
                description: "Explore organized sections like Tenancy Rights and Workplace Disputes.",
                link: "/category",
              },
              {
                icon: <FiSearch className="text-xl md:text-2xl" />,
                title: "Quick Search",
                description: "Find rights and sections instantly using plain language questions.",
                link: "/search",
              },
              {
                icon: <FiBookmark className="text-xl md:text-2xl" />,
                title: "Save & Organize",
                description: "Bookmark important guides by creating your personal account.",
                link: "/signin",
              },
              {
                icon: <FiFileText className="text-xl md:text-2xl" />,
                title: "Learn Terms",
                description: "Understand simplified definitions of key legal terminology.",
                link: "/glossary",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={feature.link}
                  className="group block rounded-xl md:rounded-2xl p-5 md:p-6 shadow-2xl transition-all duration-300 h-full backdrop-blur-lg border hover:shadow-2xl"
                  style={{ 
                    backgroundColor: `${COLORS.navy[2]}40`,
                    borderColor: `${COLORS.navy[4]}30`,
                    boxShadow: `0 15px 30px ${COLORS.navy[1]}30`
                  }}
                >
                  <div 
                    className="inline-flex p-2 md:p-3 rounded-xl md:rounded-2xl border mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 
                    className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:transition-colors"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-xs md:text-sm leading-relaxed mb-3 md:mb-4 font-light opacity-90"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {feature.description}
                  </p>
                  <div 
                    className="flex items-center gap-2 transition-colors group-hover:font-semibold"
                    style={{ color: COLORS.navy[4] }}
                  >
                    <span className="text-xs md:text-sm">Explore</span>
                    <FiArrowRight className="text-xs md:text-sm group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              Guides for Real Life
            </h2>
            <p 
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light opacity-90 px-4"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {[
              {
                icon: <FiBriefcase className="text-2xl md:text-3xl" />,
                title: "Workplace Rights",
                description: "Harassment, unfair dismissal, and labor rights explained clearly.",
                link: "/laws?query=workplace",
                color: COLORS.navy[4]
              },
              {
                icon: <FiPolice className="text-2xl md:text-3xl" />,
                title: "Police Interactions",
                description: "Your rights during stops, searches, and FIR registration.",
                link: "/laws?query=police",
                color: COLORS.navy[4]
              },
              {
                icon: <FiHouse className="text-2xl md:text-3xl" />,
                title: "Tenancy Issues",
                description: "Rent agreements, security deposits, and eviction procedures.",
                link: "/laws?query=landlord",
                color: COLORS.navy[4]
              },
              {
                icon: <FiShield className="text-2xl md:text-3xl" />,
                title: "Harassment Protection",
                description: "Legal safeguards and complaint procedures for harassment cases.",
                link: "/laws?query=harassment",
                color: COLORS.navy[4]
              },
              {
                icon: <FiShoppingCart className="text-2xl md:text-3xl" />,
                title: "Consumer Rights",
                description: "Refunds, fraud protection, and your rights as a buyer.",
                link: "/laws?query=consumer",
                color: COLORS.navy[4]
              },
              {
                icon: <FiMapPin className="text-2xl md:text-3xl" />,
                title: "Property Matters",
                description: "Ownership transfers, documentation, and dispute resolution.",
                link: "/laws?query=property",
                color: COLORS.navy[4]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={category.link}
                  className="group block rounded-xl md:rounded-2xl p-5 md:p-6 shadow-2xl transition-all duration-300 h-full backdrop-blur-lg border hover:shadow-2xl"
                  style={{ 
                    backgroundColor: `${COLORS.navy[2]}40`,
                    borderColor: `${category.color}30`,
                    boxShadow: `0 15px 30px ${COLORS.navy[1]}30`
                  }}
                >
                  <div 
                    className="inline-flex p-2 md:p-3 rounded-xl md:rounded-2xl border mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      borderColor: `${category.color}30`
                    }}
                  >
                    {category.icon}
                  </div>
                  <h3 
                    className="text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {category.title}
                  </h3>
                  <p 
                    className="text-xs md:text-sm leading-relaxed font-light opacity-90"
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
            className="text-center mt-10 md:mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/category"
                className="inline-flex items-center gap-2 md:gap-3 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl shadow-2xl transition-all duration-300 border text-sm md:text-base"
                style={{ 
                  backgroundColor: COLORS.navy[4],
                  color: COLORS.navy[5],
                  borderColor: `${COLORS.navy[4]}50`,
                  boxShadow: `0 20px 40px ${COLORS.navy[4]}25`
                }}
              >
                <span className="text-black">Explore All Guides</span>
                <FiArrowRight className="text-base md:text-lg text-black group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section 
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 backdrop-blur-sm"
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
              className="inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl border mb-4 md:mb-6 mx-auto"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <FiAward className="text-2xl md:text-3xl" style={{ color: COLORS.navy[4] }} />
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              Master Your <span style={{ color: COLORS.navy[4] }}>Rights</span>
            </h2>
            <p 
              className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto font-light opacity-90 px-4"
              style={{ color: COLORS.navy[5] }}
            >
              Take the first step toward legal confidence. Your personalized library awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 md:gap-3 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl shadow-2xl transition-all duration-300 border text-sm md:text-base w-full sm:w-auto"
                  style={{ 
                    backgroundColor: COLORS.navy[4],
                    color: COLORS.navy[5],
                    borderColor: `${COLORS.navy[4]}50`,
                    boxShadow: `0 20px 40px ${COLORS.navy[4]}25`
                  }}
                >
                  <FiUser className="text-lg md:text-xl text-black" />
                  <span className="text-black">Sign In to Access Saved Guides</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 md:gap-3 backdrop-blur-xl border font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 text-sm md:text-base w-full sm:w-auto"
                  style={{ 
                    backgroundColor: `${COLORS.navy[5]}10`,
                    borderColor: `${COLORS.navy[5]}30`,
                    color: COLORS.navy[5]
                  }}
                >
                  <span>Learn More</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Floating Animation CSS */}
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;