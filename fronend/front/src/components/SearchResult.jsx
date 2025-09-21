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
        const res = await axios.post("https://lex-eye-backend.vercel.app/api/laws/search", {
          query,
        });
        setState({ results: res.data.results || [], loading: false, error: "" });
      } catch (err) {
        setState({ results: [], loading: false, error: err.message });
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen mt-[5%] bg-black text-white p-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Search Results for:{" "}
          <span className="text-[#e99b63]">{query}</span>
        </h1>
        <button
          onClick={() => navigate("/search")}
          className="flex items-center px-4 py-2 bg-[#e99b63] text-black font-semibold rounded-lg hover:bg-[#ffb27d] transition"
        >
          <TiArrowBack className="text-2xl mr-2" />
          Back
        </button>
      </div>

      {state.loading && <p>Loading...</p>}
      {state.error && <p className="text-red-400">{state.error}</p>}

      {!state.loading && state.results.length === 0 && (
        <p className="text-gray-400">No results found.</p>
      )}

      <ul className="space-y-4">
        {state.results.map((item) => (
          <li
            key={item._id}
            className="p-4 bg-black/60 border border-gray-700 rounded-lg hover:border-[#e99b63] transition"
          >
            {/* Show section + legalConcept */}
            <h2 className="text-lg font-semibold text-[#e99b63]">
              {item.section || "Untitled Section"} — {item.legalConcept}
            </h2>

            {/* Short description preview */}
            <p className="text-gray-400">
              {item.description?.slice(0, 120) || "No description"}...
            </p>

            <Link
              to={`/law/${item._id}`}
              className="text-[#e99b63] hover:underline text-sm"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
