import { CgMenuGridR } from "react-icons/cg";
import { TbBrandGoogleHome } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { FaBookBookmark } from "react-icons/fa6";

export default function Header() {
    
    const toggleMobleMenu = ()=>{
        const mobileMenu = document.getElementById('mobileMenu');

        if(mobileMenu.classList.contains('hidden')){ 
            mobileMenu.classList.remove('hidden'); 
        }else{
            mobileMenu.classList.add('hidden');
        }
    }
    
    return (
        <header className="flex justify-between items-center py-4 px-4 lg:px-20 font-light m-0 ">
            <img src='/icon.PNG' className="w-20 h-20" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light m-0">LexEye</h1>

            <nav className="hidden md:flex items-center gap-12">
                <a className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
                    <TbBrandGoogleHome />
                    Home
                </a>
                <a className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
                    <AiOutlineFileSearch />
                    Search
                </a>
                <a className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
                    <TfiLayoutAccordionList />
                    Category
                </a>
                <a className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
                    <FaBookBookmark />
                    Bookmarks
                </a>
            </nav>
            <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full  border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50">
                SIGNIN
            </button>
            
            <button type="button" onClick={toggleMobleMenu} className='md:hidden text-3xl p-2 z-50 text-white hover:text-gray-300'>
                <CgMenuGridR />
            </button>

            <div id='mobileMenu' className='bg-black bg-opacity-70 z-40 fixed top-20 left-0 right-0 bottom-0 backdrop-blur-md hidden'>
                <nav className='flex flex-col gap-6 items-center'>
                    <a className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
                        <TbBrandGoogleHome />
                        Home
                    </a>
                    <a className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
                        <AiOutlineFileSearch />
                        Search
                    </a>
                    <a className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
                        <TfiLayoutAccordionList />
                        Category
                    </a>
                    <a className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#">
                        <FaBookBookmark />
                        Bookmarks
                    </a>
                </nav>
            </div>

        </header>
    );
}