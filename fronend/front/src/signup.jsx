import img from "/gradient.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import { syncBookmarks } from "./utils/bookmarkUtils"; // optional if you added it

const SignUp = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data
      );

      setLoader(false);

      navigate("/signin");

    } catch (error) {
      setLoader(false);
      if (error.response) {
        console.error("Server Error:", error.response.data.message || error.response.data);
        alert(error.response.data.message || "Signup failed.");
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
        <main className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 overflow-hidden mb-[5%]">
          {/* Background Glow */}
          <div className="h-0 w-[40rem] absolute top-[50%] right-[25%] shadow-[0_0_900px_40px_#53674d] rotate-[150deg] -z-10"></div>

          {/* Background Gradient Image */}
          <img
            src={img}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40 -z-20"
            alt="background"
          />

          {/* Card */}
          <div className="relative mt-[10%] z-10 w-full max-w-md bg-[#092226]/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-800">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Create Account
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#092226]/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#092226]/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#092226]/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-lg bg-[#092226]/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
                  onBlur={(e) => {
                    if (e.target.value !== data.password) {
                      alert("Passwords do not match!");
                      e.target.value = "";
                    }
                  }}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex items-center justify-center w-full border py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 bg-gradient-to-r from-[#89a2a6] to-[#becac8] text-[#08292e] hover:from-[#08292e] hover:to-[#111] hover:text-[#becac8] hover:scale-105"
              >
                Sign Up
              </button>
            </form>

            {/* Extra Links */}
            <p className="text-gray-400 text-sm font-medium text-center mt-6">
              Already have an account?{" "}
              <Link to="/signin" className="text-[#becac8]/70 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </main>
      )}
    </>
  );
};

export default SignUp;
