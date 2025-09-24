import { Link, useNavigate, useLocation } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import { TbBrandGoogleHome } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { FaBookBookmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) setUserName(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    setUserName(null);
    setIsDropdownOpen(false);
    navigate("/signin");
  };

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/", label: "Home", icon: <TbBrandGoogleHome /> },
    { to: "/search", label: "Search", icon: <AiOutlineFileSearch /> },
    { to: "/category", label: "Category", icon: <TfiLayoutAccordionList /> },
    { to: "/bookmarks", label: "Bookmarks", icon: <FaBookBookmark /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 lg:px-20 bg-#092226/40  backdrop-blur-md shadow-md z-50 border-none">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" className="w-12 h-8 rounded-lg border-none" alt="LexEYE"  />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-white">
          Lex<span className="text-[#e99b63]">Eye</span>
        </h1>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-10 text-white">
        {navLinks.map(({ to, label, icon }) => (
          <Link
            key={label}
            className={`flex items-center gap-2 transition relative group ${
              location.pathname === to ? "text-[#e99b63]" : "hover:text-[#e99b63]"
            }`}
            to={to}
          >
            {icon}
            {label}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#e99b63] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* User Avatar / Signin */}
      {userName ? (
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="rounded-full bg-gradient-to-r from-[#e99b63] to-[#c9743d] h-11 w-11 flex items-center justify-center text-white text-lg font-bold shadow-md hover:scale-105 transition"
          >
            {userName.charAt(0).toUpperCase()}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-xl overflow-hidden animate-fadeIn">
              <div className="px-4 py-2 text-gray-700 text-sm border-b">
                Signed in as <br />
                <span className="font-semibold">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/signin"
          className="hidden md:block bg-gradient-to-r from-[#e99b63] to-[#c9743d] text-black py-2.5 px-7 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
        >
          SIGN IN
        </Link>
      )}

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="md:hidden text-3xl p-2 text-white hover:text-gray-300"
      >
        <CgMenuGridR />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Nav */}
      <div
        className={`fixed top-0 right-0 bottom-0 h-full w-4/5 sm:w-2/5 bg-[#111] z-50 transform transition-transform duration-500 ease-in-out shadow-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-[#e99b63] transition"
          onClick={toggleMobileMenu}
        >
          <IoClose />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-8 mt-8">
          <img src="/icon.PNG" className="w-10 h-10 rounded-lg shadow" alt="LexEye Logo" />
          <h1 className="text-2xl font-semibold text-white">
            Lex<span className="text-[#e99b63]">Eye</span>
          </h1>
        </div>
        
        

        {/* Nav Links */}
        <nav className="flex flex-col gap-4 mt-12 px-8 text-lg font-medium bg-[#111]/70">
          {navLinks.map(({ to, label, icon }, idx) => (
            <Link
              key={label}
              to={to}
              onClick={toggleMobileMenu}
              className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-300 ${
                location.pathname === to
                  ? "bg-[#222] text-[#e99b63]"
                  : "text-gray-300 hover:bg-[#222] hover:text-[#e99b63]"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <span className="text-xl">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-6 mx-8 border-t border-gray-700" />

        {/* User Section */}
        <div className="px-8 bg-[#111] pb-6">
          {userName ? (
            <>
              <div className="text-gray-400 text-sm mb-3">
                Signed in as <span className="font-semibold text-white">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              onClick={toggleMobileMenu}
              to="/signin"
              className="block w-full bg-gradient-to-r from-[#e99b63] to-[#c9743d] text-black text-center py-2 rounded-lg font-medium hover:scale-105 hover:shadow-md transition"
            >
              SIGN IN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
