import { Link } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import { TbBrandGoogleHome } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { FaBookBookmark } from "react-icons/fa6";

export default function Header() {
  const toggleMobleMenu = () => {
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-4 lg:px-20 font-light bg-black/70 backdrop-blur-md z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/icon.PNG" className="w-14 h-14" alt="LexEye Logo" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light">LexEye</h1>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-12">
        <Link
          className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300"
          to="/"
        >
          <TbBrandGoogleHome />
          Home
        </Link>
        <Link
          className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300"
          to="/search"
        >
          <AiOutlineFileSearch />
          Search
        </Link>
        <Link
          className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300"
          to="#"
        >
          <TfiLayoutAccordionList />
          Category
        </Link>
        <Link
          className="flex items-center gap-2 text-base tracking-wider transition-colors hover:text-gray-300"
          to="#"
        >
          <FaBookBookmark />
          Bookmarks
        </Link>
      </nav>

      {/* Signin Button */}
      <Link
        to="/signin"
        className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium transition-all duration-500 hover:bg-white"
      >
        SIGN IN
      </Link>

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={toggleMobleMenu}
        className="md:hidden text-3xl p-2 text-white hover:text-gray-300"
      >
        <CgMenuGridR />
      </button>

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className="bg-black bg-opacity-70 z-40 fixed top-20 left-0 right-0 bottom-0 backdrop-blur-md hidden"
      >
        <nav className="flex flex-col gap-6 items-center mt-10">
          <Link
            className="flex items-center gap-2 text-base tracking-wider hover:text-gray-300"
            to="/"
          >
            <TbBrandGoogleHome />
            Home
          </Link>
          <Link
            className="flex items-center gap-2 text-base tracking-wider hover:text-gray-300"
            to="/search"
          >
            <AiOutlineFileSearch />
            Search
          </Link>
          <Link
            className="flex items-center gap-2 text-base tracking-wider hover:text-gray-300"
            to="#"
          >
            <TfiLayoutAccordionList />
            Category
          </Link>
          <Link
            className="flex items-center gap-2 text-base tracking-wider hover:text-gray-300"
            to="#"
          >
            <FaBookBookmark />
            Bookmarks
          </Link>
          <Link
            to="/signin"
            className="mt-6 bg-[#a7a7a7] text-black py-2 px-6 rounded-full font-medium hover:bg-white"
          >
            SIGN IN
          </Link>
        </nav>
      </div>
    </header>
  );
}
