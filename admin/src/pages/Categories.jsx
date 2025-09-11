import { useState } from "react";
import CategoryCard from "../components/CategoryCard";

function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Criminal Law" },
    { id: 2, name: "Property Law" },
  ]);
  const [newCat, setNewCat] = useState("");

  const addCategory = () => {
    if (!newCat.trim()) return;
    setCategories([...categories, { id: Date.now(), name: newCat }]);
    setNewCat("");
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          className="border p-2 rounded"
          placeholder="Add new category"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} onDelete={deleteCategory} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
