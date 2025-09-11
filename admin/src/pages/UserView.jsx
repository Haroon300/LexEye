import { useState } from "react";
import LawCard from "../components/LawCard";

function UserView() {
  const [laws] = useState([
    { id: 1, title: "Section 302", description: "Murder law", category: "Criminal Law", relatedLaws: [] },
    { id: 2, title: "Property Rights Act", description: "Property rights", category: "Property Law", relatedLaws: [] },
  ]);
  const [bookmarks, setBookmarks] = useState([]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Laws</h2>
      <div className="space-y-2">
        {laws.map((law) => (
          <LawCard
            key={law.id}
            law={law}
            onBookmark={toggleBookmark}
            isBookmarked={bookmarks.includes(law.id)}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Your Bookmarks</h2>
      <div className="space-y-2">
        {laws
          .filter((law) => bookmarks.includes(law.id))
          .map((law) => (
            <LawCard
              key={law.id}
              law={law}
              onBookmark={toggleBookmark}
              isBookmarked={true}
            />
          ))}
      </div>
    </div>
  );
}

export default UserView;
