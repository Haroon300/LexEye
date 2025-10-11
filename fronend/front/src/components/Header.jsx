import img from "/gradient.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Server } from "../utils/bookmarkUtils";

const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await axios.post(
        "https://lex-eye-backend.vercel.app/api/auth/signin",
        data
      );

      setLoader(false);

      const { token, user } = response.data;

      if (!token || !user) {
        alert("Invalid server response. Please try again.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      try {
        await Server(token);
      } catch (err) {
        console.warn("Could not sync bookmarks:", err.message);
      }

      alert(`Welcome ${user.name || user.email}!`);
      window.location.href = "/";
    } catch (error) {
      setLoader(false);
      if (error.response) {
        alert(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        alert("Network error. Please check your internet connection.");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <main className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 overflow-hidden">
          <div className="h-0 w-[40rem] absolute top-[50%] left-[25%] shadow-[0_0_900px_40px_#53674d] rotate-[150deg] -z-10"></div>
          <img
            src={img}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40 -z-20"
            alt="background"
          />
          <div className="relative z-10 w-full max-w-md bg-[#092226]/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-800">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Sign In
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-[#092226]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-[#092226]"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full border py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-[#08292e] hover:from-[#08292e] hover:to-[#111] hover:text-[#becac8] hover:scale-105"
              >
                Sign In
              </button>
            </form>
            <p className="text-gray-400 text-sm font-medium text-center mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#becac8]/70 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </main>
      )}
    </>
  );
};

export default SignIn;
