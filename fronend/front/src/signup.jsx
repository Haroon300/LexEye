import img from "/gradient.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";

const SignUp = () => {
  const [data, setdata] = useState({name:"",email:"",password:""});
    const [loader, setloader] = useState(false);
  
    const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const response = await axios.post("https://lex-eye-backend.vercel.app/api/auth/signup", data);
      setloader(false);
  
      // Assuming your backend returns a token and user info

  
      // Store token (e.g., in localStorage)
  
      console.log("SignUp successfully:", User);
      alert(User + " Thank you for ");
      // Navigate to homepage
      navigate("/signin");
  
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
      loader? (<Loader/>)
      :
      (<main className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 overflow-hidden mb-[5%]">
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

            <form className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg bg-[#092226]/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
                    onChange={(e)=>setdata({...data,name:e.target.value})}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-[#092226]/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
                    onChange={(e)=>setdata({...data,email:e.target.value})}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Password</label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full px-4 py-3 rounded-lg bg-[#092226]/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
                    onChange={(e)=>setdata({...data,password:e.target.value})}
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
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full hover:bg-[#08292e] bg-[#becac8] text-[#08292e] hover:text-[#becac8] hover:scale-105 font-semibold rounded-lg py-3 transition-all"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
            </form>

              {/* Extra Links */}
              <p className="text-gray-400 text-sm font-medium text-center mt-6">
                Already have an account?{" "}
                <Link to="/signin" className="text-[#becac8]/70  hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
      </main>)}
    </>
  );
};

export default SignUp;
