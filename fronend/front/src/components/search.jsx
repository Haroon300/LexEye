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

  // Handle Search
  const handleSearch = async (customQuery) => {
    const queryToSearch = customQuery || state.query;

    if (!queryToSearch.trim()) {
      setState((prev) => ({ ...prev, error: "Please enter a search term" }));
      return;
    }

    setState((prev) => ({
      ...prev,
      query: queryToSearch,
      loading: true,
      error: "",
      results: [],
    }));

    try {
      const res = await axios.post(
        "https://lex-eye-backend.vercel.app/api/laws/search",
        { query: queryToSearch }
      );

      setState((prev) => ({
        ...prev,
        results: res.data.results || [],
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err.response?.data?.error || err.message,
        loading: false,
      }));
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

      {/* Background */}
      <img
        src={img}
        className="absolute top-0 right-0 w-full h-full object-cover opacity-40 -z-20"
        alt="background"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Search Laws of Pakistan
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
          Quickly find laws, categories, and resources that matter to you.
          <br />
          <span className="text-gray-400 flex items-center justify-center mt-2">
            Powered by{" "}
            <span className="ml-2 text-[#e99b63] font-semibold flex items-center gap-2">
              <img src={icon} className="w-8 h-8 inline-block" />
              LexEye
            </span>
          </span>
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-black/60 border border-gray-700 rounded-full px-4 py-3 focus-within:border-[#e99b63] transition-all shadow-lg">
          <AiOutlineSearch className="text-gray-400 text-xl sm:text-2xl" />
          <input
            type="text"
            placeholder="Search laws, categories, or keywords..."
            value={state.query}
            onChange={(e) =>
              setState((prev) => ({ ...prev, query: e.target.value }))
            }
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500 px-3 text-sm sm:text-base"
          />
          <button
            onClick={() => handleSearch()}
            className="ml-3 bg-[#e99b63] hover:bg-[#ffb27d] text-black font-semibold rounded-full px-5 py-2 text-sm sm:text-base transition-all disabled:opacity-60"
          >
            Search
          </button>
        </div>

        {/* Error */}
        {state.error && (
          <p className="text-red-400 mt-4 font-medium">{state.error}</p>
        )}

        {/* Results Preview */}
        {state.results.length > 0 && !state.loading && (
          <div className="mt-10 text-left bg-black/60 p-6 rounded-2xl border border-gray-700 shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">
              Top Results:
            </h2>
            <ul className="space-y-3">
              {state.results.slice(0, 5).map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 hover:text-[#e99b63] cursor-pointer transition"
                >
                  {item.section || item.legalConcept || "Unnamed Law"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Keywords */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
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
              onClick={() => handleSearch(keyword)}
              className="px-5 py-2 bg-black/60 text-gray-300 text-sm rounded-full border border-gray-700 cursor-pointer transition hover:scale-110 hover:bg-[#e99b63] hover:text-black"
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
