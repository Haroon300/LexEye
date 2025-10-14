import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { IoBookmarkSharp, IoBookmarkOutline } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import { FaBalanceScale, FaGavel, FaShieldAlt, FaPrint, FaShare, FaFilePdf } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiPrinter, FiShare2, FiFileText } from "react-icons/fi";
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
  const token = localStorage.getItem("token");
  const printRef = useRef(null);

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

  // Enhanced Print functionality with proper left padding
const handlePrint = () => {
  if (!law) return;
  
  setIsPrinting(true);

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
            padding: 0, 20, 0, 20;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #1a202c;
            line-height: 1.6;
            background: #ffffff;
            padding: 40px 40px 40px 40px; /* Increased left padding */
            max-width: 210mm;
            margin: 0 auto;
          }
          
          .print-header {
            border-bottom: 3px solid #0e7490;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 15px;
            padding-left: 0; /* Reset left padding for header */
          }
          
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #0e7490;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .metadata {
            margin-left: auto;
            text-align: right;
            font-size: 12px;
            color: #64748b;
          }
          
          .main-title {
            font-size: 28px;
            font-weight: 700;
            color: #0f766e;
            margin: 30px 0 10px 0;
            line-height: 1.3;
            padding-left: 0; /* Reset for main title */
          }
          
          .subtitle {
            font-size: 18px;
            color: #475569;
            font-weight: 500;
            margin-bottom: 30px;
            font-style: italic;
            padding-left: 0; /* Reset for subtitle */
          }
          
          .section {
            margin-bottom: 35px;
            page-break-inside: avoid;
            padding-left: 0; /* Reset for sections */
          }
          
          .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e2e8f0;
            padding-left: 0; /* Reset for section headers */
          }
          
          .section-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            font-weight: 600;
            font-size: 12px;
          }
          
          .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #0f766e;
          }
          
          .section-content {
            font-size: 14px;
            color: #374151;
            text-align: justify;
            padding-left: 0; /* Reset for content */
          }
          
          .legal-concept {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 20px 25px 20px 30px; /* Increased left padding */
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          
          .consequence {
            background: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 20px 25px 20px 30px; /* Increased left padding */
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          
          .prevention {
            background: #f0fdf4;
            border-left: 4px solid #22c55e;
            padding: 20px 25px 20px 30px; /* Increased left padding */
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: 12px;
            padding-left: 0; /* Reset for footer */
          }
          
          .disclaimer {
            background: #fffbeb;
            border: 1px solid #f59e0b;
            padding: 20px 25px 20px 30px; /* Increased left padding */
            border-radius: 8px;
            margin: 20px 0;
            font-size: 12px;
            color: #92400e;
          }
          
          /* Content wrapper with consistent left spacing */
          .content-wrapper {
            padding-left: 0; /* Content starts from left */
          }
          
          @media print {
            @page {
              margin: 25mm 20mm 20mm 30mm; /* Increased left margin: top, right, bottom, left */
            }
            
            body {
              padding: 0 0 0 20px; /* Left padding for print */
            }
            
            .section {
              page-break-inside: avoid;
            }
            
            .print-header {
              page-break-after: avoid;
            }
            
            .main-title {
              page-break-after: avoid;
            }
            
            /* Ensure content has proper left spacing in print */
            .legal-concept,
            .consequence,
            .prevention,
            .disclaimer {
              margin-left: 10px; /* Additional left margin for print */
            }
          }
          
          @media (max-width: 600px) {
            body {
              padding: 20px 20px 20px 30px; /* Adjusted for mobile */
            }
            
            .main-title {
              font-size: 24px;
            }
            
            .section-title {
              font-size: 18px;
            }
            
            .legal-concept,
            .consequence,
            .prevention,
            .disclaimer {
              padding: 15px 20px 15px 25px; /* Adjusted for mobile */
            }
          }
        </style>
      </head>
      <body>
        <div class="content-wrapper">
          <div class="print-header">
            <div class="logo">
              ⚖️ LexEye
            </div>
            <div class="metadata">
              <div>Legal Intelligence Platform</div>
              <div>Printed on: ${new Date().toLocaleDateString()}</div>
              ${law?._id ? `<div>Document ID: ${law._id.slice(-8)}</div>` : ''}
            </div>
          </div>
          
          <h1 class="main-title">${law.section || "Legal Section"}</h1>
          ${law.legalConcept ? `<div class="subtitle">${law.legalConcept}</div>` : ''}
          
          <div class="disclaimer">
            <strong>Important Notice:</strong> This document contains informational guidance only. 
            For specific legal advice, always consult a licensed legal professional.
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon" style="background: #dbeafe; color: #1d4ed8;">LD</div>
              <h2 class="section-title">Legal Description</h2>
            </div>
            <div class="section-content legal-concept">
              ${law.description || "No description available."}
            </div>
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon" style="background: #fee2e2; color: #dc2626;">LC</div>
              <h2 class="section-title">Legal Consequence</h2>
            </div>
            <div class="section-content consequence">
              ${law.legalConsequence || "No legal consequence available."}
            </div>
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon" style="background: #dcfce7; color: #16a34a;">PS</div>
              <h2 class="section-title">Prevention Solutions</h2>
            </div>
            <div class="section-content prevention">
              ${law.preventionSolutions || "No prevention solutions available."}
            </div>
          </div>
          
          <div class="footer">
            <p>Generated by LexEye - Your Legal Intelligence Platform</p>
            <p>${window.location.href}</p>
            <p>© ${new Date().getFullYear()} LexEye - Team Mavericks</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
  
  // Add loading delay for better UX
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    setIsPrinting(false);
    
    // Close the print window after printing
    setTimeout(() => {
      printWindow.close();
    }, 500);
  }, 1000);
};

  // Export as PDF (basic implementation)
  const handleExportPDF = () => {
    if (!law) return;
    
    // For a real implementation, you would use a library like jsPDF
    // This is a basic implementation that opens print dialog
    const confirmed = window.confirm(
      "For PDF export, we'll open the print dialog. Please choose 'Save as PDF' in your printer options. Continue?"
    );
    
    if (confirmed) {
      handlePrint();
    }
  };

  if (loading) return <Loader />;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen mt-[5%] bg-gradient-to-br from-[#051c1f] via-[#08292e] to-[#0a1b1f] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-80 h-80 bg-blue-400/10 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower" />
        <div className="absolute w-72 h-72 bg-teal-400/10 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20"
          >
            <TiArrowBack className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Previous
          </button>
        </motion.div>

        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-4">
                <FaBalanceScale className="text-cyan-400 text-sm" />
                <span className="text-cyan-300 text-sm font-medium">Legal Section</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-200 via-gray-200 to-silver text-transparent bg-clip-text leading-tight mb-4">
                {law?.section || "Unknown Section"}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                {law?.legalConcept || "No legal concept available"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Bookmark Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleBookmark}
                className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold backdrop-blur-xl border-2 transition-all duration-300 ${
                  isBookmarked
                    ? "bg-yellow-500/20 border-yellow-400 text-yellow-100 shadow-2xl shadow-yellow-500/20"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-yellow-400/30 hover:text-white"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isBookmarked ? (
                    <motion.div key="bookmarked" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ duration: 0.3 }}>
                      <IoBookmarkSharp className="text-2xl" />
                    </motion.div>
                  ) : (
                    <motion.div key="unbookmarked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.3 }}>
                      <IoBookmarkOutline className="text-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="hidden sm:block">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </motion.button>

              {/* Print & Export Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPrinting}
                  className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold backdrop-blur-xl border-2 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 hover:text-white transition-all duration-300 disabled:opacity-50"
                >
                  {isPrinting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="hidden sm:block">Printing...</span>
                    </>
                  ) : (
                    <>
                      <FiPrinter className="text-2xl" />
                      <span className="hidden sm:block">Print/Export</span>
                    </>
                  )}
                </motion.button>

                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-40">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-cyan-300 transition-all duration-200 text-sm"
                  >
                    <FiPrinter className="text-lg" />
                    Print Document
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-cyan-300 transition-all duration-200 text-sm"
                  >
                    <FiFileText className="text-lg" />
                    Export as PDF
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-cyan-300 transition-all duration-200 text-sm"
                  >
                    <FiShare2 className="text-lg" />
                    Share Section
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Law Details */}
        <AnimatePresence mode="wait">
          {law && (
            <motion.div variants={cardVariants} initial="hidden" animate="visible" className="grid gap-8 lg:grid-cols-3" ref={printRef}>
              {/* Main Content Card */}
              <motion.section variants={sectionVariants} className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <FaGavel className="text-cyan-400 text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-gray-200 text-transparent bg-clip-text">
                      Legal Description
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {law?.description || "No description available."}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <FaBalanceScale className="text-red-400 text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-red-200 to-orange-200 text-transparent bg-clip-text">
                      Legal Consequence
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {law?.legalConsequence || "No legal consequence available."}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FaShieldAlt className="text-green-400 text-lg" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-200 to-emerald-200 text-transparent bg-clip-text">
                      Prevention Solutions
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {law?.preventionSolutions || "No prevention solutions available."}
                  </p>
                </div>
              </motion.section>

              {/* Sidebar */}
              <motion.div variants={sectionVariants} transition={{ delay: 0.2 }} className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">Document Actions</h3>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePrint}
                      disabled={isPrinting}
                      className="w-full flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 rounded-xl py-3 px-4 transition-all duration-300 disabled:opacity-50 text-sm font-medium"
                    >
                      {isPrinting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin" />
                          Printing...
                        </>
                      ) : (
                        <>
                          <FiPrinter className="text-lg" />
                          Print Document
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExportPDF}
                      className="w-full flex items-center justify-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-300 rounded-xl py-3 px-4 transition-all duration-300 text-sm font-medium"
                    >
                      <FiFileText className="text-lg" />
                      Export as PDF
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShare}
                      className="w-full flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-300 rounded-xl py-3 px-4 transition-all duration-300 text-sm font-medium"
                    >
                      <FiShare2 className="text-lg" />
                      Share Section
                    </motion.button>
                  </div>
                </div>

                <div className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-400/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-300 mb-3">💡 Legal Tip</h3>
                  <p className="text-yellow-200/80 text-sm leading-relaxed">
                    Always consult with a qualified legal professional for specific advice related to your situation.
                    Printed documents are for informational purposes only.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LawDetail;