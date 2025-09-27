import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#092226]/70 backdrop-blur-md border-t border-gray-800 text-gray-400 py-10 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo-2.png" alt="LexEye Logo" className="w-16 h-12" />
            <h2 className="text-2xl font-light text-white">LexEye</h2>
          </div>
          <p className="text-sm leading-relaxed">
            LexEye is your clarity engine for legal knowledge. Explore
            categories, search laws, and bookmark what matters most — all at
            your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/search" className="hover:text-white transition">
            Search
          </Link>
          <Link to="/category" className="hover:text-white transition">
            Categories
          </Link>
          <Link to="/bookmarks" className="hover:text-white transition">
            Bookmarks
          </Link>
          <Link to="/signin" className="hover:text-white transition">
            Sign In
          </Link>
        </div>

        {/* Comment Form */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Leave a Comment!
          </h3>
          <form
            action="https://formsubmit.co/staff.alabrar.faseeh@gmail.com"
            method="POST"
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="p-3 rounded-lg text-black"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="p-3 rounded-lg text-black"
              required
            />
            <textarea
              name="message"
              placeholder="Write your comment here..."
              required
              className="p-3 rounded-lg text-black"
              rows="4"
            ></textarea>

            {/* Hidden fields */}
            <input
              type="hidden"
              name="_next"
              value="https://lexeye.vercel.app/"
            />
            <input type="hidden" name="_captcha" value="false" />

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </form>
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
