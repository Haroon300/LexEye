import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryDetail = () => {
  const { categoryName } = useParams();
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaws = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://lex-eye-backend.vercel.app/api/laws?category=${categoryName}`
        );
        setLaws(res.data.laws || []);
      } catch (err) {
        setError("Failed to load laws");
      } finally {
        setLoading(false);
      }
    };

    fetchLaws();
  }, [categoryName]);

  return (
    <main className="relative mt-[5%] min-h-screen flex flex-col items-center px-4 sm:px-8 md:px-12 py-12">
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide text-white mb-6 sm:mb-10 text-center capitalize">
        {categoryName} Laws
      </h1>

      {/* Loading / Error */}
      {loading && <p className="text-gray-400">Loading laws...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Laws List */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {laws.map((law) => (
          <div
            key={law._id}
            className="bg-black/60 border border-gray-700 p-4 sm:p-6 rounded-xl shadow-md hover:bg-[#e99b63] hover:text-black transition-all duration-300"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Section: {law.section}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-2">
              {law.description || "No description available"}
            </p>
            {law.legalConcept && (
              <p className="text-xs sm:text-sm text-gray-400">
                Concept: {law.legalConcept}
              </p>
            )}
            {law.legalConsequence && (
              <p className="text-xs sm:text-sm text-gray-400">
                Consequence: {law.legalConsequence}
              </p>
            )}
            <Link
              to={`/law/${law._id}`}
              className="mt-3 inline-block text-sm text-blue-400 hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}

        {laws.length === 0 && !loading && (
          <p className="col-span-full text-gray-400 text-center text-sm sm:text-base">
            No laws found in this category.
          </p>
        )}
      </div>
    </main>
  );
};

export default CategoryDetail;
