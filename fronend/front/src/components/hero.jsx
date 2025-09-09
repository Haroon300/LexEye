import { IoDiamondSharp } from "react-icons/io5";
import { SiChainlink } from "react-icons/si";
import { RiExternalLinkFill } from "react-icons/ri";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)] px-6 lg:px-20">
      {/* Left Content (Text Section) */}
      <div className="max-w-xl z-10 mt-10 sm:mt-16 lg:mt-40 text-center lg:text-left">
        {/* Badge */}
        <div className="relative mx-auto lg:mx-0 w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] rounded-full">
          <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
            <IoDiamondSharp />
            <span className="text-sm sm:text-base text-gray-400 font-light tracking-wider">
              We give Clarity
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8">
          Law at Your Fingertips
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg tracking-wide text-gray-400 max-w-[25rem] lg:max-w-[30rem] mx-auto lg:mx-0">
          Crafted for clarity, balance, and vision — the Clarity Engine is where
          technology meets justice, turning complexity into confidence and
          insight into action.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center lg:justify-start">
          <Link
            to="/category"
            className="flex items-center gap-2 border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]"
          >
            <RiExternalLinkFill />
            Category
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-2 border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white"
          >
            <SiChainlink />
            GET STARTED
          </Link>
        </div>
      </div>

      {/* Right Side 3D Spline */}
      <div className="relative w-full lg:w-[50%] h-[400px] sm:h-[500px] lg:h-[700px]">
        <Spline scene="https://prod.spline.design/zHdL4fLC68VLmFBT/scene.splinecode" />
      </div>
    </main>
  );
};

export default Hero;


{/* <Spline className="absolute  lg:top-10 top-[40%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full" scene="https://prod.spline.design/V107IOuCTbYiqS2Z/scene.splinecode" /> */}