import { Link, useNavigate, useLocation } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import { TbBrandGoogleHome } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { FaBookBookmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 🟢 Use correct key and parse JSON
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserName(userObj.name || userObj.email || "User");
      } catch (err) {
        console.error("Invalid user data:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName(null);
    setIsDropdownOpen(false);
    navigate("/signin");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <TbBrandGoogleHome /> },
    { to: "/search", label: "Search", icon: <AiOutlineFileSearch /> },
    { to: "/category", label: "Category", icon: <TfiLayoutAccordionList /> },
    { to: "/bookmarks", label: "Bookmarks", icon: <FaBookBookmark /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 lg:px-20 bg-[#092226]/40 backdrop-blur-md shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/logo-2.png"
          className="w-11 h-11 rounded-lg border-none"
          alt="LexEYE"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-white">
          Lex<span className="text-[#89a2a6]">Eye</span>
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* 🟢 User Avatar / Signin */}
        {userName ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-full bg-gradient-to-r from-[#0c606d] to-[#111] h-11 w-11 flex items-center justify-center text-white text-lg font-bold shadow-md hover:scale-105 transition"
            >
              {userName.charAt(0).toUpperCase()}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-xl overflow-hidden animate-fadeIn">
                <div className="px-4 py-2 text-[#08292e] text-sm border-b">
                  Signed in as <br />
                  <span className="font-semibold">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-[#89a2a6] hover:bg-gradient-to-r from-[#0c606d] to-[#111] hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Show only when width > 450
          <Link
            to="/signin"
            className="hidden min-[451px]:inline-block bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-black py-2.5 px-7 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
          >
            SIGN IN
          </Link>
        )}

        {/* Popup Menu Button */}
        <button
          type="button"
          onClick={() => setIsPopupOpen(true)}
          className="text-3xl p-2 text-white hover:text-[#89a2a6] transition"
        >
          <CgMenuGridR />
        </button>
      </div>

      {/* Overlay */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsPopupOpen(false)}
        />
      )}

      {/* Popup Grid */}
      {isPopupOpen && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[#111] rounded-2xl shadow-2xl z-50 p-8 animate-scaleIn 
               top-[350%] max-[450px]:top-[350%] min-[451px]:top-[300%] sm:top-[200%]"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-[#89a2a6] transition"
            onClick={() => setIsPopupOpen(false)}
          >
            <IoClose />
          </button>

          {/* Grid Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setIsPopupOpen(false)}
                className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all ${
                  location.pathname === to
                    ? " text-[#ffffff] border bg-gradient-to-r from-[#0c606d] to-[#111]"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-gradient-to-r from-[#0c606d] to-[#111] hover:text-[#ffffff] hover:scale-105"
                }`}
              >
                <span className="text-3xl mb-2">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}

            {/* Sign In in Grid only when width ≤ 450 */}
            {!userName && (
              <Link
                to="/signin"
                onClick={() => setIsPopupOpen(false)}
                className="hidden max-[450px]:flex flex-col items-center justify-center py-6 rounded-xl bg-[#1a1a1a] text-gray-300 hover:bg-[#222] hover:text-[#89a2a6] hover:scale-105 transition-all"
              >
                <span className="text-sm font-medium">SIGN IN</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes scaleIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }
        `}
      </style>
    </header>
  );
}
