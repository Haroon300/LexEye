import img from "/gradient.png";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
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
      <div className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Sign In
        </h2>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white focus:outline-none focus:border-[#e99b63]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#e99b63] hover:bg-[#ffb27d] text-black font-semibold rounded-lg py-3 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#e99b63] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;
