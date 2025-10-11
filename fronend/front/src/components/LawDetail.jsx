import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoBookmarkSharp } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import Loader from "./Loader";

const LAW_CACHE_KEY = "offlineLaws";
const BOOKMARK_KEY = "offlineBookmarks";
const PENDING_SYNC_KEY = "pendingBookmarkActions";

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();

  const [law, setLaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ✅ Helper: Load cached laws
  const loadCachedLaws = () => {
    const data = localStorage.getItem(LAW_CACHE_KEY);
    return data ? JSON.parse(data) : [];
  };

  // ✅ Helper: Save law to cache
  const cacheLaw = (lawData) => {
    const cached = loadCachedLaws();
    const exists = cached.some((l) => l._id === lawData._id);
    if (!exists) {
      localStorage.setItem(LAW_CACHE_KEY, JSON.stringify([...cached, lawData]));
    }
  };

  // ✅ Fetch law (with offline fallback)
  useEffect(() => {
    const fetchLaw = async () => {
      if (!navigator.onLine) {
        const cached = loadCachedLaws();
        const found = cached.find((l) => l._id === lawId);
        if (found) {
          setLaw(found);
          setLoading(false);
        } else {
          setError("Law not available offline.");
          setLoading(false);
        }
        return;
      }

      try {
        const { data } = await axios.get(
          `https://lex-eye-backend.vercel.app/api/laws/${lawId}`
        );
        setLaw(data);
        cacheLaw(data);
      } catch (err) {
        setError("Failed to fetch law details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaw();
  }, [lawId]);

  // ✅ Check if law is bookmarked (localStorage)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
    const found = saved.some((b) => b._id === lawId || b.id === lawId);
    setIsBookmarked(found);
  }, [lawId]);

  // ✅ Toggle Bookmark (works online + offline)
  const toggleBookmark = async () => {
    if (!user) {
      alert("Please sign in to bookmark laws.");
      navigate("/signin");
      return;
    }

    try {
      const saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
      let updated = [...saved];

      if (isBookmarked) {
        // Remove bookmark
        updated = saved.filter((b) => b._id !== lawId && b.id !== lawId);
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
        setIsBookmarked(false);

        // Queue sync if offline
        if (!navigator.onLine) {
          const pending = JSON.parse(localStorage.getItem(PENDING_SYNC_KEY)) || [];
          pending.push({ type: "remove", lawId });
          localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(pending));
          return;
        }

        // Sync with server if online
        await axios.delete(`/api/bookmarks/${lawId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Add bookmark
        const newBookmark = { _id: lawId, title: law.title, description: law.description };
        updated.push(newBookmark);
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
        setIsBookmarked(true);

        // Queue sync if offline
        if (!navigator.onLine) {
          const pending = JSON.parse(localStorage.getItem(PENDING_SYNC_KEY)) || [];
          pending.push({ type: "add", law: newBookmark });
          localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(pending));
          return;
        }

        // Sync with server if online
        await axios.post(
          `/api/bookmarks`,
          { lawId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("❌ Bookmark action failed:", err.message);
    }
  };

  // ✅ Sync pending actions when back online
  useEffect(() => {
    const syncPendingActions = async () => {
      const pending = JSON.parse(localStorage.getItem(PENDING_SYNC_KEY)) || [];
      if (pending.length === 0 || !navigator.onLine) return;

      for (const action of pending) {
        try {
          if (action.type === "add") {
            await axios.post(
              `/api/bookmarks`,
              { lawId: action.law._id },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } else if (action.type === "remove") {
            await axios.delete(`/api/bookmarks/${action.lawId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          }
        } catch (err) {
          console.warn("⚠️ Sync failed for:", action, err.message);
        }
      }

      // Clear pending queue after sync
      localStorage.removeItem(PENDING_SYNC_KEY);
    };

    window.addEventListener("online", syncPendingActions);
    return () => window.removeEventListener("online", syncPendingActions);
  }, []);

  // --- UI ---
  if (loading) return <Loader />;

  if (error || !law)
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#08292e] text-[#89a2a6]">
        <p>{error || "Law details not found."}</p>
      </main>
    );

  return (
    <main className="relative min-h-screen mt-[6%] px-6 sm:px-12 py-16 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-10 px-5 py-2 hover:text-[#89a2a6] text-white font-semibold"
      >
        <TiArrowBack className="text-2xl mr-2" />
        Back
      </button>

      {/* Header with Bookmark */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#89a2a6]">
          {law.section} — {law.legalConcept}
        </h1>

        {/* ⭐ Bookmark Button */}
        <button
          onClick={toggleBookmark}
          className={`text-3xl transition ${
            isBookmarked
              ? "text-yellow-400"
              : "text-gray-400 hover:text-yellow-400"
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          <IoBookmarkSharp />
        </button>
      </div>

      {/* Description */}
      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">📖 Description</h2>
        <p className="text-gray-300 leading-relaxed">
          {law.description || "No description provided."}
        </p>
      </div>

      {/* Legal Consequence */}
      <div className="p-6 mb-8 bg-[#89a2a6]/40 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">⚖️ Legal Consequence</h2>
        <p className="text-gray-300 leading-relaxed">
          {law.legalConsequence || "Not specified."}
        </p>
      </div>

      {/* Prevention Solutions */}
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
