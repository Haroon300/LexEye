import React from "react";
import { motion } from "framer-motion";
import { TiArrowBack } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
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
  FiBook,
  FiShield
} from "react-icons/fi";

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

const About = () => {
  const navigate = useNavigate(); 
  
  const team = [
    { name: "Obaid", role: "Project Manager", to:"https://www.linkedin.com/in/muhammad-obaid-ullah-4b6b10375/" },
    { name: "Haroon", role: "Backend Developer", to:"https://www.linkedin.com/in/haroon-hammad-0b5605264/" },
    { name: "Faseeh", role: "Frontend Developers", to:"https://www.linkedin.com/in/faseehullah-khan-718512298/" },
    { name: "Ahmed", role: "Frontend Developers", to:"https://pk.linkedin.com/in/ahmed-shah-322197241" },
    { name: "Bilal", role: "Legal Content Researcher", to:"https://www.linkedin.com/in/bilal-rafiq-31aab8323/" },
    { name: "Hasnain", role: "UI/UX Designer & Tester", to:"https://www.linkedin.com/in/hasnain-baig-a27a5a396/" },
  ];

  const reasons = [
    {
      icon: <FiSearch className="text-3xl" />,
      title: "Smart Search System",
      desc: "Quickly find laws and legal concepts using advanced search and filtering algorithms."
    },
    {
      icon: <FiBookmark className="text-3xl" />,
      title: "Offline Bookmark Access",
      desc: "Save and access important laws even when you're offline — synced automatically later."
    },
    {
      icon: <FiLayout className="text-3xl" />,
      title: "Clean & Modern UI",
      desc: "Designed with a user-first approach to ensure clarity, elegance, and smooth navigation."
    },
    {
      icon: <FiHeart className="text-3xl" />,
      title: "Built by Passionate Minds",
      desc: "Created by Team Mavericks — a dedicated group of developers, designers, and researchers."
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
    <div className="min-h-screen pt-[5%] relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl -top-10 -left-10 md:-top-20 md:-left-20"
          style={{ backgroundColor: '#0e877d40' }}
        />
        <div 
          className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full blur-3xl top-1/4 -right-10 md:top-1/3 md:-right-20"
          style={{ backgroundColor: '#0e877d40' }}
        />
        <div 
          className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl bottom-10 left-1/4 md:bottom-20"
          style={{ backgroundColor: '#0e877d40' }}
        />
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
            className="group flex items-center gap-3 backdrop-blur-xl border font-semibold rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: `${COLORS.navy[2]}80`,
              borderColor: `${COLORS.navy[4]}30`,
              color: COLORS.navy[5]
            }}
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
          <div 
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border backdrop-blur-xl"
            style={{
              backgroundColor: `${COLORS.navy[4]}20`,
              borderColor: `${COLORS.navy[4]}30`
            }}
          >
            <FiAward style={{ color: COLORS.navy[4] }} />
            <span className="text-sm font-medium" style={{ color: COLORS.navy[4] }}>About LexEye</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6" style={{ color: COLORS.navy[5] }}>
            About LexEye
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: COLORS.navy[5] }}>
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
            className="backdrop-blur-2xl border rounded-3xl p-8 lg:p-12 shadow-2xl"
            style={{
              backgroundColor: `${COLORS.navy[2]}40`,
              borderColor: `${COLORS.navy[4]}20`
            }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: COLORS.navy[5] }}>
                  What is LexEye?
                </h2>
                <div className="space-y-4 text-lg leading-relaxed" style={{ color: COLORS.navy[5] }}>
                  <p>
                    <strong style={{ color: COLORS.navy[4] }}>LexEye</strong> is an advanced legal information and research platform developed by <strong style={{ color: COLORS.navy[4] }}>Team Mavericks</strong>. We're transforming how people access and understand legal documents, laws, and regulations through intelligent technology and thoughtful design.
                  </p>
                  <p>
                    Our platform combines powerful search algorithms with a user-friendly interface, making legal research faster, smarter, and more accessible than ever before.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div 
                    className="w-64 h-64 rounded-2xl border flex items-center justify-center backdrop-blur-xl"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}10`,
                      borderColor: `${COLORS.navy[4]}30`
                    }}
                  >
                    <FiBook className="text-8xl" style={{ color: `${COLORS.navy[4]}50` }} />
                  </div>
                  <div 
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl border flex items-center justify-center backdrop-blur-xl"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}15`,
                      borderColor: `${COLORS.navy[4]}30`
                    }}
                  >
                    <FiSearch className="text-3xl" style={{ color: `${COLORS.navy[4]}60` }} />
                  </div>
                  <div 
                    className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl border flex items-center justify-center backdrop-blur-xl"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`
                    }}
                  >
                    <FiBookmark className="text-2xl" style={{ color: `${COLORS.navy[4]}60` }} />
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
              <div 
                className="p-3 rounded-2xl border backdrop-blur-xl"
                style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`
                }}
              >
                <FiTarget className="text-3xl" style={{ color: COLORS.navy[4] }} />
              </div>
              <h2 className="text-4xl font-bold" style={{ color: COLORS.navy[5] }}>
                Our Mission
              </h2>
            </div>
            <p className="text-xl leading-relaxed" style={{ color: COLORS.navy[5] }}>
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
            <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.navy[5] }}>
              Why Choose LexEye
            </h2>
            <p className="text-lg" style={{ color: `${COLORS.navy[5]}80` }}>
              Experience the future of legal research with our innovative features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group backdrop-blur-xl border rounded-2xl p-8 shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}20`
                }}
              >
                <div 
                  className="inline-flex p-4 rounded-2xl border mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}
                >
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.navy[5] }}>{reason.title}</h3>
                <p className="leading-relaxed" style={{ color: `${COLORS.navy[5]}80` }}>{reason.desc}</p>
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
              <div 
                className="p-3 rounded-2xl border backdrop-blur-xl"
                style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`
                }}
              >
                <FiUsers className="text-3xl" style={{ color: COLORS.navy[4] }} />
              </div>
              <h2 className="text-4xl font-bold" style={{ color: COLORS.navy[5] }}>
                Meet Team Mavericks
              </h2>
            </div>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: `${COLORS.navy[5]}80` }}>
              A passionate team of innovators, creators, and problem-solvers dedicated to transforming legal research
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group backdrop-blur-xl border rounded-2xl p-8 text-center shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}20`
                }}
              >
                <a 
                  href={member.to} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div 
                    className="w-20 h-20 mx-auto mb-4 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `${COLORS.navy[4]}20`,
                      borderColor: `${COLORS.navy[4]}30`
                    }}
                  >
                    <FiCode className="text-2xl" style={{ color: COLORS.navy[4] }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.navy[5] }}>{member.name}</h3>
                  <p style={{ color: `${COLORS.navy[5]}80` }}>{member.role}</p>
                  <div 
                    className="mt-4 w-16 h-1 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: COLORS.navy[4] }}
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center pt-8 border-t"
          style={{ borderColor: `${COLORS.navy[4]}20` }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FiGlobe style={{ color: COLORS.navy[4] }} />
            <span className="font-semibold" style={{ color: COLORS.navy[4] }}>Team Mavericks</span>
          </div>
          <p style={{ color: `${COLORS.navy[5]}70` }}>
            © {new Date().getFullYear()} LexEye — Revolutionizing Legal Research. All Rights Reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default About;