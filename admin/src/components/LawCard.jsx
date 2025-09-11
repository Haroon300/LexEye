function LawCard({ law, onDelete, onBookmark, isBookmarked }) {
  return (
    <div className="border p-4 rounded shadow-sm flex justify-between items-start bg-white">
      <div>
        <h3 className="font-bold">{law.title}</h3>
        <p className="text-gray-600 text-sm">{law.description}</p>
        <p className="text-xs mt-1 text-blue-600">Category: {law.category}</p>
        {law.relatedLaws?.length > 0 && (
          <p className="text-xs text-gray-500">
            Related: {law.relatedLaws.join(", ")}
          </p>
        )}
      </div>
      <div className="space-x-2">
        {onDelete && (
          <button
            onClick={() => onDelete(law.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        )}
        <button
          onClick={() => onBookmark(law.id)}
          className={`px-2 py-1 rounded ${
            isBookmarked ? "bg-yellow-500 text-black" : "bg-gray-300"
          }`}
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}

export default LawCard;
