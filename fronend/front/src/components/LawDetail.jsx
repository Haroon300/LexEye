import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoBookmarkSharp } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import Loader from "./Loader";
import {
  addBookmark,
  removeBookmark,
  loadLocalBookmarks,
  processPendingSyncs,
} from "../utils/bookmarkUtils";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();
  const [law, setLaw] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch law (from API or local storage if offline)
  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const { data } = await axios.get(
          `https://lex-eye-backend.vercel.app/api/laws/${lawId}`
        );
        setLaw(data);
      } catch {
        const local = loadLocalBookmarks();
        const found = local.find((l) => l._id === lawId);
        setLaw(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchLaw();
  }, [lawId]);

  // Check if bookmarked + sync when online
  useEffect(() => {
    const local = loadLocalBookmarks();
    setIsBookmarked(local.some((b) => b._id === lawId));

    const syncHandler = () => processPendingSyncs(token);
    window.addEventListener("online", syncHandler);
    return () => window.removeEventListener("online", syncHandler);
  }, [lawId, token]);

  // Toggle bookmark
  const toggleBookmark = async () => {
    if (!law) return;
    if (!token) return navigate("/signin");

    if (isBookmarked) {
      await removeBookmark(law._id, token);
      setIsBookmarked(false);
    } else {
      await addBookmark(law, token);
      setIsBookmarked(true);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen mt-[5%] px-6 sm:px-12 py-16 text-white bg-gradient-to-b from-[#0a1a1d] via-[#0f2c30] to-[#08292e]">
      {/* Back button */}
      <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-gradient-to-r from-[#89a2a6] to-[#becac8]  text-white hover:text-white  hover:from-[#0c606d] hover:to-[#111]  rounded-full px-4 py-2 mb-10 transition-all duration-200"
            >
              <TiArrowBack className="mr-2 text-2xl" />
              Back
      </button>

      {/* Header section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-wide text-[#becac8] drop-shadow-lg">
          {law?.section || "Unknown Section"}
        </h1>
        <button
          onClick={toggleBookmark}
          className={`text-4xl transition-transform duration-300 ${
            isBookmarked
              ? "text-yellow-400 scale-110 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              : "text-gray-500 hover:text-yellow-400 hover:scale-110"
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          <IoBookmarkSharp />
        </button>
      </div>

      {/* Law details card */}
      <section className="bg-[#0d2a2f]/60 border border-gray-700 rounded-2xl p-8 shadow-xl backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-[#becac8] mb-4">
          {law?.legalConcept || "No Title Available"}
        </h2>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <div>
            <h3 className="text-lg font-semibold text-[#89a2a6] mb-2">
              Description:
            </h3>
            <p>{law?.description || "No description available."}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#89a2a6] mb-2">
              Legal Consequence:
            </h3>
            <p>{law?.legalConsequence || "No legal consequence available."}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#89a2a6] mb-2">
              Prevention Solutions:
            </h3>
            <p>
              {law?.preventionSolutions || "No prevention solutions available."}
            </p>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="mt-16 text-center text-gray-500 text-sm">
        — End of Section —
      </div>
    </main>
  );
};

export default LawDetail;
