import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoBookmarkSharp } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import Loader from "./Loader";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();

  const [law, setLaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const user = localStorage.getItem("User");
  const token = localStorage.getItem("token");

  // --- Fetch Law ---
  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const { data } = await axios.get(
          `https://lex-eye-backend.vercel.app/api/laws/${lawId}`
        );
        setLaw(data);
      } catch (err) {
        setError("Failed to fetch law details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaw();
  }, [lawId]);

  // --- Load bookmark state ---
  useEffect(() => {
    if (!user) return;
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setIsBookmarked(savedBookmarks.some((b) => b._id === lawId));
  }, [lawId, user]);

  // --- Toggle Bookmark ---
  const toggleBookmark = async () => {
    if (!user) {
      alert("Please sign in to bookmark laws.");
      navigate("/signin");
      return;
    }

    let updatedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (isBookmarked) {
      // Remove from bookmarks
      updatedBookmarks = updatedBookmarks.filter((b) => b._id !== lawId);
      setIsBookmarked(false);
    } else {
      // Add to bookmarks
      updatedBookmarks.push(law);
      setIsBookmarked(true);
    }

    // Save to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

    // --- Sync with backend ---
    try {
      await axios.post(
        "https://lex-eye-backend.vercel.app/api/bookmarks/sync",
        { bookmarks: updatedBookmarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to sync bookmarks:", err.message);
    }
  };

  if (loading) return <Loader />;
  if (error || !law)
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#08292e] text-[#89a2a6]">
        <p>{error || "Law details not found."}</p>
      </main>
    );

  return (
    <main className="relative min-h-screen mt-[6%] px-6 sm:px-12 py-16 text-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-10 px-5 py-2 hover:text-[#89a2a6] text-white font-semibold"
      >
        <TiArrowBack className="text-2xl mr-2" />
        Back
      </button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#89a2a6]">
          {law.section} — {law.legalConcept}
        </h1>

        {/* Bookmark Button */}
        <button
          onClick={toggleBookmark}
          className={`text-3xl transition ${
            isBookmarked ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
          }`}
        >
          <IoBookmarkSharp />
        </button>
      </div>

      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">📖 Description</h2>
        <p className="text-gray-300 leading-relaxed">
          {law.description || "No description provided."}
        </p>
      </div>

      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">⚖️ Legal Consequence</h2>
        <p className="text-gray-300 leading-relaxed">
          {law.legalConsequence || "Not specified."}
        </p>
      </div>

      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">🛡️ Prevention Solutions</h2>
        <p className="text-gray-300 leading-relaxed">
          {law.preventionSolutions || "Not provided."}
        </p>
      </div>
    </main>
  );
};

export default LawDetail;
