import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addBookmark, removeBookmark, isBookmarked } from "../utils/bookmarkUtils";

const dummyLawDetails = {
  1: {
    id: 1,
    title: "Criminal Procedure Code 1898",
    description: "The Criminal Procedure Code 1898 is the main procedural law for handling criminal cases in Pakistan.",
    sections: ["Arrest Procedures", "Bail", "Trials", "Appeals"],
  },
  2: {
    id: 2,
    title: "Pakistan Penal Code",
    description: "The PPC defines crimes, penalties, and punishments across Pakistan.",
    sections: ["Offenses against body", "Offenses against property", "State offenses"],
  },
  3: {
    id: 3,
    title: "Transfer of Property Act",
    description: "Regulates the transfer of property in Pakistan, including sale, mortgage, and lease.",
    sections: ["Sales", "Mortgages", "Leases", "Gifts"],
  },
};

const LawDetail = () => {
  const { lawId } = useParams();
  const navigate = useNavigate();

  const law = dummyLawDetails[lawId];
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (law) {
      setBookmarked(isBookmarked(law.id));
    }
  }, [law]);

  const handleBookmark = () => {
    if (!law) return;
    if (bookmarked) {
      removeBookmark(law.id);
      setBookmarked(false);
    } else {
      addBookmark(law);
      setBookmarked(true);
    }
  };

  if (!law) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Law details not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen mt-[5%] px-6 sm:px-12 py-16 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-[#e99b63] hover:bg-[#ffb27d] text-black font-semibold rounded-full transition-all"
      >
        ← Back
      </button>

      {/* Law Title */}
      <h1 className="text-3xl sm:text-5xl font-bold mb-6">{law.title}</h1>

      {/* Description */}
      <p className="text-lg text-gray-300 mb-8">{law.description}</p>

      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className={`mb-8 px-4 py-2 rounded-full font-semibold transition-all ${
          bookmarked
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-[#e99b63] hover:bg-[#ffb27d] text-black"
        }`}
      >
        {bookmarked ? "Remove Bookmark" : "Add to Bookmark"}
      </button>

      {/* Sections */}
      <h2 className="text-2xl font-semibold mb-4">Key Sections</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        {law.sections.map((sec, idx) => (
          <li key={idx}>{sec}</li>
        ))}
      </ul>
    </main>
  );
};

export default LawDetail;
