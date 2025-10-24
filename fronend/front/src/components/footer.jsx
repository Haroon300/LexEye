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
  FiShield,
  FiBookmark,
  FiFolder
} from "react-icons/fi";

import logo from '/logo-2.png';

/* Color Constants matching your palette */
const COLORS = {
  navy: {
    1: '#000000',
    2: '#66666e',
    3: '#9999a1',
    4: '#e6e6e9',
    5: '#f4f4f6'
  }
};

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
        className="w-full border-y py-4 px-6 text-center relative overflow-hidden backdrop-blur-sm"
        style={{
          backgroundColor: `${COLORS.navy[2]}E6`,
          borderColor: `${COLORS.navy[4]}30`
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(116,140,171,0.1)_50%,transparent_75%)] bg-[size:10px_10px]" />
        </div>
        
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-sm relative z-10">
          <div 
            className="flex-shrink-0 p-2 rounded-lg"
            style={{
              backgroundColor: `${COLORS.navy[4]}20`,
              border: `1px solid ${COLORS.navy[4]}30`
            }}
          >
            <FiShield className="text-lg" style={{ color: COLORS.navy[4] }} />
          </div>
          <p className="font-medium" style={{ color: COLORS.navy[5] }}>
            <span className="font-bold" style={{ color: COLORS.navy[4] }}>Important:</span> LexEye provides informational guidance only. 
            For specific legal advice, consult a{" "}
            <span className="font-bold" style={{ color: COLORS.navy[4] }}>licensed legal professional</span>.
          </p>
        </div>
      </motion.div>

      {/* Main Footer */}
      <footer className="relative overflow-hidden" style={{ backgroundColor: COLORS.navy[1] }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-32 h-32 rounded-full blur-xl -top-8 -left-8"
            style={{ backgroundColor: `${COLORS.navy[3]}10` }}
          />
          <div 
            className="absolute w-24 h-24 rounded-full blur-xl bottom-16 right-16"
            style={{ backgroundColor: `${COLORS.navy[4]}10` }}
          />
          <div 
            className="absolute w-20 h-20 rounded-full blur-xl top-1/2 left-1/3"
            style={{ backgroundColor: `${COLORS.navy[2]}20` }}
          />
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
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="relative w-12 h-12"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl border backdrop-blur-xl"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}30`
                    }}
                  />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      className="text-2xl" 
                      src={logo}
                      alt="LexEye logo"
                    />
                  </div>
                </motion.div>
                
                <div className="flex flex-col">
                  <h1 
                    className="text-2xl font-black tracking-tight"
                    style={{ color: COLORS.navy[5] }}
                  >
                    Lex<span style={{ color: COLORS.navy[4] }}>Eye</span>
                  </h1>
                  <p 
                    className="text-xs font-medium tracking-wider"
                    style={{ color: COLORS.navy[4] }}
                  >
                    LEGAL INTELLIGENCE
                  </p>
                </div>
              </div>
              
              <p 
                className="leading-relaxed mb-6 text-sm font-light"
                style={{ color: COLORS.navy[5] }}
              >
                Your clarity engine for legal knowledge. Explore categories, search laws, 
                and bookmark what matters most — all designed for modern legal research.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { 
                    icon: FiMail, 
                    href: "mailto:contact.lexeye78@gmail.com", 
                    tooltip: "Email Us"
                  },
                  { 
                    icon: FiGithub, 
                    href: "#", 
                    tooltip: "GitHub"
                  },
                  { 
                    icon: FiTwitter, 
                    href: "#", 
                    tooltip: "Twitter"
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl border transition-all duration-300 group relative backdrop-blur-xl"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[5]
                    }}
                    title={social.tooltip}
                  >
                    <social.icon className="text-lg group-hover:scale-110 transition-transform" />
                    {/* Tooltip */}
                    <div 
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap backdrop-blur-xl border"
                      style={{
                        backgroundColor: `${COLORS.navy[2]}F0`,
                        borderColor: `${COLORS.navy[4]}30`,
                        color: COLORS.navy[5]
                      }}
                    >
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
              <h3 
                className="text-lg font-semibold mb-6 flex items-center gap-2"
                style={{ color: COLORS.navy[5] }}
              >
                <FiHome style={{ color: COLORS.navy[4] }} />
                Quick Navigation
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home", icon: FiHome },
                  { to: "/search", label: "Search Laws", icon: FiHelpCircle },
                  { to: "/category", label: "Categories", icon: FiFolder },
                  { to: "/glossary", label: "Legal Glossary", icon: FiBook },
                  { to: "/bookmarks", label: "My Bookmarks", icon: FiBookmark }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 transition-all duration-300 group py-2"
                      style={{ color: COLORS.navy[5] }}
                    >
                      <link.icon 
                        className="text-sm transition-colors group-hover:scale-110" 
                        style={{ color: `${COLORS.navy[5]}80` }}
                      />
                      <span className="font-light group-hover:font-normal">
                        {link.label}
                      </span>
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
              <h3 
                className="text-lg font-semibold mb-6 flex items-center gap-2"
                style={{ color: COLORS.navy[5] }}
              >
                <FiUsers style={{ color: COLORS.navy[4] }} />
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/comment", label: "Feedback & Suggestions" },
                  { to: "/about", label: "About LexEye" },
                  { to: "/helpline", label: "Emergency Helpline" },
                  { to: "/faq", label: "FAQ & Help Center" }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link
                      to={link.to}
                      className="transition-all duration-300 py-2 block font-light hover:font-normal"
                      style={{ color: COLORS.navy[5] }}
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
              <h3 
                className="text-lg font-semibold mb-6 flex items-center gap-2"
                style={{ color: COLORS.navy[5] }}
              >
                <FiSend style={{ color: COLORS.navy[4] }} />
                Stay Connected
              </h3>
              <p 
                className="text-sm mb-4 font-light"
                style={{ color: COLORS.navy[5] }}
              >
                Get the latest legal insights and platform updates delivered to your inbox.
              </p>
              
              {/* Newsletter Form */}
              <div className="space-y-3 mb-6">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 backdrop-blur-xl border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 pr-12"
                    style={{
                      backgroundColor: `${COLORS.navy[2]}80`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[5]
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 border rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`,
                      color: COLORS.navy[4]
                    }}
                  >
                    <FiSend className="text-sm" />
                  </motion.button>
                </div>
                <p 
                  className="text-xs font-light"
                  style={{ color: `${COLORS.navy[5]}70` }}
                >
                  No spam, unsubscribe at any time
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 transition-colors duration-200 group">
                  <FiMail 
                    className="transition-transform group-hover:scale-110" 
                    style={{ color: COLORS.navy[4] }}
                  />
                  <a 
                    href="mailto:contact.lexeye78@gmail.com" 
                    className="text-sm font-light group-hover:font-normal"
                    style={{ color: COLORS.navy[5] }}
                  >
                    contact.lexeye78@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 transition-colors duration-200 group">
                  <FiMapPin 
                    className="transition-transform group-hover:scale-110" 
                    style={{ color: COLORS.navy[4] }}
                  />
                  <span 
                    className="text-sm font-light group-hover:font-normal"
                    style={{ color: COLORS.navy[5] }}
                  >
                    Pakistan
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            className="mt-12 pt-8 border-t flex flex-col lg:flex-row justify-between items-center gap-4"
            style={{ borderColor: `${COLORS.navy[4]}20` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 text-sm">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiHeart style={{ color: COLORS.navy[4] }} />
              </motion.div>
              <span 
                className="font-light"
                style={{ color: COLORS.navy[5] }}
              >
                © {new Date().getFullYear()} LexEye • A University Project by{" "}
                <span className="font-semibold" style={{ color: COLORS.navy[4] }}>Team Mavericks</span>
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 border rounded-xl transition-all duration-300 flex items-center gap-2 group backdrop-blur-xl"
                style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`,
                  color: COLORS.navy[4]
                }}
                title="Back to top"
              >
                <span className="text-xs font-medium">Top</span>
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
            <div 
              className="inline-flex items-center gap-2 border rounded-full px-4 py-2 backdrop-blur-xl"
              style={{
                backgroundColor: `${COLORS.navy[2]}80`,
                borderColor: `${COLORS.navy[4]}30`
              }}
            >
              <FiUsers style={{ color: COLORS.navy[4] }} className="text-sm" />
              <span 
                className="text-xs font-light"
                style={{ color: `${COLORS.navy[5]}80` }}
              >
                University Project • Computer Science Department
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;