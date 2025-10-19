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
  IoStar
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

  // Emergency services data - declared first
  const emergencyServices = [
    {
      id: "police",
      name: "Police Emergency",
      number: "15",
      description: "For immediate police assistance and emergency response",
      icon: GiPoliceBadge,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-100",
      bgColor: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-400/30",
      type: "emergency",
      responseTime: "2-5 minutes",
      priority: "High"
    },
    {
      id: "rescue",
      name: "Rescue & Ambulance",
      number: "1122",
      description: "Emergency medical services and rescue operations",
      icon: FaAmbulance,
      color: "from-red-500 to-red-600",
      textColor: "text-red-100",
      bgColor: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-400/30",
      type: "emergency",
      responseTime: "3-7 minutes",
      priority: "Critical"
    },
    {
      id: "motorway",
      name: "Motorway Police",
      number: "130",
      description: "Highway and motorway emergency services",
      icon: IoCar,
      color: "from-green-500 to-green-600",
      textColor: "text-green-100",
      bgColor: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-400/30",
      type: "emergency",
      responseTime: "5-10 minutes",
      priority: "High"
    },
    {
      id: "anf",
      name: "Anti-Narcotics Force",
      number: "1415",
      description: "Report drug-related crimes and get help",
      icon: FaShieldAlt,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-100",
      bgColor: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-400/30",
      type: "reporting",
      responseTime: "15-30 minutes",
      priority: "Medium"
    },
    {
      id: "fia",
      name: "FIA Helpline",
      number: "111-345-786",
      description: "Financial crimes and human trafficking reports",
      icon: FaUserShield,
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-100",
      bgColor: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-400/30",
      type: "reporting",
      responseTime: "24-48 hours",
      priority: "Medium"
    },
    {
      id: "national",
      name: "National Emergency",
      number: "911",
      description: "General emergency helpline for all services",
      icon: IoWarning,
      color: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-100",
      bgColor: "from-yellow-500/20 to-yellow-600/20",
      borderColor: "border-yellow-400/30",
      type: "emergency",
      responseTime: "2-5 minutes",
      priority: "High"
    },
    {
      id: "human-rights",
      name: "Human Rights",
      number: "1099",
      description: "Ministry of Human Rights helpline",
      icon: IoPeople,
      color: "from-teal-500 to-teal-600",
      textColor: "text-teal-100",
      bgColor: "from-teal-500/20 to-teal-600/20",
      borderColor: "border-teal-400/30",
      type: "support",
      responseTime: "1-2 hours",
      priority: "Low"
    },
    {
      id: "cyber-crime",
      name: "FIA Cyber Crime",
      website: "complaint.fia.gov.pk",
      description: "Online complaint portal for cyber crimes",
      icon: IoGlobe,
      color: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-100",
      bgColor: "from-indigo-500/20 to-indigo-600/20",
      borderColor: "border-indigo-400/30",
      isWebsite: true,
      type: "online",
      responseTime: "24-72 hours",
      priority: "Medium"
    },
    {
      id: "pta-spam",
      name: "PTA Spam Complaints",
      number: "7827",
      description: "Report spam calls and messages",
      icon: IoPhonePortrait,
      color: "from-pink-500 to-pink-600",
      textColor: "text-pink-100",
      bgColor: "from-pink-500/20 to-pink-600/20",
      borderColor: "border-pink-400/30",
      type: "reporting",
      responseTime: "2-3 days",
      priority: "Low"
    },
    {
      id: "pta-scam",
      name: "PTA Scam Complaints",
      number: "3373",
      description: "Report scam calls and fraudulent activities",
      icon: FaExclamationTriangle,
      color: "from-rose-500 to-rose-600",
      textColor: "text-rose-100",
      bgColor: "from-rose-500/20 to-rose-600/20",
      borderColor: "border-rose-400/30",
      type: "reporting",
      responseTime: "2-3 days",
      priority: "Low"
    }
  ];

  // Filter buttons - declared after emergencyServices
  const filterButtons = [
    { id: "all", label: "All Services", count: emergencyServices.length, icon: IoStar },
    { id: "emergency", label: "Emergency", count: emergencyServices.filter(s => s.type === "emergency").length, icon: IoWarning },
    { id: "reporting", label: "Reporting", count: emergencyServices.filter(s => s.type === "reporting").length, icon: FaUserShield },
    { id: "support", label: "Support", count: emergencyServices.filter(s => s.type === "support").length, icon: IoPeople },
    { id: "online", label: "Online", count: emergencyServices.filter(s => s.type === "online").length, icon: IoGlobe }
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

  // Mobile-optimized animations
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
    <div className="min-h-screen py-4 px-3 sm:px-4 relative overflow-hidden">
      {/* Enhanced Mobile Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl top-1/2 -right-40" />
        <div className="absolute w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl bottom-20 left-1/4" />
        
        {/* Grid overlay for better readability */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="max-w-4xl mt-[5%] mx-auto relative z-10">
        {/* Header - Mobile Optimized */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 pt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4 shadow-2xl">
            <IoAlertCircle className="text-3xl sm:text-4xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-2 sm:mb-3 leading-tight">
            Emergency <span className="text-red-400">Helpline</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto px-2 leading-relaxed">
            Tap any service to connect directly. Works on all devices.
          </p>
        </motion.div>

        {/* Quick Action Buttons - Mobile First */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <button 
            onClick={() => handleCallClick(emergencyServices.find(s => s.id === 'rescue'))}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base"
          >
            <FaAmbulance className="text-lg sm:text-xl" />
            <span>Emergency Ambulance</span>
          </button>
          <button 
            onClick={() => handleCallClick(emergencyServices.find(s => s.id === 'police'))}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base"
          >
            <GiPoliceBadge className="text-lg sm:text-xl" />
            <span>Police Emergency</span>
          </button>
        </motion.div>

        {/* Filter Buttons - Horizontal Scroll for Mobile */}
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
                    ? "bg-white text-slate-900 shadow-lg"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {filter.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id ? "bg-slate-900/20" : "bg-white/20"
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Emergency Grid - Mobile Optimized */}
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
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border ${service.borderColor} hover:shadow-xl transition-all duration-300 group min-h-[140px] flex flex-col justify-between relative`}
                onClick={() => service.isWebsite ? handleWebsiteClick(service.website) : handleCallClick(service)}
              >
                <div className="flex items-start justify-between mb-3">
                  {/* Service Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.color} group-active:scale-95 transition-transform duration-200 shadow-lg`}>
                    <IconComponent className={`text-xl sm:text-2xl ${service.textColor}`} />
                  </div>

                  {/* Call/Visit Badge - Always visible on mobile */}
                  <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${service.bgColor} border ${service.borderColor} text-xs font-semibold ${service.textColor} flex items-center gap-1`}>
                    {service.isWebsite ? (
                      <>
                        <IoGlobe className="text-xs" />
                        <span className="hidden xs:inline">Visit</span>
                      </>
                    ) : (
                      <>
                        <IoCall className="text-xs" />
                        <span className="hidden xs:inline">Call</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Service Info */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 leading-tight">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                    {service.description}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  {service.isWebsite ? (
                    <div className="flex items-center gap-2 text-indigo-300">
                      <IoGlobe className="text-sm" />
                      <span className="font-semibold text-sm">Website</span>
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

                {/* Active state indicator */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-300 rounded-full`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Collapsible Emergency Instructions */}
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
              <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <IoShieldCheckmark className="text-xl text-red-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Emergency Guidelines
                </h3>
                <p className="text-gray-300 text-sm">
                  Tap to {showInstructions ? 'hide' : 'view'} important instructions
                </p>
              </div>
            </div>
            {showInstructions ? (
              <IoChevronUp className="text-xl text-white/60" />
            ) : (
              <IoChevronDown className="text-xl text-white/60" />
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
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-400 text-sm font-bold">{num}</span>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed flex-1">
                          {num === 1 && <><strong>Stay Calm:</strong> Speak clearly and provide accurate information</>}
                          {num === 2 && <><strong>Location First:</strong> Always provide your exact location first</>}
                          {num === 3 && <><strong>Be Specific:</strong> Describe the emergency situation clearly</>}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[4, 5, 6].map((num) => (
                      <div key={num} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-400 text-sm font-bold">{num}</span>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed flex-1">
                          {num === 4 && <><strong>Follow Instructions:</strong> Listen carefully to operator's guidance</>}
                          {num === 5 && <><strong>Don't Hang Up:</strong> Wait for the operator to end the call</>}
                          {num === 6 && <><strong>Save Contacts:</strong> Keep these numbers saved in your phone</>}
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
          <p className="text-gray-300 text-sm">
            For immediate life-threatening emergencies, call{" "}
            <button
              onClick={() => handleCallClick(emergencyServices.find(s => s.id === 'rescue'))}
              className="text-red-500 font-bold underline hover:text-red-300 transition-colors"
            >
              1122
            </button>{" "}
            first
          </p>
        </motion.div>
      </div>

      {/* Mobile-Optimized Call Modal */}
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
              className="bg-slate-800 rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-white/10"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="text-center">
                  {/* Service Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${selectedService.color} mb-4 mx-auto`}>
                    {React.createElement(selectedService.icon, { className: `text-2xl sm:text-3xl ${selectedService.textColor}` })}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Call {selectedService.name}?
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-2">
                    You are about to call:
                  </p>
                  
                  <div className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6">
                    {selectedService.number}
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                    {selectedService.description}
                  </p>

                  <div className="flex gap-3 sm:gap-4">
                    <button
                      onClick={() => setShowCallModal(false)}
                      className="flex-1 px-4 sm:px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/20 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={initiateCall}
                      className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <IoCall className="text-lg sm:text-xl" />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmergencyHelpline;