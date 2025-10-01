import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Transparency Bar */}
      <div className="w-full bg-gray-100 text-gray-900 py-3 px-6 text-center text-sm font-semibold">
        IMPORTANT: LexEye provides informational guidance only. For specific
        advice, laws, or personal cases, always consult a{" "}
        <span className="font-bold">licensed legal professional</span>.
      </div>

      <footer className="bg-[#071b1e] text-gray-300 py-12 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo + About */}
          <div className="flex flex-col items-start text-sm font-normal">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-2.png" alt="LexEye Logo" className="w-12 h-12" />
              <h2 className="text-sm font-normal text-white">LexEye</h2>
            </div>
            <p className="leading-relaxed text-gray-300">
              LexEye is your clarity engine for legal knowledge. Explore
              categories, search laws, and bookmark what matters most, all at
              your fingertips.
            </p>
          </div>

          {/* Column 2: Get Involved */}
          <div className="flex flex-col items-start md:pl-8 text-sm font-normal">
            <h3 className="text-sm font-normal text-white mb-4">Get Involved</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="/feedback"
                  className="hover:text-[#89a2a6] transition-colors"
                >
                  Feedback & Help
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#89a2a6] transition-colors"
                >
                  About LexEye
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Fast Links */}
          <div className="flex flex-col items-start md:pl-8 text-sm font-normal">
            <h3 className="text-sm font-normal text-white mb-4">Fast Links</h3>
            <ul className="flex flex-col gap-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-[#89a2a6] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/glossary"
                  className="hover:text-[#89a2a6] transition-colors"
                >
                  Glossary
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-[#89a2a6] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/signin"
                  className="hover:text-[#89a2a6] transition-colors"
                >
                  Sign In / Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} LexEye • A University Project by Team
          Mavericks
        </div>
      </footer>
    </>
  );
};

export default Footer;
