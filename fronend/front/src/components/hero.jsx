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
  FiZap
} from "react-icons/fi";
import {
  FaBalanceScale,
  FaLightbulb,
  FaBook
} from "react-icons/fa";

/* animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-cyan-300/10 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
      </div>

      {/* Hero Section */}
      <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-6 lg:px-20 pt-20">
        {/* Left Content */}
        <div className="max-w-2xl z-10 mt-10 lg:mt-0 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-6"
          >
            <FiAward className="text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">Legal Intelligence Platform</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-cyan-200 via-cyan-100 to-cyan-50 text-transparent bg-clip-text mb-6 leading-tight"
          >
            Understand the Law.
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Anytime. Anywhere.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 max-w-2xl"
          >
            <Typewriter
              words={[
                "The definitive responsive guide to everyday law in Pakistan. Get clear, step-by-step guidance on harassment, tenancy, and workplace issues, saved for use — even offline.",
              ]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          </motion.p>

          {/* Buttons */}
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
                className="group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-400/30"
              >
                <FiSearch className="text-xl group-hover:scale-110 transition-transform" />
                Start Your Search
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/category"
                className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-cyan-500/20 hover:border-cyan-400/30 hover:shadow-2xl transition-all duration-300"
              >
                <FiBook className="text-xl" />
                Browse Categories
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start"
          >
            {[
              { number: "500+", label: "Legal Sections" },
              { number: "50+", label: "Categories" },
              { number: "24/7", label: "Access" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side - Spline Scene */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative w-full lg:w-[50%] h-[400px] sm:h-[500px] lg:h-[700px] mt-12 lg:mt-0 animate-float"
        >
          <Spline 
            scene="https://prod.spline.design/zHdL4fLC68VLmFBT/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </main>

      {/* Why LexEye Section */}
      <section className="py-20 px-6 lg:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-4">
              <FiTarget className="text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-200 to-cyan-100 text-transparent bg-clip-text mb-4">
              The Law Shouldn't Be a Mystery
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our mission is to make Pakistan's laws clear, accessible, and useful for everyone.
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
                title: "Simplicity",
                description: "We translate the Pakistan Penal Code and other complex statutes into short summaries and easy-to-follow steps. No legal jargon required.",
              },
              {
                icon: <FaBook className="text-3xl" />,
                title: "Accessibility",
                description: "Access essential information on your phone or desktop, and save guides for limited offline use when you need them most.",
              },
              {
                icon: <FaBalanceScale className="text-3xl" />,
                title: "Everyday Focus",
                description: "Stop guessing how to handle issues like police stops, landlord disputes, workplace harassment, or consumer fraud.",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-2xl border border-cyan-400/30 rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 border border-cyan-400/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-4">
              <FiZap className="text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Get Started</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-200 to-cyan-100 text-transparent bg-clip-text mb-4">
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
                title: "Guide Browsing",
                description: "Browse organized sections like Tenancy Rights, Workplace Disputes, or Gender Harassment.",
                link: "/category",
              },
              {
                icon: <FiSearch className="text-2xl" />,
                title: "Quick LookUp",
                description: "Find rights and sections instantly by typing keywords, not section numbers.",
                link: "/search",
              },
              {
                icon: <FiBookmark className="text-2xl" />,
                title: "Personalize",
                description: "Bookmark important guides by creating an account for quick access later.",
                link: "/signin",
              },
              {
                icon: <FiUsers className="text-2xl" />,
                title: "Learn the Language",
                description: "Quickly look up simplified definitions of key legal and technical terms.",
                link: "/glossary",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={feature.link}
                  className="group block bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-2xl border border-cyan-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 h-full"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 border border-cyan-400/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <span className="text-sm font-semibold">Explore</span>
                    <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-200 to-cyan-100 text-transparent bg-clip-text mb-4">
              Guides for Real Life
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Direct access to clarity on everyday legal matters
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
                title: "Workplace Disputes",
                description: "Harassment, unfair dismissal, and labor rights explained.",
                link: "/laws?query=workplace",
              },
              {
                icon: "🚔",
                title: "Police Interactions",
                description: "Your rights during traffic stops and FIR processes.",
                link: "/laws?query=police",
              },
              {
                icon: "🏠",
                title: "Landlord & Tenant",
                description: "Tenancy agreements, rent hikes, and eviction rules.",
                link: "/laws?query=landlord",
              },
              {
                icon: "🛡️",
                title: "Gender Harassment",
                description: "Filing complaints and understanding legal protections.",
                link: "/laws?query=harassment",
              },
              {
                icon: "🛒",
                title: "Consumer Protection",
                description: "Refunds, fraud complaints, and buyer's rights.",
                link: "/laws?query=consumer",
              },
              {
                icon: "📄",
                title: "Property Rights",
                description: "Ownership transfers and dispute resolution made simple.",
                link: "/laws?query=property",
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={category.link}
                  className="group block bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-2xl border border-cyan-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 h-full"
                >
                  <div className="text-3xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{category.description}</p>
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
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-400/30"
              >
                Explore All Guides
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-20 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex p-4 bg-cyan-500/20 rounded-2xl border border-cyan-400/30 mb-6">
              <FiAward className="text-3xl text-cyan-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-200 to-cyan-100 text-transparent bg-clip-text mb-4">
              Master Your <span className="text-cyan-400">Rights</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Take the first step toward legal confidence. Your personalized library awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-400/30"
                >
                  <FiUser className="text-xl" />
                  Join LexEye
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-cyan-500/20 hover:border-cyan-400/30 hover:shadow-2xl transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Animation CSS */}
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;