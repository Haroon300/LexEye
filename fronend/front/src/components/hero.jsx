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

      {/* Section X: Daily Life Filter */}
      <section className="relative py-20 px-6 lg:px-20 bg-[#0a2b30] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Guides for Real Life{" "}
            <span className="text-[#89a2a6]">
              : Direct Access to Clarity.
            </span>
          </h2>

          {/* Categories Grid with Floating Orbs */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              [
                {
                  icon: "💼",
                  title: "Workplace Disputes",
                  desc: "Harassment, unfair dismissal, and labor rights explained.",
                  link: "/laws?query=workplace",
                },
                {
                  icon: "🚔",
                  title: "Police Interactions",
                  desc: "Your rights during traffic stops and FIR processes.",
                  link: "/laws?query=police",
                },
              ],
              [
                {
                  icon: "🏠",
                  title: "Landlord & Tenant",
                  desc: "Tenancy agreements, rent hikes, and eviction rules.",
                  link: "/laws?query=landlord",
                },
                {
                  icon: "🛡️",
                  title: "Gender Harassment",
                  desc: "Filing complaints and understanding legal protections.",
                  link: "/laws?query=harassment",
                },
              ],
              [
                {
                  icon: "🛒",
                  title: "Consumer Protection",
                  desc: "Refunds, fraud complaints, and buyer’s rights.",
                  link: "/laws?query=consumer",
                },
                {
                  icon: "📄",
                  title: "Property Rights",
                  desc: "Ownership transfers and dispute resolution made simple.",
                  link: "/laws?query=property",
                },
              ],
            ].map((colItems, colIdx) => (
              <div key={colIdx} className="relative flex flex-col gap-6">
                {/* Floating Orb behind each column */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
                  <div
                    className="relative w-56 h-56 rounded-full bg-[#89a2a6]/30 blur-3xl animate-float"
                    style={{
                      animationDelay: `${colIdx * 2}s`, // stagger float animations
                    }}
                  >
                    {/* Core glow */}
                    <div className="absolute inset-0 rounded-full bg-[#89a2a6]/100 blur-2xl animate-pulse" />
                  </div>
                </div>

                {/* Cards inside this column */}
                {colItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.link}
                    className="group relative p-6 bg-[#092226]/70 border border-[#89a2a6]/30 rounded-xl shadow-md hover:border-[#89a2a6] hover:shadow-[0_0_15px_#89a2a6] transition-all duration-300"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#89a2a6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-2">{item.desc}</p>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              to="/category"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-black font-medium rounded-full shadow hover:scale-105 transition-transform"
            >
              Explore All Guides
            </Link>
          </div>
        </div>

        {/* Custom animations */}
        <style jsx>{`
          .animate-float {
            animation: floatOrb 8s ease-in-out infinite;
          }
          @keyframes floatOrb {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-25px) translateX(15px);
            }
          }
        `}</style>
      </section>
      <section className="relative pt-[3rem] pb-[6rem] px-6 lg:px-20 bg-[#0a2b30]">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon / Visual */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 216.757 216.757"
                className="w-15 h-15 text-white"
                fill="currentColor"
              >
                <path
                  d="M214.257,187.552H124.78c-1.381,0-2.5-1.119-2.5-2.5V173.63c0-1.381,1.119-2.5,2.5-2.5h89.478  
    c1.381,0,2.5,1.119,2.5,2.5v11.422C216.757,186.433,215.638,187.552,214.257,187.552z M127.28,182.552h84.478v-6.422H127.28V182.552  
    z M7.148,144.969c-1.06,0-2.043-0.679-2.381-1.742l-4.648-14.605c-0.419-1.316,0.308-2.722,1.624-3.141L77.091,101.5  
    c0.63-0.201,1.317-0.143,1.906,0.162c0.589,0.305,1.033,0.831,1.233,1.462l0.491,1.542l37.688-11.994l-0.947-2.975  
    c-0.201-0.632-0.144-1.318,0.161-1.907c0.305-0.589,0.831-1.033,1.463-1.234l6.622-2.107l-1.225-3.849  
    c-0.201-0.632-0.144-1.318,0.161-1.907s0.831-1.033,1.463-1.234l3.979-1.266l-2.033-6.388l-0.293,0.093  
    c-0.627,0.2-1.277,0.301-1.932,0.301c-2.785,0-5.224-1.784-6.068-4.438l-2.399-7.542c-2.104-6.612,1.563-13.703,8.175-15.807  
    L165.163,29.8c1.241-0.395,2.525-0.595,3.818-0.595c5.501,0,10.318,3.524,11.987,8.77l2.4,7.542  
    c1.064,3.347-0.792,6.936-4.137,8.001l-0.293,0.093l2.033,6.388l3.979-1.267c0.633-0.2,1.318-0.143,1.907,0.162  
    c0.589,0.305,1.033,0.831,1.233,1.462l9.527,29.935c0.201,0.632,0.144,1.318-0.161,1.907s-0.831,1.033-1.463,1.234l-3.979,1.267  
    l2.032,6.388l0.292-0.093c0.628-0.2,1.278-0.301,1.933-0.301c2.784,0,5.223,1.783,6.068,4.438l2.4,7.542  
    c1.02,3.203,0.73,6.611-0.813,9.597c-1.544,2.986-4.158,5.191-7.361,6.21l-39.626,12.611c-1.241,0.395-2.525,0.595-3.817,0.595  
    c-5.501,0-10.319-3.524-11.988-8.77l-2.4-7.542c-0.516-1.62-0.369-3.345,0.412-4.856s2.104-2.627,3.726-3.144l0.292-0.093  
    l-2.032-6.388l-3.979,1.267c-1.312,0.416-2.722-0.308-3.14-1.624l-1.226-3.849l-6.622,2.107c-1.313,0.417-2.722-0.308-3.14-1.624  
    l-0.947-2.976l-37.688,11.994l0.49,1.542c0.419,1.316-0.308,2.722-1.624,3.141l-75.349,23.98C7.655,144.931,7.4,144.969,7.148,144.969z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Master Your <span className="text-[#89a2a6]">Rights.</span>
          </h2>

          {/* Encouragement */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
            Take the first step toward legal confidence. Your personalized
            library awaits.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA */}
            <Link
              to="/signup"
              className="px-8 py-3 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-black font-semibold rounded-full shadow hover:scale-105 transition-transform w-full sm:w-auto text-center"
            >
              Join LexEye
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
