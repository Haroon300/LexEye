import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { loadLocalBookmarks, removeBookmark } from "../utils/bookmarkUtils";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setBookmarks(loadLocalBookmarks());
  }, []);

  const handleRemove = async (id) => {
    await removeBookmark(id, token);
    setBookmarks(loadLocalBookmarks());
  };

  return (
    <main className="min-h-screen mt-[5%] px-6 sm:px-12 py-16 text-white">
      <h1 className="text-3xl sm:text-5xl font-bold mb-8">My Bookmarks</h1>
      {bookmarks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((law) => (
            <div key={law._id} className="p-6 bg-black/60 rounded-xl border border-gray-700 shadow-md">
              <h2 className="text-xl font-semibold mb-2">{law.section} — {law.legalConcept}</h2>
              <p className="text-gray-400 mb-4">{law.description}</p>
              <div className="flex justify-between">
                <Link to={`/law/${law._id}`} className="flex items-center px-3 py-1 bg-[#becac8] text-[#08292e] rounded-full hover:bg-[#08292e] hover:text-[#becac8]">
                  <GrView className="text-xl mr-2" /> View
                </Link>
                <button onClick={() => handleRemove(law._id)} className="flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 rounded-full">
                  <RiDeleteBin5Fill className="text-xl mr-2" /> Remove
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
