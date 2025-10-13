import React from "react";
import { motion } from "framer-motion";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { 
  FiUsers, 
  FiTarget, 
  FiSearch, 
  FiBookmark, 
  FiLayout, 
  FiHeart,
  FiAward,
  FiGlobe,
  FiCode,
  FiBook
} from "react-icons/fi";

const About = () => {
  const navigate = useNavigate(); 
  
  const team = [
    { name: "Obaid", role: "Project Manager", color: "from-blue-500 to-cyan-500" },
    { name: "Haroon", role: "Backend Developer", color: "from-green-500 to-emerald-500" },
    { name: "Faseeh & Ahmed", role: "Frontend Developers", color: "from-purple-500 to-pink-500" },
    { name: "Bilal", role: "Legal Content Researcher", color: "from-orange-500 to-red-500" },
    { name: "Hasnain", role: "UI/UX Designer & Tester", color: "from-yellow-500 to-amber-500" },
  ];

  const reasons = [
    {
      icon: <FiSearch className="text-3xl" />,
      title: "Smart Search System",
      desc: "Quickly find laws and legal concepts using advanced search and filtering algorithms.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiBookmark className="text-3xl" />,
      title: "Offline Bookmark Access",
      desc: "Save and access important laws even when you're offline — synced automatically later.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FiLayout className="text-3xl" />,
      title: "Clean & Modern UI",
      desc: "Designed with a user-first approach to ensure clarity, elegance, and smooth navigation.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiHeart className="text-3xl" />,
      title: "Built by Passionate Minds",
      desc: "Created by Team Mavericks — a dedicated group of developers, designers, and researchers.",
      color: "from-orange-500 to-red-500"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen mt-[5%] bg-gradient-to-br from-[#051c1f] via-[#08292e] to-[#0a1b1f] text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-blue-400/10 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-teal-400/10 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20"
          >
            <TiArrowBack className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Previous
          </button>
        </motion.div>

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-6">
            <FiAward className="text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">About LexEye</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-cyan-200 via-gray-200 to-silver text-transparent bg-clip-text mb-6">
            About LexEye
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing legal research through technology, making law accessible and understandable for everyone.
          </p>
        </motion.div>

        {/* Description Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-200 to-gray-200 text-transparent bg-clip-text mb-6">
                  What is LexEye?
                </h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    <strong className="text-cyan-300">LexEye</strong> is an advanced legal information and research platform developed by <strong className="text-cyan-300">Team Mavericks</strong>. We're transforming how people access and understand legal documents, laws, and regulations through intelligent technology and thoughtful design.
                  </p>
                  <p>
                    Our platform combines powerful search algorithms with a user-friendly interface, making legal research faster, smarter, and more accessible than ever before.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/30 flex items-center justify-center">
                    <FiBook className="text-8xl text-cyan-400/50" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30 flex items-center justify-center">
                    <FiSearch className="text-3xl text-purple-400/50" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 flex items-center justify-center">
                    <FiBookmark className="text-2xl text-green-400/50" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-400/30">
                <FiTarget className="text-3xl text-blue-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 text-transparent bg-clip-text">
                Our Mission
              </h2>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're bridging the gap between technology and law — creating tools that make legal research smarter, faster, and accessible to everyone. LexEye empowers students, professionals, and curious minds to explore laws effortlessly and understand them in context.
            </p>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 text-transparent bg-clip-text mb-4">
              Why Choose LexEye
            </h2>
            <p className="text-gray-400 text-lg">
              Experience the future of legal research with our innovative features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`group bg-gradient-to-br ${reason.color}/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300`}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${reason.color}/30 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{reason.title}</h3>
                <p className="text-gray-300 leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-pink-500/20 rounded-2xl border border-pink-400/30">
                <FiUsers className="text-3xl text-pink-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-200 to-rose-200 text-transparent bg-clip-text">
                Meet Team Mavericks
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A passionate team of innovators, creators, and problem-solvers dedicated to transforming legal research
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`group bg-gradient-to-br ${member.color}/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300`}
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${member.color}/30 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <FiCode className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-gray-300">{member.role}</p>
                <div className={`mt-4 w-16 h-1 bg-gradient-to-r ${member.color} rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center pt-8 border-t border-white/10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiGlobe className="text-cyan-400" />
            <span className="text-cyan-300 font-semibold">Team Mavericks</span>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} LexEye — Revolutionizing Legal Research. All Rights Reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default About;