import React from "react";

const About = () => {
  const team = [
    { name: "Obaid", role: "Project Manager" },
    { name: "Haroon", role: "Backend Developer" },
    { name: "Faseeh & Ahmed", role: "Frontend Developer" },
    { name: "Bilal", role: "Legal Content Researcher" },
    { name: "Hasnain", role: "UI/UX Designer & Tester" },
  ];

  return (
    <div className="min-h-screen mt-[5%] bg-gradient-to-b from-[#08292e] to-gray-800 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-6 text-[#89a2a6]">
          About <span className="text-white">LexEye</span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg leading-relaxed mb-8 text-justify">
          <strong>LexEye</strong> is an advanced legal information and research
          platform developed by <strong>Team Mavericks</strong>. It aims to
          simplify access to legal documents, laws, and regulations by providing
          a fast, intelligent, and user-friendly interface. Users can easily
          search, bookmark, and explore laws using powerful search 
          algorithms and modern web technologies.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mb-10 text-justify">
          The project was created to assist both law students and professionals
          by making legal research more efficient. LexEye offers offline access
          for bookmarked laws, clean UI/UX design, and real-time updates through
          a robust backend.
        </p>

        {/* Team Section */}
        <h2 className="text-3xl font-semibold text-[#89a2a6] mb-4">
          Meet the Team Mavericks 👥
        </h2>

        <p className="text-gray-300 mb-6">
          Our team consists of dedicated students passionate about technology
          and innovation. Together, we built LexEye from scratch — combining
          creativity, coding, and legal knowledge.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-[#0c606d] to-[#111]">
              <tr>
                <th className="py-3 px-4 text-left text-white">Member Name</th>
                <th className="py-3 px-4 text-left text-white">Role</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-4 font-medium">{member.name}</td>
                  <td className="py-3 px-4 text-gray-300">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-400">
          <p>
            <strong>Team Mavericks</strong> © {new Date().getFullYear()} — All
            Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
