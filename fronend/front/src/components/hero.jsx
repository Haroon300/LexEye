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

const LandingPage = () => {
  return (
    <div className="min-h-screen bg[#092226]/70 text-white overflow-hidden">
      {/* Hero Section (Section 1) */}
      <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)] px-6 lg:px-20 mb-10">
        {/* Left Content */}
        <div className="max-w-xl z-10 mt-10 sm:mt-16 lg:mt-30 text-center lg:text-left animate-fadeIn">
          {/* Badge */}
          {/* <div className="relative mx-auto lg:mx-0 w-[95%] sm:w-56 h-10 bg-gradient-to-r from-[#89a2a6] to-[#becac8] rounded-full hover:scale-105 transition-all duration-300">
            <div className="absolute inset-[3px] bg-[#08292e] rounded-full flex items-center justify-center gap-1">
              <IoDiamondSharp className="animate-pulse" />
              <span className="text-sm sm:text-base text-[#becac8] font-light tracking-wider">
                Pakistan’s Legal Clarity Tool
              </span>
            </div>
          </div> */}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[#becac8] 
             text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] 
             font-semibold tracking-wider my-5 mb-12 
             font-['Times_New_Roman',_serif]"
          >
            <span className="text-blue-300">
              Understand the Law. Anytime. Anywhere.
            </span>
          </motion.h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg md:text-xl lg:text-[1.6rem] 
             tracking-wide text-gray-200 
             max-w-[25rem] lg:max-w-[36rem] 
             mx-auto lg:mx-0 
             font-['Times_New_Roman',_serif]"
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
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
            <Link
              to="/search"
              className="flex items-center gap-2 border py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-[#08292e] hover:from-[#08292e] hover:to-[#111] hover:text-[#becac8] hover:scale-105"
            >
              <SiChainlink />
              Start Your Search
            </Link>
            {/* <Link
              to="/category"
              className="flex items-center gap-2 border border-[#becac8] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-[#89a2a6] hover:to-[#becac8] hover:text-[#08292e]"
            >
              <RiExternalLinkFill />
              Categories
            </Link> */}
          </div>
        </div>

        {/* Right Side Visual (Keep 3D but note: new concept suggests magnifying glass + scale) */}
        <div className="relative w-full lg:w-[50%] h-[400px] sm:h-[500px] lg:h-[700px] animate-float">
          <Spline scene="https://prod.spline.design/zHdL4fLC68VLmFBT/scene.splinecode" />
        </div>
      </main>

      {/* Section 2: Why LexEye? Our Purpose */}
      <section className="py-20 px-6 lg:px-20 animate-fadeIn bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Law Shouldn’t Be a Mystery
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our mission is to make Pakistan’s laws clear, accessible, and
              useful for everyone.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto mt-6 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#89a2a6] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg">
              <FaLightbulb className="text-3xl text-[#08292e] mb-4 animate-pulse" />
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">Simplicity</h3>
              <p className="text-[#08292e]">
                We translate the Pakistan Penal Code and other complex statutes
                into short, step-by-step guides. No legal jargon required.
              </p>
            </div>
            <div className="bg-[#89a2a6] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg">
              <FaBook className="text-3xl text-[#08292e] mb-4 animate-pulse" />
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">Accessibility</h3>
              <p className="text-[#08292e]">
                Anytime, anywhere. Access guides on your phone or computer, and
                even save them for limited offline use.
              </p>
            </div>
            <div className="bg-[#89a2a6] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg">
              <FaBalanceScale className="text-3xl text-[#08292e] mb-4 animate-pulse" />
              <h3 className="text-xl text-[#08292e] font-semibold mb-2">Everyday Focus</h3>
              <p className="text-[#08292e]">
                Practical topics like police stops, landlord disputes, workplace
                harassment, and consumer fraud explained simply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What Can You Do Right Now? */}
      <section className="py-20 px-6 lg:px-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Can You Do Right Now?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Browse Categories */}
            <div className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Explore Categories</h3>
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
            </div>

            {/* Search */}
            <div className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Instant Search</h3>
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
            </div>

            {/* Save */}
            <div className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Save & Revisit</h3>
              <p className="text-gray-300 mb-6">
                Bookmark important guides by creating an account for quick
                access later.
              </p>
              <Link
                to="/signin"
                className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2"
              >
                Sign In <FaArrowRight className="text-sm" />
              </Link>
            </div>

            {/* Glossary */}
            <div className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 transition-all duration-500 shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Glossary</h3>
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
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: LexEye Promise */}
      <section className="py-20 px-6 lg:px-20 animate-fadeIn bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The LexEye Promise
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            LexEye is built for you. We are a university project committed to
            increasing legal awareness in Pakistan. Your confidence is our
            measure of success.
          </p>
          <Link
            to="/feedback"
            className="bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-black py-3 px-8 rounded-full font-medium transition-all hover:shadow-lg hover:scale-110 inline-flex items-center gap-2"
          >
            Give Feedback <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
