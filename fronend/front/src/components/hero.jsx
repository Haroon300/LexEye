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
            viewport={{  amount: 0.3 }}
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
          viewport={{  amount: 0.3 }}
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
            <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto">
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
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">Simplicity</h3>
              <p className="text-[#08292e]">
                We translate the Pakistan Penal Code and other complex statutes
                into short, step-by-step guides. No legal jargon required.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#89a2a6] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg"
            >
              <FaBook className="text-3xl text-[#08292e] mb-4 animate-pulse" />
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">Accessibility</h3>
              <p className="text-[#08292e]">
                Anytime, anywhere. Access guides on your phone or computer, and
                even save them for limited offline use.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#89a2a6] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg"
            >
              <FaBalanceScale className="text-3xl text-[#08292e] mb-4 animate-pulse" />
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">Everyday Focus</h3>
              <p className="text-[#08292e]">
                Practical topics like police stops, landlord disputes, workplace
                harassment, and consumer fraud explained simply.
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
            viewport={{  amount: 0.25 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
              What Can You Do Right Now?
            </motion.h2>
            <motion.div className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto animate-pulse" variants={fadeUp} />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{  amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <motion.div
              variants={fadeUp}
              className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">Explore Categories</h3>
              <p className="text-gray-300 mb-6">
                Browse organized sections like Tenancy Rights, Workplace
                Disputes, or Gender Harassment.
              </p>
              <Link to="/category" className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2">
                Browse Categories <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">Instant Search</h3>
              <p className="text-gray-300 mb-6">
                Find rights and sections instantly by typing keywords, not
                section numbers.
              </p>
              <Link to="/search" className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2">
                Use Search <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">Save & Revisit</h3>
              <p className="text-gray-300 mb-6">
                Bookmark important guides by creating an account for quick
                access later.
              </p>
              <Link to="/signin" className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2">
                Sign In <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">Glossary</h3>
              <p className="text-gray-300 mb-6">
                Quickly look up simplified definitions of key legal and
                technical terms.
              </p>
              <Link to="/glossary" className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2">
                View Glossary <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: LexEye Promise */}
      <section className="py-20 px-6 lg:px-20 bg-transparent">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{  amount: 0.25 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6">
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