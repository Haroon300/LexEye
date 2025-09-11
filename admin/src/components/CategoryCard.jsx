function CategoryCard({ category, onDelete }) {
  return (
    <div className="flex justify-between items-center border p-3 rounded-lg shadow-sm bg-white">
      <span className="font-medium">{category.name}</span>
      <button
        onClick={() => onDelete(category.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

export default CategoryCard;
