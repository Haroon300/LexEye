import { useState } from "react";
import axios from "axios";
import img from "/gradient.png";
import icon from "/icon.PNG";
import Loader from "./Loader";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const [state, setState] = useState({
    query: "",
    results: [],
    loading: false,
    error: "",
  });

  const handleChange = (e) => {
    setState({ ...state, query: e.target.value });
  };

  const handleSearch = async () => {
    if (!state.query.trim()) return;

    setState({ ...state, loading: true, error: "" });

    try {
      const res = await axios.get(
        `https://lex-eye-back.vercel.app/api/laws?query=${state.query}`
      );
      setState({ ...state, results: res.data, loading: false });
    } catch (err) {
      setState({
        ...state,
        loading: false,
        error: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 overflow-hidden">
      {/* Loader Overlay */}
      {state.loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <Loader />
        </div>
      )}

      {/* Glow Effect */}
      <div className="h-0 w-[40rem] absolute top-[50%] right-[25%] shadow-[0_0_900px_40px_#e99b63] rotate-[150deg] -z-10"></div>

      {/* Background Gradient Image */}
      <img
        src={img}
        className="absolute top-0 right-0 w-full h-full object-cover opacity-40 -z-20"
        alt="background"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-wide text-white mb-6">
          Search Laws of Pakistan
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-10">
          Quickly find laws, categories, and resources that matter to you.<br />
          <span className="text-gray-400 flex items-center justify-center">
            Powered by{" "}
            <span className="text-[#e99b63] font-medium flex items-center">
              <img src={icon} className="w-10 h-10 inline-block" />
              LexEye
            </span>
            .
          </span>
        </p>

        {/* Search Box */}
        <div className="flex items-center bg-black/60 border border-gray-700 rounded-full px-4 py-3 sm:py-4 focus-within:border-[#e99b63] transition-all">
          <AiOutlineSearch className="text-gray-400 text-xl sm:text-2xl" />
          <input
            type="text"
            placeholder="Search laws, categories, or keywords..."
            value={state.query}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500 px-3 text-sm sm:text-base"
          />
          <button
            onClick={handleSearch}
            disabled={state.loading}
            className="ml-3 bg-[#e99b63] hover:bg-[#ffb27d] text-black font-semibold rounded-full px-5 py-2 text-sm sm:text-base transition-all disabled:opacity-60"
          >
            Search
          </button>
        </div>

        {/* Show Error */}
        {state.error && <p className="text-red-400 mt-4">{state.error}</p>}

        {/* Show Results */}
        {state.results.length > 0 && !state.loading && (
          <div className="mt-8 text-left bg-black/50 p-4 rounded-lg border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">Results:</h2>
            <ul className="space-y-2">
              {state.results.map((item, idx) => (
                <li key={idx} className="text-gray-300">
                  {item.title || item.name || "Unnamed Law"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Keywords Section */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            "Criminal Law",
            "Property Law",
            "Human Rights",
            "Contract Law",
            "Cybercrime",
            "Family Law",
            "Taxation",
            "Narcotics",
          ].map((keyword) => (
            <span
              key={keyword}
              onClick={() => setState({ ...state, query: keyword })}
              className="px-4 py-2 bg-black/60 text-gray-300 text-sm rounded-full border border-gray-700 cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:bg-[#e99b63] hover:text-black"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Search;
