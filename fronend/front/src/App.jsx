import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Hero from "./components/hero";
import Search from "./components/search";
import CustomCursor from "./components/CustomCursor";
import SignIn from "./signin";
import SignUp from "./signup";

export default function App() {
  return (
    <main>
      {/* Background effects */}
      <img
        src="/gradient.png"
        className="absolute top-0 right-0 opacity-60 -z-10"
        alt="background image"
      />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] rotate-[150deg] -z-10"></div>

      {/* Router with Header + Routes */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

      <CustomCursor />
    </main>
  );
}
