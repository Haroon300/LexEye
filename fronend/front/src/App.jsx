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
      {/* Background effects */}
      <img
        src="/gradient.png"
        className="absolute top-0 right-0 opacity-60 -z-10"
        alt="background image"
      />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#ffff] rotate-[150deg] -z-10"></div>

      <Router>
        {/* ScrollToTop inside Router */}
        <ScrollToTop />

        <Header />

        <Routes>
          {/* Always accessible */}
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/law/:lawId" element={<LawDetail />} />

          {isOnline ? (
            <>
              {/* Landing Page */}
              <Route path="/" element={<Hero />} />

              {/* Core Pages */}
              <Route path="/search" element={<Search />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/:categoryId" element={<LawList />} />
              <Route path="/laws" element={<LawList />} />
              <Route path="/law/:lawId" element={<LawDetail />} />

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
