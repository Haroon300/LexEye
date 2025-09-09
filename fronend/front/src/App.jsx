import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
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



export default function App() {
  return (
    <main className="relative">
      {/* Background effects */}
      <img
        src="/gradient.png"
        className="absolute top-0 right-0 opacity-60 -z-10"
        alt="background image"
      />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] rotate-[150deg] -z-10"></div>

      <Router>
        {/* Header is outside so it shows on all pages */}
        <Header />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryId" element={<LawList />} />
          <Route path="/law/:lawId" element={<LawDetail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-3xl text-gray-300">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </Router>

      {/* Custom cursor always visible */}
      <CustomCursor />
    </main>
  );
}
