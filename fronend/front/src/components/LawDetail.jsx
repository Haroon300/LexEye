import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  IoBookmarkSharp, 
  IoBookmarkOutline, 
  IoShareOutline,
  IoPrintOutline,
  IoDocumentTextOutline,
  IoArrowBack
} from "react-icons/io5";
import { 
  FaBalanceScale,
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaList,
  FaTag,
  FaExclamationTriangle,
  FaLightbulb,
  FaLink,
  FaPuzzlePiece,
  FaBrain,
  FaLeaf,
  FaSkullCrossbones
} from "react-icons/fa";
import { 
  FiMenu, 
  FiX,
  FiBook 
} from "react-icons/fi";
import { GiLadder } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loader from "./Loader";
import {
  addBookmark,
  removeBookmark,
  loadLocalBookmarks,
  processPendingSyncs,
} from "../utils/bookmarkUtils";

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

// Create motion components
const MotionSection = ({ variants, initial, animate, children, className, ...props }) => (
  <motion.div
    variants={variants}
    initial={initial}
    animate={animate}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

const MotionDiv = ({ variants, initial, animate, exit, children, className, ...props }) => (
  <motion.div
    variants={variants}
    initial={initial}
    animate={animate}
    exit={exit}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

const MotionButton = ({ whileHover, whileTap, children, className, ...props }) => (
  <motion.button
    whileHover={whileHover}
    whileTap={whileTap}
    className={className}
    {...props}
  >
    {children}
  </motion.button>
);

// Create animated Link component
const MotionLink = motion(Link);

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();
  const [law, setLaw] = useState(null);
  const [relatedLawsData, setRelatedLawsData] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [relatedLawsLoading, setRelatedLawsLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
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
        
        // Fetch related laws data if available
        if (data.relatedLaws && data.relatedLaws.length > 0) {
          await fetchRelatedLaws(data.relatedLaws);
        }
      } catch (error) {
        console.error("Error fetching law:", error);
        const local = loadLocalBookmarks();
        const found = local.find((l) => l._id === lawId);
        setLaw(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchLaw();
  }, [lawId]);

  // Search laws by title/section to find related laws
  const fetchRelatedLaws = async (relatedLawTitles) => {
    if (!relatedLawTitles || relatedLawTitles.length === 0) return;
    
    setRelatedLawsLoading(true);
    try {
      const searchPromises = relatedLawTitles.map(async (lawTitle) => {
        try {
          // Clean the law title - remove extra text and get main section/name
          const cleanTitle = cleanLawTitle(lawTitle);
          
          if (!cleanTitle || cleanTitle.trim().length === 0) return null;

          // Search for laws matching this title
          const { data } = await axios.post(
            "https://lex-eye-backend.vercel.app/api/laws/search",
            { 
              query: cleanTitle,
              limit: 5 // Get top 5 matches
            }
          );

          if (data.results && data.results.length > 0) {
            // Return the best match (first result)
            return data.results[0];
          }
          
          return null;
        } catch (error) {
          console.warn(`Could not search for law "${lawTitle}":`, error);
          return null;
        }
      });

      const relatedLaws = await Promise.all(searchPromises);
      // Filter out null values and duplicates
      const validLaws = relatedLaws.filter(law => 
        law !== null && law._id !== lawId // Exclude current law
      );
      
      // Remove duplicates based on _id
      const uniqueLaws = validLaws.filter((law, index, self) => 
        index === self.findIndex(l => l._id === law._id)
      );
      
      setRelatedLawsData(uniqueLaws);
    } catch (error) {
      console.error("Error fetching related laws:", error);
    } finally {
      setRelatedLawsLoading(false);
    }
  };

  // Helper function to clean law titles for search
  const cleanLawTitle = (title) => {
    if (!title) return '';
    
    // Remove content in parentheses and extra descriptions
    let clean = title
      .replace(/\([^)]*\)/g, '') // Remove parentheses content
      .replace(/Anti-Rape.*$/, '') // Remove specific ordinance names
      .replace(/Child Protection.*$/, '')
      .replace(/Women Protection.*$/, '')
      .replace(/Punishment for.*$/, '')
      .replace(/Investigation and Trial.*$/, '')
      .replace(/Ordinance.*$/, '')
      .replace(/\d{4}/g, '') // Remove years
      .replace(/[.,]/g, '') // Remove dots and commas
      .trim();
    
    // Extract PPC section numbers if present
    const ppcMatch = title.match(/PPC Section (\d+)/i) || title.match(/Section (\d+)/i);
    if (ppcMatch) {
      return `PPC Section ${ppcMatch[1]}`;
    }
    
    // Return the first few words if it's too long
    const words = clean.split(' ');
    if (words.length > 4) {
      return words.slice(0, 4).join(' ');
    }
    
    return clean;
  };

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

  // Helper function to copy to clipboard with fallback
  const copyToClipboard = async (text) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers or insecure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('Fallback copy failed');
        }
        return successful;
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      throw err;
    }
  };

  // Helper function to show notifications
  const showNotification = (message) => {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.share-notification');
    existingNotifications.forEach(notification => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });

    const notification = document.createElement('div');
    notification.className = 'share-notification fixed top-4 right-4 text-white px-4 py-3 rounded-lg shadow-2xl z-50 backdrop-blur-xl border transform transition-transform duration-300';
    notification.style.backgroundColor = `${COLORS.navy[4]}E6`;
    notification.style.borderColor = `${COLORS.navy[4]}40`;
    notification.style.color = COLORS.navy[5];
    notification.textContent = message;
    
    document.body.appendChild(notification);

    // Add entrance animation
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  };

  // Enhanced Share feature with comprehensive error handling
  const handleShare = async () => {
    if (!law) return;
    
    // Prevent multiple simultaneous share attempts
    if (isSharing) {
      showNotification('⚠️ Please wait...');
      return;
    }

    const shareData = {
      title: `${law.lawTitle || law.section || "Law Section"} - LexEye`,
      text: `${law.legalConcept || "Legal information"} - ${law.description?.substring(0, 100)}...`,
      url: window.location.href,
    };

    try {
      setIsSharing(true);
      
      // Check if Web Share API is supported and available
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await copyToClipboard(window.location.href);
        showNotification('🔗 Link copied to clipboard!');
      }
    } catch (err) {
      // Handle specific error types
      switch (err.name) {
        case 'AbortError':
          // User cancelled the share - no action needed
          break;
        case 'NotAllowedError':
          showNotification('❌ Share permission denied');
          break;
        case 'TypeError':
          // Invalid share data - fallback to clipboard
          await copyToClipboard(window.location.href);
          showNotification('🔗 Link copied to clipboard!');
          break;
        default:
          // Any other error - fallback to clipboard
          console.warn('Share error:', err);
          await copyToClipboard(window.location.href);
          showNotification('🔗 Link copied to clipboard!');
          break;
      }
    } finally {
      setIsSharing(false);
    }
  };

  // Handle related law click
  const handleRelatedLawClick = (relatedLawId) => {
    if (!relatedLawId) return;
    
    // Navigate to the related law detail page
    navigate(`/law/${relatedLawId}`);
    
    // Refresh the page to load new law data
    window.location.reload();
  };

  // Check if law has enhanced fields
  const isEnhancedLaw = (lawData) => {
    return lawData && (
      lawData.lawTitle ||
      lawData.sectionOverview ||
      lawData.jurisdiction || 
      lawData.lastUpdated ||
      lawData.stepByStepGuide ||
      lawData.sabCategory
    );
  };

  // Helper function to safely render related laws
  const renderRelatedLaw = (lawItem) => {
    if (typeof lawItem === 'string') {
      return lawItem;
    } else if (typeof lawItem === 'object' && lawItem !== null) {
      return lawItem.section || lawItem.legalConcept || lawItem.lawTitle || JSON.stringify(lawItem);
    }
    return String(lawItem);
  };

  // Fix step-by-step guide formatting
  const formatStepByStepGuide = (guide) => {
    if (!guide) return [];
    
    let steps = [];
    
    // Method 1: Split by numbered list pattern (1., 2., etc.)
    const numberedPattern = /\d+\.\s+/g;
    if (numberedPattern.test(guide)) {
      steps = guide.split(/\d+\.\s+/).filter(step => step.trim().length > 0);
    } 
    // Method 2: Split by <br> tags
    else if (guide.includes('<br>')) {
      steps = guide.split('<br>').filter(step => step.trim().length > 0);
    }
    // Method 3: Split by new lines
    else if (guide.includes('\n')) {
      steps = guide.split('\n').filter(step => step.trim().length > 0);
    }
    // Method 4: Manual parsing for continuous text with numbers
    else {
      const stepMatches = guide.match(/\d+\..*?(?=\d+\.|$)/g);
      if (stepMatches) {
        steps = stepMatches.map(step => step.replace(/^\d+\.\s*/, '').trim());
      } else {
        steps = guide.split(/\.\s+(?=[A-Z])/).filter(step => step.trim().length > 0);
      }
    }
    
    return steps.map(step => step.trim()).filter(step => step.length > 0);
  };

  // Enhanced Print functionality
  const handlePrint = () => {
    if (!law) return;
    
    setIsPrinting(true);

    // Format steps for print
    const steps = formatStepByStepGuide(law.stepByStepGuide);
    const stepByStepContent = steps.length > 0 ? `
      <div class="section">
        <div class="section-header">
          <div class="section-icon">🪜</div>
          <h2 class="section-title">Step-by-Step Legal Help Guide</h2>
        </div>
        <div class="section-content guide">
          <div class="steps-container">
            ${steps.map((step, index) => `
              <div class="step-item">
                <div class="step-number">${index + 1}️⃣</div>
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
          <title>${law.lawTitle || law.section || "Law Section"} - LexEye</title>
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
              padding: 20mm;
              max-width: 210mm;
              margin: 0 auto;
            }
            
            .print-header {
              border-bottom: 3px solid ${COLORS.navy[3]};
              padding-bottom: 20px;
              margin-bottom: 30px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            
            .logo {
              font-size: 20px;
              font-weight: 700;
              color: ${COLORS.navy[3]};
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .main-title {
              font-size: 28px;
              font-weight: 800;
              color: ${COLORS.navy[3]};
              margin: 25px 0 10px 0;
              line-height: 1.3;
              padding-bottom: 15px;
              border-bottom: 2px solid #e2e8f0;
            }
            
            .law-meta {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              margin-bottom: 20px;
              padding: 15px;
              background: #f8fafc;
              border-radius: 8px;
            }
            
            .meta-item {
              display: flex;
              flex-direction: column;
              gap: 5px;
            }
            
            .meta-label {
              font-size: 12px;
              font-weight: 600;
              color: #64748b;
              text-transform: uppercase;
            }
            
            .meta-value {
              font-size: 14px;
              font-weight: 500;
              color: #1e293b;
            }
            
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            
            .section-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #e2e8f0;
            }
            
            .section-icon {
              font-size: 24px;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 8px;
              background: #f8fafc;
              border: 2px solid #e2e8f0;
            }
            
            .section-title {
              font-size: 20px;
              font-weight: 700;
              color: ${COLORS.navy[3]};
              margin: 0;
            }
            
            .section-content {
              font-size: 14px;
              color: #374151;
              line-height: 1.7;
            }
            
            .steps-container {
              display: flex;
              flex-direction: column;
              gap: 15px;
            }
            
            .step-item {
              display: flex;
              align-items: flex-start;
              gap: 15px;
              padding: 15px;
              background: #f8fafc;
              border-radius: 8px;
              border-left: 4px solid ${COLORS.navy[4]};
            }
            
            .step-number {
              font-size: 16px;
              font-weight: 700;
              flex-shrink: 0;
            }
            
            .step-text {
              color: #374151;
              line-height: 1.6;
            }
            
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 3px solid #e2e8f0;
              text-align: center;
              color: #64748b;
              font-size: 12px;
            }
            
            @media print {
              @page {
                margin: 15mm;
                size: A4;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <div class="logo">
              LexEye - Legal Intelligence Platform
            </div>
            <div class="metadata">
              <div><strong>Printed:</strong> ${new Date().toLocaleDateString()}</div>
            </div>
          </div>
          
          <h1 class="main-title">${law.lawTitle || "Law Title"}</h1>
          
          <div class="law-meta">
            ${law.section ? `<div class="meta-item"><span class="meta-label">Section</span><span class="meta-value">${law.section}</span></div>` : ''}
            ${law.category ? `<div class="meta-item"><span class="meta-label">Category</span><span class="meta-value">${law.category}</span></div>` : ''}
            ${law.sabCategory ? `<div class="meta-item"><span class="meta-label">Sub Category</span><span class="meta-value">${law.sabCategory}</span></div>` : ''}
            ${law.jurisdiction ? `<div class="meta-item"><span class="meta-label">Jurisdiction</span><span class="meta-value">${law.jurisdiction}</span></div>` : ''}
            ${law.lastUpdated ? `<div class="meta-item"><span class="meta-label">Last Updated</span><span class="meta-value">${law.lastUpdated}</span></div>` : ''}
          </div>
          
          ${law.legalConcept ? `<div class="section"><div class="section-content"><strong>Legal Concept:</strong> ${law.legalConcept}</div></div>` : ''}
          
          ${law.sectionOverview ? `
            <div class="section">
              <div class="section-header">
                <div class="section-icon">📖</div>
                <h2 class="section-title">Section Overview</h2>
              </div>
              <div class="section-content">
                ${law.sectionOverview}
              </div>
            </div>
          ` : ''}

          <div class="section">
            <div class="section-header">
              <div class="section-icon">🧠</div>
              <h2 class="section-title">Simple Explanation</h2>
            </div>
            <div class="section-content">
              ${law.description || "No description available."}
            </div>
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon">⚖️</div>
              <h2 class="section-title">Legal Punishment</h2>
            </div>
            <div class="section-content">
              ${law.legalConsequence || "No legal consequence available."}
            </div>
          </div>

          <div class="section">
            <div class="section-header">
              <div class="section-icon">🌿</div>
              <h2 class="section-title">Prevention & Awareness Solutions</h2>
            </div>
            <div class="section-content">
              ${law.preventionSolutions || "No prevention solutions available."}
            </div>
          </div>
          
          ${stepByStepContent}
          
          ${law.relatedLaws && law.relatedLaws.length > 0 ? `
            <div class="section">
              <div class="section-header">
                <div class="section-icon">🔗</div>
                <h2 class="section-title">Related Laws</h2>
              </div>
              <div class="section-content">
                <ul>
                  ${law.relatedLaws.map(law => `<li>${renderRelatedLaw(law)}</li>`).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
          
          <div class="footer">
            <p><strong>Generated by LexEye - Your Legal Intelligence Platform</strong></p>
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

  // Format steps for display
  const steps = formatStepByStepGuide(law?.stepByStepGuide);

  return (
    <div className="min-h-screen pt-16 md:pt-20" style={{ backgroundColor: COLORS.navy[1] }}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl -top-10 -left-10 md:-top-20 md:-left-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[3]}10` }}
        />
        <div 
          className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full blur-3xl top-1/4 -right-10 md:top-1/3 md:-right-20 animate-pulse-slower"
          style={{ backgroundColor: `${COLORS.navy[4]}10` }}
        />
        <div 
          className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full blur-3xl bottom-10 left-1/4 md:bottom-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[2]}20` }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-4 md:py-6 lg:py-8">
        {/* Back Button */}
        <MotionDiv 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.4 }}
          className="mb-4 md:mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 md:gap-3 backdrop-blur-xl border font-semibold rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 shadow-xl transition-all duration-300 hover:scale-105 text-sm md:text-base"
            style={{
              backgroundColor: `${COLORS.navy[2]}80`,
              borderColor: `${COLORS.navy[4]}30`,
              color: COLORS.navy[5]
            }}
          >
            <IoArrowBack className="text-lg md:text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Previous
          </button>
        </MotionDiv>

        {/* Law Header */}
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="backdrop-blur-2xl border rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl mb-6 md:mb-8"
          style={{
            backgroundColor: `${COLORS.navy[2]}40`,
            borderColor: `${COLORS.navy[4]}20`
          }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 md:gap-6">
            <div className="flex-1">
              {/* Law Title and Section */}
              <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                <div className="inline-flex items-center gap-2 rounded-full px-3 md:px-4 py-1.5 md:py-2 border" style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`
                }}>
                  <FaBalanceScale className="text-xs md:text-sm" style={{ color: COLORS.navy[4] }} />
                  <span className="text-xs md:text-sm font-medium" style={{ color: COLORS.navy[4] }}>LAW</span>
                </div>
                {isEnhancedLaw(law) && (
                  <div className="inline-flex items-center gap-2 rounded-full px-3 md:px-4 py-1.5 md:py-2 border" style={{
                    backgroundColor: `${COLORS.navy[3]}20`,
                    borderColor: `${COLORS.navy[3]}30`
                  }}>
                    <FaList className="text-xs md:text-sm" style={{ color: COLORS.navy[3] }} />
                    <span className="text-xs md:text-sm font-medium" style={{ color: COLORS.navy[3] }}>Enhanced Law</span>
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2 md:mb-4" style={{ color: COLORS.navy[5] }}>
                {law?.lawTitle || "Law Title"}
              </h1>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3" style={{ color: COLORS.navy[4] }}>
                {law?.section || "Section Title"}
              </h2>
              
              {law?.legalConcept && (
                <p className="text-lg md:text-xl leading-relaxed mb-3 md:mb-4 italic" style={{ color: COLORS.navy[5] }}>
                  {law.legalConcept}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base mb-4 md:mb-6">
                {law?.category && (
                  <div className="flex items-center gap-2 rounded-full px-3 md:px-4 py-1.5 md:py-2 border" style={{
                    backgroundColor: `${COLORS.navy[4]}20`,
                    borderColor: `${COLORS.navy[4]}30`
                  }}>
                    <FaTag className="text-xs md:text-sm" style={{ color: COLORS.navy[4] }} />
                    <span className="text-xs md:text-sm font-medium" style={{ color: COLORS.navy[4] }}>{law.category}</span>
                  </div>
                )}
                {law?.sabCategory && (
                  <div className="flex items-center gap-2 rounded-full px-3 md:px-4 py-1.5 md:py-2 border" style={{
                    backgroundColor: `${COLORS.navy[3]}20`,
                    borderColor: `${COLORS.navy[3]}30`
                  }}>
                    <FaTag className="text-xs md:text-sm" style={{ color: COLORS.navy[3] }} />
                    <span className="text-xs md:text-sm font-medium" style={{ color: COLORS.navy[3] }}>{law.sabCategory}</span>
                  </div>
                )}
                {law?.jurisdiction && (
                  <div className="flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                    <FaMapMarkerAlt className="text-sm" style={{ color: COLORS.navy[4] }} />
                    <span>Jurisdiction: {law.jurisdiction}</span>
                  </div>
                )}
                {law?.lastUpdated && (
                  <div className="flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                    <FaCalendarAlt className="text-sm" style={{ color: COLORS.navy[4] }} />
                    <span>Last Updated: {law.lastUpdated}</span>
                  </div>
                )}
              </div>

              {/* Bookmark Button */}
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleBookmark}
                className={`group relative flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl font-semibold backdrop-blur-xl border-2 transition-all duration-300 ${
                  isBookmarked
                    ? "shadow-xl"
                    : "hover:bg-white/10"
                }`}
                style={{
                  backgroundColor: isBookmarked ? `${COLORS.navy[4]}20` : `${COLORS.navy[2]}80`,
                  borderColor: isBookmarked ? `${COLORS.navy[4]}30` : `${COLORS.navy[4]}20`,
                  color: isBookmarked ? COLORS.navy[4] : COLORS.navy[5],
                  boxShadow: isBookmarked ? `0 8px 32px ${COLORS.navy[4]}20` : 'none'
                }}
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
              </MotionButton>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 md:gap-3 w-full lg:w-auto">
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                disabled={isSharing}
                className={`flex items-center justify-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-4 border rounded-xl md:rounded-2xl font-semibold backdrop-blur-xl transition-all duration-300 ${
                  isSharing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`,
                  color: COLORS.navy[4]
                }}
              >
                <IoShareOutline className="text-lg md:text-2xl" />
                <span className="text-sm md:text-base">
                  {isSharing ? 'Sharing...' : 'Share Law'}
                </span>
              </MotionButton>
            </div>
          </div>
        </MotionDiv>

        {/* Mobile Menu Button */}
        {isMobile && (
          <MotionButton
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="fixed bottom-6 right-6 z-50 p-4 backdrop-blur-xl border rounded-full shadow-xl"
            style={{
              backgroundColor: `${COLORS.navy[4]}20`,
              borderColor: `${COLORS.navy[4]}30`,
              color: COLORS.navy[4]
            }}
          >
            {showMobileMenu ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </MotionButton>
        )}

        {/* Law Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Section Overview */}
            {law?.sectionOverview && (
              <MotionSection 
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="backdrop-blur-2xl border rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl"
                style={{
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}20`
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-lg" style={{
                    backgroundColor: `${COLORS.navy[4]}20`
                  }}>
                    <FaPuzzlePiece className="text-sm md:text-lg" style={{ color: COLORS.navy[4] }} />
                  </div>
                  <h2 className="text-base md:text-xl lg:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                    Section Overview
                  </h2>
                </div>
                <p className="leading-relaxed text-sm md:text-base lg:text-lg" style={{ color: COLORS.navy[5] }}>
                  {law.sectionOverview}
                </p>
              </MotionSection>
            )}

            {/* Simple Explanation */}
            <MotionSection 
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="backdrop-blur-2xl border rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl"
              style={{
                backgroundColor: `${COLORS.navy[2]}40`,
                borderColor: `${COLORS.navy[4]}20`
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="p-1.5 md:p-2 rounded-lg" style={{
                  backgroundColor: `${COLORS.navy[4]}20`
                }}>
                  <FaBrain className="text-sm md:text-lg" style={{ color: COLORS.navy[4] }} />
                </div>
                <h2 className="text-base md:text-xl lg:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                  Simple Explanation
                </h2>
              </div>
              <p className="leading-relaxed text-sm md:text-base lg:text-lg" style={{ color: COLORS.navy[5] }}>
                {law?.description || "No description available."}
              </p>
            </MotionSection>

            {/* Legal Punishment */}
            <MotionSection 
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="backdrop-blur-2xl border rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl"
              style={{
                backgroundColor: `${COLORS.navy[2]}40`,
                borderColor: `${COLORS.navy[3]}30`
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="p-1.5 md:p-2 rounded-lg" style={{
                  backgroundColor: `${COLORS.navy[3]}20`
                }}>
                  <FaSkullCrossbones className="text-sm md:text-lg" style={{ color: COLORS.navy[3] }} />
                </div>
                <h2 className="text-base md:text-xl lg:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                  Legal Punishment
                </h2>
              </div>
              <p className="leading-relaxed text-sm md:text-base lg:text-lg font-semibold" style={{ color: COLORS.navy[5] }}>
                {law?.legalConsequence || "No legal consequence available."}
              </p>
            </MotionSection>

            {/* Step-by-Step Guide */}
            {steps.length > 0 && (
              <MotionSection 
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="backdrop-blur-2xl border rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl"
                style={{
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}30`
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-lg" style={{
                    backgroundColor: `${COLORS.navy[4]}20`
                  }}>
                    <GiLadder className="text-sm md:text-lg" style={{ color: COLORS.navy[4] }}/>
                  </div>
                  <h2 className="text-base md:text-xl lg:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                    Step-by-Step Legal Help Guide
                  </h2>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {steps.map((step, index) => (
                    <MotionDiv
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl border"
                      style={{
                        backgroundColor: `${COLORS.navy[2]}80`,
                        borderColor: `${COLORS.navy[4]}20`
                      }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border" style={{
                        backgroundColor: `${COLORS.navy[4]}20`,
                        borderColor: `${COLORS.navy[4]}30`
                      }}>
                        <span className="font-bold text-xs md:text-sm" style={{ color: COLORS.navy[4] }}>{index + 1}</span>
                      </div>
                      <p className="leading-relaxed text-sm md:text-base flex-1" style={{ color: COLORS.navy[5] }}>
                        {step}
                      </p>
                    </MotionDiv>
                  ))}
                </div>
              </MotionSection>
            )}

            {/* Prevention & Awareness */}
            <MotionSection 
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="backdrop-blur-2xl border rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl"
              style={{
                backgroundColor: `${COLORS.navy[2]}40`,
                borderColor: `${COLORS.navy[4]}20`
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="p-1.5 md:p-2 rounded-lg" style={{
                  backgroundColor: `${COLORS.navy[4]}20`
                }}>
                  <FaLeaf className="text-sm md:text-lg" style={{ color: COLORS.navy[4] }} />
                </div>
                <h2 className="text-base md:text-xl lg:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                  Prevention & Awareness Solutions
                </h2>
              </div>
              <p className="leading-relaxed text-sm md:text-base lg:text-lg" style={{ color: COLORS.navy[5] }}>
                {law?.preventionSolutions || "No prevention solutions available."}
              </p>
            </MotionSection>

            {/* Related Laws */}
            {(law?.relatedLaws && law.relatedLaws.length > 0) && (
              <MotionSection 
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="backdrop-blur-2xl border rounded-xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl"
                style={{
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}20`
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-lg" style={{
                    backgroundColor: `${COLORS.navy[4]}20`
                  }}>
                    <FaLink className="text-sm md:text-lg" style={{ color: COLORS.navy[4] }} />
                  </div>
                  <h2 className="text-base md:text-xl lg:text-2xl font-bold" style={{ color: COLORS.navy[5] }}>
                    Related Laws ({relatedLawsData.length || law.relatedLaws.length})
                  </h2>
                </div>
                
                {relatedLawsLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{
                      borderColor: `${COLORS.navy[4]}30`,
                      borderTopColor: COLORS.navy[4]
                    }}></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {relatedLawsData.length > 0 ? (
                      relatedLawsData.map((relatedLaw, index) => (
                        <MotionDiv
                          key={relatedLaw._id || index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRelatedLawClick(relatedLaw._id)}
                          className="p-3 md:p-4 rounded-lg border transition-all duration-300 group"
                          style={{
                            backgroundColor: `${COLORS.navy[2]}80`,
                            borderColor: `${COLORS.navy[4]}20`
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-1">
                              <FaLink className="text-xs group-hover:scale-110 transition-transform duration-300" style={{ color: COLORS.navy[4] }} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm md:text-base group-hover:transition-colors duration-300 mb-1" style={{ color: COLORS.navy[4] }}>
                                {relatedLaw.section || relatedLaw.lawTitle || "Related Law"}
                              </h4>
                              {relatedLaw.legalConcept && (
                                <p className="text-xs md:text-sm leading-relaxed line-clamp-2" style={{ color: COLORS.navy[5] }}>
                                  {relatedLaw.legalConcept}
                                </p>
                              )}
                              <div className="mt-2 text-xs font-medium" style={{ color: COLORS.navy[4] }}>
                                Click to view details →
                              </div>
                            </div>
                          </div>
                        </MotionDiv>
                      ))
                    ) : (
                      // Fallback: show original related laws as non-clickable
                      law.relatedLaws.slice(0, 6).map((relatedLaw, index) => (
                        <MotionDiv
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-3 md:p-4 rounded-lg border"
                          style={{
                            backgroundColor: `${COLORS.navy[2]}80`,
                            borderColor: `${COLORS.navy[4]}20`
                          }}
                        >
                          <p className="text-xs md:text-sm leading-relaxed" style={{ color: COLORS.navy[5] }}>
                            {renderRelatedLaw(relatedLaw)}
                          </p>
                        </MotionDiv>
                      ))
                    )}
                  </div>
                )}
              </MotionSection>
            )}
          </div>

          {/* Sidebar - Hidden on mobile when menu is closed */}
          <AnimatePresence>
            {(!isMobile || showMobileMenu) && (
              <MotionDiv 
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4 md:space-y-6"
              >
                {/* Quick Actions */}
                <div className="backdrop-blur-xl border rounded-xl md:rounded-2xl p-4 md:p-6" style={{
                  backgroundColor: `${COLORS.navy[2]}40`,
                  borderColor: `${COLORS.navy[4]}20`
                }}>
                  <h3 className="text-sm md:text-lg font-semibold mb-3 md:mb-4" style={{ color: COLORS.navy[5] }}>Quick Actions</h3>
                  <div className="space-y-2 md:space-y-3">
                    <MotionButton
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePrint}
                      disabled={isPrinting}
                      className="w-full flex items-center justify-center gap-2 border rounded-lg md:rounded-xl py-2 md:py-3 px-3 transition-all duration-300 disabled:opacity-50 text-xs md:text-sm font-medium"
                      style={{
                        backgroundColor: `${COLORS.navy[4]}20`,
                        borderColor: `${COLORS.navy[4]}30`,
                        color: COLORS.navy[4]
                      }}
                    >
                      {isPrinting ? (
                        <>
                          <div className="w-3 h-3 md:w-4 md:h-4 border-2 rounded-full animate-spin" style={{
                            borderColor: `${COLORS.navy[4]}30`,
                            borderTopColor: COLORS.navy[4]
                          }} />
                          Printing...
                        </>
                      ) : (
                        <>
                          <IoPrintOutline className="text-sm md:text-lg" />
                          Print Document
                        </>
                      )}
                    </MotionButton>

                    <MotionButton
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExportPDF}
                      className="w-full flex items-center justify-center gap-2 border rounded-lg md:rounded-xl py-2 md:py-3 px-3 transition-all duration-300 text-xs md:text-sm font-medium"
                      style={{
                        backgroundColor: `${COLORS.navy[3]}20`,
                        borderColor: `${COLORS.navy[3]}30`,
                        color: COLORS.navy[3]
                      }}
                    >
                      <IoDocumentTextOutline className="text-sm md:text-lg" />
                      Export as PDF
                    </MotionButton>
                    
                    {/* Fixed: Using MotionLink instead of motion.link */}
                    <MotionLink
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      to={"/glossary"}
                      className="w-full flex items-center justify-center gap-2 border rounded-lg md:rounded-xl py-2 md:py-3 px-3 transition-all duration-300 text-xs md:text-sm font-medium"
                      style={{
                        backgroundColor: `${COLORS.navy[3]}20`,
                        borderColor: `${COLORS.navy[3]}30`,
                        color: COLORS.navy[3]
                      }}
                    >
                      <FiBook className="text-sm md:text-lg" />
                      Legal Glossary
                    </MotionLink>
                  </div>
                </div>

                {/* Emergency Help */}
                <div className="backdrop-blur-xl border rounded-xl md:rounded-2xl p-4 md:p-6" style={{
                  backgroundColor: `${COLORS.navy[3]}20`,
                  borderColor: `${COLORS.navy[3]}30`
                }}>
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <FaExclamationTriangle className="text-sm md:text-lg" style={{ color: COLORS.navy[3] }} />
                    <h3 className="text-sm md:text-lg font-semibold" style={{ color: COLORS.navy[3] }}>Emergency Help</h3>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed mb-2 md:mb-3" style={{ color: COLORS.navy[5] }}>
                    If you're in immediate danger, contact emergency services immediately.
                  </p>
                  <Link
                    to="/helpline"
                    className="inline-block border rounded-lg md:rounded-xl py-2 px-3 text-xs md:text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: `${COLORS.navy[3]}20`,
                      borderColor: `${COLORS.navy[3]}30`,
                      color: COLORS.navy[3]
                    }}
                  >
                    Go to Helpline
                  </Link>
                </div>

                {/* Legal Tip */}
                <div className="backdrop-blur-xl border rounded-xl md:rounded-2xl p-4 md:p-6" style={{
                  backgroundColor: `${COLORS.navy[4]}20`,
                  borderColor: `${COLORS.navy[4]}30`
                }}>
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <FaLightbulb className="text-sm md:text-lg" style={{ color: COLORS.navy[4] }} />
                    <h3 className="text-sm md:text-lg font-semibold" style={{ color: COLORS.navy[4] }}>Legal Tip</h3>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed" style={{ color: COLORS.navy[5] }}>
                    Always consult with a qualified legal professional for specific advice related to your situation.
                    Printed documents are for informational purposes only.
                  </p>
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LawDetail;