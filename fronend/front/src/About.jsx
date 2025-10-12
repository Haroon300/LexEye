import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const team = [
    { name: "Obaid", role: "Project Manager" },
    { name: "Haroon", role: "Backend Developer" },
    { name: "Faseeh & Ahmed", role: "Frontend Developer" },
    { name: "Bilal", role: "Legal Content Researcher" },
    { name: "Hasnain", role: "UI/UX Designer & Tester" },
  ];

  const reasons = [
    {
      title: "Smart Search System",
      desc: "Quickly find laws and legal concepts using advanced search and filtering algorithms.",
    },
    {
      title: "Offline Bookmark Access",
      desc: "Save and access important laws even when you're offline — synced automatically later.",
    },
    {
      title: "Clean & Modern UI",
      desc: "Designed with a user-first approach to ensure clarity, elegance, and smooth navigation.",
    },
    {
      title: "Built by Passionate Minds",
      desc: "Created by Team Mavericks — a dedicated group of developers, designers, and researchers.",
    },
  ];

  return (
    <div className="min-h-screen mt-[5%] bg-[#08292e] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Heading */}
        <motion.h1
          className="text-5xl font-extrabold text-center mb-4 text-[#7dd3fc]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-white">LexEye</span>
        </motion.h1>

        {/* Description */}
        <motion.div
          className="space-y-6 text-gray-300 text-lg leading-relaxed text-justify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p>
            <strong>LexEye</strong> is an advanced legal information and research
            platform developed by <strong>Team Mavericks</strong>. It aims to simplify
            access to legal documents, laws, and regulations through a fast,
            intelligent, and user-friendly interface. Users can easily search,
            bookmark, and explore laws using powerful algorithms and modern web
            technologies.
          </p>

          <p>
            Designed for law students, researchers, and professionals — LexEye ensures
            efficient legal research, offline accessibility for bookmarks, and a
            seamless experience backed by a robust backend.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#7dd3fc] mb-4 text-center">
            🌍 Our Mission
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto text-lg leading-relaxed">
            Our mission is to bridge the gap between technology and law — making legal
            research smarter, faster, and accessible to everyone. LexEye is built to
            empower learners and professionals to explore laws effortlessly and
            understand them in context.
          </p>
        </motion.section>

        {/* Why Choose LexEye Section */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#7dd3fc] mb-8 text-center">
            💡 Why Choose LexEye
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#0c3b43] p-6 rounded-2xl border border-gray-700 hover:border-[#7dd3fc] transition shadow-md hover:shadow-[#7dd3fc]/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <h3 className="text-xl font-semibold text-[#7dd3fc] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#7dd3fc] mb-4 text-center">
            👥 Meet Team Mavericks
          </h2>

          <p className="text-gray-300 mb-6 text-center max-w-3xl mx-auto">
            A passionate team of developers, designers, and researchers who built LexEye
            from the ground up — combining creativity, logic, and a vision for change.
          </p>

          {/* Team Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-xl overflow-hidden text-sm sm:text-base">
              <thead className="bg-gradient-to-r from-[#0c606d] to-[#111]">
                <tr>
                  <th className="py-3 px-4 text-left text-white">Member Name</th>
                  <th className="py-3 px-4 text-left text-white">Role</th>
                </tr>
              </thead>
              <tbody>
                {team.map((member, index) => (
                  <motion.tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="py-3 px-4 font-medium">{member.name}</td>
                    <td className="py-3 px-4 text-gray-300">{member.role}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          className="text-center mt-10 text-gray-400 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <p>
            <strong>Team Mavericks</strong> © {new Date().getFullYear()} — All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
