import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  // const [results, setResults] = useState([]);
  // const [recent, setRecent] = useState(["Harassment", "Deposit Dispute", "Police Stop"]);

  // ✅ Added unique IDs so LawDetail can fetch properly
  // const mockResults = [
  //   {
  //     _id: "1",
  //     title: "Workplace Harassment: 3-Step Guide",
  //     category: "HARASSMENT",
  //     snippet: "Learn how to handle harassment at work in three steps, including filing a complaint.",
  //     read: "3 min read",
  //   },
  //   {
  //     _id: "2",
  //     title: "Tenancy Rights Explained",
  //     category: "TENANCY",
  //     snippet: "Understand your rights when your landlord refuses to return your security deposit.",
  //     read: "4 min read",
  //   },
  //   {
  //     _id: "3",
  //     title: "Digital Safety Basics",
  //     category: "DIGITAL SAFETY",
  //     snippet: "Tips to protect yourself from online fraud and report digital crimes.",
  //     read: "5 min read",
  //   },
  // ];

  const handleSearch = (customQuery) => {
    const queryToSearch = customQuery || query;
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
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400 px-3 text-lg"
          />
          <button
            onClick={handleSearch}
            className="ml-3 bg-[#89a2a6] hover:bg-[#becac8] text-[#08292e] font-semibold rounded-full px-6 py-2 transition-all"
          >
            Search
          </button>
        </div>

        {/* Filters - simplified tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {["Police Stops", "Tenancy Rights", "Harassment", "Workplace Disputes", "Digital Safety", "Consumer Issues"].map((tag) => (
            <span
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-4 py-2 bg-white/10 border border-[#89a2a6] rounded-full text-sm text-gray-200 hover:bg-white/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Past Searches */}
        {/* <div className="mt-4 text-gray-400 text-sm">
          Recent Searches:
          {recent.map((r, i) => (
            <span
              key={i}
              onClick={() => setQuery(r)}
              className="cursor-pointer text-[#89a2a6] hover:underline ml-2"
            >
              {r}
            </span>
          ))}
        </div> */}
      </div>

      {/* Results
      <div className="max-w-4xl w-full mt-12 mb-20">
        {results.length > 0 && (
          <h2 className="text-lg mb-6 text-gray-300">
            Showing {results.length} results for "{query}"
          </h2>
        )}
        <div className="grid gap-6">
          {results.map((r, i) => (
            <Link
              to={`/law/${r._id}`}
              key={i}
              className="block p-5 bg-white/5 border border-white/10 rounded-xl shadow hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold">{r.title}</h3>
              <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-[#89a2a6]/30 text-[#89a2a6]">
                {r.category}
              </span>
              <p className="text-gray-300 mt-3">{r.snippet}</p>
              <div className="flex justify-between items-center mt-4">
                <button className="text-sm text-[#89a2a6] hover:underline">
                  Save
                </button>
                <span className="text-gray-400 text-xs">{r.read}</span>
              </div>
            </Link>
          ))}
        </div>
      </div> */}
    </main>
  );
};

export default SearchPage;
