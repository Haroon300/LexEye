import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBook,
  FaBookmark,
  FaLightbulb,
  FaArrowRight,
} from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { SiChainlink } from "react-icons/si";
import { RiExternalLinkFill } from "react-icons/ri";
import Spline from "@splinetool/react-spline";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg[#092226]/70 text-white overflow-hidden">
      {/* Hero Section */}
      <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)] px-6 lg:px-20 mb-10">
        {/* Left Content */}
        <div className="max-w-xl z-10 mt-10 sm:mt-16 lg:mt-40 text-center lg:text-left animate-fadeIn">
          {/* Badge */}
          <div className="relative mx-auto lg:mx-0 w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#89a2a6] to-[#becac8] rounded-full hover:scale-105 transition-all duration-300">
            <div className="absolute inset-[3px] bg-[#08292e] rounded-full flex items-center justify-center gap-1">
              <IoDiamondSharp className="animate-pulse" />
              <span className="text-sm sm:text-base text-[#becac8] font-light tracking-wider">
                We give Clarity
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[#becac8] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8">
            Law at Your Fingertips
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg tracking-wide text-gray-400 max-w-[25rem] lg:max-w-[30rem] mx-auto lg:mx-0">
            Crafted for clarity, balance, and vision — the Clarity Engine is
            where technology meets justice, turning complexity into confidence
            and insight into action.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center lg:justify-start">
            <Link
              to="/category"
              className="flex items-center gap-2 border border-[#becac8] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-[#89a2a6] hover:to-[#becac8] hover:text-[#08292e]"
            >
              <RiExternalLinkFill />
              Category
            </Link>
            <Link
              to="/search"
              className="flex items-center gap-2 border py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-[#08292e] hover:from-[#08292e] hover:to-[#111] hover:text-[#becac8] hover:scale-105"
            >
              <SiChainlink />
              GET STARTED
            </Link>
          </div>
        </div>

        {/* Right Side 3D Spline */}
        <div className="relative w-full lg:w-[50%] h-[400px] sm:h-[500px] lg:h-[700px] animate-float">
          <Spline scene="https://prod.spline.design/zHdL4fLC68VLmFBT/scene.splinecode" />
        </div>
      </main>

      {/* Who We Are */}
      <section className="py-20 px-6 lg:px-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="hover:translate-x-2 transition-transform duration-500">
              <h3 className="text-2xl font-semibold mb-4 text-[#89a2a6]">
                Our Mission
              </h3>
              <p className="text-gray-300 mb-6">
                At LexEye, we believe that legal knowledge should be accessible
                to everyone. Our mission is to demystify complex legal
                information and present it in a way that's easy to understand
                and navigate.
              </p>
              <p className="text-gray-300 mb-6">
                Founded by legal professionals and technology experts, we bridge
                the gap between complex legal jargon and everyday understanding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#111] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-[#89a2a6]/40">
                <FaLightbulb className="text-3xl text-[#89a2a6] mb-4 animate-pulse" />
                <h4 className="text-xl font-semibold mb-2">Our Vision</h4>
                <p className="text-gray-400">
                  To create the world's most accessible legal knowledge
                  platform.
                </p>
              </div>
              <div className="bg-[#111] p-6 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6] hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-[#89a2a6]/40">
                <FaBook className="text-3xl text-[#89a2a6] mb-4 animate-pulse" />
                <h4 className="text-xl font-semibold mb-2">Our Values</h4>
                <p className="text-gray-400">
                  Accuracy, accessibility, and user-first design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Find Things */}
      <section className="py-20 px-6 lg:px-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Find Information
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#89a2a6] to-[#becac8] mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { icon: <FaSearch />, title: "Search Function", link: "/search" },
              { icon: <FaBook />, title: "Browse Categories", link: "/category" },
              { icon: <FaBookmark />, title: "Save Bookmarks", link: "/signin" }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#092226]/50 p-8 rounded-xl border border-[#89a2a6]/20 hover:border-[#89a2a6]/50 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-[#89a2a6]/40 cursor-pointer"
              >
                <div className="bg-[#89a2a6]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300 mb-6">
                  {i === 0
                    ? "Use keywords to find laws, cases, or legal concepts instantly."
                    : i === 1
                    ? "Explore our organized categories to discover legal information."
                    : "Bookmark information for quick access and build your legal library."}
                </p>
                <Link
                  to={item.link}
                  className="text-[#89a2a6] hover:text-[#becac8] flex items-center gap-2"
                >
                  Learn More <FaArrowRight className="text-sm" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-20 animate-fadeIn">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore Legal Knowledge?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of users who have simplified their legal research
            with LexEye.
          </p>
          <Link
            to="/search"
            className="bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-black py-3 px-8 rounded-full font-medium transition-all hover:shadow-lg hover:scale-110 inline-flex items-center gap-2"
          >
            Get Started Now <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
