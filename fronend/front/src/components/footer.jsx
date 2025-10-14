import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiMail, 
  FiGithub, 
  FiTwitter, 
  FiHeart,
  FiArrowUp,
  FiBook,
  FiUsers,
  FiHome,
  FiHelpCircle,
  FiUser,
  FiSend,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Enhanced Disclaimer Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-y border-amber-400/30 py-4 px-6 text-center relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(251,191,36,0.1)_50%,transparent_75%)] bg-[size:10px_10px]" />
        </div>
        
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-sm relative z-10">
          <p className="text-amber-200 font-medium">
            <span className="font-bold text-amber-300">IMPORTANT:</span> LexEye provides informational guidance only. 
            For specific legal advice, always consult a{" "}
            <span className="font-bold text-amber-300">licensed legal professional</span>.
          </p>
        </div>
      </motion.div>

      {/* Main Footer */}
      <footer className="bg-gradient-to-br from-[#051c1f] to-[#08292e] text-gray-300 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-32 h-32 bg-cyan-500/5 rounded-full blur-xl -top-8 -left-8" />
          <div className="absolute w-24 h-24 bg-blue-500/5 rounded-full blur-xl bottom-16 right-16" />
          <div className="absolute w-20 h-20 bg-teal-500/5 rounded-full blur-xl top-1/2 left-1/3" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto py-16 px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src="/logo-2.png" 
                    alt="LexEye Logo" 
                    className="w-14 h-14 rounded-xl shadow-2xl" 
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-2xl shadow-cyan-500/20" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold bg-white text-transparent bg-clip-text tracking-wide">
                    Lex<span className="text-cyan-400">Eye</span>
                  </h2>
                  <p className="text-cyan-400 text-sm font-medium">Legal Intelligence Platform</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Your clarity engine for legal knowledge. Explore categories, search laws, 
                and bookmark what matters most — all designed for modern legal research.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { 
                    icon: FiMail, 
                    href: "mailto:contact.lexeye78@gmail.com", 
                    color: "hover:bg-cyan-500/20 hover:border-cyan-400/30",
                    tooltip: "Email Us"
                  },
                  { 
                    icon: FiGithub, 
                    href: "#", 
                    color: "hover:bg-purple-500/20 hover:border-purple-400/30",
                    tooltip: "GitHub"
                  },
                  { 
                    icon: FiTwitter, 
                    href: "#", 
                    color: "hover:bg-blue-500/20 hover:border-blue-400/30",
                    tooltip: "Twitter"
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-gray-400 ${social.color} transition-all duration-300 group relative`}
                    title={social.tooltip}
                  >
                    <social.icon className="text-lg group-hover:scale-110 transition-transform" />
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {social.tooltip}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <FiHome className="text-cyan-400" />
                Quick Navigation
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home", icon: FiHome },
                  { to: "/search", label: "Search Laws", icon: FiHelpCircle },
                  { to: "/category", label: "Categories", icon: FiBook },
                  { to: "/glossary", label: "Legal Glossary", icon: FiBook },
                  { to: "/bookmarks", label: "My Bookmarks", icon: FiUser }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-all duration-300 group py-2"
                    >
                      <link.icon className="text-gray-500 group-hover:text-cyan-400 transition-colors text-sm" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <FiUsers className="text-cyan-400" />
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/comment", label: "Feedback & Suggestions" },
                  { to: "/about", label: "About LexEye" },
                  { to: "/faq", label: "FAQ & Help Center" },
                  { to: "#", label: "Legal Resources" },
                  { to: "#", label: "Community Forum" }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-cyan-400 transition-all duration-300 py-2 block"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <FiSend className="text-cyan-400" />
                Stay Connected
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest legal insights and platform updates delivered to your inbox.
              </p>
              
              {/* Newsletter Form */}
              <div className="space-y-3 mb-6">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 pr-12"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all duration-300"
                  >
                    <FiSend className="text-sm" />
                  </motion.button>
                </div>
                <p className="text-gray-500 text-xs">
                  No spam, unsubscribe at any time
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 group">
                  <FiMail className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <a href="mailto:contact.lexeye78@gmail.com" className="text-sm">
                    contact.lexeye78@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 group">
                  <FiMapPin className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Pakistan</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            className="mt-12 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiHeart className="text-red-400" />
              </motion.div>
              <span>
                © {new Date().getFullYear()} LexEye • A University Project by{" "}
                <span className="text-cyan-400 font-semibold">Team Mavericks</span>
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              
              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-cyan-500/20 border border-cyan-400/30 rounded-xl text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300 flex items-center gap-2 group"
                title="Back to top"
              >
                <span className="text-xs">Top</span>
                <FiArrowUp className="text-sm group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* University Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <FiUsers className="text-cyan-400 text-sm" />
              <span className="text-gray-400 text-xs">University Project • Computer Science Department</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;