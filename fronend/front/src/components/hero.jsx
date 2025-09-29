import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBook,
  FaBookmark,
  FaLightbulb,
  FaArrowRight,
  FaBalanceScale,
} from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { SiChainlink } from "react-icons/si";
import { RiExternalLinkFill } from "react-icons/ri";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

/* animation variants - declare at top level */
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

const LandingPage = () => {
  return (
    <div className="min-h-screen bg[#092226]/70 text-white overflow-hidden">
      {/* Hero Section (Section 1) */}
      <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)] px-6 lg:px-20 mb-10">
        {/* Left Content */}
        <div className="max-w-xl z-10 mt-10 sm:mt-16 lg:mt-30 text-center lg:text-left">
          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="text-[#becac8] 
             text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] 
             font-semibold tracking-wider my-5 mb-10 "
          >
            <span className="text-[#becac8]">
              Understand the Law. Anytime. Anywhere.
            </span>
          </motion.h1>

          {/* Description (typewriter inside a motion.p) */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] 
             tracking-wide text-[#becac8]/90 
             max-w-[25rem] lg:max-w-[30rem] 
             mx-auto lg:mx-0"
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
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start"
          >
            <Link
              to="/search"
              className="flex items-center gap-2 border py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-[#08292e] hover:from-[#08292e] hover:to-[#111] hover:text-[#becac8] hover:scale-105"
            >
              <SiChainlink />
              Start Your Search
            </Link>
          </motion.div>
        </div>

        {/* Right Side Visual */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative w-full lg:w-[50%] h-[400px] sm:h-[500px] lg:h-[700px] animate-float"
        >
          <Spline scene="https://prod.spline.design/zHdL4fLC68VLmFBT/scene.splinecode" />
        </motion.div>
      </main>

      {/* Section 2: Why LexEye? Our Purpose */}
      <section className="py-20 px-6 lg:px-20 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.25 }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              The Law Shouldn’t Be a Mystery
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Our mission is to make Pakistan’s laws clear, accessible, and
              useful for everyone.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto mt-6 animate-pulse"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeUp}
              className="bg-[#89a2a6] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg"
            >
              <FaLightbulb className="text-3xl text-[#08292e] mb-4 animate-pulse" />
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">
                Simplicity
              </h3>
              <p className="text-[#08292e]">
                We translate the Pakistan Penal Code and other complex statutes
                into short summaries and easy-to-follow steps. No legal jargon
                required.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#89a2a6] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg"
            >
              <FaBook className="text-3xl text-[#08292e] mb-4 animate-pulse" />
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">
                Accessibility
              </h3>
              <p className="text-[#08292e]">
                Access essential information on your phone or desktop, and even
                save guides for limited offline use when you need them most.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#89a2a6] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg"
            >
              <FaBalanceScale className="text-3xl text-[#08292e] mb-4 animate-pulse" />
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">
                Everyday Focus
              </h3>
              <p className="text-[#08292e]">
                Stop guessing how to handle issues like police stops, landlord
                disputes, workplace harassment, or consumer fraud.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: What Can You Do Right Now? */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.25 }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Can You Do Right Now?
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto animate-pulse"
              variants={fadeUp}
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <motion.div
              variants={fadeUp}
              className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Guide Browsing</h3>
              <p className="text-gray-300 mb-6">
                Browse organized sections like Tenancy Rights, Workplace
                Disputes, or Gender Harassment.
              </p>
              <Link
                to="/category"
                className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2"
              >
                Browse Categories <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Quick LookUp</h3>
              <p className="text-gray-300 mb-6">
                Find rights and sections instantly by typing keywords, not
                section numbers.
              </p>
              <Link
                to="/search"
                className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2"
              >
                Use Search <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Personalize</h3>
              <p className="text-gray-300 mb-6">
                Bookmark important guides by creating an account for quick
                access later.
              </p>
              <Link
                to="/signin"
                className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2"
              >
                Sign In / Sign Up
                <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Learn the Language</h3>
              <p className="text-gray-300 mb-6">
                Quickly look up simplified definitions of key legal and
                technical terms.
              </p>
              <Link
                to="/glossary"
                className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2"
              >
                View Glossary <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Topics You Can Trust */}
      <section className="py-20 px-6 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Topics You Can <span className="text-[#89a2a6]">Trust</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our most reliable guides across key areas of daily life.
            Clear, accessible, and legally accurate.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto mt-6 animate-glow rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Workplace Disputes */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="p-6 rounded-2xl bg-gradient-to-b from-[#0b2c30]/80 to-[#0f3a41]/40 
                 border border-[#89a2a6]/20 hover:border-[#89a2a6] shadow-lg 
                 hover:shadow-[#89a2a6]/40 text-center cursor-pointer animate-glow"
          >
            <Link
              to="/category/workplace"
              className="flex flex-col items-center text-[#becac8]"
            >
              <FaBook className="text-4xl mb-4 text-[#89a2a6]" />
              <h3 className="text-lg font-semibold mb-2">Workplace Disputes</h3>
              <p className="text-sm text-gray-400">
                Unfair dismissal, harassment
              </p>
            </Link>
          </motion.div>

          {/* Police Interactions */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="p-6 rounded-2xl bg-gradient-to-b from-[#0b2c30]/80 to-[#0f3a41]/40 
                 border border-[#89a2a6]/20 hover:border-[#89a2a6] shadow-lg 
                 hover:shadow-[#89a2a6]/40 text-center cursor-pointer animate-glow"
          >
            <Link
              to="/category/police"
              className="flex flex-col items-center text-[#becac8]"
            >
              <FaBalanceScale className="text-4xl mb-4 text-[#89a2a6]" />
              <h3 className="text-lg font-semibold mb-2">
                Police Interactions
              </h3>
              <p className="text-sm text-gray-400">
                Traffic stops, FIR process
              </p>
            </Link>
          </motion.div>

          {/* Landlord & Tenant Rights */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="p-6 rounded-2xl bg-gradient-to-b from-[#0b2c30]/80 to-[#0f3a41]/40 
                 border border-[#89a2a6]/20 hover:border-[#89a2a6] shadow-lg 
                 hover:shadow-[#89a2a6]/40 text-center cursor-pointer animate-glow"
          >
            <Link
              to="/category/landlord"
              className="flex flex-col items-center text-[#becac8]"
            >
              <FaBookmark className="text-4xl mb-4 text-[#89a2a6]" />
              <h3 className="text-lg font-semibold mb-2">Landlord & Tenant</h3>
              <p className="text-sm text-gray-400">Rent disputes, eviction</p>
            </Link>
          </motion.div>
        </div>

        {/* Secondary CTA */}
        <div className="text-center mt-12">
          <Link
            to="/category"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#89a2a6] to-[#becac8] 
                 text-black py-3 px-8 rounded-full font-medium transition-all hover:scale-110 animate-glow"
          >
            Browse All 10+ Categories <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Section X: Your Daily Issues (Accordion/Tab View) */}
      <section className="py-20 px-6 lg:px-20 bg-[#0a2b30]/60">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.25 }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Your Daily Issues.{" "}
              <span className="text-[#89a2a6]">Simplified Law.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Choose a common legal problem and see the clear steps you can take
              — no jargon, just solutions.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto mt-6 animate-pulse"
            />
          </motion.div>

          {/* Accordion/Tab Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Issue List */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.25 }}
              className="flex flex-col gap-4"
            >
              {/* Workplace Disputes */}
              <motion.button
                variants={fadeUp}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#092226]/60 border border-[#89a2a6]/20 hover:border-[#89a2a6] transition-all"
              >
                <span className="text-[#89a2a6] text-xl">💼</span>
                <span className="font-medium">Workplace Disputes</span>
              </motion.button>

              {/* Police Interactions */}
              <motion.button
                variants={fadeUp}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#092226]/60 border border-[#89a2a6]/20 hover:border-[#89a2a6] transition-all"
              >
                <span className="text-[#89a2a6] text-xl">🚔</span>
                <span className="font-medium">Police Interactions</span>
              </motion.button>

              {/* Landlord & Tenant Rights */}
              <motion.button
                variants={fadeUp}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#092226]/60 border border-[#89a2a6]/20 hover:border-[#89a2a6] transition-all"
              >
                <span className="text-[#89a2a6] text-xl">🏠</span>
                <span className="font-medium">Landlord & Tenant</span>
              </motion.button>

              {/* Gender Harassment */}
              <motion.button
                variants={fadeUp}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#092226]/60 border border-[#89a2a6]/20 hover:border-[#89a2a6] transition-all"
              >
                <span className="text-[#89a2a6] text-xl">🛡️</span>
                <span className="font-medium">Gender Harassment</span>
              </motion.button>
            </motion.div>

            {/* Active Panel Content */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.25 }}
              className="lg:col-span-2 bg-[#092226]/70 p-8 rounded-xl border border-[#89a2a6]/20 shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#89a2a6]">
                Workplace Disputes
              </h3>
              <p className="text-gray-300 mb-6">
                Facing unfair dismissal or harassment? Get the immediate legal
                steps and documentation required under local labor law.
              </p>
              <Link
                to="/category/workplace"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#89a2a6] to-[#becac8] 
            text-black py-3 px-8 rounded-full font-medium transition-all hover:scale-110"
              >
                View Step-by-Step Guide <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section X: Daily Life Filter */}
      <section className="relative py-20 px-6 lg:px-20 bg-[#0a2b30] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            The LexEye Command Center{" "}
            <span className="text-[#89a2a6]">: Direct Access to Clarity.</span>
          </h2>

          {/* Chaos Background (Layer 1) */}
          <div className="absolute inset-0 opacity-20 blur-sm flex flex-wrap gap-6 justify-center items-center">
            {["📞", "🚔", "📄", "⏰", "💼", "🏠"].map((icon, idx) => (
              <span key={idx} className="text-5xl text-gray-400 animate-pulse">
                {icon}
              </span>
            ))}
          </div>

          {/* LexEye Lens (Layer 2, spotlight effect) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full bg-[#89a2a6]/20 backdrop-blur-md border-2 border-[#89a2a6] shadow-[0_0_40px_#89a2a6] animate-pulse" />
          </div>

          {/* Order Columns (Layer 3, clean categories) */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💼",
                title: "Workplace Disputes",
                desc: "Harassment, unfair dismissal, and labor rights explained.",
                link: "/category/workplace",
              },
              {
                icon: "🚔",
                title: "Police Interactions",
                desc: "Your rights during traffic stops and FIR processes.",
                link: "/category/police",
              },
              {
                icon: "🏠",
                title: "Landlord & Tenant",
                desc: "Tenancy agreements, rent hikes, and eviction rules.",
                link: "/category/landlord",
              },
              {
                icon: "🛡️",
                title: "Gender Harassment",
                desc: "Filing complaints and understanding legal protections.",
                link: "/category/harassment",
              },
              {
                icon: "🛒",
                title: "Consumer Protection",
                desc: "Refunds, fraud complaints, and buyer’s rights.",
                link: "/category/consumer",
              },
              {
                icon: "📄",
                title: "Property Rights",
                desc: "Ownership transfers and dispute resolution made simple.",
                link: "/category/property",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="group relative p-6 bg-[#092226]/70 border border-[#89a2a6]/30 rounded-xl shadow-md hover:border-[#89a2a6] hover:shadow-[0_0_15px_#89a2a6] transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white group-hover:text-[#89a2a6] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm mt-2">{item.desc}</p>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <a
              href="/category"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-black font-medium rounded-full shadow hover:scale-105 transition-transform"
            >
              Explore All Guides
            </a>
          </div>
        </div>
      </section>
      {/* Section X: Call to Action (Sign In / Sign Up) */}
      <section className="relative py-20 px-6 lg:px-20 bg-[#0a2b30]">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon / Visual */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#092226] border border-[#89a2a6]/50 shadow-lg">
              <span className="text-3xl text-[#89a2a6]">🔑</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unlock Your{" "}
            <span className="text-[#89a2a6]">Personal Legal Toolkit.</span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
            Create your free LexEye account to bookmark essential guides, save
            legal terms to your glossary, and keep your most important rights
            ready for use, anytime.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA */}
            <a
              href="/signup"
              className="px-8 py-3 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-black font-semibold rounded-full shadow hover:scale-105 transition-transform w-full sm:w-auto text-center"
            >
              Create Free Account
            </a>

            {/* Secondary CTA */}
            <a
              href="/signin"
              className="px-8 py-3 border border-[#89a2a6]/50 text-[#89a2a6] rounded-full hover:bg-[#092226]/60 transition-colors w-full sm:w-auto text-center"
            >
              Already using LexEye? Sign In
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f0f7f9] py-12 px-6 lg:px-20 rounded-lg shadow-md text-center max-w-3xl mx-auto my-12">
        {/* Title */}
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 mr-2 text-[#0891b2]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800">
            Your Law Profile
          </h2>
        </div>

        {/* Body Text */}
        <p className="text-gray-700 mb-6">
          Access personalized features like saved articles and quick-reference
          glossary terms. Your legal clarity is one step away.
        </p>

        {/* Primary CTA */}
        <a
          href="/signup"
          className="inline-block bg-[#0891b2] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#056978] transition-colors mb-3"
        >
          Get Started Now
        </a>

        {/* Secondary CTA */}
        <div>
          <a href="/signin" className="text-gray-600 text-sm hover:underline">
            Already here? Sign In
          </a>
        </div>
      </section>

      {/* Section 4: LexEye Promise */}
      <section className="py-20 px-6 lg:px-20 bg-transparent">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.25 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            The LexEye Promise
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-gray-300 mb-10">
            LexEye is built for you. We are a university project committed to
            increasing legal awareness in Pakistan. Your confidence is our
            measure of success.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/feedback"
              className="bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-black py-3 px-8 rounded-full font-medium transition-all hover:shadow-lg hover:scale-110 inline-flex items-center gap-2"
            >
              Give Feedback <FaArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
