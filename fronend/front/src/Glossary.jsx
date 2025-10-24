import React, { useState, useMemo } from "react";
import { 
  TiArrowBack, 
  TiDelete 
} from "react-icons/ti";
import { 
  IoClose, 
  IoFilter,
  IoSearch,
  IoBook,
  IoDocuments,
  IoCar,
  IoCodeWorking,
  IoBriefcase,
  IoScale,
  IoList,
  IoInformationCircle,
  IoText,
  IoChevronForward,
  IoChevronBack,
  IoLanguage
} from "react-icons/io5";
import { 
  FaBalanceScale,
  FaGavel,
  FaHome,
  FaHandshake
} from "react-icons/fa";
import { 
  GiFamilyHouse,
  GiChemicalTank
} from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import glossaryItems from "../glossaryItems";

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showCategorySidebar, setShowCategorySidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [language, setLanguage] = useState("en"); // 'en' or 'ur'
  const navigate = useNavigate();

  const glossaryData = glossaryItems;

  // Language content
  const content = {
    en: {
      title: "Legal Glossary",
      subtitle: `Explore ${glossaryData.length}+ legal terms from Pakistani laws defined in simple language.`,
      searchPlaceholder: "Search legal terms...",
      categories: "Categories",
      allTerms: "All Terms",
      narcoticsLaws: "Narcotics Laws",
      criminalLaws: "Criminal Laws",
      propertyLaws: "Property Laws",
      trafficLaws: "Traffic Laws",
      familyLaws: "Family Laws",
      cyberLaws: "Cyber Laws",
      laborLaws: "Labor Laws",
      generalLegal: "General Legal",
      courtProcedures: "Court Procedures",
      legalDocuments: "Legal Documents",
      adr: "Alternative Dispute Resolution",
      legalAbbreviations: "Legal Abbreviations",
      termsFound: "terms found",
      for: "for",
      in: "in",
      show: "Show:",
      perPage: "per page",
      showing: "Showing",
      of: "of",
      previous: "Previous",
      next: "Next",
      goToPage: "Go to page:",
      noTermsFound: "No terms found",
      noResults: "No results for",
      inCategory: "in selected category. Try different keywords.",
      showAllTerms: "Show all terms",
      definition: "Definition",
      categoryInfo: "Category Information",
      lawType: "Law Type",
      relatedTerms: "Related Terms",
      legalTerm: "Legal Term",
      tapToView: "Tap to view",
      back: "Back"
    },
    ur: {
      title: "قانونی لغت",
      subtitle: `${glossaryData.length}+ پاکستانی قوانین کی قانونی اصطلاحات آسان زبان میں بیان کی گئی ہیں۔`,
      searchPlaceholder: "قانونی اصطلاحیں تلاش کریں...",
      categories: "اقسام",
      allTerms: "تمام اصطلاحیں",
      narcoticsLaws: "منشیات کے قوانین",
      criminalLaws: "فوجداری قوانین",
      propertyLaws: "جائیداد کے قوانین",
      trafficLaws: "ٹریفک قوانین",
      familyLaws: "خاندانی قوانین",
      cyberLaws: "سائبر قوانین",
      laborLaws: "مزدوری قوانین",
      generalLegal: "عمومی قانونی",
      courtProcedures: "عدالتی طریقہ کار",
      legalDocuments: "قانونی دستاویزات",
      adr: "متبادل تنازعہ حل",
      legalAbbreviations: "قانونی مخففات",
      termsFound: "اصطلاحیں ملیں",
      for: "کے لیے",
      in: "میں",
      show: "دکھائیں:",
      perPage: "فی صفحہ",
      showing: "دکھا رہے ہیں",
      of: "از",
      previous: "پچھلا",
      next: "اگلا",
      goToPage: "صفحہ پر جائیں:",
      noTermsFound: "کوئی اصطلاح نہیں ملی",
      noResults: "کوئی نتیجہ نہیں ملا",
      inCategory: "منتخب قسم میں۔ مختلف الفاظ آزمائیں۔",
      showAllTerms: "تمام اصطلاحیں دکھائیں",
      definition: "تعریف",
      categoryInfo: "قسم کی معلومات",
      lawType: "قانون کی قسم",
      relatedTerms: "متعلقہ اصطلاحیں",
      legalTerm: "قانونی اصطلاح",
      tapToView: "دیکھنے کے لیے تھپتھپائیں",
      back: "پیچھے جائیں"
    }
  };

  const t = content[language];

  // Updated categories with bilingual names
  const categories = [
    { 
      id: "all", 
      name: language === "en" ? "All Terms" : "تمام اصطلاحیں", 
      count: glossaryData.length, 
      icon: IoList 
    },
    { 
      id: "narcotics-laws", 
      name: language === "en" ? "Narcotics Laws" : "منشیات کے قوانین", 
      count: glossaryData.filter(item => item.category === "narcotics-laws").length, 
      icon: GiChemicalTank 
    },
    { 
      id: "criminal-laws", 
      name: language === "en" ? "Criminal Laws" : "فوجداری قوانین", 
      count: glossaryData.filter(item => item.category === "criminal-laws").length, 
      icon: FaGavel 
    },
    { 
      id: "property-laws", 
      name: language === "en" ? "Property Laws" : "جائیداد کے قوانین", 
      count: glossaryData.filter(item => item.category === "property-laws").length, 
      icon: FaHome 
    },
    { 
      id: "traffic-laws", 
      name: language === "en" ? "Traffic Laws" : "ٹریفک قوانین", 
      count: glossaryData.filter(item => item.category === "traffic-laws").length, 
      icon: IoCar 
    },
    { 
      id: "family-laws", 
      name: language === "en" ? "Family Laws" : "خاندانی قوانین", 
      count: glossaryData.filter(item => item.category === "family-laws").length, 
      icon: GiFamilyHouse 
    },
    { 
      id: "cyber-laws", 
      name: language === "en" ? "Cyber Laws" : "سائبر قوانین", 
      count: glossaryData.filter(item => item.category === "cyber-laws").length, 
      icon: IoCodeWorking 
    },
    { 
      id: "labor-laws", 
      name: language === "en" ? "Labor Laws" : "مزدوری قوانین", 
      count: glossaryData.filter(item => item.category === "labor-laws").length, 
      icon: IoBriefcase 
    },
    { 
      id: "general", 
      name: language === "en" ? "General Legal" : "عمومی قانونی", 
      count: glossaryData.filter(item => item.category === "general").length, 
      icon: IoScale 
    },
    { 
      id: "court", 
      name: language === "en" ? "Court Procedures" : "عدالتی طریقہ کار", 
      count: glossaryData.filter(item => item.category === "court").length, 
      icon: FaBalanceScale 
    },
    { 
      id: "documents", 
      name: language === "en" ? "Legal Documents" : "قانونی دستاویزات", 
      count: glossaryData.filter(item => item.category === "documents").length, 
      icon: IoDocuments 
    },
    { 
      id: "adr", 
      name: language === "en" ? "Alternative Dispute Resolution" : "متبادل تنازعہ حل", 
      count: glossaryData.filter(item => item.category === "adr").length, 
      icon: FaHandshake 
    },
    { 
      id: "abbreviations", 
      name: language === "en" ? "Legal Abbreviations" : "قانونی مخففات", 
      count: glossaryData.filter(item => item.category === "abbreviations").length, 
      icon: IoText 
    }
  ];

  const filteredItems = useMemo(() => {
    return glossaryData.filter((item) => {
      const itemTerm = language === "en" ? item.term : (item.termUr || item.term);
      const itemDefinition = language === "en" ? item.definition : (item.definitionUr || item.definition);
      
      const matchesSearch = itemTerm.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           itemDefinition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, glossaryData, language]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when search or category changes
  React.useEffect(() => {
    setCurrentPage(1);
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

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      x: -300, 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const bottomSheetVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      y: "100%", 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  // Function to get category display name
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  // Function to get category icon
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : IoInformationCircle;
  };

  // Function to get category color
  const getCategoryColor = (categoryId) => {
    const colors = {
      'narcotics-laws': 'from-red-500/20 to-red-600/20 border-red-400/30 text-red-300',
      'criminal-laws': 'from-orange-500/20 to-orange-600/20 border-orange-400/30 text-orange-300',
      'property-laws': 'from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-300',
      'traffic-laws': 'from-yellow-500/20 to-yellow-600/20 border-yellow-400/30 text-yellow-300',
      'family-laws': 'from-purple-500/20 to-purple-600/20 border-purple-400/30 text-purple-300',
      'cyber-laws': 'from-cyan-500/20 to-cyan-600/20 border-cyan-400/30 text-cyan-300',
      'labor-laws': 'from-indigo-500/20 to-indigo-600/20 border-indigo-400/30 text-indigo-300',
      'general': 'from-gray-500/20 to-gray-600/20 border-gray-400/30 text-gray-300',
      'court': 'from-pink-500/20 to-pink-600/20 border-pink-400/30 text-pink-300',
      'documents': 'from-teal-500/20 to-teal-600/20 border-teal-400/30 text-teal-300',
      'adr': 'from-amber-500/20 to-amber-600/20 border-amber-400/30 text-amber-300',
      'abbreviations': 'from-lime-500/20 to-lime-600/20 border-lime-400/30 text-lime-300'
    };
    return colors[categoryId] || 'from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-cyan-300';
  };

  // Function to handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowCategorySidebar(false);
    setShowMobileFilters(false);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen pt-[10%] text-[#F0EBD8] relative overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1D2D44] to-[#3E5C76]">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-80 h-80 bg-[#748CAB]/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-[#3E5C76]/15 rounded-full blur-3xl top-1/2 -right-40 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-[#F0EBD8]/10 rounded-full blur-3xl bottom-20 left-1/3 animate-pulse-slow" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>
      </div>

      {/* Top Action Buttons */}
      <div className="absolute md:top-[7%] top-[4%] left-6 right-6 z-20">
        <div className="flex justify-between items-center">
          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#F0EBD8] font-semibold hover:bg-white/20 rounded-xl px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <TiArrowBack className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden sm:inline">{t.back}</span>
            </button>
          </motion.div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            {/* Language Toggle - Visible on both mobile and desktop */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#F0EBD8] font-semibold hover:bg-white/20 rounded-xl px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <IoLanguage className="text-lg" />
                <span className="text-sm">{language === "en" ? "اردو" : "English"}</span>
              </button>
            </motion.div>

            {/* Desktop Category Sidebar Toggle - Hidden on mobile */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => setShowCategorySidebar(!showCategorySidebar)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#F0EBD8] font-semibold hover:bg-white/20 rounded-xl px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <IoFilter className="text-xl group-hover:scale-110 transition-transform duration-300" />
                <span>{t.categories}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <motion.div 
        className="text-center pt-28 pb-8 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative inline-block">
          <h1 className={`text-4xl sm:text-5xl pb-9 md:text-6xl font-black tracking-tight bg-gradient-to-r from-[#F0EBD8] via-[#F0EBD8] to-[#F0EBD8] text-transparent bg-clip-text drop-shadow-2xl mb-6 ${language === "ur" ? "font-urdu" : ""}`}>
            {t.title}
          </h1>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#748CAB] to-transparent rounded-full" />
        </div>
        <p className="text-[#F0EBD8]/80 mt-5 text-sm sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div 
        className="sticky top-0 z-30 backdrop-blur-2xl py-4 border-b border-white/10 shadow-2xl bg-[#0D1B2A]/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center gap-4">
            {/* Mobile Category Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 bg-[#748CAB]/20 border border-[#748CAB]/30 text-[#748CAB] rounded-xl hover:bg-[#748CAB]/30 transition-all duration-300 px-4 py-3"
            >
              <IoFilter className="text-lg" />
              <span>{t.categories}</span>
            </button>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]">
                <IoSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#1D2D44]/80 text-[#F0EBD8] border border-[#3E5C76]/50 focus:border-[#748CAB] focus:ring-4 focus:ring-[#748CAB]/20 outline-none transition-all duration-300 placeholder-[#F0EBD8]/60 shadow-2xl backdrop-blur-sm text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F0EBD8]/60 hover:text-[#F0EBD8] transition-colors duration-200"
                >
                  <TiDelete className="text-xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rest of your component remains the same... */}
      {/* Current Category Display */}
      <motion.div 
        className="px-4 sm:px-6 py-4 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-[#F0EBD8]/60 text-sm">
            {filteredItems.length} {t.termsFound}
            {searchTerm && ` ${t.for} "${searchTerm}"`}
          </p>
          {selectedCategory !== "all" && (
            <div className="flex items-center gap-2">
              <span className="text-[#F0EBD8]/60 text-sm">{t.in}</span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${getCategoryColor(selectedCategory)} border flex items-center gap-2`}>
                {React.createElement(getCategoryIcon(selectedCategory), { className: "text-sm" })}
                {getCategoryName(selectedCategory)}
              </span>
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-[#F0EBD8]/60 hover:text-[#F0EBD8] transition-colors duration-200"
              >
                <IoClose className="text-sm" />
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Items Per Page Selector */}
      {filteredItems.length > 0 && (
        <motion.div 
          className="px-4 sm:px-6 py-2 flex justify-end items-center gap-3 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label className="text-[#F0EBD8]/60 text-sm flex items-center gap-2">
            <span>{t.show}</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
              className="bg-[#1D2D44]/50 border border-[#3E5C76] rounded-lg px-3 py-1 text-[#F0EBD8] text-sm focus:outline-none focus:ring-2 focus:ring-[#748CAB]/50"
            >
              <option value={6}>6 {t.perPage}</option>
              <option value={12}>12 {t.perPage}</option>
              <option value={24}>24 {t.perPage}</option>
              <option value={48}>48 {t.perPage}</option>
            </select>
          </label>
        </motion.div>
      )}

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto relative">
        {/* Desktop Sidebar */}
        <AnimatePresence>
          {showCategorySidebar && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:block hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCategorySidebar(false)}
              />
              
              {/* Sidebar */}
              <motion.div
                className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[#1D2D44] to-[#0D1B2A] border-r border-[#3E5C76] z-50 shadow-2xl lg:block hidden"
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-6 border-b border-[#3E5C76]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#F0EBD8] flex items-center gap-2">
                      <IoList className="text-[#748CAB]" />
                      {t.categories}
                    </h2>
                    <button
                      onClick={() => setShowCategorySidebar(false)}
                      className="text-[#F0EBD8]/60 hover:text-[#F0EBD8] transition-colors duration-200"
                    >
                      <IoClose className="text-2xl" />
                    </button>
                  </div>
                </div>
                
                <div className="h-[calc(100vh-80px)] flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.id)}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-300 border flex items-center justify-between group ${
                              selectedCategory === category.id
                                ? "bg-[#748CAB]/20 border-[#748CAB] text-[#F0EBD8] shadow-lg shadow-[#748CAB]/10"
                                : "bg-white/5 border-white/10 text-[#F0EBD8]/80 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className={`text-lg ${
                                selectedCategory === category.id ? "text-[#748CAB]" : "text-[#F0EBD8]/60 group-hover:text-[#F0EBD8]"
                              }`} />
                              <span className={`font-medium ${language === "ur" ? "font-urdu text-right" : ""}`}>{category.name}</span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              selectedCategory === category.id 
                                ? "bg-[#748CAB]/30 text-[#F0EBD8]" 
                                : "bg-white/10 text-[#F0EBD8]/60"
                            }`}>
                              {category.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-[#3E5C76] bg-black/20">
                    <p className="text-[#F0EBD8]/60 text-sm text-center flex items-center justify-center gap-2">
                      <IoInformationCircle className="text-[#748CAB]" />
                      {categories.length} {t.categories.toLowerCase()} available
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Glossary Grid */}
        <motion.div
          className={`px-4 sm:px-6 pb-20 relative z-10 transition-all duration-300 ${
            showCategorySidebar ? "lg:ml-80" : ""
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ... rest of your glossary grid content ... */}
          <AnimatePresence mode="wait">
            {currentItems.length > 0 ? (
              <>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                  layout
                >
                  {currentItems.map((item, index) => {
                    const CategoryIcon = getCategoryIcon(item.category);
                    const itemTerm = language === "en" ? item.term : (item.termUr || item.term);
                    const itemDefinition = language === "en" ? item.definition : (item.definitionUr || item.definition);
                    
                    return (
                      <motion.div
                        key={`${item.term}-${index}`}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                        whileHover={{ 
                          y: -4,
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedItem(item)}
                        className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl hover:shadow-[#748CAB]/10 transition-all duration-500 overflow-hidden active:scale-95"
                      >
                        {/* Background accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#748CAB]/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700" />
                        
                        {/* Category badge */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(item.category)} border flex items-center gap-1`}>
                            <CategoryIcon className="text-xs" />
                            {getCategoryName(item.category)}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h2 className={`text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#F0EBD8] to-[#F0EBD8] text-transparent bg-clip-text transition-all duration-500 mb-3 pr-16 ${language === "ur" ? "font-urdu text-right" : ""}`}>
                            {itemTerm}
                          </h2>
                          <p className={`text-[#F0EBD8]/80 leading-relaxed group-hover:text-[#F0EBD8] transition-colors duration-300 text-sm sm:text-[15px] line-clamp-3 ${language === "ur" ? "text-right font-urdu" : ""}`}>
                            {itemDefinition}
                          </p>
                        </div>

                        {/* Hover effect line */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#748CAB] to-[#3E5C76] group-hover:w-full transition-all duration-500" />
                        
                        {/* Tap hint for mobile */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-[#748CAB] text-xs font-medium bg-[#748CAB]/10 px-2 py-1 rounded-full border border-[#748CAB]/20 flex items-center gap-1">
                            <IoBook className="text-xs" />
                            {t.tapToView}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <motion.div 
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#3E5C76]/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {/* Page Info */}
                    <div className="text-[#F0EBD8]/60 text-sm">
                      {t.showing} {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} {t.of} {filteredItems.length} {t.termsFound}
                    </div>

                    {/* Pagination Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-1 px-4 py-2 rounded-xl border transition-all duration-300 ${
                          currentPage === 1
                            ? "bg-[#1D2D44]/30 border-[#3E5C76] text-[#F0EBD8]/40 cursor-not-allowed"
                            : "bg-[#748CAB]/20 border-[#748CAB]/30 text-[#748CAB] hover:bg-[#748CAB]/30 hover:scale-105"
                        }`}
                      >
                        <IoChevronBack className="text-sm" />
                        <span className="hidden sm:inline">{t.previous}</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => (
                          <button
                            key={index}
                            onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                            className={`min-w-[40px] h-10 flex items-center justify-center rounded-xl border transition-all duration-300 ${
                              page === currentPage
                                ? "bg-[#748CAB]/30 border-[#748CAB] text-[#F0EBD8] shadow-lg shadow-[#748CAB]/20"
                                : typeof page === 'number'
                                ? "bg-white/5 border-white/10 text-[#F0EBD8]/80 hover:bg-white/10 hover:border-white/20"
                                : "bg-transparent border-transparent text-[#F0EBD8]/40 cursor-default"
                            }`}
                            disabled={page === '...'}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-1 px-4 py-2 rounded-xl border transition-all duration-300 ${
                          currentPage === totalPages
                            ? "bg-[#1D2D44]/30 border-[#3E5C76] text-[#F0EBD8]/40 cursor-not-allowed"
                            : "bg-[#748CAB]/20 border-[#748CAB]/30 text-[#748CAB] hover:bg-[#748CAB]/30 hover:scale-105"
                        }`}
                      >
                        <span className="hidden sm:inline">{t.next}</span>
                        <IoChevronForward className="text-sm" />
                      </button>
                    </div>

                    {/* Page Selector */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#F0EBD8]/60">{t.goToPage}</span>
                      <select
                        value={currentPage}
                        onChange={(e) => handlePageChange(Number(e.target.value))}
                        className="bg-[#1D2D44]/50 border border-[#3E5C76] rounded-lg px-3 py-1 text-[#F0EBD8] focus:outline-none focus:ring-2 focus:ring-[#748CAB]/50"
                      >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <div className="text-6xl sm:text-8xl mb-6 opacity-50 text-[#F0EBD8]/40">
                    <IoSearch />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F0EBD8]/80 mb-3">
                    {t.noTermsFound}
                  </h3>
                  <p className="text-[#F0EBD8]/60 mb-6 text-sm sm:text-base">
                    {searchTerm 
                      ? `${t.noResults} "${searchTerm}" ${t.inCategory}`
                      : `No terms available in ${getCategoryName(selectedCategory)?.toLowerCase() || 'selected category'}.`}
                  </p>
                  {(searchTerm || selectedCategory !== "all") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                      }}
                      className="px-6 py-3 bg-[#748CAB]/20 border border-[#748CAB]/30 text-[#748CAB] rounded-xl hover:bg-[#748CAB]/30 transition-all duration-300 text-sm sm:text-base flex items-center gap-2 mx-auto"
                    >
                      <IoList className="text-lg" />
                      {t.showAllTerms}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile Category Bottom Sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
            />
            
            {/* Bottom Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-[#1D2D44] to-[#0D1B2A] border-t border-[#3E5C76] rounded-t-3xl shadow-2xl lg:hidden max-h-[80vh]"
              variants={bottomSheetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-4 border-b border-[#3E5C76]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#F0EBD8] flex items-center gap-2">
                    <IoFilter className="text-[#748CAB]" />
                    {t.categories}
                  </h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-[#F0EBD8]/60 hover:text-[#F0EBD8] transition-colors duration-200"
                  >
                    <IoClose className="text-2xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`p-4 rounded-xl transition-all duration-300 border text-center flex flex-col items-center justify-center gap-2 ${
                          selectedCategory === category.id
                            ? "bg-[#748CAB]/20 border-[#748CAB] text-[#F0EBD8] shadow-lg shadow-[#748CAB]/10"
                            : "bg-white/5 border-white/10 text-[#F0EBD8]/80 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <IconComponent className={`text-xl ${
                          selectedCategory === category.id ? "text-[#748CAB]" : "text-[#F0EBD8]/60"
                        }`} />
                        <div className={`font-medium text-sm ${language === "ur" ? "font-urdu" : ""}`}>{category.name}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category.id 
                            ? "bg-[#748CAB]/30 text-[#F0EBD8]" 
                            : "bg-white/10 text-[#F0EBD8]/60"
                        }`}>
                          {category.count}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Term Detail Popup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-[#1D2D44] to-[#0D1B2A] border border-[#3E5C76] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 border-b border-[#3E5C76] bg-gradient-to-r ${getCategoryColor(selectedItem.category)}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full bg-black/20 text-[#F0EBD8] border border-white/20 flex items-center gap-2`}>
                        {React.createElement(getCategoryIcon(selectedItem.category), { className: "text-sm" })}
                        {getCategoryName(selectedItem.category)}
                      </span>
                    </div>
                    <h2 className={`text-2xl sm:text-3xl font-bold text-[#F0EBD8] pr-10 ${language === "ur" ? "font-urdu text-right" : ""}`}>
                      {language === "en" ? selectedItem.term : (selectedItem.termUr || selectedItem.term)}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-black/20 border border-white/20 flex items-center justify-center text-[#F0EBD8] hover:bg-white/10 transition-colors duration-200"
                  >
                    <IoClose className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
                <div className="space-y-6">
                  {/* Definition */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#748CAB] mb-3 flex items-center gap-2">
                      <IoBook className="text-[#748CAB]" />
                      {t.definition}
                    </h3>
                    <p className={`text-[#F0EBD8] leading-relaxed text-base sm:text-lg ${language === "ur" ? "font-urdu text-right" : ""}`}>
                      {language === "en" ? selectedItem.definition : (selectedItem.definitionUr || selectedItem.definition)}
                    </p>
                  </div>

                  {/* Category Info */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h3 className="text-lg font-semibold text-[#748CAB] mb-2 flex items-center gap-2">
                      <IoInformationCircle className="text-[#748CAB]" />
                      {t.categoryInfo}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#F0EBD8]/60">{t.categories}:</span>
                        <span className="text-[#F0EBD8] font-medium flex items-center gap-2">
                          {React.createElement(getCategoryIcon(selectedItem.category), { className: "text-sm" })}
                          {getCategoryName(selectedItem.category)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#F0EBD8]/60">{t.lawType}:</span>
                        <span className="text-[#F0EBD8] font-medium">{selectedItem.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Related Terms */}
                  {filteredItems.filter(item => 
                    item.category === selectedItem.category && item.term !== selectedItem.term
                  ).length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-[#748CAB] mb-3 flex items-center gap-2">
                        <IoDocuments className="text-[#748CAB]" />
                        {t.relatedTerms}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {filteredItems
                          .filter(item => item.category === selectedItem.category && item.term !== selectedItem.term)
                          .slice(0, 5)
                          .map(relatedItem => (
                            <button
                              key={relatedItem.term}
                              onClick={() => setSelectedItem(relatedItem)}
                              className="px-3 py-1.5 bg-[#748CAB]/10 border border-[#748CAB]/30 text-[#748CAB] rounded-lg hover:bg-[#748CAB]/20 transition-colors duration-200 text-sm flex items-center gap-2"
                            >
                              <IoBook className="text-xs" />
                              {language === "en" ? relatedItem.term : (relatedItem.termUr || relatedItem.term)}
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#3E5C76] bg-black/20 flex justify-between items-center">
                <div className="text-[#F0EBD8]/60 text-sm flex items-center gap-2">
                  <IoScale className="text-[#748CAB]" />
                  {t.legalTerm} • {getCategoryName(selectedItem.category)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add CSS for Urdu font support */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap');
        .font-urdu {
          font-family: 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
    </div>
  );
};

export default Glossary;