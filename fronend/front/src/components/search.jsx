import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "/gradient.png";
import icon from "/icon.PNG";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (customQuery) => {
    const queryToSearch = customQuery || query;
    if (!queryToSearch.trim()) return;
    navigate(`/laws?query=${encodeURIComponent(queryToSearch)}`);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 overflow-hidden">
      {/* Glow Effect */}
      <div className="h-0 w-[40rem] absolute top-[50%] right-[25%] shadow-[0_0_900px_40px_#e99b63] rotate-[150deg] -z-10"></div>

      {/* Background */}
      <img
        src={img}
        className="absolute top-0 right-0 w-full h-full object-cover opacity-40 -z-20"
        alt="background"
      />

      <div className="relative z-10 w-full max-w-2xl text-center">
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
        <div className="flex items-center bg-black/70 border border-gray-700 rounded-full px-4 py-3 focus-within:border-[#e99b63] transition-all shadow-lg">
          <AiOutlineSearch className="text-gray-400 text-xl sm:text-2xl" />
          <input
            type="text"
            placeholder="Search laws, categories, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
              className="px-5 py-2 bg-black/70 text-gray-300 text-sm rounded-full border border-gray-700 transition hover:scale-110 hover:bg-[#e99b63] hover:text-black"
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
