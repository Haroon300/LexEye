import { Link } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import { TbBrandGoogleHome } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { FaBookBookmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
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
        <Link className="flex items-center gap-2 hover:text-gray-300" to="/">
          <TbBrandGoogleHome className="text-lg" />
          Home
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-300" to="/search">
          <AiOutlineFileSearch className="text-lg" />
          Search
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-300" to="/category">
          <TfiLayoutAccordionList className="text-lg" />
          Category
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-300" to="/bookmarks">
          <FaBookBookmark className="text-lg" />
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
        onClick={toggleMobileMenu}
        className="md:hidden text-3xl p-2 text-white hover:text-gray-300"
      >
        <CgMenuGridR />
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 h-full w-full bg-black backdrop-blur-md z-40 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-3xl text-white hover:text-gray-300"
          onClick={toggleMobileMenu}
        >
          <IoClose />
        </button>

        <nav className="flex flex-col gap-6 bg-black/50 py-20 items-start mt-20 px-8">
          <Link
            onClick={toggleMobileMenu}
            className="flex items-center gap-3 text-lg hover:text-gray-300"
            to="/"
          >
            <TbBrandGoogleHome /> Home
          </Link>
          <Link
            onClick={toggleMobileMenu}
            className="flex items-center gap-3 text-lg hover:text-gray-300"
            to="/search"
          >
            <AiOutlineFileSearch /> Search
          </Link>
          <Link
            onClick={toggleMobileMenu}
            className="flex items-center gap-3 text-lg hover:text-gray-300"
            to="/category"
          >
            <TfiLayoutAccordionList /> Category
          </Link>
          <Link
            onClick={toggleMobileMenu}
            className="flex items-center gap-3 text-lg hover:text-gray-300"
            to="/bookmarks"
          >
            <FaBookBookmark /> Bookmarks
          </Link>

          <Link
            onClick={toggleMobileMenu}
            to="/signin"
            className="mt-8 bg-[#a7a7a7] text-black py-2 px-6 rounded-full font-medium hover:bg-white self-center"
          >
            SIGN IN
          </Link>
        </nav>
      </div>
    </header>
  );
}
