import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-#092226/70 backdrop-blur-md border-t border-gray-800 text-gray-400 py-10 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="LexEye Logo" className="w-15 h-12" />
            <h2 className="text-2xl font-light text-white">LexEye</h2>
          </div>
          <p className="text-sm leading-relaxed">
            LexEye is your clarity engine for legal knowledge. Explore categories, 
            search laws, and bookmark what matters most — all at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/search" className="hover:text-white transition">Search</Link>
          <Link to="/category" className="hover:text-white transition">Categories</Link>
          <Link to="/bookmarks" className="hover:text-white transition">Bookmarks</Link>
          <Link to="/signin" className="hover:text-white transition">Sign In</Link>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-5 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LexEye. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
