import { IoDiamondSharp } from "react-icons/io5";
import { SiChainlink } from "react-icons/si";
import { RiExternalLinkFill } from "react-icons/ri";

const Hero = () => {
    return (
        <main className="flex flex-col lg:mt-20 lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]">
            <div className="max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-0">
                <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] rounded-full">
                    <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
                        <IoDiamondSharp />
                        <span className="text-sm sm:text-base text-gray-400 font-light tracking-wider">We gives Clarity</span>
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl mg:text-5xl lg:6xl font-semibold trackering-wider my-8">
                    Law at Your Fingertips
                </h1>
                <p className="text-base sm:text-lg tracking-wide text-gray-400 max-w-[25rem] lg:max-w-[30rem]">
                    Crafted for clarity, balance, and vision — the Clarity Engine is
                    where technology meets justice, turning complexity into
                    confidence and insight into action.
                </p>
                <div className="flex gap-4 mt-12">
                    <a href="#" className="flex items-center gap-2 border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[1a1a1a]">
                        <RiExternalLinkFill />
                        Category
                    </a>
                    <a href="#" className="flex items-center gap-2 border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white">
                        <SiChainlink />
                        GET STARTED
                    </a>
                </div>    
            </div>


        </main>
    )
}

export default Hero;