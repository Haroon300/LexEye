import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addBookmark, removeBookmark, isBookmarked } from "../utils/bookmarkUtils";
import { IoBookmarkSharp } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import Loader from "./Loader";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();

  const [law, setLaw] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch law by ID
  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const { data } = await axios.get(
          `https://lex-eye-backend.vercel.app/api/laws/${lawId}`
        );
        setLaw(data);
        setBookmarked(isBookmarked(data._id));
      } catch (err) {
        setError("⚠️ Failed to fetch law details.");
      } finally {
        setLoading(false);
      }
    };
    fetchLaw();
  }, [lawId]);

  // ✅ Handle bookmarks
  const handleBookmark = () => {
    if (!law) return;
    if (bookmarked) {
      removeBookmark(law._id);
      setBookmarked(false);
    } else {
      addBookmark(law);
      setBookmarked(true);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#08292e] text-[#89a2a6]">
        <Loader />
      </main>
    );
  }

  if (error || !law) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#08292e] text-[#89a2a6]">
        <p>{error || "Law details not found."}</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen mt-[6%] px-6 sm:px-12 py-16 text-white">
      {/* Glow Effect */}
      <div className="h-0 w-[40rem] absolute top-[35%] left-[25%] shadow-[0_0_900px_50px_#e99b63] rotate-[120deg] -z-10"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-10 px-5 py-2 hover:text-[#89a2a6] text-white font-semibold"
      >
        <TiArrowBack className="text-2xl mr-2" />
        Back
      </button>

      {/* Law Title */}
      <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-[#89a2a6] tracking-wide">
        {law.section} — {law.legalConcept}
      </h1>

      {/* Description */}
      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">📖 Description</h2>
        <p className="text-gray-300 leading-relaxed">{law.description}</p>
      </div>

      {/* Legal Consequence */}
      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">⚖️ Legal Consequence</h2>
        <p className="text-gray-300 leading-relaxed">{law.legalConsequence}</p>
      </div>

      {/* Prevention / Solutions */}
      <div className="p-6 mb-10 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">✅ Prevention / Solutions</h2>
        <p className="text-gray-300 leading-relaxed">{law.preventionSolutions}</p>
      </div>

      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className={`flex items-center px-6 py-3 rounded-full font-semibold ${
          bookmarked
            ? "bg-[#08292e] text-[#89a2a6] "
            : "bg-[#89a2a6] text-[#08292e]"
        }`}
      >
        <IoBookmarkSharp className="mr-2 text-2xl" />
        {bookmarked ? "Remove Bookmark" : "Add to Bookmark"}
      </button>
    </main>
  );
};

export default LawDetail;
