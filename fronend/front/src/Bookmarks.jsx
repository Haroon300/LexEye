import { useEffect, useState } from "react";
import { getBookmarks, removeBookmark } from "./utils/bookmarkUtils";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleRemove = (id) => {
    removeBookmark(id);
    setBookmarks(getBookmarks());
  };

  return (
    <main className="min-h-screen mt-[5%] px-6 sm:px-12 py-16 text-white">
      <h1 className="text-3xl sm:text-5xl font-bold mb-8">My Bookmarks</h1>

      {bookmarks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((law) => (
            <div
              key={law.id}
              className="p-6 bg-black/60 rounded-xl border border-gray-700 shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{law.title}</h2>
              <p className="text-gray-400 mb-4">{law.description}</p>

              <div className="flex justify-between">
                <Link
                  to={`/law/${law.id}`}
                  className="px-3 py-1 bg-[#e99b63] hover:bg-[#ffb27d] text-black rounded-full"
                >
                  View
                </Link>
                <button
                  onClick={() => handleRemove(law.id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
                >
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
