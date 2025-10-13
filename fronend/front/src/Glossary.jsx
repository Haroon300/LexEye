import { useState, useMemo } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const glossaryItems = [
    {
      term: "PECA",
      definition: "PECA is an acronym for the Prevention of Electronic Crimes Act, a Pakistani law established in 2016 that deals with cybercrimes and cybersecurity. The act defines various electronic crimes, including unauthorized access to computer systems and data, and provides penalties for those who commit them.",
      category: "cyber-law"
    },
    {
      term: "Law",
      definition: "A system of rules created and enforced through social or governmental institutions to regulate behavior.",
      category: "general"
    },
    {
      term: "Clause",
      definition: "A specific provision or section in a legal document or contract that outlines particular terms, conditions, or obligations.",
      category: "documents"
    },
    {
      term: "Petition",
      definition: "A formal written request submitted to a court or authority seeking a specific legal action or decision.",
      category: "court"
    },
    {
      term: "Verdict",
      definition: "The final decision or judgment made by a judge or jury in a court case.",
      category: "court"
    },
    {
      term: "Defendant",
      definition: "An individual, company, or institution sued or accused in a court of law.",
      category: "court"
    },
    {
      term: "Plaintiff",
      definition: "A person who brings a case against another in a court of law.",
      category: "court"
    },
    {
      term: "Jurisdiction",
      definition: "The official power to make legal decisions and judgments.",
      category: "general"
    },
    {
      term: "Affidavit",
      definition: "A written statement confirmed by oath or affirmation, for use as evidence in court.",
      category: "documents"
    }
  ];

  const categories = [
    { id: "all", name: "All Terms" },
    { id: "general", name: "General Law" },
    { id: "court", name: "Court Procedures" },
    { id: "documents", name: "Legal Documents" },
    { id: "cyber-law", name: "Cyber Law" }
  ];

  const filteredItems = useMemo(() => {
    return glossaryItems.filter((item) => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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
    <div className="min-h-screen mt-[5%] bg-gradient-to-b from-[#051c1f] via-[#08292e] to-black text-gray-100 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-blue-500/15 rounded-full blur-3xl top-1/2 -right-40 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-silver/10 rounded-full blur-3xl bottom-20 left-1/3 animate-pulse-slow" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>
      </div>

      {/* Back Button */}
      <motion.div 
        className="absolute top-8 left-6 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 rounded-xl px-5 py-3 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20 group"
        >
          <TiArrowBack className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          Back
        </button>
      </motion.div>

      {/* Header Section */}
      <motion.div 
        className="text-center pt-28 pb-12 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative inline-block">
          <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-silver via-gray-200 to-cyan-200 text-transparent bg-clip-text drop-shadow-2xl mb-6">
            Legal Glossary
          </h1>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
        </div>
        <p className="text-gray-300 mt-5 text-lg max-w-2xl mx-auto px-4 leading-relaxed">
          Explore essential legal terms defined in simple language — empowering your understanding of the law with clarity and confidence.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div 
        className="sticky top-0 z-30 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-2xl py-6 border-b border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="relative w-full md:w-2/3 lg:w-1/2">
              <input
                type="text"
                placeholder="🔍 Search for legal terms or definitions..."
                className="w-full px-8 py-4 rounded-2xl bg-gray-900/80 text-gray-200 border border-gray-700/50 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 outline-none transition-all duration-300 placeholder-gray-400 shadow-2xl backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-3 px-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 backdrop-blur-sm border ${
                    selectedCategory === category.id
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-500/10"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div 
        className="px-6 py-4 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-gray-400 text-sm">
          {filteredItems.length} {filteredItems.length === 1 ? 'term' : 'terms'} found
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
        </p>
      </motion.div>

      {/* Glossary Grid */}
      <motion.div
        className="max-w-7xl mx-auto px-6 pb-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              layout
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={`${item.term}-${index}`}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 overflow-hidden"
                >
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                  
                  {/* Category badge */}
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {categories.find(c => c.id === item.category)?.name}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-silver to-gray-300 text-transparent bg-clip-text group-hover:from-cyan-200 group-hover:to-silver transition-all duration-500 mb-4 pr-16">
                      {item.term}
                    </h2>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-[15px]">
                      {item.definition}
                    </p>
                  </div>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="text-8xl mb-6 opacity-50">🔍</div>
                <h3 className="text-2xl font-bold text-gray-300 mb-3">
                  No terms found
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm 
                    ? `No results for "${searchTerm}" in ${categories.find(c => c.id === selectedCategory)?.name?.toLowerCase() || 'selected category'}. Try different keywords.`
                    : `No terms available in ${categories.find(c => c.id === selectedCategory)?.name?.toLowerCase() || 'selected category'}.`}
                </p>
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-300"
                  >
                    Show all terms
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Glossary;