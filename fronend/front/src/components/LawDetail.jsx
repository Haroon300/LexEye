import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { IoBookmarkSharp, IoBookmarkOutline } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import { FaBalanceScale, FaGavel, FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiPrinter, FiShare2, FiFileText, FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import Loader from "./Loader";
import {
  addBookmark,
  removeBookmark,
  loadLocalBookmarks,
  processPendingSyncs,
} from "../utils/bookmarkUtils";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();
  const [law, setLaw] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const token = localStorage.getItem("token");
  const printRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch law
  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const { data } = await axios.get(
          `https://lex-eye-backend.vercel.app/api/laws/${lawId}`
        );
        setLaw(data);
      } catch {
        const local = loadLocalBookmarks();
        const found = local.find((l) => l._id === lawId);
        setLaw(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchLaw();
  }, [lawId]);

  // Check bookmarks + sync when online
  useEffect(() => {
    const local = loadLocalBookmarks();
    setIsBookmarked(local.some((b) => b._id === lawId));

    const syncHandler = () => processPendingSyncs(token);
    window.addEventListener("online", syncHandler);
    return () => window.removeEventListener("online", syncHandler);
  }, [lawId, token]);

  // Toggle bookmark
  const toggleBookmark = async () => {
    if (!law) return;
    if (!token) return navigate("/signin");

    if (isBookmarked) {
      await removeBookmark(law._id, token);
      setIsBookmarked(false);
    } else {
      await addBookmark(law, token);
      setIsBookmarked(true);
    }
  };

  // Enhanced Share feature
  const handleShare = async () => {
    if (!law) return;
    const shareData = {
      title: `${law.section || "Law Section"} - LexEye`,
      text: `${law.legalConcept || "Legal information"} - ${law.description?.substring(0, 100)}...`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = '🔗 Link copied to clipboard!';
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Enhanced Print functionality with Step-by-Step Guide
  const handlePrint = () => {
    if (!law) return;
    
    setIsPrinting(true);

    const stepByStepContent = law.stepByStepGuide ? `
  <div class="section">
    <div class="section-header">
      <div class="section-icon" style="background: #fffbeb; color: #d97706; border: 1px solid #fbbf24;">📋</div>
      <h2 class="section-title">Step-by-Step Guide</h2>
    </div>
    <div class="section-content guide">
      <div class="steps-container">
        ${law.stepByStepGuide.split('<br>').map((step, index) => `
          <div class="step-item">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
              <div class="step-text">${step}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
` : '';

const printContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${law.section || "Law Section"} - LexEye</title>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1a202c;
          line-height: 1.6;
          background: #ffffff;
          padding: 15mm;
          max-width: 210mm;
          margin: 0 auto;
          min-height: 297mm;
          position: relative;
        }
        
        .print-header {
          border-bottom: 2px solid #0e7490;
          padding-bottom: 15px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo {
          font-size: 18px;
          font-weight: 700;
          color: #0e7490;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .logo-image {
          width: 25px !important;
          height: 25px !important;
        }
        
        .metadata {
          text-align: right;
          font-size: 10px;
          color: #64748b;
          line-height: 1.4;
        }
        
        .main-title {
          font-size: 26px;
          font-weight: 800;
          color: #0f766e;
          margin: 20px 0 8px 0;
          line-height: 1.3;
          padding-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .subtitle {
          font-size: 15px;
          color: #475569;
          font-weight: 500;
          margin-bottom: 20px;
          font-style: italic;
          background: #f8fafc;
          padding: 12px 16px;
          border-radius: 6px;
          border-left: 3px solid #0ea5e9;
        }
        
        .section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .section-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-weight: 600;
          font-size: 12px;
          border: 1px solid;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f766e;
          margin: 0;
        }
        
        .section-content {
          font-size: 13px;
          color: #374151;
          text-align: justify;
          line-height: 1.6;
        }
        
        .legal-concept {
          background: #f8fafc;
          border-left: 4px solid #0ea5e9;
          padding: 18px;
          margin: 15px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .consequence {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          padding: 18px;
          margin: 15px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .prevention {
          background: #f0fdf4;
          border-left: 4px solid #22c55e;
          padding: 18px;
          margin: 15px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .guide {
          background: #fffbeb;
          border-left: 4px solid #f59e0b;
          padding: 18px;
          margin: 15px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 0;
          background: transparent;
        }
        
        .step-number {
          width: 26px;
          height: 26px;
          background: #f59e0b;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }
        
        .step-content {
          flex: 1;
          padding: 0;
        }
        
        .step-text {
          color: #374151;
          line-height: 1.5;
          font-size: 13px;
          padding: 4px 0;
        }
        
        .footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
          color: #64748b;
          font-size: 10px;
          background: #f8fafc;
          padding: 15px;
          border-radius: 6px;
          position: absolute;
          bottom: 20mm;
          left: 25mm;
          right: 25mm;
        }
        
        .disclaimer {
          background: #fffbeb;
          border: 1px solid #f59e0b;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
          font-size: 11px;
          color: #92400e;
        }
        
        .disclaimer strong {
          color: #b45309;
        }
        
        @media print {
          @page {
            margin: 20mm;
            size: A4;
          }
          
          body {
            padding: 20mm;
            font-size: 12px;
            max-width: none;
            min-height: 257mm; /* 297mm - 20mm top - 20mm bottom */
          }
          
          .print-header {
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          
          .main-title {
            font-size: 22px;
            margin: 15px 0 6px 0;
            padding-bottom: 10px;
          }
          
          .subtitle {
            font-size: 13px;
            margin-bottom: 15px;
            padding: 10px 12px;
          }
          
          .section {
            margin-bottom: 20px;
          }
          
          .section-header {
            margin-bottom: 12px;
            padding-bottom: 6px;
          }
          
          .section-title {
            font-size: 16px;
          }
          
          .section-content {
            font-size: 11px;
            line-height: 1.5;
          }
          
          .legal-concept,
          .consequence,
          .prevention,
          .guide {
            padding: 15px;
            margin: 12px 0;
          }
          
          .logo-image {
            width: 18px !important;
            height: 18px !important;
          }
          
          .step-number {
            width: 22px;
            height: 22px;
            font-size: 10px;
          }
          
          .step-text {
            font-size: 11px;
            padding: 3px 0;
          }
          
          .steps-container {
            gap: 10px;
          }
          
          .footer {
            margin-top: 25px;
            padding: 12px;
            font-size: 9px;
            bottom: 20mm;
            left: 20mm;
            right: 20mm;
          }
          
          .disclaimer {
            padding: 12px;
            font-size: 10px;
            margin: 15px 0;
          }
        }
        
        @media (max-width: 600px) {
          body {
            padding: 15mm;
          }
          
          .print-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .metadata {
            text-align: left;
          }
          
          .main-title {
            font-size: 20px;
          }
          
          .section-title {
            font-size: 16px;
          }
          
          .step-item {
            gap: 10px;
          }
          
          .footer {
            left: 15mm;
            right: 15mm;
          }
        }
        
        /* Ensure proper page breaks */
        .section,
        .steps-container {
          page-break-inside: avoid;
        }
        
        .step-item {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        
        /* Add page numbers */
        @media print {
          .page-number:after {
            content: counter(page);
          }
        }
      </style>
    </head>
    <body>
      <div class="print-header">
        <div class="logo">
          <img src="/logo-2.png" alt="LexEye Logo" class="logo-image" style="width: 22px; height: 22px;" />
          LexEye - Legal Intelligence Platform
        </div>
        <div class="metadata">
          <div><strong>Printed:</strong> ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</div>
          ${law?._id ? `<div><strong>ID:</strong> ${law._id.slice(-8)}</div>` : ''}
          <div><strong>Page:</strong> <span class="page-number"></span></div>
        </div>
      </div>
      
      <h1 class="main-title">${law.section || "Legal Section"}</h1>
      ${law.legalConcept ? `<div class="subtitle">${law.legalConcept}</div>` : ''}
      
      <div class="disclaimer">
        <strong>📋 Important Notice:</strong> This document contains informational guidance only. 
        For specific legal advice, always consult a licensed legal professional.
      </div>

      <div class="section">
        <div class="section-header">
          <div class="section-icon" style="background: #dbeafe; color: #1d4ed8; border-color: #3b82f6;">⚖️</div>
          <h2 class="section-title">Legal Description</h2>
        </div>
        <div class="section-content legal-concept">
          ${law.description || "No description available."}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <div class="section-icon" style="background: #fee2e2; color: #dc2626; border-color: #ef4444;">⚠️</div>
          <h2 class="section-title">Legal Consequence</h2>
        </div>
        <div class="section-content consequence">
          ${law.legalConsequence || "No legal consequence available."}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <div class="section-icon" style="background: #dcfce7; color: #16a34a; border-color: #22c55e;">🛡️</div>
          <h2 class="section-title">Prevention Solutions</h2>
        </div>
        <div class="section-content prevention">
          ${law.preventionSolutions || "No prevention solutions available."}
        </div>
      </div>
      
      ${stepByStepContent}
      
      <div class="footer">
        <p><strong>Generated by LexEye - Your Legal Intelligence Platform</strong></p>
        <p>${window.location.href}</p>
        <p>© ${new Date().getFullYear()} LexEye - Team Mavericks</p>
      </div>
    </body>
  </html>
`;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      setIsPrinting(false);
      
      setTimeout(() => {
        printWindow.close();
      }, 500);
    }, 1000);
  };

  // Export as PDF
  const handleExportPDF = () => {
    if (!law) return;
    
    const confirmed = window.confirm(
      "For PDF export, we'll open the print dialog. Please choose 'Save as PDF' in your printer options. Continue?"
    );
    
    if (confirmed) {
      handlePrint();
    }
  };

  if (loading) return <Loader />;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen pt-[5%] text-white relative overflow-hidden p-">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl -top-10 -left-10 md:-top-20 md:-left-20 animate-pulse-slow" />
        <div className="absolute w-60 h-60 md:w-80 md:h-80 bg-cyan-400/10 rounded-full blur-3xl top-1/4 -right-10 md:top-1/3 md:-right-20 animate-pulse-slower" />
        <div className="absolute w-56 h-56 md:w-72 md:h-72 bg-cyan-300/10 rounded-full blur-3xl bottom-10 left-1/4 md:bottom-20 animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-4 md:py-6 lg:py-8 pt-16 md:pt-20">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.4 }}
          className="mb-4 md:mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20 text-sm md:text-base"
          >
            <TiArrowBack className="text-lg md:text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Previous
          </button>
        </motion.div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-3 md:gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-3 md:mb-4">
                <FaBalanceScale className="text-cyan-400 text-xs md:text-sm" />
                <span className="text-cyan-300 text-xs md:text-sm font-medium">Legal Section</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-200 via-cyan-100 to-cyan-50 text-transparent bg-clip-text leading-tight mb-2 md:mb-4">
                {law?.section || "Unknown Section"}
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed max-w-3xl">
                {law?.legalConcept || "No legal concept available"}
              </p>
            </div>

            {/* Action Buttons - Desktop */}
            {!isMobile && (
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                {/* Bookmark Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleBookmark}
                  className={`group relative flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl font-semibold backdrop-blur-xl border-2 transition-all duration-300 ${
                    isBookmarked
                      ? "bg-yellow-500/20 border-yellow-400 text-yellow-100 shadow-xl shadow-yellow-500/20"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-yellow-400/30 hover:text-white"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isBookmarked ? (
                      <motion.div key="bookmarked" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ duration: 0.3 }}>
                        <IoBookmarkSharp className="text-lg md:text-2xl" />
                      </motion.div>
                    ) : (
                      <motion.div key="unbookmarked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.3 }}>
                        <IoBookmarkOutline className="text-lg md:text-2xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="text-sm md:text-base">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                </motion.button>

                {/* Print Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="group relative flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl font-semibold backdrop-blur-xl border-2 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 hover:text-white transition-all duration-300 disabled:opacity-50"
                >
                  {isPrinting ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm md:text-base">Printing...</span>
                    </>
                  ) : (
                    <>
                      <FiPrinter className="text-lg md:text-2xl" />
                      <span className="text-sm md:text-base">Print</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white"
              >
                {showMobileMenu ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
              </motion.button>
            )}
          </div>

          {/* Mobile Action Menu */}
          <AnimatePresence>
            {isMobile && showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-3 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleBookmark}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium border transition-all duration-300 ${
                      isBookmarked
                        ? "bg-yellow-500/20 border-yellow-400 text-yellow-100"
                        : "bg-white/5 border-white/10 text-gray-300"
                    }`}
                  >
                    {isBookmarked ? <IoBookmarkSharp className="text-base" /> : <IoBookmarkOutline className="text-base" />}
                    <span className="text-xs">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrint}
                    disabled={isPrinting}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium bg-white/5 border border-white/10 text-gray-300 disabled:opacity-50"
                  >
                    {isPrinting ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiPrinter className="text-base" />
                    )}
                    <span className="text-xs">{isPrinting ? "Printing..." : "Print"}</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExportPDF}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium bg-purple-500/20 border border-purple-400/30 text-purple-300 col-span-2"
                  >
                    <FiFileText className="text-base" />
                    <span className="text-xs">Export as PDF</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium bg-green-500/20 border border-green-400/30 text-green-300 col-span-2"
                  >
                    <FiShare2 className="text-base" />
                    <span className="text-xs">Share Section</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Law Details */}
        <AnimatePresence mode="wait">
          {law && (
            <motion.div 
              variants={cardVariants} 
              initial="hidden" 
              animate="visible" 
              className="grid gap-4 md:gap-6 lg:gap-8 lg:grid-cols-3"
              ref={printRef}
            >
              {/* Main Content Card */}
              <motion.section 
                variants={sectionVariants} 
                className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl"
              >
                <div className="mb-4 md:mb-6 lg:mb-8">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="p-1.5 md:p-2 bg-cyan-500/20 rounded-lg">
                      <FaGavel className="text-cyan-400 text-sm md:text-lg" />
                    </div>
                    <h2 className="text-base md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-200 to-cyan-100 text-transparent bg-clip-text">
                      Legal Description
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg">
                    {law?.description || "No description available."}
                  </p>
                </div>

                <div className="mb-4 md:mb-6 lg:mb-8">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="p-1.5 md:p-2 bg-red-500/20 rounded-lg">
                      <FaBalanceScale className="text-red-400 text-sm md:text-lg" />
                    </div>
                    <h2 className="text-base md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-200 to-orange-200 text-transparent bg-clip-text">
                      Legal Consequence
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg">
                    {law?.legalConsequence || "No legal consequence available."}
                  </p>
                </div>

                <div className="mb-4 md:mb-6 lg:mb-8">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="p-1.5 md:p-2 bg-green-500/20 rounded-lg">
                      <FaShieldAlt className="text-green-400 text-sm md:text-lg" />
                    </div>
                    <h2 className="text-base md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-200 to-emerald-200 text-transparent bg-clip-text">
                      Prevention Solutions
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg">
                    {law?.preventionSolutions || "No prevention solutions available."}
                  </p>
                </div>

                {/* Step-by-Step Guide Section */}
                {law?.stepByStepGuide && (
                  <div className="mb-4 md:mb-6 lg:mb-8">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                      <div className="p-1.5 md:p-2 bg-yellow-500/20 rounded-lg">
                        <FaShieldAlt className="text-yellow-400 text-sm md:text-lg" />
                      </div>
                      <h2 className="text-base md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-200 to-amber-200 text-transparent bg-clip-text">
                        Step-by-Step Guide
                      </h2>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      {law.stepByStepGuide.split('<br>').map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                          <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-cyan-500/20 border border-cyan-400/30 rounded-full flex items-center justify-center">
                            <span className="text-cyan-300 font-bold text-xs md:text-sm">{index + 1}</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed text-sm md:text-base flex-1">
                            {step}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>

              {/* Sidebar - Hidden on mobile if menu is shown */}
              {(!isMobile) && (
                <motion.div 
                  variants={sectionVariants} 
                  transition={{ delay: 0.2 }} 
                  className="space-y-3 md:space-y-6"
                >
                  {/* Document Actions Card */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-300 mb-2 md:mb-3">Document Actions</h3>
                    <div className="space-y-2 md:space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePrint}
                        disabled={isPrinting}
                        className="w-full flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 rounded-lg md:rounded-xl py-2 md:py-3 px-3 transition-all duration-300 disabled:opacity-50 text-xs md:text-sm font-medium"
                      >
                        {isPrinting ? (
                          <>
                            <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin" />
                            Printing...
                          </>
                        ) : (
                          <>
                            <FiPrinter className="text-sm md:text-lg" />
                            Print Document
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleExportPDF}
                        className="w-full flex items-center justify-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-300 rounded-lg md:rounded-xl py-2 md:py-3 px-3 transition-all duration-300 text-xs md:text-sm font-medium"
                      >
                        <FiFileText className="text-sm md:text-lg" />
                        Export as PDF
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleShare}
                        className="w-full flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-300 rounded-lg md:rounded-xl py-2 md:py-3 px-3 transition-all duration-300 text-xs md:text-sm font-medium"
                      >
                        <FiShare2 className="text-sm md:text-lg" />
                        Share Section
                      </motion.button>
                    </div>
                  </div>

                  {/* Legal Tip Card */}
                  <div className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-400/20 rounded-xl md:rounded-2xl p-3 md:p-6">
                    <h3 className="text-sm md:text-lg font-semibold text-yellow-300 mb-2 md:mb-3">💡 Legal Tip</h3>
                    <p className="text-yellow-200/80 text-xs md:text-sm leading-relaxed">
                      Always consult with a qualified legal professional for specific advice related to your situation.
                      Printed documents are for informational purposes only.
                    </p>
                  </div>
                </motion.div>
              )}
              
              {/* Legal Tip Card for Mobile */}
              <div className="bg-yellow-500/10 md:hidden backdrop-blur-xl border border-yellow-400/20 rounded-xl md:rounded-2xl p-3 md:p-6">
                <h3 className="text-sm md:text-lg font-semibold text-yellow-300 mb-2 md:mb-3">💡 Legal Tip</h3>
                <p className="text-yellow-200/80 text-xs md:text-sm leading-relaxed">
                  Always consult with a qualified legal professional for specific advice related to your situation.
                  Printed documents are for informational purposes only.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LawDetail;