import img from "/gradient.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loader from "./components/Loader";
import axios from "axios";

const SignIn = () => {
  const [data, setdata] = useState({email:"",password:""});
  const [loader, setloader] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setloader(true);
  try {
    const response = await axios.post("https://lex-eye-backend.vercel.app/api/auth/signin", data);
    setloader(false);

    // Assuming your backend returns a token and user info
    const { token, User } = response.data;

    // Store token (e.g., in localStorage)
    localStorage.setItem("token", token);
    localStorage.setItem("User",User);

    console.log("Signed in successfully:", User);
    alert(User + " Thank you for signing in! You can now access all features.");
    // Navigate to homepage
    window.location.href = "/";

  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Server Error:", error.response.data.message || error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.message);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
  }
};

  return (
    <>
      {
      loader ? (
          <Loader />
      ) : (
        <main className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 overflow-hidden">
          {/* Background Glow */}
          <div className="h-0 w-[40rem] absolute top-[50%] left-[25%] shadow-[0_0_900px_40px_#e99b63] rotate-[150deg] -z-10"></div>

          {/* Background Gradient Image */}
          <img
            src={img}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40 -z-20"
            alt="background"
          />

          {/* Card */}
          <div className="relative z-10 w-full max-w-md bg-[#092226]/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-800">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Sign In
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => setdata({ ...data, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-[#092226]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => setdata({ ...data, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-[#092226]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#092226]/40 hover:bg-[black]/40 hover:text-white text-black font-semibold rounded-lg py-3 transition-all"
              >
                Sign In
              </button>
            </form>

            {/* Extra Links */}
            <p className="text-gray-400 text-sm text-center mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[black] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </main>
      )
    }

  </>
  );
};

export default SignIn;
