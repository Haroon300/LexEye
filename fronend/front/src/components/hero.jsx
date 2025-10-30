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

/* Animation Variants */
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
    <div className="min-h-screen text-white overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl -top-10 -left-10 md:-top-20 md:-left-20"
          style={{ backgroundColor: '#0e877d25' }}
        />
        <div 
          className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full blur-3xl top-1/4 -right-10 md:top-1/3 md:-right-20"
          style={{ backgroundColor: '#0e877d15' }}
        />
        <div 
          className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl bottom-10 left-1/4 md:bottom-20"
          style={{ backgroundColor: '#0e877d25' }}
        />
      </div>

      {/* Enhanced Hero Section with Urdu */}
      <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-4 sm:px-6 lg:px-8 xl:px-20 pt-16 lg:pt-0">
        {/* Left Content */}
        <div className="max-w-2xl z-10 mt-8 lg:mt-0 text-center lg:text-left w-full">
          {/* Trust Badge with Urdu */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border mx-auto lg:mx-0"
            style={{ 
              backgroundColor: `${COLORS.navy[4]}20`,
              borderColor: `${COLORS.navy[4]}30`,
              color: COLORS.navy[5]
            }}
          >
            <FiShield className="text-lg" />
            <span className="text-sm font-medium">قانونی رہنمائی پر بھروسہ کریں</span>
          </motion.div>

          {/* Main Title Section */}
          <motion.section className="text-center lg:text-left py-8 lg:py-20 px-2">
            {/* English Heading */}
            <motion.h1
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 lg:mb-6 leading-tight"
              style={{ color: COLORS.navy[5] }}
            >
              Find <span style={{ color: "#ffffff" }}>Simple Legal Answers</span>.
              <br />
              <span 
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold block mt-2 lg:mt-4"
                style={{ color: "#E8F9F7" }}
              >
                Know Your Rights in Pakistan.
              </span>
            </motion.h1>

            {/* Urdu Main Heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-relaxed text-center lg:text-right"
              style={{ color: "#E0F2F1", fontFamily: "'Noto Sans Arabic', 'Jameel Noori Nastaleeq', 'Urdu Typesetting', sans-serif" }}
            >
              آسان قانونی جوابات حاصل کریں
              <br />
              <span style={{ color: "#ffffff" }}>پاکستان میں اپنے حقوق جانیں</span>
            </motion.h2>

            {/* Typewriter Description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6 lg:mb-8 max-w-2xl font-light mx-auto lg:mx-0"
              style={{
                color: "#ffffff",
                minHeight: "60px"
              }}
            >
              <Typewriter
                words={[
                  "Understand your legal rights — clear and simple.",
                  "No legal jargon, just easy guidance.",
                  "Learn what the law says about your problem.",
                  "پاکستانی قانون کو آسان اردو میں سمجھیں",
                ]}
                loop={true}
                typeSpeed={50}
                deleteSpeed={30}
                pauseFor={2000}
                delaySpeed={1000}
              />
            </motion.div>

            {/* Urdu Tagline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg mb-6 lg:mb-10 font-medium text-center lg:text-right"
              style={{ color: "#D9FDF8", fontFamily: "'Noto Sans Arabic', 'Jameel Noori Nastaleeq', sans-serif" }}
            >
              قانون کی الجھنیں ختم کریں — سادہ الفاظ میں رہنمائی حاصل کریں
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start items-stretch"
            >
              {/* Start Search Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none">
                <Link
                  to="/search"
                  className="group flex items-center justify-center gap-2 lg:gap-3 font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-300 border"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#0E877D",
                    borderColor: "#ffffff50",
                    boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
                  }}
                >
                  <FiSearch className="text-xl text-[#0E877D] group-hover:scale-110 transition-transform" />
                  <p>Start Search</p>
                  <FiArrowRight className="text-lg text-[#0E877D] group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Browse Categories Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none">
                <Link
                  to="/category"
                  className="group flex items-center justify-center gap-2 lg:gap-3 backdrop-blur-xl border font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl lg:rounded-2xl transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "#ffffff",
                  }}
                >
                  <FiBook className="text-xl" />
                  Browse Categories
                </Link>
              </motion.div>
            </motion.div>

            {/* Search Preview */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 lg:mt-8 max-w-md mx-auto lg:mx-0"
            >
              <div 
                className="p-3 lg:p-4 rounded-xl lg:rounded-2xl backdrop-blur-lg border"
                style={{ 
                  backgroundColor: `${COLORS.navy[3]}30`,
                  borderColor: `${COLORS.navy[4]}30`
                }}
              >
                <div className="flex items-center gap-2 lg:gap-3 text-sm" style={{ color: COLORS.navy[5] }}>
                  <FiSearch className="flex-shrink-0" />
                  <span className="opacity-70">"Ask your issue as a question: "My landlord won't return the deposit..."</span>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Stats Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 lg:gap-8 pb-10 justify-center lg:justify-start"
          >
            {[
              { number: "500+", label: "Legal Guides", urdu: "قانونی گائیڈز" },
              { number: "50+", label: "Categories", urdu: "زمرے" },
              { number: "24/7", label: "Access", urdu: "رسائی" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-xl lg:text-2xl font-bold"
                  style={{ color: COLORS.navy[4] }}
                >{stat.number}</div>
                <div 
                  className="text-xs lg:text-sm font-medium"
                  style={{ color: COLORS.navy[5] }}
                >{stat.label}</div>
                <div 
                  className="text-xs mt-1 opacity-70"
                  style={{ color: COLORS.navy[5], fontFamily: "'Noto Sans Arabic', sans-serif" }}
                >
                  {stat.urdu}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Spline Scene */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full lg:w-[45%] h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] mt-8 lg:mt-0 animate-float"
        >
          <Spline 
            scene="https://prod.spline.design/zHdL4fLC68VLmFBT/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </main>

      {/* Why LexEye Section with Urdu */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 relative" style={{ backgroundColor: `${COLORS.navy[1]}` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 backdrop-blur-sm border mx-auto"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiTarget className="text-lg" />
              <span className="text-sm font-medium">ہمارا مشن</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              The Law Shouldn't Be a Mystery
            </h2>
            <p 
              className="text-lg lg:text-xl max-w-3xl mx-auto font-light"
              style={{ color: COLORS.navy[5] }}
            >
              Making Pakistan's laws clear, accessible, and useful for everyone.
            </p>
            <p 
              className="text-base lg:text-lg max-w-3xl mx-auto font-light mt-2 opacity-80"
              style={{ color: COLORS.navy[5], fontFamily: "'Noto Sans Arabic', sans-serif" }}
            >
              پاکستان کے قوانین کو ہر کسی کے لیے واضح، قابل رسائی اور مفید بنانا
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                icon: <FaLightbulb className="text-2xl lg:text-3xl" />,
                title: "Simplicity First",
                urdu: "پہلے سادگی",
                description: "We translate complex legal statutes into clear, actionable steps without the jargon.",
                urduDesc: "قانونی اصطلاحات کے بغیر واضح، قابل عمل اقدامات",
                color: COLORS.navy[4]
              },
              {
                icon: <FaBook className="text-2xl lg:text-3xl" />,
                title: "Always Accessible",
                urdu: "ہمیشہ دستیاب",
                description: "Access essential legal guidance anytime, with offline capability when you need it most.",
                urduDesc: "کسی بھی وقت قانونی رہنمائی حاصل کریں",
                color: COLORS.navy[4]
              },
              {
                icon: <FaHandHoldingHeart className="text-2xl lg:text-3xl" />,
                title: "Practical Focus",
                urdu: "عمودی توجہ",
                description: "Real solutions for everyday situations - from tenant disputes to workplace rights.",
                urduDesc: "روزمرہ کے مسائل کے لیے حقیقی حل",
                color: COLORS.navy[4]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-2xl transition-all duration-300 backdrop-blur-lg border"
                style={{ 
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${feature.color}30`,
                  boxShadow: `0 20px 40px ${COLORS.navy[1]}50`
                }}
              >
                <div 
                  className="inline-flex p-3 lg:p-4 rounded-xl lg:rounded-2xl border mb-4 lg:mb-6 group-hover:scale-105 transition-transform duration-300"
                  style={{ 
                    backgroundColor: `${feature.color}20`,
                    borderColor: `${feature.color}30`
                  }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="text-xl lg:text-2xl font-bold mb-2"
                  style={{ color: COLORS.navy[5] }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-sm lg:text-base mb-2 opacity-80"
                  style={{ color: COLORS.navy[5], fontFamily: "'Noto Sans Arabic', sans-serif" }}
                >
                  {feature.urdu}
                </p>
                <p 
                  className="text-sm lg:text-base leading-relaxed font-light mb-3"
                  style={{ color: COLORS.navy[5] }}
                >
                  {feature.description}
                </p>
                <p 
                  className="text-xs lg:text-sm leading-relaxed font-light opacity-70"
                  style={{ color: COLORS.navy[5], fontFamily: "'Noto Sans Arabic', sans-serif" }}
                >
                  {feature.urduDesc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section with Urdu */}
      <section 
        className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 backdrop-blur-sm"
        style={{ backgroundColor: `${COLORS.navy[2]}30` }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <div 
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 backdrop-blur-sm border mx-auto"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`,
                color: COLORS.navy[5]
              }}
            >
              <FiZap className="text-lg" />
              <span className="text-sm font-medium">ابھی شروع کریں</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              What Can You Do Right Now?
            </h2>
            <p 
              className="text-lg lg:text-xl max-w-3xl mx-auto font-light"
              style={{ color: COLORS.navy[5] }}
            >
              Immediate access to legal guidance in simple steps
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {[
              {
                icon: <FiBook className="text-xl lg:text-2xl" />,
                title: "Browse Guides",
                urdu: "گائیڈز براؤز کریں",
                description: "Explore organized sections like Tenancy Rights and Workplace Disputes.",
                link: "/category",
              },
              {
                icon: <FiSearch className="text-xl lg:text-2xl" />,
                title: "Quick Search",
                urdu: "فوری تلاش",
                description: "Find rights and sections instantly using plain language questions.",
                link: "/search",
              },
              {
                icon: <FiBookmark className="text-xl lg:text-2xl" />,
                title: "Save & Organize",
                urdu: "محفوظ کریں & ترتیب دیں",
                description: "Bookmark important guides by creating your personal account.",
                link: "/signin",
              },
              {
                icon: <FiFileText className="text-xl lg:text-2xl" />,
                title: "Learn Terms",
                urdu: "اصطلاحات سیکھیں",
                description: "Understand simplified definitions of key legal terminology.",
                link: "/glossary",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Link
                  to={feature.link}
                  className="group block rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-2xl transition-all duration-300 h-full backdrop-blur-lg border"
                  style={{ 
                    backgroundColor: `${COLORS.navy[2]}40`,
                    borderColor: `${COLORS.navy[4]}30`,
                    boxShadow: `0 15px 30px ${COLORS.navy[1]}30`
                  }}
                >
                  <div 
                    className="inline-flex p-2 lg:p-3 rounded-xl lg:rounded-2xl border mb-3 lg:mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 
                    className="text-lg lg:text-xl font-bold mb-2 group-hover:transition-colors"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm mb-2 opacity-80"
                    style={{ color: COLORS.navy[5], fontFamily: "'Noto Sans Arabic', sans-serif" }}
                  >
                    {feature.urdu}
                  </p>
                  <p 
                    className="text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4 font-light"
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

      {/* Categories Section with Urdu */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              Guides for Real Life
            </h2>
            <p 
              className="text-lg lg:text-xl max-w-3xl mx-auto font-light"
              style={{ color: COLORS.navy[5] }}
            >
              Direct access to clarity on everyday legal matters in Pakistan
            </p>
            <p 
              className="text-base lg:text-lg max-w-3xl mx-auto font-light mt-2 opacity-80"
              style={{ color: COLORS.navy[5], fontFamily: "'Noto Sans Arabic', sans-serif" }}
            >
              پاکستان میں روزمرہ کے قانونی معاملات پر براہ راست رہنمائی
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {[
              {
                icon: <FiBriefcase className="text-2xl lg:text-3xl" />,
                title: "Workplace Rights",
                urdu: "کام کی جگہ کے حقوق",
                description: "Harassment, unfair dismissal, and labor rights explained clearly.",
                link: "/laws?query=workplace",
                color: COLORS.navy[4]
              },
              {
                icon: <FiPolice className="text-2xl lg:text-3xl" />,
                title: "Police Interactions",
                urdu: "پولیس کے ساتھ تعامل",
                description: "Your rights during stops, searches, and FIR registration.",
                link: "/laws?query=police",
                color: COLORS.navy[4]
              },
              {
                icon: <FiHouse className="text-2xl lg:text-3xl" />,
                title: "Tenancy Issues",
                urdu: "کرایہ داری کے مسائل",
                description: "Rent agreements, security deposits, and eviction procedures.",
                link: "/laws?query=landlord",
                color: COLORS.navy[4]
              },
              {
                icon: <FiShield className="text-2xl lg:text-3xl" />,
                title: "Harassment Protection",
                urdu: "ہراسانی سے تحفظ",
                description: "Legal safeguards and complaint procedures for harassment cases.",
                link: "/laws?query=harassment",
                color: COLORS.navy[4]
              },
              {
                icon: <FiShoppingCart className="text-2xl lg:text-3xl" />,
                title: "Consumer Rights",
                urdu: "صارف کے حقوق",
                description: "Refunds, fraud protection, and your rights as a buyer.",
                link: "/laws?query=consumer",
                color: COLORS.navy[4]
              },
              {
                icon: <FiMapPin className="text-2xl lg:text-3xl" />,
                title: "Property Matters",
                urdu: "جائیداد کے معاملات",
                description: "Ownership transfers, documentation, and dispute resolution.",
                link: "/laws?query=property",
                color: COLORS.navy[4]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Link
                  to={category.link}
                  className="group block rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-2xl transition-all duration-300 h-full backdrop-blur-lg border"
                  style={{ 
                    backgroundColor: `${COLORS.navy[2]}40`,
                    borderColor: `${category.color}30`,
                    boxShadow: `0 15px 30px ${COLORS.navy[1]}30`
                  }}
                >
                  <div 
                    className="inline-flex p-2 lg:p-3 rounded-xl lg:rounded-2xl border mb-3 lg:mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      borderColor: `${category.color}30`
                    }}
                  >
                    {category.icon}
                  </div>
                  <h3 
                    className="text-lg lg:text-xl font-bold mb-2 transition-colors"
                    style={{ color: COLORS.navy[5] }}
                  >
                    {category.title}
                  </h3>
                  <p 
                    className="text-sm mb-2 opacity-80"
                    style={{ color: COLORS.navy[5], fontFamily: "'Noto Sans Arabic', sans-serif" }}
                  >
                    {category.urdu}
                  </p>
                  <p 
                    className="text-xs lg:text-sm leading-relaxed font-light"
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
            className="text-center mt-8 lg:mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/category"
                className="inline-flex items-center gap-2 lg:gap-3 font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-300 border"
                style={{ 
                  backgroundColor: COLORS.navy[4],
                  color: COLORS.navy[5],
                  borderColor: `${COLORS.navy[4]}50`,
                  boxShadow: `0 20px 40px ${COLORS.navy[4]}25`
                }}
              >
                <p className="text-black">Explore All Guides</p>
                <FiArrowRight className="text-lg text-black group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Urdu */}
      <section 
        className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 backdrop-blur-sm"
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
              className="inline-flex p-3 lg:p-4 rounded-xl lg:rounded-2xl border mb-4 lg:mb-6 mx-auto"
              style={{ 
                backgroundColor: `${COLORS.navy[4]}20`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <FiAward className="text-2xl lg:text-3xl" style={{ color: COLORS.navy[4] }} />
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-4"
              style={{ color: COLORS.navy[5] }}
            >
              Master Your <span style={{ color: COLORS.navy[4] }}>Rights</span>
            </h2>
            <p 
              className="text-lg lg:text-xl mb-6 lg:mb-8 max-w-2xl mx-auto font-light"
              style={{ color: COLORS.navy[5] }}
            >
              Take the first step toward legal confidence. Your personalized library awaits.
            </p>
            <p 
              className="text-base lg:text-lg mb-6 lg:mb-8 max-w-2xl mx-auto font-light opacity-80"
              style={{ color: COLORS.navy[5], fontFamily: "'Noto Sans Arabic', sans-serif" }}
            >
              قانونی اعتماد کی طرف پہلا قدم اٹھائیں۔ آپ کی ذاتی لائبریری منتظر ہے۔
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 lg:gap-3 font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-300 border w-full sm:w-auto"
                  style={{ 
                    backgroundColor: COLORS.navy[4],
                    color: COLORS.navy[5],
                    borderColor: `${COLORS.navy[4]}50`,
                    boxShadow: `0 20px 40px ${COLORS.navy[4]}25`
                  }}
                >
                  <FiUser className="text-lg lg:text-xl text-black" />
                  <p className="text-black">Sign In to Access Saved Guides</p>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 lg:gap-3 backdrop-blur-xl border font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl lg:rounded-2xl transition-all duration-300 w-full sm:w-auto"
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
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        
        /* Urdu font support */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default LandingPage;