import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addBookmark, removeBookmark, isBookmarked } from "../utils/bookmarkUtils";
import { IoBookmarkSharp } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();

  const [law, setLaw] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch law by ID using axios
  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const { data } = await axios.get(`https://lexeye.vercel.app//api/laws/${lawId}`);
        setLaw(data);
        setBookmarked(isBookmarked(data._id));
      } catch (err) {
        setError("Failed to fetch law details.");
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
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Loading law details...</p>
      </main>
    );
  }

  if (error || !law) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-400">
        <p>{error || "Law details not found."}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen mt-[10%] px-6 sm:px-12 py-16 text-white">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 px-4 py-2 bg-[#e99b63] hover:bg-[#ffb27d] text-black font-semibold rounded-full transition-all"
      >
        <TiArrowBack className="text-2xl mr-2" />
        Back
      </button>

      {/* 📖 Law Title */}
      <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-[#e99b63]">
        {law.section} — {law.legalConcept}
      </h1>

      {/* 📝 Description */}
      <p className="text-lg text-gray-300 mb-6">{law.description}</p>

      {/* ⚖️ Legal Consequence */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Legal Consequence</h2>
        <p className="text-gray-300">{law.legalConsequence}</p>
      </div>

      {/* ✅ Prevention / Solutions */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Prevention / Solutions</h2>
        <p className="text-gray-300">{law.preventionSolutions}</p>
      </div>

      {/* 🔖 Bookmark Button */}
      <button
        onClick={handleBookmark}
        className={`flex items-center mb-8 px-4 py-2 rounded-full font-semibold transition-all ${
          bookmarked
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-[#e99b63] hover:bg-[#ffb27d] text-black"
        }`}
      >
        <IoBookmarkSharp className="mr-2 text-2xl" />
        {bookmarked ? "Remove Bookmark" : "Add to Bookmark"}
      </button>
    </main>
  );
};

export default LawDetail;
