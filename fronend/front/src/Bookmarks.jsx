import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";

const LOCAL_KEY = "offlineBookmarks";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Load bookmarks from localStorage (offline support)
  const loadOfflineBookmarks = () => {
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  // ✅ Fetch bookmarks from backend (online)
  const fetchBookmarks = async () => {
    if (!navigator.onLine) {
      console.warn("📴 Offline mode — using local bookmarks");
      setBookmarks(loadOfflineBookmarks());
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get("/api/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.bookmarks || [];
      setBookmarks(data);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data)); // 🔁 save offline copy
      setError("");
    } catch (err) {
      console.error("❌ Error fetching bookmarks:", err);
      setError("Failed to load bookmarks. Showing offline data.");
      setBookmarks(loadOfflineBookmarks());
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove bookmark (works offline too)
  const handleRemove = async (id) => {
    // Remove locally first for instant feedback
    const updated = bookmarks.filter((b) => b._id !== id);
    setBookmarks(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));

    // Try to remove from server if online
    if (navigator.onLine) {
      try {
        await axios.delete(`/api/bookmarks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("❌ Error removing bookmark:", err);
        setError("Failed to remove from server (will sync later).");
      }
    } else {
      console.warn("📴 Offline: removal will sync later");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <p className="text-gray-400">Loading bookmarks...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <main className="min-h-screen mt-[5%] px-6 sm:px-12 py-16 text-white">
      <h1 className="text-3xl sm:text-5xl font-bold mb-8">My Bookmarks</h1>

      {bookmarks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((law) => (
            <div
              key={law._id || law.id}
              className="p-6 bg-black/60 rounded-xl border border-gray-700 shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{law.title}</h2>
              <p className="text-gray-400 mb-4">{law.description}</p>

              <div className="flex justify-between">
                <Link
                  to={`/law/${law._id || law.id}`}
                  className="flex items-center px-3 py-1 transition-all duration-300 hover:bg-[#08292e] bg-[#becac8] text-[#08292e] hover:text-[#becac8] text-black rounded-full"
                >
                  <GrView className="text-xl mr-2" />
                  View
                </Link>
                <button
                  onClick={() => handleRemove(law._id || law.id)}
                  className="px-3 flex items-center py-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
                >
                  <RiDeleteBin5Fill className="text-xl mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No bookmarks yet.</p>
      )}
    </main>
  );
};

export default Bookmarks;
