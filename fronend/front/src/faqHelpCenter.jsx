import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSearch, 
  FiHelpCircle, 
  FiBook, 
  FiUser, 
  FiShield, 
  FiGlobe,
  FiChevronDown,
  FiChevronUp,
  FiMail,
  FiClock,
  FiStar,
  FiArrowRight,
  FiHome,
  FiBookmark,
  FiFolder
} from "react-icons/fi";
import { IoMailOutline, IoHelpCircleOutline, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

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

const FAQHelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en"); // 'en' or 'ur'
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle email modal
  const handleEmailClick = () => {
    setShowModal(true);
  };

  // Send email through mail client
  const handleSendEmail = () => {
    const email = "support@lexeye.com";
    const subject = encodeURIComponent("Support Request — LexEye App");
    const body = encodeURIComponent(
      `Hello LexEye Support Team,\n\n${message || "I need help with..."}\n\nThank you,\nYour Name`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setShowModal(false);
    setMessage("");
  };

  // Language content
  const content = {
    en: {
      title: "FAQ & Help Center",
      subtitle: "Find answers to common questions and get help using LexEye",
      searchPlaceholder: "Search for help...",
      categories: "Categories",
      contactSupport: "Contact Support",
      stillNeedHelp: "Still need help?",
      contactDesc: "Can't find what you're looking for? Our support team is here to help.",
      emergencyHelp: "Emergency Assistance",
      emergencyDesc: "For urgent legal emergencies, use our dedicated helpline",
      popularQuestions: "Popular Questions",
      browseCategories: "Browse Categories",
      quickLinks: "Quick Links",
      wasHelpful: "Was this helpful?",
      yes: "Yes",
      no: "No",
      categoriesList: {
        general: "General",
        account: "Account & Profile",
        legal: "Legal Content",
        technical: "Technical Issues",
        privacy: "Privacy & Security"
      },
      contact: {
        title: "Contact Support",
        email: "Email Us",
        response: "Typically replies within 24 hours"
      }
    },
    ur: {
      title: "سوالات کے جوابات اور ہیلپ سینٹر",
      subtitle: "عام سوالات کے جوابات تلاش کریں اور LexEye استعمال کرنے میں مدد حاصل کریں",
      searchPlaceholder: "مدد کے لیے تلاش کریں...",
      categories: "اقسام",
      contactSupport: "سپورٹ سے رابطہ کریں",
      stillNeedHelp: "اب بھی مدد چاہیے؟",
      contactDesc: "آپ جو تلاش کر رہے ہیں وہ نہیں مل رہا؟ ہماری سپورٹ ٹیم مدد کے لیے موجود ہے۔",
      emergencyHelp: "ایمرجنسی مدد",
      emergencyDesc: "فوری قانونی ایمرجنسی کے لیے، ہماری مخصوص ہیلپ لائن استعمال کریں",
      popularQuestions: "مقبول سوالات",
      browseCategories: "اقسام براؤز کریں",
      quickLinks: "فوری لنکس",
      wasHelpful: "کیا یہ مددگار تھا؟",
      yes: "جی ہاں",
      no: "نہیں",
      categoriesList: {
        general: "عام",
        account: "اکاؤنٹ اور پروفائل",
        legal: "قانونی مواد",
        technical: "تکنیکی مسائل",
        privacy: "پرائیویسی اور سیکورٹی"
      },
      contact: {
        title: "سپورٹ سے رابطہ کریں",
        email: "ہمیں ای میل کریں",
        response: "عام طور پر 24 گھنٹوں میں جواب"
      }
    }
  };

  const t = content[language];

  // FAQ Data with bilingual content
  const faqData = {
    general: [
      {
        question: language === "en" ? "What is LexEye and how does it work?" : "LexEye کیا ہے اور یہ کیسے کام کرتا ہے؟",
        answer: language === "en" 
          ? "LexEye is a legal intelligence platform that provides simplified legal information for Pakistani laws. It helps users understand their rights and legal procedures through easy-to-understand guides and search functionality."
          : "LexEye ایک قانونی انٹیلی جنس پلیٹ فارم ہے جو پاکستانی قوانین کے لیے آسان قانونی معلومات فراہم کرتا ہے۔ یہ صارفین کو ان کے حقوق اور قانونی طریقہ کار کو آسان گائیڈز اور سرچ فنکشن کے ذریعے سمجھنے میں مدد کرتا ہے۔"
      },
      {
        question: language === "en" ? "Is LexEye free to use?" : "کیا LexEye استعمال کرنے کے لیے مفت ہے؟",
        answer: language === "en"
          ? "Yes, LexEye is completely free to use. We believe legal information should be accessible to everyone without any cost barriers."
          : "جی ہاں، LexEye استعمال کرنے کے لیے مکمل طور پر مفت ہے۔ ہمارا خیال ہے کہ قانونی معلومات ہر کسی کے لیے بغیر کسی لاگت کے رکاوٹ کے قابل رسائی ہونی چاہیے۔"
      },
      {
        question: language === "en" ? "How often is the legal content updated?" : "قانونی مواد کتنی بار اپ ڈیٹ ہوتا ہے؟",
        answer: language === "en"
          ? "Our legal content is regularly reviewed and updated to reflect current laws and procedures. We work with legal experts to ensure accuracy and relevance."
          : "ہمارا قانونی مواد موجودہ قوانین اور طریقہ کار کو ظاہر کرنے کے لیے باقاعدگی سے جائزہ لیا جاتا ہے اور اپ ڈیٹ کیا جاتا ہے۔ ہم درستگی اور متعلقہ کو یقینی بنانے کے لیے قانونی ماہرین کے ساتھ کام کرتے ہیں۔"
      }
    ],
    account: [
      {
        question: language === "en" ? "How do I create an account?" : "میں اکاؤنٹ کیسے بناؤں؟",
        answer: language === "en"
          ? "Click on the 'Sign In' button in the header, then select 'Create Account'. You'll need to provide your email address and create a password. After verification, you can start using all features."
          : "ہیڈر میں 'سائن ان' بٹن پر کلک کریں، پھر 'اکاؤنٹ بنائیں' منتخب کریں۔ آپ کو اپنا ای میل پتہ فراہم کرنا ہوگا اور پاس ورڈ بنانا ہوگا۔ تصدیق کے بعد، آپ تمام خصوصیات استعمال کرنا شروع کر سکتے ہیں۔"
      },
      {
        question: language === "en" ? "How do I reset my password?" : "اپنا پاس ورڈ کیسے ری سیٹ کروں؟",
        answer: language === "en"
          ? "Go to the Sign In page and click 'Forgot Password'. Enter your email address and we'll send you a password reset link. Follow the instructions in the email to create a new password."
          : "سائن ان پیج پر جائیں اور 'پاس ورڈ بھول گئے' پر کلک کریں۔ اپنا ای میل پتہ درج کریں اور ہم آپ کو پاس ورڈ ری سیٹ لنک بھیجیں گے۔ نیا پاس ورڈ بنانے کے لیے ای میل میں دی گئی ہدایات پر عمل کریں۔"
      },
      {
        question: language === "en" ? "Can I delete my account?" : "کیا میں اپنا اکاؤنٹ ڈیلیٹ کر سکتا ہوں؟",
        answer: language === "en"
          ? "Yes, you can delete your account from the profile settings. Please note that this action is permanent and all your saved data will be lost."
          : "جی ہاں، آپ پروفائل کی ترتیبات سے اپنا اکاؤنٹ ڈیلیٹ کر سکتے ہیں۔ براہ کرم نوٹ کریں کہ یہ عمل مستقل ہے اور آپ کا تمام محفوظ شدہ ڈیٹا ضائع ہو جائے گا۔"
      }
    ],
    legal: [
      {
        question: language === "en" ? "Are the legal guides written by lawyers?" : "کیا قانونی گائیڈز وکلاء نے لکھی ہیں؟",
        answer: language === "en"
          ? "Yes, all our legal content is reviewed and verified by qualified legal professionals to ensure accuracy and reliability. We work with practicing lawyers and legal experts."
          : "جی ہاں، ہمارا تمام قانونی مواد درستگی اور قابل اعتماد کو یقینی بنانے کے لیے قابلیت رکھنے والے قانونی پیشہ ور افراد کے ذریعے جائزہ لیا جاتا ہے اور تصدیق شدہ ہے۔ ہم پریکٹس کرنے والے وکلاء اور قانونی ماہرین کے ساتھ کام کرتے ہیں۔"
      },
      {
        question: language === "en" ? "Can LexEye provide legal advice?" : "کیا LexEye قانونی مشورہ دے سکتا ہے؟",
        answer: language === "en"
          ? "LexEye provides legal information and education, but it is not a substitute for professional legal advice. For specific legal cases, we recommend consulting with a qualified lawyer."
          : "LexEye قانونی معلومات اور تعلیم فراہم کرتا ہے، لیکن یہ پیشہ ورانہ قانونی مشورے کا متبادل نہیں ہے۔ مخصوص قانونی معاملات کے لیے، ہم کوالیفائیڈ وکیل سے مشورہ کرنے کی سفارش کرتے ہیں۔"
      },
      {
        question: language === "en" ? "How do I find information about a specific law?" : "میں کسی مخصوص قانون کے بارے میں معلومات کیسے تلاش کروں؟",
        answer: language === "en"
          ? "You can use the search function on the homepage or browse through categories. Our content is organized by topics like Tenancy Rights, Workplace Issues, Criminal Laws, etc."
          : "آپ ہوم پیج پر سرچ فنکشن استعمال کر سکتے ہیں یا زمرے کے ذریعے براؤز کر سکتے ہیں۔ ہمارا مواد ٹیننسی رائٹس، ورک پلیس مسائل، کریمنل لاز وغیرہ جیسے موضوعات کے لحاظ سے منظم ہے۔"
      }
    ],
    technical: [
      {
        question: language === "en" ? "The app is not loading properly. What should I do?" : "ایپ صحیح طریقے سے لوڈ نہیں ہو رہی۔ مجھے کیا کرنا چاہیے؟",
        answer: language === "en"
          ? "Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, contact our support team with details about your device and browser."
          : "صفحہ کو ریفریش کرنے، اپنے براؤزر کی کش صاف کرنے، یا مختلف براؤزر استعمال کرنے کی کوشش کریں۔ اگر مسئلہ برقرار رہے تو، اپنے ڈیوائس اور براؤزر کے بارے میں تفصیلات کے ساتھ ہماری سپورٹ ٹیم سے رابطہ کریں۔"
      },
      {
        question: language === "en" ? "Can I use LexEye offline?" : "کیا میں LexEye آف لائن استعمال کر سکتا ہوں؟",
        answer: language === "en"
          ? "Currently, LexEye requires an internet connection to access content. We're working on offline functionality for future updates."
          : "فی الحال، LexEye کو مواد تک رسائی کے لیے انٹرنیٹ کنکشن کی ضرورت ہے۔ ہم مستقبل کی اپ ڈیٹس کے لیے آف لائن فعالیت پر کام کر رہے ہیں۔"
      },
      {
        question: language === "en" ? "Is there a mobile app available?" : "کیا موبائل ایپ دستیاب ہے؟",
        answer: language === "en"
          ? "LexEye is a progressive web app that works seamlessly on mobile browsers. You can add it to your home screen for an app-like experience. Native mobile apps are in development."
          : "LexEye ایک پروگریسو ویب ایپ ہے جو موبائل براؤزرز پر بے عیب کام کرتی ہے۔ آپ اسے ایپ جیسے تجربے کے لیے اپنے ہوم اسکرین پر شامل کر سکتے ہیں۔ نیٹیو موبائل ایپس ڈویلپمنٹ میں ہیں۔"
      }
    ],
    privacy: [
      {
        question: language === "en" ? "Is my personal information secure?" : "کیا میری ذاتی معلومات محفوظ ہے؟",
        answer: language === "en"
          ? "Yes, we take data security seriously. All personal information is encrypted and we follow strict privacy protocols. We never share your data with third parties without your consent."
          : "جی ہاں، ہم ڈیٹا سیکورٹی کو سنجیدگی سے لیتے ہیں۔ تمام ذاتی معلومات انکرپٹڈ ہیں اور ہم سخت پرائیویسی پروٹوکول پر عمل کرتے ہیں۔ ہم آپ کی اجازت کے بغیر کبھی بھی تھرڈ پارٹیز کے ساتھ آپ کا ڈیٹا شیئر نہیں کرتے۔"
      },
      {
        question: language === "en" ? "What data do you collect and why?" : "آپ کون سا ڈیٹا جمع کرتے ہیں اور کیوں؟",
        answer: language === "en"
          ? "We collect minimal data necessary for providing our services, such as email for account creation and usage analytics to improve the platform. We're transparent about our data practices in our Privacy Policy."
          : "ہم اپنی خدمات فراہم کرنے کے لیے ضروری کم از کم ڈیٹا جمع کرتے ہیں، جیسے اکاؤنٹ بنانے کے لیے ای میل اور پلیٹ فارم کو بہتر بنانے کے لیے استعمال کے تجزیات۔ ہم اپنے پرائیویسی پالیسی میں اپنے ڈیٹا کے طریقوں کے بارے میں شفاف ہیں۔"
      },
      {
        question: language === "en" ? "How can I delete my data?" : "میں اپنا ڈیٹا کیسے ڈیلیٹ کر سکتا ہوں؟",
        answer: language === "en"
          ? "You can delete your account from the profile settings, which will remove all your personal data. For specific data deletion requests, contact our support team."
          : "آپ پروفائل کی ترتیبات سے اپنا اکاؤنٹ ڈیلیٹ کر سکتے ہیں، جو آپ کا تمام ذاتی ڈیٹا ہٹا دے گا۔ مخصوص ڈیٹا ڈیلیشن کی درخواستوں کے لیے، ہماری سپورٹ ٹیم سے رابطہ کریں۔"
      }
    ]
  };

  const categories = [
    { id: "general", label: t.categoriesList.general, icon: FiHelpCircle, count: faqData.general.length },
    { id: "account", label: t.categoriesList.account, icon: FiUser, count: faqData.account.length },
    { id: "legal", label: t.categoriesList.legal, icon: FiBook, count: faqData.legal.length },
    { id: "technical", label: t.categoriesList.technical, icon: FiGlobe, count: faqData.technical.length },
    { id: "privacy", label: t.categoriesList.privacy, icon: FiShield, count: faqData.privacy.length }
  ];

  const quickLinks = [
    { to: "/", label: "Home", icon: FiHome },
    { to: "/search", label: "Search", icon: FiSearch },
    { to: "/category", label: "Categories", icon: FiFolder },
    { to: "/bookmarks", label: "Bookmarks", icon: FiBookmark },
    { to: "/helpline", label: "Emergency Helpline", icon: FiHelpCircle }
  ];

  const toggleItem = (category, index) => {
    setOpenItems(prev => ({
      ...prev,
      [`${category}-${index}`]: !prev[`${category}-${index}`]
    }));
  };

  const filteredFAQs = Object.entries(faqData).reduce((acc, [category, items]) => {
    if (category === activeCategory) {
      const filtered = items.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...acc, [category]: filtered };
    }
    return acc;
  }, {});

  const allFAQs = Object.values(faqData).flat();
  const popularQuestions = allFAQs.slice(0, 3);

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

  const faqVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen pt-[10%] pb-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[3]}20` }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl top-1/3 -right-20 animate-pulse-slower"
          style={{ backgroundColor: `${COLORS.navy[4]}15` }}
        />
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl bottom-20 left-1/4 animate-pulse-slow"
          style={{ backgroundColor: `${COLORS.navy[2]}25` }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(240,235,216,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,235,216,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"
            style={{ backgroundColor: COLORS.navy[1] }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Language Toggle */}
        <motion.div 
          className="flex justify-end mb-6 mt-[25%] md:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
            className="flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-xl transition-all duration-300 border text-sm"
            style={{
              backgroundColor: `${COLORS.navy[5]}10`,
              borderColor: `${COLORS.navy[5]}30`,
              color: COLORS.navy[5]
            }}
          >
            <FiGlobe className="text-lg" />
            <span className="font-medium">{language === "en" ? "اردو" : "English"}</span>
          </button>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 border"
            style={{
              backgroundColor: `${COLORS.navy[4]}20`,
              borderColor: `${COLORS.navy[4]}30`
            }}
          >
            <IoHelpCircleOutline className="text-3xl" style={{ color: COLORS.navy[4] }} />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black mb-3 ${language === "ur" ? "font-urdu" : ""}`} style={{ color: COLORS.navy[5] }}>
            {t.title}
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: COLORS.navy[5] }}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: `${COLORS.navy[5]}40` }} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 placeholder-opacity-40 ${
                language === "ur" ? "text-right" : ""
              }`}
              style={{
                backgroundColor: `${COLORS.navy[2]}40`,
                borderColor: `${COLORS.navy[4]}30`,
                color: COLORS.navy[5]
              }}
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="backdrop-blur-xl border rounded-2xl p-6 sticky top-24" style={{ backgroundColor: `${COLORS.navy[2]}40`, borderColor: `${COLORS.navy[4]}30` }}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                <FiFolder style={{ color: COLORS.navy[4] }} />
                {t.categories}
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    variants={itemVariants}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                      activeCategory === category.id ? "shadow-lg" : ""
                    }`}
                    style={{
                      backgroundColor: activeCategory === category.id ? `${COLORS.navy[4]}20` : 'transparent',
                      border: activeCategory === category.id ? `1px solid ${COLORS.navy[4]}50` : '1px solid transparent',
                      color: COLORS.navy[5]
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon style={{ color: COLORS.navy[4] }} />
                      <span className={`font-medium ${language === "ur" ? "font-urdu" : ""}`}>{category.label}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${COLORS.navy[4]}20`, color: COLORS.navy[4] }}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: `${COLORS.navy[4]}20` }}>
                <h4 className="text-sm font-semibold mb-3" style={{ color: COLORS.navy[5] }}>{t.quickLinks}</h4>
                <div className="space-y-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 group"
                      style={{ color: COLORS.navy[5], backgroundColor: 'transparent' }}
                    >
                      <link.icon className="text-sm" style={{ color: COLORS.navy[4] }} />
                      <span className="text-sm group-hover:underline">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            {/* Popular Questions */}
            {searchTerm === "" && (
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                  <FiStar style={{ color: COLORS.navy[4] }} />
                  {t.popularQuestions}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {popularQuestions.map((faq, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className="backdrop-blur-xl border rounded-xl p-4 transition-all duration-300"
                      style={{ backgroundColor: `${COLORS.navy[2]}40`, borderColor: `${COLORS.navy[4]}30` }}
                    >
                      <h4 className="font-semibold mb-2" style={{ color: COLORS.navy[5] }}>{faq.question}</h4>
                      <p className="text-sm" style={{ color: `${COLORS.navy[5]}80` }}>{faq.answer.substring(0, 100)}...</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQ List */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                {(() => {
                  const category = categories.find(c => c.id === activeCategory);
                  const IconComponent = category?.icon;
                  return IconComponent ? <IconComponent style={{ color: COLORS.navy[4] }} /> : null;
                })()}
                {categories.find(c => c.id === activeCategory)?.label}
              </h3>
              
              <div className="space-y-4">
                {filteredFAQs[activeCategory]?.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300"
                    style={{ backgroundColor: `${COLORS.navy[2]}40`, borderColor: `${COLORS.navy[4]}30` }}
                  >
                    <button
                      onClick={() => toggleItem(activeCategory, index)}
                      className="w-full text-left p-6 flex items-center justify-between group"
                      style={{ color: COLORS.navy[5] }}
                    >
                      <h4 className={`font-semibold pr-4 ${language === "ur" ? "font-urdu text-right" : ""}`}>{faq.question}</h4>
                      {openItems[`${activeCategory}-${index}`] ? (
                        <FiChevronUp className="flex-shrink-0" style={{ color: COLORS.navy[4] }} />
                      ) : (
                        <FiChevronDown className="flex-shrink-0" style={{ color: COLORS.navy[4] }} />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {openItems[`${activeCategory}-${index}`] && (
                        <motion.div
                          variants={faqVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="px-6 pb-6"
                        >
                          <div className="pt-4 border-t" style={{ borderColor: `${COLORS.navy[4]}20` }}>
                            <p className={`leading-relaxed ${language === "ur" ? "font-urdu text-right" : ""}`} style={{ color: COLORS.navy[5] }}>
                              {faq.answer}
                            </p>
                            <div className="flex items-center gap-4 mt-4 pt-4 border-t" style={{ borderColor: `${COLORS.navy[4]}20` }}>
                              <span className="text-sm" style={{ color: `${COLORS.navy[5]}60` }}>{t.wasHelpful}</span>
                              <button className="text-sm px-3 py-1 rounded-lg transition-colors" style={{ backgroundColor: `${COLORS.navy[4]}20`, color: COLORS.navy[4] }}>
                                {t.yes}
                              </button>
                              <button className="text-sm px-3 py-1 rounded-lg transition-colors" style={{ backgroundColor: `${COLORS.navy[4]}20`, color: COLORS.navy[4] }}>
                                {t.no}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {filteredFAQs[activeCategory]?.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <FiSearch className="text-4xl mx-auto mb-4" style={{ color: `${COLORS.navy[5]}40` }} />
                  <p style={{ color: COLORS.navy[5] }}>No results found for "{searchTerm}"</p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 px-4 py-2 rounded-xl transition-colors"
                    style={{ backgroundColor: `${COLORS.navy[4]}20`, color: COLORS.navy[4] }}
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Support */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid md:grid-cols-2 gap-6"
            >
              {/* Contact Support */}
              <div className="backdrop-blur-xl border rounded-2xl p-6" style={{ backgroundColor: `${COLORS.navy[2]}40`, borderColor: `${COLORS.navy[4]}30` }}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                  <IoMailOutline style={{ color: COLORS.navy[4] }} />
                  {t.contactSupport}
                </h3>
                <p className="mb-4" style={{ color: COLORS.navy[5] }}>{t.contactDesc}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEmailClick}
                  className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group border hover:shadow-lg"
                  style={{ 
                    backgroundColor: `${COLORS.navy[4]}20`, 
                    borderColor: `${COLORS.navy[4]}30`,
                    color: COLORS.navy[5]
                  }}
                >
                  <div className="flex items-center gap-3">
                    <IoMailOutline style={{ color: COLORS.navy[4] }} />
                    <div className="text-left">
                      <div className="font-semibold" style={{ color: COLORS.navy[5] }}>{t.contact.email}</div>
                      <div className="text-xs" style={{ color: COLORS.navy[4] }}>{t.contact.response}</div>
                    </div>
                  </div>
                  <FiArrowRight style={{ color: COLORS.navy[4] }} />
                </motion.button>
              </div>

              {/* Emergency Help */}
              <div className="backdrop-blur-xl border rounded-2xl p-6" style={{ backgroundColor: `${COLORS.navy[2]}40`, borderColor: `${COLORS.navy[4]}30` }}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.navy[5] }}>
                  <FiClock style={{ color: COLORS.navy[4] }} />
                  {t.emergencyHelp}
                </h3>
                <p className="mb-4" style={{ color: COLORS.navy[5] }}>{t.emergencyDesc}</p>
                
                <Link
                  to="/helpline"
                  className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group border hover:shadow-lg"
                  style={{ 
                    backgroundColor: COLORS.navy[4],
                    borderColor: `${COLORS.navy[4]}50`,
                    color: COLORS.navy[1]
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FiHelpCircle />
                    <div className="font-semibold">Emergency Helpline</div>
                  </div>
                  <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm mt-8 relative z-10"
        style={{ color: `${COLORS.navy[5]}60` }}
      >
        © {new Date().getFullYear()} LexEye — All rights reserved.
      </motion.p>

      {/* Email Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative"
              style={{ backgroundColor: COLORS.navy[4], color: COLORS.navy[1] }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 hover:text-gray-700"
                style={{ color: COLORS.navy[1] }}
              >
                <IoClose size={24} />
              </button>
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <IoMailOutline />
                Contact Support
              </h2>
              <p className="mb-3 opacity-80">
                Please describe your issue below, and we'll help you out.
              </p>
              <textarea
                className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ 
                  borderColor: COLORS.navy[3],
                  backgroundColor: COLORS.navy[4],
                  color: COLORS.navy[1]
                }}
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: COLORS.navy[3],
                    color: COLORS.navy[1]
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: COLORS.navy[4],
                    color: COLORS.navy[1]
                  }}
                >
                  Send Email
                </button>
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
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
};

export default FAQHelpCenter;