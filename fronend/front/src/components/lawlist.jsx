import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { TiArrowBack } from "react-icons/ti";

const LawList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const navigate = useNavigate();

  const [state, setState] = useState({
    results: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    if (!query) return;

    const fetchLaws = async () => {
      setState({ results: [], loading: true, error: "" });
      try {
        const res = await axios.post(
          "https://lex-eye-backend.vercel.app/api/laws/search",
          { query }
        );
        setState({
          results: res.data.results || [],
          loading: false,
          error: "",
        });
      } catch (err) {
        setState({
          results: [],
          loading: false,
          error: err.response?.data?.error || "Failed to fetch laws",
        });
      }
    };

    fetchLaws();
  }, [query]);

  return (
    <div className="min-h-screen mt-[5%] bg-gray-950 text-white px-6 sm:px-12 py-10">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-[#e99b63] transition"
        >
          <TiArrowBack className="text-2xl" />
          <span className="font-medium">Back</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1 text-[#e99b63]">
          Results for "{query}"
        </h1>
      </div>

      {/* Loader */}
      {state.loading && (
        <div className="flex justify-center items-center mt-20">
          <Loader />
        </div>
      )}

      {/* Error */}
      {state.error && (
        <p className="text-red-400 text-center font-medium">{state.error}</p>
      )}

      {/* Results */}
      {!state.loading && !state.error && (
        <>
          {state.results.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-gray-400 text-lg mb-4">
                No results found for{" "}
                <span className="text-[#e99b63]">"{query}"</span>.
              </p>
              <button
                onClick={() => navigate("/search")}
                className="px-6 py-2 bg-[#e99b63] hover:bg-[#ffb27d] text-black font-semibold rounded-full transition"
              >
                Go Back to Search
              </button>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.results.map((law) => (
                <li
                  key={law._id}
                  className="p-5 bg-black/70 rounded-2xl border border-gray-700 hover:border-[#e99b63] hover:shadow-lg hover:shadow-[#e99b63]/20 transition"
                >
                  <Link to={`/law/${law._id}`}>
                    <h2 className="text-lg font-semibold text-white hover:text-[#e99b63] transition">
                      {law.section || law.legalConcept || "Unnamed Law"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                      {law.description || "No description available."}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default LawList;
