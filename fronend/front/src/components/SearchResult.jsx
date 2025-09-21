import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";

const SearchResult = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    results: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.post(
          "https://lex-eye-backend.vercel.app/api/laws/search",
          { query }
        );
        setState({ results: res.data.results || [], loading: false, error: "" });
      } catch (err) {
        setState({ results: [], loading: false, error: err.message });
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white px-6 sm:px-12 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">
          Results for:{" "}
          <span className="text-[#e99b63] italic">"{query}"</span>
        </h1>
        <button
          onClick={() => navigate("/search")}
          className="flex items-center px-5 py-2 bg-[#e99b63] text-black font-semibold rounded-full hover:bg-[#ffb27d] transition shadow-md"
        >
          <TiArrowBack className="text-xl mr-2" />
          Back
        </button>
      </div>

      {/* Loading & Error */}
      {state.loading && <p className="text-gray-400">Loading results...</p>}
      {state.error && <p className="text-red-400">{state.error}</p>}

      {/* No Results */}
      {!state.loading && state.results.length === 0 && (
        <p className="text-gray-400 text-lg">No results found.</p>
      )}

      {/* Results List */}
      <ul className="grid md:grid-cols-2 gap-6">
        {state.results._doc.map((item) => (
          <li
            key={item._id}
            className="p-6 bg-black/60 border border-gray-700 rounded-xl hover:border-[#e99b63] transition group shadow-md"
          >
            <h2 className="text-lg font-semibold text-[#e99b63] group-hover:underline">
              {item.section || "Untitled Section"} —{" "}
              <span className="text-white">{item.legalConcept}</span>
            </h2>

            <p className="text-gray-400 mt-2 mb-4 text-sm leading-relaxed">
              {item.description?.slice(0, 150) || "No description"}...
            </p>

            <Link
              to={`/law/${item._id}`}
              className="text-sm font-medium text-[#e99b63] hover:underline"
            >
              View Full Details →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
