import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // ✅ Handle search with optional tag
  const handleSearch = (searchText) => {
    const queryToSearch = searchText || query;
    if (!queryToSearch.trim()) return;
    navigate(`/laws?query=${encodeURIComponent(queryToSearch)}`);
  };

  return (
    <main className="min-h-screen bg-[#0a2b30] text-white flex flex-col items-center px-6 lg:px-20">
      {/* Command Center */}
      <div className="max-w-3xl w-full text-center mt-[9rem]">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Find Simple Answers for Your Everyday Rights
        </h1>
        <p className="text-gray-300 mb-8">
          Quickly access simplified guides, step-by-step actions, and the clarity you need.
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white/10 border border-[#89a2a6] rounded-full px-4 py-4 shadow-lg">
          <AiOutlineSearch className="text-[#89a2a6] text-2xl" />
          <input
            type="text"
            placeholder="Search your issue: harassment, deposit disputes, police stops, consumer rights..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400 px-3 text-lg"
          />
          <button
            onClick={() => handleSearch()}
            className="ml-3 bg-[#89a2a6] hover:bg-[#becac8] text-[#08292e] font-semibold rounded-full px-6 py-2 transition-all"
          >
            Search
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            "Police Stops",
            "Tenancy Rights",
            "Harassment",
            "Workplace Disputes",
            "Digital Safety",
            "Consumer Issues",
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => handleSearch(tag)}
              className="px-4 py-2 bg-white/10 border border-[#89a2a6] rounded-full text-sm text-gray-200 hover:bg-white/20 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Search;