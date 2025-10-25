import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

// Components
import Header from "./components/Header";
import Hero from "./components/hero";
import Search from "./components/search";
import CustomCursor from "./components/CustomCursor";
import SignIn from "./signin";
import SignUp from "./signup";
import Category from "./Category";
import LawList from "./components/lawlist";
import LawDetail from "./components/LawDetail";
import Bookmarks from "./Bookmarks";
import Footer from "./components/footer";
import NotFound from "./components/NotFound";
import NoInternet from "./components/NoInternet";
import Comment from "./components/Comment";
import CommentList from "./components/Comment";
import Glossary from "./Glossary";
import About from "./About.jsx";
import EmergencyHelpline from "./EmergencyHelpline";
import FAQHelpCenter from "./faqHelpCenter";

import { useEffect, useState } from "react";

// --- ScrollToTop Component ---
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll to top on hard refresh
  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return null;
}

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <main className="relative">
      <Router>
        {/* ScrollToTop inside Router */}
        <ScrollToTop />

        <Header />

        <Routes>
          {/* Always accessible */}
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/law/:lawId" element={<LawDetail />} />
          <Route path="/helpline" element={<EmergencyHelpline />} />

          {isOnline ? (
            <>
              {/* Landing Page */}
              <Route path="/" element={<Hero />} />

              {/* Core Pages */}
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/search" element={<Search />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/category" element={<Category />} />
              <Route path="/laws" element={<LawList />} />
              <Route path="/law/:lawId" element={<LawDetail />} />
              <Route path="/comments" element={<CommentList />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQHelpCenter/>} />
              {/* Extra Pages */}
              <Route path="/comment" element={<Comment />} />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="*" element={<NoInternet />} />
            </>
          )}
        </Routes>

        <Footer />
      </Router>

      <CustomCursor />
    </main>
  );
}
