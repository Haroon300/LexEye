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

/* Enhanced Color Palette */
const COLORS = {
  navy: {
    1: '#0a0a0a',
    2: '#1a1a2e',
    3: '#16213e',
    4: '#0f3460',
    5: '#e6e6e9',
    6: '#f8f9fa'
  },
  accent: {
    primary: '#0E877D',
    secondary: '#0a6159',
    light: '#E8F9F7',
    teal: '#14b8a6'
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
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl -top-10 -left-10 md:-top-20 md:-left-20"
          style={{ backgroundColor: `${COLORS.accent.primary}20` }}
        />
        <div 
          className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full blur-3xl top-1/4 -right-10 md:top-1/3 md:-right-20"
          style={{ backgroundColor: `${COLORS.accent.primary}15` }}
        />
        <div 
          className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl bottom-10 left-1/4 md:bottom-20"
          style={{ backgroundColor: `${COLORS.accent.primary}20` }}
        />
      </div>

      {/* Enhanced Hero Section - Mobile First */}
      <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-4 sm:px-6 lg:px-8 xl:px-20 pt-16 lg:pt-20 z-10">
        {/* Left Content */}
        <div className="max-w-2xl z-10 mt-8 lg:mt-0 text-center lg:text-left w-full">
          {/* Enhanced Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm border mx-auto lg:mx-0"
            style={{ 
              backgroundColor: `${COLORS.accent.light}15`,
              borderColor: `${COLORS.accent.primary}30`,
              color: COLORS.accent.light
            }}
          >
            <FiShield className="text-sm md:text-lg" />
            <span className="text-xs md:text-sm font-medium">Trusted Legal Guidance</span>
          </motion.div>

          {/* Enhanced Title */}
          <motion.section className="text-center lg:text-left py-8 md:py-12 lg:py-20 px-2">
            {/* Heading */}
            <motion.h1
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight"
            >
              Find <span style={{ color: COLORS.accent.light }}>Simple Legal Answers</span>.
              <br />
              <span
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold block mt-2 md:mt-4"
                style={{ color: COLORS.accent.light }}
              >
                Know Your Rights in Pakistan.
              </span>
            </motion.h1>

            {/* Urdu Translation */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 leading-relaxed"
              style={{ color: COLORS.accent.light }}
            >
              آسان قانونی جوابات حاصل کریں۔
              <br />
              پاکستان میں اپنے حقوق جانیے۔
            </motion.p>

            {/* Description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 max-w-2xl font-light mx-auto lg:mx-0"
              style={{
                color: COLORS.navy[6],
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

            {/* Urdu tagline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base md:text-lg mb-6 md:mb-8 font-medium"
              style={{ color: COLORS.accent.light }}
            >
              قانون کی الجھنیں ختم کریں — سادہ الفاظ میں رہنمائی حاصل کریں۔
            </motion.p>

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
                  className="group flex items-center justify-center gap-2 md:gap-3 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl shadow-lg transition-all duration-300 border text-sm md:text-base w-full sm:w-auto"
                  style={{
                    backgroundColor: COLORS.navy[6],
                    color: COLORS.accent.primary,
                    borderColor: `${COLORS.navy[6]}30`,
                    boxShadow: `0 8px 32px ${COLORS.accent.primary}20`,
                  }}
                >
                  <FiSearch className="text-lg md:text-xl group-hover:scale-110 transition-transform" />
                  <span>Start Search</span>
                  <FiArrowRight className="text-base md:text-lg group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Browse Categories Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/category"
                  className="group flex items-center justify-center gap-2 md:gap-3 backdrop-blur-xl border font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 text-sm md:text-base w-full sm:w-auto"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: COLORS.navy[6],
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
            className="mt-6 md:mt-8 max-w-md mx-auto lg:mx-0"
          >
            <div 
              className="p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-lg border"
              style={{ 
                backgroundColor: `${COLORS.navy[3]}25`,
                borderColor: `${COLORS.accent.primary}20`
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm" style={{ color: COLORS.navy[6] }}>
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
            className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-10 justify-center lg:justify-start"
          >
            {[
              { number: "500+", label: "Legal Guides" },
              { number: "50+", label: "Categories" },
              { number: "24/7", label: "Access" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-xl md:text-2xl font-bold mb-1"
                  style={{ color: COLORS.accent.light }}
                >{stat.number}</div>
                <div 
                  className="text-xs md:text-sm font-medium opacity-80"
                  style={{ color: COLORS.navy[6] }}
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
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 relative" style={{ backgroundColor: COLORS.navy[1] }}>
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
                backgroundColor: `${COLORS.accent.light}15`,
                borderColor: `${COLORS.accent.primary}30`,
                color: COLORS.accent.light
              }}
            >
              <FiTarget className="text-sm md:text-lg" />
              <span className="text-xs md:text-sm font-medium">Our Mission</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4"
              style={{ color: COLORS.navy[6] }}
            >
              The Law Shouldn't Be a Mystery
            </h2>
            <p 
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light opacity-90 px-4"
              style={{ color: COLORS.navy[6] }}
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
              },
              {
                icon: <FaBook className="text-2xl md:text-3xl" />,
                title: "Always Accessible",
                description: "Access essential legal guidance anytime, with offline capability when you need it most.",
              },
              {
                icon: <FaHandHoldingHeart className="text-2xl md:text-3xl" />,
                title: "Practical Focus",
                description: "Real solutions for everyday situations - from tenant disputes to workplace rights.",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="group rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl transition-all duration-300 backdrop-blur-sm border"
                style={{ 
                  backgroundColor: `${COLORS.navy[2]}60`,
                  borderColor: `${COLORS.accent.primary}15`,
                }}
              >
                <div 
                  className="inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl border mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-300"
                  style={{ 
                    backgroundColor: `${COLORS.accent.primary}15`,
                    borderColor: `${COLORS.accent.primary}25`
                  }}
                >
                  <div style={{ color: COLORS.accent.primary }}>
                    {feature.icon}
                  </div>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3 md:mb-4"
                  style={{ color: COLORS.navy[6] }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-sm md:text-base leading-relaxed font-light opacity-90"
                  style={{ color: COLORS.navy[6] }}
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
        style={{ backgroundColor: `${COLORS.navy[2]}40` }}
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
                backgroundColor: `${COLORS.accent.light}15`,
                borderColor: `${COLORS.accent.primary}30`,
                color: COLORS.accent.light
              }}
            >
              <FiZap className="text-sm md:text-lg" />
              <span className="text-xs md:text-sm font-medium">Get Started</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4"
              style={{ color: COLORS.navy[6] }}
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
                  className="group block rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg transition-all duration-300 h-full backdrop-blur-sm border hover:shadow-xl"
                  style={{ 
                    backgroundColor: `${COLORS.navy[2]}50`,
                    borderColor: `${COLORS.accent.primary}15`,
                  }}
                >
                  <div 
                    className="inline-flex p-2 md:p-3 rounded-xl md:rounded-2xl border mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      backgroundColor: `${COLORS.accent.primary}15`,
                      borderColor: `${COLORS.accent.primary}25`
                    }}
                  >
                    <div style={{ color: COLORS.accent.primary }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 
                    className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                    style={{ color: COLORS.navy[6] }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-xs md:text-sm leading-relaxed mb-3 md:mb-4 font-light opacity-90"
                    style={{ color: COLORS.navy[6] }}
                  >
                    {feature.description}
                  </p>
                  <div 
                    className="flex items-center gap-2 transition-colors group-hover:font-semibold"
                    style={{ color: COLORS.accent.primary }}
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
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-20" style={{ backgroundColor: COLORS.navy[1] }}>
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
              style={{ color: COLORS.navy[6] }}
            >
              Guides for Real Life
            </h2>
            <p 
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light opacity-90 px-4"
              style={{ color: COLORS.navy[6] }}
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
              },
              {
                icon: <FiPolice className="text-2xl md:text-3xl" />,
                title: "Police Interactions",
                description: "Your rights during stops, searches, and FIR registration.",
                link: "/laws?query=police",
              },
              {
                icon: <FiHouse className="text-2xl md:text-3xl" />,
                title: "Tenancy Issues",
                description: "Rent agreements, security deposits, and eviction procedures.",
                link: "/laws?query=landlord",
              },
              {
                icon: <FiShield className="text-2xl md:text-3xl" />,
                title: "Harassment Protection",
                description: "Legal safeguards and complaint procedures for harassment cases.",
                link: "/laws?query=harassment",
              },
              {
                icon: <FiShoppingCart className="text-2xl md:text-3xl" />,
                title: "Consumer Rights",
                description: "Refunds, fraud protection, and your rights as a buyer.",
                link: "/laws?query=consumer",
              },
              {
                icon: <FiMapPin className="text-2xl md:text-3xl" />,
                title: "Property Matters",
                description: "Ownership transfers, documentation, and dispute resolution.",
                link: "/laws?query=property",
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={category.link}
                  className="group block rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg transition-all duration-300 h-full backdrop-blur-sm border hover:shadow-xl"
                  style={{ 
                    backgroundColor: `${COLORS.navy[2]}50`,
                    borderColor: `${COLORS.accent.primary}15`,
                  }}
                >
                  <div 
                    className="inline-flex p-2 md:p-3 rounded-xl md:rounded-2xl border mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      backgroundColor: `${COLORS.accent.primary}15`,
                      borderColor: `${COLORS.accent.primary}25`
                    }}
                  >
                    <div style={{ color: COLORS.accent.primary }}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 
                    className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                    style={{ color: COLORS.navy[6] }}
                  >
                    {category.title}
                  </h3>
                  <p 
                    className="text-xs md:text-sm leading-relaxed font-light opacity-90"
                    style={{ color: COLORS.navy[6] }}
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
                className="inline-flex items-center gap-2 md:gap-3 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl shadow-lg transition-all duration-300 border text-sm md:text-base"
                style={{ 
                  backgroundColor: COLORS.accent.primary,
                  color: COLORS.navy[6],
                  borderColor: `${COLORS.accent.primary}50`,
                }}
              >
                <span>Explore All Guides</span>
                <FiArrowRight className="text-base md:text-lg group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section 
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 backdrop-blur-sm"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.navy[2]} 0%, ${COLORS.navy[3]} 100%)`
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
                backgroundColor: `${COLORS.accent.primary}15`,
                borderColor: `${COLORS.accent.primary}25`
              }}
            >
              <FiAward className="text-2xl md:text-3xl" style={{ color: COLORS.accent.primary }} />
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4"
              style={{ color: COLORS.navy[6] }}
            >
              Master Your <span style={{ color: COLORS.accent.primary }}>Rights</span>
            </h2>
            <p 
              className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto font-light opacity-90 px-4"
              style={{ color: COLORS.navy[6] }}
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
                  className="inline-flex items-center justify-center gap-2 md:gap-3 font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl shadow-lg transition-all duration-300 border text-sm md:text-base w-full sm:w-auto"
                  style={{ 
                    backgroundColor: COLORS.accent.primary,
                    color: COLORS.navy[6],
                    borderColor: `${COLORS.accent.primary}50`,
                  }}
                >
                  <FiUser className="text-lg md:text-xl" />
                  <span>Sign In to Access Saved Guides</span>
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
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: COLORS.navy[6],
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