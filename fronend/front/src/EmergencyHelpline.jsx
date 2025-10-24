import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoCall,
  IoClose,
  IoAlertCircle,
  IoShieldCheckmark,
  IoCar,
  IoPeople,
  IoGlobe,
  IoPhonePortrait,
  IoWarning,
  IoChevronDown,
  IoChevronUp,
  IoStar,
  IoTimeOutline,
  IoLanguage
} from "react-icons/io5";
import { 
  FaAmbulance, 
  FaShieldAlt, 
  FaUserShield,
  FaExclamationTriangle
} from "react-icons/fa";
import { GiPoliceBadge } from "react-icons/gi";

const EmergencyHelpline = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [language, setLanguage] = useState("en"); // 'en' or 'ur'

  // Language content
  const content = {
    en: {
      title: "Emergency Helpline",
      subtitle: "Tap any service to connect directly. Works on all devices.",
      quickActions: {
        ambulance: "Emergency Ambulance",
        police: "Police Emergency"
      },
      filters: {
        all: "All Services",
        emergency: "Emergency",
        reporting: "Reporting",
        support: "Support",
        online: "Online"
      },
      guidelines: {
        title: "Emergency Guidelines",
        subtitle: "Tap to view important instructions",
        points: [
          "Stay Calm: Speak clearly and provide accurate information",
          "Location First: Always provide your exact location first",
          "Be Specific: Describe the emergency situation clearly",
          "Follow Instructions: Listen carefully to operator's guidance",
          "Don't Hang Up: Wait for the operator to end the call",
          "Save Contacts: Keep these numbers saved in your phone"
        ]
      },
      modal: {
        call: "Call",
        cancel: "Cancel",
        callNow: "Call Now",
        aboutToCall: "You are about to call:",
        avgResponse: "Avg. Response:",
        priority: "Priority"
      },
      footer: "For immediate life-threatening emergencies, call",
      first: "first"
    },
    ur: {
      title: "ایمرجنسی ہیلپ لائن",
      subtitle: "براہِ کرم کسی بھی سروس کو ڈائریکٹ رابطے کے لیے تھپتھپائیں۔ تمام ڈیوائسز پر کام کرتا ہے۔",
      quickActions: {
        ambulance: "ایمرجنسی ایمبولینس",
        police: "پولیس ایمرجنسی"
      },
      filters: {
        all: "تمام خدمات",
        emergency: "ایمرجنسی",
        reporting: "رپورٹنگ",
        support: "سپورٹ",
        online: "آن لائن"
      },
      guidelines: {
        title: "ایمرجنسی ہدایات",
        subtitle: "اہم ہدایات دیکھنے کے لیے تھپتھپائیں",
        points: [
          "پرسکون رہیں: واضح طور پر بولیں اور درست معلومات دیں",
          "پہلے مقام: ہمیشہ پہلے اپنا صحیح مقام بتائیں",
          "مخصوص ہوں: ایمرجنسی کی صورت حال واضح طور پر بیان کریں",
          "ہدایات پر عمل کریں: آپریٹر کی ہدایات کو غور سے سنیں",
          "فون بند نہ کریں: آپریٹر کے کال ختم کرنے تک انتظار کریں",
          "کنٹیکٹس محفوظ کریں: ان نمبروں کو اپنے فون میں محفوظ رکھیں"
        ]
      },
      modal: {
        call: "کال کریں",
        cancel: "منسوخ کریں",
        callNow: "ابھی کال کریں",
        aboutToCall: "آپ اس نمبر پر کال کرنے والے ہیں:",
        avgResponse: "اوسط جواب:",
        priority: "ترجیح"
      },
      footer: "فوری زندگی کو خطرے والے ایمرجنسی حالات کے لیے، پہلے کال کریں",
      first: "پہلے"
    }
  };

  const t = content[language];

  // Emergency services data with Urdu descriptions
  const emergencyServices = [
    {
      id: "police",
      name: language === "en" ? "Police Emergency" : "پولیس ایمرجنسی",
      number: "15",
      description: language === "en" 
        ? "For immediate police assistance and emergency response"
        : "فوری پولیس مدد اور ایمرجنسی ردعمل کے لیے",
      icon: GiPoliceBadge,
      color: "from-blue-600 to-blue-700",
      textColor: "text-blue-100",
      bgColor: "from-blue-600/20 to-blue-700/20",
      borderColor: "border-blue-500/30",
      type: "emergency",
      responseTime: language === "en" ? "2-5 minutes" : "2-5 منٹ",
      priority: language === "en" ? "High" : "اعلیٰ"
    },
    {
      id: "rescue",
      name: language === "en" ? "Rescue & Ambulance" : "ریسکیو اور ایمبولینس",
      number: "1122",
      description: language === "en" 
        ? "Emergency medical services and rescue operations"
        : "ایمرجنسی طبی خدمات اور بچاؤ کے آپریشنز",
      icon: FaAmbulance,
      color: "from-red-600 to-red-700",
      textColor: "text-red-100",
      bgColor: "from-red-600/20 to-red-700/20",
      borderColor: "border-red-500/30",
      type: "emergency",
      responseTime: language === "en" ? "3-7 minutes" : "3-7 منٹ",
      priority: language === "en" ? "Critical" : "انتہائی"
    },
    {
      id: "motorway",
      name: language === "en" ? "Motorway Police" : "موٹروے پولیس",
      number: "130",
      description: language === "en" 
        ? "Highway and motorway emergency services"
        : "ہائی وے اور موٹروے ایمرجنسی خدمات",
      icon: IoCar,
      color: "from-green-600 to-green-700",
      textColor: "text-green-100",
      bgColor: "from-green-600/20 to-green-700/20",
      borderColor: "border-green-500/30",
      type: "emergency",
      responseTime: language === "en" ? "5-10 minutes" : "5-10 منٹ",
      priority: language === "en" ? "High" : "اعلیٰ"
    },
    {
      id: "anf",
      name: language === "en" ? "Anti-Narcotics Force" : "اینٹی نارکوٹکس فورس",
      number: "1415",
      description: language === "en" 
        ? "Report drug-related crimes and get help"
        : "منشیات سے متعلق جرائم کی رپورٹ کریں اور مدد حاصل کریں",
      icon: FaShieldAlt,
      color: "from-purple-600 to-purple-700",
      textColor: "text-purple-100",
      bgColor: "from-purple-600/20 to-purple-700/20",
      borderColor: "border-purple-500/30",
      type: "reporting",
      responseTime: language === "en" ? "15-30 minutes" : "15-30 منٹ",
      priority: language === "en" ? "Medium" : "درمیانہ"
    },
    {
      id: "fia",
      name: language === "en" ? "FIA Helpline" : "ایف آئی اے ہیلپ لائن",
      number: "111-345-786",
      description: language === "en" 
        ? "Financial crimes and human trafficking reports"
        : "مالی جرائم اور انسانی اسمگلنگ کی رپورٹس",
      icon: FaUserShield,
      color: "from-orange-600 to-orange-700",
      textColor: "text-orange-100",
      bgColor: "from-orange-600/20 to-orange-700/20",
      borderColor: "border-orange-500/30",
      type: "reporting",
      responseTime: language === "en" ? "24-48 hours" : "24-48 گھنٹے",
      priority: language === "en" ? "Medium" : "درمیانہ"
    },
    {
      id: "national",
      name: language === "en" ? "National Emergency" : "قومی ایمرجنسی",
      number: "911",
      description: language === "en" 
        ? "General emergency helpline for all services"
        : "تمام خدمات کے لیے جنرل ایمرجنسی ہیلپ لائن",
      icon: IoWarning,
      color: "from-yellow-600 to-yellow-700",
      textColor: "text-yellow-100",
      bgColor: "from-yellow-600/20 to-yellow-700/20",
      borderColor: "border-yellow-500/30",
      type: "emergency",
      responseTime: language === "en" ? "2-5 minutes" : "2-5 منٹ",
      priority: language === "en" ? "High" : "اعلیٰ"
    },
    {
      id: "human-rights",
      name: language === "en" ? "Human Rights" : "انسانی حقوق",
      number: "1099",
      description: language === "en" 
        ? "Ministry of Human Rights helpline"
        : "انسانی حقوق کی وزارت کی ہیلپ لائن",
      icon: IoPeople,
      color: "from-teal-600 to-teal-700",
      textColor: "text-teal-100",
      bgColor: "from-teal-600/20 to-teal-700/20",
      borderColor: "border-teal-500/30",
      type: "support",
      responseTime: language === "en" ? "1-2 hours" : "1-2 گھنٹے",
      priority: language === "en" ? "Low" : "کم"
    },
    {
      id: "cyber-crime",
      name: language === "en" ? "FIA Cyber Crime" : "ایف آئی اے سائبر کرائم",
      website: "complaint.fia.gov.pk",
      description: language === "en" 
        ? "Online complaint portal for cyber crimes"
        : "سائبر جرائم کے لیے آن لائن شکایت پورٹل",
      icon: IoGlobe,
      color: "from-indigo-600 to-indigo-700",
      textColor: "text-indigo-100",
      bgColor: "from-indigo-600/20 to-indigo-700/20",
      borderColor: "border-indigo-500/30",
      isWebsite: true,
      type: "online",
      responseTime: language === "en" ? "24-72 hours" : "24-72 گھنٹے",
      priority: language === "en" ? "Medium" : "درمیانہ"
    },
    {
      id: "pta-spam",
      name: language === "en" ? "PTA Spam Complaints" : "پی ٹی اے اسپام شکایات",
      number: "7827",
      description: language === "en" 
        ? "Report spam calls and messages"
        : "اسپام کالز اور میسجز کی رپورٹ کریں",
      icon: IoPhonePortrait,
      color: "from-pink-600 to-pink-700",
      textColor: "text-pink-100",
      bgColor: "from-pink-600/20 to-pink-700/20",
      borderColor: "border-pink-500/30",
      type: "reporting",
      responseTime: language === "en" ? "2-3 days" : "2-3 دن",
      priority: language === "en" ? "Low" : "کم"
    },
    {
      id: "pta-scam",
      name: language === "en" ? "PTA Scam Complaints" : "پی ٹی اے اسکیم شکایات",
      number: "3373",
      description: language === "en" 
        ? "Report scam calls and fraudulent activities"
        : "دھوکہ دہی کی کالز اور فراڈ کی سرگرمیوں کی رپورٹ کریں",
      icon: FaExclamationTriangle,
      color: "from-rose-600 to-rose-700",
      textColor: "text-rose-100",
      bgColor: "from-rose-600/20 to-rose-700/20",
      borderColor: "border-rose-500/30",
      type: "reporting",
      responseTime: language === "en" ? "2-3 days" : "2-3 دن",
      priority: language === "en" ? "Low" : "کم"
    }
  ];

  // Filter buttons
  const filterButtons = [
    { id: "all", label: t.filters.all, count: emergencyServices.length, icon: IoStar },
    { id: "emergency", label: t.filters.emergency, count: emergencyServices.filter(s => s.type === "emergency").length, icon: IoWarning },
    { id: "reporting", label: t.filters.reporting, count: emergencyServices.filter(s => s.type === "reporting").length, icon: FaUserShield },
    { id: "support", label: t.filters.support, count: emergencyServices.filter(s => s.type === "support").length, icon: IoPeople },
    { id: "online", label: t.filters.online, count: emergencyServices.filter(s => s.type === "online").length, icon: IoGlobe }
  ];

  const filteredServices = emergencyServices.filter(service => 
    activeFilter === "all" || service.type === activeFilter
  );

  const handleCallClick = (service) => {
    setSelectedService(service);
    setShowCallModal(true);
  };

  const handleWebsiteClick = (website) => {
    window.open(`https://${website}`, '_blank', 'noopener,noreferrer');
  };

  const initiateCall = () => {
    if (selectedService) {
      window.location.href = `tel:${selectedService.number}`;
      setShowCallModal(false);
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
      case "انتہائی":
        return "text-red-400";
      case "High":
      case "اعلیٰ":
        return "text-orange-400";
      case "Medium":
      case "درمیانہ":
        return "text-yellow-400";
      case "Low":
      case "کم":
        return "text-green-400";
      default: return "text-gray-400";
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 20,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  };

  return (
    <div className="min-h-screen py-4 px-3 sm:px-4 relative overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1D2D44] to-[#3E5C76]">
      {/* Enhanced Background with LexEye Theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-80 h-80 bg-[#748CAB]/10 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-72 h-72 bg-[#3E5C76]/10 rounded-full blur-3xl top-1/2 -right-40" />
        <div className="absolute w-64 h-64 bg-[#1D2D44]/10 rounded-full blur-3xl bottom-20 left-1/4" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="max-w-4xl mt-[5%] mx-auto relative z-10">
        {/* Language Toggle */}
        <motion.div 
          className="flex justify-end mb-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/10"
          >
            <IoLanguage className="text-lg" />
            <span className="font-medium">{language === "en" ? "اردو" : "English"}</span>
          </button>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 pt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl mb-4 shadow-2xl">
            <IoAlertCircle className="text-3xl sm:text-4xl text-white" />
          </div>
          <h1 className={`text-2xl sm:text-4xl font-black text-[#F0EBD8] mb-2 sm:mb-3 leading-tight ${language === "ur" ? "font-urdu" : ""}`}>
            {t.title} <span className="text-red-400">🚨</span>
          </h1>
          <p className="text-[#F0EBD8]/80 text-sm sm:text-base max-w-md mx-auto px-2 leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <button 
            onClick={() => handleCallClick(emergencyServices.find(s => s.id === 'rescue'))}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base"
          >
            <FaAmbulance className="text-lg sm:text-xl" />
            <span>{t.quickActions.ambulance}</span>
          </button>
          <button 
            onClick={() => handleCallClick(emergencyServices.find(s => s.id === 'police'))}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base"
          >
            <GiPoliceBadge className="text-lg sm:text-xl" />
            <span>{t.quickActions.police}</span>
          </button>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {filterButtons.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-[#F0EBD8] text-[#0D1B2A] shadow-lg"
                    : "bg-white/10 text-[#F0EBD8]/80 hover:bg-white/20"
                }`}
              >
                {filter.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id ? "bg-[#0D1B2A]/20" : "bg-white/20"
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Emergency Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border ${service.borderColor} hover:shadow-xl transition-all duration-300 group min-h-[160px] flex flex-col justify-between relative`}
                onClick={() => service.isWebsite ? handleWebsiteClick(service.website) : handleCallClick(service)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.color} group-active:scale-95 transition-transform duration-200 shadow-lg`}>
                    <IconComponent className={`text-xl sm:text-2xl ${service.textColor}`} />
                  </div>

                  <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${service.bgColor} border ${service.borderColor} text-xs font-semibold ${service.textColor} flex items-center gap-1`}>
                    {service.isWebsite ? (
                      <>
                        <IoGlobe className="text-xs" />
                        <span className="hidden xs:inline">{language === "en" ? "Visit" : "وزٹ"}</span>
                      </>
                    ) : (
                      <>
                        <IoCall className="text-xs" />
                        <span className="hidden xs:inline">{language === "en" ? "Call" : "کال"}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className={`text-base sm:text-lg font-bold text-[#F0EBD8] mb-2 line-clamp-2 leading-tight ${language === "ur" ? "font-urdu text-right" : ""}`}>
                    {service.name}
                  </h3>
                  
                  <p className={`text-[#F0EBD8]/80 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 ${language === "ur" ? "text-right" : ""}`}>
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-xs">
                    <IoTimeOutline className="text-[#F0EBD8]/60" />
                    <span className="text-[#F0EBD8]/80 font-medium">
                      {language === "en" ? "Response:" : "جواب:"}
                    </span>
                    <span className="text-[#F0EBD8] font-semibold ml-1">
                      {service.responseTime}
                    </span>
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(service.priority)} bg-black/20`}>
                    {service.priority}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  {service.isWebsite ? (
                    <div className="flex items-center gap-2 text-indigo-300">
                      <IoGlobe className="text-sm" />
                      <span className="font-semibold text-sm">
                        {language === "en" ? "Website" : "ویب سائٹ"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <IoCall className={`text-sm ${service.textColor}`} />
                      <span className={`font-bold text-lg sm:text-xl ${service.textColor}`}>
                        {service.number}
                      </span>
                    </div>
                  )}
                </div>

                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-300 rounded-full`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Emergency Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 mb-6"
        >
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                <IoShieldCheckmark className="text-xl text-red-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F0EBD8]">
                  {t.guidelines.title}
                </h3>
                <p className="text-[#F0EBD8]/80 text-sm">
                  {t.guidelines.subtitle}
                </p>
              </div>
            </div>
            {showInstructions ? (
              <IoChevronUp className="text-xl text-[#F0EBD8]/60" />
            ) : (
              <IoChevronDown className="text-xl text-[#F0EBD8]/60" />
            )}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                  <div className="space-y-3">
                    {t.guidelines.points.slice(0, 3).map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-400 text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-[#F0EBD8] text-sm leading-relaxed flex-1">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {t.guidelines.points.slice(3, 6).map((point, index) => (
                      <div key={index + 3} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-400 text-sm font-bold">{index + 4}</span>
                        </div>
                        <p className="text-[#F0EBD8] text-sm leading-relaxed flex-1">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-[#F0EBD8]/80 text-sm">
            {t.footer}{" "}
            <button
              onClick={() => handleCallClick(emergencyServices.find(s => s.id === 'rescue'))}
              className="text-red-400 font-bold underline hover:text-red-300 transition-colors"
            >
              1122
            </button>{" "}
            {t.first}
          </p>
        </motion.div>
      </div>

      {/* Call Modal */}
      <AnimatePresence>
        {showCallModal && selectedService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCallModal(false)}
          >
            <motion.div
              className="bg-[#1D2D44] rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-white/10"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${selectedService.color} mb-4 mx-auto`}>
                    {React.createElement(selectedService.icon, { className: `text-2xl sm:text-3xl ${selectedService.textColor}` })}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#F0EBD8] mb-2">
                    {t.modal.call} {selectedService.name}?
                  </h3>
                  
                  <p className="text-[#F0EBD8]/80 text-sm mb-2">
                    {t.modal.aboutToCall}
                  </p>
                  
                  <div className="text-2xl sm:text-3xl font-black text-[#F0EBD8] mb-4 sm:mb-6">
                    {selectedService.number}
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#F0EBD8]/80">
                      <IoTimeOutline className="text-base" />
                      <span>{t.modal.avgResponse} <strong className="text-[#F0EBD8]">{selectedService.responseTime}</strong></span>
                    </div>
                    <div className={`text-sm font-semibold px-2 py-1 rounded-full ${getPriorityColor(selectedService.priority)} bg-black/30`}>
                      {selectedService.priority} {t.modal.priority}
                    </div>
                  </div>

                  <p className="text-[#F0EBD8]/60 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                    {selectedService.description}
                  </p>

                  <div className="flex gap-3 sm:gap-4">
                    <button
                      onClick={() => setShowCallModal(false)}
                      className="flex-1 px-4 sm:px-6 py-3 bg-white/10 text-[#F0EBD8] rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/20 text-sm sm:text-base"
                    >
                      {t.modal.cancel}
                    </button>
                    <button
                      onClick={initiateCall}
                      className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <IoCall className="text-lg sm:text-xl" />
                      {t.modal.callNow}
                    </button>
                  </div>
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

export default EmergencyHelpline;